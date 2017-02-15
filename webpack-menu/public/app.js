/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(7).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__edit_form_pug__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__edit_form_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__edit_form_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit_form_styl__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit_form_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__edit_form_styl__);



class EditForm {
    constructor() {
        document.body.appendChild(this.render());

        this._el = document.querySelector('.edit-form--user');
        this._listUsers = document.querySelector('.list-users');
        this._formElement = document.forms[0];




        this._listUsers.addEventListener('list-user-check', this._listUserCheckHandler.bind(this));

        this._formElement.addEventListener('change', this._formChangeHandler.bind(this));
    }

    render() {
        let element = document.createElement('div');

        element.innerHTML = __WEBPACK_IMPORTED_MODULE_0__edit_form_pug___default()();

        return element;
    }

    _listUserCheckHandler(event) {
       let user = event.detail.checkedUser;
        this._formElement.elements['first-name'].value = user.firstName;
        this._formElement.elements['last-name'].value = user.lastName;
    }

    _formChangeHandler(event) {

        let eventTrig = new CustomEvent('user-data-change', {
            detail : {
                firstName :  this._formElement.elements['first-name'].value,
                lastName : this._formElement.elements['last-name'].value
            }
        });

        this._listUsers.dispatchEvent(eventTrig);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EditForm;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_users_pug__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_users_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__list_users_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_users_styl__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_users_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__list_users_styl__);



class ListUsers {
    constructor({title, users}){
        this._title = title;
        this._users = users;

        this._render();

        document.body.appendChild(this.getElem());

        this._el = document.querySelector('.list-users');

        this._el.addEventListener('click', this._clickHadler.bind(this));
        this._el.addEventListener('user-data-change', this._updateUserData.bind(this) );
    }


    _render() {
        let tmp = document.createElement('div');
        tmp.innerHTML = __WEBPACK_IMPORTED_MODULE_0__list_users_pug___default()({
            title : this._title,
            users : this._users
        });

        this._elem = tmp;
    }

    _clickHadler(event) {
        if( event.target.nodeType !== 'li'){
            let activeClass = 'list-users__item--active';
            let target = event.target.closest('li');

            if(this._el.querySelector('.' + activeClass)) {
                this._el.querySelector('.' + activeClass).classList.remove(activeClass);
            }

            if( target.classList.contains(activeClass) ) {
                target.classList.remove(activeClass);
            }
            else{
                target.classList.add(activeClass);

                let eventTrig = new CustomEvent('list-user-check', {
                    bubble : true,
                    detail : {
                        checkedUser : {
                            firstName : target.querySelector('[data-first-name]').dataset.firstName,
                            lastName : target.querySelector('[data-last-name]').dataset.lastName
                        }
                    }
                });

                this._el.dispatchEvent(eventTrig);
            }


        }
    }

    _updateUserData(event) {
        let userUpdate = event.detail;

        let dataFirstName = this._el.querySelector('.list-users__item--active [data-first-name]');
        let dataLastName = this._el.querySelector('.list-users__item--active [data-last-name]');

        dataFirstName.innerHTML = userUpdate.firstName + ' ';
        dataFirstName.setAttribute('data-first-name', userUpdate.firstName);
        dataLastName.innerHTML = userUpdate.lastName;
        dataLastName.setAttribute('data-last-name', userUpdate.lastName);
    }

    getElem() {
        return this._elem;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ListUsers;
;




/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"edit-form--user\"\u003E\u003Cform\u003E\u003Cp class=\"form-help\"\u003EPlease choose user\u003C\u002Fp\u003E\u003Cdiv class=\"form-element\"\u003E\u003Clabel\u003EUser first name\u003C\u002Flabel\u003E\u003Cinput type=\"text\" name=\"first-name\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-element\"\u003E\u003Clabel\u003EUser last name\u003C\u002Flabel\u003E\u003Cinput type=\"text\" name=\"last-name\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (title, users) {pug_html = pug_html + "\u003Cdiv class=\"list-users\"\u003E\u003Cspan class=\"title\"\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cul\u003E";
// iterate users
;(function(){
  var $$obj = users;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var user = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli class=\"list-users__item\"\u003E\u003Cspan" + (" class=\"user-first-name\""+pug.attr("data-first-name", user.firstName, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = user.firstName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan" + (" class=\"user-last-name\""+pug.attr("data-last-name", user.lastName, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = user.lastName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var user = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli class=\"list-users__item\"\u003E\u003Cspan" + (" class=\"user-first-name\""+pug.attr("data-first-name", user.firstName, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = user.firstName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan" + (" class=\"user-last-name\""+pug.attr("data-last-name", user.lastName, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = user.lastName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";}.call(this,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"users" in locals_for_with?locals_for_with.users:typeof users!=="undefined"?users:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_users__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit_form__ = __webpack_require__(1);




let listUsers = new __WEBPACK_IMPORTED_MODULE_0__list_users__["a" /* default */]({

    title : 'Users',
    users : [
        {
            firstName : 'Byron ',
            lastName : 'Ellis'
        },

        {
            firstName : 'Debbie',
            lastName : ' Stone'
        },

        {
            firstName : 'Noelle ',
            lastName : 'Sanders'
        }
    ]
});

let editForm = new __WEBPACK_IMPORTED_MODULE_1__edit_form__["a" /* default */]();




//import Menu from './menu';
//
//let menu = new Menu({
//  title: "Сладости",
//  items: [{
//    title: "Конфеты",
//    href:  "candy"
//  }, {
//    title: "Пирожки",
//    href:  "pie"
//  }, {
//    title: "Пряники",
//    href:  "cookies"
//  }]
//});

//document.body.appendChild(menu.getElem());
//
//menu.getElem().addEventListener('menu-select', function(event) {
//  alert(event.detail.value);
//});
//
//menu.getElem().addEventListener('menu-open', function(event) {
//  console.log("open");
//});
//
//menu.getElem().addEventListener('menu-close', function(event) {
//  console.log("close");
//});

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map