(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var interpreter = require('./src/interpreter'),
    CLASS_EXPORT = {
	Request: require('./src/Request'),

	Command: require('./src/Command'),
	Option: require('./src/Option'),
	MultiOption: require('./src/MultiOption'),
	DeepOption: require('./src/DeepOption'),
	IsolatedOption: require('./src/IsolatedOption'),
	Parameter: require('./src/Parameter'),
	DeepParameter: require('./src/DeepParameter'),

	InputError: require('./src/InputError')
};

var AskNicely = function (_CLASS_EXPORT$Command) {
	_inherits(AskNicely, _CLASS_EXPORT$Command);

	/**
  * @param {String} [name]
  * @param {Function} [controller]
  * @constructor
  */
	function AskNicely(name, controller) {
		_classCallCheck(this, AskNicely);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AskNicely).call(this, name, controller));

		Object.assign(_this, CLASS_EXPORT);
		return _this;
	}

	/**
  * @param {String|Array<String>} [parts]
  * @param {Object} [request] An existing Request, if you do not want to make a new one if you want to re-use it
  * @returns {Promise}
  */


	_createClass(AskNicely, [{
		key: 'interpret',
		value: function interpret(parts, request) {
			return interpreter(this, parts, request || new CLASS_EXPORT.Request(), Array.prototype.slice.call(arguments, 2));
		}
	}]);

	return AskNicely;
}(CLASS_EXPORT.Command);

module.exports = Object.assign(AskNicely, CLASS_EXPORT);

console.log('EXPORTING CLASS', module.exports, AskNicely, CLASS_EXPORT);

},{"./src/Command":2,"./src/DeepOption":3,"./src/DeepParameter":4,"./src/InputError":6,"./src/IsolatedOption":7,"./src/MultiOption":8,"./src/Option":10,"./src/Parameter":11,"./src/Request":12,"./src/interpreter":14}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var symbols = require('./symbols'),
    NamedSyntaxPart = require('./NamedSyntaxPart'),
    Option = require('./Option'),
    Parameter = require('./Parameter');

var CHILD_CLASS = Symbol('child command class definition');

var Command = function (_NamedSyntaxPart) {
	_inherits(Command, _NamedSyntaxPart);

	function Command(name, controller) {
		_classCallCheck(this, Command);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Command).call(this, name));

		_this.parent = null;
		_this.controller = null;
		_this.children = [];
		_this.aliases = [];
		_this.options = [];
		_this.parameters = [];
		_this.preControllers = [];

		_this.setNewChildClass(Command);
		_this.setController(controller);
		return _this;
	}

	_createClass(Command, [{
		key: symbols.isMatchForPart,
		value: function value(_value) {
			return !!this.getCommandByName(_value);
		}
	}, {
		key: symbols.updateTiersAfterMatch,
		value: function value(scopes, match) {
			scopes.splice(scopes.indexOf(this), 1);

			if (match instanceof Command) {
				scopes.splice.apply(scopes, [0, 0].concat(match.parameters).concat(match));
				scopes._.splice.apply(scopes._, [0, 0].concat(match.options));
			}

			return scopes;
		}
	}, {
		key: symbols.spliceInputFromParts,
		value: function value(parts) {
			return this.getCommandByName(parts.shift());
		}
	}, {
		key: symbols.exportWithInput,
		value: function value(request, _value2) {
			if (_value2) request.command = _value2;
		}
	}, {
		key: 'executePreControllers',
		value: function executePreControllers() {
			var args = Array.prototype.slice.call(arguments);
			return this.preControllers.reduce(function (res, preController) {
				return res.then(function (previousVal) {
					return previousVal === false ? previousVal : preController.apply(null, args);
				});
			}, this.parent ? this.parent.executePreControllers.apply(this.parent, args) : Promise.resolve(true));
		}

		/**
   * @todo Use rest parameters
   * @returns {Promise}
   */

	}, {
		key: 'execute',
		value: function execute() {
			var _this2 = this;

			var args = Array.prototype.slice.call(arguments);

			return this.executePreControllers.apply(this, args).then(function (previousValue) {
				return previousValue === false || typeof _this2.controller !== 'function' ? previousValue : _this2.controller.apply(null, args);
			});
		}

		/**
   * Look up a child command by it's name
   * @param {String} name
   * @returns {Command|undefined}
   */

	}, {
		key: 'getCommandByName',
		value: function getCommandByName(name) {
			return this.children.find(function (child) {
				return child.name === name || child.aliases.indexOf(name) >= 0;
			});
		}

		/**
   * Set the main controller
   * @param {Function} cb
   * @returns {Command}
   */

	}, {
		key: 'setController',
		value: function setController(cb) {
			this.controller = cb;

			return this;
		}

		/**
   * Defines what class new child instances should have if they're being instantiated by this object
   * @param ClassObject
   * @returns {Command}
   */

	}, {
		key: 'setNewChildClass',
		value: function setNewChildClass(ClassObject) {
			this[CHILD_CLASS] = ClassObject;

			return this;
		}
		/**
   * Add a precontroller function that is ran before its own controller, or any of it's descendants precontrollers
   * @param {Function} cb
   * @returns {Command}
   */

	}, {
		key: 'addPreController',
		value: function addPreController(cb) {
			this.preControllers.push(cb);

			return this;
		}

		/**
   * Give command an alternative name
   * @param {String} name
   * @returns {Command}
   */

	}, {
		key: 'addAlias',
		value: function addAlias(name) {
			this.aliases.push(name);

			return this;
		}

		/**
   * Describe an option
   * @param {Option|String} long - The identifying name of this option, unique for its ancestry
   * @param {String} [short] - A one-character alias of this option, unique for its ancestry
   * @param {String} [description]
   * @param {Boolean} [required] - If true, an omittance would throw an error
   * @returns {Command}
   */

	}, {
		key: 'addOption',
		value: function addOption(long, short, description, required) {
			this.options.push(long instanceof Option ? long : new Option(long).setShort(short).setDescription(description).isRequired(required));

			return this;
		}

		/**
   * Describes a parameter. Notice tat if a command has child commands, *required is implied for all ancestor parameters
   * (and child cmd names will be mistaken for parameters if some is missing)
   * @param {Parameter|String} name
   * @param {String} [description]
   * @param {Boolean} [required]
   * @returns {Command}
   */

	}, {
		key: 'addParameter',
		value: function addParameter(name, description, required) {
			this.parameters.push(name instanceof Parameter ? name : new Parameter(name).setDescription(description).isRequired(required));

			return this;
		}

		/**
   * Register a command as a child of this, and register this as parent of the child
   * @TODO: Check if child is not in lineage of command, to avoid circularness
   * @param {String|Command} name
   * @param {Function} [controller]
   * @returns {Command} The child command
   */

	}, {
		key: 'addCommand',
		value: function addCommand(name, controller) {
			var child = name instanceof Command ? name : new this[CHILD_CLASS](name, controller);

			child.parent = this;

			this.children.push(child);

			return child;
		}
	}]);

	return Command;
}(NamedSyntaxPart);

module.exports = Command;

},{"./NamedSyntaxPart":9,"./Option":10,"./Parameter":11,"./symbols":15}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var symbols = require('./symbols'),
    DeepSyntaxPart = require('./DeepSyntaxPart'),
    Option = require('./Option');

var DeepOption = function (_Option) {
	_inherits(DeepOption, _Option);

	function DeepOption(name) {
		_classCallCheck(this, DeepOption);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(DeepOption).call(this, name));
	}

	_createClass(DeepOption, [{
		key: symbols.isMatchForPart,
		value: function value(_value) {
			return _value.indexOf('--' + this.name + '.') === 0;
		}
	}, {
		key: symbols.spliceInputFromParts,
		value: function value(parts) {
			return DeepSyntaxPart[symbols.spliceInputFromParts].call(this, parts);
		}
	}, {
		key: symbols.exportWithInput,
		value: function value(request, _value2) {
			return DeepSyntaxPart[symbols.exportWithInput].call(this, 'options', request, _value2);
		}
	}]);

	return DeepOption;
}(Option);

module.exports = DeepOption;

},{"./DeepSyntaxPart":5,"./Option":10,"./symbols":15}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var symbols = require('./symbols'),
    DeepSyntaxPart = require('./DeepSyntaxPart'),
    Parameter = require('./Parameter');

var DeepParameter = function (_Parameter) {
	_inherits(DeepParameter, _Parameter);

	function DeepParameter(name) {
		_classCallCheck(this, DeepParameter);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(DeepParameter).call(this, name));
	}

	_createClass(DeepParameter, [{
		key: symbols.isMatchForPart,
		value: function value(_value) {
			return _value.indexOf(this.name + '.') === 0;
		}
	}, {
		key: symbols.updateTiersAfterMatch,
		value: function value(tiers) {
			return tiers;
		}
	}, {
		key: symbols.spliceInputFromParts,
		value: function value(parts) {
			return DeepSyntaxPart[symbols.spliceInputFromParts].call(this, parts);
		}
	}, {
		key: symbols.exportWithInput,
		value: function value(request, _value2) {
			return DeepSyntaxPart[symbols.exportWithInput].call(this, 'parameters', request, _value2);
		}
	}]);

	return DeepParameter;
}(Parameter);

module.exports = DeepParameter;

},{"./DeepSyntaxPart":5,"./Parameter":11,"./symbols":15}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var symbols = require('./symbols');

function getValueFromPath(nameParts, obj) {
	return nameParts.reduce(function (o, part) {
		return o && o[part] ? o[part] : undefined;
	}, obj);
}

function assignValueToPath(nameParts, resultObj, value) {
	var name = nameParts.shift();

	resultObj[name] = nameParts.length ? assignValueToPath(nameParts, resultObj[name] || {}, value) : value;

	return resultObj;
}

var DeepSyntaxPart = function () {
	function DeepSyntaxPart() {
		_classCallCheck(this, DeepSyntaxPart);
	}

	_createClass(DeepSyntaxPart, null, [{
		key: symbols.spliceInputFromParts,
		value: function value(parts) {
			var deepName = parts.shift();

			deepName = deepName.substr(deepName.indexOf('.') + 1);

			// if value is a dash, set actual value to TRUE
			if (parts[0] === '-') {
				parts.shift();
				return [deepName, getValueFromPath(deepName.split('.'), this.cloneDefault()) || true];
			}

			return parts[0] && parts[0].indexOf('-') !== 0 ? [deepName, parts.shift()] : [deepName, getValueFromPath(deepName.split('.'), this.cloneDefault()) || true];
		}
	}, {
		key: symbols.exportWithInput,
		value: function value(propertyName, request, _value) {
			if (!request[propertyName]) request[propertyName] = {};

			if (!request[propertyName][this.name]) request[propertyName][this.name] = this.cloneDefault() || {};

			if (_value === undefined) {
				return;
			}

			request[propertyName][this.name] = assignValueToPath(_value[0].split('.'), request[propertyName][this.name], _value[1]);
		}
	}]);

	return DeepSyntaxPart;
}();

module.exports = DeepSyntaxPart;

},{"./symbols":15}],6:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AskNicelyInputError = function (_Error) {
	_inherits(AskNicelyInputError, _Error);

	function AskNicelyInputError(message, solution) {
		_classCallCheck(this, AskNicelyInputError);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AskNicelyInputError).call(this, message));

		_this.name = _this.constructor.name;
		_this.solution = solution;
		return _this;
	}

	return AskNicelyInputError;
}(Error);

module.exports = AskNicelyInputError;

},{}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var symbols = require('./symbols'),
    Command = require('./Command'),
    Option = require('./Option');

var IsolatedOption = function (_Option) {
	_inherits(IsolatedOption, _Option);

	function IsolatedOption(name) {
		_classCallCheck(this, IsolatedOption);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(IsolatedOption).call(this, name));
	}

	// By resetting all tiers there are no "unresolved" syntax parts


	_createClass(IsolatedOption, [{
		key: symbols.updateTiersAfterMatch,
		value: function value(tiers) {
			tiers = [];
			tiers._ = [];
			return tiers;
		}

		// By emptying out parts there should be no further attempts to match

	}, {
		key: symbols.spliceInputFromParts,
		value: function value(parts) {
			var input = Option.prototype[symbols.spliceInputFromParts].apply(this, arguments);

			parts.splice(0, parts.length);

			return input;
		}

		// By resetting the results to just the command and this instance the Request object stays clean

	}, {
		key: symbols.updateInputSpecsAfterMatch,
		value: function value(resolvedInputSpecs, inputValue) {
			resolvedInputSpecs = [resolvedInputSpecs.reverse().find(function (inputSpec) {
				return inputSpec.input instanceof Command;
			}), {
				syntax: this,
				input: inputValue
			}];

			return resolvedInputSpecs;
		}
	}]);

	return IsolatedOption;
}(Option);

module.exports = IsolatedOption;

},{"./Command":2,"./Option":10,"./symbols":15}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var symbols = require('./symbols'),
    Option = require('./Option');

var breakPartsOnPart = Symbol(),
    breakPartsDefaultPattern = /^[-.*]/;

var MultiOption = function (_Option) {
	_inherits(MultiOption, _Option);

	function MultiOption(name) {
		_classCallCheck(this, MultiOption);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MultiOption).call(this, name));

		_this.isInfinite();
		return _this;
	}

	// @todo: infinite arg as a callback


	_createClass(MultiOption, [{
		key: 'isInfinite',
		value: function isInfinite(infinite) {
			this[breakPartsOnPart] = !!infinite ? function (part) {
				return false;
			} : function (part) {
				return part.charAt(0) === '-';
			};

			return this;
		}
	}, {
		key: breakPartsOnPart,
		value: function value(part) {
			return part.match(breakPartsDefaultPattern);
		}
	}, {
		key: symbols.spliceInputFromParts,
		value: function value(parts) {
			if (this.short && parts[0].charAt(1) === this.short) {
				parts[0] = '-' + parts[0].substr(2);

				if (parts[0] !== '-') return [];
			}

			parts.shift();

			var input = [];

			do {
				if (parts[0] === '-') {
					parts.shift();
					break;
				}
				if (!parts[0] || this[breakPartsOnPart](parts[0])) break;

				input.push(parts.shift());
			} while (parts.length > 0);

			return input;
		}
	}, {
		key: symbols.applyDefault,
		value: function value(_value, isUndefined) {
			if (_value === undefined || !_value.length) {
				if (this.useDefaultIfFlagMissing || !isUndefined) {
					_value = this.cloneDefault() || [];
				}
			}

			if (this.required && (isUndefined || !_value || !_value.length)) return undefined;

			return _value || [];
		}
	}, {
		key: symbols.exportWithInput,
		value: function value(request, _value2, isUndefined) {
			request.options[this.name] = (request.options[this.name] || []).concat(_value2);
		}
	}]);

	return MultiOption;
}(Option);

module.exports = MultiOption;

},{"./Option":10,"./symbols":15}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var symbols = require('./symbols');

var NamedSyntaxPart = function () {
	/**
  * @param {String} name
  */
	function NamedSyntaxPart(name) {
		_classCallCheck(this, NamedSyntaxPart);

		this.name = name;
		this.description = null;
	}

	/**
  * Signals the parser that an input part matches this NamedSyntaxPart definition.
  * @param part
  * @returns {Boolean}
  */


	_createClass(NamedSyntaxPart, [{
		key: symbols.isMatchForPart,
		value: function value(part) {
			throw new Error('Not implemented.');
		}

		/**
   * Describes how the value should be temporarily stored together with it's defining NamedSyntaxPart
   * @param {NamedSyntaxPart} resolvedInputSpecs
   * @param {*} inputValue
   * @returns {Array}
   */

	}, {
		key: symbols.updateInputSpecsAfterMatch,
		value: function value(resolvedInputSpecs, inputValue) {
			resolvedInputSpecs.push({
				syntax: this,
				input: inputValue
			});
			return resolvedInputSpecs;
		}

		/**
   * Describes how to extract an input value from input parts. Is expected to mutate `parts`, and return (a temporary)
   * input value.
   * @param parts
   * @returns {*}
   */

	}, {
		key: symbols.spliceInputFromParts,
		value: function value(parts) {
			throw new Error('Not implemented.');
		}

		/**
   * Describes how a temporarily stored input value (from `spliceInputFromParts`) is written to the Request object.
   * Is not expected to return anything.
   * @param {Request} request
   * @param {*} input
   */

	}, {
		key: symbols.exportWithInput,
		value: function value(request, input) {
			throw new Error('Not implemented.');
		}
	}, {
		key: symbols.applyDefault,
		value: function value(_value, isUndefined) {
			return _value;
		}

		/**
   * Validates input before it is resolved. Expected to throw an error if something is awry, return undefined
   * otherwise.
   * @param input
   * @returns {boolean}
   */

	}, {
		key: symbols.validateInput,
		value: function value(input) {}

		/**
   * Validates a value after it is resolved. Expected to throw an error if something is awry, return undefined
   * otherwise.
   * @param input
   */

	}, {
		key: 'validateValue',
		value: function validateValue(value) {}

		/**
   * Returns the new scope of NamedSyntaxParts to parse through after this is parsed.
   * @param {Array} tiers
   * @returns {Array}
   */

	}, {
		key: symbols.updateTiersAfterMatch,
		value: function value(tiers) {
			throw new Error('Not implemented.');
		}

		/**
   * Stored a descriptive string for the NamedSyntaxPart definition, or whatever it is to the end-user
   * @param {String} description
   * @returns {NamedSyntaxPart}
   */

	}, {
		key: 'setDescription',
		value: function setDescription(description) {
			this.description = description;
			return this;
		}
	}]);

	return NamedSyntaxPart;
}();

module.exports = NamedSyntaxPart;

},{"./symbols":15}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var symbols = require('./symbols'),
    VariableSyntaxPart = require('./VariableSyntaxPart');

var Option = function (_VariableSyntaxPart) {
	_inherits(Option, _VariableSyntaxPart);

	function Option(name) {
		_classCallCheck(this, Option);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Option).call(this, name));
	}

	_createClass(Option, [{
		key: symbols.isMatchForPart,
		value: function value(_value) {
			// return true if value is a (grouped) short, or long notation
			return _value.indexOf('-') !== 0 ? false : this.short && _value.charAt(1) === this.short || _value === '--' + this.name;
		}
	}, {
		key: symbols.updateTiersAfterMatch,
		value: function value(tiers) {
			// do not change tiers because options are always recognizable, and may occur in input again
			return tiers;
		}
	}, {
		key: symbols.spliceInputFromParts,
		value: function value(parts) {
			// if this is a short notation (for one or more flags)
			if (this.short && parts[0].charAt(1) === this.short) {
				// remove the flag signifier from group
				parts[0] = '-' + parts[0].substr(2); //replace(this.short, '');

				// if the group is not empty, stop parsing this option
				if (parts[0] !== '-') return;
			}

			// Stop caring about the flag signifier
			parts.shift();

			// if value is a dash, stop parsing
			if (parts[0] === '-') {
				parts.shift();
				return;
			}

			// use next input part if it is not another option
			if (parts[0] && parts[0].charAt(0) !== '-') return parts.shift();
		}
	}, {
		key: symbols.applyDefault,
		value: function value(_value2, isUndefined) {
			if (this.required && isUndefined) return undefined;

			if (_value2 === undefined) {
				if (this.useDefaultIfFlagMissing || !isUndefined) {
					return this.cloneDefault() || true;
				}
			}
			return _value2;
		}
	}, {
		key: symbols.exportWithInput,
		value: function value(request, _value3, isUndefined) {
			request.options[this.name] = _value3;
		}

		/**
   *
   * @param value
   * @param {Boolean} [useDefaultIfFlagMissing] - Ignored when option is also required -- will fail validation
   * @returns {Option}
   */

	}, {
		key: 'setDefault',
		value: function setDefault(value, useDefaultIfFlagMissing) {
			this.default = value;
			this.useDefaultIfFlagMissing = !!useDefaultIfFlagMissing;
			return this;
		}

		/**
   * Set a one-letter alias for a flag.
   * @param {String} short
   * @returns {Option}
   */

	}, {
		key: 'setShort',
		value: function setShort(short) {
			this.short = short;
			return this;
		}
	}]);

	return Option;
}(VariableSyntaxPart);

module.exports = Option;

},{"./VariableSyntaxPart":13,"./symbols":15}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var symbols = require('./symbols'),
    VariableSyntaxPart = require('./VariableSyntaxPart');

var Parameter = function (_VariableSyntaxPart) {
	_inherits(Parameter, _VariableSyntaxPart);

	function Parameter(name) {
		_classCallCheck(this, Parameter);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Parameter).call(this, name));
	}

	_createClass(Parameter, [{
		key: symbols.isMatchForPart,
		value: function value(_value) {
			return _value === '-' || _value.substr(0, 1) !== '-';
		}
	}, {
		key: symbols.updateTiersAfterMatch,
		value: function value(tiers) {
			tiers.shift();
			return tiers;
		}
	}, {
		key: symbols.spliceInputFromParts,
		value: function value(parts) {
			var value = parts.shift();
			return value === '-' ? undefined : value;
		}
	}, {
		key: symbols.exportWithInput,
		value: function value(request, _value2) {
			request.parameters[this.name] = _value2 === undefined ? this.cloneDefault() : _value2;
		}
	}]);

	return Parameter;
}(VariableSyntaxPart);

module.exports = Parameter;

},{"./VariableSyntaxPart":13,"./symbols":15}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function () {
	function Request() {
		_classCallCheck(this, Request);

		this.command = null;
		this.options = {};
		this.parameters = {};
	}

	/**
  * Execute command controller, or reject if errors were found
  * @param {*} ... Zero or many arguments to pass on to controller
  * @returns {Promise}
  */


	_createClass(Request, [{
		key: 'execute',
		value: function execute() {
			var args = Array.prototype.slice.call(arguments);

			return this.command.execute.apply(this.command, [this].concat(args));
		}
	}]);

	return Request;
}();

module.exports = Request;

},{}],13:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var symbols = require('./symbols'),
    NamedSyntaxPart = require('./NamedSyntaxPart'),
    InputError = require('./InputError');

var VariableSyntaxPart = function (_NamedSyntaxPart) {
	_inherits(VariableSyntaxPart, _NamedSyntaxPart);

	/**
  * @param {String} name
  */
	function VariableSyntaxPart(name) {
		_classCallCheck(this, VariableSyntaxPart);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VariableSyntaxPart).call(this, name));

		_this.validators = [];
		return _this;
	}

	/**
  * @param {boolean|Function} required - If this is a function, acts as a short-hand for addValidator() as well
  * @returns {VariableSyntaxPart}
  */


	_createClass(VariableSyntaxPart, [{
		key: 'isRequired',
		value: function isRequired(required) {
			this.required = !!required;

			return typeof required === 'function' ? this.addValidator(required) : this;
		}

		/**
   * Add a validator function that would check the resolved value and is expected to throw if something's awry.
   * @param {Function} validator
   * @returns {VariableSyntaxPart}
   */

	}, {
		key: 'addValidator',
		value: function addValidator(validator) {
			this.validators.push(validator);
			return this;
		}

		/**
   * Define a callback that can (asynchronously) resolve user input to a value. `resolver` can return any value
   * synchronously or a Promise for that value.
   * @param {Function} resolver
   * @returns {VariableSyntaxPart}
   */

	}, {
		key: 'setResolver',
		value: function setResolver(resolver) {
			this.resolver = resolver;
			return this;
		}

		/**
   * Set a value to fall back to in case VariableSyntaxPart was not defined (and not required)
   * @param {*} value
   * @returns {VariableSyntaxPart}
   */

	}, {
		key: 'setDefault',
		value: function setDefault(value) {
			this.default = value;
			return this;
		}
	}, {
		key: symbols.applyDefault,
		value: function value(_value, isUndefined) {
			return isUndefined ? this.cloneDefault() : _value;
		}
		// @TODO: Find a better way to clone objects, since Object.assign does not seem to do the job
		// If clone is not done properly, actual usage of a default property could overwrite it for later usages

	}, {
		key: 'cloneDefault',
		value: function cloneDefault() {
			return this.default && _typeof(this.default) === 'object' && !Array.isArray(this.default) ? JSON.parse(JSON.stringify(this.default || {})) : this.default;
		}
	}, {
		key: symbols.validateInput,
		value: function value(input) {
			if (this.required && input === undefined) throw new InputError('"' + this.name + '" can not be undefined.');
		}
	}, {
		key: 'validateValue',
		value: function validateValue(value) {
			this.validators.forEach(function (validator) {
				return validator(value);
			});
		}
	}]);

	return VariableSyntaxPart;
}(NamedSyntaxPart);

module.exports = VariableSyntaxPart;

},{"./InputError":6,"./NamedSyntaxPart":9,"./symbols":15}],14:[function(require,module,exports){
'use strict';

var symbols = require('./symbols'),
    InputError = require('./InputError');

/**
 * @param {Command} root
 * @param {String|Array<String>} [parts]
 * @returns {Array<[]>}
 */
function interpretInputSpecs(root, parts) {
	if (!parts) parts = [];

	if (typeof parts === 'string') parts = parts.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g).map(function (str) {
		return str.replace(/['"]+/g, '');
	});

	var scopes = [root],
	    resolvedInputSpecs = [{
		syntax: root,
		input: root
	}];

	scopes._ = [];

	root[symbols.updateTiersAfterMatch](scopes, root);

	// Match and validate syntax parts based on input
	while (parts.length) {
		var expectedScopes = scopes._.concat(scopes),
		    matchingScope = expectedScopes.find(function (scope) {
			return scope[symbols.isMatchForPart](parts[0]);
		});

		if (!matchingScope) throw new InputError('Could not find a match for input "' + parts[0] + '"');

		var matchingValue = matchingScope[symbols.spliceInputFromParts](parts);

		resolvedInputSpecs = matchingScope[symbols.updateInputSpecsAfterMatch](resolvedInputSpecs, matchingValue);

		scopes = matchingScope[symbols.updateTiersAfterMatch](scopes, matchingValue);
	}

	// Find everything that is still open to match, and map it to the same format as resolvedScopeValues
	var unresolvedInputSpecs = scopes._.concat(scopes).reduce(function (leftovers, tierOptions) {
		return leftovers.concat(tierOptions);
	}, []).filter(function (syntaxPart) {
		return !resolvedInputSpecs.find(function (match) {
			return match.syntax === syntaxPart;
		});
	}).map(function (unmatch) {
		return {
			syntax: unmatch,
			input: undefined,
			undefined: true
		};
	});
	return resolvedInputSpecs.concat(unresolvedInputSpecs);
}

/**
 *
 * @param {Request} request
 * @param {Array<[]>} inputSpecs
 * @returns {Promise}
 */
function resolveValueSpecs(request, inputSpecs, rest) {
	inputSpecs.map(function (inputSpec) {
		inputSpec.input = inputSpec.syntax[symbols.applyDefault](inputSpec.input, inputSpec.undefined);

		return inputSpec;
	}).forEach(function (inputSpec) {
		inputSpec.syntax[symbols.validateInput](inputSpec.input);
	});

	return Promise.all(inputSpecs.map(function (inputSpec) {
		return typeof inputSpec.syntax.resolver !== 'function' ? inputSpec : Promise.resolve(inputSpec.syntax.resolver.apply(inputSpec.syntax, [inputSpec.input].concat(rest))).then(function (input) {
			inputSpec.input = input;
			return inputSpec;
		});
	})).then(function (valueSpecs) {
		return valueSpecs.reduce(function (req, valueSpec) {
			valueSpec.syntax.validateValue(valueSpec.input);

			return Object.assign(req, valueSpec.syntax[symbols.exportWithInput](request, valueSpec.input, valueSpec.undefined));
		}, request);
	});
}

module.exports = function interpreter(root, parts, request, rest) {
	try {
		return resolveValueSpecs(request || {}, interpretInputSpecs(root, parts), rest);
	} catch (e) {
		return Promise.reject(e);
	}
};

},{"./InputError":6,"./symbols":15}],15:[function(require,module,exports){
'use strict';

module.exports = {
	isMatchForPart: Symbol('_isMatchForPart'),
	spliceInputFromParts: Symbol('_spliceInputFromParts'),
	updateInputSpecsAfterMatch: Symbol('_updateInputSpecsAfterMatch'),
	updateTiersAfterMatch: Symbol('_updateTiersAfterMatch'),
	applyDefault: Symbol('_applyDefault'),
	validateInput: Symbol('_validateInput'),
	exportWithInput: Symbol('_exportWithInput')
};

},{}]},{},[1]);
