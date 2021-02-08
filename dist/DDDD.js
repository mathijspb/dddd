(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DDDD = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var mustache = createCommonjsModule(function (module, exports) {
  // This file has been generated from mustache.mjs
  (function (global, factory) {
     module.exports = factory() ;
  }(commonjsGlobal, (function () {
    /*!
     * mustache.js - Logic-less {{mustache}} templates with JavaScript
     * http://github.com/janl/mustache.js
     */

    var objectToString = Object.prototype.toString;
    var isArray = Array.isArray || function isArrayPolyfill (object) {
      return objectToString.call(object) === '[object Array]';
    };

    function isFunction (object) {
      return typeof object === 'function';
    }

    /**
     * More correct typeof string handling array
     * which normally returns typeof 'object'
     */
    function typeStr (obj) {
      return isArray(obj) ? 'array' : typeof obj;
    }

    function escapeRegExp (string) {
      return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    }

    /**
     * Null safe way of checking whether or not an object,
     * including its prototype, has a given property
     */
    function hasProperty (obj, propName) {
      return obj != null && typeof obj === 'object' && (propName in obj);
    }

    /**
     * Safe way of detecting whether or not the given thing is a primitive and
     * whether it has the given property
     */
    function primitiveHasOwnProperty (primitive, propName) {
      return (
        primitive != null
        && typeof primitive !== 'object'
        && primitive.hasOwnProperty
        && primitive.hasOwnProperty(propName)
      );
    }

    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
    // See https://github.com/janl/mustache.js/issues/189
    var regExpTest = RegExp.prototype.test;
    function testRegExp (re, string) {
      return regExpTest.call(re, string);
    }

    var nonSpaceRe = /\S/;
    function isWhitespace (string) {
      return !testRegExp(nonSpaceRe, string);
    }

    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };

    function escapeHtml (string) {
      return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
        return entityMap[s];
      });
    }

    var whiteRe = /\s*/;
    var spaceRe = /\s+/;
    var equalsRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;

    /**
     * Breaks up the given `template` string into a tree of tokens. If the `tags`
     * argument is given here it must be an array with two string values: the
     * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
     * course, the default is to use mustaches (i.e. mustache.tags).
     *
     * A token is an array with at least 4 elements. The first element is the
     * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
     * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
     * all text that appears outside a symbol this element is "text".
     *
     * The second element of a token is its "value". For mustache tags this is
     * whatever else was inside the tag besides the opening symbol. For text tokens
     * this is the text itself.
     *
     * The third and fourth elements of the token are the start and end indices,
     * respectively, of the token in the original template.
     *
     * Tokens that are the root node of a subtree contain two more elements: 1) an
     * array of tokens in the subtree and 2) the index in the original template at
     * which the closing tag for that section begins.
     *
     * Tokens for partials also contain two more elements: 1) a string value of
     * indendation prior to that tag and 2) the index of that tag on that line -
     * eg a value of 2 indicates the partial is the third tag on this line.
     */
    function parseTemplate (template, tags) {
      if (!template)
        return [];
      var lineHasNonSpace = false;
      var sections = [];     // Stack to hold section tokens
      var tokens = [];       // Buffer to hold the tokens
      var spaces = [];       // Indices of whitespace tokens on the current line
      var hasTag = false;    // Is there a {{tag}} on the current line?
      var nonSpace = false;  // Is there a non-space char on the current line?
      var indentation = '';  // Tracks indentation for tags that use it
      var tagIndex = 0;      // Stores a count of number of tags encountered on a line

      // Strips all whitespace tokens array for the current line
      // if there was a {{#tag}} on it and otherwise only space.
      function stripSpace () {
        if (hasTag && !nonSpace) {
          while (spaces.length)
            delete tokens[spaces.pop()];
        } else {
          spaces = [];
        }

        hasTag = false;
        nonSpace = false;
      }

      var openingTagRe, closingTagRe, closingCurlyRe;
      function compileTags (tagsToCompile) {
        if (typeof tagsToCompile === 'string')
          tagsToCompile = tagsToCompile.split(spaceRe, 2);

        if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
          throw new Error('Invalid tags: ' + tagsToCompile);

        openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
        closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
        closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
      }

      compileTags(tags || mustache.tags);

      var scanner = new Scanner(template);

      var start, type, value, chr, token, openSection;
      while (!scanner.eos()) {
        start = scanner.pos;

        // Match any text between tags.
        value = scanner.scanUntil(openingTagRe);

        if (value) {
          for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
            chr = value.charAt(i);

            if (isWhitespace(chr)) {
              spaces.push(tokens.length);
              indentation += chr;
            } else {
              nonSpace = true;
              lineHasNonSpace = true;
              indentation += ' ';
            }

            tokens.push([ 'text', chr, start, start + 1 ]);
            start += 1;

            // Check for whitespace on the current line.
            if (chr === '\n') {
              stripSpace();
              indentation = '';
              tagIndex = 0;
              lineHasNonSpace = false;
            }
          }
        }

        // Match the opening tag.
        if (!scanner.scan(openingTagRe))
          break;

        hasTag = true;

        // Get the tag type.
        type = scanner.scan(tagRe) || 'name';
        scanner.scan(whiteRe);

        // Get the tag value.
        if (type === '=') {
          value = scanner.scanUntil(equalsRe);
          scanner.scan(equalsRe);
          scanner.scanUntil(closingTagRe);
        } else if (type === '{') {
          value = scanner.scanUntil(closingCurlyRe);
          scanner.scan(curlyRe);
          scanner.scanUntil(closingTagRe);
          type = '&';
        } else {
          value = scanner.scanUntil(closingTagRe);
        }

        // Match the closing tag.
        if (!scanner.scan(closingTagRe))
          throw new Error('Unclosed tag at ' + scanner.pos);

        if (type == '>') {
          token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
        } else {
          token = [ type, value, start, scanner.pos ];
        }
        tagIndex++;
        tokens.push(token);

        if (type === '#' || type === '^') {
          sections.push(token);
        } else if (type === '/') {
          // Check section nesting.
          openSection = sections.pop();

          if (!openSection)
            throw new Error('Unopened section "' + value + '" at ' + start);

          if (openSection[1] !== value)
            throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        } else if (type === 'name' || type === '{' || type === '&') {
          nonSpace = true;
        } else if (type === '=') {
          // Set the tags for the next time around.
          compileTags(value);
        }
      }

      stripSpace();

      // Make sure there are no open sections when we're done.
      openSection = sections.pop();

      if (openSection)
        throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

      return nestTokens(squashTokens(tokens));
    }

    /**
     * Combines the values of consecutive text tokens in the given `tokens` array
     * to a single token.
     */
    function squashTokens (tokens) {
      var squashedTokens = [];

      var token, lastToken;
      for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        token = tokens[i];

        if (token) {
          if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
            lastToken[1] += token[1];
            lastToken[3] = token[3];
          } else {
            squashedTokens.push(token);
            lastToken = token;
          }
        }
      }

      return squashedTokens;
    }

    /**
     * Forms the given array of `tokens` into a nested tree structure where
     * tokens that represent a section have two additional items: 1) an array of
     * all tokens that appear in that section and 2) the index in the original
     * template that represents the end of that section.
     */
    function nestTokens (tokens) {
      var nestedTokens = [];
      var collector = nestedTokens;
      var sections = [];

      var token, section;
      for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        token = tokens[i];

        switch (token[0]) {
          case '#':
          case '^':
            collector.push(token);
            sections.push(token);
            collector = token[4] = [];
            break;
          case '/':
            section = sections.pop();
            section[5] = token[2];
            collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
            break;
          default:
            collector.push(token);
        }
      }

      return nestedTokens;
    }

    /**
     * A simple string scanner that is used by the template parser to find
     * tokens in template strings.
     */
    function Scanner (string) {
      this.string = string;
      this.tail = string;
      this.pos = 0;
    }

    /**
     * Returns `true` if the tail is empty (end of string).
     */
    Scanner.prototype.eos = function eos () {
      return this.tail === '';
    };

    /**
     * Tries to match the given regular expression at the current position.
     * Returns the matched text if it can match, the empty string otherwise.
     */
    Scanner.prototype.scan = function scan (re) {
      var match = this.tail.match(re);

      if (!match || match.index !== 0)
        return '';

      var string = match[0];

      this.tail = this.tail.substring(string.length);
      this.pos += string.length;

      return string;
    };

    /**
     * Skips all text until the given regular expression can be matched. Returns
     * the skipped string, which is the entire tail if no match can be made.
     */
    Scanner.prototype.scanUntil = function scanUntil (re) {
      var index = this.tail.search(re), match;

      switch (index) {
        case -1:
          match = this.tail;
          this.tail = '';
          break;
        case 0:
          match = '';
          break;
        default:
          match = this.tail.substring(0, index);
          this.tail = this.tail.substring(index);
      }

      this.pos += match.length;

      return match;
    };

    /**
     * Represents a rendering context by wrapping a view object and
     * maintaining a reference to the parent context.
     */
    function Context (view, parentContext) {
      this.view = view;
      this.cache = { '.': this.view };
      this.parent = parentContext;
    }

    /**
     * Creates a new context using the given view with this context
     * as the parent.
     */
    Context.prototype.push = function push (view) {
      return new Context(view, this);
    };

    /**
     * Returns the value of the given name in this context, traversing
     * up the context hierarchy if the value is absent in this context's view.
     */
    Context.prototype.lookup = function lookup (name) {
      var cache = this.cache;

      var value;
      if (cache.hasOwnProperty(name)) {
        value = cache[name];
      } else {
        var context = this, intermediateValue, names, index, lookupHit = false;

        while (context) {
          if (name.indexOf('.') > 0) {
            intermediateValue = context.view;
            names = name.split('.');
            index = 0;

            /**
             * Using the dot notion path in `name`, we descend through the
             * nested objects.
             *
             * To be certain that the lookup has been successful, we have to
             * check if the last object in the path actually has the property
             * we are looking for. We store the result in `lookupHit`.
             *
             * This is specially necessary for when the value has been set to
             * `undefined` and we want to avoid looking up parent contexts.
             *
             * In the case where dot notation is used, we consider the lookup
             * to be successful even if the last "object" in the path is
             * not actually an object but a primitive (e.g., a string, or an
             * integer), because it is sometimes useful to access a property
             * of an autoboxed primitive, such as the length of a string.
             **/
            while (intermediateValue != null && index < names.length) {
              if (index === names.length - 1)
                lookupHit = (
                  hasProperty(intermediateValue, names[index])
                  || primitiveHasOwnProperty(intermediateValue, names[index])
                );

              intermediateValue = intermediateValue[names[index++]];
            }
          } else {
            intermediateValue = context.view[name];

            /**
             * Only checking against `hasProperty`, which always returns `false` if
             * `context.view` is not an object. Deliberately omitting the check
             * against `primitiveHasOwnProperty` if dot notation is not used.
             *
             * Consider this example:
             * ```
             * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
             * ```
             *
             * If we were to check also against `primitiveHasOwnProperty`, as we do
             * in the dot notation case, then render call would return:
             *
             * "The length of a football field is 9."
             *
             * rather than the expected:
             *
             * "The length of a football field is 100 yards."
             **/
            lookupHit = hasProperty(context.view, name);
          }

          if (lookupHit) {
            value = intermediateValue;
            break;
          }

          context = context.parent;
        }

        cache[name] = value;
      }

      if (isFunction(value))
        value = value.call(this.view);

      return value;
    };

    /**
     * A Writer knows how to take a stream of tokens and render them to a
     * string, given a context. It also maintains a cache of templates to
     * avoid the need to parse the same template twice.
     */
    function Writer () {
      this.templateCache = {
        _cache: {},
        set: function set (key, value) {
          this._cache[key] = value;
        },
        get: function get (key) {
          return this._cache[key];
        },
        clear: function clear () {
          this._cache = {};
        }
      };
    }

    /**
     * Clears all cached templates in this writer.
     */
    Writer.prototype.clearCache = function clearCache () {
      if (typeof this.templateCache !== 'undefined') {
        this.templateCache.clear();
      }
    };

    /**
     * Parses and caches the given `template` according to the given `tags` or
     * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
     * that is generated from the parse.
     */
    Writer.prototype.parse = function parse (template, tags) {
      var cache = this.templateCache;
      var cacheKey = template + ':' + (tags || mustache.tags).join(':');
      var isCacheEnabled = typeof cache !== 'undefined';
      var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

      if (tokens == undefined) {
        tokens = parseTemplate(template, tags);
        isCacheEnabled && cache.set(cacheKey, tokens);
      }
      return tokens;
    };

    /**
     * High-level method that is used to render the given `template` with
     * the given `view`.
     *
     * The optional `partials` argument may be an object that contains the
     * names and templates of partials that are used in the template. It may
     * also be a function that is used to load partial templates on the fly
     * that takes a single argument: the name of the partial.
     *
     * If the optional `tags` argument is given here it must be an array with two
     * string values: the opening and closing tags used in the template (e.g.
     * [ "<%", "%>" ]). The default is to mustache.tags.
     */
    Writer.prototype.render = function render (template, view, partials, tags) {
      var tokens = this.parse(template, tags);
      var context = (view instanceof Context) ? view : new Context(view, undefined);
      return this.renderTokens(tokens, context, partials, template, tags);
    };

    /**
     * Low-level method that renders the given array of `tokens` using
     * the given `context` and `partials`.
     *
     * Note: The `originalTemplate` is only ever used to extract the portion
     * of the original template that was contained in a higher-order section.
     * If the template doesn't use higher-order sections, this argument may
     * be omitted.
     */
    Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, tags) {
      var buffer = '';

      var token, symbol, value;
      for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        value = undefined;
        token = tokens[i];
        symbol = token[0];

        if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
        else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
        else if (symbol === '>') value = this.renderPartial(token, context, partials, tags);
        else if (symbol === '&') value = this.unescapedValue(token, context);
        else if (symbol === 'name') value = this.escapedValue(token, context);
        else if (symbol === 'text') value = this.rawValue(token);

        if (value !== undefined)
          buffer += value;
      }

      return buffer;
    };

    Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
      var self = this;
      var buffer = '';
      var value = context.lookup(token[1]);

      // This function is used to render an arbitrary template
      // in the current context by higher-order sections.
      function subRender (template) {
        return self.render(template, context, partials);
      }

      if (!value) return;

      if (isArray(value)) {
        for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
          buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
        }
      } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
        buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
      } else if (isFunction(value)) {
        if (typeof originalTemplate !== 'string')
          throw new Error('Cannot use higher-order sections without the original template');

        // Extract the portion of the original template that the section contains.
        value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

        if (value != null)
          buffer += value;
      } else {
        buffer += this.renderTokens(token[4], context, partials, originalTemplate);
      }
      return buffer;
    };

    Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
      var value = context.lookup(token[1]);

      // Use JavaScript's definition of falsy. Include empty arrays.
      // See https://github.com/janl/mustache.js/issues/186
      if (!value || (isArray(value) && value.length === 0))
        return this.renderTokens(token[4], context, partials, originalTemplate);
    };

    Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
      var filteredIndentation = indentation.replace(/[^ \t]/g, '');
      var partialByNl = partial.split('\n');
      for (var i = 0; i < partialByNl.length; i++) {
        if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
          partialByNl[i] = filteredIndentation + partialByNl[i];
        }
      }
      return partialByNl.join('\n');
    };

    Writer.prototype.renderPartial = function renderPartial (token, context, partials, tags) {
      if (!partials) return;

      var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
      if (value != null) {
        var lineHasNonSpace = token[6];
        var tagIndex = token[5];
        var indentation = token[4];
        var indentedValue = value;
        if (tagIndex == 0 && indentation) {
          indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
        }
        return this.renderTokens(this.parse(indentedValue, tags), context, partials, indentedValue, tags);
      }
    };

    Writer.prototype.unescapedValue = function unescapedValue (token, context) {
      var value = context.lookup(token[1]);
      if (value != null)
        return value;
    };

    Writer.prototype.escapedValue = function escapedValue (token, context) {
      var value = context.lookup(token[1]);
      if (value != null)
        return mustache.escape(value);
    };

    Writer.prototype.rawValue = function rawValue (token) {
      return token[1];
    };

    var mustache = {
      name: 'mustache.js',
      version: '4.0.1',
      tags: [ '{{', '}}' ],
      clearCache: undefined,
      escape: undefined,
      parse: undefined,
      render: undefined,
      Scanner: undefined,
      Context: undefined,
      Writer: undefined,
      /**
       * Allows a user to override the default caching strategy, by providing an
       * object with set, get and clear methods. This can also be used to disable
       * the cache by setting it to the literal `undefined`.
       */
      set templateCache (cache) {
        defaultWriter.templateCache = cache;
      },
      /**
       * Gets the default or overridden caching object from the default writer.
       */
      get templateCache () {
        return defaultWriter.templateCache;
      }
    };

    // All high-level mustache.* functions use this writer.
    var defaultWriter = new Writer();

    /**
     * Clears all cached templates in the default writer.
     */
    mustache.clearCache = function clearCache () {
      return defaultWriter.clearCache();
    };

    /**
     * Parses and caches the given template in the default writer and returns the
     * array of tokens it contains. Doing this ahead of time avoids the need to
     * parse templates on the fly as they are rendered.
     */
    mustache.parse = function parse (template, tags) {
      return defaultWriter.parse(template, tags);
    };

    /**
     * Renders the `template` with the given `view` and `partials` using the
     * default writer. If the optional `tags` argument is given here it must be an
     * array with two string values: the opening and closing tags used in the
     * template (e.g. [ "<%", "%>" ]). The default is to mustache.tags.
     */
    mustache.render = function render (template, view, partials, tags) {
      if (typeof template !== 'string') {
        throw new TypeError('Invalid template! Template should be a "string" ' +
                            'but "' + typeStr(template) + '" was given as the first ' +
                            'argument for mustache#render(template, view, partials)');
      }

      return defaultWriter.render(template, view, partials, tags);
    };

    // Export the escaping function so that the user may override it.
    // See https://github.com/janl/mustache.js/issues/244
    mustache.escape = escapeHtml;

    // Export these mainly for testing, but also for advanced usage.
    mustache.Scanner = Scanner;
    mustache.Context = Context;
    mustache.Writer = Writer;

    return mustache;

  })));
  });

  var LayoutElement = /*#__PURE__*/function (_HTMLElement) {
    _inherits(LayoutElement, _HTMLElement);

    var _super = _createSuper(LayoutElement);

    function LayoutElement(_ref) {
      var _this;

      var root = _ref.root,
          style = _ref.style,
          template = _ref.template,
          templateData = _ref.templateData;

      _classCallCheck(this, LayoutElement);

      _this = _super.call(this); // Props

      _this.__root = root; // Attach

      _this.attachShadow({
        mode: 'open'
      }); // Setup


      _this.__element = _this.__addTemplate(template, templateData);

      _this.__addStyle(style); // Elements


      _this.$el = _this.__getRootElement();
      _this.$refs = _this.__getReferences();
      return _this;
    }

    _createClass(LayoutElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.__triggerConnected();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.__triggerDestroyed();
      }
      /**
       * Getters & Setters
       */

    }, {
      key: "$root",
      get: function get() {
        return this.__root;
      }
    }, {
      key: "element",
      get: function get() {
        return this.__element;
      }
      /**
       * Private
       */

    }, {
      key: "__addTemplate",
      value: function __addTemplate(template) {
        var templateData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (_typeof(template) === 'object') {
          template = this.$root.isLayoutSidebar() ? template.templateSidebar : template.templateDevtools;
        }

        var render = mustache.render(template, templateData);
        this.shadowRoot.innerHTML = render;
        return this.shadowRoot.firstChild;
      }
    }, {
      key: "__addStyle",
      value: function __addStyle(style) {
        if (_typeof(style) === 'object') {
          style = this.$root.isLayoutSidebar() ? style.styleSidebar : style.styleDevtools;
        }

        var element = document.createElement('style');
        var node = document.createTextNode(style);
        element.appendChild(node);
        this.shadowRoot.appendChild(element);
      }
    }, {
      key: "__getRootElement",
      value: function __getRootElement() {
        return this.shadowRoot.firstChild;
      }
    }, {
      key: "__getReferences",
      value: function __getReferences() {
        var refs = {};
        var elements = this.shadowRoot.querySelectorAll('[ref]');
        var item;
        var name;

        for (var i = 0, len = elements.length; i < len; i++) {
          item = elements[i];
          name = item.getAttribute('ref');
          refs[name] = item;
        }

        return refs;
      }
    }, {
      key: "__triggerConnected",
      value: function __triggerConnected() {
        if (typeof this.connected === 'function') {
          this.connected();
        }
      }
    }, {
      key: "__triggerDestroyed",
      value: function __triggerDestroyed() {
        if (typeof this.destroyed === 'function') {
          this.destroyed();
        }
      }
    }]);

    return LayoutElement;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  var styleSidebar = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.dddd {\n    /* Layout */\n    --font: 'Arial', sans-serif;\n    --background-color: #161616;\n\n    /* Panels */\n    --panel-background-color: #1B1B1B;\n    --panel-spacing: 10px;\n\n    /* Groups */\n    --group-header-padding: 14px;\n    --group-header-font-size: 13px;\n    --group-header-background-color: rgba(255, 255, 255, 0.03);\n    --group-padding: 15px;\n    --group-border-radius: 10px;\n\n    /* Components */\n    --component-row-gap: 7px;\n\n    /* Label */\n    --label-width: 35%;\n    --label-padding: 0 20px 0 0;\n    --label-color: rgba(255, 255, 255, 0.75);\n    --label-font-size: 12px;\n    --label-font-weight: 400;\n\n    /* Input */\n    --input-background-color: rgba(255, 255, 255, 0.03);\n    --input-background-color-hover: rgba(255, 255, 255, 0.08);\n    --input-background-color-transition: background-color 0.35s ease-out;\n    --input-highlight-color: rgba(77, 83, 217, 0.64);\n    --input-highlight-color-hover: rgba(77, 83, 217, 1);\n    --input-text-color: rgba(255, 255, 255, 0.75);\n    --input-font-size: 12px;\n    --input-font-weight: 300;\n    --input-border-radius: 6px;\n    --input-padding: 14px;\n    --input-height: 34px;\n\n    position: fixed;\n    top: 0;\n    right: 0;\n\n    width: 300px;\n    height: 100%;\n    max-height: 100vh;\n\n    background: var(--background-color);\n}\n\n.content {\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n}\n\n.resize-handle {\n    position: absolute;\n\n    padding: 0;\n\n    background-color: transparent;\n\n    border: 0;\n    outline: 0;\n}\n\n.resize-handle.side {\n    top: 0;\n    left: 0;\n\n    width: 6px;\n    height: 100%;\n\n    cursor: ew-resize;\n}\n\n.resize-handle.bottom {\n    bottom: 0;\n    left: 0;\n\n    width: 100%;\n    height: 6px;\n\n    cursor: ns-resize;\n}\n\n.resize-handle.corner {\n    bottom: 0;\n    left: 0;\n\n    width: 10px;\n    height: 10px;\n\n    cursor: nesw-resize;\n}\n";

  var styleDevtools = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.dddd {\n    /* Layout */\n    --font: 'Arial', sans-serif;\n    --background-color: #161616;\n\n    /* Panels */\n    --panel-background-color: #1B1B1B;\n    --panel-spacing: 15px;\n\n    /* Groups */\n    --group-header-font-size: 15px;\n    --group-header-background-color: rgba(255, 255, 255, 0.03);\n    --group-padding: 30px;\n    --group-border-radius: 10px;\n\n    /* Components */\n    --component-row-gap: 7px;\n\n    /* Label */\n    --label-width: 30%;\n    --label-padding: 0 20px 0 0;\n    --label-color: rgba(255, 255, 255, 0.75);\n    --label-font-size: 14px;\n    --label-font-weight: 400;\n    \n    /* Input */\n    --input-background-color: rgba(255, 255, 255, 0.03);\n    --input-background-color-hover: rgba(255, 255, 255, 0.08);\n    --input-background-color-transition: background-color 0.35s ease-out;\n    --input-highlight-color: rgba(77, 83, 217, 0.64);\n    --input-highlight-color-hover: rgba(77, 83, 217, 1);\n    --input-text-color: rgba(255, 255, 255, 0.75);\n    --input-font-size: 14px;\n    --input-font-weight: 300;\n    --input-border-radius: 10px;\n    --input-padding: 16px;\n    --input-height: 40px;\n\n    background: var(--background-color);\n}\n";

  var templateSidebar = "<div class=\"dddd\">\n\n    <!-- Content -->\n    <div class=\"content\" ref=\"content\"></div>\n\n    <!-- Resize handle -->\n    <button class=\"resize-handle side\" ref=\"resizeHandleSide\"></button>\n    <button class=\"resize-handle bottom\" ref=\"resizeHandleBottom\"></button>\n    <button class=\"resize-handle corner\" ref=\"resizeHandleCorner\"></button>\n\n</div>\n";

  var templateDevtools = "<div class=\"dddd\">\n\n    <!-- Content -->\n    <div class=\"content\" ref=\"content\"></div>\n\n</div>\n";

  var Container = /*#__PURE__*/function (_LayoutElement) {
    _inherits(Container, _LayoutElement);

    var _super = _createSuper(Container);

    function Container(_ref) {
      var _this;

      var root = _ref.root;

      _classCallCheck(this, Container);

      _this = _super.call(this, {
        root: root,
        style: {
          styleSidebar: styleSidebar,
          styleDevtools: styleDevtools
        },
        template: {
          templateSidebar: templateSidebar,
          templateDevtools: templateDevtools
        }
      }); // Data

      _this._isMouseDown = false;
      _this._width = 0;
      _this._height = 0;
      _this._axis = {
        x: 0,
        y: 0
      }; // Setup

      _this._bindHandlers();

      _this._setupEventListeners();

      return _this;
    }

    _createClass(Container, [{
      key: "destroyed",
      value: function destroyed() {
        this._removeEventListeners();
      }
      /**
       * Getters & Setters
       */

    }, {
      key: "content",
      get: function get() {
        return this.$refs.content;
      }
      /**
       * Public
       */

    }, {
      key: "show",
      value: function show() {
        this.$el.style.width = "".concat(this._width, "px");

        if (this._height) {
          this.$el.style.height = "".concat(this._height, "px");
        } else {
          this.$el.style.height = '100%';
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        this._width = this.$el.offsetWidth;
        this.$el.style.width = 'auto';
        this.$el.style.height = 'auto';
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._resizeHandleSideMouseDownHandler = this._resizeHandleSideMouseDownHandler.bind(this);
        this._resizeHandleBottomMouseDownHandler = this._resizeHandleBottomMouseDownHandler.bind(this);
        this._resizeHandleCornerMouseDownHandler = this._resizeHandleCornerMouseDownHandler.bind(this);
        this._windowMouseUpHandler = this._windowMouseUpHandler.bind(this);
        this._windowMouseMoveHandler = this._windowMouseMoveHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        if (!this.$root.isDevtools) {
          this.$refs.resizeHandleSide.addEventListener('mousedown', this._resizeHandleSideMouseDownHandler);
          this.$refs.resizeHandleBottom.addEventListener('mousedown', this._resizeHandleBottomMouseDownHandler);
          this.$refs.resizeHandleCorner.addEventListener('mousedown', this._resizeHandleCornerMouseDownHandler);
          window.addEventListener('mouseup', this._windowMouseUpHandler);
          window.addEventListener('mousemove', this._windowMouseMoveHandler);
        }
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        if (!this.$root.isDevtools) {
          this.$refs.resizeHandleCorner.removeEventListener('mousedown', this._resizeHandleCornerMouseDownHandler);
          window.removeEventListener('mouseup', this._windowMouseUpHandler);
          window.removeEventListener('mousemove', this._windowMouseMoveHandler);
        }
      }
    }, {
      key: "_resize",
      value: function _resize(x, y) {
        if (this._axis.x) {
          this._width = window.innerWidth - x;
          this.$el.style.width = "".concat(this._width, "px");
        }

        if (this._axis.y) {
          this._height = y;
          this.$el.style.height = "".concat(this._height, "px");
        }

        this.$root.layout.resize();
      }
      /**
       * Handlers
       */

    }, {
      key: "_resizeHandleSideMouseDownHandler",
      value: function _resizeHandleSideMouseDownHandler() {
        this._isMouseDown = true;
        this._axis.x = 1;
        this._axis.y = 0;
      }
    }, {
      key: "_resizeHandleBottomMouseDownHandler",
      value: function _resizeHandleBottomMouseDownHandler() {
        this._isMouseDown = true;
        this._axis.x = 0;
        this._axis.y = 1;
      }
    }, {
      key: "_resizeHandleCornerMouseDownHandler",
      value: function _resizeHandleCornerMouseDownHandler() {
        this._isMouseDown = true;
        this._axis.x = 1;
        this._axis.y = 1;
      }
    }, {
      key: "_windowMouseUpHandler",
      value: function _windowMouseUpHandler() {
        this._isMouseDown = false;
      }
    }, {
      key: "_windowMouseMoveHandler",
      value: function _windowMouseMoveHandler(e) {
        if (this._isMouseDown) {
          this._resize(e.clientX, e.clientY);
        }
      }
    }]);

    return Container;
  }(LayoutElement);
  window.customElements.define('dddd-container', Container);

  var styleSidebar$1 = ".navigation {\n    display: none;\n\n    grid-template-columns: 1fr var(--input-height);\n    column-gap: var(--panel-spacing);\n\n    padding: var(--panel-spacing);\n\n    background-color: var(--panel-background-color);\n\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\n}\n\n.select-container {\n    position: relative;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    user-select: none;\n\n    transition: var(--input-background-color-transition);\n}\n\n.select-container:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.select {\n    width: 100%;\n    height: 100%;\n\n    border: 0;\n    outline: 0;\n\n    padding: 0 var(--input-padding);\n\n    background: transparent;\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    appearance: none;\n}\n\n.select option {\n    color: black;\n}\n\n.arrow {\n    position: absolute;\n    top: 0;\n    right: var(--input-padding);\n    bottom: 0;\n\n    margin: auto 0;\n}\n\n.button-toggle {\n    position: relative;\n\n    width: var(--input-height);\n    height: var(--input-height);\n\n    background-color: var(--input-background-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: 0;\n\n    cursor: pointer;\n\n    transition: var(--input-background-color-transition);\n}\n\n.button-toggle:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.button-toggle__line {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n\n    width: 12px;\n    height: 2px;\n\n    margin: auto;\n\n    background: var(--input-text-color);\n}\n";

  var styleDevtools$1 = ".navigation {\n    display: none;\n    \n    padding: var(--panel-spacing);\n\n    font-size: 0;\n\n    list-style: none;\n\n    background-color: var(--panel-background-color);\n\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\n}\n\n.navigation li {\n    display: inline-block;\n\n    margin-right: 10px;\n}\n\n.navigation-button {\n    padding: 13px 30px;\n\n    color: rgba(255, 255, 255, 0.5);\n\n    background-color: transparent;\n\n    border: 0;\n    border-radius: 12px;\n    outline: 0;\n\n    font-family: var(--font);\n    font-size: 13px;\n    font-weight: 600;\n\n    cursor: pointer;\n\n    transition: all 0.3s ease-out;\n}\n\n.navigation-button:hover {\n    background-color: rgba(255, 255, 255, 0.01);\n}\n\n.navigation-button.active {\n    color: rgba(255, 255, 255, 0.9);\n\n    background-color: rgba(255, 255, 255, 0.03);\n}";

  var templateSidebar$1 = "<div class=\"navigation\">\n\n    <!-- Select container-->\n    <div class=\"select-container\" ref=\"selectContainer\">\n\n        <!-- Arrow -->\n        <svg width=\"11\" height=\"6\" viewBox=\"0 0 11 6\" class=\"arrow\">\n            <path d=\"M1 1L4.83564 4.40945C5.21452 4.74624 5.78548 4.74624 6.16436 4.40945L10 1\" stroke=\"white\" fill=\"transparent\" stroke-opacity=\"0.74\" stroke-linecap=\"round\"/>\n        </svg>\n\n        <!-- Select -->\n        <select class=\"select\" ref=\"select\"></select>\n\n    </div>\n\n    <!-- Button toggle -->\n    <button class=\"button-toggle\" ref=\"buttonToggle\">\n        <div class=\"button-toggle__line\"></div>\n    </button>\n\n</div>\n";

  var templateDevtools$1 = "<ul class=\"navigation\"></ul>\n";

  var NAVIGATION_BUTTON_CLASS = 'navigation-button';
  var ACTIVE_CLASS = 'active';

  var Navigation = /*#__PURE__*/function (_LayoutElement) {
    _inherits(Navigation, _LayoutElement);

    var _super = _createSuper(Navigation);

    function Navigation(_ref) {
      var _this;

      var root = _ref.root;

      _classCallCheck(this, Navigation);

      _this = _super.call(this, {
        root: root,
        style: {
          styleSidebar: styleSidebar$1,
          styleDevtools: styleDevtools$1
        },
        template: {
          templateSidebar: templateSidebar$1,
          templateDevtools: templateDevtools$1
        }
      }); // Data

      _this._activeIndex = 0;
      _this._elements = []; // Setup

      _this._bindHandlers();

      _this._setupEventListeners();

      return _this;
    }

    _createClass(Navigation, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventListeners();
      }
      /**
       * Public
       */

    }, {
      key: "add",
      value: function add(label) {
        if (this._elements.length === 0) {
          this._show();
        }

        if (this.$root.isLayoutSidebar()) {
          var option = document.createElement('option');
          option.innerText = label;
          option.value = this._elements.length;

          this._elements.push(option);

          this.$refs.select.appendChild(option);
        } else {
          var button = document.createElement('button');
          button.classList.add(NAVIGATION_BUTTON_CLASS);

          if (this.$el.children.length === this._activeIndex) {
            button.classList.add(ACTIVE_CLASS);
          }

          button.innerText = label;
          var li = document.createElement('li');
          li.appendChild(button);

          this._elements.push(li);

          this.$el.appendChild(li);
        }
      }
    }, {
      key: "show",
      value: function show() {
        this.$refs.selectContainer.style.display = 'block';
        this.$el.style.display = 'grid';
      }
    }, {
      key: "hide",
      value: function hide() {
        this.$refs.selectContainer.style.display = 'none';
        this.$el.style.display = 'block';
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._clickHandler = this._clickHandler.bind(this);
        this._selectChangeHandler = this._selectChangeHandler.bind(this);
        this._clickButtonToggle = this._clickButtonToggle.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this.$el.addEventListener('click', this._clickHandler);
        if (this.$refs.select) this.$refs.select.addEventListener('change', this._selectChangeHandler);
        if (this.$refs.buttonToggle) this.$refs.buttonToggle.addEventListener('click', this._clickButtonToggle);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this.$el.removeEventListener('click', this._clickHandler);
        if (this.$refs.select) this.$refs.select.removeEventListener('change', this._selectChangeHandler);
        if (this.$refs.buttonToggle) this.$refs.buttonToggle.removeEventListener('click', this._clickButtonToggle);
      }
    }, {
      key: "_show",
      value: function _show() {
        this.$el.style.display = 'grid';
      }
    }, {
      key: "_getNavigationButtonIndex",
      value: function _getNavigationButtonIndex(element) {
        return Array.prototype.indexOf.call(this.$el.children, element);
      }
    }, {
      key: "_switch",
      value: function _switch(index) {
        this.$el.children[this._activeIndex].firstChild.classList.remove(ACTIVE_CLASS);

        this._activeIndex = index;

        this.$el.children[this._activeIndex].firstChild.classList.add(ACTIVE_CLASS);

        this._triggerSwitchEvent(this._activeIndex);
      }
    }, {
      key: "_triggerSwitchEvent",
      value: function _triggerSwitchEvent(index) {
        this._activeIndex = index;
        var event = new CustomEvent('switch', {
          detail: {
            index: this._activeIndex
          }
        });
        this.dispatchEvent(event);
      }
      /**
       * Handlers
       */

    }, {
      key: "_clickHandler",
      value: function _clickHandler(e) {
        if (e.target.closest(".".concat(NAVIGATION_BUTTON_CLASS))) {
          var index = this._getNavigationButtonIndex(e.target.parentElement);

          this._switch(index);
        }
      }
    }, {
      key: "_selectChangeHandler",
      value: function _selectChangeHandler() {
        var index = parseInt(this.$refs.select.value);

        this._triggerSwitchEvent(index);
      }
    }, {
      key: "_clickButtonToggle",
      value: function _clickButtonToggle() {
        this.$root.layout.toggleVisibility();
      }
    }]);

    return Navigation;
  }(LayoutElement);
  window.customElements.define('dddd-navigation', Navigation);

  var style = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.layer {\n    display: none;\n\n    position: relative;\n\n    width: 100%;\n    overflow: hidden;\n}\n\n.layer.active {\n    display: block;\n}\n";

  var template = "<div class=\"layer\"></div>";

  var ACTIVE_CLASS$1 = 'active';
  var GROUP_MIN_WIDTH = 350;

  var Layer = /*#__PURE__*/function (_LayoutElement) {
    _inherits(Layer, _LayoutElement);

    var _super = _createSuper(Layer);

    function Layer(_ref) {
      var _this;

      var root = _ref.root,
          label = _ref.label;

      _classCallCheck(this, Layer);

      _this = _super.call(this, {
        root: root,
        style: style,
        template: template,
        templateData: {
          label: label
        }
      }); // Props

      _this._label = label; // Data

      _this._containerWidth = 0;
      _this._itemWidth = 0;
      _this._columnsHeight = []; // Setup

      _this._bindHandlers();

      _this._setupEventListeners();

      return _this;
    }

    _createClass(Layer, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventListeners();
      }
      /**
       * Getters & Setters
       */

    }, {
      key: "label",
      get: function get() {
        return this._label;
      }
      /**
       * Public
       */

    }, {
      key: "addGroup",
      value: function addGroup(label) {
        return this.$root.addGroup(label, {
          container: this._label
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.$el.classList.add(ACTIVE_CLASS$1);
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.$el.classList.remove(ACTIVE_CLASS$1);
      }
    }, {
      key: "resize",
      value: function resize() {
        this._resize();
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._resizeHandler = this._resizeHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        window.addEventListener('resize', this._resizeHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        window.removeEventListener('resize', this._resizeHandler);
      }
      /**
       * Resize
       */

    }, {
      key: "_resize",
      value: function _resize() {
        if (this.$el.children.length === 0) return;
        this._containerWidth = this.$el.offsetWidth;
        this._columnCount = this._getColumCount();
        this._itemGap = this._getItemGap();
        this._itemWidth = this._getItemWidth();

        this._resetColumnHeight();

        if (!this.$root.isLayoutSidebar()) {
          this._positionGroups();

          this._updateHeight();
        }
      }
    }, {
      key: "_getColumCount",
      value: function _getColumCount() {
        return Math.max(Math.floor(this._containerWidth / GROUP_MIN_WIDTH), 1);
      }
    }, {
      key: "_getItemWidth",
      value: function _getItemWidth() {
        var gap = this._itemGap * (this._columnCount - 1);
        var width = Math.floor((this._containerWidth - gap) / this._columnCount);
        return width;
      }
    }, {
      key: "_getItemGap",
      value: function _getItemGap() {
        var element = this.$el.children[0].element;
        var computedStyles = window.getComputedStyle(element);
        var gap = parseInt(computedStyles.marginRight);
        return gap;
      }
    }, {
      key: "_getItemHeight",
      value: function _getItemHeight(element) {
        var computedStyles = window.getComputedStyle(element);
        var height = element.offsetHeight;
        height += parseInt(computedStyles.marginBottom);
        return height;
      }
    }, {
      key: "_resetColumnHeight",
      value: function _resetColumnHeight() {
        this._columnsHeight = [];

        for (var i = 0; i < this._columnCount; i++) {
          this._columnsHeight.push(0);
        }
      }
    }, {
      key: "_positionGroups",
      value: function _positionGroups() {
        var _iterator = _createForOfIteratorHelper(this.$el.children),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;

            var columnIndex = this._getNexColumnIndex();

            var gap = (columnIndex < this._columnCount ? this._itemGap : 0) * columnIndex;
            var x = columnIndex * this._itemWidth + gap;
            var y = this._columnsHeight[columnIndex];

            var height = this._getItemHeight(item.element);

            this._columnsHeight[columnIndex] += height;
            item.element.style.position = 'absolute';
            item.element.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
            item.element.style.width = "".concat(this._itemWidth, "px");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "_getNexColumnIndex",
      value: function _getNexColumnIndex() {
        var column = this._columnsHeight.slice(0).sort(function (a, b) {
          return a - b;
        }).shift();

        var index = this._columnsHeight.indexOf(column);

        return index;
      }
    }, {
      key: "_updateHeight",
      value: function _updateHeight() {
        var height = Math.max.apply(Math, _toConsumableArray(this._columnsHeight));
        this.$el.style.height = "".concat(height, "px");
      }
      /**
       * Handlers
       */

    }, {
      key: "_resizeHandler",
      value: function _resizeHandler() {
        this._resize();
      }
    }]);

    return Layer;
  }(LayoutElement);
  window.customElements.define('dddd-layer', Layer);

  var style$1 = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.layers {\n    position: relative;\n\n    width: 100%;\n\n    /* padding: var(--panel-spacing) var(--panel-spacing) 0 var(--panel-spacing); */\n    padding: var(--panel-spacing);\n\n    -webkit-font-smoothing: antialiased;\n    font-family: var(--font);\n    font-weight: 300;\n    font-size: 13px;\n}\n";

  var template$1 = "<div class=\"layers\"></div>";

  var Layers = /*#__PURE__*/function (_LayoutElement) {
    _inherits(Layers, _LayoutElement);

    var _super = _createSuper(Layers);

    function Layers(_ref) {
      var _this;

      var root = _ref.root;

      _classCallCheck(this, Layers);

      _this = _super.call(this, {
        root: root,
        style: style$1,
        template: template$1
      }); // Options

      _this._activeIndex = 0;
      _this._layers = [];
      return _this;
    }
    /**
     * Public
     */


    _createClass(Layers, [{
      key: "add",
      value: function add(label) {
        var layer = new Layer({
          root: this.$root,
          label: label
        });

        if (this._layers.length === this._activeIndex) {
          layer.activate();
        }

        this._layers.push(layer);

        this.$el.appendChild(layer);
        return layer;
      }
    }, {
      key: "goto",
      value: function goto(index) {
        var currentIndex = this._activeIndex;
        var newIndex = index;

        this._layers[currentIndex].deactivate();

        this._layers[newIndex].activate();

        this._activeIndex = newIndex;

        this._resizeLayers();
      }
    }, {
      key: "get",
      value: function get(container) {
        var _iterator = _createForOfIteratorHelper(this._layers),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var layer = _step.value;
            if (layer.label === container) return layer.element;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return null;
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return this._layers.length === 0;
      }
    }, {
      key: "resize",
      value: function resize() {
        this._resizeLayers();
      }
    }, {
      key: "show",
      value: function show() {
        this.$el.style.display = 'block';
      }
    }, {
      key: "hide",
      value: function hide() {
        this.$el.style.display = 'none';
      }
      /**
       * Private
       */

    }, {
      key: "_resizeLayers",
      value: function _resizeLayers() {
        var _iterator2 = _createForOfIteratorHelper(this._layers),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var layer = _step2.value;
            layer.resize();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }]);

    return Layers;
  }(LayoutElement);
  window.customElements.define('dddd-layers', Layers);

  var styleSidebar$2 = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.group {\n    overflow: hidden;\n\n    /* margin: 0 var(--panel-spacing) var(--panel-spacing) 0; */\n\n    background-color: var(--panel-background-color);\n\n    border-radius: var(--group-border-radius);\n\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\n}\n\n[data-level=\"1\"].group {\n    border-radius: 0;\n    margin: 0 calc(var(--group-padding) * -1);\n    box-shadow: 0;\n}\n\n[data-level=\"1\"] .button-header {\n    margin-bottom: 0;\n\n    background: rgba(255, 255, 255, 0.01);\n}\n\n[data-level=\"1\"] .label {\n    font-size: 12px;\n}\n\n[data-level=\"1\"] .content {\n    background: rgba(255, 255, 255, 0.01);\n}\n\n.button-header {\n    position: relative;\n\n    width: 100%;\n\n    padding: 0;\n    margin-bottom: var(--group-padding);\n\n    text-align: left;\n\n    background-color: var(--group-header-background-color);\n\n    border: 0;\n    outline: 0;\n    cursor: pointer;\n}\n\n.label {\n    display: block;\n\n    padding: var(--group-header-padding);\n\n    font-size: var(--group-header-font-size);\n    font-weight: 600;\n    color: white;\n    letter-spacing: 0.025em;\n}\n\n.arrow {\n    position: absolute;\n    top: 0;\n    right: calc(var(--panel-spacing) + 7px);\n    bottom: 0;\n\n    margin: auto 0;\n}\n\n.content {\n    display: grid;\n\n    row-gap: var(--component-row-gap);\n\n    padding: 0 var(--group-padding) var(--group-padding);\n}\n";

  var styleDevtools$2 = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.group {\n    padding: calc(var(--group-padding) - 3px) var(--group-padding) var(--group-padding);\n    margin: 0 var(--panel-spacing) var(--panel-spacing) 0;\n\n    background-color: var(--panel-background-color);\n    \n    border-radius: var(--group-border-radius);\n\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\n}\n\n.label {\n    display: block;\n\n    margin-bottom: 20px;\n\n    font-size: var(--group-header-font-size);\n    font-weight: 600;\n    color: white;\n    letter-spacing: 0.025em;\n}\n\n.content {\n    display: grid;\n\n    row-gap: var(--component-row-gap);\n}";

  var templateSidebar$2 = "<div class=\"group\">\n\n    <!-- Button header -->\n    <button class=\"button-header\" ref=\"buttonHeader\">\n\n        <!-- Label -->\n        <span class=\"label\">\n            {{ label }}\n        </span>\n\n        <!-- Arrow -->\n        <svg width=\"11\" height=\"6\" viewBox=\"0 0 11 6\" class=\"arrow\">\n            <path d=\"M1 1L4.83564 4.40945C5.21452 4.74624 5.78548 4.74624 6.16436 4.40945L10 1\" stroke=\"white\" fill=\"transparent\" stroke-opacity=\"0.74\" stroke-linecap=\"round\"/>\n        </svg>\n\n    </button>\n\n    <!-- Content -->\n    <div class=\"content\" ref=\"content\"></div>\n\n</div>\n";

  var templateDevtools$2 = "<div class=\"group sidebar\">\n\n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Content -->\n    <div class=\"content\" ref=\"content\"></div>\n\n</div>\n";

  var Group = /*#__PURE__*/function (_LayoutElement) {
    _inherits(Group, _LayoutElement);

    var _super = _createSuper(Group);

    function Group(_ref) {
      var _this;

      var root = _ref.root,
          label = _ref.label,
          options = _ref.options;

      _classCallCheck(this, Group);

      _this = _super.call(this, {
        root: root,
        style: {
          styleSidebar: styleSidebar$2,
          styleDevtools: styleDevtools$2
        },
        template: {
          templateSidebar: templateSidebar$2,
          templateDevtools: templateDevtools$2
        },
        templateData: {
          label: label
        }
      }); // Props

      _this._label = label;
      _this._options = options;
      _this._parent = options.parent; // Data

      _this._isContentVisible = true; // Setup

      _this._bindHandlers();

      _this._setupEventListeners();

      _this._addLevelClass();

      return _this;
    }

    _createClass(Group, [{
      key: "destroyed",
      value: function destroyed() {
        this._removeEventListeners();
      }
      /**
       * Getters & Setters
       */

    }, {
      key: "label",
      get: function get() {
        return this._label;
      }
    }, {
      key: "content",
      get: function get() {
        return this.$refs.content;
      }
      /**
       * Public
       */

    }, {
      key: "add",
      value: function add(object, property) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        options.container = this;
        return this.$root.add(object, property, options);
      }
    }, {
      key: "addButton",
      value: function addButton(options) {
        options.container = this;
        return this.$root.addButton(options);
      }
    }, {
      key: "addGroup",
      value: function addGroup(label) {
        return this.$root.addGroup(label, {
          container: this._label,
          parent: this
        });
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._clickHandler = this._clickHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        if (this.$refs.buttonHeader) this.$refs.buttonHeader.addEventListener('click', this._clickHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        if (this.$refs.buttonHeader) this.$refs.buttonHeader.removeEventListener('click', this._clickHandler);
      }
    }, {
      key: "_addLevelClass",
      value: function _addLevelClass() {
        var level = 0;

        function countLevel(group) {
          if (group._parent) {
            level++;
            countLevel(group._parent);
          }
        }

        countLevel(this);
        this.$el.dataset.level = level;
      }
    }, {
      key: "_toggleContent",
      value: function _toggleContent() {
        this._isContentVisible = !this._isContentVisible;
        this.$refs.content.style.display = this._isContentVisible ? 'grid' : 'none';
      }
      /**
       * Handlers
       */

    }, {
      key: "_clickHandler",
      value: function _clickHandler() {
        this._toggleContent();
      }
    }]);

    return Group;
  }(LayoutElement);
  window.customElements.define('dddd-group', Group);

  var LayoutModel = /*#__PURE__*/function () {
    function LayoutModel() {
      _classCallCheck(this, LayoutModel);

      this._layers = [];
      this._groups = [];
      this._components = [];
    }
    /**
     * Public
     */


    _createClass(LayoutModel, [{
      key: "addLayer",
      value: function addLayer(label) {
        this._layers.push(label);
      }
    }, {
      key: "addGroup",
      value: function addGroup(label) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        this._groups.push({
          label: label,
          options: options
        });
      }
    }, {
      key: "addComponent",
      value: function addComponent(model) {
        this._components.push(model);
      }
    }, {
      key: "get",
      value: function get() {
        var structure = {
          layers: this._layers,
          groups: this._groups,
          components: this._getComponents()
        };
        return structure;
      }
      /**
       * Private
       */

    }, {
      key: "_getComponents",
      value: function _getComponents() {
        var components = [];

        var _iterator = _createForOfIteratorHelper(this._components),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var model = _step.value;
            components.push(model.getData());
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return components;
      }
    }]);

    return LayoutModel;
  }();

  var LayoutModel$1 = new LayoutModel();

  var Component = /*#__PURE__*/function (_HTMLElement) {
    _inherits(Component, _HTMLElement);

    var _super = _createSuper(Component);

    function Component(_ref) {
      var _this;

      var root = _ref.root,
          model = _ref.model,
          style = _ref.style,
          template = _ref.template;

      _classCallCheck(this, Component);

      _this = _super.call(this); // Props

      _this.__root = root;
      _this.__model = model; // Attach

      _this.attachShadow({
        mode: 'open'
      }); // Setup


      _this.$el = _this.__addTemplate(template);
      _this.$refs = _this.__getReferences(_this.$el);

      _this.__addStyle(style);

      _this.__addLockedClass();

      _this.__bindHandlers();

      return _this;
    }

    _createClass(Component, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.__setupEventListeners();

        this.__triggerResize();

        this.__triggerConnected();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.__removeEventListeners();

        this.__triggerDestroyed();
      }
      /**
       * Getters & Setters
       */

    }, {
      key: "$root",
      get: function get() {
        return this.__root;
      }
    }, {
      key: "model",
      get: function get() {
        return this.__model;
      }
    }, {
      key: "container",
      get: function get() {
        return this.__model.options.container;
      }
      /**
       * Public
       */

    }, {
      key: "tick",
      value: function tick() {
        this.__triggerTick();

        if (this.model.options.listen) {
          this.model.updateValueFromObject(); // !this.__root.isDevtools

          this.__triggerOnListen();
        }
      }
      /**
       * Private
       */

    }, {
      key: "__bindHandlers",
      value: function __bindHandlers() {
        this.__resizeHandler = this.__resizeHandler.bind(this);
      }
    }, {
      key: "__setupEventListeners",
      value: function __setupEventListeners() {
        window.addEventListener('resize', this.__resizeHandler);
      }
    }, {
      key: "__removeEventListeners",
      value: function __removeEventListeners() {
        window.removeEventListener('resize', this.__resizeHandler);
      }
    }, {
      key: "__addTemplate",
      value: function __addTemplate(template) {
        var templateData = {
          label: this.__getLabel()
        };
        var render = mustache.render(template, templateData);
        this.shadowRoot.innerHTML = render;
        return this.shadowRoot.firstChild;
      }
    }, {
      key: "__addStyle",
      value: function __addStyle(style) {
        var element = document.createElement('style');
        var node = document.createTextNode(style);
        element.appendChild(node);
        this.shadowRoot.appendChild(element);
      }
    }, {
      key: "__getLabel",
      value: function __getLabel() {
        return this.__model.options.label ? this.__model.options.label : this.__model.property;
      }
    }, {
      key: "__getReferences",
      value: function __getReferences(element) {
        var refs = {};
        var elements = element.querySelectorAll('[ref]');
        var item;
        var name;

        for (var i = 0, len = elements.length; i < len; i++) {
          item = elements[i];
          name = item.getAttribute('ref');
          refs[name] = item;
        }

        return refs;
      }
    }, {
      key: "__addLockedClass",
      value: function __addLockedClass() {
        if (this.model.options.locked) {
          this.$el.classList.add('locked');
        }
      }
    }, {
      key: "__triggerConnected",
      value: function __triggerConnected() {
        if (typeof this.connected === 'function') {
          this.connected();
        }
      }
    }, {
      key: "__triggerDestroyed",
      value: function __triggerDestroyed() {
        if (typeof this.destroyed === 'function') {
          this.destroyed();
        }
      }
    }, {
      key: "__triggerResize",
      value: function __triggerResize() {
        if (typeof this.onResize === 'function') {
          this.onResize();
        }
      }
    }, {
      key: "__triggerTick",
      value: function __triggerTick() {
        if (typeof this.onTick === 'function') {
          this.onTick();
        }
      }
    }, {
      key: "__triggerOnListen",
      value: function __triggerOnListen() {
        if (typeof this.onListen === 'function') {
          this.onListen();
        }
      }
      /**
       * Handlers
       */

    }, {
      key: "__resizeHandler",
      value: function __resizeHandler() {
        this.__triggerResize();
      }
    }]);

    return Component;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  var style$2 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    position: relative;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    user-select: none;\n\n    transition: var(--input-background-color-transition);\n\n    cursor: col-resize;\n}\n\n.input-container:hover,\n.input-container.active {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.scrubber {\n    position: absolute;\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n\n    background: var(--input-highlight-color);\n\n    transform-origin: top left;\n}\n\n.input {\n    position: relative;\n    display: block;\n\n    width: 100%;\n    height: 100%;\n\n    padding: 0 var(--input-padding);\n\n    background-color: transparent;\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    line-height: var(--input-height);\n    color: var(--input-text-color);\n\n    outline: none;\n    border: 0;\n\n    pointer-events: none;\n}\n";

  var template$2 = "<div class=\"component\">\n    \n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Input container -->\n    <div class=\"input-container\" ref=\"inputContainer\">\n\n        <!-- Scrubber -->\n        <div class=\"scrubber\" ref=\"scrubber\"></div>\n        \n        <!-- Input -->\n        <input class=\"input\" ref=\"input\">\n\n    </div>\n\n</div>";

  var ACTIVE_CLASS$2 = 'active';
  var PRECISION_MODIFIER = 0.3; // TODO: On change is triggered twice

  var Slider = /*#__PURE__*/function (_Component) {
    _inherits(Slider, _Component);

    var _super = _createSuper(Slider);

    function Slider(root, model) {
      var _this;

      _classCallCheck(this, Slider);

      _this = _super.call(this, {
        root: root,
        style: style$2,
        template: template$2,
        model: model
      }); // Data

      _this._scrubberOffset = 0;
      _this._inputContainer = {
        x: 0,
        width: 0
      };
      _this._scrubber = {
        width: 0
      };
      _this._mouseStartPosition = {
        x: 0,
        y: 0
      };
      _this._mousePosition = {
        x: 0,
        y: 0
      };
      _this._inputContainerWidth = null;
      _this._isMouseDown = false;
      _this._isShiftDown = false;
      _this._isSlideStarted = false; // Setup

      _this._bindHandlers();

      return _this;
    }

    _createClass(Slider, [{
      key: "connected",
      value: function connected() {
        this._updateValue(this.model.value);

        this._setupEventListeners();
      }
    }, {
      key: "destroyed",
      value: function destroyed() {
        this._removeEventListeners();
      }
      /**
       * Hooks
       */

    }, {
      key: "onResize",
      value: function onResize() {
        this._resize();
      }
    }, {
      key: "onTick",
      value: function onTick() {
        this._scaleScrubber(this.model.value);
      }
    }, {
      key: "onListen",
      value: function onListen() {
        this._updateInputValue(this.model.value);

        this._scaleScrubber(this.model.value);
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._windowMouseMoveHandler = this._windowMouseMoveHandler.bind(this);
        this._windowMouseUpHandler = this._windowMouseUpHandler.bind(this);
        this._inputContainerMouseDownHandler = this._inputContainerMouseDownHandler.bind(this);
        this._inputContainerMouseUpHandler = this._inputContainerMouseUpHandler.bind(this);
        this._inputContainerDoubleClickHandler = this._inputContainerDoubleClickHandler.bind(this);
        this._inputChangeHandler = this._inputChangeHandler.bind(this);
        this._inputBlurHandler = this._inputBlurHandler.bind(this);
        this._windowKeyDownHandler = this._windowKeyDownHandler.bind(this);
        this._windowKeyUpHandler = this._windowKeyUpHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this.$refs.inputContainer.addEventListener('mousedown', this._inputContainerMouseDownHandler);
        this.$refs.inputContainer.addEventListener('mouseup', this._inputContainerMouseUpHandler);
        this.$refs.inputContainer.addEventListener('dblclick', this._inputContainerDoubleClickHandler);
        this.$refs.input.addEventListener('change', this._inputChangeHandler);
        this.$refs.input.addEventListener('blur', this._inputBlurHandler);
        window.addEventListener('mousemove', this._windowMouseMoveHandler);
        window.addEventListener('mouseup', this._windowMouseUpHandler);
        window.addEventListener('keydown', this._windowKeyDownHandler);
        window.addEventListener('keyup', this._windowKeyUpHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this.$refs.inputContainer.removeEventListener('mousedown', this._inputContainerMouseDownHandler);
        this.$refs.inputContainer.removeEventListener('mouseup', this._inputContainerMouseUpHandler);
        this.$refs.inputContainer.removeEventListener('dblclick', this._inputContainerDoubleClickHandler);
        this.$refs.input.removeEventListener('change', this._inputChangeHandler);
        this.$refs.input.removeEventListener('blur', this._inputBlurHandler);
        window.removeEventListener('mousemove', this._windowMouseMoveHandler);
        window.removeEventListener('mouseup', this._windowMouseUpHandler);
        window.removeEventListener('keydown', this._windowKeyDownHandler);
        window.removeEventListener('keyup', this._windowKeyUpHandler);
      }
    }, {
      key: "_updateValue",
      value: function _updateValue(value) {
        this.model.value = Math.max(Math.min(value, this.model.options.max), this.model.options.min);

        this._updateInputValue(this.model.value);
      }
    }, {
      key: "_calcValue",
      value: function _calcValue(mouseX) {
        var modifier = this._isShiftDown ? PRECISION_MODIFIER : 1;
        var delta = (mouseX - this._mouseStartPosition.x) * modifier;
        var x = this._mouseStartPosition.x - this._inputContainer.x + delta;
        var percentage = x / this._inputContainerWidth;

        var value = this._map(percentage, 0, 1, this.model.options.min, this.model.options.max);

        return value;
      }
    }, {
      key: "_scaleScrubber",
      value: function _scaleScrubber(value) {
        var scaleX = this._map(value, this.model.options.min, this.model.options.max, 0, 1);

        this.$refs.scrubber.style.transform = "scaleX(".concat(scaleX, ")");
      }
    }, {
      key: "_showScrubber",
      value: function _showScrubber() {
        this.$refs.scrubber.style.display = 'block';
      }
    }, {
      key: "_hideScrubber",
      value: function _hideScrubber() {
        this.$refs.scrubber.style.display = 'none';
      }
    }, {
      key: "_updateInputValue",
      value: function _updateInputValue(value) {
        var output = (Math.round(value * 100) / 100).toFixed(2);
        this.$refs.input.value = output;
      }
    }, {
      key: "_map",
      value: function _map(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
      }
      /**
       * Resize
       */

    }, {
      key: "_resize",
      value: function _resize() {
        this._inputContainer = this._getContainerData();
        this._inputContainerWidth = this._inputContainer.width;

        this._scaleScrubber(this.model.value);
      }
    }, {
      key: "_getContainerData",
      value: function _getContainerData() {
        var bcr = this.$refs.inputContainer.getBoundingClientRect();
        var x = bcr.left;
        var width = bcr.width;
        return {
          x: x,
          width: width
        };
      }
    }, {
      key: "_selectInput",
      value: function _selectInput() {
        this._isInputSelected = true;
        this.$refs.input.select();
      }
    }, {
      key: "_deselectInput",
      value: function _deselectInput() {
        this._isInputSelected = false;
        this.$refs.input.blur();
      }
    }, {
      key: "_addActiveClass",
      value: function _addActiveClass() {
        this.$refs.inputContainer.classList.add(ACTIVE_CLASS$2);
      }
    }, {
      key: "_removeActiveClass",
      value: function _removeActiveClass() {
        this.$refs.inputContainer.classList.remove(ACTIVE_CLASS$2);
      }
      /**
       * Handlers
       */

    }, {
      key: "_windowMouseMoveHandler",
      value: function _windowMouseMoveHandler(e) {
        if (this._isMouseDown) {
          this._mousePosition.x = e.clientX;

          if (Math.abs(this._mouseStartPosition.x - e.clientX) > 2) {
            this._isSlideStarted = true;
          }

          var value = this._calcValue(e.clientX);

          this._updateValue(value);
        }
      }
    }, {
      key: "_windowMouseUpHandler",
      value: function _windowMouseUpHandler(e) {
        this._isMouseDown = false;
        this._isSlideStarted = false;

        this._removeActiveClass(); // clearTimeout(this._mouseDownClickTimeout);

      }
    }, {
      key: "_inputContainerMouseUpHandler",
      value: function _inputContainerMouseUpHandler() {
        if (this._isSlideStarted) return;

        this._selectInput();

        this._hideScrubber();
      }
    }, {
      key: "_inputContainerMouseDownHandler",
      value: function _inputContainerMouseDownHandler(e) {
        if (this._isMouseDown || this._isInputSelected) return;

        this._addActiveClass();

        this._mouseStartPosition.x = e.clientX; // clearTimeout(this._mouseDownClickTimeout);

        this._isMouseDown = true; // this._mouseDownClickTimeout = setTimeout(() => {
        //     this._isMouseDown = true;
        //     const value = this._calcValue(e.clientX);
        //     this._updateValue(value);
        // }, 150);
      }
    }, {
      key: "_inputContainerDoubleClickHandler",
      value: function _inputContainerDoubleClickHandler(e) {
        // clearTimeout(this._mouseDownClickTimeout);
        this._selectInput();
      }
    }, {
      key: "_inputChangeHandler",
      value: function _inputChangeHandler(e) {
        var value = parseFloat(this.$refs.input.value);

        this._updateValue(value);

        this._deselectInput();

        this._showScrubber();
      }
    }, {
      key: "_inputBlurHandler",
      value: function _inputBlurHandler() {
        this._isInputSelected = false;

        this._showScrubber();
      }
    }, {
      key: "_windowKeyDownHandler",
      value: function _windowKeyDownHandler(e) {
        switch (e.keyCode) {
          case 16:
            // Shift
            if (!this._isShiftDown) {
              this._isShiftDown = true;
              this._mouseStartPosition.x = this._mousePosition.x;
            }

            break;
        }
      }
    }, {
      key: "_windowKeyUpHandler",
      value: function _windowKeyUpHandler() {
        this._isShiftDown = false;
      }
    }]);

    return Slider;
  }(Component);
  window.customElements.define('dddd-slider', Slider);

  var style$3 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n\n    transition: background-color 0.15s;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input {\n    height: var(--input-height);\n\n    padding: 0 var(--input-padding);\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    background-color: var(--input-background-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: none;\n\n    transition: var(--input-background-color-transition);\n}\n\n.input:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n";

  var template$3 = "<div class=\"component\">\n    \n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Input -->\n    <input class=\"input\" ref=\"input\">\n\n</div>";

  var Text = /*#__PURE__*/function (_Component) {
    _inherits(Text, _Component);

    var _super = _createSuper(Text);

    function Text(root, model) {
      var _this;

      _classCallCheck(this, Text);

      _this = _super.call(this, {
        root: root,
        style: style$3,
        template: template$3,
        model: model
      }); // Setup

      _this._bindHandlers();

      return _this;
    }

    _createClass(Text, [{
      key: "connected",
      value: function connected() {
        this._updateInputValue(this.model.value);

        this._setupEventListeners();
      }
    }, {
      key: "destroyed",
      value: function destroyed() {
        this._removeEventListeners();
      }
      /**
       * Hooks
       */

    }, {
      key: "onListen",
      value: function onListen() {
        this._updateInputValue(this.model.value);
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._keyUpHandler = this._keyUpHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this.$refs.input.addEventListener('keyup', this._keyUpHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this.$refs.input.removeEventListener('keyup', this._keyUpHandler);
      }
    }, {
      key: "_updateInputValue",
      value: function _updateInputValue(value) {
        this.$refs.input.value = value;
      }
      /**
       * Handlers
       */

    }, {
      key: "_keyUpHandler",
      value: function _keyUpHandler() {
        this.model.value = this.$refs.input.value;
      }
    }]);

    return Text;
  }(Component);
  window.customElements.define('dddd-input', Text);

  var style$4 = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: start;\n\n    transition: background-color 0.15s;\n}\n\n.label {\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    line-height: var(--input-height);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input {\n    width: 100%;\n    height: var(--input-height);\n\n    padding: 0 var(--input-padding);\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    background-color: var(--input-background-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: none;\n\n    transition: var(--input-background-color-transition);\n\n    cursor: ew-resize;\n}\n\n.input:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n";

  var template$4 = "<div class=\"component\">\n\n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Input -->\n    <input class=\"input\" ref=\"input\">\n\n</div>\n";

  var DEFAULT_STEP_SIZE = 0.01;

  var Number = /*#__PURE__*/function (_Component) {
    _inherits(Number, _Component);

    var _super = _createSuper(Number);

    function Number(root, model) {
      var _this;

      _classCallCheck(this, Number);

      _this = _super.call(this, {
        root: root,
        style: style$4,
        template: template$4,
        model: model
      }); // Options

      _this._stepSize = _this.model.options.stepSize || DEFAULT_STEP_SIZE;
      _this._decimalPlaces = _this._getDecimalPlaces(_this._stepSize); // Data

      _this._activeInput = null;
      _this._isPointerLockActive = false; // Setup

      _this._bindHandlers();

      return _this;
    }

    _createClass(Number, [{
      key: "connected",
      value: function connected() {
        this._updateInputValue(this.model.value);

        this._setupEventListeners();
      }
    }, {
      key: "destroyed",
      value: function destroyed() {
        this._removeEventListeners();
      }
      /**
       * Hooks
       */

    }, {
      key: "onListen",
      value: function onListen() {
        this._updateInputValue(this.model.value);
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._mouseDownHandler = this._mouseDownHandler.bind(this);
        this._mouseUpHandler = this._mouseUpHandler.bind(this);
        this._changeHandler = this._changeHandler.bind(this);
        this._pointerLockHanderHandler = this._pointerLockHanderHandler.bind(this);
        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this.$refs.input.addEventListener('mousedown', this._mouseDownHandler);
        this.$refs.input.addEventListener('mouseup', this._mouseUpHandler);
        this.$refs.input.addEventListener('change', this._changeHandler);
        document.addEventListener('pointerlockchange', this._pointerLockHanderHandler);
        document.addEventListener('mousemove', this._mouseMoveHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this.$refs.input.removeEventListener('mousedown', this._mouseDownHandler);
        this.$refs.input.removeEventListener('mouseup', this._mouseUpHandler);
        this.$refs.input.removeEventListener('change', this._changeHandler);
        document.removeEventListener('pointerlockchange', this._pointerLockHanderHandler);
        document.removeEventListener('mousemove', this._mouseMoveHandler);
      }
    }, {
      key: "_updateModelValue",
      value: function _updateModelValue(value) {
        this.model.value = value;
      }
    }, {
      key: "_getInputValueBasedOnMouseMovement",
      value: function _getInputValueBasedOnMouseMovement(movementX) {
        return this.model.value + movementX * this._stepSize;
      }
    }, {
      key: "_updateInputValue",
      value: function _updateInputValue(value) {
        this.$refs.input.value = value.toFixed(this._decimalPlaces); // TODO: Fix precision;
      }
    }, {
      key: "_getDecimalPlaces",
      value: function _getDecimalPlaces(value) {
        var split = value.toString().split('.');
        return split.length > 1 ? split[1].length : 0;
      }
      /**
       * Handlers
       */

    }, {
      key: "_mouseDownHandler",
      value: function _mouseDownHandler(e) {
        this.$refs.input.requestPointerLock();
        this._isPointerLockActive = true;
      }
    }, {
      key: "_mouseUpHandler",
      value: function _mouseUpHandler() {
        document.exitPointerLock();
      }
    }, {
      key: "_changeHandler",
      value: function _changeHandler() {
        this._updateModelValue(this.$refs.input.value);
      }
    }, {
      key: "_pointerLockHanderHandler",
      value: function _pointerLockHanderHandler() {
        if (document.pointerLockElement) ; else {
          this._isPointerLockActive = false;
        }
      }
    }, {
      key: "_mouseMoveHandler",
      value: function _mouseMoveHandler(e) {
        if (this._isPointerLockActive) {
          var value = this._getInputValueBasedOnMouseMovement(e.movementX);

          this._updateInputValue(value);

          this._updateModelValue(value);
        }
      }
    }]);

    return Number;
  }(Component);
  window.customElements.define('dddd-number', Number);

  var style$5 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: start;\n}\n\n.label {\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    line-height: var(--input-height);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.image-container {\n    position: relative;\n\n    width: 100%;\n    aspect-ratio: 16 / 9;\n\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    transition: var(--input-background-color-transition);\n}\n\n.image-container:hover,\n.image-container.drop-area {\n    background-color: var(--input-background-color-hover);\n}\n\n.image-container img {\n    object-fit: cover;\n\n    width: 100%;\n    height: 100%;\n}\n\n.locked .image-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.file-input {\n    position: absolute;\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n\n    border: 0;\n    outline: none;\n\n    cursor: pointer;\n}\n\n.file-input::-webkit-file-upload-button {\n    visibility: hidden;\n}\n\n.file-input::before {\n    content: '';\n\n    display: block;\n\n    width: 100%;\n    height: 100%;\n}\n";

  var template$5 = "<div class=\"component\">\n    \n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Image -->\n    <div class=\"image-container\" ref=\"imageContainer\">\n\n        <!-- File input -->\n        <input type=\"file\" ref=\"fileInput\" class=\"file-input\" accept=\".jpg,.png,.gif\">\n\n    </div>\n\n</div>";

  var CLASS_DROP_AREA = 'drop-area';

  var ImageComponent = /*#__PURE__*/function (_Component) {
    _inherits(ImageComponent, _Component);

    var _super = _createSuper(ImageComponent);

    function ImageComponent(root, model) {
      var _this;

      _classCallCheck(this, ImageComponent);

      _this = _super.call(this, {
        root: root,
        style: style$5,
        template: template$5,
        model: model
      }); // Data

      _this._previewImage = null; // Setup

      _this._bindHandlers();

      return _this;
    }

    _createClass(ImageComponent, [{
      key: "connected",
      value: function connected() {
        this._addPreviewImage(this.model.value);

        this._setupEventListeners();
      }
    }, {
      key: "destroyed",
      value: function destroyed() {
        this._removeEventListeners();
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._dropHandler = this._dropHandler.bind(this);
        this._dragEnterHandler = this._dragEnterHandler.bind(this);
        this._dragOverHandler = this._dragOverHandler.bind(this);
        this._dragLeaveHandler = this._dragLeaveHandler.bind(this);
        this._fileInputChangeHandler = this._fileInputChangeHandler.bind(this);
        this._fileLoadedHandler = this._fileLoadedHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this.$el.addEventListener('drop', this._dropHandler);
        this.$el.addEventListener('dragenter', this._dragEnterHandler);
        this.$el.addEventListener('dragover', this._dragOverHandler);
        this.$el.addEventListener('dragleave', this._dragLeaveHandler);
        this.$refs.fileInput.addEventListener('change', this._fileInputChangeHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this.$el.removeEventListener('drop', this._dropHandler);
        this.$el.removeEventListener('dragenter', this._dragEnterHandler);
        this.$el.removeEventListener('dragover', this._dragOverHandler);
        this.$el.removeEventListener('dragleave', this._dragLeaveHandler);
      }
    }, {
      key: "_handleFile",
      value: function _handleFile(file) {
        var reader = new FileReader();
        reader.onloadend = this._fileLoadedHandler;
        reader.readAsDataURL(file);
      }
    }, {
      key: "_removePreviewImage",
      value: function _removePreviewImage() {
        if (this._previewImage) {
          this.$refs.imageContainer.removeChild(this._previewImage);
          this._previewImage = null;
        }
      }
    }, {
      key: "_addPreviewImage",
      value: function _addPreviewImage(image) {
        this._previewImage = document.createElement('img');
        this._previewImage.src = image;
        this.$refs.imageContainer.appendChild(this._previewImage);
      }
    }, {
      key: "_showDropArea",
      value: function _showDropArea() {
        this.$refs.imageContainer.classList.add(CLASS_DROP_AREA);
      }
    }, {
      key: "_hideDropArea",
      value: function _hideDropArea() {
        this.$refs.imageContainer.classList.remove(CLASS_DROP_AREA);
      }
      /**
       * Handlers
       */

    }, {
      key: "_dropHandler",
      value: function _dropHandler(e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];

        this._handleFile(file);

        this._hideDropArea();
      }
    }, {
      key: "_dragEnterHandler",
      value: function _dragEnterHandler(e) {
        e.preventDefault();

        this._showDropArea();
      }
    }, {
      key: "_dragOverHandler",
      value: function _dragOverHandler(e) {
        e.preventDefault();
      }
    }, {
      key: "_dragLeaveHandler",
      value: function _dragLeaveHandler(e) {
        if (!this.$el.contains(e.fromElement)) {
          this._hideDropArea();
        }
      }
    }, {
      key: "_fileLoadedHandler",
      value: function _fileLoadedHandler(e) {
        var image = e.target.result;
        this.model.value = image;

        this._removePreviewImage();

        this._addPreviewImage(image);
      }
    }, {
      key: "_fileInputChangeHandler",
      value: function _fileInputChangeHandler(e) {
        var file = this.$refs.fileInput.files[0];

        this._handleFile(file);
      }
    }]);

    return ImageComponent;
  }(Component);
  window.customElements.define('dddd-image', ImageComponent);

  var style$6 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    position: relative;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    user-select: none;\n\n    transition: var(--input-background-color-transition);\n}\n\n.input-container:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.select {\n    width: 100%;\n    height: 100%;\n\n    border: 0;\n    outline: 0;\n\n    padding: 0 var(--input-padding);\n\n    background: transparent;\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    appearance: none;\n}\n\n.select option {\n    color: black;\n}\n\n.arrow {\n    position: absolute;\n    top: 0;\n    right: var(--input-padding);\n    bottom: 0;\n\n    margin: auto 0;\n}\n";

  var template$6 = "<div class=\"component\">\n    \n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Input container  -->\n    <div class=\"input-container\">\n\n        <!-- Arrow -->\n        <svg width=\"11\" height=\"6\" viewBox=\"0 0 11 6\" class=\"arrow\">\n            <path d=\"M1 1L4.83564 4.40945C5.21452 4.74624 5.78548 4.74624 6.16436 4.40945L10 1\" stroke=\"white\" fill=\"transparent\" stroke-opacity=\"0.74\" stroke-linecap=\"round\"/>\n        </svg>\n        \n        <!-- Select -->\n        <select class=\"select\" ref=\"select\"></select>\n\n    </div>\n\n</div>";

  var Dropdown = /*#__PURE__*/function (_Component) {
    _inherits(Dropdown, _Component);

    var _super = _createSuper(Dropdown);

    function Dropdown(root, model) {
      var _this;

      _classCallCheck(this, Dropdown);

      _this = _super.call(this, {
        root: root,
        style: style$6,
        template: template$6,
        model: model
      }); // Setup

      _this._bindHandlers();

      return _this;
    }

    _createClass(Dropdown, [{
      key: "connected",
      value: function connected() {
        this._addOptions();

        this._setupEventListeners();
      }
    }, {
      key: "destroyed",
      value: function destroyed() {
        this._removeEventListeners();
      }
      /**
       * Hooks
       */

    }, {
      key: "onListen",
      value: function onListen() {
        this._updateSelectValue(this.model.value);
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._selectChangeHandler = this._selectChangeHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this.$refs.select.addEventListener('change', this._selectChangeHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this.$refs.select.removeEventListener('change', this._selectChangeHandler);
      }
    }, {
      key: "_addOptions",
      value: function _addOptions() {
        var options = this.model.options.options;

        for (var i = 0, len = options.length; i < len; i++) {
          var item = options[i];
          var element = document.createElement('option');
          element.value = item;
          element.textContent = item;
          element.selected = item === this._value;
          this.$refs.select.appendChild(element);
        }
      }
    }, {
      key: "_updateSelectValue",
      value: function _updateSelectValue(value) {
        this.$refs.select.value = value; // TODO: Fix precision;
      }
      /**
       * Handlers
       */

    }, {
      key: "_selectChangeHandler",
      value: function _selectChangeHandler() {
        this.model.value = this.$refs.select.value;
      }
    }]);

    return Dropdown;
  }(Component);
  window.customElements.define('dddd-dropdown', Dropdown);

  var style$7 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    position: relative;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    user-select: none;\n\n    transition: var(--input-background-color-transition);\n}\n\n.input-container:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.checkbox {\n    appearance: none;\n\n    display: block;\n    position: relative;\n\n    width: 100%;\n    height: 100%;\n\n    margin: 0;\n    padding: 0 var(--input-padding);\n\n    outline: none;\n\n    cursor: pointer;\n}\n\n.checkbox:after {\n    content: '';\n\n    display: block;\n    box-sizing: border-box;\n\n    position: absolute;\n    top: 0;\n    bottom: 0;\n\n    width: 17px;\n    height: 17px;\n\n    margin: auto 0 ;\n\n    border-radius: 50%;\n    border: 2px solid var(--input-highlight-color);\n}\n\n.checkbox:checked:after {\n    background: var(--input-highlight-color);\n\n    border: 0;\n}\n";

  var template$7 = "<div class=\"component\">\n    \n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Input container  -->\n    <div class=\"input-container\">\n\n        <!-- Checkbox -->\n        <input type=\"checkbox\" class=\"checkbox\" ref=\"checkbox\">\n\n    </div>\n\n</div>";

  var Checkbox = /*#__PURE__*/function (_Component) {
    _inherits(Checkbox, _Component);

    var _super = _createSuper(Checkbox);

    function Checkbox(root, model) {
      var _this;

      _classCallCheck(this, Checkbox);

      _this = _super.call(this, {
        root: root,
        style: style$7,
        template: template$7,
        model: model
      }); // Setup

      _this._bindHandlers();

      return _this;
    }

    _createClass(Checkbox, [{
      key: "connected",
      value: function connected() {
        this._updateChecked();

        this._setupEventListeners();
      }
    }, {
      key: "destroyed",
      value: function destroyed() {
        this._removeEventListeners();
      }
      /**
       * Hooks
       */

    }, {
      key: "onListen",
      value: function onListen() {
        this._updateChecked();
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._checkboxChangeHandler = this._checkboxChangeHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this.$refs.checkbox.addEventListener('change', this._checkboxChangeHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this.$refs.checkbox.removeEventListener('change', this._checkboxChangeHandler);
      }
    }, {
      key: "_updateChecked",
      value: function _updateChecked() {
        this.$refs.checkbox.checked = this.model.value;
      }
      /**
       * Handlers
       */

    }, {
      key: "_checkboxChangeHandler",
      value: function _checkboxChangeHandler() {
        this.model.value = this.$refs.checkbox.checked;
      }
    }]);

    return Checkbox;
  }(Component);
  window.customElements.define('dddd-checkbox', Checkbox);

  var style$8 = ".component {\n    transition: background-color 0.15s;\n}\n\n.button {\n    width: calc(100% - var(--label-width));\n    height: var(--input-height);\n\n    padding: 0 var(--input-padding);\n    margin-left: var(--label-width);\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n    \n    background-color: var(--input-highlight-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: none;\n\n    transition: var(--input-background-color-transition);\n\n    cursor: pointer;\n}\n\n.button:hover {\n    background-color: rgba(77, 83, 217, 1);\n    background-color: var(--input-highlight-color-hover);\n}";

  var template$8 = "<div class=\"component\">\n    \n    <!-- Button -->\n    <button class=\"button\" ref=\"button\">{{ label }}</button>\n\n</div>";

  var Button = /*#__PURE__*/function (_Component) {
    _inherits(Button, _Component);

    var _super = _createSuper(Button);

    function Button(root, model) {
      var _this;

      _classCallCheck(this, Button);

      _this = _super.call(this, {
        root: root,
        style: style$8,
        template: template$8,
        model: model
      }); // Setup

      _this._bindHandlers();

      return _this;
    }

    _createClass(Button, [{
      key: "connected",
      value: function connected() {
        this._setupEventListeners();
      }
    }, {
      key: "destroyed",
      value: function destroyed() {
        this._removeEventListeners();
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._clickHandler = this._clickHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this.$refs.button.addEventListener('click', this._clickHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this.$refs.button.removeEventListener('click', this._clickHandler);
      } // _triggerOnClickCallback(value) {
      //     if (typeof this.model.options.onClick === 'function') {
      //         this.model.options.onClick(value);
      //     }
      // }

      /**
       * Handlers
       */

    }, {
      key: "_clickHandler",
      value: function _clickHandler() {
        this.model.value = 'click'; // this._triggerOnClickCallback();
      }
    }]);

    return Button;
  }(Component);
  window.customElements.define('dddd-button', Button);

  var style$9 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    display: grid;\n    position: relative;\n\n    grid-template-columns: 45px calc(50% - 50px) 50%;\n    align-items: center;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: 0 var(--input-padding) 0 5px;\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    transition: var(--input-background-color-transition);\n}\n\n.input-container:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.color {\n    width: 30px;\n    height: 30px;\n\n    margin: 0;\n    padding: 0;\n\n    background: transparent;\n\n    border: 0;\n    outline: 0;\n\n    appearance: none;\n    cursor: pointer;\n}\n\n.color::-webkit-color-swatch-wrapper {\n    padding: 0;\n}\n\n.color::-webkit-color-swatch {\n    border: none;\n    border-radius: 7px;\n}\n\n.color-code {\n    color: var(--input-text-color);\n}\n\n.alpha {\n    color: var(--input-text-color);\n    text-align: right;\n}";

  var template$9 = "<div class=\"component\">\n    \n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Input container  -->\n    <div class=\"input-container\">\n\n        <!-- Color -->\n        <input type=\"color\" class=\"color\" ref=\"color\">\n\n        <!-- Color code -->\n        <span class=\"color-code\" ref=\"colorCode\"></span>\n\n        <!-- Alpha -->\n        <span class=\"alpha\">100%</span>\n\n    </div>\n\n</div>";

  var Color = /*#__PURE__*/function (_Component) {
    _inherits(Color, _Component);

    var _super = _createSuper(Color);

    function Color(root, model) {
      var _this;

      _classCallCheck(this, Color);

      _this = _super.call(this, {
        root: root,
        style: style$9,
        template: template$9,
        model: model
      }); // Setup

      _this._bindHandlers();

      return _this;
    }

    _createClass(Color, [{
      key: "connected",
      value: function connected() {
        this._setStartColor();

        this._setColorCodeValue(this.model.value);

        this._setupEventListeners();
      }
    }, {
      key: "destroyed",
      value: function destroyed() {
        this._removeEventListeners();
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._inputChangeHandler = this._inputChangeHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this.$refs.color.addEventListener('input', this._inputChangeHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this.$refs.color.removeEventListener('input', this._inputChangeHandler);
      }
    }, {
      key: "_setStartColor",
      value: function _setStartColor() {
        this.$refs.color.value = this.model.value;
      }
    }, {
      key: "_setColorCodeValue",
      value: function _setColorCodeValue(value) {
        this.$refs.colorCode.innerText = value;
      }
      /**
       * Handlers
       */

    }, {
      key: "_inputChangeHandler",
      value: function _inputChangeHandler(e) {
        var value = this.$refs.color.value;
        this.model.value = value;

        this._setColorCodeValue(value);
      }
    }]);

    return Color;
  }(Component);
  window.customElements.define('dddd-color', Color);

  var style$a = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: start;\n\n    transition: background-color 0.15s;\n}\n\n.label {\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    line-height: var(--input-height);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    display: grid;\n\n    grid-template-columns: repeat(3, 1fr);\n    gap: var(--component-row-gap);\n}\n\n.input {\n    width: 100%;\n    height: var(--input-height);\n\n    padding: 0 var(--input-padding);\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    background-color: var(--input-background-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: none;\n\n    transition: var(--input-background-color-transition);\n\n    cursor: ew-resize;\n}\n\n.input:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n\n.locked .input {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n";

  var template$a = "<div class=\"component\">\n    \n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Input container -->\n    <div class=\"input-container\" ref=\"inputContainer\"></div>\n\n</div>";

  var DEFAULT_STEP_SIZE$1 = 0.01;

  var MultiInput = /*#__PURE__*/function (_Component) {
    _inherits(MultiInput, _Component);

    var _super = _createSuper(MultiInput);

    function MultiInput(root, model) {
      var _this;

      _classCallCheck(this, MultiInput);

      _this = _super.call(this, {
        root: root,
        style: style$a,
        template: template$a,
        model: model
      }); // Options

      _this._stepSize = _this.model.options.stepSize || DEFAULT_STEP_SIZE$1;
      _this._decimalPlaces = _this._getDecimalPlaces(_this._stepSize); // Data

      _this._activeInput = null;
      _this._isPointerLockActive = false;
      _this._inputs = []; // Setup

      _this._bindHandlers();

      return _this;
    }

    _createClass(MultiInput, [{
      key: "connected",
      value: function connected() {
        this._createInputs();

        this._setupEventListeners();
      }
    }, {
      key: "destroyed",
      value: function destroyed() {
        this._removeEventListeners();
      }
      /**
       * Hooks
       */

    }, {
      key: "onListen",
      value: function onListen() {
        this._updateAllInputValues(this.model.value);
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._mouseDownHandler = this._mouseDownHandler.bind(this);
        this._mouseUpHandler = this._mouseUpHandler.bind(this);
        this._changeHandler = this._changeHandler.bind(this);
        this._pointerLockHanderHandler = this._pointerLockHanderHandler.bind(this);
        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this.$el.addEventListener('mousedown', this._mouseDownHandler);
        this.$el.addEventListener('mouseup', this._mouseUpHandler);
        this.$el.addEventListener('change', this._changeHandler);
        document.addEventListener('pointerlockchange', this._pointerLockHanderHandler);
        document.addEventListener('mousemove', this._mouseMoveHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this.$el.removeEventListener('mousedown', this._mouseDownHandler);
        this.$el.removeEventListener('mouseup', this._mouseUpHandler);
        this.$el.removeEventListener('change', this._changeHandler);
        document.removeEventListener('pointerlockchange', this._pointerLockHanderHandler);
        document.removeEventListener('mousemove', this._mouseMoveHandler);
      }
    }, {
      key: "_createInputs",
      value: function _createInputs() {
        for (var key in this.model.value) {
          var input = document.createElement('input');
          input.classList.add('input');
          input.value = this.model.value[key];

          this._inputs.push(input);

          this.$refs.inputContainer.appendChild(input);
        }
      }
    }, {
      key: "_updateModelValue",
      value: function _updateModelValue() {
        var value = {};

        for (var _i = 0, _Object$entries = Object.entries(Object.entries(this.model.value)); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              index = _Object$entries$_i[0],
              _Object$entries$_i$ = _slicedToArray(_Object$entries$_i[1], 1),
              key = _Object$entries$_i$[0];

          value[key] = parseInt(this._inputs[index].value);
        }

        this.model.value = value;
      }
    }, {
      key: "_getInputValueBasedOnMouseMovement",
      value: function _getInputValueBasedOnMouseMovement(movementX) {
        if (!this._activeInput) return;
        var currentValue = parseFloat(this._activeInput.value);
        return currentValue + movementX * this._stepSize;
      }
    }, {
      key: "_updateInputValue",
      value: function _updateInputValue(value) {
        if (this._activeInput) {
          this._activeInput.value = value.toFixed(this._decimalPlaces); // TODO: Fix precision
        }
      }
    }, {
      key: "_updateAllInputValues",
      value: function _updateAllInputValues() {
        for (var _i2 = 0, _Object$entries2 = Object.entries(Object.entries(this.model.value)); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              index = _Object$entries2$_i[0],
              _Object$entries2$_i$ = _slicedToArray(_Object$entries2$_i[1], 1),
              key = _Object$entries2$_i$[0];

          this._inputs[index].value = this.model.value[key];
        }
      }
    }, {
      key: "_getDecimalPlaces",
      value: function _getDecimalPlaces(value) {
        var split = value.toString().split('.');
        return split.length > 1 ? split[1].length : 0;
      }
      /**
       * Handlers
       */

    }, {
      key: "_mouseDownHandler",
      value: function _mouseDownHandler(e) {
        if (e.target.tagName === 'INPUT') {
          this._activeInput = e.target;
          this.$el.requestPointerLock();
        }
      }
    }, {
      key: "_mouseUpHandler",
      value: function _mouseUpHandler() {
        this._activeInput = null;
        document.exitPointerLock();
      }
    }, {
      key: "_changeHandler",
      value: function _changeHandler() {
        this._updateInputValue();
      }
    }, {
      key: "_pointerLockHanderHandler",
      value: function _pointerLockHanderHandler(e) {
        if (document.pointerLockElement) {
          this._isPointerLockActive = true;
        } else {
          this._isPointerLockActive = false;
        }
      }
    }, {
      key: "_mouseMoveHandler",
      value: function _mouseMoveHandler(e) {
        if (this._isPointerLockActive) {
          var value = this._getInputValueBasedOnMouseMovement(e.movementX);

          this._updateInputValue(value);

          this._updateModelValue();
        }
      }
    }]);

    return MultiInput;
  }(Component);
  window.customElements.define('dddd-multi-input', MultiInput);

  var componentTypes = {
    slider: Slider,
    text: Text,
    number: Number,
    image: ImageComponent,
    dropdown: Dropdown,
    checkbox: Checkbox,
    button: Button,
    color: Color,
    multiInput: MultiInput
  };

  var Components = /*#__PURE__*/function () {
    function Components(_ref) {
      var root = _ref.root,
          layout = _ref.layout;

      _classCallCheck(this, Components);

      // Props
      this._root = root; // Data

      this._components = []; // Setup

      this._bindHandlers();

      this._setupEventListeners();
    }

    _createClass(Components, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventListeners();
      }
      /**
       * Public
       */

    }, {
      key: "create",
      value: function create(model) {
        LayoutModel$1.addComponent(model);
        var type = model.type;
        var componentClass = componentTypes[type];
        var component = new componentClass(this._root, model);

        this._components.push(component);

        this._addComponentToContainer(component);

        return component;
      }
    }, {
      key: "remove",
      value: function remove(component) {
        var container = this._root.layout.getContainer(component.container);

        container.removeChild(component);
        component.destroy();
      }
    }, {
      key: "update",
      value: function update(modelData) {
        var component = this._getById(modelData.id);

        component.model.value = modelData.value;
      }
    }, {
      key: "updateObjects",
      value: function updateObjects(models) {
        var model;
        var component;

        for (var i = 0, len = models.length; i < len; i++) {
          model = models[i];

          if (model.options.listen) {
            component = this._getById(model.id);

            if (component) {
              component.model.object = model.object;
            }
          }
        }
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._tick = this._tick.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this._requestAnimationFrame = window.requestAnimationFrame(this._tick);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        window.cancelAnimationFrame(this._requestAnimationFrame);
      }
    }, {
      key: "_addComponentToContainer",
      value: function _addComponentToContainer(component) {
        var container = component.model.options.container;

        var element = this._root.layout.getContainer(container);

        element.appendChild(component);

        this._root.layout.resize();
      }
    }, {
      key: "_getById",
      value: function _getById(id) {
        var _iterator = _createForOfIteratorHelper(this._components),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var component = _step.value;

            if (component.model.id === id) {
              return component;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      /**
       * Tick
       */

    }, {
      key: "_tick",
      value: function _tick() {
        window.requestAnimationFrame(this._tick);

        this._tickComponents(); // this._sendModelsToDevtools();

      }
    }, {
      key: "_tickComponents",
      value: function _tickComponents() {
        for (var i = 0, len = this._components.length; i < len; i++) {
          this._components[i].tick();
        }
      }
    }, {
      key: "_sendModelsToDevtools",
      value: function _sendModelsToDevtools() {
        var models = [];

        for (var i = 0, len = this._components.length; i < len; i++) {
          models.push(this._components[i].model.getData());
        }

        window.postMessage({
          source: 'dddd-page',
          payload: {
            action: 'update-objects',
            models: models
          }
        });
      }
    }]);

    return Components;
  }();

  var ComponentModel = /*#__PURE__*/function () {
    function ComponentModel(_ref) {
      var root = _ref.root,
          object = _ref.object,
          property = _ref.property,
          options = _ref.options,
          id = _ref.id,
          type = _ref.type,
          value = _ref.value,
          onChangeCallback = _ref.onChangeCallback;

      _classCallCheck(this, ComponentModel);

      // Props
      this._root = root;
      this._object = object || {};
      this._property = property;
      this._options = options || {};
      this._id = id || this._generateId();
      this._type = type || this._detectType();
      this._value = value || this._object[this._property];
      this._onChangeCallback = onChangeCallback; // TODO: Refactor

      if (this._options.container instanceof Group) {
        this._options.container = this._options.container.label;
      }
    }
    /**
     * Getters & Setters
     */


    _createClass(ComponentModel, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        this._value = value;
        this._object[this._property] = this._value;

        if (typeof this._options.onChange === 'function') {
          this._options.onChange(this._value);
        } // TODO: Refactor..


        if (this._type === 'button' && this._value === 'click') {
          if (typeof this._options.onClick === 'function') {
            this._options.onClick(value);
          }
        } // TODO: Refactor function name


        if (this._root.isDevtools && typeof this._onChangeCallback === 'function') {
          this._onChangeCallback(this.getData());
        }
      }
    }, {
      key: "object",
      get: function get() {
        return this._object;
      },
      set: function set(value) {
        this._object = value;
      }
    }, {
      key: "options",
      get: function get() {
        return this._options;
      }
    }, {
      key: "property",
      get: function get() {
        return this._property;
      }
    }, {
      key: "type",
      get: function get() {
        return this._type;
      }
    }, {
      key: "id",
      get: function get() {
        return this._id;
      }
      /**
       * Public
       */

    }, {
      key: "getData",
      value: function getData() {
        return {
          object: this._object,
          property: this._property,
          options: this._removeFunctions(this._options),
          id: this._id,
          type: this._type,
          value: this._value
        };
      }
    }, {
      key: "updateValueFromObject",
      value: function updateValueFromObject() {
        this._value = this._object[this._property]; // console.log(this._value);
        // // TODO: Refactor function name
        // if (this._root.isDevtools && typeof this._onChangeCallback === 'function') {
        //     this._onChangeCallback(this.getData());
        // }
      }
      /**
       * Private
       */

    }, {
      key: "_generateId",
      value: function _generateId() {
        // uuidv4
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0;
          var v = c === 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
      }
    }, {
      key: "_detectType",
      value: function _detectType() {
        var _this$_object;

        if (!(this._property in this._object)) {
          throw new Error("Property '".concat(this._property, "' does not exists"));
        }

        var value = (_this$_object = this._object) === null || _this$_object === void 0 ? void 0 : _this$_object[this._property];

        if (this._options.type === 'image') {
          return 'image';
        }

        if (this._options.options && _typeof(this._options.options) === 'object') {
          return 'dropdown';
        } // Slider


        if (typeof value === 'number' && typeof this._options.min === 'number' && typeof this._options.max === 'number') {
          return 'slider';
        } // MultiInput


        if (_typeof(value) === 'object') {
          return 'multiInput';
        } // Checkbox


        if (typeof value === 'boolean') {
          return 'checkbox';
        } // Color


        if (/^#[0-9A-F]{6}$/i.test(value)) {
          return 'color';
        } // Number


        if (typeof value === 'number') {
          return 'number';
        } // Text


        if (typeof value === 'string') {
          return 'text';
        }

        {
          throw new Error('Input type not detected');
        }
      }
    }, {
      key: "_removeFunctions",
      value: function _removeFunctions(data) {
        var object = JSON.parse(JSON.stringify(data));

        function eachRecursive(object) {
          for (var key in object) {
            if (_typeof(object[key]) === 'object' && object[key] !== null) {
              eachRecursive(object[key]);
            } else if (typeof object[key] === 'function') {
              delete object[key];
            }
          }
        }

        eachRecursive(object);
        return object;
      }
    }]);

    return ComponentModel;
  }();

  var Layout = /*#__PURE__*/function () {
    function Layout(_ref) {
      var root = _ref.root;

      _classCallCheck(this, Layout);

      // Props
      this._root = root;
      this._container = this._createContainer();
      this._navigation = this._createNavigation();
      this._layers = this._createLayers();
      this._components = this._createComponents();
      this._isVisible = true;
      this._groups = {};
      this._elements = [];

      this._bindHandlers();

      this._setupEventListeners();
    }

    _createClass(Layout, [{
      key: "destroy",
      value: function destroy() {
        // TODO: Quick and dirty
        document.body.removeChild(this._container);

        this._removeEventListeners();
      }
      /**
       * Getters & Setters
       */

    }, {
      key: "components",
      get: function get() {
        return this._components;
      }
      /**
       * Public
       */

    }, {
      key: "addLayer",
      value: function addLayer(label) {
        this._navigation.add(label);

        var layer = this._layers.add(label);

        this._layers.resize();

        LayoutModel$1.addLayer(label);
        return layer;
      }
    }, {
      key: "addGroup",
      value: function addGroup(label) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var group = new Group({
          root: this._root,
          layout: this,
          label: label,
          options: options
        });
        var container = this.getContainer(options.container);
        container.appendChild(group);
        this._groups[label] = group;

        this._layers.resize();

        LayoutModel$1.addGroup(label, options);
        return group;
      }
    }, {
      key: "addComponent",
      value: function addComponent(_ref2) {
        var object = _ref2.object,
            property = _ref2.property,
            options = _ref2.options,
            id = _ref2.id,
            type = _ref2.type,
            onChangeCallback = _ref2.onChangeCallback;
        var model = new ComponentModel({
          root: this._root,
          object: object,
          property: property,
          options: options,
          id: id,
          type: type,
          onChangeCallback: onChangeCallback
        });

        var component = this._components.create(model);

        return component;
      }
    }, {
      key: "getLayer",
      value: function getLayer(label) {
        return this._layers.get(label);
      }
    }, {
      key: "getContainer",
      value: function getContainer(label) {
        var layer = this._layers.get(label);

        if (layer) return layer;
        var group = this._groups[label];
        if (group) return group.content;
      }
    }, {
      key: "remove",
      value: function remove() {
        document.body.removeChild(this._container);
      }
    }, {
      key: "resize",
      value: function resize() {
        this._layers.resize();
      }
    }, {
      key: "toggleVisibility",
      value: function toggleVisibility() {
        if (this._isVisible) {
          this._container.hide();

          this._layers.hide();

          this._navigation.hide();

          this._isVisible = false;
        } else {
          this._container.show();

          this._layers.show();

          this._navigation.show();

          this._isVisible = true;
        }

        this._layers.resize();
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._navigationSwitchHandler = this._navigationSwitchHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        this._navigation.addEventListener('switch', this._navigationSwitchHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        this._navigation.addEventListener('switch', this._navigationSwitchHandler);
      }
    }, {
      key: "_createContainer",
      value: function _createContainer() {
        var container = new Container({
          root: this._root
        });
        document.body.appendChild(container);
        return container;
      }
    }, {
      key: "_createNavigation",
      value: function _createNavigation() {
        var navigation = new Navigation({
          root: this._root
        });

        this._container.content.appendChild(navigation);

        return navigation;
      }
    }, {
      key: "_createLayers",
      value: function _createLayers() {
        var layers = new Layers({
          root: this._root
        });

        this._container.content.appendChild(layers);

        return layers;
      }
    }, {
      key: "_createComponents",
      value: function _createComponents() {
        var componenents = new Components({
          root: this._root,
          layout: this
        });
        return componenents;
      }
    }, {
      key: "_getGroupContainer",
      value: function _getGroupContainer(label, container) {
        var groupContainer;

        if (container) {
          groupContainer = this._layers.get(container);

          if (!groupContainer) {
            throw new Error("Layer '".concat(container, "' not found"));
          }
        } else {
          if (this._layers.isEmpty()) {
            groupContainer = this._layers.add();
          } else {
            throw new Error("No 'container' defined for group '".concat(label, "'"));
          }
        }

        return groupContainer;
      }
      /**
       * Handlers
       */

    }, {
      key: "_navigationSwitchHandler",
      value: function _navigationSwitchHandler(e) {
        this._layers.goto(e.detail.index);
      }
    }]);

    return Layout;
  }();

  var DDDD = /*#__PURE__*/function () {
    function DDDD() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          devtools = _ref.devtools,
          onChange = _ref.onChange;

      _classCallCheck(this, DDDD);

      // Props
      this._isDevtools = devtools;
      this._onChangeCallback = onChange; // Setup

      this._layout = new Layout({
        root: this
      });

      this._bindHandlers();

      this._setupEventListeners();
    }

    _createClass(DDDD, [{
      key: "destroy",
      value: function destroy() {
        this._layout.destroy();

        this._removeEventListeners();
      }
      /**
       * Getters & Setters
       */

    }, {
      key: "isDevtools",
      get: function get() {
        return this._isDevtools;
      }
    }, {
      key: "layout",
      get: function get() {
        return this._layout;
      }
      /**
       * Public
       */

    }, {
      key: "add",
      value: function add(object, property, options) {
        return this._layout.addComponent({
          object: object,
          property: property,
          options: options
        });
      } // TODO: Fix

    }, {
      key: "remove",
      value: function remove(component) {// this._components.remove(component);
      }
    }, {
      key: "addButton",
      value: function addButton(options) {
        return this._layout.addComponent({
          options: options,
          type: 'button'
        });
      }
    }, {
      key: "addLayer",
      value: function addLayer(label) {
        return this._layout.addLayer(label);
      }
    }, {
      key: "addGroup",
      value: function addGroup(label, options) {
        return this._layout.addGroup(label, options);
      }
    }, {
      key: "createLayoutFromModel",
      value: function createLayoutFromModel(model, onCompleteCallback) {
        var layers = model.layers;

        var _iterator = _createForOfIteratorHelper(layers),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var layer = _step.value;
            this.createLayer(layer);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var groups = model.groups;

        var _iterator2 = _createForOfIteratorHelper(groups),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var group = _step2.value;
            this.createGroup(group.label, group.options);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        var components = model.components;

        var _iterator3 = _createForOfIteratorHelper(components),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var modelData = _step3.value;

            this._layout.createComponent({
              object: modelData.object,
              property: modelData.property,
              options: modelData.options,
              id: modelData.id,
              type: modelData.type,
              onChangeCallback: this._onChangeCallback
            });
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        if (typeof onCompleteCallback === 'function') {
          onCompleteCallback();
        }
      }
    }, {
      key: "isLayoutSidebar",
      value: function isLayoutSidebar() {
        return !this._isDevtools;
      }
      /**
       * Private
       */

    }, {
      key: "_bindHandlers",
      value: function _bindHandlers() {
        this._messageHandler = this._messageHandler.bind(this);
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        window.addEventListener('message', this._messageHandler);
      }
    }, {
      key: "_removeEventListeners",
      value: function _removeEventListeners() {
        window.removeEventListener('message', this._messageHandler);
      }
    }, {
      key: "_sendLayoutModel",
      value: function _sendLayoutModel() {
        var layoutModel = LayoutModel$1.get();
        window.postMessage({
          source: 'dddd-page',
          payload: {
            action: 'setup',
            layoutModel: layoutModel
          }
        });
      }
      /**
       * Handlers
       */

    }, {
      key: "_messageHandler",
      value: function _messageHandler(e) {
        var source = e.data.source;
        var payload = e.data.payload;

        if (source === 'dddd-devtools-proxy' && payload) {
          switch (payload.action) {
            case 'init':
              this._sendLayoutModel();

              break;

            case 'setup-complete':
              this._layout.remove();

              break;

            case 'change':
              this._layout.components.update(payload.modelData);

              break;
          }
        }

        if (this._isDevtools && source === 'dddd-page' && payload) {
          switch (payload.action) {
            case 'update-objects':
              if (payload.models[0]) ; // this._layout.components.updateObjects(payload.models);


              break;
          }
        }
      }
    }]);

    return DDDD;
  }();

  return DDDD;

})));
