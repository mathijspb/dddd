(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DDDD = factory());
}(this, (function () { 'use strict';

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

	// Vendor

	class LayoutElement extends HTMLElement {
	    constructor({ root, style, template, templateData }) {
	        super();

	        // Props
	        this.__root = root;

	        // Attach
	        this.attachShadow({ mode: 'open' });

	        // Setup
	        this.__element = this.__addTemplate(template, templateData);
	        this.__addStyle(style);
	        this.__bindHandlers();

	        // Elements
	        this.$el = this.__getRootElement();
	        this.$refs = this.__getReferences();
	    }

	    connectedCallback() {
	        this.__setupEventListeners();
	        this.__triggerResize();
	        this.__triggerConnected();
	    }

	    destroy() {
	        this.__removeEventListeners();
	        this.__triggerDestroyed();
	    }

	    /**
	     * Getters & Setters
	     */
	    get $root() {
	        return this.__root;
	    }

	    get element() {
	        return this.__element;
	    }

	    /**
	     * Private
	     */
	    __bindHandlers() {
	        this.__resizeHandler = this.__resizeHandler.bind(this);
	    }

	    __setupEventListeners() {
	        window.addEventListener('resize', this.__resizeHandler);
	    }

	    __removeEventListeners() {
	        window.removeEventListener('resize', this.__resizeHandler);
	    }

	    __addTemplate(template, templateData = {}) {
	        if (typeof template === 'object') {
	            template = this.$root.isLayoutSidebar() ? template.templateSidebar : template.templateDevtools;
	        }
	        const render = mustache.render(template, templateData);
	        this.shadowRoot.innerHTML = render;
	        return this.shadowRoot.firstChild;
	    }

	    __addStyle(style) {
	        if (typeof style === 'object') {
	            style = this.$root.isLayoutSidebar() ? style.styleSidebar : style.styleDevtools;
	        }
	        const element = document.createElement('style');
	        const node = document.createTextNode(style);
	        element.appendChild(node);
	        this.shadowRoot.appendChild(element);
	    }

	    __getRootElement() {
	        return this.shadowRoot.firstChild;
	    }

	    __getReferences() {
	        const refs = {};
	        const elements = this.shadowRoot.querySelectorAll('[ref]');

	        let item;
	        let name;
	        for (let i = 0, len = elements.length; i < len; i++) {
	            item = elements[i];
	            name = item.getAttribute('ref');
	            refs[name] = item;
	        }
	        return refs;
	    }

	    __triggerConnected() {
	        if (typeof this.connected === 'function') {
	            this.connected();
	        }
	    }

	    __triggerDestroyed() {
	        if (typeof this.destroyed === 'function') {
	            this.destroyed();
	        }
	    }

	    __triggerResize() {
	        if (typeof this.onResize === 'function') {
	            this.onResize();
	        }
	    }

	    /**
	     * Handlers
	     */
	    __resizeHandler() {
	        this.__triggerResize();
	    }
	}

	var styleSidebar = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.dddd {\n    /* Layout */\n    --font: 'Arial', sans-serif;\n    --background-color: rgba(27, 27, 27, 0.9);\n\n    /* Panels */\n    --panel-background-color: rgba(27, 27, 27, 0.9);\n    --panel-spacing: 6px;\n\n    /* Groups */\n    --group-header-padding: 11px;\n    --group-header-font-size: 11px;\n    --group-header-background-color: rgba(255, 255, 255, 0.03);\n    --group-padding: 9px 7px 9px 10px;\n    --group-border-radius: 4px;\n\n    /* Components */\n    --component-row-gap: 4px;\n\n    /* Label */\n    --label-width: 40%;\n    --label-padding: 0 20px 0 0;\n    --label-color: rgba(255, 255, 255, 0.5);\n    --label-font-size: 11px;\n    --label-font-weight: 400;\n\n    /* Input */\n    --input-background-color: rgba(255, 255, 255, 0.03);\n    --input-background-color-hover: rgba(255, 255, 255, 0.08);\n    --input-background-color-error: rgba(255, 0, 0, 0.13);\n    --input-background-color-transition: background-color 0.35s ease-out;\n    --input-highlight-color: rgba(220, 159, 47, 0.53);\n    --input-highlight-color-hover: rgba(220, 159, 47, 0.75);\n    --input-text-color: rgba(255, 255, 255, 0.75);\n    --input-font-size: 11px;\n    --input-font-weight: 300;\n    --input-border-radius: 4px;\n    --input-padding: 10px;\n    --input-height: 26px;\n\n    z-index: 1337;\n\n    position: fixed;\n    top: 0;\n    right: 0;\n\n    width: 300px;\n    height: 100%;\n    max-height: 100vh;\n\n    background: var(--background-color);\n}\n\n.content {\n    width: 100%;\n    height: 100%;\n    /* overflow: auto; */\n}\n\n.resize-handle {\n    position: absolute;\n\n    padding: 0;\n\n    background-color: transparent;\n\n    border: 0;\n    outline: 0;\n}\n\n.resize-handle.side {\n    top: 0;\n    left: 0;\n\n    width: 6px;\n    height: 100%;\n\n    cursor: ew-resize;\n}\n\n.resize-handle.bottom {\n    bottom: 0;\n    left: 0;\n\n    width: 100%;\n    height: 6px;\n\n    cursor: ns-resize;\n}\n\n.resize-handle.corner {\n    bottom: 0;\n    left: 0;\n\n    width: 10px;\n    height: 10px;\n\n    cursor: nesw-resize;\n}\n";

	var styleDevtools = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.dddd {\n    /* Layout */\n    --font: 'Arial', sans-serif;\n    --background-color: #161616;\n\n    /* Panels */\n    --panel-background-color: #1B1B1B;\n    --panel-spacing: 6px;\n\n    /* Groups */\n    --group-header-padding: 11px;\n    --group-header-font-size: 11px;\n    --group-header-background-color: rgba(255, 255, 255, 0.03);\n    --group-padding: 9px 7px 9px 10px;\n    --group-border-radius: 4px;\n\n    /* Components */\n    --component-row-gap: 7px;\n\n    /* Label */\n    --label-width: 30%;\n    --label-padding: 0 20px 0 0;\n    --label-color: rgba(255, 255, 255, 0.75);\n    --label-font-size: 11px;\n    --label-font-weight: 400;\n\n    /* Input */\n    --input-background-color: rgba(255, 255, 255, 0.03);\n    --input-background-color-hover: rgba(255, 255, 255, 0.08);\n    --input-background-color-transition: background-color 0.35s ease-out;\n    --input-highlight-color: rgba(220, 159, 47, 0.53);\n    --input-highlight-color-hover: rgba(220, 159, 47, 0.75);\n    --input-text-color: rgba(255, 255, 255, 0.75);\n    --input-font-size: 11px;\n    --input-font-weight: 300;\n    --input-border-radius: 4px;\n    --input-padding: 10px;\n    --input-height: 26px;\n\n    background: var(--background-color);\n}\n";

	var templateSidebar = "<div class=\"dddd\">\n\n    <!-- Content -->\n    <div class=\"content\" ref=\"content\"></div>\n\n    <!-- Resize handle -->\n    <button class=\"resize-handle side\" ref=\"resizeHandleSide\"></button>\n    <button class=\"resize-handle bottom\" ref=\"resizeHandleBottom\"></button>\n    <button class=\"resize-handle corner\" ref=\"resizeHandleCorner\"></button>\n\n</div>\n";

	var templateDevtools = "<div class=\"dddd\">\n\n    <!-- Content -->\n    <div class=\"content\" ref=\"content\"></div>\n\n</div>\n";

	// Base class

	class Container extends LayoutElement {
	    constructor({ root }) {
	        super({ root, style: { styleSidebar, styleDevtools }, template: { templateSidebar, templateDevtools } });

	        // Data
	        this._isMouseDown = false;
	        this._width = 0;
	        this._height = 0;
	        this._customWidth = 0;
	        this._customHeight = 0;
	        this._axis = { x: 0, y: 0 };

	        // Setup
	        this._bindHandlers();
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Public
	     */
	    get width() {
	        return this._width;
	    }

	    get height() {
	        return this._height;
	    }

	    /**
	     * Public
	     */
	    show() {
	        this.$el.style.width = `${this._customWidth}px`;
	        if (this._height) {
	            this.$el.style.height = `${this._height}px`;
	        } else {
	            this.$el.style.height = '100%';
	        }
	    }

	    hide() {
	        this._customWidth = this.$el.offsetWidth;
	        this.$el.style.width = 'auto';
	        this.$el.style.height = 'auto';
	    }

	    addElement(element) {
	        this.$refs.content.appendChild(element);
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._resizeHandleSideMouseDownHandler = this._resizeHandleSideMouseDownHandler.bind(this);
	        this._resizeHandleBottomMouseDownHandler = this._resizeHandleBottomMouseDownHandler.bind(this);
	        this._resizeHandleCornerMouseDownHandler = this._resizeHandleCornerMouseDownHandler.bind(this);
	        this._windowMouseUpHandler = this._windowMouseUpHandler.bind(this);
	        this._windowMouseMoveHandler = this._windowMouseMoveHandler.bind(this);
	    }

	    _setupEventListeners() {
	        if (!this.$root.isDevtools) {
	            this.$refs.resizeHandleSide.addEventListener('mousedown', this._resizeHandleSideMouseDownHandler);
	            this.$refs.resizeHandleBottom.addEventListener('mousedown', this._resizeHandleBottomMouseDownHandler);
	            this.$refs.resizeHandleCorner.addEventListener('mousedown', this._resizeHandleCornerMouseDownHandler);
	            window.addEventListener('mouseup', this._windowMouseUpHandler);
	            window.addEventListener('mousemove', this._windowMouseMoveHandler);
	        }
	    }

	    _removeEventListeners() {
	        if (!this.$root.isDevtools) {
	            this.$refs.resizeHandleCorner.removeEventListener('mousedown', this._resizeHandleCornerMouseDownHandler);
	            window.removeEventListener('mouseup', this._windowMouseUpHandler);
	            window.removeEventListener('mousemove', this._windowMouseMoveHandler);
	        }
	    }

	    /**
	     * Resize
	     */
	    onResize() {
	        this._width = this._customWidth ? this._customWidth : this.$el.offsetWidth;
	        this._height = this._customHeight ? this._customHeight : window.innerHeight;
	        this.$root.layout?.resize();
	    }

	    _setDimensions(x, y) {
	        if (this._axis.x) {
	            this._customWidth = window.innerWidth - x;
	            this.$el.style.width = `${this._customWidth}px`;
	        }

	        if (this._axis.y) {
	            this._customHeight = y;
	            this.$el.style.height = `${this._customHeight}px`;
	        }

	        this.onResize();
	    }

	    /**
	     * Handlers
	     */
	    _resizeHandleSideMouseDownHandler() {
	        this._isMouseDown = true;
	        this._axis.x = 1;
	        this._axis.y = 0;
	    }

	    _resizeHandleBottomMouseDownHandler() {
	        this._isMouseDown = true;
	        this._axis.x = 0;
	        this._axis.y = 1;
	    }

	    _resizeHandleCornerMouseDownHandler() {
	        this._isMouseDown = true;
	        this._axis.x = 1;
	        this._axis.y = 1;
	    }

	    _windowMouseUpHandler() {
	        this._isMouseDown = false;
	    }

	    _windowMouseMoveHandler(e) {
	        if (this._isMouseDown) {
	            this._setDimensions(e.clientX, e.clientY);
	        }
	    }
	}

	window.customElements.define('dddd-container', Container);

	var style = "*,\r\n*:before,\r\n*:after {\r\n    box-sizing: border-box;\r\n}\r\n\r\n.header {\r\n    background-color: var(--panel-background-color);\r\n\r\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\r\n}\r\n";

	var template = "<div class=\"header\">\r\n\r\n</div>\r\n";

	// Base class

	class Header extends LayoutElement {
	    constructor({ root, options }) {
	        super({ root, style, template });

	        // Props
	        this._options = options;

	        // Setup
	        this._width = null;
	        this._height = null;
	    }

	    /**
	     * Getters & Setters
	     */
	    get width() {
	        return this._width;
	    }

	    get height() {
	        return this._height;
	    }

	    /**
	     * Public
	     */
	    addElement(element) {
	        this.$el.appendChild(element);
	        this._resize();
	    }

	    resize() {
	        this._resize();
	    }

	    /**
	     * Resize
	     */
	    _resize() {
	        this._width = this.$el.offsetWidth;
	        this._height = this.$el.offsetHeight;
	    }
	}

	window.customElements.define('dddd-header', Header);

	var styleSidebar$1 = ".navigation {\r\n    display: none;\r\n\r\n    grid-template-columns: 1fr var(--input-height);\r\n    column-gap: var(--panel-spacing);\r\n\r\n    padding: var(--panel-spacing);\r\n}\r\n\r\n.select-container {\r\n    position: relative;\r\n\r\n    height: var(--input-height);\r\n    overflow: hidden;\r\n\r\n    background-color: var(--input-background-color);\r\n\r\n    border-radius: var(--input-border-radius);\r\n\r\n    user-select: none;\r\n\r\n    transition: var(--input-background-color-transition);\r\n}\r\n\r\n.select-container:hover {\r\n    background-color: var(--input-background-color-hover);\r\n}\r\n\r\n.select {\r\n    width: 100%;\r\n    height: 100%;\r\n\r\n    border: 0;\r\n    outline: 0;\r\n\r\n    padding: 0 var(--input-padding);\r\n\r\n    background: transparent;\r\n\r\n    font-family: var(--font);\r\n    font-size: var(--input-font-size);\r\n    font-weight: var(--input-font-weight);\r\n    color: var(--input-text-color);\r\n\r\n    appearance: none;\r\n}\r\n\r\n.select option {\r\n    color: black;\r\n}\r\n\r\n.arrow {\r\n    position: absolute;\r\n    top: 0;\r\n    right: var(--input-padding);\r\n    bottom: 0;\r\n\r\n    margin: auto 0;\r\n}\r\n\r\n.button-toggle {\r\n    position: relative;\r\n\r\n    width: var(--input-height);\r\n    height: var(--input-height);\r\n\r\n    background-color: var(--input-background-color);\r\n\r\n    border: 0;\r\n    border-radius: var(--input-border-radius);\r\n    outline: 0;\r\n\r\n    cursor: pointer;\r\n\r\n    transition: var(--input-background-color-transition);\r\n}\r\n\r\n.button-toggle:hover {\r\n    background-color: var(--input-background-color-hover);\r\n}\r\n\r\n.button-toggle__line {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n\r\n    width: 12px;\r\n    height: 2px;\r\n\r\n    margin: auto;\r\n\r\n    background: var(--input-text-color);\r\n}\r\n";

	var styleDevtools$1 = ".navigation {\n    display: none;\n\n    padding: var(--panel-spacing);\n\n    font-size: 0;\n\n    list-style: none;\n\n    background-color: var(--panel-background-color);\n\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\n}\n\n.navigation li {\n    display: inline-block;\n    margin-right: 5px;\n}\n\n.navigation-button {\n    padding: 10px 15px;\n\n    color: rgba(255, 255, 255, 0.5);\n\n    background-color: transparent;\n\n    border: 0;\n    border-radius: 4px;\n    outline: 0;\n\n    font-family: var(--font);\n    font-size: 11px;\n    font-weight: 600;\n\n    cursor: pointer;\n\n    transition: all 0.3s ease-out;\n}\n\n.navigation-button:hover {\n    background-color: rgba(255, 255, 255, 0.01);\n}\n\n.navigation-button.active {\n    color: rgba(255, 255, 255, 0.9);\n\n    background-color: rgba(255, 255, 255, 0.03);\n}\n";

	var templateSidebar$1 = "<div class=\"navigation\">\n\n    <!-- Select container-->\n    <div class=\"select-container\" ref=\"selectContainer\">\n\n        <!-- Arrow -->\n        <svg width=\"11\" height=\"6\" viewBox=\"0 0 11 6\" class=\"arrow\">\n            <path d=\"M1 1L4.83564 4.40945C5.21452 4.74624 5.78548 4.74624 6.16436 4.40945L10 1\" stroke=\"white\" fill=\"transparent\" stroke-opacity=\"0.74\" stroke-linecap=\"round\"/>\n        </svg>\n\n        <!-- Select -->\n        <select class=\"select\" ref=\"select\"></select>\n\n    </div>\n\n    <!-- Button toggle -->\n    <button class=\"button-toggle\" ref=\"buttonToggle\">\n        <div class=\"button-toggle__line\"></div>\n    </button>\n\n</div>\n";

	var templateDevtools$1 = "<ul class=\"navigation\"></ul>\n";

	// Base class

	// Constants
	const NAVIGATION_BUTTON_CLASS = 'navigation-button';
	const ACTIVE_CLASS = 'active';

	class Navigation extends LayoutElement {
	    constructor({ root }) {
	        super({
	            root,
	            style: {
	                styleSidebar: styleSidebar$1,
	                styleDevtools: styleDevtools$1,
	            },
	            template: {
	                templateSidebar: templateSidebar$1,
	                templateDevtools: templateDevtools$1,
	            },
	        });

	        // Data
	        this._isMinimized = false;
	        this._activeIndex = 0;
	        this._elements = [];

	        // Setup
	        this._bindHandlers();
	        this._setupEventListeners();
	    }

	    destroy() {
	        this._removeEventListeners();
	    }

	    /**
	     * Public
	     */
	    add(model) {
	        if (this._elements.length === 0) {
	            this._setVisible();
	        }

	        if (this.$root.isLayoutSidebar()) {
	            const option = document.createElement('option');
	            option.innerText = model.label;
	            option.value = this._elements.length;
	            this._elements.push(option);
	            this.$refs.select.appendChild(option);
	        } else {
	            const button = document.createElement('button');
	            button.classList.add(NAVIGATION_BUTTON_CLASS);
	            if (this.$el.children.length === this._activeIndex) {
	                button.classList.add(ACTIVE_CLASS);
	            }
	            button.innerText = model.label;

	            const li = document.createElement('li');
	            li.appendChild(button);

	            this._elements.push(li);
	            this.$el.appendChild(li);
	        }
	    }

	    goto(label) {
	        this.$refs.select.value = label;
	    }

	    show() {
	        this._isMinimized = false;
	        this.$refs.selectContainer.style.display = 'block';
	        this.$el.style.display = 'grid';
	    }

	    hide() {
	        this._isMinimized = true;
	        this.$refs.selectContainer.style.display = 'none';
	        this.$el.style.display = 'block';
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._clickHandler = this._clickHandler.bind(this);
	        this._selectChangeHandler = this._selectChangeHandler.bind(this);
	        this._clickButtonToggle = this._clickButtonToggle.bind(this);
	    }

	    _setupEventListeners() {
	        this.$el.addEventListener('click', this._clickHandler);
	        if (this.$refs.select) this.$refs.select.addEventListener('change', this._selectChangeHandler);
	        if (this.$refs.buttonToggle) this.$refs.buttonToggle.addEventListener('click', this._clickButtonToggle);
	    }

	    _removeEventListeners() {
	        this.$el.removeEventListener('click', this._clickHandler);
	        if (this.$refs.select) this.$refs.select.removeEventListener('change', this._selectChangeHandler);
	        if (this.$refs.buttonToggle) this.$refs.buttonToggle.removeEventListener('click', this._clickButtonToggle);
	    }

	    _setVisible() {
	        this.$el.style.display = this._isMinimized || this.$root.isDevtools ? 'block' : 'grid';
	    }

	    _getNavigationButtonIndex(element) {
	        return Array.prototype.indexOf.call(this.$el.children, element);
	    }

	    _switch(index) {
	        this.$el.children[this._activeIndex].firstChild.classList.remove(ACTIVE_CLASS);
	        this._activeIndex = index;
	        this.$el.children[this._activeIndex].firstChild.classList.add(ACTIVE_CLASS);
	        this._triggerSwitchEvent(this._activeIndex);
	    }

	    _triggerSwitchEvent(index) {
	        this._activeIndex = index;
	        const event = new CustomEvent('switch', {
	            detail: {
	                index: this._activeIndex,
	            },
	        });
	        this.dispatchEvent(event);
	    }

	    /**
	     * Handlers
	     */
	    _clickHandler(e) {
	        if (e.target.closest(`.${NAVIGATION_BUTTON_CLASS}`)) {
	            const index = this._getNavigationButtonIndex(e.target.parentElement);
	            this._switch(index);
	        }
	    }

	    _selectChangeHandler() {
	        const index = parseInt(this.$refs.select.value);
	        this._triggerSwitchEvent(index);
	        this.$refs.select.blur();
	    }

	    _clickButtonToggle() {
	        this.$root.layout.toggleVisibility();
	    }
	}

	window.customElements.define('dddd-navigation', Navigation);

	class Ticker {
	    constructor() {
	        this._callbacks = [];
	        this._tick = this._tick.bind(this);
	        this._start();
	    }

	    destroy() {
	        this._stop();
	    }

	    /**
	     * Public
	     */
	    add(callback) {
	        this._callbacks.push(callback);
	    }

	    remove(callback) {
	        this._callbacks.splice(this._callbacks.indexOf(callback), 1);
	    }

	    /**
	     * Private
	     */
	    _start() {
	        this._requestAnimationFrame = window.requestAnimationFrame(this._tick);
	    }

	    _stop() {
	        window.cancelAnimationFrame(this._requestAnimationFrame);
	    }

	    _tick() {
	        window.requestAnimationFrame(this._tick);
	        this._triggerCallbacks();
	    }

	    _triggerCallbacks() {
	        for (let i = 0, len = this._callbacks.length; i < len; i++) {
	            this._callbacks[i]();
	        }
	    }
	}

	var Ticker$1 = new Ticker();

	var style$1 = "*,\r\n*:before,\r\n*:after {\r\n    box-sizing: border-box;\r\n}\r\n\r\n.stats {\r\n    padding: 0 var(--panel-spacing) var(--panel-spacing) var(--panel-spacing);\r\n}\r\n\r\n.content {\r\n    height: 100px;\r\n\r\n    border-radius: var(--input-border-radius);background-color: var(--input-background-color);\r\n\r\n    background-color: var(--input-background-color);\r\n}\r\n\r\n.canvas {\r\n    width: 100%;\r\n}\r\n";

	var template$1 = "<div class=\"stats\">\r\n\r\n    <!-- Content -->\r\n    <div class=\"content\">\r\n\r\n        <!-- Canvas -->\r\n        <canvas class=\"canvas\" ref=\"canvas\"></canvas>\r\n\r\n    </div>\r\n\r\n</div>\r\n";

	// Based on

	class Stats extends LayoutElement {
	    constructor({ root, options }) {
	        super({ root, style: style$1, template: template$1 });

	        // Props
	        this._options = options;

	        // Setup
	        this._beginTime = window.performance.now();
	        this._previousTime = this._beginTime;
	        this._fps = 0;
	        this._frames = 0;
	        this._context = this._getContext();
	        this._bindHandlers();
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Getters & Setters
	     */

	    /**
	     * Public
	     */
	    begin() {
	        this._beginTime = window.performance.now();
	    }

	    end() {
	        this._update();
	        this._draw();
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._tickHandler = this._tickHandler.bind(this);
	    }

	    _setupEventListeners() {
	        Ticker$1.add(this._tickHandler);
	    }

	    _removeEventListeners() {
	        Ticker$1.remove(this._tickHandler);
	    }

	    _getContext() {
	        return this.$refs.canvas.getContext('2d');
	    }

	    _update() {
	        const time = window.performance.now();
	        // const diff = time - this._beginTime;

	        this._frames++;

	        if (time >= this._previousTime + 1000) {
	            this._fps = (this._frames * 1000) / (time - this._previousTime);
	            this._previousTime = time;
	            this._frames = 0;
	            this._drawFps();
	        }
	    }

	    _draw() {

	    }

	    _drawFps() {
	        const height = 50;
	        this._context.translate(1, 0);
	        this._context.fillRect(0, height, 1, -height * this._fps / 60);
	    }

	    /**
	     * Handlers
	     */
	    _tickHandler() {
	        // this._update();
	        // this._draw();
	    }
	}

	window.customElements.define('dddd-stats', Stats);

	var style$2 = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.layer {\n    display: none;\n\n    position: relative;\n\n    width: 100%;\n    overflow: hidden;\n}\n\n.layer.active {\n    display: block;\n}\n";

	var template$2 = "<div class=\"layer\"></div>";

	// Base class

	// Constants
	const ACTIVE_CLASS$1 = 'active';
	const GROUP_MIN_WIDTH = 250;

	class Layer extends LayoutElement {
	    constructor({ root, model }) {
	        super({ root, style: style$2, template: template$2, templateData: { label: model.label } });

	        // Props
	        this._model = model;

	        // Data
	        this._containerWidth = 0;
	        this._itemWidth = 0;
	        this._columnsHeight = [];

	        // Setup
	        this._bindHandlers();
	        this._setupEventListeners();
	    }

	    destroy() {
	        this._removeEventListeners();
	    }

	    /**
	     * Getters & Setters
	     */
	    get label() {
	        return this._model.label;
	    }

	    get model() {
	        return this._model;
	    }

	    /**
	     * Public
	     */
	    addElement(element) {
	        this.element.appendChild(element);
	    }

	    addGroup(label) {
	        return this.$root.addGroup(label, {
	            parent: this,
	        });
	    }

	    activate() {
	        this.$el.classList.add(ACTIVE_CLASS$1);
	    }

	    deactivate() {
	        this.$el.classList.remove(ACTIVE_CLASS$1);
	    }

	    resize() {
	        this._resize();
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._resizeHandler = this._resizeHandler.bind(this);
	    }

	    _setupEventListeners() {
	        window.addEventListener('resize', this._resizeHandler);
	    }

	    _removeEventListeners() {
	        window.removeEventListener('resize', this._resizeHandler);
	    }

	    /**
	     * Resize
	     */
	    _resize() {
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

	    _getColumCount() {
	        return Math.max(Math.floor(this._containerWidth / GROUP_MIN_WIDTH), 1);
	    }

	    _getItemWidth() {
	        const gap = this._itemGap * (this._columnCount - 1);
	        const width = Math.floor((this._containerWidth - gap) / this._columnCount);
	        return width;
	    }

	    _getItemGap() {
	        const element = this.$el.children[0].element;
	        const computedStyles = window.getComputedStyle(element);
	        const gap = parseInt(computedStyles.marginRight);
	        return gap;
	    }

	    _getItemHeight(element) {
	        const computedStyles = window.getComputedStyle(element);
	        let height = element.offsetHeight;
	        height += parseInt(computedStyles.marginBottom);
	        return height;
	    }

	    _resetColumnHeight() {
	        this._columnsHeight = [];
	        for (let i = 0; i < this._columnCount; i++) {
	            this._columnsHeight.push(0);
	        }
	    }

	    _positionGroups() {
	        for (const item of this.$el.children) {
	            const columnIndex = this._getNexColumnIndex();
	            const gap = (columnIndex < this._columnCount ? this._itemGap : 0) * columnIndex;
	            const x = columnIndex * this._itemWidth + gap;
	            const y = this._columnsHeight[columnIndex];
	            const height = this._getItemHeight(item.element);
	            this._columnsHeight[columnIndex] += height;
	            item.element.style.position = 'absolute';
	            item.element.style.transform = `translate(${x}px, ${y}px)`;
	            item.element.style.width = `${this._itemWidth}px`;
	        }
	    }

	    _getNexColumnIndex() {
	        const column = this._columnsHeight
	            .slice(0)
	            .sort((a, b) => a - b)
	            .shift();
	        const index = this._columnsHeight.indexOf(column);
	        return index;
	    }

	    _updateHeight() {
	        const height = Math.max(...this._columnsHeight);
	        this.$el.style.height = `${height}px`;
	    }

	    /**
	     * Handlers
	     */
	    _resizeHandler() {
	        this._resize();
	    }
	}

	window.customElements.define('dddd-layer', Layer);

	var style$3 = "*,\r\n*:before,\r\n*:after {\r\n    box-sizing: border-box;\r\n}\r\n\r\n.layers {\r\n    position: relative;\r\n\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: auto;\r\n\r\n    /* padding: var(--panel-spacing) var(--panel-spacing) 0 var(--panel-spacing); */\r\n    padding: var(--panel-spacing);\r\n\r\n    -webkit-font-smoothing: antialiased;\r\n    font-family: var(--font);\r\n    font-weight: 300;\r\n    font-size: 13px;\r\n}\r\n";

	var template$3 = "<div class=\"layers\"></div>";

	// Base class

	class Layers extends LayoutElement {
	    constructor({ root }) {
	        super({ root, style: style$3, template: template$3 });

	        // Options
	        this._activeIndex = 0;
	        this._layers = [];
	    }

	    destroyed() {
	        this._destroyLayers();
	    }

	    /**
	     * Public
	     */
	    add(model) {
	        const layer = new Layer({ root: this.$root, model });

	        if (this._layers.length === this._activeIndex) {
	            layer.activate();
	        }
	        this._layers.push(layer);
	        this.$el.appendChild(layer);
	        return layer;
	    }

	    goto(index) {
	        const currentIndex = this._activeIndex;
	        const newIndex = index;
	        this._layers[currentIndex].deactivate();
	        this._layers[newIndex].activate();
	        this._activeIndex = newIndex;
	        this._resizeLayers();
	    }

	    get(container) {
	        for (const layer of this._layers) {
	            if (layer.label === container) return layer;
	        }
	        return null;
	    }

	    getById(id) {
	        for (const layer of this._layers) {
	            if (layer.id === id) return layer;
	        }
	        return null;
	    }

	    getByIndex(index) {
	        return this._layers[index];
	    }

	    // TODO: Refactor..
	    getIndexByLabel(label) {
	        for (let i = 0, len = this._layers.length; i < len; i++) {
	            if (this._layers[i].label === label) return i;
	        }
	        return null;
	    }

	    isEmpty() {
	        return this._layers.length === 0;
	    }

	    resize() {
	        this._resizeLayers();
	    }

	    show() {
	        this.$el.style.display = 'block';
	    }

	    hide() {
	        this.$el.style.display = 'none';
	    }

	    setHeight(height) {
	        this.$el.style.height = `${height}px`;
	    }

	    /**
	     * Private
	     */
	    _destroyLayers() {
	        for (const layer of this._layers) {
	            layer.destroy();
	        }
	    }

	    _resizeLayers() {
	        for (const layer of this._layers) {
	            layer.resize();
	        }
	    }
	}

	window.customElements.define('dddd-layers', Layers);

	class LocalStorage {
	    /**
	     * Public
	     */
	    set(key, object) {
	        const value = JSON.parse(localStorage.getItem(key)) || {};
	        Object.assign(value, object);
	        localStorage.setItem(key, JSON.stringify(value));
	    }

	    get(key, property) {
	        const value = JSON.parse(localStorage.getItem(key)) || {};
	        return value[property];
	    }
	}

	var LocalStorage$1 = new LocalStorage();

	var styleSidebar$2 = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.group {\n    overflow: hidden;\n\n    margin: 0 0 var(--panel-spacing) 0;\n\n    background-color: var(--panel-background-color);\n\n    border-radius: var(--group-border-radius);\n\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\n}\n\n.button-header {\n    position: relative;\n\n    width: 100%;\n\n    padding: 0;\n\n    text-align: left;\n\n    background-color: var(--group-header-background-color);\n\n    border: 0;\n    outline: 0;\n    cursor: pointer;\n}\n\n.label {\n    display: block;\n\n    padding: var(--group-header-padding);\n\n    font-size: var(--group-header-font-size);\n    font-weight: 400;\n    color: white;\n    letter-spacing: 0.025em;\n}\n\n.arrow {\n    position: absolute;\n    top: 0;\n    right: calc(var(--group-header-padding) + 1px);\n    bottom: 0;\n\n    margin: auto 0;\n}\n\n.content {\n    display: grid;\n    position: relative;\n\n    row-gap: var(--component-row-gap);\n\n    padding: var(--group-padding);\n}\n\n.hidden .content {\n    display: none;\n}\n\n/* Subgroup */\n.group.subgroup {\n    padding: 8px 0 0 0;\n\n    background-color: transparent;\n\n    border-radius: 0;\n\n    box-shadow: initial;\n}\n\n.subgroup .button-header {\n    margin-bottom: 0;\n\n    background: transparent;\n}\n\n.subgroup .label {\n    padding: 0 0 0 21px;\n\n    font-size: 11px;\n}\n\n.subgroup .arrow {\n    position: absolute;\n    top: 3px;\n    right: 0;\n    bottom: 0;\n    left: 2px;\n\n    width: 10px;\n\n    margin: 0;\n}\n\n.hidden.subgroup .arrow {\n    transform: rotate(-90deg);\n}\n\n.subgroup .content {\n    margin: 7px 0 4px 0;\n    padding: 0 0 0 20px;\n}\n\n.subgroup .content:before {\n    content: '';\n\n    display: block;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 6px;\n\n    width: 1px;\n    height: 100%;\n\n    background: rgba(255, 255, 255, 0.1);\n}\n";

	var styleDevtools$2 = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.group {\n    overflow: hidden;\n\n    margin: 0 var(--panel-spacing) var(--panel-spacing) 0;\n\n    background-color: var(--panel-background-color);\n\n    border-radius: var(--group-border-radius);\n\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\n}\n\n.button-header {\n    position: relative;\n\n    width: 100%;\n\n    padding: 0;\n\n    text-align: left;\n\n    background-color: var(--group-header-background-color);\n\n    border: 0;\n    outline: 0;\n    cursor: pointer;\n}\n\n.label {\n    display: block;\n\n    padding: var(--group-header-padding);\n\n    font-size: var(--group-header-font-size);\n    font-weight: 400;\n    color: white;\n    letter-spacing: 0.025em;\n}\n\n.arrow {\n    position: absolute;\n    top: 0;\n    right: calc(var(--group-header-padding) + 1px);\n    bottom: 0;\n\n    margin: auto 0;\n}\n\n.content {\n    display: grid;\n    position: relative;\n\n    row-gap: var(--component-row-gap);\n\n    padding: var(--group-padding);\n}\n\n.hidden .content {\n    display: none;\n}\n\n/* Subgroup */\n.group.subgroup {\n    padding: 8px 0 0 0;\n\n    background-color: transparent;\n\n    border-radius: 0;\n\n    box-shadow: initial;\n}\n\n.subgroup .button-header {\n    margin-bottom: 0;\n\n    background: transparent;\n}\n\n.subgroup .label {\n    padding: 0 0 0 21px;\n\n    font-size: 11px;\n}\n\n.subgroup .arrow {\n    position: absolute;\n    top: 3px;\n    right: 0;\n    bottom: 0;\n    left: 2px;\n\n    width: 10px;\n\n    margin: 0;\n}\n\n.hidden.subgroup .arrow {\n    transform: rotate(-90deg);\n}\n\n.subgroup .content {\n    margin: 7px 0 4px 0;\n    padding: 0 0 0 20px;\n}\n\n.subgroup .content:before {\n    content: '';\n\n    display: block;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 6px;\n\n    width: 1px;\n    height: 100%;\n\n    background: rgba(255, 255, 255, 0.1);\n}\n";

	var templateSidebar$2 = "<div class=\"group active\">\n\n    <!-- Button header -->\n    <button class=\"button-header\" ref=\"buttonHeader\">\n\n        <!-- Label -->\n        <span class=\"label\">\n            {{ label }}\n        </span>\n\n        <!-- Arrow -->\n        <svg width=\"11\" height=\"6\" viewBox=\"0 0 11 6\" class=\"arrow\">\n            <path d=\"M1 1L4.83564 4.40945C5.21452 4.74624 5.78548 4.74624 6.16436 4.40945L10 1\" stroke=\"white\" fill=\"transparent\" stroke-opacity=\"0.74\" stroke-linecap=\"round\"/>\n        </svg>\n\n    </button>\n\n    <!-- Content -->\n    <div class=\"content\" ref=\"content\"></div>\n\n</div>\n";

	var templateDevtools$2 = "<div class=\"group active\">\n\n    <!-- Button header -->\n    <button class=\"button-header\" ref=\"buttonHeader\">\n\n        <!-- Label -->\n        <span class=\"label\">\n            {{ label }}\n        </span>\n\n        <!-- Arrow -->\n        <svg width=\"11\" height=\"6\" viewBox=\"0 0 11 6\" class=\"arrow\">\n            <path d=\"M1 1L4.83564 4.40945C5.21452 4.74624 5.78548 4.74624 6.16436 4.40945L10 1\" stroke=\"white\" fill=\"transparent\" stroke-opacity=\"0.74\" stroke-linecap=\"round\"/>\n        </svg>\n\n    </button>\n\n    <!-- Content -->\n    <div class=\"content\" ref=\"content\"></div>\n\n</div>\n";

	// Base class

	class Group extends LayoutElement {
	    constructor({ root, parentModel, options, model, id }) {
	        super({
	            root,
	            style: {
	                styleSidebar: styleSidebar$2,
	                styleDevtools: styleDevtools$2,
	            },
	            template: {
	                templateSidebar: templateSidebar$2,
	                templateDevtools: templateDevtools$2,
	            },
	            templateData: {
	                label: model.label,
	            },
	        });

	        // Props
	        this._model = model;
	        this._options = options;
	        this._parentModel = parentModel || null;

	        // Data
	        this._id = id || this._generateId();
	        this._isVisible = true;

	        // Setup
	        this._bindHandlers();
	        this._setupEventListeners();
	        this._addSubgroupClass();
	        this._updateStartupVisibility();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Getters & Setters
	     */
	    get id() {
	        return this._id;
	    }

	    get $parent() {
	        return this._parentModel.element;
	    }

	    get options() {
	        return this._options;
	    }

	    get model() {
	        return this._model;
	    }

	    /**
	     * Public
	     */
	    addElement(element) {
	        this.$refs.content.appendChild(element);
	    }

	    add(object, property, options = {}) {
	        return this.$root.add(object, property, options, this._model);
	    }

	    addButton(label, options = {}) {
	        return this.$root.addButton(label, options, this);
	    }

	    addCanvas(options) {
	        return this.$root.addCanvas(options, this);
	    }

	    addGroup(label, options) {
	        return this.$root.addGroup(label, options, this._model);
	    }

	    remove() {
	        return this.$root.removeGroup(this._id);
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._clickHandler = this._clickHandler.bind(this);
	    }

	    _setupEventListeners() {
	        if (this.$refs.buttonHeader) this.$refs.buttonHeader.addEventListener('click', this._clickHandler);
	    }

	    _removeEventListeners() {
	        if (this.$refs.buttonHeader) this.$refs.buttonHeader.removeEventListener('click', this._clickHandler);
	    }

	    _generateId() {
	        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	            const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8);
	            return v.toString(16);
	        });
	    }

	    _addSubgroupClass() {
	        if (this._parentModel.element.tagName !== 'DDDD-LAYER') this.$el.classList.add('subgroup');
	    }

	    _updateStartupVisibility() {
	        const key = this._getLocalStorageKey();
	        const visibility = LocalStorage$1.get(key, 'visibility');
	        if (visibility === 'hidden') this._hide();
	    }

	    _toggleVisibility() {
	        this._isVisible ? this._hide() : this._show();
	    }

	    _show() {
	        this._isVisible = true;
	        this._updateLocalStorage('visible');
	        this.$el.classList.remove('hidden');

	        // TODO: Fix - Should on resize components inside group
	        this.$root.layout.resize();
	    }

	    _hide() {
	        this._isVisible = false;
	        this._updateLocalStorage('hidden');
	        this.$el.classList.add('hidden');
	    }

	    _updateLocalStorage(visibility) {
	        const key = this._getLocalStorageKey();
	        LocalStorage$1.set(key, { visibility });
	    }

	    _getLocalStorageKey() {
	        return `group.${this._parentModel.label}.${this._model.label}`;
	    }

	    /**
	     * Handlers
	     */
	    _clickHandler() {
	        this._toggleVisibility();
	    }
	}

	window.customElements.define('dddd-group', Group);

	// Vendor

	class Component extends HTMLElement {
	    constructor({ style, template }) {
	        super();

	        // Props
	        this._style = style;
	        this._template = template;
	    }

	    setup({ model, root, parentModel }) {
	        // Props
	        this.__root = root;
	        this.__model = model;
	        this.__parentModel = parentModel;

	        // Attach
	        this.attachShadow({ mode: 'open' });

	        // Setup
	        this.$el = this.__addTemplate(this._template);
	        this.$refs = this.__getReferences(this.$el);
	        this.__addStyle(this._style);
	        this.__addLockedClass();
	        this.__bindHandlers();
	        this.__triggerCreated();
	    }

	    connectedCallback() {
	        this.__setupEventListeners();
	        this.__triggerResize();
	        this.__triggerConnected();
	    }

	    destroy() {
	        this.__removeEventListeners();
	        this.__triggerDestroyed();
	    }

	    /**
	     * Getters & Setters
	     */
	    get $root() {
	        return this.__root;
	    }

	    get $parent() {
	        return this.__parentModel.element;
	    }

	    get model() {
	        return this.__model;
	    }

	    /**
	     * Public
	     */

	    tick() {
	        this.__triggerTick();
	        if (this.model.options.listen) {
	            this.model.updateValueFromObject();
	            this.__triggerOnListen();
	        }
	    }

	    resize() {
	        this.__triggerResize();
	    }

	    /**
	     * Private
	     */
	    __bindHandlers() {
	        this.__resizeHandler = this.__resizeHandler.bind(this);
	    }

	    __setupEventListeners() {
	        window.addEventListener('resize', this.__resizeHandler);
	    }

	    __removeEventListeners() {
	        window.removeEventListener('resize', this.__resizeHandler);
	    }

	    __addTemplate(template) {
	        const templateData = {
	            label: this.__getLabel(),
	        };
	        const render = mustache.render(template, templateData);
	        this.shadowRoot.innerHTML = render;
	        return this.shadowRoot.firstChild;
	    }

	    __addStyle(style) {
	        const element = document.createElement('style');
	        const node = document.createTextNode(style);
	        element.appendChild(node);
	        this.shadowRoot.appendChild(element);
	    }

	    __getLabel() {
	        return this.__model.options.label ? this.__model.options.label : this.__model.property;
	    }

	    __getReferences(element) {
	        const refs = {};
	        const elements = element.querySelectorAll('[ref]');

	        let item;
	        let name;
	        for (let i = 0, len = elements.length; i < len; i++) {
	            item = elements[i];
	            name = item.getAttribute('ref');
	            refs[name] = item;
	        }
	        return refs;
	    }

	    __addLockedClass() {
	        if (this.model.options.locked) {
	            this.$el.classList.add('locked');
	        }
	    }

	    __triggerCreated() {
	        if (typeof this.created === 'function') {
	            this.created();
	        }
	    }

	    __triggerConnected() {
	        if (typeof this.connected === 'function') {
	            this.connected();
	        }
	    }

	    __triggerDestroyed() {
	        if (typeof this.destroyed === 'function') {
	            this.destroyed();
	        }
	    }

	    __triggerResize() {
	        if (typeof this.onResize === 'function') {
	            this.onResize();
	        }
	    }

	    __triggerTick() {
	        if (typeof this.onTick === 'function') {
	            this.onTick();
	        }
	    }

	    __triggerOnListen() {
	        if (typeof this.onListen === 'function') {
	            this.onListen();
	        }
	    }

	    /**
	     * Handlers
	     */
	    __resizeHandler() {
	        this.__triggerResize();
	    }
	}

	var style$4 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    position: relative;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    user-select: none;\n\n    transition: var(--input-background-color-transition);\n\n    cursor: col-resize;\n}\n\n.input-container:hover,\n.input-container.active {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.scrubber {\n    position: absolute;\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n\n    background: var(--input-highlight-color);\n\n    transform-origin: top left;\n}\n\n.input {\n    position: relative;\n    display: block;\n\n    width: 100%;\n    height: 100%;\n\n    padding: 0 var(--input-padding);\n\n    background-color: transparent;\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    line-height: var(--input-height);\n    color: var(--input-text-color);\n\n    outline: none;\n    border: 0;\n\n    pointer-events: none;\n}\n";

	var template$4 = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input container -->\r\n    <div class=\"input-container\" ref=\"inputContainer\">\r\n\r\n        <!-- Scrubber -->\r\n        <div class=\"scrubber\" ref=\"scrubber\"></div>\r\n        \r\n        <!-- Input -->\r\n        <input class=\"input\" ref=\"input\">\r\n\r\n    </div>\r\n\r\n</div>";

	class ValueHover {
	    constructor() {
	        this._value = null;
	    }

	    /**
	     * Public
	     */
	    set(value) {
	        this._value = value;
	    }

	    get() {
	        return this._value;
	    }

	    copyToClipboard() {
	        navigator.clipboard.writeText(this._value).then();
	    }
	}

	var ValueHover$1 = new ValueHover();

	// Base component

	// Constants
	const ACTIVE_CLASS$2 = 'active';
	const PRECISION_MODIFIER = 0.3;

	// TODO: On change is triggered twice
	class Slider extends Component {
	    constructor() {
	        super({ style: style$4, template: template$4 });
	    }

	    created() {
	        // Data
	        this._scrubberOffset = 0;
	        this._inputContainer = { x: 0, width: 0 };
	        this._scrubber = { width: 0 };
	        this._mouseStartPosition = { x: 0, y: 0 };
	        this._mousePosition = { x: 0, y: 0 };
	        this._isMouseDown = false;
	        this._isShiftDown = false;
	        this._isSlideStarted = false;

	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        this._resize();
	        this._updateValue(this.model.value);
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Hooks
	     */
	    onResize() {
	        this._resize();
	    }

	    onTick() {
	        this._scaleScrubber(this.model.value);
	    }

	    onListen() {
	        this._updateInputValue(this.model.value);
	        this._scaleScrubber(this.model.value);
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._windowMouseMoveHandler = this._windowMouseMoveHandler.bind(this);
	        this._windowMouseUpHandler = this._windowMouseUpHandler.bind(this);
	        this._inputContainerMouseEnterHandler = this._inputContainerMouseEnterHandler.bind(this);
	        this._inputContainerMouseDownHandler = this._inputContainerMouseDownHandler.bind(this);
	        this._inputContainerMouseUpHandler = this._inputContainerMouseUpHandler.bind(this);
	        this._inputContainerDoubleClickHandler = this._inputContainerDoubleClickHandler.bind(this);
	        this._inputChangeHandler = this._inputChangeHandler.bind(this);
	        this._inputBlurHandler = this._inputBlurHandler.bind(this);
	        this._windowKeyDownHandler = this._windowKeyDownHandler.bind(this);
	        this._windowKeyUpHandler = this._windowKeyUpHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$refs.inputContainer.addEventListener('mouseenter', this._inputContainerMouseEnterHandler);
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

	    _removeEventListeners() {
	        this.$refs.inputContainer.removeEventListener('mouseenter', this._inputContainerMouseEnterHandler);
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

	    _updateValue(value) {
	        this.model.value = Math.max(Math.min(value, this.model.options.max), this.model.options.min);
	        this._updateInputValue(this.model.value);
	        ValueHover$1.set(this.model.value);
	    }

	    _calcValue(mouseX) {
	        const modifier = this._isShiftDown ? PRECISION_MODIFIER : 1;
	        const delta = (mouseX - this._mouseStartPosition.x) * modifier;
	        const x = this._mouseStartPosition.x - this._inputContainer.x + delta;
	        const percentage = (x / this._inputContainer.width);
	        const value = this._map(percentage, 0, 1, this.model.options.min, this.model.options.max);
	        return value;
	    }

	    _scaleScrubber(value) {
	        const scaleX = this._map(value, this.model.options.min, this.model.options.max, 0, 1);
	        this.$refs.scrubber.style.transform = `scaleX(${scaleX})`;
	    }

	    _showScrubber() {
	        this.$refs.scrubber.style.display = 'block';
	    }

	    _hideScrubber() {
	        this.$refs.scrubber.style.display = 'none';
	    }

	    _updateInputValue(value) {
	        const output = (Math.round(value * 100) / 100).toFixed(2);
	        this.$refs.input.value = output;
	    }

	    _map(value, inMin, inMax, outMin, outMax) {
	        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
	    }

	    /**
	     * Resize
	     */
	    _resize() {
	        this._inputContainer = this._getContainerData();
	        this._scaleScrubber(this.model.value);
	    }

	    _getContainerData() {
	        const bcr = this.$refs.inputContainer.getBoundingClientRect();
	        const x = bcr.left;
	        const width = bcr.width;
	        return { x, width };
	    }

	    _selectInput() {
	        this._isInputSelected = true;
	        this.$refs.input.select();
	    }

	    _deselectInput() {
	        this._isInputSelected = false;
	        this.$refs.input.blur();
	    }

	    _addActiveClass() {
	        this.$refs.inputContainer.classList.add(ACTIVE_CLASS$2);
	    }

	    _removeActiveClass() {
	        this.$refs.inputContainer.classList.remove(ACTIVE_CLASS$2);
	    }

	    /**
	     * Handlers
	     */
	    _windowMouseMoveHandler(e) {
	        if (this._isMouseDown) {
	            this._mousePosition.x = e.clientX;
	            if (Math.abs(this._mouseStartPosition.x - e.clientX) > 2) {
	                this._isSlideStarted = true;
	            }
	            const value = this._calcValue(e.clientX);
	            this._updateValue(value);
	        }
	    }

	    _windowMouseUpHandler(e) {
	        this._isMouseDown = false;
	        this._isSlideStarted = false;
	        this._removeActiveClass();
	        // clearTimeout(this._mouseDownClickTimeout);
	    }

	    _inputContainerMouseUpHandler() {
	        if (this._isSlideStarted) return;
	        this._selectInput();
	        this._hideScrubber();
	    }

	    _inputContainerMouseEnterHandler() {
	        ValueHover$1.set(this.model.value);
	    }

	    _inputContainerMouseDownHandler(e) {
	        if (this._isMouseDown || this._isInputSelected) return;
	        this._addActiveClass();
	        this._mouseStartPosition.x = e.clientX;
	        // clearTimeout(this._mouseDownClickTimeout);

	        this._isMouseDown = true;
	        // this._mouseDownClickTimeout = setTimeout(() => {
	        //     this._isMouseDown = true;
	        //     const value = this._calcValue(e.clientX);
	        //     this._updateValue(value);
	        // }, 150);
	    }

	    _inputContainerDoubleClickHandler(e) {
	        // clearTimeout(this._mouseDownClickTimeout);
	        this._selectInput();
	    }

	    _inputChangeHandler(e) {
	        const value = parseFloat(this.$refs.input.value);
	        this._updateValue(value);
	        this._deselectInput();
	        this._showScrubber();
	    }

	    _inputBlurHandler() {
	        this._isInputSelected = false;
	        this._showScrubber();
	    }

	    _windowKeyDownHandler(e) {
	        switch (e.keyCode) {
	            case 16: // Shift
	                if (!this._isShiftDown) {
	                    this._isShiftDown = true;
	                    this._mouseStartPosition.x = this._mousePosition.x;
	                }
	                break;
	        }
	    }

	    _windowKeyUpHandler() {
	        this._isShiftDown = false;
	    }
	}

	window.customElements.define('dddd-slider', Slider);

	var style$5 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n\n    transition: background-color 0.15s;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input {\n    height: var(--input-height);\n\n    padding: 0 var(--input-padding);\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    background-color: var(--input-background-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: none;\n\n    transition: var(--input-background-color-transition);\n}\n\n.input:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n";

	var template$5 = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input -->\r\n    <input class=\"input\" ref=\"input\">\r\n\r\n</div>";

	class Text extends Component {
	    constructor() {
	        super({ style: style$5, template: template$5 });
	    }

	    created() {
	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        this._updateInputValue(this.model.value);
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Hooks
	     */
	    onListen() {
	        this._updateInputValue(this.model.value);
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._keyUpHandler = this._keyUpHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$refs.input.addEventListener('keyup', this._keyUpHandler);
	    }

	    _removeEventListeners() {
	        this.$refs.input.removeEventListener('keyup', this._keyUpHandler);
	    }

	    _updateInputValue(value) {
	        this.$refs.input.value = value;
	    }

	    /**
	     * Handlers
	     */
	    _keyUpHandler() {
	        this.model.value = this.$refs.input.value;
	    }
	}

	window.customElements.define('dddd-input', Text);

	var style$6 = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: start;\n\n    transition: background-color 0.15s;\n}\n\n.label {\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    line-height: var(--input-height);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input {\n    width: 100%;\n    height: var(--input-height);\n\n    padding: 0 var(--input-padding);\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    background-color: var(--input-background-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: none;\n\n    transition: var(--input-background-color-transition);\n\n    cursor: ew-resize;\n}\n\n.input:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n";

	var template$6 = "<div class=\"component\">\n\n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Input -->\n    <input class=\"input\" ref=\"input\">\n\n</div>\n";

	// Base component

	// Constants
	const DEFAULT_STEP_SIZE = 0.01;

	class NumberComponent extends Component {
	    constructor() {
	        super({ style: style$6, template: template$6 });
	    }

	    created() {
	        // Options
	        this._stepSize = this.model.options.stepSize || DEFAULT_STEP_SIZE;
	        this._min = typeof this.model.options.min === 'number' ? this.model.options.min : null;
	        this._max = typeof this.model.options.max === 'number' ? this.model.options.max : null;
	        this._decimalPlaces = this._getDecimalPlaces(this._stepSize);

	        // Data
	        this._activeInput = null;
	        this._isPointerLockActive = false;
	        this._isMouseMoved = false;

	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        this._updateInputValue(this.model.value);
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Hooks
	     */
	    onListen() {
	        this._updateInputValue(this.model.value);
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
	        this._mouseDownHandler = this._mouseDownHandler.bind(this);
	        this._mouseUpHandler = this._mouseUpHandler.bind(this);
	        this._changeHandler = this._changeHandler.bind(this);
	        this._mouseWheelHandler = this._mouseWheelHandler.bind(this);
	        this._pointerLockHanderHandler = this._pointerLockHanderHandler.bind(this);
	        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$refs.input.addEventListener('mouseenter', this._mouseEnterHandler);
	        this.$refs.input.addEventListener('mousedown', this._mouseDownHandler);
	        this.$refs.input.addEventListener('mouseup', this._mouseUpHandler);
	        this.$refs.input.addEventListener('change', this._changeHandler);
	        this.$refs.input.addEventListener('mousewheel', this._mouseWheelHandler);
	        document.addEventListener('pointerlockchange', this._pointerLockHanderHandler);
	        document.addEventListener('mousemove', this._mouseMoveHandler);
	    }

	    _removeEventListeners() {
	        this.$refs.input.removeEventListener('mouseenter', this._mouseEnterHandler);
	        this.$refs.input.removeEventListener('mousedown', this._mouseDownHandler);
	        this.$refs.input.removeEventListener('mouseup', this._mouseUpHandler);
	        this.$refs.input.removeEventListener('change', this._changeHandler);
	        this.$refs.input.removeEventListener('mousewheel', this._mouseWheelHandler);
	        document.removeEventListener('pointerlockchange', this._pointerLockHanderHandler);
	        document.removeEventListener('mousemove', this._mouseMoveHandler);
	    }

	    _updateModelValue(value) {
	        this.model.value = value;
	    }

	    _getInputValueBasedOnMouseMovement(movementX) {
	        return this.model.value + movementX * this._stepSize;
	    }

	    _updateInputValue(value) {
	        this.$refs.input.value = value.toFixed(this._decimalPlaces); // TODO: Fix precision;
	    }

	    _getDecimalPlaces(value) {
	        const split = value.toString().split('.');
	        return split.length > 1 ? split[1].length : 0;
	    }

	    /**
	     * Handlers
	     */
	    _mouseEnterHandler() {
	        ValueHover$1.set(this.model.value);
	    }

	    _mouseDownHandler(e) {
	        this.$refs.input.requestPointerLock();
	        this._isPointerLockActive = true;
	        this._isMouseMoved = false;
	    }

	    _mouseUpHandler(e) {
	        document.exitPointerLock();
	        if (this._isMouseMoved) {
	            this.$refs.input.blur();
	        } else {
	            this.$refs.input.select();
	        }
	    }

	    _changeHandler() {
	        const value = Number(this.$refs.input.value);
	        this._updateModelValue(value);
	        this.$refs.input.blur();
	    }

	    _mouseWheelHandler(e) {
	        const value = this.model.value + this._stepSize * Math.sign(e.wheelDelta);
	        this._updateInputValue(value);
	        this._updateModelValue(value);
	    }

	    _pointerLockHanderHandler() {
	        if (document.pointerLockElement) ; else {
	            this._isPointerLockActive = false;
	        }
	    }

	    _mouseMoveHandler(e) {
	        if (!this._isPointerLockActive) return;

	        const delta = Math.max(Math.min(e.movementX, 100), -100); // NOTE: Prevents bug in chrome where movementX spikes to high value
	        if (Math.abs(delta) > 0) {
	            this._isMouseMoved = true;
	        }

	        let value = this._getInputValueBasedOnMouseMovement(delta);
	        if (typeof this._min === 'number') value = Math.max(value, this._min);
	        if (typeof this._max === 'number') value = Math.min(value, this._max);
	        this._updateInputValue(value);
	        this._updateModelValue(value);
	    }
	}

	window.customElements.define('dddd-number', NumberComponent);

	var style$7 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: start;\n}\n\n.label {\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    line-height: var(--input-height);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.image-container {\n    position: relative;\n\n    width: 100%;\n    aspect-ratio: 16 / 9;\n\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    transition: var(--input-background-color-transition);\n}\n\n.image-container:hover,\n.image-container.drop-area {\n    background-color: var(--input-background-color-hover);\n}\n\n.image-container img {\n    object-fit: cover;\n\n    width: 100%;\n    height: 100%;\n}\n\n.locked .image-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.contain .image-container img {\n    object-fit: contain;\n}\n\n.file-input {\n    position: absolute;\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n\n    border: 0;\n    outline: none;\n\n    cursor: pointer;\n}\n\n.file-input::-webkit-file-upload-button {\n    visibility: hidden;\n}\n\n.file-input::before {\n    content: '';\n\n    display: block;\n\n    width: 100%;\n    height: 100%;\n}\n";

	var template$7 = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Image -->\r\n    <div class=\"image-container\" ref=\"imageContainer\">\r\n\r\n        <!-- File input -->\r\n        <input type=\"file\" ref=\"fileInput\" class=\"file-input\" accept=\".jpg,.png,.gif\">\r\n\r\n    </div>\r\n\r\n</div>";

	// Base class

	// Constants
	const CLASS_DROP_AREA = 'drop-area';
	const TYPE_THREE = 'TYPE_THREE';
	const TYPE_IMAGE = 'TYPE_IMAGE';

	class ImageComponent extends Component {
	    constructor() {
	        super({ style: style$7, template: template$7 });
	    }

	    created() {
	        // Data
	        this._contain = this.model.options.contain;
	        this._previewImage = null;
	        this._type = this._getType();

	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        this._addPreviewImage(this.model.value);
	        if (this._contain) this._addContainClass();
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._dropHandler = this._dropHandler.bind(this);
	        this._dragEnterHandler = this._dragEnterHandler.bind(this);
	        this._dragOverHandler = this._dragOverHandler.bind(this);
	        this._dragLeaveHandler = this._dragLeaveHandler.bind(this);
	        this._fileInputChangeHandler = this._fileInputChangeHandler.bind(this);
	        this._fileLoadedHandler = this._fileLoadedHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$el.addEventListener('drop', this._dropHandler);
	        this.$el.addEventListener('dragenter', this._dragEnterHandler);
	        this.$el.addEventListener('dragover', this._dragOverHandler);
	        this.$el.addEventListener('dragleave', this._dragLeaveHandler);
	        this.$refs.fileInput.addEventListener('change', this._fileInputChangeHandler);
	    }

	    _removeEventListeners() {
	        this.$el.removeEventListener('drop', this._dropHandler);
	        this.$el.removeEventListener('dragenter', this._dragEnterHandler);
	        this.$el.removeEventListener('dragover', this._dragOverHandler);
	        this.$el.removeEventListener('dragleave', this._dragLeaveHandler);
	    }

	    _addContainClass() {
	        this.$el.classList.add('contain');
	    }

	    _getType() {
	        const value = this.model.value;
	        if (value.isTexture) {
	            return TYPE_THREE;
	        } else {
	            return TYPE_IMAGE;
	        }
	    }

	    _handleFile(file) {
	        const reader = new FileReader();
	        reader.onloadend = this._fileLoadedHandler;
	        reader.readAsDataURL(file);
	    }

	    _removePreviewImage() {
	        if (this._previewImage) {
	            this.$refs.imageContainer.removeChild(this._previewImage);
	            this._previewImage = null;
	        }
	    }

	    _addPreviewImage(image) {
	        if (!image) return;

	        if (this._type === TYPE_THREE) {
	            if (this.model.value.image) {
	                this._previewImage = document.createElement('img');
	                this._previewImage.src = this.model.value.image.src;
	                this.$refs.imageContainer.appendChild(this._previewImage);
	            }
	        } else {
	            this._previewImage = document.createElement('img');
	            this._previewImage.src = image;
	            this.$refs.imageContainer.appendChild(this._previewImage);
	        }
	    }

	    _showDropArea() {
	        this.$refs.imageContainer.classList.add(CLASS_DROP_AREA);
	    }

	    _hideDropArea() {
	        this.$refs.imageContainer.classList.remove(CLASS_DROP_AREA);
	    }

	    /**
	     * Handlers
	     */
	    _dropHandler(e) {
	        e.preventDefault();

	        const file = e.dataTransfer.files[0];
	        this._handleFile(file);
	        this._hideDropArea();
	    }

	    _dragEnterHandler(e) {
	        e.preventDefault();
	        this._showDropArea();
	    }

	    _dragOverHandler(e) {
	        e.preventDefault();
	    }

	    _dragLeaveHandler(e) {
	        if (!this.$el.contains(e.fromElement)) {
	            this._hideDropArea();
	        }
	    }

	    _fileLoadedHandler(e) {
	        const image = e.target.result;
	        if (this._type === TYPE_THREE) {
	            if (this.model.value.image) {
	                this.model.value.image.src = image;
	            } else {
	                this.model.value.image = new Image();
	                this.model.value.image.src = image;
	            }

	            this.model.value.needsUpdate = true;
	        } else {
	            this.model.value = image;
	        }
	        this._removePreviewImage();
	        this._addPreviewImage(image);
	    }

	    _fileInputChangeHandler(e) {
	        const file = this.$refs.fileInput.files[0];
	        this._handleFile(file);
	    }
	}

	window.customElements.define('dddd-image', ImageComponent);

	var style$8 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    position: relative;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    user-select: none;\n\n    transition: var(--input-background-color-transition);\n}\n\n.input-container:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.select {\n    width: 100%;\n    height: 100%;\n\n    border: 0;\n    outline: 0;\n\n    padding: 0 var(--input-padding);\n\n    background: transparent;\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    appearance: none;\n}\n\n.select option {\n    color: black;\n}\n\n.arrow {\n    position: absolute;\n    top: 0;\n    right: var(--input-padding);\n    bottom: 0;\n\n    margin: auto 0;\n}\n";

	var template$8 = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input container  -->\r\n    <div class=\"input-container\">\r\n\r\n        <!-- Arrow -->\r\n        <svg width=\"11\" height=\"6\" viewBox=\"0 0 11 6\" class=\"arrow\">\r\n            <path d=\"M1 1L4.83564 4.40945C5.21452 4.74624 5.78548 4.74624 6.16436 4.40945L10 1\" stroke=\"white\" fill=\"transparent\" stroke-opacity=\"0.74\" stroke-linecap=\"round\"/>\r\n        </svg>\r\n        \r\n        <!-- Select -->\r\n        <select class=\"select\" ref=\"select\"></select>\r\n\r\n    </div>\r\n\r\n</div>";

	// Base component

	class Dropdown extends Component {
	    constructor() {
	        super({ style: style$8, template: template$8 });
	    }

	    created() {
	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        this._addOptions();
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Hooks
	     */
	    onListen() {
	        this._updateSelectValue(this.model.value);
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
	        this._selectChangeHandler = this._selectChangeHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$refs.select.addEventListener('mouseenter', this._mouseEnterHandler);
	        this.$refs.select.addEventListener('change', this._selectChangeHandler);
	    }

	    _removeEventListeners() {
	        this.$refs.select.removeEventListener('mouseenter', this._mouseEnterHandler);
	        this.$refs.select.removeEventListener('change', this._selectChangeHandler);
	    }

	    _addOptions() {
	        const options = this.model.options.options;
	        for (let i = 0, len = options.length; i < len; i++) {
	            const item = options[i];
	            const element = document.createElement('option');
	            element.value = item;
	            element.textContent = item;
	            element.selected = item === this.model.value;
	            this.$refs.select.appendChild(element);
	        }
	    }

	    _updateSelectValue(value) {
	        this.$refs.select.value = value; // TODO: Fix precision;
	    }

	    /**
	     * Handlers
	     */
	    _mouseEnterHandler() {
	        ValueHover$1.set(this.model.value);
	    }

	    _selectChangeHandler() {
	        this.model.value = this.$refs.select.value;
	        this.$refs.select.blur();
	    }
	}

	window.customElements.define('dddd-dropdown', Dropdown);

	var style$9 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    position: relative;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    user-select: none;\n\n    transition: var(--input-background-color-transition);\n}\n\n.input-container:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.checkbox {\n    appearance: none;\n\n    display: block;\n    position: relative;\n\n    width: 100%;\n    height: 100%;\n\n    margin: 0;\n    padding: 0 var(--input-padding);\n\n    outline: none;\n\n    cursor: pointer;\n}\n\n.checkbox:after {\n    content: '';\n\n    display: block;\n    box-sizing: border-box;\n\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 10px;\n\n    width: 16px;\n    height: 16px;\n\n    margin: auto 0;\n\n    border-radius: 50%;\n    border: 1px solid var(--input-highlight-color);\n}\n\n.checkbox:checked:after {\n    background: var(--input-highlight-color);\n\n    border: 0;\n}\n";

	var template$9 = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input container  -->\r\n    <div class=\"input-container\">\r\n\r\n        <!-- Checkbox -->\r\n        <input type=\"checkbox\" class=\"checkbox\" ref=\"checkbox\">\r\n\r\n    </div>\r\n\r\n</div>";

	// Base component

	class Checkbox extends Component {
	    constructor() {
	        super({ style: style$9, template: template$9 });
	    }

	    created() {
	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        this._updateChecked();
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Hooks
	     */
	    onListen() {
	        this._updateChecked();
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._checkboxChangeHandler = this._checkboxChangeHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$refs.checkbox.addEventListener('change', this._checkboxChangeHandler);
	    }

	    _removeEventListeners() {
	        this.$refs.checkbox.removeEventListener('change', this._checkboxChangeHandler);
	    }

	    _updateChecked() {
	        this.$refs.checkbox.checked = this.model.value;
	    }

	    /**
	     * Handlers
	     */
	    _checkboxChangeHandler() {
	        this.model.value = this.$refs.checkbox.checked;
	    }
	}

	window.customElements.define('dddd-checkbox', Checkbox);

	var style$a = ".component {\n    transition: background-color 0.15s;\n}\n\n.button {\n    width: calc(100% - var(--label-width));\n    height: var(--input-height);\n\n    padding: 0 var(--input-padding);\n    margin-left: var(--label-width);\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    background-color: var(--input-highlight-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: none;\n\n    transition: var(--input-background-color-transition);\n\n    cursor: pointer;\n}\n\n.button:hover {\n    background-color: rgba(77, 83, 217, 1);\n    background-color: var(--input-highlight-color-hover);\n}\n\n.full-width .button {\n    width: 100%;\n\n    margin-left: 0;\n}\n";

	var template$a = "<div class=\"component\">\r\n    \r\n    <!-- Button -->\r\n    <button class=\"button\" ref=\"button\">{{ label }}</button>\r\n\r\n</div>";

	// Base component

	class Button extends Component {
	    constructor() {
	        super({ style: style$a, template: template$a });
	    }

	    created() {
	        // Options
	        this._isFullWidth = this.model.options.fullWidth || false;

	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        if (this._isFullWidth) this._addFullWidthClass();
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._clickHandler = this._clickHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$refs.button.addEventListener('click', this._clickHandler);
	    }

	    _removeEventListeners() {
	        this.$refs.button.removeEventListener('click', this._clickHandler);
	    }

	    _addFullWidthClass() {
	        this.$el.classList.add('full-width');
	    }

	    // _triggerOnClickCallback(value) {
	    //     if (typeof this.model.options.onClick === 'function') {
	    //         this.model.options.onClick(value);
	    //     }
	    // }

	    /**
	     * Handlers
	     */
	    _clickHandler() {
	        this.model.value = 'click';
	        // this._triggerOnClickCallback();
	    }
	}

	window.customElements.define('dddd-button', Button);

	var style$b = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    display: grid;\n    position: relative;\n\n    grid-template-columns: 27px calc(100% - 20px);\n    align-items: center;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: 0 var(--input-padding) 0 5px;\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    transition: var(--input-background-color-transition);\n}\n\n.input-container:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.component.error .input-container {\n    background-color: var(--input-background-color-error);\n}\n\n.color {\n    width: 20px;\n    height: 20px;\n\n    margin: 0;\n    padding: 0;\n\n    background: transparent;\n\n    border: 0;\n    outline: 0;\n\n    appearance: none;\n    cursor: pointer;\n}\n\n.color::-webkit-color-swatch-wrapper {\n    padding: 0;\n}\n\n.color::-webkit-color-swatch {\n    border: none;\n    border-radius: 4px;\n}\n\n.color-string {\n    background: transparent;\n\n    border: 0;\n    outline: 0;\n\n    font-size: var(--input-font-size);\n    color: var(--input-text-color);\n}\n\n/* .alpha {\n    color: var(--input-text-color);\n    text-align: right;\n} */\n";

	var template$b = "<div class=\"component\">\r\n\r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input container  -->\r\n    <div class=\"input-container\">\r\n\r\n        <!-- Color input -->\r\n        <input type=\"color\" class=\"color\" ref=\"color\">\r\n\r\n        <!-- Color string -->\r\n        <input type=\"text\" class=\"color-string\" ref=\"colorString\">\r\n\r\n        <!-- Alpha -->\r\n        <!-- <span class=\"alpha\">100%</span> -->\r\n\r\n    </div>\r\n\r\n</div>\r\n";

	// Base component

	// Constants
	const TYPE_THREE$1 = 'TYPE_THREE';
	const TYPE_STRING = 'TYPE_STRING';
	const TYPE_HEX = 'TYPE_HEX';
	const CLASS_NAME_ERROR = 'error';

	class Color extends Component {
	    constructor() {
	        super({ style: style$b, template: template$b });
	    }

	    created() {
	        // Data
	        this._type = this._getType();

	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        const value = this._getValue();
	        this._setColorValue(value);
	        this._setColorString(value);
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
	        this._inputChangeHandler = this._inputChangeHandler.bind(this);
	        this._colorStringFocusHandler = this._colorStringFocusHandler.bind(this);
	        this._colorStringBlurHandler = this._colorStringBlurHandler.bind(this);
	        this._colorStringKeyUpHandler = this._colorStringKeyUpHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$refs.color.addEventListener('mouseenter', this._mouseEnterHandler);
	        this.$refs.color.addEventListener('input', this._inputChangeHandler);
	        this.$refs.colorString.addEventListener('focus', this._colorStringFocusHandler);
	        this.$refs.colorString.addEventListener('blur', this._colorStringBlurHandler);
	        this.$refs.colorString.addEventListener('keyup', this._colorStringKeyUpHandler);
	    }

	    _removeEventListeners() {
	        this.$refs.color.removeEventListener('mouseenter', this._mouseEnterHandler);
	        this.$refs.color.removeEventListener('input', this._inputChangeHandler);
	        this.$refs.colorString.removeEventListener('focus', this._colorStringFocusHandler);
	        this.$refs.colorString.removeEventListener('blur', this._colorStringBlurHandler);
	        this.$refs.colorString.removeEventListener('keyup', this._colorStringKeyUpHandler);
	    }

	    _getType() {
	        const value = this.model.value;
	        if (value.isColor) {
	            return TYPE_THREE$1;
	        } else if (this._isHex(value)) {
	            return TYPE_HEX;
	        } else {
	            return TYPE_STRING;
	        }
	    }

	    _getValue() {
	        switch (this._type) {
	            case TYPE_THREE$1:
	                return `#${this.model.value.getHexString()}`;
	            case TYPE_STRING:
	                return this._convertColorNameToHex(this.model.value);
	            default:
	                return this.model.value;
	        }
	    }

	    _setColorValue(value) {
	        this.$refs.color.value = value;
	    }

	    _setColorString(value) {
	        this.$refs.colorString.value = value;
	    }

	    _setModelValue(value) {
	        if (this._type === TYPE_THREE$1) {
	            this.model.value.set(value);
	            if (typeof this.model.options.onChange === 'function') {
	                this.model.options.onChange(this._value);
	            }
	        } else {
	            this.model.value = value;
	        }
	    }

	    _updateValueFromStringInput() {
	        let value = this.$refs.colorString.value;
	        if (value.charAt(0) !== '#') value = '#' + value;

	        if (this._isHex(value)) {
	            this._hideError();
	            this._setColorString(value);
	            this._setModelValue(value);
	            this._setColorValue(value);
	        } else {
	            this._showError();
	            this._setColorValue('#000000');
	        }
	    }

	    _showError() {
	        this.$el.classList.add(CLASS_NAME_ERROR);
	    }

	    _hideError() {
	        this.$el.classList.remove(CLASS_NAME_ERROR);
	    }

	    /**
	     * Helpers
	     */
	    _isHex(value) {
	        return /^#([0-9A-F]{3}){1,2}$/i.test(value);
	    }

	    _convertColorNameToHex(colorName) {
	        const context = document.createElement('canvas').getContext('2d');
	        context.fillStyle = colorName;
	        return context.fillStyle;
	    }

	    /**
	     * Handlers
	     */
	    _mouseEnterHandler() {
	        ValueHover$1.set(this.$refs.colorString.value);
	    }

	    _inputChangeHandler() {
	        const value = this.$refs.color.value;
	        this._setModelValue(value);
	        this._setColorString(value);
	        this._hideError();
	        ValueHover$1.set(value);
	    }

	    _colorStringFocusHandler() {
	        this.$refs.colorString.select();
	    }

	    _colorStringBlurHandler() {
	        this._updateValueFromStringInput();
	    }

	    _colorStringKeyUpHandler(e) {
	        if (e.keyCode === 13) {
	            this._updateValueFromStringInput();
	            this.$refs.colorString.blur();
	        }
	    }
	}

	window.customElements.define('dddd-color', Color);

	var style$c = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: start;\n\n    transition: background-color 0.15s;\n}\n\n.label {\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    line-height: var(--input-height);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    display: grid;\n\n    grid-template-columns: repeat(3, 1fr);\n    gap: var(--component-row-gap);\n}\n\n.input {\n    width: 100%;\n    height: var(--input-height);\n\n    padding: 0 var(--input-padding);\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    background-color: var(--input-background-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: none;\n\n    transition: var(--input-background-color-transition);\n\n    cursor: ew-resize;\n}\n\n.input:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n\n.locked .input {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n";

	var template$c = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input container -->\r\n    <div class=\"input-container\" ref=\"inputContainer\"></div>\r\n\r\n</div>";

	// Base component

	// Constants
	const DEFAULT_STEP_SIZE$1 = 0.01;

	class MultiInput extends Component {
	    constructor() {
	        super({ style: style$c, template: template$c });
	    }

	    created() {
	        // Options
	        this._stepSize = this.model.options.stepSize || DEFAULT_STEP_SIZE$1;
	        this._decimalPlaces = this._getDecimalPlaces(this._stepSize);

	        // Data
	        this._activeInput = null;
	        this._isPointerLockActive = false;
	        this._inputs = [];

	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        this._createInputs();
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Hooks
	     */
	    onListen() {
	        this._updateAllInputValues(this.model.value);
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
	        this._mouseDownHandler = this._mouseDownHandler.bind(this);
	        this._mouseUpHandler = this._mouseUpHandler.bind(this);
	        this._changeHandler = this._changeHandler.bind(this);
	        this._pointerLockHanderHandler = this._pointerLockHanderHandler.bind(this);
	        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
	    }

	    _setupEventListeners() {
	        for (let i = 0, len = this._inputs.length; i < len; i++) {
	            this._inputs[i].addEventListener('mouseenter', this._mouseEnterHandler);
	        }
	        this.$el.addEventListener('mousedown', this._mouseDownHandler);
	        this.$el.addEventListener('mouseup', this._mouseUpHandler);
	        this.$el.addEventListener('change', this._changeHandler);
	        document.addEventListener('pointerlockchange', this._pointerLockHanderHandler);
	        document.addEventListener('mousemove', this._mouseMoveHandler);
	    }

	    _removeEventListeners() {
	        for (let i = 0, len = this._inputs.length; i < len; i++) {
	            this._inputs[i].removeEventListener('mouseenter', this._mouseEnterHandler);
	        }
	        this.$el.removeEventListener('mousedown', this._mouseDownHandler);
	        this.$el.removeEventListener('mouseup', this._mouseUpHandler);
	        this.$el.removeEventListener('change', this._changeHandler);
	        document.removeEventListener('pointerlockchange', this._pointerLockHanderHandler);
	        document.removeEventListener('mousemove', this._mouseMoveHandler);
	    }

	    _createInputs() {
	        for (const key in this.model.value) {
	            const value = this.model.value[key];
	            if (typeof value === 'number') {
	                const input = document.createElement('input');
	                input.classList.add('input');
	                input.value = value;
	                this._inputs.push(input);
	                this.$refs.inputContainer.appendChild(input);
	            }
	        }
	    }

	    _updateModelValue() {
	        for (const [index, [key]] of Object.entries(Object.entries(this.model.value))) {
	            if (this._inputs[index]) {
	                this.model.value[key] = parseFloat(this._inputs[index].value);
	            }
	        }
	    }

	    _getInputValueBasedOnMouseMovement(movementX) {
	        if (!this._activeInput) return;
	        const currentValue = parseFloat(this._activeInput.value);
	        return currentValue + movementX * this._stepSize;
	    }

	    _updateInputValue(value) {
	        if (this._activeInput) {
	            this._activeInput.value = value.toFixed(this._decimalPlaces); // TODO: Fix precision
	        }
	    }

	    _updateAllInputValues() {
	        for (const [index, [key]] of Object.entries(Object.entries(this.model.value))) {
	            this._inputs[index].value = this.model.value[key];
	        }
	    }

	    _getDecimalPlaces(value) {
	        const split = value.toString().split('.');
	        return split.length > 1 ? split[1].length : 0;
	    }

	    /**
	     * Handlers
	     */
	    _mouseEnterHandler(e) {
	        ValueHover$1.set(e.target.value);
	    }

	    _mouseDownHandler(e) {
	        if (e.target.tagName === 'INPUT') {
	            this._activeInput = e.target;
	            this.$el.requestPointerLock();
	        }
	    }

	    _mouseUpHandler() {
	        this._activeInput = null;
	        document.exitPointerLock();
	    }

	    _changeHandler() {
	        this._updateInputValue();
	    }

	    _pointerLockHanderHandler(e) {
	        if (document.pointerLockElement) {
	            this._isPointerLockActive = true;
	        } else {
	            this._isPointerLockActive = false;
	        }
	    }

	    _mouseMoveHandler(e) {
	        if (!this._isPointerLockActive) return;

	        const delta = Math.max(Math.min(e.movementX, 100), -100); // NOTE: Prevents bug in chrome where movementX spikes to high value
	        const value = this._getInputValueBasedOnMouseMovement(delta);
	        this._updateInputValue(value);
	        this._updateModelValue();
	    }
	}

	window.customElements.define('dddd-multi-input', MultiInput);

	var style$d = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: start;\n\n    transition: background-color 0.15s;\n}\n\n.label {\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    line-height: var(--input-height);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    overflow: hidden;\n\n    text-align: center;\n\n    background-color: var(--input-background-color);\n    border-radius: var(--input-border-radius);\n}\n\n.input-container canvas {\n    max-width: 100%;\n}\n";

	var template$d = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input container -->\r\n    <div class=\"input-container\" ref=\"inputContainer\"></div>\r\n\r\n</div>";

	// Base component

	class Canvas extends Component {
	    constructor() {
	        super({ style: style$d, template: template$d });
	    }

	    created() {
	        // Options

	        // Data

	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        this._addCanvas();
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Hooks
	     */
	    onListen() {
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	    }

	    _setupEventListeners() {
	    }

	    _removeEventListeners() {
	    }

	    _addCanvas() {
	        this.$refs.inputContainer.appendChild(this.model.options.canvas);
	    }

	    /**
	     * Handlers
	     */
	}

	window.customElements.define('dddd-canvas', Canvas);

	var componentTypes = {
	    slider: Slider,
	    text: Text,
	    number: NumberComponent,
	    image: ImageComponent,
	    dropdown: Dropdown,
	    checkbox: Checkbox,
	    button: Button,
	    color: Color,
	    multiInput: MultiInput,
	    canvas: Canvas,
	};

	class LayerCollection {
	    constructor() {
	        this._layers = [];
	    }

	    /**
	     * Public
	     */
	    add(layer) {
	        this._layers.push(layer);
	    }

	    remove(layer) {
	        const index = this._layers.indexOf(layer);
	        if (index > -1) this._layers.splice(index, 1);
	    }

	    serialize() {
	        const layers = [];
	        for (let i = 0, len = this._layers.length; i < len; i++) {
	            layers.push(this._layers[i].serialize());
	        }
	        return layers;
	    }
	}

	class LayoutModel {
	    constructor() {
	        this._layers = new LayerCollection();
	        this._components = [];
	    }

	    /**
	     * Public
	     */
	    addLayer(model) {
	        this._layers.add(model);
	    }

	    addComponent(model) {
	        this._components.push(model);
	    }

	    updateComponent(data) {
	        const model = this._getComponentById(data.id);
	        model.value = data.value;
	    }

	    serialize() {
	        const data = {
	            layers: this._layers.serialize(),
	        };
	        return data;
	    }

	    /**
	     * Private
	     */
	    _getComponentById(id) {
	        let item;
	        for (let i = 0, len = this._components.length; i < len; i++) {
	            item = this._components[i];
	            if (item.id === id) return item;
	        }
	    }
	}

	var LayoutModel$1 = new LayoutModel();

	class GroupCollection {
	    constructor() {
	        this._groups = [];
	    }

	    /**
	     * Public
	     */
	    add(group) {
	        this._groups.push(group);
	    }

	    remove(group) {
	        const index = this._groups.indexOf(group);
	        if (index > -1) this._groups.splice(index, 1);
	    }

	    serialize() {
	        const groups = [];
	        for (let i = 0, len = this._groups.length; i < len; i++) {
	            groups.push(this._groups[i].serialize());
	        }
	        return groups;
	    }
	}

	class ComponentCollection {
	    constructor() {
	        this._components = [];
	    }

	    /**
	     * Public
	     */
	    add(layer) {
	        this._components.push(layer);
	    }

	    remove(layer) {
	        const index = this._components.indexOf(layer);
	        if (index > -1) this._components.splice(index, 1);
	    }

	    serialize() {
	        const components = [];
	        for (let i = 0, len = this._components.length; i < len; i++) {
	            components.push(this._components[i].serialize());
	        }
	        return components;
	    }
	}

	// Collections

	class LayerModel {
	    constructor(options) {
	        // Props
	        this._label = options.label;
	        this._element = options.element;

	        // Setup
	        this._groups = new GroupCollection();
	        this._components = new ComponentCollection();
	    }

	    /**
	     * Getters & Setters
	     */
	    get label() {
	        return this._label;
	    }

	    get element() {
	        return this._element;
	    }

	    set element(value) {
	        this._element = value;
	    }

	    /**
	     * Add GroupModel to GroupCollection
	     * @param {GroupModel} model
	     */
	    addGroup(model) {
	        this._groups.add(model);
	    }

	    serialize() {
	        const data = {
	            label: this._label,
	            groups: this._groups.serialize(),
	            components: this._components.serialize(),
	        };
	        return data;
	    }
	}

	class ComponentModel {
	    constructor({ root, object, property, options, parent, id, type, value, onChange }) {
	        // Props
	        this._root = root;
	        this._object = object || {};
	        this._property = property;
	        this._options = options || {};
	        this._parent = parent || null;
	        this._id = id || this._generateId();
	        this._type = type || this._detectType();
	        this._value = value || this._object[this._property];
	        this._onChangeCallback = onChange;
	    }

	    /**
	     * Getters & Setters
	     */
	    set value(value) {
	        this._value = value;
	        this._object[this._property] = this._value;

	        if (typeof this._options.onChange === 'function') {
	            this._options.onChange(this._value);
	        }

	        // TODO: Refactor..
	        if (this._type === 'button' && this._value === 'click') {
	            if (typeof this._options.onClick === 'function') {
	                this._options.onClick(value);
	            }
	        }

	        if (typeof this._onChangeCallback === 'function') {
	            this._onChangeCallback(this.serialize());
	        }
	    }

	    get value() {
	        return this._value;
	    }

	    get object() {
	        return this._object;
	    }

	    set object(value) {
	        this._object = value;
	    }

	    get options() {
	        return this._options;
	    }

	    get parent() {
	        return this._parent;
	    }

	    get property() {
	        return this._property;
	    }

	    get type() {
	        return this._type;
	    }

	    get id() {
	        return this._id;
	    }

	    /**
	     * Public
	     */
	    serialize() {
	        const data = {
	            object: this._object,
	            property: this._property,
	            options: this._removeFunctions(this._options),
	            id: this._id,
	            type: this._type,
	            value: this._value,
	        };
	        return data;
	    }

	    updateValueFromObject() {
	        this._value = this._object[this._property];
	        // console.log(this._value);

	        // // TODO: Refactor function name
	        // if (this._root.isDevtools && typeof this._onChangeCallback === 'function') {
	        //     this._onChangeCallback(this.getData());
	        // }
	    }

	    /**
	     * Private
	     */
	    _generateId() {
	        // uuidv4
	        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	            const r = (Math.random() * 16) | 0;
	            const v = c === 'x' ? r : (r & 0x3) | 0x8;
	            return v.toString(16);
	        });
	    }

	    _detectType() {
	        if (!(this._property in this._object)) {
	            throw new Error(`Property '${this._property}' does not exists`);
	        }

	        const value = this._object?.[this._property];

	        // Three.js Texture
	        if (value.isTexture) {
	            return 'image';
	        }

	        // Image
	        if ((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(value)) {
	            return 'image';
	        }

	        // Canvas
	        if (this._options.type === 'canvas') {
	            return 'canvas';
	        }

	        // Dropdown
	        if (this._options.options &&
	            typeof this._options.options === 'object') {
	            return 'dropdown';
	        }

	        // Slider
	        if (typeof value === 'number' &&
	            typeof this._options.min === 'number' &&
	            typeof this._options.max === 'number') {
	            return 'slider';
	        }

	        // Color
	        if (this._options.type === 'color') {
	            return 'color';
	        }

	        // Three.js Color
	        if (value.isColor) {
	            return 'color';
	        }

	        // Color
	        if (/^#[0-9A-F]{6}$/i.test(value)) {
	            return 'color';
	        }

	        // MultiInput
	        if (typeof value === 'object') {
	            return 'multiInput';
	        }

	        // Checkbox
	        if (typeof value === 'boolean') {
	            return 'checkbox';
	        }

	        // Number
	        if (typeof value === 'number') {
	            return 'number';
	        }

	        // Text
	        if (typeof value === 'string') {
	            return 'text';
	        }

	        {
	            throw new Error('Input type not detected');
	        }
	    }

	    // TODO: Move to helper file
	    _removeFunctions(data) {
	        const object = JSON.parse(JSON.stringify(data));
	        function eachRecursive(object) {
	            for (const key in object) {
	                if (typeof object[key] === 'object' && object[key] !== null) {
	                    eachRecursive(object[key]);
	                } else if (typeof object[key] === 'function') {
	                    delete object[key];
	                }
	            }
	        }
	        eachRecursive(object);
	        return object;
	    }
	}

	// Collections

	class GroupModel {
	    constructor(options) {
	        // Props
	        this._label = options.label;
	        this._element = options.element;

	        // Setup
	        this._groups = new GroupCollection();
	        this._components = new ComponentCollection();
	    }

	    /**
	     * Getters & Setters
	     */
	    get label() {
	        return this._label;
	    }

	    get element() {
	        return this._element;
	    }

	    set element(value) {
	        this._element = value;
	    }

	    /**
	     * Add GroupModel to GroupCollection
	     * @param {GroupModel} model
	     */
	    addGroup(model) {
	        this._groups.add(model);
	    }

	    /**
	     * Add ComponentModel to ComponentCollection
	     * @param {ComponentModel} model
	     */
	    addComponent(model) {
	        this._components.add(model);
	    }

	    serialize() {
	        const data = {
	            label: this._label,
	            groups: this._groups.serialize(),
	            components: this._components.serialize(),
	        };
	        return data;
	    }
	}

	// Layout

	// Layout types
	const LAYOUT_TYPE_SIDEBAR = 'LAYOUT_TYPE_SIDEBAR';
	const LAYOUT_TYPE_DEVTOOLS = 'LAYOUT_TYPE_DEVTOOLS';

	class Layout {
	    constructor({ root, type, onLayerChange, minimized }) {
	        // Props
	        this._root = root;
	        this._type = type;
	        this._onLayerChangeCallback = onLayerChange;

	        // Setup
	        this._isVisible = true;
	        this._layers = [];
	        this._groups = [];
	        this._components = [];

	        // Elements
	        this._container = this._createContainer();
	        this._header = this._createHeader();
	        this._navigation = this._createNavigation();
	        // this._stats = this._createStats();
	        this._layers = this._createLayers();

	        if (minimized) this.toggleVisibility();
	        this._bindHandlers();
	        this._setupEventListeners();
	    }

	    destroy() {
	        this._container.destroy();
	        this._navigation.destroy();
	        this._layers.destroy();
	        // this._components.destroy();
	        this._removeContainerElement();
	    }

	    /**
	     * Getters & Setters
	     */
	    get stats() {
	        return this._stats;
	    }

	    /**
	     * Public
	     */
	    addLayer(label) {
	        // Create layer model
	        const model = new LayerModel({
	            label,
	        });

	        // Add layer model to the layour model
	        LayoutModel$1.addLayer(model);

	        // Create layer element
	        const layer = this._layers.add(model);

	        // Link element to model
	        model.element = layer;

	        // Add layer to navigation
	        this._navigation.add(model);

	        // FIX: Find a better solution for all this resize shit
	        this._layers.resize();
	        this._header.resize();
	        this._setLayersHeight();

	        return layer;
	    }

	    gotoLayer(label) {
	        const index = this._layers.getIndexByLabel(label);
	        this._navigation.goto(index);
	        this._layers.goto(index);
	    }

	    addGroup(label, options = {}, parentModel) {
	        // Get parent model if not present
	        parentModel = parentModel || this._getParentModelByContainer(options.container);

	        // Create group model
	        const model = new GroupModel({
	            label,
	        });

	        // Add model to parent model
	        parentModel.addGroup(model);

	        // Create group element
	        const group = new Group({
	            root: this._root,
	            parentModel,
	            options,
	            model,
	        });

	        // Link element to model
	        model.element = group;

	        // Add element to parent
	        parentModel.element.addElement(group);

	        // Store group reference
	        this._groups.push(group);

	        // Resize..
	        this._layers.resize();

	        return group;
	    }

	    removeGroup(id) {
	        const group = this._getGroupById(id);
	        group.parent.content.removeChild(group);
	        this._groups.splice(this._groups.indexOf(group), 1);
	        this._layers.resize();
	        LayoutModel$1.removeGroup(id);
	    }

	    addComponent({ object, property, options, parentModel, id, type }) {
	        // Get parent model if not present
	        parentModel = parentModel || this._getParentModelByContainer(options.container);

	        // Create component model
	        const model = new ComponentModel({
	            object,
	            property,
	            options,
	            parent: parentModel,
	            id,
	            type,
	            onChange: (data) => {
	                this._root.triggerChange(data);
	            },
	        });

	        // Add model to parent model
	        parentModel.addComponent(model);

	        // Add model reference to layout model
	        LayoutModel$1.addComponent(model);

	        // Get component class
	        const componentClass = componentTypes[model.type];

	        // Create component
	        const component = new componentClass();
	        component.setup({
	            model,
	            root: this._root,
	            parentModel,
	        });

	        // Store component reference
	        this._components.push(component);

	        // Add component to container
	        parentModel.element.addElement(component);

	        // Return created component
	        return component;
	    }

	    getLayer(label) {
	        return this._layers.get(label);
	    }

	    getParent(label) {
	        const layer = this._layers.get(label);
	        if (layer) return layer;

	        const group = this._getGroupByLabel(label);
	        if (group) return group;
	    }

	    getParentById(id) {
	        const layer = this._layers.getById(id);
	        if (layer) return layer;

	        const group = this._getGroupById(id);
	        if (group) return group;
	    }

	    remove() {
	        document.body.removeChild(this._container);
	    }

	    resize() {
	        this._layers.resize();
	        // this._components.resize();
	        this._setLayersHeight();
	    }

	    toggleVisibility() {
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
	        // this._components.resize();
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._navigationSwitchHandler = this._navigationSwitchHandler.bind(this);
	        this._keyUpHandler = this._keyUpHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this._navigation.addEventListener('switch', this._navigationSwitchHandler);
	        window.addEventListener('keyup', this._keyUpHandler);
	    }

	    _removeEventListeners() {
	        this._navigation.addEventListener('switch', this._navigationSwitchHandler);
	        window.addEventListener('keyup', this._keyUpHandler);
	    }

	    _createContainer() {
	        const container = new Container({
	            root: this._root,
	        });
	        document.body.appendChild(container);
	        return container;
	    }

	    _createHeader() {
	        const header = new Header({
	            root: this._root,
	        });
	        this._container.addElement(header);
	        return header;
	    }

	    _createNavigation() {
	        const navigation = new Navigation({
	            root: this._root,
	        });
	        this._header.addElement(navigation);
	        return navigation;
	    }

	    _createStats() {
	        const stats = new Stats({
	            root: this._root,
	        });
	        this._header.addElement(stats);
	        return stats;
	    }

	    _createLayers() {
	        const layers = new Layers({
	            root: this._root,
	        });
	        this._container.addElement(layers);
	        return layers;
	    }

	    // _createComponents() {
	    //     const componenents = new Components({
	    //         root: this._root,
	    //         layout: this,
	    //     });
	    //     return componenents;
	    // }

	    _getGroupById(id) {
	        for (const group of this._groups) {
	            if (group.id === id) return group;
	        }
	    }

	    _getGroupByLabel(label) {
	        for (const group of this._groups) {
	            if (group.model.label === label) return group;
	        }
	    }

	    _getGroupContainer(label, container) {
	        let groupContainer;
	        if (container) {
	            groupContainer = this._layers.get(container);
	            if (!groupContainer) {
	                throw new Error(`Layer '${container}' not found`);
	            }
	        } else {
	            if (this._layers.isEmpty()) {
	                groupContainer = this._layers.add();
	            } else {
	                throw new Error(`No 'container' defined for group '${label}'`);
	            }
	        }
	        return groupContainer;
	    }

	    _removeContainerElement() {
	        document.body.removeChild(this._container);
	    }

	    _setLayersHeight() {
	        const layersHeight = this._container.height - this._header.height;
	        this._layers.setHeight(layersHeight);
	    }

	    _addComponentToContainer(component) {
	        const container = component.model.options.container;
	        if (container) {
	            const element = this._root.layout.getParent(container).content;
	            element.appendChild(component);
	        }

	        const parentId = component.model.parentId;
	        if (parentId) {
	            const element = this._root.layout.getParentById(parentId).content;
	            element.appendChild(component);
	        }

	        const parent = component.model.parent;
	        if (parent) {
	            const element = parent.content;
	            element.appendChild(component);
	        }

	        this._root.layout.resize();
	    }

	    _getParentModelByContainer(container) {
	        const layer = this._layers.get(container);
	        if (layer) return layer.model;

	        const group = this._getGroupByLabel(container);
	        if (group) return group.model;
	    }

	    /**
	     * Handlers
	     */
	    _navigationSwitchHandler(e) {
	        this._layers.goto(e.detail.index);
	        // this._components.resize();
	        if (typeof this._onLayerChangeCallback === 'function') {
	            const label = this._layers.getByIndex(e.detail.index).label;
	            this._onLayerChangeCallback(label);
	        }
	    }

	    _keyUpHandler(e) {
	        if (e.keyCode === 67) ValueHover$1.copyToClipboard();
	    }
	}

	// Layout

	class DDDD {
	    constructor({ devtools, minimized, onChange, onLayerChange } = {}) {
	        // Props
	        this._isDevtools = devtools;
	        this._isMinimized = minimized || false;
	        this._onChangeCallback = onChange;
	        this._onLayerChangeCallback = onLayerChange;

	        // Setup
	        this._layout = this._createLayout();
	        this._bindHandlers();
	        this._setupEventListeners();
	    }

	    destroy() {
	        this._layout.destroy();
	        this._removeEventListeners();
	    }

	    /**
	     * Getters & Setters
	     */
	    get isDevtools() {
	        return this._isDevtools;
	    }

	    get layout() {
	        return this._layout;
	    }

	    get stats() {
	        return this._layout.stats;
	    }

	    get onChangeCallback() {
	        return this._onChangeCallback;
	    }

	    /**
	     * Public
	     */
	    add(object, property, options, parentModel = null) {
	        return this._layout.addComponent({ object, property, options, parentModel });
	    }

	    // TODO: Fix
	    remove(component) {
	        // this._components.remove(component);
	    }

	    addButton(label, options = {}, parent = null) {
	        options.label = label;
	        return this._layout.addComponent({ options, type: 'button', parent });
	    }

	    addCanvas(options, parent = null) {
	        return this._layout.addComponent({ options, type: 'canvas', parent });
	    }

	    addLayer(label) {
	        return this._layout.addLayer(label);
	    }

	    gotoLayer(label) {
	        this._layout.gotoLayer(label);
	    }

	    addGroup(label, options, parent) {
	        return this._layout.addGroup(label, options, parent);
	    }

	    removeGroup(id) {
	        return this._layout.removeGroup(id);
	    }

	    createLayoutFromModel(model, onCompleteCallback) {
	        const layers = model.layers;
	        const scope = this;

	        function addComponents(components, parentModel) {
	            for (const component of components) {
	                scope._layout.addComponent({
	                    object: component.object,
	                    property: component.property,
	                    options: component.options,
	                    parentModel,
	                    type: component.type,
	                    id: component.id,
	                });
	            }
	        }

	        function addGroups(groups, parentModel) {
	            for (const group of groups) {
	                const groupElement = scope._layout.addGroup(group.label, null, parentModel);

	                if (group.components) {
	                    addComponents(group.components, groupElement.model);
	                }

	                if (group.groups) {
	                    addGroups(group.groups, groupElement.model);
	                }
	            }
	        }

	        for (const layer of layers) {
	            const layerElement = this._layout.addLayer(layer.label);
	            if (layer.groups) {
	                addGroups(layer.groups, layerElement.model);
	            }
	        }

	        // if (typeof onCompleteCallback === 'function') {
	        //     onCompleteCallback();
	        // }
	    }

	    isLayoutSidebar() {
	        return !this._isDevtools;
	    }

	    showStats() {}

	    toggleVisibility() {
	        this._layout.toggleVisibility();
	    }

	    triggerChange(data) {
	        if (typeof this._onChangeCallback === 'function') {
	            this._onChangeCallback(data);
	        }
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._messageHandler = this._messageHandler.bind(this);
	    }

	    _setupEventListeners() {
	        window.addEventListener('message', this._messageHandler);
	    }

	    _removeEventListeners() {
	        window.removeEventListener('message', this._messageHandler);
	    }

	    _createLayout() {
	        const type = this._isDevtools ? LAYOUT_TYPE_DEVTOOLS : LAYOUT_TYPE_SIDEBAR;
	        const layout = new Layout({
	            root: this,
	            type,
	            onLayerChange: this._onLayerChangeCallback,
	            minimized: this._isMinimized,
	        });
	        return layout;
	    }

	    _sendLayoutModel() {
	        window.postMessage({
	            source: 'dddd-page',
	            payload: {
	                action: 'setup',
	                layoutModel: LayoutModel$1.serialize(),
	            },
	        });
	    }

	    /**
	     * Handlers
	     */
	    _messageHandler(e) {
	        const source = e.data.source;
	        const payload = e.data.payload;

	        if (source === 'dddd-devtools-proxy' && payload) {
	            switch (payload.action) {
	                case 'init':
	                    this._sendLayoutModel();
	                    break;
	                case 'setup-complete':
	                    // this._layout.remove();
	                    break;
	                case 'change':
	                    LayoutModel$1.updateComponent(payload.modelData);
	                    break;
	            }
	        }

	        if (this._isDevtools && source === 'dddd-page' && payload) {
	            switch (payload.action) {
	                case 'update-objects':
	                    if (payload.models[0]) ;
	                    // this._layout.components.updateObjects(payload.models);
	                    break;
	            }
	        }
	    }
	}

	return DDDD;

})));
