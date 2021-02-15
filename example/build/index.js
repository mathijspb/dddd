
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

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

	        // Elements
	        this.$el = this.__getRootElement();
	        this.$refs = this.__getReferences();
	    }

	    connectedCallback() {
	        this.__triggerConnected();
	    }

	    destroy() {
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
	}

	var styleSidebar = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.dddd {\n    /* Layout */\n    --font: 'Arial', sans-serif;\n    --background-color: #161616;\n\n    /* Panels */\n    --panel-background-color: #1B1B1B;\n    --panel-spacing: 10px;\n\n    /* Groups */\n    --group-header-padding: 13px 13px;\n    --group-header-font-size: 12px;\n    --group-header-background-color: rgba(255, 255, 255, 0.03);\n    --group-padding: 12px 11px 12px 13px;\n    --group-border-radius: 8px;\n\n    /* Components */\n    --component-row-gap: 6px;\n\n    /* Label */\n    --label-width: 35%;\n    --label-padding: 0 20px 0 0;\n    --label-color: rgba(255, 255, 255, 0.5);\n    --label-font-size: 12px;\n    --label-font-weight: 400;\n\n    /* Input */\n    --input-background-color: rgba(255, 255, 255, 0.03);\n    --input-background-color-hover: rgba(255, 255, 255, 0.08);\n    --input-background-color-transition: background-color 0.35s ease-out;\n    --input-highlight-color: rgba(77, 83, 217, 0.64);\n    --input-highlight-color-hover: rgba(77, 83, 217, 1);\n    --input-text-color: rgba(255, 255, 255, 0.75);\n    --input-font-size: 12px;\n    --input-font-weight: 300;\n    --input-border-radius: 6px;\n    --input-padding: 12px;\n    --input-height: 32px;\n\n    position: fixed;\n    top: 0;\n    right: 0;\n\n    width: 300px;\n    height: 100%;\n    max-height: 100vh;\n\n    background: var(--background-color);\n}\n\n.content {\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n}\n\n.resize-handle {\n    position: absolute;\n\n    padding: 0;\n\n    background-color: transparent;\n\n    border: 0;\n    outline: 0;\n}\n\n.resize-handle.side {\n    top: 0;\n    left: 0;\n\n    width: 6px;\n    height: 100%;\n\n    cursor: ew-resize;\n}\n\n.resize-handle.bottom {\n    bottom: 0;\n    left: 0;\n\n    width: 100%;\n    height: 6px;\n\n    cursor: ns-resize;\n}\n\n.resize-handle.corner {\n    bottom: 0;\n    left: 0;\n\n    width: 10px;\n    height: 10px;\n\n    cursor: nesw-resize;\n}\n";

	var styleDevtools = "*,\r\n*:before,\r\n*:after {\r\n    box-sizing: border-box;\r\n}\r\n\r\n.dddd {\r\n    /* Layout */\r\n    --font: 'Arial', sans-serif;\r\n    --background-color: #161616;\r\n\r\n    /* Panels */\r\n    --panel-background-color: #1B1B1B;\r\n    --panel-spacing: 15px;\r\n\r\n    /* Groups */\r\n    --group-header-font-size: 15px;\r\n    --group-header-background-color: rgba(255, 255, 255, 0.03);\r\n    --group-padding: 30px;\r\n    --group-border-radius: 10px;\r\n\r\n    /* Components */\r\n    --component-row-gap: 7px;\r\n\r\n    /* Label */\r\n    --label-width: 30%;\r\n    --label-padding: 0 20px 0 0;\r\n    --label-color: rgba(255, 255, 255, 0.75);\r\n    --label-font-size: 14px;\r\n    --label-font-weight: 400;\r\n    \r\n    /* Input */\r\n    --input-background-color: rgba(255, 255, 255, 0.03);\r\n    --input-background-color-hover: rgba(255, 255, 255, 0.08);\r\n    --input-background-color-transition: background-color 0.35s ease-out;\r\n    --input-highlight-color: rgba(77, 83, 217, 0.64);\r\n    --input-highlight-color-hover: rgba(77, 83, 217, 1);\r\n    --input-text-color: rgba(255, 255, 255, 0.75);\r\n    --input-font-size: 14px;\r\n    --input-font-weight: 300;\r\n    --input-border-radius: 10px;\r\n    --input-padding: 16px;\r\n    --input-height: 40px;\r\n\r\n    background: var(--background-color);\r\n}\r\n";

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
	        this._axis = { x: 0, y: 0 };

	        // Setup
	        this._bindHandlers();
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Getters & Setters
	     */
	    get content() {
	        return this.$refs.content;
	    }

	    /**
	     * Public
	     */
	    show() {
	        this.$el.style.width = `${this._width}px`;
	        if (this._height) {
	            this.$el.style.height = `${this._height}px`;
	        } else {
	            this.$el.style.height = '100%';
	        }
	    }

	    hide() {
	        this._width = this.$el.offsetWidth;
	        this.$el.style.width = 'auto';
	        this.$el.style.height = 'auto';
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

	    _resize(x, y) {
	        if (this._axis.x) {
	            this._width = window.innerWidth - x;
	            this.$el.style.width = `${this._width}px`;
	        }

	        if (this._axis.y) {
	            this._height = y;
	            this.$el.style.height = `${this._height}px`;
	        }

	        this.$root.layout.resize();
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
	            this._resize(e.clientX, e.clientY);
	        }
	    }
	}

	window.customElements.define('dddd-container', Container);

	var styleSidebar$1 = ".navigation {\n    display: none;\n\n    grid-template-columns: 1fr var(--input-height);\n    column-gap: var(--panel-spacing);\n\n    padding: var(--panel-spacing);\n\n    background-color: var(--panel-background-color);\n\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\n}\n\n.select-container {\n    position: relative;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    user-select: none;\n\n    transition: var(--input-background-color-transition);\n}\n\n.select-container:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.select {\n    width: 100%;\n    height: 100%;\n\n    border: 0;\n    outline: 0;\n\n    padding: 0 var(--input-padding);\n\n    background: transparent;\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    appearance: none;\n}\n\n.select option {\n    color: black;\n}\n\n.arrow {\n    position: absolute;\n    top: 0;\n    right: var(--input-padding);\n    bottom: 0;\n\n    margin: auto 0;\n}\n\n.button-toggle {\n    position: relative;\n\n    width: var(--input-height);\n    height: var(--input-height);\n\n    background-color: var(--input-background-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: 0;\n\n    cursor: pointer;\n\n    transition: var(--input-background-color-transition);\n}\n\n.button-toggle:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.button-toggle__line {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n\n    width: 12px;\n    height: 2px;\n\n    margin: auto;\n\n    background: var(--input-text-color);\n}\n";

	var styleDevtools$1 = ".navigation {\r\n    display: none;\r\n    \r\n    padding: var(--panel-spacing);\r\n\r\n    font-size: 0;\r\n\r\n    list-style: none;\r\n\r\n    background-color: var(--panel-background-color);\r\n\r\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n.navigation li {\r\n    display: inline-block;\r\n\r\n    margin-right: 10px;\r\n}\r\n\r\n.navigation-button {\r\n    padding: 13px 30px;\r\n\r\n    color: rgba(255, 255, 255, 0.5);\r\n\r\n    background-color: transparent;\r\n\r\n    border: 0;\r\n    border-radius: 12px;\r\n    outline: 0;\r\n\r\n    font-family: var(--font);\r\n    font-size: 13px;\r\n    font-weight: 600;\r\n\r\n    cursor: pointer;\r\n\r\n    transition: all 0.3s ease-out;\r\n}\r\n\r\n.navigation-button:hover {\r\n    background-color: rgba(255, 255, 255, 0.01);\r\n}\r\n\r\n.navigation-button.active {\r\n    color: rgba(255, 255, 255, 0.9);\r\n\r\n    background-color: rgba(255, 255, 255, 0.03);\r\n}";

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
	    add(label, options) {
	        if (this._elements.length === 0) {
	            this._show();
	        }

	        if (this.$root.isLayoutSidebar()) {
	            const option = document.createElement('option');
	            option.innerText = label;
	            option.value = this._elements.length;
	            this._elements.push(option);
	            this.$refs.select.appendChild(option);
	        } else {
	            const button = document.createElement('button');
	            button.classList.add(NAVIGATION_BUTTON_CLASS);
	            if (this.$el.children.length === this._activeIndex) {
	                button.classList.add(ACTIVE_CLASS);
	            }
	            button.innerText = label;

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
	        this.$refs.selectContainer.style.display = 'block';
	        this.$el.style.display = 'grid';
	    }

	    hide() {
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

	    _show() {
	        this.$el.style.display = 'grid';
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
	    }

	    _clickButtonToggle() {
	        this.$root.layout.toggleVisibility();
	    }
	}

	window.customElements.define('dddd-navigation', Navigation);

	var style = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.layer {\n    display: none;\n\n    position: relative;\n\n    width: 100%;\n    overflow: hidden;\n}\n\n.layer.active {\n    display: block;\n}\n";

	var template = "<div class=\"layer\"></div>";

	// Base class

	// Constants
	const ACTIVE_CLASS$1 = 'active';
	const GROUP_MIN_WIDTH = 350;

	class Layer extends LayoutElement {
	    constructor({ root, label }) {
	        super({ root, style, template, templateData: { label } });

	        // Props
	        this._label = label;

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
	        return this._label;
	    }

	    /**
	     * Public
	     */
	    addGroup(label) {
	        return this.$root.addGroup(label, {
	            container: this._label,
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

	var style$1 = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.layers {\n    position: relative;\n\n    width: 100%;\n\n    /* padding: var(--panel-spacing) var(--panel-spacing) 0 var(--panel-spacing); */\n    padding: var(--panel-spacing);\n\n    -webkit-font-smoothing: antialiased;\n    font-family: var(--font);\n    font-weight: 300;\n    font-size: 13px;\n}\n";

	var template$1 = "<div class=\"layers\"></div>";

	// Base class

	class Layers extends LayoutElement {
	    constructor({ root }) {
	        super({ root, style: style$1, template: template$1 });

	        // Options
	        this._activeIndex = 0;
	        this._layers = [];
	    }

	    /**
	     * Public
	     */
	    add(label) {
	        const layer = new Layer({ root: this.$root, label });
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
	            if (layer.label === container) return layer.element;
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

	    /**
	     * Private
	     */
	    _resizeLayers() {
	        for (const layer of this._layers) {
	            layer.resize();
	        }
	    }
	}

	window.customElements.define('dddd-layers', Layers);

	var styleSidebar$2 = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.group {\n    overflow: hidden;\n\n    /* margin: 0 var(--panel-spacing) var(--panel-spacing) 0; */\n\n    background-color: var(--panel-background-color);\n\n    border-radius: var(--group-border-radius);\n\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\n}\n\n.button-header {\n    position: relative;\n\n    width: 100%;\n\n    padding: 0;\n\n    text-align: left;\n\n    background-color: var(--group-header-background-color);\n\n    border: 0;\n    outline: 0;\n    cursor: pointer;\n}\n\n.label {\n    display: block;\n\n    padding: var(--group-header-padding);\n\n    font-size: var(--group-header-font-size);\n    font-weight: 400;\n    color: white;\n    letter-spacing: 0.025em;\n}\n\n.arrow {\n    position: absolute;\n    top: 0;\n    right: calc(var(--panel-spacing) + 7px);\n    bottom: 0;\n\n    margin: auto 0;\n}\n\n.content {\n    display: grid;\n    position: relative;\n\n    row-gap: var(--component-row-gap);\n\n    padding: var(--group-padding);\n}\n\n.hidden .content {\n    display: none\n}\n\n/* Subgroup */\n.group.subgroup {\n    padding: 8px 0 0 0;\n\n    border-radius: 0;\n\n    box-shadow: initial;\n}\n\n.subgroup .button-header {\n    margin-bottom: 0;\n\n    background: transparent;\n}\n\n.subgroup .label {\n    padding: 0 0 0 21px;\n\n    font-size: 11px;\n}\n\n.subgroup .arrow {\n    position: absolute;\n    top: 3px;\n    right: 0;\n    bottom: 0;\n    left: 2px;\n\n    width: 10px;\n\n    margin: 0;\n}\n\n.hidden.subgroup .arrow {\n    transform: rotate(-90deg);\n}\n\n.subgroup .content {\n    margin: 10px 0 5px 0;\n    padding: 0 0 0 19px;\n}\n\n.subgroup .content:before {\n    content: '';\n\n    display: block;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 6px;\n\n    width: 1px;\n    height: 100%;\n\n    background: rgba(255, 255, 255, 0.1);\n}\n";

	var styleDevtools$2 = "*,\r\n*:before,\r\n*:after {\r\n    box-sizing: border-box;\r\n}\r\n\r\n.group {\r\n    padding: calc(var(--group-padding) - 3px) var(--group-padding) var(--group-padding);\r\n    margin: 0 var(--panel-spacing) var(--panel-spacing) 0;\r\n\r\n    background-color: var(--panel-background-color);\r\n    \r\n    border-radius: var(--group-border-radius);\r\n\r\n    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n.label {\r\n    display: block;\r\n\r\n    margin-bottom: 20px;\r\n\r\n    font-size: var(--group-header-font-size);\r\n    font-weight: 600;\r\n    color: white;\r\n    letter-spacing: 0.025em;\r\n}\r\n\r\n.content {\r\n    display: grid;\r\n\r\n    row-gap: var(--component-row-gap);\r\n}";

	var templateSidebar$2 = "<div class=\"group active\">\n\n    <!-- Button header -->\n    <button class=\"button-header\" ref=\"buttonHeader\">\n\n        <!-- Label -->\n        <span class=\"label\">\n            {{ label }}\n        </span>\n\n        <!-- Arrow -->\n        <svg width=\"11\" height=\"6\" viewBox=\"0 0 11 6\" class=\"arrow\">\n            <path d=\"M1 1L4.83564 4.40945C5.21452 4.74624 5.78548 4.74624 6.16436 4.40945L10 1\" stroke=\"white\" fill=\"transparent\" stroke-opacity=\"0.74\" stroke-linecap=\"round\"/>\n        </svg>\n\n    </button>\n\n    <!-- Content -->\n    <div class=\"content\" ref=\"content\"></div>\n\n</div>\n";

	var templateDevtools$2 = "<div class=\"group\">\n\n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Content -->\n    <div class=\"content\" ref=\"content\"></div>\n\n</div>\n";

	// Base class

	class Group extends LayoutElement {
	    constructor({ root, label, options }) {
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
	                label,
	            },
	        });

	        // Props
	        this._label = label;
	        this._options = options;
	        this._parent = options.parent;

	        // Data
	        this._isContentVisible = true;

	        // Setup
	        this._bindHandlers();
	        this._setupEventListeners();
	        this._addSubgroupClass();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Getters & Setters
	     */
	    get label() {
	        return this._label;
	    }

	    get content() {
	        return this.$refs.content;
	    }

	    get parent() {
	        return this._parent;
	    }

	    /**
	     * Public
	     */
	    add(object, property, options = {}) {
	        options.container = this;
	        return this.$root.add(object, property, options);
	    }

	    addButton(options) {
	        options.container = this;
	        return this.$root.addButton(options);
	    }

	    addGroup(label) {
	        return this.$root.addGroup(label, {
	            container: this._label,
	            parent: this,
	        });
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

	    _addSubgroupClass() {
	        if (this.parent) this.$el.classList.add('subgroup');
	    }

	    _toggleContent() {
	        this._isContentVisible = !this._isContentVisible;
	        if (this._isContentVisible) {
	            this.$el.classList.remove('hidden');
	        } else {
	            this.$el.classList.add('hidden');
	        }
	        // this.$refs.content.style.display = this._isContentVisible ? 'grid' : 'none';
	    }

	    /**
	     * Handlers
	     */
	    _clickHandler() {
	        this._toggleContent();
	    }
	}

	window.customElements.define('dddd-group', Group);

	class LayoutModel {
	    constructor() {
	        this._layers = [];
	        this._groups = [];
	        this._components = [];
	    }

	    /**
	     * Public
	     */
	    addLayer(label) {
	        this._layers.push(label);
	    }

	    addGroup(label, options = {}) {
	        this._groups.push({ label, options });
	    }

	    addComponent(model) {
	        this._components.push(model);
	    }

	    get() {
	        const structure = {
	            layers: this._layers,
	            groups: this._groups,
	            components: this._getComponents(),
	        };
	        return structure;
	    }

	    /**
	     * Private
	     */
	    _getComponents() {
	        const components = [];
	        for (const model of this._components) {
	            components.push(model.getData());
	        }
	        return components;
	    }
	}

	var LayoutModel$1 = new LayoutModel();

	// Vendor

	class Component extends HTMLElement {
	    constructor({ root, model, style, template }) {
	        super();

	        // Props
	        this.__root = root;
	        this.__model = model;

	        // Attach
	        this.attachShadow({ mode: 'open' });

	        // Setup
	        this.$el = this.__addTemplate(template);
	        this.$refs = this.__getReferences(this.$el);
	        this.__addStyle(style);
	        this.__addLockedClass();
	        this.__bindHandlers();
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

	    get model() {
	        return this.__model;
	    }

	    get container() {
	        return this.__model.options.container;
	    }

	    /**
	     * Public
	     */
	    tick() {
	        this.__triggerTick();
	        if (this.model.options.listen) {
	            this.model.updateValueFromObject(); // !this.__root.isDevtools
	            this.__triggerOnListen();
	        }
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

	var style$2 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    position: relative;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    user-select: none;\n\n    transition: var(--input-background-color-transition);\n\n    cursor: col-resize;\n}\n\n.input-container:hover,\n.input-container.active {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.scrubber {\n    position: absolute;\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n\n    background: var(--input-highlight-color);\n\n    transform-origin: top left;\n}\n\n.input {\n    position: relative;\n    display: block;\n\n    width: 100%;\n    height: 100%;\n\n    padding: 0 var(--input-padding);\n\n    background-color: transparent;\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    line-height: var(--input-height);\n    color: var(--input-text-color);\n\n    outline: none;\n    border: 0;\n\n    pointer-events: none;\n}\n";

	var template$2 = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input container -->\r\n    <div class=\"input-container\" ref=\"inputContainer\">\r\n\r\n        <!-- Scrubber -->\r\n        <div class=\"scrubber\" ref=\"scrubber\"></div>\r\n        \r\n        <!-- Input -->\r\n        <input class=\"input\" ref=\"input\">\r\n\r\n    </div>\r\n\r\n</div>";

	// Base component

	// Constants
	const ACTIVE_CLASS$2 = 'active';
	const PRECISION_MODIFIER = 0.3;

	// TODO: On change is triggered twice
	class Slider extends Component {
	    constructor(root, model) {
	        super({ root, style: style$2, template: template$2, model });

	        // Data
	        this._scrubberOffset = 0;
	        this._inputContainer = { x: 0, width: 0 };
	        this._scrubber = { width: 0 };
	        this._mouseStartPosition = { x: 0, y: 0 };
	        this._mousePosition = { x: 0, y: 0 };
	        this._inputContainerWidth = null;
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
	        this._inputContainerMouseDownHandler = this._inputContainerMouseDownHandler.bind(this);
	        this._inputContainerMouseUpHandler = this._inputContainerMouseUpHandler.bind(this);
	        this._inputContainerDoubleClickHandler = this._inputContainerDoubleClickHandler.bind(this);
	        this._inputChangeHandler = this._inputChangeHandler.bind(this);
	        this._inputBlurHandler = this._inputBlurHandler.bind(this);
	        this._windowKeyDownHandler = this._windowKeyDownHandler.bind(this);
	        this._windowKeyUpHandler = this._windowKeyUpHandler.bind(this);
	    }

	    _setupEventListeners() {
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
	    }

	    _calcValue(mouseX) {
	        const modifier = this._isShiftDown ? PRECISION_MODIFIER : 1;
	        const delta = (mouseX - this._mouseStartPosition.x) * modifier;
	        const x = this._mouseStartPosition.x - this._inputContainer.x + delta;
	        const percentage = (x / this._inputContainerWidth);
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
	        this._inputContainerWidth = this._inputContainer.width;
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

	var style$3 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n\n    transition: background-color 0.15s;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input {\n    height: var(--input-height);\n\n    padding: 0 var(--input-padding);\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    background-color: var(--input-background-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: none;\n\n    transition: var(--input-background-color-transition);\n}\n\n.input:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n";

	var template$3 = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input -->\r\n    <input class=\"input\" ref=\"input\">\r\n\r\n</div>";

	class Text extends Component {
	    constructor(root, model) {
	        super({ root, style: style$3, template: template$3, model });

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

	var style$4 = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: start;\n\n    transition: background-color 0.15s;\n}\n\n.label {\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    line-height: var(--input-height);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input {\n    width: 100%;\n    height: var(--input-height);\n\n    padding: 0 var(--input-padding);\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    background-color: var(--input-background-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: none;\n\n    transition: var(--input-background-color-transition);\n\n    cursor: ew-resize;\n}\n\n.input:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n";

	var template$4 = "<div class=\"component\">\n\n    <!-- Label -->\n    <span class=\"label\">{{ label }}</span>\n\n    <!-- Input -->\n    <input class=\"input\" ref=\"input\">\n\n</div>\n";

	// Base component

	// Constants
	const DEFAULT_STEP_SIZE = 0.01;

	class Number extends Component {
	    constructor(root, model) {
	        super({ root, style: style$4, template: template$4, model });

	        // Options
	        this._stepSize = this.model.options.stepSize || DEFAULT_STEP_SIZE;
	        this._decimalPlaces = this._getDecimalPlaces(this._stepSize);

	        // Data
	        this._activeInput = null;
	        this._isPointerLockActive = false;
	        this._mouseCurrentPositionX = 0;

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
	        this._mouseDownHandler = this._mouseDownHandler.bind(this);
	        this._mouseUpHandler = this._mouseUpHandler.bind(this);
	        this._changeHandler = this._changeHandler.bind(this);
	        this._pointerLockHanderHandler = this._pointerLockHanderHandler.bind(this);
	        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$refs.input.addEventListener('mousedown', this._mouseDownHandler);
	        this.$refs.input.addEventListener('mouseup', this._mouseUpHandler);
	        this.$refs.input.addEventListener('change', this._changeHandler);
	        document.addEventListener('pointerlockchange', this._pointerLockHanderHandler);
	        document.addEventListener('mousemove', this._mouseMoveHandler);
	    }

	    _removeEventListeners() {
	        this.$refs.input.removeEventListener('mousedown', this._mouseDownHandler);
	        this.$refs.input.removeEventListener('mouseup', this._mouseUpHandler);
	        this.$refs.input.removeEventListener('change', this._changeHandler);
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
	    _mouseDownHandler(e) {
	        this.$refs.input.requestPointerLock();
	        this._isPointerLockActive = true;
	        this._mouseCurrentPositionX = e.clientX;
	    }

	    _mouseUpHandler() {
	        document.exitPointerLock();
	    }

	    _changeHandler() {
	        this._updateModelValue(this.$refs.input.value);
	    }

	    _pointerLockHanderHandler() {
	        if (document.pointerLockElement) ; else {
	            this._isPointerLockActive = false;
	        }
	    }

	    _mouseMoveHandler(e) {
	        if (!this._isPointerLockActive) return;

	        const delta = e.movementX;
	        if (Math.abs(delta) > 10) return; // NOTE: Prevents bug in chrome where movementX spikes to high value

	        const value = this._getInputValueBasedOnMouseMovement(delta);
	        this._mouseCurrentPositionX = e.clientX;
	        this._updateInputValue(value);
	        this._updateModelValue(value);
	    }
	}

	window.customElements.define('dddd-number', Number);

	var style$5 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: start;\n}\n\n.label {\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    line-height: var(--input-height);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.image-container {\n    position: relative;\n\n    width: 100%;\n    aspect-ratio: 16 / 9;\n\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    transition: var(--input-background-color-transition);\n}\n\n.image-container:hover,\n.image-container.drop-area {\n    background-color: var(--input-background-color-hover);\n}\n\n.image-container img {\n    object-fit: cover;\n\n    width: 100%;\n    height: 100%;\n}\n\n.locked .image-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.file-input {\n    position: absolute;\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n\n    border: 0;\n    outline: none;\n\n    cursor: pointer;\n}\n\n.file-input::-webkit-file-upload-button {\n    visibility: hidden;\n}\n\n.file-input::before {\n    content: '';\n\n    display: block;\n\n    width: 100%;\n    height: 100%;\n}\n";

	var template$5 = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Image -->\r\n    <div class=\"image-container\" ref=\"imageContainer\">\r\n\r\n        <!-- File input -->\r\n        <input type=\"file\" ref=\"fileInput\" class=\"file-input\" accept=\".jpg,.png,.gif\">\r\n\r\n    </div>\r\n\r\n</div>";

	// Base class

	// Constants
	const CLASS_DROP_AREA = 'drop-area';

	class ImageComponent extends Component {
	    constructor(root, model) {
	        super({ root, style: style$5, template: template$5, model });

	        // Data
	        this._previewImage = null;

	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        this._addPreviewImage(this.model.value);
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
	        this._previewImage = document.createElement('img');
	        this._previewImage.src = image;
	        this.$refs.imageContainer.appendChild(this._previewImage);
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
	        this.model.value = image;
	        this._removePreviewImage();
	        this._addPreviewImage(image);
	    }

	    _fileInputChangeHandler(e) {
	        const file = this.$refs.fileInput.files[0];
	        this._handleFile(file);
	    }
	}

	window.customElements.define('dddd-image', ImageComponent);

	var style$6 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    position: relative;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    user-select: none;\n\n    transition: var(--input-background-color-transition);\n}\n\n.input-container:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.select {\n    width: 100%;\n    height: 100%;\n\n    border: 0;\n    outline: 0;\n\n    padding: 0 var(--input-padding);\n\n    background: transparent;\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    appearance: none;\n}\n\n.select option {\n    color: black;\n}\n\n.arrow {\n    position: absolute;\n    top: 0;\n    right: var(--input-padding);\n    bottom: 0;\n\n    margin: auto 0;\n}\n";

	var template$6 = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input container  -->\r\n    <div class=\"input-container\">\r\n\r\n        <!-- Arrow -->\r\n        <svg width=\"11\" height=\"6\" viewBox=\"0 0 11 6\" class=\"arrow\">\r\n            <path d=\"M1 1L4.83564 4.40945C5.21452 4.74624 5.78548 4.74624 6.16436 4.40945L10 1\" stroke=\"white\" fill=\"transparent\" stroke-opacity=\"0.74\" stroke-linecap=\"round\"/>\r\n        </svg>\r\n        \r\n        <!-- Select -->\r\n        <select class=\"select\" ref=\"select\"></select>\r\n\r\n    </div>\r\n\r\n</div>";

	class Dropdown extends Component {
	    constructor(root, model) {
	        super({ root, style: style$6, template: template$6, model });

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
	        this._selectChangeHandler = this._selectChangeHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$refs.select.addEventListener('change', this._selectChangeHandler);
	    }

	    _removeEventListeners() {
	        this.$refs.select.removeEventListener('change', this._selectChangeHandler);
	    }

	    _addOptions() {
	        const options = this.model.options.options;
	        for (let i = 0, len = options.length; i < len; i++) {
	            const item = options[i];
	            const element = document.createElement('option');
	            element.value = item;
	            element.textContent = item;
	            element.selected = item === this._value;
	            this.$refs.select.appendChild(element);
	        }
	    }

	    _updateSelectValue(value) {
	        this.$refs.select.value = value; // TODO: Fix precision;
	    }

	    /**
	     * Handlers
	     */
	    _selectChangeHandler() {
	        this.model.value = this.$refs.select.value;
	    }
	}

	window.customElements.define('dddd-dropdown', Dropdown);

	var style$7 = ".component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: center;\n}\n\n.label {\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    position: relative;\n\n    height: var(--input-height);\n    overflow: hidden;\n\n    background-color: var(--input-background-color);\n\n    border-radius: var(--input-border-radius);\n\n    user-select: none;\n\n    transition: var(--input-background-color-transition);\n}\n\n.input-container:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n.locked .input-container {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n\n.checkbox {\n    appearance: none;\n\n    display: block;\n    position: relative;\n\n    width: 100%;\n    height: 100%;\n\n    margin: 0;\n    padding: 0 var(--input-padding);\n\n    outline: none;\n\n    cursor: pointer;\n}\n\n.checkbox:after {\n    content: '';\n\n    display: block;\n    box-sizing: border-box;\n\n    position: absolute;\n    top: 0;\n    bottom: 0;\n\n    width: 17px;\n    height: 17px;\n\n    margin: auto 0 ;\n\n    border-radius: 50%;\n    border: 2px solid var(--input-highlight-color);\n}\n\n.checkbox:checked:after {\n    background: var(--input-highlight-color);\n\n    border: 0;\n}\n";

	var template$7 = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input container  -->\r\n    <div class=\"input-container\">\r\n\r\n        <!-- Checkbox -->\r\n        <input type=\"checkbox\" class=\"checkbox\" ref=\"checkbox\">\r\n\r\n    </div>\r\n\r\n</div>";

	// Base component

	class Checkbox extends Component {
	    constructor(root, model) {
	        super({ root, style: style$7, template: template$7, model });

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

	var style$8 = ".component {\r\n    transition: background-color 0.15s;\r\n}\r\n\r\n.button {\r\n    width: calc(100% - var(--label-width));\r\n    height: var(--input-height);\r\n\r\n    padding: 0 var(--input-padding);\r\n    margin-left: var(--label-width);\r\n\r\n    font-family: var(--font);\r\n    font-size: var(--input-font-size);\r\n    font-weight: var(--input-font-weight);\r\n    color: var(--input-text-color);\r\n    \r\n    background-color: var(--input-highlight-color);\r\n\r\n    border: 0;\r\n    border-radius: var(--input-border-radius);\r\n    outline: none;\r\n\r\n    transition: var(--input-background-color-transition);\r\n\r\n    cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n    background-color: rgba(77, 83, 217, 1);\r\n    background-color: var(--input-highlight-color-hover);\r\n}";

	var template$8 = "<div class=\"component\">\r\n    \r\n    <!-- Button -->\r\n    <button class=\"button\" ref=\"button\">{{ label }}</button>\r\n\r\n</div>";

	// Base component

	class Button extends Component {
	    constructor(root, model) {
	        super({ root, style: style$8, template: template$8, model });

	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
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

	var style$9 = ".component {\r\n    display: grid;\r\n\r\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\r\n    align-items: center;\r\n}\r\n\r\n.label {\r\n    overflow: hidden;\r\n\r\n    padding: var(--label-padding);\r\n\r\n    font-size: var(--label-font-size);\r\n    font-weight: var(--label-font-weight);\r\n    color: var(--label-color);\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.input-container {\r\n    display: grid;\r\n    position: relative;\r\n\r\n    grid-template-columns: 45px calc(50% - 50px) 50%;\r\n    align-items: center;\r\n\r\n    height: var(--input-height);\r\n    overflow: hidden;\r\n\r\n    padding: 0 var(--input-padding) 0 5px;\r\n\r\n    font-family: var(--font);\r\n    font-size: var(--input-font-size);\r\n    font-weight: var(--input-font-weight);\r\n\r\n    background-color: var(--input-background-color);\r\n\r\n    border-radius: var(--input-border-radius);\r\n\r\n    transition: var(--input-background-color-transition);\r\n}\r\n\r\n.input-container:hover {\r\n    background-color: var(--input-background-color-hover);\r\n}\r\n\r\n.color {\r\n    width: 30px;\r\n    height: 30px;\r\n\r\n    margin: 0;\r\n    padding: 0;\r\n\r\n    background: transparent;\r\n\r\n    border: 0;\r\n    outline: 0;\r\n\r\n    appearance: none;\r\n    cursor: pointer;\r\n}\r\n\r\n.color::-webkit-color-swatch-wrapper {\r\n    padding: 0;\r\n}\r\n\r\n.color::-webkit-color-swatch {\r\n    border: none;\r\n    border-radius: 7px;\r\n}\r\n\r\n.color-code {\r\n    color: var(--input-text-color);\r\n}\r\n\r\n.alpha {\r\n    color: var(--input-text-color);\r\n    text-align: right;\r\n}";

	var template$9 = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input container  -->\r\n    <div class=\"input-container\">\r\n\r\n        <!-- Color -->\r\n        <input type=\"color\" class=\"color\" ref=\"color\">\r\n\r\n        <!-- Color code -->\r\n        <span class=\"color-code\" ref=\"colorCode\"></span>\r\n\r\n        <!-- Alpha -->\r\n        <span class=\"alpha\">100%</span>\r\n\r\n    </div>\r\n\r\n</div>";

	// Base component

	class Color extends Component {
	    constructor(root, model) {
	        super({ root, style: style$9, template: template$9, model });

	        // Setup
	        this._bindHandlers();
	    }

	    connected() {
	        this._setStartColor();
	        this._setColorCodeValue(this.model.value);
	        this._setupEventListeners();
	    }

	    destroyed() {
	        this._removeEventListeners();
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._inputChangeHandler = this._inputChangeHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$refs.color.addEventListener('input', this._inputChangeHandler);
	    }

	    _removeEventListeners() {
	        this.$refs.color.removeEventListener('input', this._inputChangeHandler);
	    }

	    _setStartColor() {
	        this.$refs.color.value = this.model.value;
	    }

	    _setColorCodeValue(value) {
	        this.$refs.colorCode.innerText = value;
	    }

	    /**
	     * Handlers
	     */
	    _inputChangeHandler(e) {
	        const value = this.$refs.color.value;
	        this.model.value = value;
	        this._setColorCodeValue(value);
	    }
	}

	window.customElements.define('dddd-color', Color);

	var style$a = "*,\n*:before,\n*:after {\n    box-sizing: border-box;\n}\n\n.component {\n    display: grid;\n\n    grid-template-columns: var(--label-width) calc(100% - var(--label-width));\n    align-items: start;\n\n    transition: background-color 0.15s;\n}\n\n.label {\n    height: var(--input-height);\n    overflow: hidden;\n\n    padding: var(--label-padding);\n\n    font-size: var(--label-font-size);\n    line-height: var(--input-height);\n    font-weight: var(--label-font-weight);\n    color: var(--label-color);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.input-container {\n    display: grid;\n\n    grid-template-columns: repeat(3, 1fr);\n    gap: var(--component-row-gap);\n}\n\n.input {\n    width: 100%;\n    height: var(--input-height);\n\n    padding: 0 var(--input-padding);\n\n    font-family: var(--font);\n    font-size: var(--input-font-size);\n    font-weight: var(--input-font-weight);\n    color: var(--input-text-color);\n\n    background-color: var(--input-background-color);\n\n    border: 0;\n    border-radius: var(--input-border-radius);\n    outline: none;\n\n    transition: var(--input-background-color-transition);\n\n    cursor: ew-resize;\n}\n\n.input:hover {\n    background-color: var(--input-background-color-hover);\n}\n\n\n.locked .input {\n    opacity: 0.6;\n\n    pointer-events: none;\n}\n";

	var template$a = "<div class=\"component\">\r\n    \r\n    <!-- Label -->\r\n    <span class=\"label\">{{ label }}</span>\r\n\r\n    <!-- Input container -->\r\n    <div class=\"input-container\" ref=\"inputContainer\"></div>\r\n\r\n</div>";

	// Base component

	// Constants
	const DEFAULT_STEP_SIZE$1 = 0.01;

	class MultiInput extends Component {
	    constructor(root, model) {
	        super({ root, style: style$a, template: template$a, model });

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
	        this._mouseDownHandler = this._mouseDownHandler.bind(this);
	        this._mouseUpHandler = this._mouseUpHandler.bind(this);
	        this._changeHandler = this._changeHandler.bind(this);
	        this._pointerLockHanderHandler = this._pointerLockHanderHandler.bind(this);
	        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this.$el.addEventListener('mousedown', this._mouseDownHandler);
	        this.$el.addEventListener('mouseup', this._mouseUpHandler);
	        this.$el.addEventListener('change', this._changeHandler);
	        document.addEventListener('pointerlockchange', this._pointerLockHanderHandler);
	        document.addEventListener('mousemove', this._mouseMoveHandler);
	    }

	    _removeEventListeners() {
	        this.$el.removeEventListener('mousedown', this._mouseDownHandler);
	        this.$el.removeEventListener('mouseup', this._mouseUpHandler);
	        this.$el.removeEventListener('change', this._changeHandler);
	        document.removeEventListener('pointerlockchange', this._pointerLockHanderHandler);
	        document.removeEventListener('mousemove', this._mouseMoveHandler);
	    }

	    _createInputs() {
	        for (const key in this.model.value) {
	            const input = document.createElement('input');
	            input.classList.add('input');
	            input.value = this.model.value[key];
	            this._inputs.push(input);
	            this.$refs.inputContainer.appendChild(input);
	        }
	    }

	    _updateModelValue() {
	        const value = {};
	        for (const [index, [key]] of Object.entries(Object.entries(this.model.value))) {
	            value[key] = parseInt(this._inputs[index].value);
	        }
	        this.model.value = value;
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

	        const delta = e.movementX;
	        if (Math.abs(delta) > 10) return; // NOTE: Prevents bug in chrome where movementX spikes to high value

	        const value = this._getInputValueBasedOnMouseMovement(delta);
	        this._updateInputValue(value);
	        this._updateModelValue();
	    }
	}

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
	    multiInput: MultiInput,
	};

	class Components {
	    constructor({ root, layout }) {
	        // Props
	        this._root = root;

	        // Data
	        this._components = [];

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
	    create(model) {
	        LayoutModel$1.addComponent(model);
	        const type = model.type;
	        const componentClass = componentTypes[type];
	        const component = new componentClass(this._root, model);
	        this._components.push(component);
	        this._addComponentToContainer(component);
	        return component;
	    }

	    remove(component) {
	        const container = this._root.layout.getContainer(component.container);
	        container.removeChild(component);
	        component.destroy();
	    }

	    update(modelData) {
	        const component = this._getById(modelData.id);
	        component.model.value = modelData.value;
	    }

	    updateObjects(models) {
	        let model;
	        let component;
	        for (let i = 0, len = models.length; i < len; i++) {
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
	    _bindHandlers() {
	        this._tick = this._tick.bind(this);
	    }

	    _setupEventListeners() {
	        this._requestAnimationFrame = window.requestAnimationFrame(this._tick);
	    }

	    _removeEventListeners() {
	        window.cancelAnimationFrame(this._requestAnimationFrame);
	    }

	    _addComponentToContainer(component) {
	        const container = component.model.options.container;
	        const element = this._root.layout.getContainer(container);
	        element.appendChild(component);
	        this._root.layout.resize();
	    }

	    _getById(id) {
	        for (const component of this._components) {
	            if (component.model.id === id) {
	                return component;
	            }
	        }
	    }

	    /**
	     * Tick
	     */
	    _tick() {
	        window.requestAnimationFrame(this._tick);
	        this._tickComponents();
	        // this._sendModelsToDevtools();
	    }

	    _tickComponents() {
	        for (let i = 0, len = this._components.length; i < len; i++) {
	            this._components[i].tick();
	        }
	    }

	    _sendModelsToDevtools() {
	        const models = [];
	        for (let i = 0, len = this._components.length; i < len; i++) {
	            models.push(this._components[i].model.getData());
	        }

	        window.postMessage({
	            source: 'dddd-page',
	            payload: {
	                action: 'update-objects',
	                models,
	            },
	        });
	    }
	}

	class ComponentModel {
	    constructor({ root, object, property, options, id, type, value, onChangeCallback }) {
	        // Props
	        this._root = root;
	        this._object = object || {};
	        this._property = property;
	        this._options = options || {};
	        this._id = id || this._generateId();
	        this._type = type || this._detectType();
	        this._value = value || this._object[this._property];
	        this._onChangeCallback = onChangeCallback;

	        // TODO: Refactor
	        if (this._options.container instanceof Group) {
	            this._options.container = this._options.container.label;
	        }
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

	        // TODO: Refactor function name
	        if (this._root.isDevtools && typeof this._onChangeCallback === 'function') {
	            this._onChangeCallback(this.getData());
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
	    getData() {
	        return {
	            object: this._object,
	            property: this._property,
	            options: this._removeFunctions(this._options),
	            id: this._id,
	            type: this._type,
	            value: this._value,
	        };
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

	        // Image
	        if (this._options.type === 'image') {
	            return 'image';
	        }

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

	        // MultiInput
	        if (typeof value === 'object') {
	            return 'multiInput';
	        }

	        // Checkbox
	        if (typeof value === 'boolean') {
	            return 'checkbox';
	        }

	        // Color
	        if (/^#[0-9A-F]{6}$/i.test(value)) {
	            return 'color';
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

	class Layout {
	    constructor({ root, onLayerChange }) {
	        // Props
	        this._root = root;
	        this._onLayerChangeCallback = onLayerChange;

	        this._container = this._createContainer();
	        this._navigation = this._createNavigation();
	        this._layers = this._createLayers();
	        this._components = this._createComponents();

	        this._isVisible = true;

	        this._groups = {};

	        this._bindHandlers();
	        this._setupEventListeners();
	    }

	    destroy() {
	        // TODO: Quick and dirty
	        document.body.removeChild(this._container);

	        this._removeEventListeners();
	    }

	    /**
	     * Getters & Setters
	     */
	    get components() {
	        return this._components;
	    }

	    /**
	     * Public
	     */
	    addLayer(label) {
	        this._navigation.add(label);
	        const layer = this._layers.add(label);
	        this._layers.resize();
	        LayoutModel$1.addLayer(label);
	        return layer;
	    }

	    gotoLayer(label) {
	        const index = this._layers.getIndexByLabel(label);
	        this._navigation.goto(index);
	        this._layers.goto(index);
	    }

	    addGroup(label, options = {}) {
	        const group = new Group({ root: this._root, layout: this, label, options });
	        const container = this.getContainer(options.container);
	        container.appendChild(group);
	        this._groups[label] = group;
	        this._layers.resize();
	        LayoutModel$1.addGroup(label, options);
	        return group;
	    }

	    addComponent({ object, property, options, id, type, onChangeCallback }) {
	        const model = new ComponentModel({ root: this._root, object, property, options, id, type, onChangeCallback });
	        const component = this._components.create(model);
	        return component;
	    }

	    getLayer(label) {
	        return this._layers.get(label);
	    }

	    getContainer(label) {
	        const layer = this._layers.get(label);
	        if (layer) return layer;

	        const group = this._groups[label];
	        if (group) return group.content;
	    }

	    remove() {
	        document.body.removeChild(this._container);
	    }

	    resize() {
	        this._layers.resize();
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
	    }

	    /**
	     * Private
	     */
	    _bindHandlers() {
	        this._navigationSwitchHandler = this._navigationSwitchHandler.bind(this);
	    }

	    _setupEventListeners() {
	        this._navigation.addEventListener('switch', this._navigationSwitchHandler);
	    }

	    _removeEventListeners() {
	        this._navigation.addEventListener('switch', this._navigationSwitchHandler);
	    }

	    _createContainer() {
	        const container = new Container({
	            root: this._root,
	        });
	        document.body.appendChild(container);
	        return container;
	    }

	    _createNavigation() {
	        const navigation = new Navigation({
	            root: this._root,
	        });
	        this._container.content.appendChild(navigation);
	        return navigation;
	    }

	    _createLayers() {
	        const layers = new Layers({
	            root: this._root,
	        });
	        this._container.content.appendChild(layers);
	        return layers;
	    }

	    _createComponents() {
	        const componenents = new Components({
	            root: this._root,
	            layout: this,
	        });
	        return componenents;
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

	    /**
	     * Handlers
	     */
	    _navigationSwitchHandler(e) {
	        this._layers.goto(e.detail.index);
	        if (typeof this._onLayerChangeCallback === 'function') {
	            const label = this._layers.getByIndex(e.detail.index).label;
	            this._onLayerChangeCallback(label);
	        }
	    }
	}

	// Layout

	class DDDD {
	    constructor({ devtools, onChange, onLayerChange } = {}) {
	        // Props
	        this._isDevtools = devtools;
	        this._onChangeCallback = onChange;

	        // Setup
	        this._layout = new Layout({ root: this, onLayerChange });
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

	    /**
	     * Public
	     */
	    add(object, property, options) {
	        return this._layout.addComponent({ object, property, options });
	    }

	    // TODO: Fix
	    remove(component) {
	        // this._components.remove(component);
	    }

	    addButton(options) {
	        return this._layout.addComponent({ options, type: 'button' });
	    }

	    addLayer(label) {
	        return this._layout.addLayer(label);
	    }

	    gotoLayer(label) {
	        this._layout.gotoLayer(label);
	    }

	    addGroup(label, options) {
	        return this._layout.addGroup(label, options);
	    }

	    createLayoutFromModel(model, onCompleteCallback) {
	        const layers = model.layers;
	        for (const layer of layers) {
	            this.createLayer(layer);
	        }

	        const groups = model.groups;
	        for (const group of groups) {
	            this.createGroup(group.label, group.options);
	        }

	        const components = model.components;
	        for (const modelData of components) {
	            this._layout.createComponent({
	                object: modelData.object,
	                property: modelData.property,
	                options: modelData.options,
	                id: modelData.id,
	                type: modelData.type,
	                onChangeCallback: this._onChangeCallback,
	            });
	        }

	        if (typeof onCompleteCallback === 'function') {
	            onCompleteCallback();
	        }
	    }

	    isLayoutSidebar() {
	        return !this._isDevtools;
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

	    _sendLayoutModel() {
	        const layoutModel = LayoutModel$1.get();
	        window.postMessage({
	            source: 'dddd-page',
	            payload: {
	                action: 'setup',
	                layoutModel,
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
	                    if (payload.models[0]) ;
	                    // this._layout.components.updateObjects(payload.models);
	                    break;
	            }
	        }
	    }
	}

	const width = 500;
	const height = 500;

	const canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = width;
	canvas.height = height;

	const context = canvas.getContext('2d');

	const settings = {
	    text: 'test',
	    font: 'Arial',
	    fontSize: 48,
	    color: '#ffff00',
	    capitals: false,
	    image: 'http://localhost:3003/image.png',
	    position: {
	        x: 20,
	        y: 50,
	    },
	    time: 0,
	};

	function update() {
	    window.requestAnimationFrame(update);

	    context.clearRect(0, 0, width, height);

	    context.fillStyle = 'red';
	    context.fillRect(0, 0, width, height);

	    context.font = `${settings.fontSize}px ${settings.font}`;
	    context.fillStyle = settings.color;

	    const text = settings.capitals ? settings.text.toUpperCase() : settings.text;
	    context.fillText(text, settings.position.x, settings.position.y);

	    // settings.time += 0.01;

	    // settings.fontSize = 30 + (70 * ((1 + Math.sin(settings.time)) / 2));

	    // settings.position.x += 0.01;
	    // settings.position.y += 0.01;

	    // if (Math.random() > 0.95) {
	    //     settings.capitals = !settings.capitals;

	    //     const options = [
	    //         'Arial',
	    //         'Verdana',
	    //         'Times New Roman',
	    //     ];

	    //     const option = options[Math.floor(options.length * Math.random())];
	    //     settings.font = option;
	    // }
	}
	window.requestAnimationFrame(update);
	// loadImage(settings.image);

	const dddd = new DDDD({
	    onLayerChange: (label) => {
	        console.log('change layer', label);
	    },
	});

	window.dddd = dddd;

	dddd.addLayer('Layer #1');
	const layer2 = dddd.addLayer('Layer #2');

	const shape1 = dddd.addGroup('Shape #1', {
	    container: 'Layer #1',
	});

	shape1.add(settings, 'time');
	dddd.add(settings, 'fontSize', {
	    container: 'Shape #1',
	    min: 30,
	    max: 100,
	});

	dddd.add(settings, 'position', {
	    container: 'Shape #1',
	    stepSize: 1,
	});

	const subgroup = shape1.addGroup('Subgroup');
	subgroup.add(settings, 'text');
	subgroup.add(settings, 'font', {
	    container: 'Shape #1',
	    options: [
	        'Arial',
	        'Verdana',
	        'Times New Roman',
	    ],
	});

	const subgroup2 = subgroup.addGroup('Subgroup2');
	subgroup2.add(settings, 'fontSize', {
	    container: 'Shape #1',
	    min: 30,
	    max: 100,
	});

	// const shape2 = dddd.addGroup('Shape #2', {
	//     container: 'Layer #1',
	// });

	// const subgroup3 = shape1.addGroup('Subgroup3');
	// subgroup3.add(settings, 'color', {
	//     container: 'Shape #1',
	// });
	// subgroup3.add(settings, 'capitals', {
	//     container: 'Shape #1',
	// });

	// dddd.add(settings, 'image', {
	//     type: 'image',
	//     container: 'Shape #1',
	//     onChange() {
	//         loadImage(settings.image);
	//     },
	// });
	// dddd.addButton({
	//     container: 'Shape #1',
	//     label: 'Log text',
	//     onClick: () => {
	//         console.log(settings.text);
	//     },
	// });

})));
