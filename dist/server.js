/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server-dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config/keys.js":
/*!****************************!*\
  !*** ./src/config/keys.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  mongoURI: \"mongodb+srv://admin:6JsteBFmfKQUcqq0@cluster0-gaygc.mongodb.net/farmestar?retryWrites=true&w=majority\",\n  userAuthKey: \"MTZlNWI0ZGQtODVmNC00NDliLTk3ODYtOTFkODE0NmUxYmQz\",\n  appAuthKey: \"NDYyMDU0YmEtOGM5OS00YTQ2LTgxY2UtZGRjNTI5ZDI4OTgw\",\n  appId: \"61035d16-4f24-4696-8645-cf5c54e20787\",\n  secretOrKey: \"secret\"\n};\n\n//# sourceURL=webpack:///./src/config/keys.js?");

/***/ }),

/***/ "./src/config/passport.js":
/*!********************************!*\
  !*** ./src/config/passport.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/keys */ \"./src/config/keys.js\");\n/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config_keys__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar JwtStrategy = __webpack_require__(/*! passport-jwt */ \"passport-jwt\").Strategy;\n\nvar ExtractJwt = __webpack_require__(/*! passport-jwt */ \"passport-jwt\").ExtractJwt;\n\nvar User = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model(\"users\");\nvar opts = {};\nopts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();\nopts.secretOrKey = _config_keys__WEBPACK_IMPORTED_MODULE_1___default.a.secretOrKey;\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (passport) {\n  passport.use(new JwtStrategy(opts, function (jwp_payload, done) {\n    User.findById(jwp_payload.id).then(function (user) {\n      if (user) {\n        return done(null, user);\n      }\n\n      return done(null, false);\n    }).catch(function (err) {\n      return console.log(err);\n    });\n  }));\n});\n\n//# sourceURL=webpack:///./src/config/passport.js?");

/***/ }),

/***/ "./src/models/app.js":
/*!***************************!*\
  !*** ./src/models/app.js ***!
  \***************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return App; });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nvar appShema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  version: {\n    type: String,\n    required: true\n  },\n  date: {\n    type: Date,\n    default: Date.now\n  }\n});\nvar App = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('app', appShema);\n\n//# sourceURL=webpack:///./src/models/app.js?");

/***/ }),

/***/ "./src/models/user.js":
/*!****************************!*\
  !*** ./src/models/user.js ***!
  \****************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"User\", function() { return User; });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nvar userShema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  email: {\n    type: String,\n    required: true\n  },\n  password: {\n    type: String,\n    required: true\n  },\n  date: {\n    type: Date,\n    default: Date.now\n  }\n});\nvar User = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('users', userShema);\n\n//# sourceURL=webpack:///./src/models/user.js?");

/***/ }),

/***/ "./src/routes/api/app.js":
/*!*******************************!*\
  !*** ./src/routes/api/app.js ***!
  \*******************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"version\", function() { return version; });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/keys */ \"./src/config/keys.js\");\n/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config_keys__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _models_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../models/app */ \"./src/models/app.js\");\n\n\n\n //Model\n\n\nvar version = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router(); // @route POST api/app/app\n// @desc Will post the application information\n// @access Public\n\nversion.post(\"/app\", function (req, res) {\n  _models_app__WEBPACK_IMPORTED_MODULE_4__[\"App\"].findOne({\n    version: req.body.version\n  }).then(function (app) {\n    if (app) {\n      return res.status(400).json({\n        version: \"Version already exists, please update and try again.\"\n      });\n    } else {\n      var newApp = new _models_app__WEBPACK_IMPORTED_MODULE_4__[\"App\"]({\n        name: req.body.name,\n        version: req.body.version\n      }); //Save new Version to DB\n\n      newApp.save().then(function (app) {\n        return res.json(app);\n      }).catch(function (err) {\n        return console.log(err);\n      });\n    }\n  });\n}); // @route GET api/app/version\n// @desc will post the application information\n// @access Public\n\nversion.get(\"/version\", function (req, res) {\n  _models_app__WEBPACK_IMPORTED_MODULE_4__[\"App\"].find().sort('-date').limit(1).find(function (err, data) {\n    return res.json(data);\n  });\n});\n\n\n//# sourceURL=webpack:///./src/routes/api/app.js?");

/***/ }),

/***/ "./src/routes/api/users.js":
/*!*********************************!*\
  !*** ./src/routes/api/users.js ***!
  \*********************************/
/*! exports provided: users */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"users\", function() { return users; });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/keys */ \"./src/config/keys.js\");\n/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config_keys__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _validation_register__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../validation/register */ \"./src/validation/register.js\");\n/* harmony import */ var _validation_login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../validation/login */ \"./src/validation/login.js\");\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../models/user */ \"./src/models/user.js\");\n\n\n\n //Validation\n\n\n //Model\n\n\nvar users = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router(); // @route POST api/users.register\n// @desc Register user\n// @access Public\n\nusers.post(\"/register\", function (req, res) {\n  var _validateRegistration = Object(_validation_register__WEBPACK_IMPORTED_MODULE_4__[\"validateRegistrationInput\"])(req.body),\n      errors = _validateRegistration.errors,\n      isValid = _validateRegistration.isValid; //Check Validation\n\n\n  if (!isValid) {\n    return res.status(400).json(errors);\n  } //Check against email if user exists\n\n\n  _models_user__WEBPACK_IMPORTED_MODULE_6__[\"User\"].findOne({\n    email: req.body.email\n  }).then(function (user) {\n    if (user) {\n      return res.status(400).json({\n        email: \"Email already exists\"\n      });\n    } else {\n      var newUser = new _models_user__WEBPACK_IMPORTED_MODULE_6__[\"User\"]({\n        name: req.body.name,\n        email: req.body.email,\n        password: req.body.password\n      }); //Hash the Password before DB Peristance\n\n      bcryptjs__WEBPACK_IMPORTED_MODULE_1___default.a.genSalt(10, function (err, salt) {\n        bcryptjs__WEBPACK_IMPORTED_MODULE_1___default.a.hash(newUser.password, salt, function (err, hash) {\n          if (err) throw err;\n          newUser.password = hash;\n          newUser.save().then(function (user) {\n            return res.json(user);\n          }).catch(function (err) {\n            return console.log(err);\n          });\n        });\n      });\n    }\n  });\n}); // @route POST api/users/login\n// @desc Login user and return JWT token\n// @access Public\n\nusers.post(\"/login\", function (req, res) {\n  var _validateLoginInput = Object(_validation_login__WEBPACK_IMPORTED_MODULE_5__[\"validateLoginInput\"])(req.body),\n      errors = _validateLoginInput.errors,\n      isValid = _validateLoginInput.isValid; //Check Validation\n\n\n  if (!isValid) {\n    return res.status(400).json(errors);\n  }\n\n  var email = req.body.email;\n  var password = req.body.password; //Find user by email\n\n  _models_user__WEBPACK_IMPORTED_MODULE_6__[\"User\"].findOne({\n    email: email\n  }).then(function (user) {\n    if (!user) {\n      return res.status(404).json({\n        emailnotfound: \"Email not found\"\n      });\n    } //Verify Password\n\n\n    bcryptjs__WEBPACK_IMPORTED_MODULE_1___default.a.compare(password, user.password).then(function (isMatch) {\n      if (isMatch) {\n        //Create JWT Payload\n        var payload = {\n          id: user.id,\n          name: user.name\n        }; //Sign Token\n\n        jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default.a.sign(payload, _config_keys__WEBPACK_IMPORTED_MODULE_3___default.a.secretOrKey, {\n          expiresIn: 31556926 //1 year\n\n        }, function (err, token) {\n          res.json({\n            success: true,\n            token: \"Bearer \" + token\n          });\n        });\n      } else {\n        return res.status(400).json({\n          passwordincorrect: \"Password incorrect\"\n        });\n      }\n    });\n  });\n});\n\n\n//# sourceURL=webpack:///./src/routes/api/users.js?");

/***/ }),

/***/ "./src/server/server-dev.js":
/*!**********************************!*\
  !*** ./src/server/server-dev.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var onesignal_node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! onesignal-node */ \"onesignal-node\");\n/* harmony import */ var onesignal_node__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(onesignal_node__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _webpack_dev_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../webpack.dev.config */ \"./webpack.dev.config.js\");\n/* harmony import */ var _webpack_dev_config__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_webpack_dev_config__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _routes_api_users__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../routes/api/users */ \"./src/routes/api/users.js\");\n/* harmony import */ var _routes_api_app__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../routes/api/app */ \"./src/routes/api/app.js\");\n\n\n\n\n\n\n\n\n\n\n\nvar passport = __webpack_require__(/*! passport */ \"passport\"); //APi Imports\n\n\n\n\nvar __dirname = './dist/';\n\nvar db = __webpack_require__(/*! ../config/keys */ \"./src/config/keys.js\").mongoURI;\n\nvar _userAuthKey = __webpack_require__(/*! ../config/keys */ \"./src/config/keys.js\").userAuthKey;\n\nvar _appAuthKey = __webpack_require__(/*! ../config/keys */ \"./src/config/keys.js\").appAuthKey;\n\nvar _appId = __webpack_require__(/*! ../config/keys */ \"./src/config/keys.js\").appId; //Setup Database\n\n\nmongoose__WEBPACK_IMPORTED_MODULE_4___default.a.connect(db, {\n  useNewUrlParser: true,\n  autoIndex: false\n}).then(function () {\n  return console.log(\"MongoDB Successfully Connected\");\n}).catch(function (err) {\n  return console.log(err);\n}); //OneSignal Client\n\nvar notificationClient = new onesignal_node__WEBPACK_IMPORTED_MODULE_6___default.a.Client({\n  userAuthKey: _userAuthKey,\n  app: {\n    appAuthKey: _appAuthKey,\n    appId: _appId\n  }\n});\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()(),\n    compiler = webpack__WEBPACK_IMPORTED_MODULE_3___default()(_webpack_dev_config__WEBPACK_IMPORTED_MODULE_9___default.a); //Development Only Middleware\n\napp.use(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_7___default()(compiler, {\n  publicPath: _webpack_dev_config__WEBPACK_IMPORTED_MODULE_9___default.a.output.publicPath\n}));\napp.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_8___default()(compiler)); //Cookie Parser Middleware\n\napp.use(cookie_parser__WEBPACK_IMPORTED_MODULE_5___default()()); //Passport middleware\n\n__webpack_require__(/*! ../config/passport */ \"./src/config/passport.js\");\n\napp.use(passport.initialize()); //Request middleware\n\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default()());\nvar PORT = process.env.PORT || 8080;\napp.listen(PORT, function () {\n  console.log(\"***Server running on Port:\".concat(PORT, \"***\"));\n}); //Igedla API Routes\n\napp.use('/api/users', _routes_api_users__WEBPACK_IMPORTED_MODULE_10__[\"users\"]);\napp.use('/api/app', _routes_api_app__WEBPACK_IMPORTED_MODULE_11__[\"version\"]);\napp.all('*', function (req, res) {\n  res.sendFile('/index.html', {\n    root: __dirname\n  });\n}); //OneSignal Test Function\n\nfunction testNotification() {\n  var test = new onesignal_node__WEBPACK_IMPORTED_MODULE_6___default.a.Notification({\n    contents: {\n      en: \"Test Notification\",\n      tr: \"Test masaji\"\n    },\n    include_segments: [\"Active Users\", \"Inactive Users\"]\n  });\n  notificationClient.sendNotification(test).then(function (response) {\n    console.log(response.data, response.httpResponse.statusCode);\n  }).catch(function (err) {\n    console.log('Something went wrong...', err);\n  });\n}\n\n//# sourceURL=webpack:///./src/server/server-dev.js?");

/***/ }),

/***/ "./src/validation/login.js":
/*!*********************************!*\
  !*** ./src/validation/login.js ***!
  \*********************************/
/*! exports provided: validateLoginInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateLoginInput\", function() { return validateLoginInput; });\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! validator */ \"validator\");\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var is_empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is-empty */ \"is-empty\");\n/* harmony import */ var is_empty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_empty__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction validateLoginInput(data) {\n  var errors = {}; //Convert to Strings for Validator\n\n  data.email = !is_empty__WEBPACK_IMPORTED_MODULE_1___default()(data.email) ? data.email : \"\";\n  data.password = !is_empty__WEBPACK_IMPORTED_MODULE_1___default()(data.password) ? data.password : \"\"; //Checks\n\n  if (validator__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(data.email)) {\n    errors.email = \"Email field is required\";\n  } else if (!validator__WEBPACK_IMPORTED_MODULE_0___default.a.isEmail(data.email)) {\n    errors.email = \"Email is invalid\";\n  }\n\n  if (validator__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(data.password)) {\n    errors.password = \"Password field is required\";\n  }\n\n  return {\n    errors: errors,\n    isValid: is_empty__WEBPACK_IMPORTED_MODULE_1___default()(errors)\n  };\n}\n\n//# sourceURL=webpack:///./src/validation/login.js?");

/***/ }),

/***/ "./src/validation/register.js":
/*!************************************!*\
  !*** ./src/validation/register.js ***!
  \************************************/
/*! exports provided: validateRegistrationInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateRegistrationInput\", function() { return validateRegistrationInput; });\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! validator */ \"validator\");\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var is_empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is-empty */ \"is-empty\");\n/* harmony import */ var is_empty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_empty__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction validateRegistrationInput(data) {\n  var errors = {}; //Convert to empty string for validator\n\n  data.name = !is_empty__WEBPACK_IMPORTED_MODULE_1___default()(data.name) ? data.name : \"\";\n  data.email = !is_empty__WEBPACK_IMPORTED_MODULE_1___default()(data.email) ? data.email : \"\";\n  data.password = !is_empty__WEBPACK_IMPORTED_MODULE_1___default()(data.password) ? data.password : \"\";\n  data.password2 = !is_empty__WEBPACK_IMPORTED_MODULE_1___default()(data.password2) ? data.password2 : \"\"; //Perform Checks\n\n  if (validator__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(data.name)) {\n    errors.name = \"Name field is required\";\n  }\n\n  if (validator__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(data.email)) {\n    errors.email = \"Email field is required\";\n  } else if (!validator__WEBPACK_IMPORTED_MODULE_0___default.a.isEmail(data.email)) {\n    errors.email = \"Email is invalid, please use a valid email\";\n  }\n\n  if (validator__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(data.password)) {\n    errors.password = \"Password field is required\";\n  }\n\n  if (validator__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(data.password2)) {\n    errors.password2 = \"Confirm password field is required\";\n  }\n\n  if (!validator__WEBPACK_IMPORTED_MODULE_0___default.a.isLength(data.password, {\n    min: 6,\n    max: 30\n  })) {\n    errors.password = \"Password must be at least 6 characters\";\n  }\n\n  if (!validator__WEBPACK_IMPORTED_MODULE_0___default.a.equals(data.password, data.password2)) {\n    errors.password2 = \"Passwords must match\";\n  }\n\n  return {\n    errors: errors,\n    isValid: is_empty__WEBPACK_IMPORTED_MODULE_1___default()(errors)\n  };\n}\n\n//# sourceURL=webpack:///./src/validation/register.js?");

/***/ }),

/***/ "./webpack.dev.config.js":
/*!*******************************!*\
  !*** ./webpack.dev.config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var path = __webpack_require__(/*! path */ \"path\");\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n\nvar WebpackPwaManifest = __webpack_require__(/*! webpack-pwa-manifest */ \"webpack-pwa-manifest\");\n\nvar WorkboxPlugin = __webpack_require__(/*! workbox-webpack-plugin */ \"workbox-webpack-plugin\");\n\nvar MiniCssExtractPlugin = __webpack_require__(/*! mini-css-extract-plugin */ \"mini-css-extract-plugin\");\n\nvar OptimizeCSSAssetsPlugin = __webpack_require__(/*! optimize-css-assets-webpack-plugin */ \"optimize-css-assets-webpack-plugin\");\n\nmodule.exports = {\n  entry: {\n    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js'],\n    'OneSignalSDKUpdaterWorker': path.resolve('./src/OneSignalSDKUpdaterWorker.js'),\n    'OneSignalSDKWorker': path.resolve('./src/OneSignalSDKWorker.js')\n  },\n  output: {\n    path: path.join(__dirname, 'dist'),\n    publicPath: '/',\n    filename: '[name].js'\n  },\n  resolve: {\n    alias: {\n      Assets: path.resolve(__dirname, 'src/assets/images/')\n    }\n  },\n  mode: 'development',\n  target: 'web',\n  devtool: 'source-map',\n  // Webpack 4 does not have a CSS minifier, although\n  // Webpack 5 will likely come with one\n  optimization: {\n    splitChunks: {\n      chunks: 'async',\n      minSize: 30000,\n      maxSize: 0,\n      minChunks: 1,\n      maxAsyncRequests: 5,\n      maxInitialRequests: 3,\n      automaticNameDelimiter: '~',\n      automaticNameMaxLength: 30,\n      name: true,\n      cacheGroups: {\n        vendors: {\n          test: /[\\\\/]node_modules[\\\\/]/,\n          priority: -10\n        },\n        default: {\n          minChunks: 2,\n          priority: -20,\n          reuseExistingChunk: true\n        }\n      }\n    },\n    minimizer: [new OptimizeCSSAssetsPlugin({})]\n  },\n  module: {\n    rules: [{\n      enforce: \"pre\",\n      test: /\\.js$/,\n      exclude: /node_modules/,\n      loader: \"eslint-loader\",\n      options: {\n        emitWarning: true,\n        failOnError: false,\n        failOnWarning: false\n      }\n    }, {\n      test: /\\.(js|jsx)$/,\n      exclude: /node_modules/,\n      use: {\n        loader: \"babel-loader\"\n      }\n    }, {\n      test: /\\.css$/,\n      use: [MiniCssExtractPlugin.loader, 'css-loader']\n    }, {\n      test: /\\.html$/,\n      use: [{\n        loader: \"html-loader\"\n      }]\n    }, {\n      test: /\\.(png|svg|jpg|gif)$/,\n      use: ['file-loader']\n    }]\n  },\n  plugins: [new HtmlWebPackPlugin({\n    template: \"./src/index.html\",\n    filename: \"./index.html\",\n    excludeChunks: ['server'],\n    favicon: \"./src/favicon.ico\"\n  }), new WorkboxPlugin.GenerateSW({\n    clientsClaim: true,\n    skipWaiting: true\n  }), new MiniCssExtractPlugin({\n    filename: \"[name].css\",\n    chunkFilename: \"[id].css\"\n  }), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), new WebpackPwaManifest({\n    name: 'Farmestar',\n    short_name: 'Farmestar',\n    description: 'Bringing farmers and consumers together.',\n    start_url: '/',\n    background_color: '#ffffff',\n    theme_color: '#ffffff',\n    crossorigin: 'anonymous',\n    //cant be null, use-credentials or anonymous\n    icons: [{\n      src: path.resolve('./src/assets/images/logo.png'),\n      sizes: [96, 128, 192, 256, 384, 512] // multiple sizes\n\n    }, {\n      src: path.resolve('./src/assets/images/large-icon.png'),\n      size: '1024x1024' // you can also use the specifications pattern\n\n    }]\n  })]\n};\n\n//# sourceURL=webpack:///./webpack.dev.config.js?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "is-empty":
/*!***************************!*\
  !*** external "is-empty" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"is-empty\");\n\n//# sourceURL=webpack:///external_%22is-empty%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mini-css-extract-plugin":
/*!******************************************!*\
  !*** external "mini-css-extract-plugin" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mini-css-extract-plugin\");\n\n//# sourceURL=webpack:///external_%22mini-css-extract-plugin%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "onesignal-node":
/*!*********************************!*\
  !*** external "onesignal-node" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"onesignal-node\");\n\n//# sourceURL=webpack:///external_%22onesignal-node%22?");

/***/ }),

/***/ "optimize-css-assets-webpack-plugin":
/*!*****************************************************!*\
  !*** external "optimize-css-assets-webpack-plugin" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"optimize-css-assets-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22optimize-css-assets-webpack-plugin%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-jwt\");\n\n//# sourceURL=webpack:///external_%22passport-jwt%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"validator\");\n\n//# sourceURL=webpack:///external_%22validator%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ }),

/***/ "webpack-pwa-manifest":
/*!***************************************!*\
  !*** external "webpack-pwa-manifest" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-pwa-manifest\");\n\n//# sourceURL=webpack:///external_%22webpack-pwa-manifest%22?");

/***/ }),

/***/ "workbox-webpack-plugin":
/*!*****************************************!*\
  !*** external "workbox-webpack-plugin" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"workbox-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22workbox-webpack-plugin%22?");

/***/ })

/******/ });