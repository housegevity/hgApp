/*
 * Angular module wrapping the "Short Id" library by Dylan Greene
 *
 * See usage examples here: https://github.com/dylang/shortid
 */
angular.module('ng-shortId', [])
  .factory('random', function () {
    // Found this seed-based random generator somewhere
    // Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

    /**
     * return a random number based on a seed
     * @param seed
     * @returns {number}
     */
    var seed = 1;

    return {
        setSeed: function (_seed_) {
          seed = _seed_;
        },

        rnd: function () {
          seed = (seed * 9301 + 49297) % 233280;
          return seed / (233280.0);
        }
    };
  })
  .factory('alphabet', ['random',
    function (random) {
      var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
      var alphabet;
      var previousSeed;

      var shuffled;

      function reset() {
        shuffled = false;
      }

      function setCharacters(_alphabet_) {

        if (!_alphabet_) {
          if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
          }
          return;
        }

        if (_alphabet_ === alphabet) {
          return;
        }


        if (_alphabet_.length !== ORIGINAL.length) {
          throw new Error('Custom alphabet for shortId must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
        }

        var unique = _alphabet_.split('').filter(function (item, ind, arr) {
          return ind !== arr.lastIndexOf(item);
        });

        if (unique.length) {
          throw new Error('Custom alphabet for shortId must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
        }

        alphabet = _alphabet_;
        reset();
      }

      function setSeed(seed) {
        random.setSeed(seed);
        if (previousSeed !== seed) {
          reset();
          previousSeed = seed;
        }
      }

      function shuffle() {
        if (!alphabet) {
          setCharacters(ORIGINAL);
        }

        var sourceArray = alphabet.split('');
        var targetArray = [];
        var r = random.rnd();
        var characterIndex;
        while (sourceArray.length > 0) {
          r = random.rnd();
          characterIndex = Math.floor(r * sourceArray.length);
          targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
        }
        return targetArray.join('');
      }

      function getShuffled() {
        if (shuffled) {
          return shuffled;
        }
        shuffled = shuffle();
        return shuffled;
      }

      /**
       * lookup shuffled letter
       * @param index
       * @returns {string}
       */
      function lookup(index) {
        var alphabetShuffled = getShuffled();
        return alphabetShuffled[index];
      }

      return {
        characters: setCharacters,
        seed: setSeed,
        lookup: lookup,
        shuffled: getShuffled
      };
    }
  ])
  .factory('encode', function () {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return function(lookup, number) {
      var loopCounter = 0;
      var done;

      var str = '';

      while (!done) {
        str = str + lookup(((number >> (4 * loopCounter)) & 0x0f) | (getRandomInt(0, 255) & 0x30));
        done = number < (Math.pow(16, loopCounter + 1));
        loopCounter++;
      }
      return str;
    };
  })
  .service('shortId', ['encode', 'alphabet', function (encode, alphabet) {
    // Ignore all milliseconds before shortID was created to reduce the size of the date entropy
    // without sacrificing uniqueness. This number can be updated if we also bump the version below.
    var REDUCE_TIME = 1374349322543;

    // don't change unless we change the algos or REDUCE_TIME
    // must be an integer and less than 16
    var version = 1;

    // Counter is used when shortId is called multiple times in one second.
    var counter;

    // Remember the last time shortId was called in case counter is needed.
    var previousSeconds;


    /**
     * Generate unique id
     * Returns string id
     */
    function generate() {

      var str = '';

      var seconds = Math.round((Date.now() - REDUCE_TIME) * 0.01);

      if (seconds == previousSeconds) {
        counter++;
      } else {
        counter = 0;
        previousSeconds = seconds;
      }

      str = str + encode(alphabet.lookup, version);
      if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
      }
      str = str + encode(alphabet.lookup, seconds);

      return str;
    }


    /**
     * Set the seed.
     * Highly recommended if you don't want people to try to figure out your id schema.
     * exposed as ShortId.seed(int)
     * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
     */
    function seed(seed) {
      alphabet.seed(seed);
      return module.exports;
    }

    /**
     *
     * returns the shuffled alphabet
     */
    function characters(newCharacters) {
      if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
      }

      return alphabet.shuffled();
    }

    /**
     * Decode the id to get the version 
     * Mainly for debugging and testing.
     * @param id - the ShortId-generated id.
     */
    function decode(id) {
      var alphabet = characters();
      return {
        version: alphabet.indexOf(id.substr(0, 1)) & 0x0f
      };
    }

    return {
      generate: generate,
      seed: seed,
      characters: characters,
      decode: decode
    };
  }]);