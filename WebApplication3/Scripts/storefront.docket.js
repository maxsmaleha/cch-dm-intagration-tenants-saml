window["Aurigma"] =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry-points/docket-manager.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    if (
      (utils.isBlob(requestData) || utils.isFile(requestData)) &&
      requestData.type
    ) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = unescape(encodeURIComponent(config.auth.password)) || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/monet/dist/monet.js":
/*!******************************************!*\
  !*** ./node_modules/monet/dist/monet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Monet.js 0.9.0-rc.1
 *
 * (c) 2012-2018 Chris Myers
 * @license Monet.js may be freely distributed under the MIT license.
 * For all details and documentation:
 * https://monet.github.io/monet.js/
 */
(function(root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(typeof self !== "undefined" ? self : this, function() {
    "use strict";
    function assignImp(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key) && source[key] !== undefined) {
                target[key] = source[key];
            }
        }
        return target;
    }
    var assign = isFunction(Object.assign) ? Object.assign : assignImp;
    var Monet = {
        apply2: apply2,
        assign: assign,
        compose: compose,
        curry: curry(swap(curry), [])([]),
        idFunction: idFunction,
        isFunction: isFunction,
        noop: noop,
        swap: swap
    };
    var TYPE_KEY = "@@type";
    var LIB_NAME = "monet.js";
    var TYPES_NAMES = {
        Identity: "Identity",
        Maybe: "Maybe",
        Either: "Either",
        Validation: "Validation",
        List: "List",
        NEL: "NEL",
        IO: "IO",
        MonadT: "MonadT",
        Reader: "Reader",
        Free: "Free"
    };
    function setType(target, typeName) {
        target[TYPE_KEY] = LIB_NAME + "/" + typeName;
    }
    function isInstance(typeName) {
        return function(target) {
            return (target[TYPE_KEY] || target.constructor[TYPE_KEY]) === LIB_NAME + "/" + typeName;
        };
    }
    function isOfType(typeName) {
        return function(target) {
            var targetType = target[TYPE_KEY] || target.constructor && target.constructor[TYPE_KEY];
            return Boolean(targetType) && targetType.length >= typeName.length && targetType.indexOf(typeName) === targetType.length - typeName.length;
        };
    }
    function isNothing(value) {
        return value == null;
    }
    function isEmpty(value) {
        if (isNothing(value) || value === "") {
            return true;
        }
        if (Array.isArray(value) && value.length === 0) {
            return true;
        }
        if (typeof value === "object") {
            return Object.keys(value).length === 0;
        }
        return false;
    }
    function noop() {}
    function getArgs(args) {
        return Array.prototype.slice.call(args);
    }
    function curry(fn, args) {
        return function() {
            var args1 = args.concat(getArgs(arguments));
            return args1.length >= fn.length ? fn.apply(null, args1.slice(0, args1.length)) : curry(fn, args1);
        };
    }
    function compose(f, g) {
        return function(x) {
            return f(g(x));
        };
    }
    function isFunction(f) {
        return Boolean(f && f.constructor && f.call && f.apply);
    }
    function idFunction(value) {
        return value;
    }
    function trueFunction() {
        return true;
    }
    function areEqual(a, b) {
        if (a === b || a !== a && b !== b) {
            return true;
        }
        if (!a || !b) {
            return false;
        }
        if (isFunction(a.equals) && isFunction(b.equals)) {
            return a.equals(b);
        }
        return false;
    }
    function equals(a) {
        return function(b) {
            return areEqual(a, b);
        };
    }
    function falseFunction() {
        return false;
    }
    function swap(f) {
        return function(a, b) {
            return f(b, a);
        };
    }
    function apply2(a1, a2, f) {
        return a2.ap(a1.map(curry(f, [])));
    }
    function listEquals(list1, list2) {
        var a = list1;
        var b = list2;
        while (!a.isNil && !b.isNil) {
            if (!equals(a.head())(b.head())) {
                return false;
            }
            a = a.tail();
            b = b.tail();
        }
        return a.isNil && b.isNil;
    }
    function listMapC(fn, l) {
        return l.isNil ? Return(l) : Suspend(function() {
            return listMapC(fn, l.tail());
        }).map(curry(cons, [])(fn(l.head())));
    }
    function listMap(fn, l) {
        return listMapC(fn, l).run();
    }
    function listFilter(list, fn) {
        return list.foldRight(Nil)(function(a, acc) {
            return fn(a) ? cons(a, acc) : acc;
        });
    }
    function listFindC(l, fn) {
        if (l.isNil) {
            return Return(None());
        }
        var h = l.head();
        return fn(h) ? Return(Some(h)) : Suspend(function() {
            return listFindC(l.tail(), fn);
        });
    }
    function listFind(l, fn) {
        return listFindC(l, fn).run();
    }
    function listContainsC(l, val) {
        if (l.isNil) {
            return Return(false);
        }
        var h = l.head();
        return areEqual(h, val) ? Return(true) : Suspend(function() {
            return listContainsC(l.tail(), val);
        });
    }
    function listContains(l, val) {
        return listContainsC(l, val).run();
    }
    function cons(head, tail) {
        return tail.cons(head);
    }
    function List() {
        switch (arguments.length) {
          case 0:
            return new List.fn.init();

          case 1:
            return new List.fn.init(arguments[0]);

          default:
            return new List.fn.init(arguments[0], arguments[1]);
        }
    }
    Monet.List = List;
    var listForEach = function(effectFn, l) {
        if (!l.isNil) {
            effectFn(l.head());
            listForEach(effectFn, l.tail());
        }
    };
    var foldLeft = function(fn, acc, list) {
        function fL(innerAcc, innerList) {
            return innerList.isNil ? Return(innerAcc) : Suspend(function() {
                return fL(fn(innerAcc, innerList.head()), innerList.tail());
            });
        }
        return fL(acc, list).run();
    };
    var foldRight = function(fn, list, acc) {
        function fR(innerList, innerAcc) {
            return innerList.isNil ? Return(innerAcc) : Suspend(function() {
                return fR(innerList.tail(), innerAcc);
            }).map(function(accumulated) {
                return fn(innerList.head(), accumulated);
            });
        }
        return fR(list, acc).run();
    };
    var append = function(self, other) {
        function appendFree(listA, listB) {
            return listA.isNil ? Return(listB) : Suspend(function() {
                return appendFree(listA.tail(), listB).map(function(list) {
                    return list.cons(listA.head());
                });
            });
        }
        return appendFree(self, other).run();
    };
    var sequence = function(list, type) {
        return list.foldRight(type.of(Nil))(type.map2(cons));
    };
    var sequenceValidation = function(list) {
        return list.foldLeft(Success(Nil))(function(acc, a) {
            return acc.ap(a.map(function(v) {
                return function(t) {
                    return cons(v, t);
                };
            }));
        }).map(listReverse);
    };
    var listReverse = function(list) {
        return list.foldLeft(Nil)(swap(cons));
    };
    var listAp = function(list1, list2) {
        return list1.bind(function(x) {
            return list2.map(function(f) {
                return f(x);
            });
        });
    };
    var Nil;
    List.fn = List.prototype = {
        init: function() {
            var head = arguments[0];
            var tail = arguments[1];
            if (arguments.length === 0) {
                this.isNil = true;
                this.size_ = 0;
            } else {
                this.isNil = false;
                this.head_ = head;
                this.tail_ = tail || Nil;
                this.size_ = this.tail_.size() + 1;
            }
            setType(this, TYPES_NAMES.List);
        },
        of: function(value) {
            return new List(value);
        },
        size: function() {
            return this.size_;
        },
        equals: function(other) {
            return (List.isOfType(other) || NEL.isOfType(other)) && listEquals(this, other);
        },
        cons: function(head) {
            return List(head, this);
        },
        snoc: function(element) {
            return this.concat(List(element));
        },
        map: function(fn) {
            return listMap(fn, this);
        },
        toArray: function() {
            return foldLeft(function(acc, e) {
                acc.push(e);
                return acc;
            }, [], this);
        },
        toSet: function() {
            return new Set(this);
        },
        foldLeft: function(initialValue) {
            var self = this;
            return function(fn) {
                return foldLeft(fn, initialValue, self);
            };
        },
        foldRight: function(initialValue) {
            var self = this;
            return function(fn) {
                return foldRight(fn, self, initialValue);
            };
        },
        append: function(list2) {
            return append(this, list2);
        },
        filter: function(fn) {
            return listFilter(this, fn);
        },
        find: function(fn) {
            return listFind(this, fn);
        },
        flatten: function() {
            return foldRight(append, this, Nil);
        },
        flattenMaybe: function() {
            return this.flatMap(Maybe.toList);
        },
        reverse: function() {
            return listReverse(this);
        },
        bind: function(fn) {
            return this.map(fn).flatten();
        },
        forEach: function(effectFn) {
            listForEach(effectFn, this);
        },
        contains: function(val) {
            return listContains(this, val);
        },
        sequenceMaybe: function() {
            return sequence(this, Maybe);
        },
        sequenceValidation: function() {
            return sequenceValidation(this);
        },
        sequenceEither: function() {
            return sequence(this, Either);
        },
        sequenceIO: function() {
            return sequence(this, IO);
        },
        sequenceReader: function() {
            return sequence(this, Reader);
        },
        sequence: function(monadType) {
            return sequence(this, monadType);
        },
        head: function() {
            return this.head_;
        },
        headMaybe: function() {
            return this.isNil ? None() : Some(this.head_);
        },
        tail: function() {
            return this.isNil ? Nil : this.tail_;
        },
        tails: function() {
            return this.isNil ? List(Nil, Nil) : this.tail().tails().cons(this);
        },
        ap: function(list) {
            return listAp(this, list);
        },
        isNEL: falseFunction,
        toString: function() {
            return this.isNil ? "Nil" : "List(" + this.toArray().join(", ") + ")";
        },
        inspect: function() {
            return this.toString();
        }
    };
    List.fn.init.prototype = List.fn;
    setType(List, TYPES_NAMES.List);
    setType(List.fn.init, TYPES_NAMES.List);
    List.isInstance = isInstance(TYPES_NAMES.List);
    List.isOfType = isOfType(TYPES_NAMES.List);
    List.prototype.empty = function() {
        return Nil;
    };
    List.fromArray = function(array) {
        return array.reduceRight(function(acc, next) {
            return acc.cons(next);
        }, Nil);
    };
    List.from = function(iterable) {
        return List.fromArray(Array.from(iterable));
    };
    List.of = function(a) {
        return new List(a, Nil);
    };
    List.prototype.each = List.prototype.forEach;
    Nil = Monet.Nil = new List.fn.init();
    function emptyNELError(head) {
        return new Error("Cannot create an empty Non-Empty List. Passed head is " + head + ".");
    }
    function NEL(head, tail) {
        if (isNothing(head)) {
            throw emptyNELError(head);
        }
        return new NEL.fn.init(head, tail);
    }
    Monet.NEL = Monet.NonEmptyList = NEL;
    NEL.of = function(a) {
        return NEL(a, Nil);
    };
    NEL.fn = NEL.prototype = {
        init: function(head, tail) {
            if (isNothing(head)) {
                throw emptyNELError(head);
            } else {
                this.isNil = false;
                this.head_ = head;
                this.tail_ = isNothing(tail) ? Nil : tail;
                this.size_ = this.tail_.size() + 1;
            }
            setType(this, TYPES_NAMES.NEL);
        },
        equals: function(other) {
            return List.isOfType(other) || NEL.isOfType(other) && listEquals(this, other);
        },
        cons: function(head) {
            return NEL(head, this.toList());
        },
        snoc: function(element) {
            return this.concat(NEL(element));
        },
        map: function(fn) {
            return NEL(fn(this.head_), listMap(fn, this.tail_));
        },
        bind: function(fn) {
            var p = fn(this.head_);
            if (!p.isNEL()) {
                throw new Error("NEL.fn.bind: Passed function must return a NonEmptyList.");
            }
            var list = this.tail().foldLeft(Nil.snoc(p.head()).append(p.tail()))(function(acc, e) {
                var list2 = fn(e).toList();
                return acc.snoc(list2.head()).append(list2.tail());
            });
            return new NEL(list.head(), list.tail());
        },
        head: function() {
            return this.head_;
        },
        tail: function() {
            return this.tail_;
        },
        tails: function() {
            var listsOfNels = this.toList().tails().map(NEL.fromList).flattenMaybe();
            return NEL(listsOfNels.head(), listsOfNels.tail());
        },
        toList: function() {
            return List(this.head_, this.tail_);
        },
        reverse: function() {
            if (this.tail().isNil) {
                return this;
            }
            var reversedTail = this.tail().reverse();
            return NEL(reversedTail.head(), reversedTail.tail().append(List(this.head())));
        },
        foldLeft: function(initialValue) {
            return this.toList().foldLeft(initialValue);
        },
        foldRight: function(initialValue) {
            return this.toList().foldRight(initialValue);
        },
        reduceLeft: function(fn) {
            return this.tail().foldLeft(this.head())(fn);
        },
        filter: function(fn) {
            return listFilter(this.toList(), fn);
        },
        find: function(fn) {
            return listFind(this.toList(), fn);
        },
        flatten: function() {
            return foldRight(append, this.toList().map(function(l) {
                return l.isNEL() ? l.toList() : l;
            }), Nil);
        },
        flattenMaybe: function() {
            return this.toList().flatMap(Maybe.toList);
        },
        contains: function(val) {
            return listContains(this.toList(), val);
        },
        append: function(list2) {
            return NEL.fromList(this.toList().append(list2.toList())).some();
        },
        cobind: function(fn) {
            return this.cojoin().map(fn);
        },
        size: function() {
            return this.size_;
        },
        forEach: function(fn) {
            return this.toList().forEach(fn);
        },
        isNEL: trueFunction,
        toString: function() {
            return "NEL(" + this.toArray().join(", ") + ")";
        },
        inspect: function() {
            return this.toString();
        }
    };
    NEL.fromList = function(list) {
        return list.isNil ? None() : Some(NEL(list.head(), list.tail()));
    };
    NEL.fromArray = function(array) {
        return NEL.fromList(List.fromArray(array));
    };
    NEL.from = function(iterable) {
        return NEL.fromList(List.from(iterable));
    };
    NEL.fn.init.prototype = NEL.fn;
    setType(NEL, TYPES_NAMES.NEL);
    setType(NEL.fn.init, TYPES_NAMES.NEL);
    NEL.isInstance = isInstance(TYPES_NAMES.NEL);
    NEL.isOfType = isOfType(TYPES_NAMES.NEL);
    NEL.prototype.toArray = List.prototype.toArray;
    NEL.prototype.toSet = List.prototype.toSet;
    NEL.prototype.extract = NEL.prototype.copure = NEL.prototype.head;
    NEL.prototype.cojoin = NEL.prototype.tails;
    NEL.prototype.coflatMap = NEL.prototype.mapTails = NEL.prototype.cobind;
    NEL.prototype.ap = List.prototype.ap;
    var Maybe = Monet.Maybe = {};
    Maybe.fromFalsy = function(val) {
        return !val ? Maybe.None() : Maybe.Some(val);
    };
    Maybe.fromNull = function(val) {
        return isNothing(val) ? Maybe.None() : Maybe.Some(val);
    };
    Maybe.fromUndefined = function(val) {
        return val === undefined ? Maybe.None() : Maybe.Some(val);
    };
    Maybe.fromEmpty = function(val) {
        return isEmpty(val) ? Maybe.None() : Maybe.Some(val);
    };
    Maybe.of = function(a) {
        return Some(a);
    };
    var Some = Maybe.Just = Maybe.Some = Maybe.some = Monet.Some = Monet.Just = function(val) {
        return new Maybe.fn.init(true, val);
    };
    var None = Maybe.Nothing = Maybe.None = Maybe.none = Monet.None = Monet.Nothing = function() {
        return new Maybe.fn.init(false, null);
    };
    Maybe.toList = function(maybe) {
        return maybe.toList();
    };
    Maybe.fn = Maybe.prototype = {
        init: function(isValue, val) {
            this.isValue = isValue;
            if (isValue && isNothing(val)) {
                throw new Error("Can not create Some with illegal value: " + val + ".");
            }
            this.val = val;
            setType(this, TYPES_NAMES.Maybe);
        },
        isSome: function() {
            return this.isValue;
        },
        isNone: function() {
            return !this.isSome();
        },
        bind: function(bindFn) {
            return this.isValue ? bindFn(this.val) : this;
        },
        some: function() {
            if (this.isValue) {
                return this.val;
            }
            throw new Error("Cannot call .some() on a None.");
        },
        orSome: function(otherValue) {
            return this.isValue ? this.val : otherValue;
        },
        orLazy: function(getOtherValue) {
            return this.cata(getOtherValue, idFunction);
        },
        orNull: function() {
            return this.orSome(null);
        },
        orUndefined: function() {
            return this.orSome(undefined);
        },
        orElse: function(maybe) {
            return this.catchMap(function() {
                return maybe;
            });
        },
        ap: function(maybeWithFunction) {
            var value = this.val;
            return this.isValue ? maybeWithFunction.map(function(fn) {
                return fn(value);
            }) : this;
        },
        equals: function(other) {
            return Maybe.isOfType(other) && this.cata(function() {
                return other.isNone();
            }, function(val) {
                return other.fold(false)(equals(val));
            });
        },
        toArray: function() {
            return this.map(function(val) {
                return [ val ];
            }).orLazy(function() {
                return [];
            });
        },
        toSet: function() {
            return new Set(this);
        },
        toList: function() {
            return this.map(List).orLazy(function() {
                return Nil;
            });
        },
        toEither: function(failVal) {
            return this.isSome() ? Right(this.val) : Left(failVal);
        },
        toValidation: function(failVal) {
            return this.isSome() ? Success(this.val) : Fail(failVal);
        },
        fold: function(defaultValue) {
            var self = this;
            return function(fn) {
                return self.isSome() ? fn(self.val) : defaultValue;
            };
        },
        foldLeft: function(initialValue) {
            return this.toList().foldLeft(initialValue);
        },
        foldRight: function(initialValue) {
            return this.toList().foldRight(initialValue);
        },
        cata: function(none, some) {
            return this.isSome() ? some(this.val) : none();
        },
        catchMap: function(fn) {
            return this.isSome() ? this : fn();
        },
        filter: function(fn) {
            var self = this;
            return self.flatMap(function(a) {
                return fn(a) ? self : None();
            });
        },
        orNoneIf: function(bool) {
            return bool ? None() : this;
        },
        contains: function(val) {
            return this.isSome() ? areEqual(this.val, val) : false;
        },
        forEach: function(fn) {
            this.cata(noop, fn);
        },
        orElseRun: function(fn) {
            this.cata(fn, noop);
        },
        toString: function() {
            return this.isSome() ? "Just(" + this.val + ")" : "Nothing";
        },
        inspect: function() {
            return this.toString();
        }
    };
    Maybe.prototype.orJust = Maybe.prototype.getOrElse = Maybe.prototype.orSome;
    Maybe.prototype.just = Maybe.prototype.some;
    Maybe.prototype.isJust = Maybe.prototype.isSome;
    Maybe.prototype.isNothing = Maybe.prototype.isNone;
    Maybe.prototype.orNothingIf = Maybe.prototype.orNoneIf;
    Maybe.fn.init.prototype = Maybe.fn;
    setType(Maybe, TYPES_NAMES.Maybe);
    setType(Maybe.fn.init, TYPES_NAMES.Maybe);
    Maybe.isInstance = isInstance(TYPES_NAMES.Maybe);
    Maybe.isOfType = isOfType(TYPES_NAMES.Maybe);
    var Validation = Monet.Validation = {};
    var Success = Validation.Success = Validation.success = Monet.Success = function(val) {
        return new Validation.fn.init(val, true);
    };
    var Fail = Validation.Fail = Validation.fail = Monet.Fail = function(error) {
        return new Validation.fn.init(error, false);
    };
    Validation.of = function(v) {
        return Success(v);
    };
    Validation.fn = Validation.prototype = {
        init: function(val, success) {
            this.val = val;
            this.isSuccessValue = success;
            setType(this, TYPES_NAMES.Validation);
        },
        success: function() {
            if (this.isSuccess()) {
                return this.val;
            }
            throw new Error("Cannot call success() on a Fail.");
        },
        isSuccess: function() {
            return this.isSuccessValue;
        },
        isFail: function() {
            return !this.isSuccessValue;
        },
        fail: function() {
            if (this.isSuccess()) {
                throw new Error("Cannot call fail() on a Success.");
            }
            return this.val;
        },
        bind: function(fn) {
            return this.isSuccess() ? fn(this.val) : this;
        },
        ap: function(validationWithFn) {
            var value = this.val;
            return this.isSuccess() ? validationWithFn.map(function(fn) {
                return fn(value);
            }) : validationWithFn.isFail() ? Validation.Fail(Semigroup.append(value, validationWithFn.fail())) : this;
        },
        acc: function() {
            var x = function() {
                return x;
            };
            return this.isSuccessValue ? Validation.success(x) : this;
        },
        foldLeft: function(initialValue) {
            return this.toMaybe().toList().foldLeft(initialValue);
        },
        foldRight: function(initialValue) {
            return this.toMaybe().toList().foldRight(initialValue);
        },
        cata: function(fail, success) {
            return this.isSuccessValue ? success(this.val) : fail(this.val);
        },
        catchMap: function(fn) {
            return this.isSuccess() ? this : fn(this.val);
        },
        swap: function() {
            return this.isSuccess() ? Fail(this.val) : Success(this.val);
        },
        failMap: function(fn) {
            return this.isFail() ? Fail(fn(this.val)) : this;
        },
        bimap: function(fail, success) {
            return this.isSuccessValue ? this.map(success) : this.failMap(fail);
        },
        forEach: function(fn) {
            this.cata(noop, fn);
        },
        forEachFail: function(fn) {
            this.cata(fn, noop);
        },
        equals: function(other) {
            return Validation.isOfType(other) && this.cata(function(fail) {
                return other.cata(equals(fail), falseFunction);
            }, function(success) {
                return other.cata(falseFunction, equals(success));
            });
        },
        toMaybe: function() {
            return this.isSuccess() ? Some(this.val) : None();
        },
        toEither: function() {
            return (this.isSuccess() ? Right : Left)(this.val);
        },
        toString: function() {
            return (this.isSuccess() ? "Success(" : "Fail(") + this.val + ")";
        },
        inspect: function() {
            return this.toString();
        }
    };
    Validation.prototype.fold = Validation.prototype.cata;
    Validation.fn.init.prototype = Validation.fn;
    setType(Validation, TYPES_NAMES.Validation);
    setType(Validation.fn.init, TYPES_NAMES.Validation);
    Validation.isInstance = isInstance(TYPES_NAMES.Validation);
    Validation.isOfType = isOfType(TYPES_NAMES.Validation);
    var Semigroup = Monet.Semigroup = {
        append: function(a, b) {
            if (isFunction(a.concat)) {
                return a.concat(b);
            }
            throw new Error("Couldn't find a semigroup appender in the environment, " + "please specify your own append function");
        }
    };
    var MonadT = Monet.monadTransformer = Monet.MonadT = Monet.monadT = function(monad) {
        return new MonadT.fn.init(monad);
    };
    MonadT.of = function(m) {
        return MonadT(m);
    };
    MonadT.fn = MonadT.prototype = {
        init: function(monad) {
            this.monad = monad;
            setType(Validation, TYPES_NAMES.MonadT);
        },
        map: function(fn) {
            return MonadT(this.monad.map(function(v) {
                return v.map(fn);
            }));
        },
        bind: function(fn) {
            return MonadT(this.monad.map(function(v) {
                return v.flatMap(fn);
            }));
        },
        ap: function(monadWithFn) {
            return MonadT(this.monad.flatMap(function(v) {
                return monadWithFn.perform().map(function(v2) {
                    return v.ap(v2);
                });
            }));
        },
        perform: function() {
            return this.monad;
        }
    };
    MonadT.fn.init.prototype = MonadT.fn;
    var IO = Monet.IO = Monet.io = function(effectFn) {
        return new IO.fn.init(effectFn);
    };
    IO.of = function(a) {
        return IO(function() {
            return a;
        });
    };
    IO.fn = IO.prototype = {
        init: function(effectFn) {
            if (!isFunction(effectFn)) {
                throw new Error("IO requires a function.");
            }
            this.effectFn = effectFn;
            setType(this, TYPES_NAMES.IO);
        },
        map: function(fn) {
            var self = this;
            return IO(function() {
                return fn(self.effectFn());
            });
        },
        bind: function(fn) {
            var self = this;
            return IO(function() {
                return fn(self.effectFn()).run();
            });
        },
        ap: function(ioWithFn) {
            var self = this;
            return ioWithFn.map(function(fn) {
                return fn(self.effectFn());
            });
        },
        run: function() {
            return this.effectFn();
        }
    };
    IO.fn.init.prototype = IO.fn;
    setType(IO, TYPES_NAMES.IO);
    setType(IO.fn.init, TYPES_NAMES.IO);
    IO.isInstance = isInstance(TYPES_NAMES.IO);
    IO.isOfType = isOfType(TYPES_NAMES.IO);
    IO.prototype.perform = IO.prototype.performUnsafeIO = IO.prototype.run;
    var Either = Monet.Either = {};
    Either.of = function(a) {
        return Right(a);
    };
    Either.fromTry = function(fn) {
        try {
            return Either.right(fn());
        } catch (e) {
            return Either.left(e);
        }
    };
    Either.fromPromise = function(promise) {
        return promise.then(Either.Right, Either.Left);
    };
    var Right = Either.Right = Either.right = Monet.Right = function(val) {
        return new Either.fn.init(val, true);
    };
    var Left = Either.Left = Either.left = Monet.Left = function(val) {
        return new Either.fn.init(val, false);
    };
    Either.fn = Either.prototype = {
        init: function(val, isRightValue) {
            this.isRightValue = isRightValue;
            this.value = val;
            setType(this, TYPES_NAMES.Either);
        },
        bind: function(fn) {
            return this.isRightValue ? fn(this.value) : this;
        },
        ap: function(eitherWithFn) {
            var self = this;
            return this.isRightValue ? eitherWithFn.map(function(fn) {
                return fn(self.value);
            }) : this;
        },
        leftMap: function(fn) {
            return this.isLeft() ? Left(fn(this.value)) : this;
        },
        isRight: function() {
            return this.isRightValue;
        },
        isLeft: function() {
            return !this.isRight();
        },
        right: function() {
            if (this.isRightValue) {
                return this.value;
            }
            throw new Error("Cannot call right() on a Left.");
        },
        left: function() {
            if (this.isRightValue) {
                throw new Error("Cannot call left() on a Right.");
            }
            return this.value;
        },
        foldLeft: function(initialValue) {
            return this.toMaybe().toList().foldLeft(initialValue);
        },
        foldRight: function(initialValue) {
            return this.toMaybe().toList().foldRight(initialValue);
        },
        cata: function(leftFn, rightFn) {
            return this.isRightValue ? rightFn(this.value) : leftFn(this.value);
        },
        catchMap: function(fn) {
            return this.isRight() ? this : fn(this.value);
        },
        swap: function() {
            return this.isRight() ? Left(this.value) : Right(this.value);
        },
        forEach: function(fn) {
            this.cata(noop, fn);
        },
        forEachLeft: function(fn) {
            this.cata(fn, noop);
        },
        equals: function(other) {
            return Either.isOfType(other) && this.cata(function(left) {
                return other.cata(equals(left), falseFunction);
            }, function(right) {
                return other.cata(falseFunction, equals(right));
            });
        },
        bimap: function(leftFn, rightFn) {
            return this.isRightValue ? this.map(rightFn) : this.leftMap(leftFn);
        },
        toMaybe: function() {
            return this.isRight() ? Some(this.value) : None();
        },
        toValidation: function() {
            return this.isRight() ? Success(this.value) : Fail(this.value);
        },
        toString: function() {
            return this.cata(function(left) {
                return "Left(" + left + ")";
            }, function(right) {
                return "Right(" + right + ")";
            });
        },
        toPromise: function() {
            return this.cata(function(left) {
                return Promise.reject(left);
            }, function(right) {
                return Promise.resolve(right);
            });
        },
        inspect: function() {
            return this.toString();
        }
    };
    Either.prototype.fold = Either.prototype.cata;
    Either.fn.init.prototype = Either.fn;
    setType(Either, TYPES_NAMES.Either);
    setType(Either.fn.init, TYPES_NAMES.Either);
    Either.isInstance = isInstance(TYPES_NAMES.Either);
    Either.isOfType = isOfType(TYPES_NAMES.Either);
    var Reader = Monet.Reader = function(fn) {
        return new Reader.fn.init(fn);
    };
    Reader.of = function(x) {
        return Reader(function(_) {
            return x;
        });
    };
    Reader.ask = function() {
        return Reader(idFunction);
    };
    Reader.fn = Reader.prototype = {
        init: function(fn) {
            this.f = fn;
            setType(this, TYPES_NAMES.Reader);
        },
        run: function(config) {
            return this.f(config);
        },
        bind: function(fn) {
            var self = this;
            return Reader(function(config) {
                return fn(self.run(config)).run(config);
            });
        },
        ap: function(readerWithFn) {
            var self = this;
            return readerWithFn.bind(function(fn) {
                return Reader(function(config) {
                    return fn(self.run(config));
                });
            });
        },
        map: function(fn) {
            var self = this;
            return Reader(function(config) {
                return fn(self.run(config));
            });
        },
        local: function(fn) {
            var self = this;
            return Reader(function(c) {
                return self.run(fn(c));
            });
        }
    };
    Reader.fn.init.prototype = Reader.fn;
    setType(Reader, TYPES_NAMES.Reader);
    setType(Reader.fn.init, TYPES_NAMES.Reader);
    Reader.isInstance = isInstance(TYPES_NAMES.Reader);
    Reader.isOfType = isOfType(TYPES_NAMES.Reader);
    var Free = Monet.Free = {};
    var Suspend = Free.Suspend = Monet.Suspend = function(functor) {
        return new Free.fn.init(functor, true);
    };
    var Return = Free.Return = Monet.Return = function(val) {
        return new Free.fn.init(val, false);
    };
    Free.of = function(a) {
        return Return(a);
    };
    Free.liftF = function(functor) {
        return isFunction(functor) ? Suspend(compose(Return, functor)) : Suspend(functor.map(Return));
    };
    Free.fn = Free.prototype = {
        init: function(val, isSuspend) {
            this.isSuspend = isSuspend;
            if (isSuspend) {
                this.functor = val;
            } else {
                this.val = val;
            }
            setType(this, TYPES_NAMES.Free);
        },
        run: function() {
            return this.go(function(f) {
                return f();
            });
        },
        bind: function(fn) {
            return this.isSuspend ? isFunction(this.functor) ? Suspend(compose(function(free) {
                return free.bind(fn);
            }, this.functor)) : Suspend(this.functor.map(function(free) {
                return free.bind(fn);
            })) : fn(this.val);
        },
        ap: function(ff) {
            return this.bind(function(x) {
                return ff.map(function(f) {
                    return f(x);
                });
            });
        },
        resume: function() {
            return this.isSuspend ? Left(this.functor) : Right(this.val);
        },
        go1: function(f) {
            function go2(t) {
                return t.resume().cata(function(functor) {
                    return go2(f(functor));
                }, idFunction);
            }
            return go2(this);
        },
        go: function(f) {
            var result = this.resume();
            while (result.isLeft()) {
                var next = f(result.left());
                result = next.resume();
            }
            return result.right();
        }
    };
    Free.fn.init.prototype = Free.fn;
    setType(Free, TYPES_NAMES.Free);
    setType(Free.fn.init, TYPES_NAMES.Free);
    Free.isInstance = isInstance(TYPES_NAMES.Free);
    Free.isOfType = isOfType(TYPES_NAMES.Free);
    function Identity(a) {
        return new Identity.fn.init(a);
    }
    Monet.Identity = Identity;
    Identity.of = function(a) {
        return new Identity(a);
    };
    Identity.fn = Identity.prototype = {
        init: function(val) {
            this.val = val;
            setType(this, TYPES_NAMES.Identity);
        },
        bind: function(fn) {
            return fn(this.val);
        },
        get: function() {
            return this.val;
        },
        forEach: function(fn) {
            fn(this.val);
        },
        equals: function(other) {
            return Identity.isOfType(other) && equals(this.get())(other.get());
        },
        contains: function(val) {
            return areEqual(this.val, val);
        },
        toString: function() {
            return "Identity(" + this.val + ")";
        },
        inspect: function() {
            return this.toString();
        },
        ap: function(applyWithFunction) {
            var value = this.val;
            return applyWithFunction.map(function(fn) {
                return fn(value);
            });
        },
        toArray: function() {
            return [ this.get() ];
        },
        toList: function() {
            return List(this.get(), Nil);
        },
        toSet: function() {
            return new Set(this);
        }
    };
    Identity.fn.init.prototype = Identity.fn;
    setType(Identity, TYPES_NAMES.Identity);
    setType(Identity.fn.init, TYPES_NAMES.Identity);
    Identity.isInstance = isInstance(TYPES_NAMES.Identity);
    Identity.isOfType = isOfType(TYPES_NAMES.Identity);
    function addFantasyLandAliases(type) {
        [ "equals", "map", "ap", "chain" ].filter(function(method) {
            return isFunction(type.prototype[method]);
        }).forEach(function(method) {
            type.prototype["fantasy-land/" + method] = type.prototype[method];
        });
    }
    function addAliases(type) {
        type.prototype.flatMap = type.prototype.chain = type.prototype.bind;
        type.pure = type.unit = type.of;
        type.prototype.of = type.of;
        if (isFunction(type.prototype.append)) {
            type.prototype.concat = type.prototype.append;
        }
        type.prototype.point = type.prototype.pure = type.prototype.unit = type.prototype.of;
    }
    function addFilterNot(type) {
        if (isFunction(type.prototype.filter)) {
            type.prototype.filterNot = function(fn) {
                return this.filter(function(a) {
                    return !fn(a);
                });
            };
        }
    }
    function addMonadOps(type) {
        type.prototype.join = function() {
            return this.flatMap(idFunction);
        };
        type.map2 = function(fn) {
            return function(ma, mb) {
                return ma.flatMap(function(a) {
                    return mb.map(function(b) {
                        return fn(a, b);
                    });
                });
            };
        };
    }
    function addFunctorOps(type) {
        if (!isFunction(type.prototype.map)) {
            type.prototype.map = function(fn) {
                return this.bind(compose(this.of, fn));
            };
        }
    }
    function addApplicativeOps(type) {
        type.prototype.takeLeft = function(m) {
            return apply2(this, m, function(a, b) {
                return a;
            });
        };
        type.prototype.takeRight = function(m) {
            return apply2(this, m, function(a, b) {
                return b;
            });
        };
    }
    function addCollectionPredicates(type) {
        if (isFunction(type.prototype.toArray)) {
            type.prototype.every = type.prototype.forall = function(fn) {
                return this.toArray().every(fn);
            };
            type.prototype.exists = function(fn) {
                return this.toArray().some(fn);
            };
        }
    }
    function makeIterable(type) {
        if (isFunction(type.prototype.toArray)) {
            type.prototype[Symbol.iterator] = function() {
                return this.toArray()[Symbol.iterator]();
            };
        }
    }
    function addToOperator(type) {
        if (isFunction(type.prototype.toArray)) {
            type.prototype.to = function(ctor) {
                return ctor(this);
            };
        }
    }
    function decorate(type) {
        addAliases(type);
        addFilterNot(type);
        addMonadOps(type);
        addFunctorOps(type);
        addApplicativeOps(type);
        addCollectionPredicates(type);
        addFantasyLandAliases(type);
        makeIterable(type);
        addToOperator(type);
    }
    decorate(MonadT);
    decorate(Either);
    decorate(Maybe);
    decorate(IO);
    decorate(NEL);
    decorate(List);
    decorate(Validation);
    decorate(Reader);
    decorate(Free);
    decorate(Identity);
    return Monet;
});

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/ste-signals/dist/index.js":
/*!************************************************!*\
  !*** ./node_modules/ste-signals/dist/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalList = exports.SignalHandlingBase = exports.SignalDispatcher = void 0;
var signals_1 = __webpack_require__(/*! ./signals */ "./node_modules/ste-signals/dist/signals.js");
Object.defineProperty(exports, "SignalDispatcher", { enumerable: true, get: function () { return signals_1.SignalDispatcher; } });
Object.defineProperty(exports, "SignalHandlingBase", { enumerable: true, get: function () { return signals_1.SignalHandlingBase; } });
Object.defineProperty(exports, "SignalList", { enumerable: true, get: function () { return signals_1.SignalList; } });


/***/ }),

/***/ "./node_modules/ste-signals/dist/signals.js":
/*!**************************************************!*\
  !*** ./node_modules/ste-signals/dist/signals.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalHandlingBase = exports.SignalList = exports.SignalDispatcher = void 0;
var ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-signals/node_modules/ste-core/dist/index.js");
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 */
var SignalDispatcher = /** @class */ (function (_super) {
    __extends(SignalDispatcher, _super);
    /**
     * Creates a new SignalDispatcher instance.
     */
    function SignalDispatcher() {
        return _super.call(this) || this;
    }
    /**
     * Dispatches the signal.
     */
    SignalDispatcher.prototype.dispatch = function () {
        this._dispatch(false, this, arguments);
    };
    /**
     * Dispatches the signal threaded.
     */
    SignalDispatcher.prototype.dispatchAsync = function () {
        this._dispatch(true, this, arguments);
    };
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    SignalDispatcher.prototype.asEvent = function () {
        return _super.prototype.asEvent.call(this);
    };
    return SignalDispatcher;
}(ste_core_1.DispatcherBase));
exports.SignalDispatcher = SignalDispatcher;
/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
var SignalList = /** @class */ (function (_super) {
    __extends(SignalList, _super);
    /**
     * Creates a new SignalList instance.
     */
    function SignalList() {
        return _super.call(this) || this;
    }
    /**
     * Creates a new dispatcher instance.
     */
    SignalList.prototype.createDispatcher = function () {
        return new SignalDispatcher();
    };
    return SignalList;
}(ste_core_1.EventListBase));
exports.SignalList = SignalList;
/**
 * Extends objects with signal event handling capabilities.
 */
var SignalHandlingBase = /** @class */ (function () {
    function SignalHandlingBase() {
        this._events = new SignalList();
    }
    Object.defineProperty(SignalHandlingBase.prototype, "events", {
        get: function () {
            return this._events;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.one = function (name, fn) {
        this._events.get(name).one(fn);
    };
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.has = function (name, fn) {
        return this._events.get(name).has(fn);
    };
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.subscribe = function (name, fn) {
        this._events.get(name).subscribe(fn);
    };
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.sub = function (name, fn) {
        this.subscribe(name, fn);
    };
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.unsubscribe = function (name, fn) {
        this._events.get(name).unsubscribe(fn);
    };
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.unsub = function (name, fn) {
        this.unsubscribe(name, fn);
    };
    return SignalHandlingBase;
}());
exports.SignalHandlingBase = SignalHandlingBase;


/***/ }),

/***/ "./node_modules/ste-signals/node_modules/ste-core/dist/dispatching.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ste-signals/node_modules/ste-core/dist/dispatching.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatcherWrapper = exports.EventListBase = exports.DispatcherBase = void 0;
var management_1 = __webpack_require__(/*! ./management */ "./node_modules/ste-signals/node_modules/ste-core/dist/management.js");
var subscription_1 = __webpack_require__(/*! ./subscription */ "./node_modules/ste-signals/node_modules/ste-core/dist/subscription.js");
/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 */
var DispatcherBase = /** @class */ (function () {
    function DispatcherBase() {
        this._wrap = new DispatcherWrapper(this);
        this._subscriptions = new Array();
    }
    Object.defineProperty(DispatcherBase.prototype, "count", {
        /**
         * Returns the number of subscriptions.
         *
         * @readonly
         *
         * @memberOf DispatcherBase
         */
        get: function () {
            return this._subscriptions.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    DispatcherBase.prototype.subscribe = function (fn) {
        var _this = this;
        if (fn) {
            this._subscriptions.push(new subscription_1.Subscription(fn, false));
        }
        return function () {
            _this.unsubscribe(fn);
        };
    };
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    DispatcherBase.prototype.sub = function (fn) {
        return this.subscribe(fn);
    };
    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    DispatcherBase.prototype.one = function (fn) {
        var _this = this;
        if (fn) {
            this._subscriptions.push(new subscription_1.Subscription(fn, true));
        }
        return function () {
            _this.unsubscribe(fn);
        };
    };
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    DispatcherBase.prototype.has = function (fn) {
        if (!fn)
            return false;
        return this._subscriptions.some(function (sub) { return sub.handler == fn; });
    };
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    DispatcherBase.prototype.unsubscribe = function (fn) {
        if (!fn)
            return;
        for (var i = 0; i < this._subscriptions.length; i++) {
            if (this._subscriptions[i].handler == fn) {
                this._subscriptions.splice(i, 1);
                break;
            }
        }
    };
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    DispatcherBase.prototype.unsub = function (fn) {
        this.unsubscribe(fn);
    };
    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} The scope the scope of the event. The scope becomes the "this" for handler.
     * @param {IArguments} args The arguments for the event.
     */
    DispatcherBase.prototype._dispatch = function (executeAsync, scope, args) {
        var _this = this;
        var _loop_1 = function (sub) {
            var ev = new management_1.EventManagement(function () { return _this.unsub(sub.handler); });
            var nargs = Array.prototype.slice.call(args);
            nargs.push(ev);
            sub.execute(executeAsync, scope, nargs);
            //cleanup subs that are no longer needed
            this_1.cleanup(sub);
            if (!executeAsync && ev.propagationStopped) {
                return "break";
            }
        };
        var this_1 = this;
        //execute on a copy because of bug #9
        for (var _i = 0, _a = __spreadArrays(this._subscriptions); _i < _a.length; _i++) {
            var sub = _a[_i];
            var state_1 = _loop_1(sub);
            if (state_1 === "break")
                break;
        }
    };
    /**
     * Cleans up subs that ran and should run only once.
     */
    DispatcherBase.prototype.cleanup = function (sub) {
        if (sub.isOnce && sub.isExecuted) {
            var i = this._subscriptions.indexOf(sub);
            if (i > -1) {
                this._subscriptions.splice(i, 1);
            }
        }
    };
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    DispatcherBase.prototype.asEvent = function () {
        return this._wrap;
    };
    /**
     * Clears all the subscriptions.
     */
    DispatcherBase.prototype.clear = function () {
        this._subscriptions.splice(0, this._subscriptions.length);
    };
    return DispatcherBase;
}());
exports.DispatcherBase = DispatcherBase;
/**
 * Base class for event lists classes. Implements the get and remove.
 */
var EventListBase = /** @class */ (function () {
    function EventListBase() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    EventListBase.prototype.get = function (name) {
        var event = this._events[name];
        if (event) {
            return event;
        }
        event = this.createDispatcher();
        this._events[name] = event;
        return event;
    };
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    EventListBase.prototype.remove = function (name) {
        delete this._events[name];
    };
    return EventListBase;
}());
exports.EventListBase = EventListBase;
/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 */
var DispatcherWrapper = /** @class */ (function () {
    /**
     * Creates a new EventDispatcherWrapper instance.
     * @param dispatcher The dispatcher.
     */
    function DispatcherWrapper(dispatcher) {
        this._subscribe = function (fn) { return dispatcher.subscribe(fn); };
        this._unsubscribe = function (fn) { return dispatcher.unsubscribe(fn); };
        this._one = function (fn) { return dispatcher.one(fn); };
        this._has = function (fn) { return dispatcher.has(fn); };
        this._clear = function () { return dispatcher.clear(); };
        this._count = function () { return dispatcher.count; };
    }
    Object.defineProperty(DispatcherWrapper.prototype, "count", {
        /**
         * Returns the number of subscriptions.
         *
         * @readonly
         * @type {number}
         * @memberOf DispatcherWrapper
         */
        get: function () {
            return this._count();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    DispatcherWrapper.prototype.subscribe = function (fn) {
        return this._subscribe(fn);
    };
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    DispatcherWrapper.prototype.sub = function (fn) {
        return this.subscribe(fn);
    };
    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    DispatcherWrapper.prototype.unsubscribe = function (fn) {
        this._unsubscribe(fn);
    };
    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    DispatcherWrapper.prototype.unsub = function (fn) {
        this.unsubscribe(fn);
    };
    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     */
    DispatcherWrapper.prototype.one = function (fn) {
        return this._one(fn);
    };
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    DispatcherWrapper.prototype.has = function (fn) {
        return this._has(fn);
    };
    /**
     * Clears all the subscriptions.
     */
    DispatcherWrapper.prototype.clear = function () {
        this._clear();
    };
    return DispatcherWrapper;
}());
exports.DispatcherWrapper = DispatcherWrapper;


/***/ }),

/***/ "./node_modules/ste-signals/node_modules/ste-core/dist/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ste-signals/node_modules/ste-core/dist/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = exports.EventListBase = exports.DispatcherWrapper = exports.DispatcherBase = void 0;
var dispatching_1 = __webpack_require__(/*! ./dispatching */ "./node_modules/ste-signals/node_modules/ste-core/dist/dispatching.js");
Object.defineProperty(exports, "DispatcherBase", { enumerable: true, get: function () { return dispatching_1.DispatcherBase; } });
Object.defineProperty(exports, "DispatcherWrapper", { enumerable: true, get: function () { return dispatching_1.DispatcherWrapper; } });
Object.defineProperty(exports, "EventListBase", { enumerable: true, get: function () { return dispatching_1.EventListBase; } });
var subscription_1 = __webpack_require__(/*! ./subscription */ "./node_modules/ste-signals/node_modules/ste-core/dist/subscription.js");
Object.defineProperty(exports, "Subscription", { enumerable: true, get: function () { return subscription_1.Subscription; } });


/***/ }),

/***/ "./node_modules/ste-signals/node_modules/ste-core/dist/management.js":
/*!***************************************************************************!*\
  !*** ./node_modules/ste-signals/node_modules/ste-core/dist/management.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManagement = void 0;
/**
 * Allows the user to interact with the event.
 *
 * @class EventManagement
 * @implements {IEventManagement}
 */
var EventManagement = /** @class */ (function () {
    function EventManagement(unsub) {
        this.unsub = unsub;
        this.propagationStopped = false;
    }
    EventManagement.prototype.stopPropagation = function () {
        this.propagationStopped = true;
    };
    return EventManagement;
}());
exports.EventManagement = EventManagement;


/***/ }),

/***/ "./node_modules/ste-signals/node_modules/ste-core/dist/subscription.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/ste-signals/node_modules/ste-core/dist/subscription.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
/**
 * Stores a handler. Manages execution meta data.
 * @class Subscription
 * @template TEventHandler
 */
var Subscription = /** @class */ (function () {
    /**
     * Creates an instance of Subscription.
     *
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed once.
     */
    function Subscription(handler, isOnce) {
        this.handler = handler;
        this.isOnce = isOnce;
        /**
         * Indicates if the subscription has been executed before.
         */
        this.isExecuted = false;
    }
    /**
     * Executes the handler.
     *
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} scope The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    Subscription.prototype.execute = function (executeAsync, scope, args) {
        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;
            var fn = this.handler;
            if (executeAsync) {
                setTimeout(function () {
                    fn.apply(scope, args);
                }, 1);
            }
            else {
                fn.apply(scope, args);
            }
        }
    };
    return Subscription;
}());
exports.Subscription = Subscription;


/***/ }),

/***/ "./src/Utils/Utils.ts":
/*!****************************!*\
  !*** ./src/Utils/Utils.ts ***!
  \****************************/
/*! exports provided: ensureEndsWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensureEndsWith", function() { return ensureEndsWith; });
function ensureEndsWith(src, suffix) {
    return src.endsWith(suffix) ? src : src + suffix;
}


/***/ }),

/***/ "./src/cchub-connector.ts":
/*!********************************!*\
  !*** ./src/cchub-connector.ts ***!
  \********************************/
/*! exports provided: connect, DriverInitializator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return connect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DriverInitializator", function() { return DriverInitializator; });
/* harmony import */ var _services_backoffice_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/backoffice-client */ "./src/services/backoffice-client.ts");
/* harmony import */ var _services_dynamic_import__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/dynamic-import */ "./src/services/dynamic-import.ts");
/* harmony import */ var _services_project_buffer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/project-buffer-service */ "./src/services/project-buffer-service.ts");
/* harmony import */ var _services_config_value_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/config-value-service */ "./src/services/config-value-service.ts");




class CCHub {
    constructor(properties) {
        Object.assign(this, properties);
    }
}
async function connect(ecommerceService, useProjectBuffer = true) {
    const backofficeClient = new _services_backoffice_client__WEBPACK_IMPORTED_MODULE_0__["BackOfficeApiClient"](ecommerceService.backofficeUrl);
    const integration = await backofficeClient.getIntegrationInfo(ecommerceService.tenantId, String(ecommerceService.getProductId()));
    const projectBufferService = new _services_project_buffer_service__WEBPACK_IMPORTED_MODULE_2__["ProjectBufferService"]({
        url: integration.projectsBufferUrl,
        tenantId: ecommerceService.tenantId
    });
    if (useProjectBuffer !== false) {
        projectBufferService
            .warmUp(5, 3, () => console.warn("Cannot ping project buffer... Retrying in 3 seconds."))
            .then(warmStatus => {
            if (!warmStatus) {
                console.warn("Project buffer was not warmed up.");
            }
        });
    }
    const driverLoader = (await Object(_services_dynamic_import__WEBPACK_IMPORTED_MODULE_1__["dynamicImport"])("ecommerceDriver", `${integration.uiFrameworkUrl}/drivers/${ecommerceService.driverFilename}`)).ecommerceDriver;
    const normalizeConfig = (config) => { var _a; return (_a = config["config"]) !== null && _a !== void 0 ? _a : config; };
    const input = new CCHub({
        attributes: integration.templateAttributes.slice(),
        config: normalizeConfig(JSON.parse(integration.config)),
        customersCanvasUrl: integration.customerCanvasUrl,
        uiFrameworkUrl: integration.uiFrameworkUrl,
        tenantId: ecommerceService.tenantId,
        token: await backofficeClient.getToken(ecommerceService.tenantId, ecommerceService.customerAuth.id, ecommerceService.domain)
    });
    const driverInitializator = new DriverInitializator(input, ecommerceService, driverLoader);
    return [await driverInitializator.getDriver(), projectBufferService];
}
class DriverInitializator {
    constructor(inputData, ecommerceService, driverLoader) {
        this.ecommerceService = ecommerceService;
        this.driverLoader = driverLoader;
        this.input = inputData;
    }
    async getDriver() {
        return await this.prepareDriver();
    }
    async prepareDriver() {
        const [settings, config] = this.prepareSettings();
        const editorLoader = (await Object(_services_dynamic_import__WEBPACK_IMPORTED_MODULE_1__["dynamicImport"])([{ importData: 'editor', url: `${this.input.uiFrameworkUrl}/editor.js`, isDefault: true }]))[0].editor;
        const driver = await this.driverLoader.init(this.ecommerceService.productModel, editorLoader, config, settings, this.ecommerceService.getBackToEditorData().orNull(), this.ecommerceService.quantity, this.ecommerceService.getUser());
        const newAttributes = this.input.attributes.map(attr => ({ name: attr.name, value: _services_config_value_service__WEBPACK_IMPORTED_MODULE_3__["ConfigValueService"].process(attr.value) }));
        driver.products.current.attributes.push(...newAttributes);
        return driver;
    }
    prepareSettings() {
        var _a;
        const settings = this.ecommerceService.getPluginSettings();
        settings["token"] = this.input.token;
        settings["tenantId"] = this.input.tenantId;
        settings["editorUrl"] = this.input.customersCanvasUrl;
        settings["customersCanvasBaseUrl"] = this.input.customersCanvasUrl;
        settings["customersCanvasUrl"] = this.input.customersCanvasUrl;
        const config = Object.assign({}, this.input.config);
        (_a = config.vars) !== null && _a !== void 0 ? _a : (config.vars = {});
        config.vars.token = this.input.token;
        config.vars.unitId = this.input.tenantId;
        config.vars.tenantId = this.input.tenantId;
        return [settings, config];
    }
}


/***/ }),

/***/ "./src/docket-manager/docket-manager-service.ts":
/*!******************************************************!*\
  !*** ./src/docket-manager/docket-manager-service.ts ***!
  \******************************************************/
/*! exports provided: DocketManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocketManagerService", function() { return DocketManagerService; });
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! monet */ "./node_modules/monet/dist/monet.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_document_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/document-service */ "./src/services/document-service.ts");
/* harmony import */ var _services_guid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/guid */ "./src/services/guid.ts");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utils/Utils */ "./src/Utils/Utils.ts");




class DocketManagerService {
    constructor({ backofficeUrl, tenantId, customerId, customerSignature, shopName, product }) {
        this._projectHandlers = [];
        this.getSelectedVariantId = () => this
            .getVariantId()
            .map(value => Number(value));
        this.getPluginSettings = () => ({
            language: new _services_document_service__WEBPACK_IMPORTED_MODULE_1__["DocumentService"](document).getLanguage(),
            customersCanvasUrl: this._settings.customersCanvasUrl || "",
            customersCanvasBaseUrl: this._settings.customersCanvasBaseUrl || ""
        });
        this.getBackToEditorData = () => this.getBackToEditorDataFromQueryString();
        this.getProductId = () => this._product.id;
        this.generateUserId = () => monet__WEBPACK_IMPORTED_MODULE_0__["Maybe"]
            .fromFalsy(this._customerId)
            .cata(() => this.getCurrentSessionId(), customerId => this.buildCustomersCanvasUserId(this.domain, customerId));
        this._backofficeUrl = backofficeUrl;
        this._tenantId = tenantId;
        this._customerId = customerId;
        this._customerSignature = customerSignature;
        this._shopName = shopName || "docket-manager";
        this._product = product;
        this._settings = {};
    }
    get backofficeUrl() { return this._backofficeUrl; }
    get tenantId() { return this._tenantId; }
    get domain() { return this._shopName; }
    get driverFilename() { return "default-driver.js"; }
    get customerAuth() { return { id: this.generateUserId(), signature: this._customerSignature }; }
    get productModel() { return this._product; }
    get quantity() {
        return this.getQuantity();
    }
    addProjectHandler(func) {
        this._projectHandlers.push(func);
    }
    addEditorExitHandler(editor) {
        editor.driver.cart.onSubmitting.subscribe(async () => {
            editor.driver.orders.current.props['hidden']['pdfUrl'] =
                Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_3__["ensureEndsWith"])(this.backofficeUrl, "/") + "api/services/app/Project/GetProjectPdfUrl" +
                    "?stateId=" + editor.driver.orders.current.props['stateId'] + "&userId=" + editor.driver.orders.current.props['userId'];
            const project = {
                productId: editor.driver.products.current.id,
                userId: editor.driver.orders.current.props["userId"],
                lineItems: [
                    Object.assign({
                        key: Object(_services_guid__WEBPACK_IMPORTED_MODULE_2__["Guid"])(),
                        quantity: editor.driver.orders.current.quantity
                    }, editor.driver.orders.current.props)
                ],
            };
            for (const func of this._projectHandlers) {
                await func(project);
            }
        });
    }
    updatePluginSettings(settings) {
        this._settings.customersCanvasBaseUrl = settings.customersCanvasBaseUrl;
        this._settings.customersCanvasUrl = settings.customersCanvasUrl;
    }
    getQuantity() {
        return Number.parseInt(document.getElementById("quantity-group").value) || 1;
    }
    getVariantId() {
        return monet__WEBPACK_IMPORTED_MODULE_0__["Maybe"].fromNull(null)
            .map(form => new window.FormData(form))
            .map(formdata => formdata.get("id"))
            .map(result => String(result));
    }
    getUser() {
        return { id: this.generateUserId() };
    }
    getCurrentSessionId() {
        const doc = new _services_document_service__WEBPACK_IMPORTED_MODULE_1__["DocumentService"](document);
        const cookies = doc.getCookies();
        return `docket_${cookies["docket_manager_session_guid"] ||
            Object(_services_guid__WEBPACK_IMPORTED_MODULE_2__["Guid"])()}`;
    }
    buildCustomersCanvasUserId(shopDomain, customerId) {
        return `${(shopDomain !== null && shopDomain !== void 0 ? shopDomain : "").split(".")[0]}_${customerId}`;
    }
    getBackToEditorDataFromQueryString() {
        const queryString = new URLSearchParams(window.location.search);
        return monet__WEBPACK_IMPORTED_MODULE_0__["Maybe"].of(queryString)
            .map(q => ({ key: q.get("key"), snapshot: q.get("snapshot") }))
            .flatMap(bte => bte.key !== null && bte.snapshot !== null ? monet__WEBPACK_IMPORTED_MODULE_0__["Maybe"].of(bte) : monet__WEBPACK_IMPORTED_MODULE_0__["Maybe"].Nothing());
    }
}


/***/ }),

/***/ "./src/editors/uiframework-editor.ts":
/*!*******************************************!*\
  !*** ./src/editors/uiframework-editor.ts ***!
  \*******************************************/
/*! exports provided: UIFrameworkEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIFrameworkEditor", function() { return UIFrameworkEditor; });
/* harmony import */ var _cchub_connector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cchub-connector */ "./src/cchub-connector.ts");
/* harmony import */ var ste_signals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ste-signals */ "./node_modules/ste-signals/dist/index.js");
/* harmony import */ var ste_signals__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ste_signals__WEBPACK_IMPORTED_MODULE_1__);


class UIFrameworkEditor {
    constructor({ container, ecommerceService }) {
        this.container = container;
        this.ecommerceService = ecommerceService;
        this.driver = null;
        this.projectBuffer = null;
        this.onCreating = new ste_signals__WEBPACK_IMPORTED_MODULE_1__["SignalDispatcher"]();
        this.onCreated = new ste_signals__WEBPACK_IMPORTED_MODULE_1__["SignalDispatcher"]();
    }
    async create(useProjectBuffer = true) {
        this.onCreating.dispatch();
        const [driver, projectBuffer] = await Object(_cchub_connector__WEBPACK_IMPORTED_MODULE_0__["connect"])(this.ecommerceService, useProjectBuffer);
        this.driver = driver;
        this.projectBuffer = projectBuffer;
        this.ecommerceService.addEditorExitHandler(this);
        await this.renderEditor();
        this.onCreated.dispatch();
        return this.driver;
    }
    async addProjectHandler(func) {
        this.ecommerceService.addProjectHandler(func);
    }
    async renderEditor() {
        const editorHolder = document.createElement("div");
        editorHolder.style.height = "100%";
        this.container.appendChild(editorHolder);
        this.driver.products.current.renderEditor(editorHolder);
        this.syncronizeOptions();
        return new Promise((resolve, reject) => {
            this.container.addEventListener('load', resolve);
            this.container.addEventListener('error', reject);
        });
    }
    syncronizeOptions() {
        this.driver.orders.current.quantity = this.ecommerceService.quantity;
        const maybeSelectedVariantId = this.ecommerceService.getSelectedVariantId();
        if (maybeSelectedVariantId.isJust() && typeof this.driver.orders.current.updateVariant === 'function') {
            this.driver.orders.current.updateVariant(this.ecommerceService.getSelectedVariantId().just());
        }
    }
}


/***/ }),

/***/ "./src/entry-points/docket-manager.ts":
/*!********************************************!*\
  !*** ./src/entry-points/docket-manager.ts ***!
  \********************************************/
/*! exports provided: DocketManagerService, UIFrameworkEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _docket_manager_docket_manager_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../docket-manager/docket-manager-service */ "./src/docket-manager/docket-manager-service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DocketManagerService", function() { return _docket_manager_docket_manager_service__WEBPACK_IMPORTED_MODULE_0__["DocketManagerService"]; });

/* harmony import */ var _editors_uiframework_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../editors/uiframework-editor */ "./src/editors/uiframework-editor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIFrameworkEditor", function() { return _editors_uiframework_editor__WEBPACK_IMPORTED_MODULE_1__["UIFrameworkEditor"]; });





/***/ }),

/***/ "./src/services/backoffice-client.ts":
/*!*******************************************!*\
  !*** ./src/services/backoffice-client.ts ***!
  \*******************************************/
/*! exports provided: BackOfficeApiClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackOfficeApiClient", function() { return BackOfficeApiClient; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

class BackOfficeApiClient {
    constructor(apiUrl) {
        this.apiUrl = apiUrl !== null && apiUrl !== void 0 ? apiUrl : {"baseApiUrl":"DEFAULT_BACKOFFICE_URL","prod":false}.baseApiUrl;
        this.http = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
            baseURL: apiUrl !== null && apiUrl !== void 0 ? apiUrl : {"baseApiUrl":"DEFAULT_BACKOFFICE_URL","prod":false}.baseApiUrl,
            validateStatus: status => status >= 200 && status < 300
        });
    }
    async getIntegrationInfo(tenantId, productId) {
        const response = await this.http.get(`/api/v1/tenants/${tenantId}/integrations/${productId}`);
        return this.getDataFrom(response);
    }
    async getToken(tenantId, userGuid, ecommerceDomain) {
        const response = await this.http.post(`/api/v1/tenants/${tenantId}/integrations/gettoken`, {
            userGuid: userGuid,
            ecommerceDomain: ecommerceDomain,
            origin: window.location.origin
        });
        return this.getDataFrom(response);
    }
    getDataFrom(response) {
        if (!(this.http.defaults.validateStatus(response.status) && response.data.success)) {
            throw new Error(`HTTP ${response.status} ${response.statusText}. ${JSON.stringify(response.data)}`);
        }
        return response.data.result;
    }
}


/***/ }),

/***/ "./src/services/config-value-service.ts":
/*!**********************************************!*\
  !*** ./src/services/config-value-service.ts ***!
  \**********************************************/
/*! exports provided: ConfigValueService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigValueService", function() { return ConfigValueService; });
class ConfigValueService {
    static process(value) {
        switch (typeof value) {
            case "string":
                try {
                    return JSON.parse(value);
                }
                catch (e) {
                    return value;
                }
            case "object":
                const result = {};
                for (const [key, val] of Object.entries(value)) {
                    result[key] = ConfigValueService.process(val);
                }
                return result;
            default:
                return value;
        }
    }
}


/***/ }),

/***/ "./src/services/document-service.ts":
/*!******************************************!*\
  !*** ./src/services/document-service.ts ***!
  \******************************************/
/*! exports provided: DocumentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentService", function() { return DocumentService; });
class DocumentService {
    constructor(doc) {
        this.getCookies = () => {
            const cookieString = this._doc.cookie;
            return !cookieString
                ? {}
                : cookieString
                    .split(";")
                    .reduce((acc, cur, index, arr) => {
                    const pair = cur.split("=");
                    if (pair.length !== 2) {
                        throw new Error("Each cookie should be an equal sign separated string.");
                    }
                    acc[pair[0].trim()] = pair[1];
                    return acc;
                }, {});
        };
        this._doc = doc;
    }
    getLanguage() {
        const lang = this._doc.querySelector("html").getAttribute("lang");
        return Boolean(lang) ? lang.substr(0, 2) : "EN";
    }
}


/***/ }),

/***/ "./src/services/dynamic-import.ts":
/*!****************************************!*\
  !*** ./src/services/dynamic-import.ts ***!
  \****************************************/
/*! exports provided: dynamicImport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dynamicImport", function() { return dynamicImport; });
function dynamicImport(importData, url) {
    if (typeof importData === 'string') {
        return loadModule(importData, url);
    }
    return Promise.all(importData.map(x => loadModule(x.importData, x.url, x.isDefault)));
}
function loadModule(importData, url, isDefault = false) {
    return new Promise((resolve, reject) => {
        const callbackName = "resolve_callback_" + Math.round(100000 * Math.random());
        window[callbackName] = (...data) => {
            delete window[callbackName];
            document.head.removeChild(script);
            const array = Array.from(data);
            let keys = importData.split(",");
            keys = keys.map(x => x.trim());
            const result = array.reduce((acc, cur, index) => {
                acc[keys[index]] = cur;
                return acc;
            }, {});
            resolve(result);
        };
        const script = document.createElement("script");
        script.type = "module";
        script.onerror = (err) => {
            console.error(`Failer load script from ${url}`);
            console.error(err);
            reject(err);
        };
        url += (url.indexOf("?") >= 0 ? "&" : "?") + "t=" + Date.now();
        script.text = isDefault
            ? `import ${importData} from '${url}'; ${callbackName}(${importData}.default || ${importData} );`
            : `import { ${importData} } from '${url}'; ${callbackName}(${importData});`;
        document.head.appendChild(script);
    });
}


/***/ }),

/***/ "./src/services/guid.ts":
/*!******************************!*\
  !*** ./src/services/guid.ts ***!
  \******************************/
/*! exports provided: Guid, isGuid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Guid", function() { return Guid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGuid", function() { return isGuid; });
function Guid() {
    var _a;
    let d = new Date().getTime();
    let d2 = (_a = (performance && performance.now && (performance.now() * 1000))) !== null && _a !== void 0 ? _a : 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
function isGuid(value) {
    return value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
}


/***/ }),

/***/ "./src/services/project-buffer-service.ts":
/*!************************************************!*\
  !*** ./src/services/project-buffer-service.ts ***!
  \************************************************/
/*! exports provided: ProjectBufferService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectBufferService", function() { return ProjectBufferService; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

class ProjectBufferService {
    constructor({ url, tenantId, http }) {
        this.apiUrl = url;
        this.tenantId = tenantId;
        this.http = http !== null && http !== void 0 ? http : axios__WEBPACK_IMPORTED_MODULE_0___default.a;
    }
    async warmUp(attempts, delayBetweenAttempts, oneachtimer) {
        for (let i = 0; i < attempts; i++) {
            const response = await this.http.get(`${this.apiUrl}/ping`);
            switch (response.status) {
                case 200:
                case 201:
                case 204:
                    return true;
                case 503:
                    if (i < attempts - 1) {
                        const timer = new Promise(resolve => setTimeout(resolve, delayBetweenAttempts * 1000));
                        if (Boolean(oneachtimer)) {
                            oneachtimer();
                        }
                        await timer;
                    }
                    break;
                default:
                    throw new Error(`Unexpected response from service: HTTP ${response.status} ${response.statusText}`);
            }
        }
        return false;
    }
    async post(project) {
        const response = await this.http.post(`${this.apiUrl}/tenants/${this.tenantId}/projects/create`, project, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9BdXJpZ21hL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIndlYnBhY2s6Ly9BdXJpZ21hLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsIndlYnBhY2s6Ly9BdXJpZ21hLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly9BdXJpZ21hLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly9BdXJpZ21hLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly9BdXJpZ21hLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL25vZGVfbW9kdWxlcy9tb25ldC9kaXN0L21vbmV0LmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvc3RlLXNpZ25hbHMvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9BdXJpZ21hLy4vbm9kZV9tb2R1bGVzL3N0ZS1zaWduYWxzL2Rpc3Qvc2lnbmFscy5qcyIsIndlYnBhY2s6Ly9BdXJpZ21hLy4vbm9kZV9tb2R1bGVzL3N0ZS1zaWduYWxzL25vZGVfbW9kdWxlcy9zdGUtY29yZS9kaXN0L2Rpc3BhdGNoaW5nLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvc3RlLXNpZ25hbHMvbm9kZV9tb2R1bGVzL3N0ZS1jb3JlL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL25vZGVfbW9kdWxlcy9zdGUtc2lnbmFscy9ub2RlX21vZHVsZXMvc3RlLWNvcmUvZGlzdC9tYW5hZ2VtZW50LmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9ub2RlX21vZHVsZXMvc3RlLXNpZ25hbHMvbm9kZV9tb2R1bGVzL3N0ZS1jb3JlL2Rpc3Qvc3Vic2NyaXB0aW9uLmpzIiwid2VicGFjazovL0F1cmlnbWEvLi9zcmMvVXRpbHMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL3NyYy9jY2h1Yi1jb25uZWN0b3IudHMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL3NyYy9kb2NrZXQtbWFuYWdlci9kb2NrZXQtbWFuYWdlci1zZXJ2aWNlLnRzIiwid2VicGFjazovL0F1cmlnbWEvLi9zcmMvZWRpdG9ycy91aWZyYW1ld29yay1lZGl0b3IudHMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL3NyYy9lbnRyeS1wb2ludHMvZG9ja2V0LW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vQXVyaWdtYS8uL3NyYy9zZXJ2aWNlcy9iYWNrb2ZmaWNlLWNsaWVudC50cyIsIndlYnBhY2s6Ly9BdXJpZ21hLy4vc3JjL3NlcnZpY2VzL2NvbmZpZy12YWx1ZS1zZXJ2aWNlLnRzIiwid2VicGFjazovL0F1cmlnbWEvLi9zcmMvc2VydmljZXMvZG9jdW1lbnQtc2VydmljZS50cyIsIndlYnBhY2s6Ly9BdXJpZ21hLy4vc3JjL3NlcnZpY2VzL2R5bmFtaWMtaW1wb3J0LnRzIiwid2VicGFjazovL0F1cmlnbWEvLi9zcmMvc2VydmljZXMvZ3VpZC50cyIsIndlYnBhY2s6Ly9BdXJpZ21hLy4vc3JjL3NlcnZpY2VzL3Byb2plY3QtYnVmZmVyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxpQkFBaUIsbUJBQU8sQ0FBQyxzREFBYSxFOzs7Ozs7Ozs7Ozs7QUNBekI7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZO0FBQ2hDLGFBQWEsbUJBQU8sQ0FBQyxpRUFBa0I7QUFDdkMsY0FBYyxtQkFBTyxDQUFDLHlFQUFzQjtBQUM1QyxlQUFlLG1CQUFPLENBQUMsMkVBQXVCO0FBQzlDLG9CQUFvQixtQkFB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ2h2Q0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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UyxJQUFJLEVBQUUsR0FBRyxhQUFhLEdBQUcsV0FBVyxjQUFjLFdBQVcsR0FBRztBQUM1Ryx1QkFBdUIsR0FBRyxXQUFXLEVBQUUsU0FBUyxJQUFJLEVBQUUsR0FBRyxhQUFhLEdBQUcsV0FBVyxFQUFFO0FBQ3RGO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7O0FDbENBO0FBQUE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1Asa0NBQWtDLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEdBQUc7QUFDakc7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFBQTtBQUFBO0FBQUE7QUFBMEI7QUFDbkI7QUFDUCxpQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQSw4REFBOEQsNENBQUs7QUFDbkU7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDLG9EQUFvRCxZQUFZO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RSxnQkFBZ0IsR0FBRyxvQkFBb0I7QUFDckg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxZQUFZLFdBQVcsY0FBYztBQUN0RixzQkFBc0I7QUFDdEIsU0FBUztBQUNUO0FBQ0E7QUFDQSIsImZpbGUiOiJzdG9yZWZyb250LmRvY2tldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2VudHJ5LXBvaW50cy9kb2NrZXQtbWFuYWdlci50c1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi4vY29yZS9idWlsZEZ1bGxQYXRoJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKHV0aWxzLmlzQmxvYihyZXF1ZXN0RGF0YSkgfHwgdXRpbHMuaXNGaWxlKHJlcXVlc3REYXRhKSkgJiZcbiAgICAgIHJlcXVlc3REYXRhLnR5cGVcbiAgICApIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoY29uZmlnLmF1dGgucGFzc3dvcmQpKSB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxdWVzdERhdGEpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNcbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ2RhdGEnXTtcbiAgdmFyIG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzID0gWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknLCAncGFyYW1zJ107XG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFtcbiAgICAnYmFzZVVSTCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLFxuICAgICd0aW1lb3V0JywgJ3RpbWVvdXRNZXNzYWdlJywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ2RlY29tcHJlc3MnLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJywgJ21heEJvZHlMZW5ndGgnLCAnbWF4UmVkaXJlY3RzJywgJ3RyYW5zcG9ydCcsICdodHRwQWdlbnQnLFxuICAgICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnLCAncmVzcG9uc2VFbmNvZGluZydcbiAgXTtcbiAgdmFyIGRpcmVjdE1lcmdlS2V5cyA9IFsndmFsaWRhdGVTdGF0dXMnXTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIHV0aWxzLmZvckVhY2godmFsdWVGcm9tQ29uZmlnMktleXMsIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcblxuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChkaXJlY3RNZXJnZUtleXMsIGZ1bmN0aW9uIG1lcmdlKHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5c1xuICAgIC5jb25jYXQobWVyZ2VEZWVwUHJvcGVydGllc0tleXMpXG4gICAgLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cylcbiAgICAuY29uY2F0KGRpcmVjdE1lcmdlS2V5cyk7XG5cbiAgdmFyIG90aGVyS2V5cyA9IE9iamVjdFxuICAgIC5rZXlzKGNvbmZpZzEpXG4gICAgLmNvbmNhdChPYmplY3Qua2V5cyhjb25maWcyKSlcbiAgICAuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcbiAgICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcbiAgICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWwpIHtcbiAgaWYgKHRvU3RyaW5nLmNhbGwodmFsKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdDogaXNQbGFpbk9iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltLFxuICBzdHJpcEJPTTogc3RyaXBCT01cbn07XG4iLCIvKipcbiAqIE1vbmV0LmpzIDAuOS4wLXJjLjFcbiAqXG4gKiAoYykgMjAxMi0yMDE4IENocmlzIE15ZXJzXG4gKiBAbGljZW5zZSBNb25ldC5qcyBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIEZvciBhbGwgZGV0YWlscyBhbmQgZG9jdW1lbnRhdGlvbjpcbiAqIGh0dHBzOi8vbW9uZXQuZ2l0aHViLmlvL21vbmV0LmpzL1xuICovXG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290Lk1vbmV0ID0gZmFjdG9yeShyb290KTtcbiAgICB9XG59KSh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBmdW5jdGlvbiBhc3NpZ25JbXAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHNvdXJjZVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIHZhciBhc3NpZ24gPSBpc0Z1bmN0aW9uKE9iamVjdC5hc3NpZ24pID8gT2JqZWN0LmFzc2lnbiA6IGFzc2lnbkltcDtcbiAgICB2YXIgTW9uZXQgPSB7XG4gICAgICAgIGFwcGx5MjogYXBwbHkyLFxuICAgICAgICBhc3NpZ246IGFzc2lnbixcbiAgICAgICAgY29tcG9zZTogY29tcG9zZSxcbiAgICAgICAgY3Vycnk6IGN1cnJ5KHN3YXAoY3VycnkpLCBbXSkoW10pLFxuICAgICAgICBpZEZ1bmN0aW9uOiBpZEZ1bmN0aW9uLFxuICAgICAgICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICAgICAgICBub29wOiBub29wLFxuICAgICAgICBzd2FwOiBzd2FwXG4gICAgfTtcbiAgICB2YXIgVFlQRV9LRVkgPSBcIkBAdHlwZVwiO1xuICAgIHZhciBMSUJfTkFNRSA9IFwibW9uZXQuanNcIjtcbiAgICB2YXIgVFlQRVNfTkFNRVMgPSB7XG4gICAgICAgIElkZW50aXR5OiBcIklkZW50aXR5XCIsXG4gICAgICAgIE1heWJlOiBcIk1heWJlXCIsXG4gICAgICAgIEVpdGhlcjogXCJFaXRoZXJcIixcbiAgICAgICAgVmFsaWRhdGlvbjogXCJWYWxpZGF0aW9uXCIsXG4gICAgICAgIExpc3Q6IFwiTGlzdFwiLFxuICAgICAgICBORUw6IFwiTkVMXCIsXG4gICAgICAgIElPOiBcIklPXCIsXG4gICAgICAgIE1vbmFkVDogXCJNb25hZFRcIixcbiAgICAgICAgUmVhZGVyOiBcIlJlYWRlclwiLFxuICAgICAgICBGcmVlOiBcIkZyZWVcIlxuICAgIH07XG4gICAgZnVuY3Rpb24gc2V0VHlwZSh0YXJnZXQsIHR5cGVOYW1lKSB7XG4gICAgICAgIHRhcmdldFtUWVBFX0tFWV0gPSBMSUJfTkFNRSArIFwiL1wiICsgdHlwZU5hbWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzSW5zdGFuY2UodHlwZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuICh0YXJnZXRbVFlQRV9LRVldIHx8IHRhcmdldC5jb25zdHJ1Y3RvcltUWVBFX0tFWV0pID09PSBMSUJfTkFNRSArIFwiL1wiICsgdHlwZU5hbWU7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzT2ZUeXBlKHR5cGVOYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRUeXBlID0gdGFyZ2V0W1RZUEVfS0VZXSB8fCB0YXJnZXQuY29uc3RydWN0b3IgJiYgdGFyZ2V0LmNvbnN0cnVjdG9yW1RZUEVfS0VZXTtcbiAgICAgICAgICAgIHJldHVybiBCb29sZWFuKHRhcmdldFR5cGUpICYmIHRhcmdldFR5cGUubGVuZ3RoID49IHR5cGVOYW1lLmxlbmd0aCAmJiB0YXJnZXRUeXBlLmluZGV4T2YodHlwZU5hbWUpID09PSB0YXJnZXRUeXBlLmxlbmd0aCAtIHR5cGVOYW1lLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNOb3RoaW5nKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PSBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gICAgICAgIGlmIChpc05vdGhpbmcodmFsdWUpIHx8IHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5vb3AoKSB7fVxuICAgIGZ1bmN0aW9uIGdldEFyZ3MoYXJncykge1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN1cnJ5KGZuLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhcmdzMSA9IGFyZ3MuY29uY2F0KGdldEFyZ3MoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICByZXR1cm4gYXJnczEubGVuZ3RoID49IGZuLmxlbmd0aCA/IGZuLmFwcGx5KG51bGwsIGFyZ3MxLnNsaWNlKDAsIGFyZ3MxLmxlbmd0aCkpIDogY3VycnkoZm4sIGFyZ3MxKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcG9zZShmLCBnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICByZXR1cm4gZihnKHgpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbihmKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKGYgJiYgZi5jb25zdHJ1Y3RvciAmJiBmLmNhbGwgJiYgZi5hcHBseSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlkRnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cnVlRnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhcmVFcXVhbChhLCBiKSB7XG4gICAgICAgIGlmIChhID09PSBiIHx8IGEgIT09IGEgJiYgYiAhPT0gYikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhIHx8ICFiKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oYS5lcXVhbHMpICYmIGlzRnVuY3Rpb24oYi5lcXVhbHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5lcXVhbHMoYik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlcXVhbHMoYSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgcmV0dXJuIGFyZUVxdWFsKGEsIGIpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBmYWxzZUZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN3YXAoZikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGYoYiwgYSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFwcGx5MihhMSwgYTIsIGYpIHtcbiAgICAgICAgcmV0dXJuIGEyLmFwKGExLm1hcChjdXJyeShmLCBbXSkpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbGlzdEVxdWFscyhsaXN0MSwgbGlzdDIpIHtcbiAgICAgICAgdmFyIGEgPSBsaXN0MTtcbiAgICAgICAgdmFyIGIgPSBsaXN0MjtcbiAgICAgICAgd2hpbGUgKCFhLmlzTmlsICYmICFiLmlzTmlsKSB7XG4gICAgICAgICAgICBpZiAoIWVxdWFscyhhLmhlYWQoKSkoYi5oZWFkKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYSA9IGEudGFpbCgpO1xuICAgICAgICAgICAgYiA9IGIudGFpbCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhLmlzTmlsICYmIGIuaXNOaWw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpc3RNYXBDKGZuLCBsKSB7XG4gICAgICAgIHJldHVybiBsLmlzTmlsID8gUmV0dXJuKGwpIDogU3VzcGVuZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0TWFwQyhmbiwgbC50YWlsKCkpO1xuICAgICAgICB9KS5tYXAoY3VycnkoY29ucywgW10pKGZuKGwuaGVhZCgpKSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaXN0TWFwKGZuLCBsKSB7XG4gICAgICAgIHJldHVybiBsaXN0TWFwQyhmbiwgbCkucnVuKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpc3RGaWx0ZXIobGlzdCwgZm4pIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuZm9sZFJpZ2h0KE5pbCkoZnVuY3Rpb24oYSwgYWNjKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oYSkgPyBjb25zKGEsIGFjYykgOiBhY2M7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaXN0RmluZEMobCwgZm4pIHtcbiAgICAgICAgaWYgKGwuaXNOaWwpIHtcbiAgICAgICAgICAgIHJldHVybiBSZXR1cm4oTm9uZSgpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaCA9IGwuaGVhZCgpO1xuICAgICAgICByZXR1cm4gZm4oaCkgPyBSZXR1cm4oU29tZShoKSkgOiBTdXNwZW5kKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RGaW5kQyhsLnRhaWwoKSwgZm4pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbGlzdEZpbmQobCwgZm4pIHtcbiAgICAgICAgcmV0dXJuIGxpc3RGaW5kQyhsLCBmbikucnVuKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpc3RDb250YWluc0MobCwgdmFsKSB7XG4gICAgICAgIGlmIChsLmlzTmlsKSB7XG4gICAgICAgICAgICByZXR1cm4gUmV0dXJuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaCA9IGwuaGVhZCgpO1xuICAgICAgICByZXR1cm4gYXJlRXF1YWwoaCwgdmFsKSA/IFJldHVybih0cnVlKSA6IFN1c3BlbmQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdENvbnRhaW5zQyhsLnRhaWwoKSwgdmFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpc3RDb250YWlucyhsLCB2YWwpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RDb250YWluc0MobCwgdmFsKS5ydW4oKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29ucyhoZWFkLCB0YWlsKSB7XG4gICAgICAgIHJldHVybiB0YWlsLmNvbnMoaGVhZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIExpc3QoKSB7XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGlzdC5mbi5pbml0KCk7XG5cbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gbmV3IExpc3QuZm4uaW5pdChhcmd1bWVudHNbMF0pO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGlzdC5mbi5pbml0KGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBNb25ldC5MaXN0ID0gTGlzdDtcbiAgICB2YXIgbGlzdEZvckVhY2ggPSBmdW5jdGlvbihlZmZlY3RGbiwgbCkge1xuICAgICAgICBpZiAoIWwuaXNOaWwpIHtcbiAgICAgICAgICAgIGVmZmVjdEZuKGwuaGVhZCgpKTtcbiAgICAgICAgICAgIGxpc3RGb3JFYWNoKGVmZmVjdEZuLCBsLnRhaWwoKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBmb2xkTGVmdCA9IGZ1bmN0aW9uKGZuLCBhY2MsIGxpc3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZkwoaW5uZXJBY2MsIGlubmVyTGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGlubmVyTGlzdC5pc05pbCA/IFJldHVybihpbm5lckFjYykgOiBTdXNwZW5kKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmTChmbihpbm5lckFjYywgaW5uZXJMaXN0LmhlYWQoKSksIGlubmVyTGlzdC50YWlsKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZMKGFjYywgbGlzdCkucnVuKCk7XG4gICAgfTtcbiAgICB2YXIgZm9sZFJpZ2h0ID0gZnVuY3Rpb24oZm4sIGxpc3QsIGFjYykge1xuICAgICAgICBmdW5jdGlvbiBmUihpbm5lckxpc3QsIGlubmVyQWNjKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5uZXJMaXN0LmlzTmlsID8gUmV0dXJuKGlubmVyQWNjKSA6IFN1c3BlbmQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZSKGlubmVyTGlzdC50YWlsKCksIGlubmVyQWNjKTtcbiAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbihhY2N1bXVsYXRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbihpbm5lckxpc3QuaGVhZCgpLCBhY2N1bXVsYXRlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZlIobGlzdCwgYWNjKS5ydW4oKTtcbiAgICB9O1xuICAgIHZhciBhcHBlbmQgPSBmdW5jdGlvbihzZWxmLCBvdGhlcikge1xuICAgICAgICBmdW5jdGlvbiBhcHBlbmRGcmVlKGxpc3RBLCBsaXN0Qikge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RBLmlzTmlsID8gUmV0dXJuKGxpc3RCKSA6IFN1c3BlbmQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFwcGVuZEZyZWUobGlzdEEudGFpbCgpLCBsaXN0QikubWFwKGZ1bmN0aW9uKGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpc3QuY29ucyhsaXN0QS5oZWFkKCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFwcGVuZEZyZWUoc2VsZiwgb3RoZXIpLnJ1bigpO1xuICAgIH07XG4gICAgdmFyIHNlcXVlbmNlID0gZnVuY3Rpb24obGlzdCwgdHlwZSkge1xuICAgICAgICByZXR1cm4gbGlzdC5mb2xkUmlnaHQodHlwZS5vZihOaWwpKSh0eXBlLm1hcDIoY29ucykpO1xuICAgIH07XG4gICAgdmFyIHNlcXVlbmNlVmFsaWRhdGlvbiA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuZm9sZExlZnQoU3VjY2VzcyhOaWwpKShmdW5jdGlvbihhY2MsIGEpIHtcbiAgICAgICAgICAgIHJldHVybiBhY2MuYXAoYS5tYXAoZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25zKHYsIHQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pLm1hcChsaXN0UmV2ZXJzZSk7XG4gICAgfTtcbiAgICB2YXIgbGlzdFJldmVyc2UgPSBmdW5jdGlvbihsaXN0KSB7XG4gICAgICAgIHJldHVybiBsaXN0LmZvbGRMZWZ0KE5pbCkoc3dhcChjb25zKSk7XG4gICAgfTtcbiAgICB2YXIgbGlzdEFwID0gZnVuY3Rpb24obGlzdDEsIGxpc3QyKSB7XG4gICAgICAgIHJldHVybiBsaXN0MS5iaW5kKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0Mi5tYXAoZnVuY3Rpb24oZikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmKHgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIE5pbDtcbiAgICBMaXN0LmZuID0gTGlzdC5wcm90b3R5cGUgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhlYWQgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICB2YXIgdGFpbCA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc05pbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplXyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNOaWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRfID0gaGVhZDtcbiAgICAgICAgICAgICAgICB0aGlzLnRhaWxfID0gdGFpbCB8fCBOaWw7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplXyA9IHRoaXMudGFpbF8uc2l6ZSgpICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFR5cGUodGhpcywgVFlQRVNfTkFNRVMuTGlzdCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9mOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBMaXN0KHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaXplXztcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzOiBmdW5jdGlvbihvdGhlcikge1xuICAgICAgICAgICAgcmV0dXJuIChMaXN0LmlzT2ZUeXBlKG90aGVyKSB8fCBORUwuaXNPZlR5cGUob3RoZXIpKSAmJiBsaXN0RXF1YWxzKHRoaXMsIG90aGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29uczogZnVuY3Rpb24oaGVhZCkge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QoaGVhZCwgdGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNub2M6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmNhdChMaXN0KGVsZW1lbnQpKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFwOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RNYXAoZm4sIHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBmb2xkTGVmdChmdW5jdGlvbihhY2MsIGUpIHtcbiAgICAgICAgICAgICAgICBhY2MucHVzaChlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwgW10sIHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICB0b1NldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldCh0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9sZExlZnQ6IGZ1bmN0aW9uKGluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvbGRMZWZ0KGZuLCBpbml0aWFsVmFsdWUsIHNlbGYpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9sZFJpZ2h0OiBmdW5jdGlvbihpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb2xkUmlnaHQoZm4sIHNlbGYsIGluaXRpYWxWYWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhcHBlbmQ6IGZ1bmN0aW9uKGxpc3QyKSB7XG4gICAgICAgICAgICByZXR1cm4gYXBwZW5kKHRoaXMsIGxpc3QyKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RGaWx0ZXIodGhpcywgZm4pO1xuICAgICAgICB9LFxuICAgICAgICBmaW5kOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RGaW5kKHRoaXMsIGZuKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmxhdHRlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9sZFJpZ2h0KGFwcGVuZCwgdGhpcywgTmlsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmxhdHRlbk1heWJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZsYXRNYXAoTWF5YmUudG9MaXN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmV2ZXJzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdFJldmVyc2UodGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmQ6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXAoZm4pLmZsYXR0ZW4oKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9yRWFjaDogZnVuY3Rpb24oZWZmZWN0Rm4pIHtcbiAgICAgICAgICAgIGxpc3RGb3JFYWNoKGVmZmVjdEZuLCB0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udGFpbnM6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RDb250YWlucyh0aGlzLCB2YWwpO1xuICAgICAgICB9LFxuICAgICAgICBzZXF1ZW5jZU1heWJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXF1ZW5jZSh0aGlzLCBNYXliZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlcXVlbmNlVmFsaWRhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VxdWVuY2VWYWxpZGF0aW9uKHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBzZXF1ZW5jZUVpdGhlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VxdWVuY2UodGhpcywgRWl0aGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VxdWVuY2VJTzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VxdWVuY2UodGhpcywgSU8pO1xuICAgICAgICB9LFxuICAgICAgICBzZXF1ZW5jZVJlYWRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VxdWVuY2UodGhpcywgUmVhZGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VxdWVuY2U6IGZ1bmN0aW9uKG1vbmFkVHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlcXVlbmNlKHRoaXMsIG1vbmFkVHlwZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVhZF87XG4gICAgICAgIH0sXG4gICAgICAgIGhlYWRNYXliZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc05pbCA/IE5vbmUoKSA6IFNvbWUodGhpcy5oZWFkXyk7XG4gICAgICAgIH0sXG4gICAgICAgIHRhaWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNOaWwgPyBOaWwgOiB0aGlzLnRhaWxfO1xuICAgICAgICB9LFxuICAgICAgICB0YWlsczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc05pbCA/IExpc3QoTmlsLCBOaWwpIDogdGhpcy50YWlsKCkudGFpbHMoKS5jb25zKHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBhcDogZnVuY3Rpb24obGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RBcCh0aGlzLCBsaXN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNORUw6IGZhbHNlRnVuY3Rpb24sXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzTmlsID8gXCJOaWxcIiA6IFwiTGlzdChcIiArIHRoaXMudG9BcnJheSgpLmpvaW4oXCIsIFwiKSArIFwiKVwiO1xuICAgICAgICB9LFxuICAgICAgICBpbnNwZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExpc3QuZm4uaW5pdC5wcm90b3R5cGUgPSBMaXN0LmZuO1xuICAgIHNldFR5cGUoTGlzdCwgVFlQRVNfTkFNRVMuTGlzdCk7XG4gICAgc2V0VHlwZShMaXN0LmZuLmluaXQsIFRZUEVTX05BTUVTLkxpc3QpO1xuICAgIExpc3QuaXNJbnN0YW5jZSA9IGlzSW5zdGFuY2UoVFlQRVNfTkFNRVMuTGlzdCk7XG4gICAgTGlzdC5pc09mVHlwZSA9IGlzT2ZUeXBlKFRZUEVTX05BTUVTLkxpc3QpO1xuICAgIExpc3QucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBOaWw7XG4gICAgfTtcbiAgICBMaXN0LmZyb21BcnJheSA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgICAgIHJldHVybiBhcnJheS5yZWR1Y2VSaWdodChmdW5jdGlvbihhY2MsIG5leHQpIHtcbiAgICAgICAgICAgIHJldHVybiBhY2MuY29ucyhuZXh0KTtcbiAgICAgICAgfSwgTmlsKTtcbiAgICB9O1xuICAgIExpc3QuZnJvbSA9IGZ1bmN0aW9uKGl0ZXJhYmxlKSB7XG4gICAgICAgIHJldHVybiBMaXN0LmZyb21BcnJheShBcnJheS5mcm9tKGl0ZXJhYmxlKSk7XG4gICAgfTtcbiAgICBMaXN0Lm9mID0gZnVuY3Rpb24oYSkge1xuICAgICAgICByZXR1cm4gbmV3IExpc3QoYSwgTmlsKTtcbiAgICB9O1xuICAgIExpc3QucHJvdG90eXBlLmVhY2ggPSBMaXN0LnByb3RvdHlwZS5mb3JFYWNoO1xuICAgIE5pbCA9IE1vbmV0Lk5pbCA9IG5ldyBMaXN0LmZuLmluaXQoKTtcbiAgICBmdW5jdGlvbiBlbXB0eU5FTEVycm9yKGhlYWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkNhbm5vdCBjcmVhdGUgYW4gZW1wdHkgTm9uLUVtcHR5IExpc3QuIFBhc3NlZCBoZWFkIGlzIFwiICsgaGVhZCArIFwiLlwiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gTkVMKGhlYWQsIHRhaWwpIHtcbiAgICAgICAgaWYgKGlzTm90aGluZyhoZWFkKSkge1xuICAgICAgICAgICAgdGhyb3cgZW1wdHlORUxFcnJvcihoZWFkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IE5FTC5mbi5pbml0KGhlYWQsIHRhaWwpO1xuICAgIH1cbiAgICBNb25ldC5ORUwgPSBNb25ldC5Ob25FbXB0eUxpc3QgPSBORUw7XG4gICAgTkVMLm9mID0gZnVuY3Rpb24oYSkge1xuICAgICAgICByZXR1cm4gTkVMKGEsIE5pbCk7XG4gICAgfTtcbiAgICBORUwuZm4gPSBORUwucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbihoZWFkLCB0YWlsKSB7XG4gICAgICAgICAgICBpZiAoaXNOb3RoaW5nKGhlYWQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZW1wdHlORUxFcnJvcihoZWFkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc05pbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZF8gPSBoZWFkO1xuICAgICAgICAgICAgICAgIHRoaXMudGFpbF8gPSBpc05vdGhpbmcodGFpbCkgPyBOaWwgOiB0YWlsO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZV8gPSB0aGlzLnRhaWxfLnNpemUoKSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRUeXBlKHRoaXMsIFRZUEVTX05BTUVTLk5FTCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsczogZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmlzT2ZUeXBlKG90aGVyKSB8fCBORUwuaXNPZlR5cGUob3RoZXIpICYmIGxpc3RFcXVhbHModGhpcywgb3RoZXIpO1xuICAgICAgICB9LFxuICAgICAgICBjb25zOiBmdW5jdGlvbihoZWFkKSB7XG4gICAgICAgICAgICByZXR1cm4gTkVMKGhlYWQsIHRoaXMudG9MaXN0KCkpO1xuICAgICAgICB9LFxuICAgICAgICBzbm9jOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25jYXQoTkVMKGVsZW1lbnQpKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFwOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIE5FTChmbih0aGlzLmhlYWRfKSwgbGlzdE1hcChmbiwgdGhpcy50YWlsXykpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgdmFyIHAgPSBmbih0aGlzLmhlYWRfKTtcbiAgICAgICAgICAgIGlmICghcC5pc05FTCgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTkVMLmZuLmJpbmQ6IFBhc3NlZCBmdW5jdGlvbiBtdXN0IHJldHVybiBhIE5vbkVtcHR5TGlzdC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGlzdCA9IHRoaXMudGFpbCgpLmZvbGRMZWZ0KE5pbC5zbm9jKHAuaGVhZCgpKS5hcHBlbmQocC50YWlsKCkpKShmdW5jdGlvbihhY2MsIGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGlzdDIgPSBmbihlKS50b0xpc3QoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjLnNub2MobGlzdDIuaGVhZCgpKS5hcHBlbmQobGlzdDIudGFpbCgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBORUwobGlzdC5oZWFkKCksIGxpc3QudGFpbCgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWFkXztcbiAgICAgICAgfSxcbiAgICAgICAgdGFpbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YWlsXztcbiAgICAgICAgfSxcbiAgICAgICAgdGFpbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGxpc3RzT2ZOZWxzID0gdGhpcy50b0xpc3QoKS50YWlscygpLm1hcChORUwuZnJvbUxpc3QpLmZsYXR0ZW5NYXliZSgpO1xuICAgICAgICAgICAgcmV0dXJuIE5FTChsaXN0c09mTmVscy5oZWFkKCksIGxpc3RzT2ZOZWxzLnRhaWwoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvTGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdCh0aGlzLmhlYWRfLCB0aGlzLnRhaWxfKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmV2ZXJzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWlsKCkuaXNOaWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXZlcnNlZFRhaWwgPSB0aGlzLnRhaWwoKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICByZXR1cm4gTkVMKHJldmVyc2VkVGFpbC5oZWFkKCksIHJldmVyc2VkVGFpbC50YWlsKCkuYXBwZW5kKExpc3QodGhpcy5oZWFkKCkpKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZvbGRMZWZ0OiBmdW5jdGlvbihpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvTGlzdCgpLmZvbGRMZWZ0KGluaXRpYWxWYWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZvbGRSaWdodDogZnVuY3Rpb24oaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0xpc3QoKS5mb2xkUmlnaHQoaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVkdWNlTGVmdDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRhaWwoKS5mb2xkTGVmdCh0aGlzLmhlYWQoKSkoZm4pO1xuICAgICAgICB9LFxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdEZpbHRlcih0aGlzLnRvTGlzdCgpLCBmbik7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmQ6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdEZpbmQodGhpcy50b0xpc3QoKSwgZm4pO1xuICAgICAgICB9LFxuICAgICAgICBmbGF0dGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBmb2xkUmlnaHQoYXBwZW5kLCB0aGlzLnRvTGlzdCgpLm1hcChmdW5jdGlvbihsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGwuaXNORUwoKSA/IGwudG9MaXN0KCkgOiBsO1xuICAgICAgICAgICAgfSksIE5pbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZsYXR0ZW5NYXliZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0xpc3QoKS5mbGF0TWFwKE1heWJlLnRvTGlzdCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhaW5zOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0Q29udGFpbnModGhpcy50b0xpc3QoKSwgdmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgYXBwZW5kOiBmdW5jdGlvbihsaXN0Mikge1xuICAgICAgICAgICAgcmV0dXJuIE5FTC5mcm9tTGlzdCh0aGlzLnRvTGlzdCgpLmFwcGVuZChsaXN0Mi50b0xpc3QoKSkpLnNvbWUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29iaW5kOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29qb2luKCkubWFwKGZuKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaXplXztcbiAgICAgICAgfSxcbiAgICAgICAgZm9yRWFjaDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvTGlzdCgpLmZvckVhY2goZm4pO1xuICAgICAgICB9LFxuICAgICAgICBpc05FTDogdHJ1ZUZ1bmN0aW9uLFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJORUwoXCIgKyB0aGlzLnRvQXJyYXkoKS5qb2luKFwiLCBcIikgKyBcIilcIjtcbiAgICAgICAgfSxcbiAgICAgICAgaW5zcGVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBORUwuZnJvbUxpc3QgPSBmdW5jdGlvbihsaXN0KSB7XG4gICAgICAgIHJldHVybiBsaXN0LmlzTmlsID8gTm9uZSgpIDogU29tZShORUwobGlzdC5oZWFkKCksIGxpc3QudGFpbCgpKSk7XG4gICAgfTtcbiAgICBORUwuZnJvbUFycmF5ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIE5FTC5mcm9tTGlzdChMaXN0LmZyb21BcnJheShhcnJheSkpO1xuICAgIH07XG4gICAgTkVMLmZyb20gPSBmdW5jdGlvbihpdGVyYWJsZSkge1xuICAgICAgICByZXR1cm4gTkVMLmZyb21MaXN0KExpc3QuZnJvbShpdGVyYWJsZSkpO1xuICAgIH07XG4gICAgTkVMLmZuLmluaXQucHJvdG90eXBlID0gTkVMLmZuO1xuICAgIHNldFR5cGUoTkVMLCBUWVBFU19OQU1FUy5ORUwpO1xuICAgIHNldFR5cGUoTkVMLmZuLmluaXQsIFRZUEVTX05BTUVTLk5FTCk7XG4gICAgTkVMLmlzSW5zdGFuY2UgPSBpc0luc3RhbmNlKFRZUEVTX05BTUVTLk5FTCk7XG4gICAgTkVMLmlzT2ZUeXBlID0gaXNPZlR5cGUoVFlQRVNfTkFNRVMuTkVMKTtcbiAgICBORUwucHJvdG90eXBlLnRvQXJyYXkgPSBMaXN0LnByb3RvdHlwZS50b0FycmF5O1xuICAgIE5FTC5wcm90b3R5cGUudG9TZXQgPSBMaXN0LnByb3RvdHlwZS50b1NldDtcbiAgICBORUwucHJvdG90eXBlLmV4dHJhY3QgPSBORUwucHJvdG90eXBlLmNvcHVyZSA9IE5FTC5wcm90b3R5cGUuaGVhZDtcbiAgICBORUwucHJvdG90eXBlLmNvam9pbiA9IE5FTC5wcm90b3R5cGUudGFpbHM7XG4gICAgTkVMLnByb3RvdHlwZS5jb2ZsYXRNYXAgPSBORUwucHJvdG90eXBlLm1hcFRhaWxzID0gTkVMLnByb3RvdHlwZS5jb2JpbmQ7XG4gICAgTkVMLnByb3RvdHlwZS5hcCA9IExpc3QucHJvdG90eXBlLmFwO1xuICAgIHZhciBNYXliZSA9IE1vbmV0Lk1heWJlID0ge307XG4gICAgTWF5YmUuZnJvbUZhbHN5ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHJldHVybiAhdmFsID8gTWF5YmUuTm9uZSgpIDogTWF5YmUuU29tZSh2YWwpO1xuICAgIH07XG4gICAgTWF5YmUuZnJvbU51bGwgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIGlzTm90aGluZyh2YWwpID8gTWF5YmUuTm9uZSgpIDogTWF5YmUuU29tZSh2YWwpO1xuICAgIH07XG4gICAgTWF5YmUuZnJvbVVuZGVmaW5lZCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICByZXR1cm4gdmFsID09PSB1bmRlZmluZWQgPyBNYXliZS5Ob25lKCkgOiBNYXliZS5Tb21lKHZhbCk7XG4gICAgfTtcbiAgICBNYXliZS5mcm9tRW1wdHkgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIGlzRW1wdHkodmFsKSA/IE1heWJlLk5vbmUoKSA6IE1heWJlLlNvbWUodmFsKTtcbiAgICB9O1xuICAgIE1heWJlLm9mID0gZnVuY3Rpb24oYSkge1xuICAgICAgICByZXR1cm4gU29tZShhKTtcbiAgICB9O1xuICAgIHZhciBTb21lID0gTWF5YmUuSnVzdCA9IE1heWJlLlNvbWUgPSBNYXliZS5zb21lID0gTW9uZXQuU29tZSA9IE1vbmV0Lkp1c3QgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXliZS5mbi5pbml0KHRydWUsIHZhbCk7XG4gICAgfTtcbiAgICB2YXIgTm9uZSA9IE1heWJlLk5vdGhpbmcgPSBNYXliZS5Ob25lID0gTWF5YmUubm9uZSA9IE1vbmV0Lk5vbmUgPSBNb25ldC5Ob3RoaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWF5YmUuZm4uaW5pdChmYWxzZSwgbnVsbCk7XG4gICAgfTtcbiAgICBNYXliZS50b0xpc3QgPSBmdW5jdGlvbihtYXliZSkge1xuICAgICAgICByZXR1cm4gbWF5YmUudG9MaXN0KCk7XG4gICAgfTtcbiAgICBNYXliZS5mbiA9IE1heWJlLnByb3RvdHlwZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oaXNWYWx1ZSwgdmFsKSB7XG4gICAgICAgICAgICB0aGlzLmlzVmFsdWUgPSBpc1ZhbHVlO1xuICAgICAgICAgICAgaWYgKGlzVmFsdWUgJiYgaXNOb3RoaW5nKHZhbCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gbm90IGNyZWF0ZSBTb21lIHdpdGggaWxsZWdhbCB2YWx1ZTogXCIgKyB2YWwgKyBcIi5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZhbCA9IHZhbDtcbiAgICAgICAgICAgIHNldFR5cGUodGhpcywgVFlQRVNfTkFNRVMuTWF5YmUpO1xuICAgICAgICB9LFxuICAgICAgICBpc1NvbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNOb25lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5pc1NvbWUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZDogZnVuY3Rpb24oYmluZEZuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbHVlID8gYmluZEZuKHRoaXMudmFsKSA6IHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNvbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjYWxsIC5zb21lKCkgb24gYSBOb25lLlwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgb3JTb21lOiBmdW5jdGlvbihvdGhlclZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbHVlID8gdGhpcy52YWwgOiBvdGhlclZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBvckxhenk6IGZ1bmN0aW9uKGdldE90aGVyVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhdGEoZ2V0T3RoZXJWYWx1ZSwgaWRGdW5jdGlvbik7XG4gICAgICAgIH0sXG4gICAgICAgIG9yTnVsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vclNvbWUobnVsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9yVW5kZWZpbmVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9yU29tZSh1bmRlZmluZWQpO1xuICAgICAgICB9LFxuICAgICAgICBvckVsc2U6IGZ1bmN0aW9uKG1heWJlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXRjaE1hcChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF5YmU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYXA6IGZ1bmN0aW9uKG1heWJlV2l0aEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnZhbDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzVmFsdWUgPyBtYXliZVdpdGhGdW5jdGlvbi5tYXAoZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4odmFsdWUpO1xuICAgICAgICAgICAgfSkgOiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHM6IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF5YmUuaXNPZlR5cGUob3RoZXIpICYmIHRoaXMuY2F0YShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIuaXNOb25lKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIuZm9sZChmYWxzZSkoZXF1YWxzKHZhbCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbIHZhbCBdO1xuICAgICAgICAgICAgfSkub3JMYXp5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB0b1NldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldCh0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9MaXN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcChMaXN0KS5vckxhenkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5pbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB0b0VpdGhlcjogZnVuY3Rpb24oZmFpbFZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTb21lKCkgPyBSaWdodCh0aGlzLnZhbCkgOiBMZWZ0KGZhaWxWYWwpO1xuICAgICAgICB9LFxuICAgICAgICB0b1ZhbGlkYXRpb246IGZ1bmN0aW9uKGZhaWxWYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzU29tZSgpID8gU3VjY2Vzcyh0aGlzLnZhbCkgOiBGYWlsKGZhaWxWYWwpO1xuICAgICAgICB9LFxuICAgICAgICBmb2xkOiBmdW5jdGlvbihkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmlzU29tZSgpID8gZm4oc2VsZi52YWwpIDogZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9sZExlZnQ6IGZ1bmN0aW9uKGluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9MaXN0KCkuZm9sZExlZnQoaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9sZFJpZ2h0OiBmdW5jdGlvbihpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvTGlzdCgpLmZvbGRSaWdodChpbml0aWFsVmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBjYXRhOiBmdW5jdGlvbihub25lLCBzb21lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1NvbWUoKSA/IHNvbWUodGhpcy52YWwpIDogbm9uZSgpO1xuICAgICAgICB9LFxuICAgICAgICBjYXRjaE1hcDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzU29tZSgpID8gdGhpcyA6IGZuKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmZsYXRNYXAoZnVuY3Rpb24oYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbihhKSA/IHNlbGYgOiBOb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb3JOb25lSWY6IGZ1bmN0aW9uKGJvb2wpIHtcbiAgICAgICAgICAgIHJldHVybiBib29sID8gTm9uZSgpIDogdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgY29udGFpbnM6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTb21lKCkgPyBhcmVFcXVhbCh0aGlzLnZhbCwgdmFsKSA6IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBmb3JFYWNoOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgdGhpcy5jYXRhKG5vb3AsIGZuKTtcbiAgICAgICAgfSxcbiAgICAgICAgb3JFbHNlUnVuOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgdGhpcy5jYXRhKGZuLCBub29wKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTb21lKCkgPyBcIkp1c3QoXCIgKyB0aGlzLnZhbCArIFwiKVwiIDogXCJOb3RoaW5nXCI7XG4gICAgICAgIH0sXG4gICAgICAgIGluc3BlY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTWF5YmUucHJvdG90eXBlLm9ySnVzdCA9IE1heWJlLnByb3RvdHlwZS5nZXRPckVsc2UgPSBNYXliZS5wcm90b3R5cGUub3JTb21lO1xuICAgIE1heWJlLnByb3RvdHlwZS5qdXN0ID0gTWF5YmUucHJvdG90eXBlLnNvbWU7XG4gICAgTWF5YmUucHJvdG90eXBlLmlzSnVzdCA9IE1heWJlLnByb3RvdHlwZS5pc1NvbWU7XG4gICAgTWF5YmUucHJvdG90eXBlLmlzTm90aGluZyA9IE1heWJlLnByb3RvdHlwZS5pc05vbmU7XG4gICAgTWF5YmUucHJvdG90eXBlLm9yTm90aGluZ0lmID0gTWF5YmUucHJvdG90eXBlLm9yTm9uZUlmO1xuICAgIE1heWJlLmZuLmluaXQucHJvdG90eXBlID0gTWF5YmUuZm47XG4gICAgc2V0VHlwZShNYXliZSwgVFlQRVNfTkFNRVMuTWF5YmUpO1xuICAgIHNldFR5cGUoTWF5YmUuZm4uaW5pdCwgVFlQRVNfTkFNRVMuTWF5YmUpO1xuICAgIE1heWJlLmlzSW5zdGFuY2UgPSBpc0luc3RhbmNlKFRZUEVTX05BTUVTLk1heWJlKTtcbiAgICBNYXliZS5pc09mVHlwZSA9IGlzT2ZUeXBlKFRZUEVTX05BTUVTLk1heWJlKTtcbiAgICB2YXIgVmFsaWRhdGlvbiA9IE1vbmV0LlZhbGlkYXRpb24gPSB7fTtcbiAgICB2YXIgU3VjY2VzcyA9IFZhbGlkYXRpb24uU3VjY2VzcyA9IFZhbGlkYXRpb24uc3VjY2VzcyA9IE1vbmV0LlN1Y2Nlc3MgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWYWxpZGF0aW9uLmZuLmluaXQodmFsLCB0cnVlKTtcbiAgICB9O1xuICAgIHZhciBGYWlsID0gVmFsaWRhdGlvbi5GYWlsID0gVmFsaWRhdGlvbi5mYWlsID0gTW9uZXQuRmFpbCA9IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmFsaWRhdGlvbi5mbi5pbml0KGVycm9yLCBmYWxzZSk7XG4gICAgfTtcbiAgICBWYWxpZGF0aW9uLm9mID0gZnVuY3Rpb24odikge1xuICAgICAgICByZXR1cm4gU3VjY2Vzcyh2KTtcbiAgICB9O1xuICAgIFZhbGlkYXRpb24uZm4gPSBWYWxpZGF0aW9uLnByb3RvdHlwZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24odmFsLCBzdWNjZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnZhbCA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMuaXNTdWNjZXNzVmFsdWUgPSBzdWNjZXNzO1xuICAgICAgICAgICAgc2V0VHlwZSh0aGlzLCBUWVBFU19OQU1FUy5WYWxpZGF0aW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1N1Y2Nlc3MoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjYWxsIHN1Y2Nlc3MoKSBvbiBhIEZhaWwuXCIpO1xuICAgICAgICB9LFxuICAgICAgICBpc1N1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTdWNjZXNzVmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRmFpbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNTdWNjZXNzVmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdWNjZXNzKCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY2FsbCBmYWlsKCkgb24gYSBTdWNjZXNzLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzU3VjY2VzcygpID8gZm4odGhpcy52YWwpIDogdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgYXA6IGZ1bmN0aW9uKHZhbGlkYXRpb25XaXRoRm4pIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMudmFsO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTdWNjZXNzKCkgPyB2YWxpZGF0aW9uV2l0aEZuLm1hcChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbih2YWx1ZSk7XG4gICAgICAgICAgICB9KSA6IHZhbGlkYXRpb25XaXRoRm4uaXNGYWlsKCkgPyBWYWxpZGF0aW9uLkZhaWwoU2VtaWdyb3VwLmFwcGVuZCh2YWx1ZSwgdmFsaWRhdGlvbldpdGhGbi5mYWlsKCkpKSA6IHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGFjYzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgeCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzU3VjY2Vzc1ZhbHVlID8gVmFsaWRhdGlvbi5zdWNjZXNzKHgpIDogdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgZm9sZExlZnQ6IGZ1bmN0aW9uKGluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9NYXliZSgpLnRvTGlzdCgpLmZvbGRMZWZ0KGluaXRpYWxWYWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZvbGRSaWdodDogZnVuY3Rpb24oaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b01heWJlKCkudG9MaXN0KCkuZm9sZFJpZ2h0KGluaXRpYWxWYWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhdGE6IGZ1bmN0aW9uKGZhaWwsIHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzU3VjY2Vzc1ZhbHVlID8gc3VjY2Vzcyh0aGlzLnZhbCkgOiBmYWlsKHRoaXMudmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2F0Y2hNYXA6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1N1Y2Nlc3MoKSA/IHRoaXMgOiBmbih0aGlzLnZhbCk7XG4gICAgICAgIH0sXG4gICAgICAgIHN3YXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTdWNjZXNzKCkgPyBGYWlsKHRoaXMudmFsKSA6IFN1Y2Nlc3ModGhpcy52YWwpO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsTWFwOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNGYWlsKCkgPyBGYWlsKGZuKHRoaXMudmFsKSkgOiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBiaW1hcDogZnVuY3Rpb24oZmFpbCwgc3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTdWNjZXNzVmFsdWUgPyB0aGlzLm1hcChzdWNjZXNzKSA6IHRoaXMuZmFpbE1hcChmYWlsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9yRWFjaDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHRoaXMuY2F0YShub29wLCBmbik7XG4gICAgICAgIH0sXG4gICAgICAgIGZvckVhY2hGYWlsOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgdGhpcy5jYXRhKGZuLCBub29wKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzOiBmdW5jdGlvbihvdGhlcikge1xuICAgICAgICAgICAgcmV0dXJuIFZhbGlkYXRpb24uaXNPZlR5cGUob3RoZXIpICYmIHRoaXMuY2F0YShmdW5jdGlvbihmYWlsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyLmNhdGEoZXF1YWxzKGZhaWwpLCBmYWxzZUZ1bmN0aW9uKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIuY2F0YShmYWxzZUZ1bmN0aW9uLCBlcXVhbHMoc3VjY2VzcykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvTWF5YmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTdWNjZXNzKCkgPyBTb21lKHRoaXMudmFsKSA6IE5vbmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9FaXRoZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmlzU3VjY2VzcygpID8gUmlnaHQgOiBMZWZ0KSh0aGlzLnZhbCk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5pc1N1Y2Nlc3MoKSA/IFwiU3VjY2VzcyhcIiA6IFwiRmFpbChcIikgKyB0aGlzLnZhbCArIFwiKVwiO1xuICAgICAgICB9LFxuICAgICAgICBpbnNwZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFZhbGlkYXRpb24ucHJvdG90eXBlLmZvbGQgPSBWYWxpZGF0aW9uLnByb3RvdHlwZS5jYXRhO1xuICAgIFZhbGlkYXRpb24uZm4uaW5pdC5wcm90b3R5cGUgPSBWYWxpZGF0aW9uLmZuO1xuICAgIHNldFR5cGUoVmFsaWRhdGlvbiwgVFlQRVNfTkFNRVMuVmFsaWRhdGlvbik7XG4gICAgc2V0VHlwZShWYWxpZGF0aW9uLmZuLmluaXQsIFRZUEVTX05BTUVTLlZhbGlkYXRpb24pO1xuICAgIFZhbGlkYXRpb24uaXNJbnN0YW5jZSA9IGlzSW5zdGFuY2UoVFlQRVNfTkFNRVMuVmFsaWRhdGlvbik7XG4gICAgVmFsaWRhdGlvbi5pc09mVHlwZSA9IGlzT2ZUeXBlKFRZUEVTX05BTUVTLlZhbGlkYXRpb24pO1xuICAgIHZhciBTZW1pZ3JvdXAgPSBNb25ldC5TZW1pZ3JvdXAgPSB7XG4gICAgICAgIGFwcGVuZDogZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oYS5jb25jYXQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHNlbWlncm91cCBhcHBlbmRlciBpbiB0aGUgZW52aXJvbm1lbnQsIFwiICsgXCJwbGVhc2Ugc3BlY2lmeSB5b3VyIG93biBhcHBlbmQgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBNb25hZFQgPSBNb25ldC5tb25hZFRyYW5zZm9ybWVyID0gTW9uZXQuTW9uYWRUID0gTW9uZXQubW9uYWRUID0gZnVuY3Rpb24obW9uYWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb25hZFQuZm4uaW5pdChtb25hZCk7XG4gICAgfTtcbiAgICBNb25hZFQub2YgPSBmdW5jdGlvbihtKSB7XG4gICAgICAgIHJldHVybiBNb25hZFQobSk7XG4gICAgfTtcbiAgICBNb25hZFQuZm4gPSBNb25hZFQucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbihtb25hZCkge1xuICAgICAgICAgICAgdGhpcy5tb25hZCA9IG1vbmFkO1xuICAgICAgICAgICAgc2V0VHlwZShWYWxpZGF0aW9uLCBUWVBFU19OQU1FUy5Nb25hZFQpO1xuICAgICAgICB9LFxuICAgICAgICBtYXA6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9uYWRUKHRoaXMubW9uYWQubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdi5tYXAoZm4pO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIE1vbmFkVCh0aGlzLm1vbmFkLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHYuZmxhdE1hcChmbik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFwOiBmdW5jdGlvbihtb25hZFdpdGhGbikge1xuICAgICAgICAgICAgcmV0dXJuIE1vbmFkVCh0aGlzLm1vbmFkLmZsYXRNYXAoZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb25hZFdpdGhGbi5wZXJmb3JtKCkubWFwKGZ1bmN0aW9uKHYyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2LmFwKHYyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgcGVyZm9ybTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb25hZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9uYWRULmZuLmluaXQucHJvdG90eXBlID0gTW9uYWRULmZuO1xuICAgIHZhciBJTyA9IE1vbmV0LklPID0gTW9uZXQuaW8gPSBmdW5jdGlvbihlZmZlY3RGbikge1xuICAgICAgICByZXR1cm4gbmV3IElPLmZuLmluaXQoZWZmZWN0Rm4pO1xuICAgIH07XG4gICAgSU8ub2YgPSBmdW5jdGlvbihhKSB7XG4gICAgICAgIHJldHVybiBJTyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIElPLmZuID0gSU8ucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbihlZmZlY3RGbikge1xuICAgICAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKGVmZmVjdEZuKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklPIHJlcXVpcmVzIGEgZnVuY3Rpb24uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lZmZlY3RGbiA9IGVmZmVjdEZuO1xuICAgICAgICAgICAgc2V0VHlwZSh0aGlzLCBUWVBFU19OQU1FUy5JTyk7XG4gICAgICAgIH0sXG4gICAgICAgIG1hcDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBJTyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4oc2VsZi5lZmZlY3RGbigpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIElPKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbihzZWxmLmVmZmVjdEZuKCkpLnJ1bigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFwOiBmdW5jdGlvbihpb1dpdGhGbikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIGlvV2l0aEZuLm1hcChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbihzZWxmLmVmZmVjdEZuKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lZmZlY3RGbigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBJTy5mbi5pbml0LnByb3RvdHlwZSA9IElPLmZuO1xuICAgIHNldFR5cGUoSU8sIFRZUEVTX05BTUVTLklPKTtcbiAgICBzZXRUeXBlKElPLmZuLmluaXQsIFRZUEVTX05BTUVTLklPKTtcbiAgICBJTy5pc0luc3RhbmNlID0gaXNJbnN0YW5jZShUWVBFU19OQU1FUy5JTyk7XG4gICAgSU8uaXNPZlR5cGUgPSBpc09mVHlwZShUWVBFU19OQU1FUy5JTyk7XG4gICAgSU8ucHJvdG90eXBlLnBlcmZvcm0gPSBJTy5wcm90b3R5cGUucGVyZm9ybVVuc2FmZUlPID0gSU8ucHJvdG90eXBlLnJ1bjtcbiAgICB2YXIgRWl0aGVyID0gTW9uZXQuRWl0aGVyID0ge307XG4gICAgRWl0aGVyLm9mID0gZnVuY3Rpb24oYSkge1xuICAgICAgICByZXR1cm4gUmlnaHQoYSk7XG4gICAgfTtcbiAgICBFaXRoZXIuZnJvbVRyeSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gRWl0aGVyLnJpZ2h0KGZuKCkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gRWl0aGVyLmxlZnQoZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEVpdGhlci5mcm9tUHJvbWlzZSA9IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihFaXRoZXIuUmlnaHQsIEVpdGhlci5MZWZ0KTtcbiAgICB9O1xuICAgIHZhciBSaWdodCA9IEVpdGhlci5SaWdodCA9IEVpdGhlci5yaWdodCA9IE1vbmV0LlJpZ2h0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHJldHVybiBuZXcgRWl0aGVyLmZuLmluaXQodmFsLCB0cnVlKTtcbiAgICB9O1xuICAgIHZhciBMZWZ0ID0gRWl0aGVyLkxlZnQgPSBFaXRoZXIubGVmdCA9IE1vbmV0LkxlZnQgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFaXRoZXIuZm4uaW5pdCh2YWwsIGZhbHNlKTtcbiAgICB9O1xuICAgIEVpdGhlci5mbiA9IEVpdGhlci5wcm90b3R5cGUgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHZhbCwgaXNSaWdodFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmlzUmlnaHRWYWx1ZSA9IGlzUmlnaHRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICBzZXRUeXBlKHRoaXMsIFRZUEVTX05BTUVTLkVpdGhlcik7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmQ6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1JpZ2h0VmFsdWUgPyBmbih0aGlzLnZhbHVlKSA6IHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGFwOiBmdW5jdGlvbihlaXRoZXJXaXRoRm4pIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzUmlnaHRWYWx1ZSA/IGVpdGhlcldpdGhGbi5tYXAoZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4oc2VsZi52YWx1ZSk7XG4gICAgICAgICAgICB9KSA6IHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGxlZnRNYXA6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0xlZnQoKSA/IExlZnQoZm4odGhpcy52YWx1ZSkpIDogdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgaXNSaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1JpZ2h0VmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGlzTGVmdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNSaWdodCgpO1xuICAgICAgICB9LFxuICAgICAgICByaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1JpZ2h0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjYWxsIHJpZ2h0KCkgb24gYSBMZWZ0LlwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGVmdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1JpZ2h0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY2FsbCBsZWZ0KCkgb24gYSBSaWdodC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9sZExlZnQ6IGZ1bmN0aW9uKGluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9NYXliZSgpLnRvTGlzdCgpLmZvbGRMZWZ0KGluaXRpYWxWYWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZvbGRSaWdodDogZnVuY3Rpb24oaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b01heWJlKCkudG9MaXN0KCkuZm9sZFJpZ2h0KGluaXRpYWxWYWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhdGE6IGZ1bmN0aW9uKGxlZnRGbiwgcmlnaHRGbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNSaWdodFZhbHVlID8gcmlnaHRGbih0aGlzLnZhbHVlKSA6IGxlZnRGbih0aGlzLnZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2F0Y2hNYXA6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1JpZ2h0KCkgPyB0aGlzIDogZm4odGhpcy52YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHN3YXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNSaWdodCgpID8gTGVmdCh0aGlzLnZhbHVlKSA6IFJpZ2h0KHRoaXMudmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBmb3JFYWNoOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgdGhpcy5jYXRhKG5vb3AsIGZuKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9yRWFjaExlZnQ6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGEoZm4sIG5vb3ApO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHM6IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gRWl0aGVyLmlzT2ZUeXBlKG90aGVyKSAmJiB0aGlzLmNhdGEoZnVuY3Rpb24obGVmdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvdGhlci5jYXRhKGVxdWFscyhsZWZ0KSwgZmFsc2VGdW5jdGlvbik7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyaWdodCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvdGhlci5jYXRhKGZhbHNlRnVuY3Rpb24sIGVxdWFscyhyaWdodCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbWFwOiBmdW5jdGlvbihsZWZ0Rm4sIHJpZ2h0Rm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzUmlnaHRWYWx1ZSA/IHRoaXMubWFwKHJpZ2h0Rm4pIDogdGhpcy5sZWZ0TWFwKGxlZnRGbik7XG4gICAgICAgIH0sXG4gICAgICAgIHRvTWF5YmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNSaWdodCgpID8gU29tZSh0aGlzLnZhbHVlKSA6IE5vbmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9WYWxpZGF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzUmlnaHQoKSA/IFN1Y2Nlc3ModGhpcy52YWx1ZSkgOiBGYWlsKHRoaXMudmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXRhKGZ1bmN0aW9uKGxlZnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJMZWZ0KFwiICsgbGVmdCArIFwiKVwiO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmlnaHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJSaWdodChcIiArIHJpZ2h0ICsgXCIpXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9Qcm9taXNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhdGEoZnVuY3Rpb24obGVmdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChsZWZ0KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyaWdodCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5zcGVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFaXRoZXIucHJvdG90eXBlLmZvbGQgPSBFaXRoZXIucHJvdG90eXBlLmNhdGE7XG4gICAgRWl0aGVyLmZuLmluaXQucHJvdG90eXBlID0gRWl0aGVyLmZuO1xuICAgIHNldFR5cGUoRWl0aGVyLCBUWVBFU19OQU1FUy5FaXRoZXIpO1xuICAgIHNldFR5cGUoRWl0aGVyLmZuLmluaXQsIFRZUEVTX05BTUVTLkVpdGhlcik7XG4gICAgRWl0aGVyLmlzSW5zdGFuY2UgPSBpc0luc3RhbmNlKFRZUEVTX05BTUVTLkVpdGhlcik7XG4gICAgRWl0aGVyLmlzT2ZUeXBlID0gaXNPZlR5cGUoVFlQRVNfTkFNRVMuRWl0aGVyKTtcbiAgICB2YXIgUmVhZGVyID0gTW9uZXQuUmVhZGVyID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWFkZXIuZm4uaW5pdChmbik7XG4gICAgfTtcbiAgICBSZWFkZXIub2YgPSBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiBSZWFkZXIoZnVuY3Rpb24oXykge1xuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVhZGVyLmFzayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUmVhZGVyKGlkRnVuY3Rpb24pO1xuICAgIH07XG4gICAgUmVhZGVyLmZuID0gUmVhZGVyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHRoaXMuZiA9IGZuO1xuICAgICAgICAgICAgc2V0VHlwZSh0aGlzLCBUWVBFU19OQU1FUy5SZWFkZXIpO1xuICAgICAgICB9LFxuICAgICAgICBydW46IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZihjb25maWcpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIFJlYWRlcihmdW5jdGlvbihjb25maWcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4oc2VsZi5ydW4oY29uZmlnKSkucnVuKGNvbmZpZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYXA6IGZ1bmN0aW9uKHJlYWRlcldpdGhGbikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRlcldpdGhGbi5iaW5kKGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWRlcihmdW5jdGlvbihjb25maWcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKHNlbGYucnVuKGNvbmZpZykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG1hcDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBSZWFkZXIoZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKHNlbGYucnVuKGNvbmZpZykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxvY2FsOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIFJlYWRlcihmdW5jdGlvbihjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYucnVuKGZuKGMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSZWFkZXIuZm4uaW5pdC5wcm90b3R5cGUgPSBSZWFkZXIuZm47XG4gICAgc2V0VHlwZShSZWFkZXIsIFRZUEVTX05BTUVTLlJlYWRlcik7XG4gICAgc2V0VHlwZShSZWFkZXIuZm4uaW5pdCwgVFlQRVNfTkFNRVMuUmVhZGVyKTtcbiAgICBSZWFkZXIuaXNJbnN0YW5jZSA9IGlzSW5zdGFuY2UoVFlQRVNfTkFNRVMuUmVhZGVyKTtcbiAgICBSZWFkZXIuaXNPZlR5cGUgPSBpc09mVHlwZShUWVBFU19OQU1FUy5SZWFkZXIpO1xuICAgIHZhciBGcmVlID0gTW9uZXQuRnJlZSA9IHt9O1xuICAgIHZhciBTdXNwZW5kID0gRnJlZS5TdXNwZW5kID0gTW9uZXQuU3VzcGVuZCA9IGZ1bmN0aW9uKGZ1bmN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGcmVlLmZuLmluaXQoZnVuY3RvciwgdHJ1ZSk7XG4gICAgfTtcbiAgICB2YXIgUmV0dXJuID0gRnJlZS5SZXR1cm4gPSBNb25ldC5SZXR1cm4gPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGcmVlLmZuLmluaXQodmFsLCBmYWxzZSk7XG4gICAgfTtcbiAgICBGcmVlLm9mID0gZnVuY3Rpb24oYSkge1xuICAgICAgICByZXR1cm4gUmV0dXJuKGEpO1xuICAgIH07XG4gICAgRnJlZS5saWZ0RiA9IGZ1bmN0aW9uKGZ1bmN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24oZnVuY3RvcikgPyBTdXNwZW5kKGNvbXBvc2UoUmV0dXJuLCBmdW5jdG9yKSkgOiBTdXNwZW5kKGZ1bmN0b3IubWFwKFJldHVybikpO1xuICAgIH07XG4gICAgRnJlZS5mbiA9IEZyZWUucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbih2YWwsIGlzU3VzcGVuZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N1c3BlbmQgPSBpc1N1c3BlbmQ7XG4gICAgICAgICAgICBpZiAoaXNTdXNwZW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mdW5jdG9yID0gdmFsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbCA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFR5cGUodGhpcywgVFlQRVNfTkFNRVMuRnJlZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nbyhmdW5jdGlvbihmKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTdXNwZW5kID8gaXNGdW5jdGlvbih0aGlzLmZ1bmN0b3IpID8gU3VzcGVuZChjb21wb3NlKGZ1bmN0aW9uKGZyZWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJlZS5iaW5kKGZuKTtcbiAgICAgICAgICAgIH0sIHRoaXMuZnVuY3RvcikpIDogU3VzcGVuZCh0aGlzLmZ1bmN0b3IubWFwKGZ1bmN0aW9uKGZyZWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJlZS5iaW5kKGZuKTtcbiAgICAgICAgICAgIH0pKSA6IGZuKHRoaXMudmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgYXA6IGZ1bmN0aW9uKGZmKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5iaW5kKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmYubWFwKGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGYoeCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVzdW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzU3VzcGVuZCA/IExlZnQodGhpcy5mdW5jdG9yKSA6IFJpZ2h0KHRoaXMudmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ28xOiBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBnbzIodCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0LnJlc3VtZSgpLmNhdGEoZnVuY3Rpb24oZnVuY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ28yKGYoZnVuY3RvcikpO1xuICAgICAgICAgICAgICAgIH0sIGlkRnVuY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdvMih0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ286IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnJlc3VtZSgpO1xuICAgICAgICAgICAgd2hpbGUgKHJlc3VsdC5pc0xlZnQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gZihyZXN1bHQubGVmdCgpKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXh0LnJlc3VtZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5yaWdodCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBGcmVlLmZuLmluaXQucHJvdG90eXBlID0gRnJlZS5mbjtcbiAgICBzZXRUeXBlKEZyZWUsIFRZUEVTX05BTUVTLkZyZWUpO1xuICAgIHNldFR5cGUoRnJlZS5mbi5pbml0LCBUWVBFU19OQU1FUy5GcmVlKTtcbiAgICBGcmVlLmlzSW5zdGFuY2UgPSBpc0luc3RhbmNlKFRZUEVTX05BTUVTLkZyZWUpO1xuICAgIEZyZWUuaXNPZlR5cGUgPSBpc09mVHlwZShUWVBFU19OQU1FUy5GcmVlKTtcbiAgICBmdW5jdGlvbiBJZGVudGl0eShhKSB7XG4gICAgICAgIHJldHVybiBuZXcgSWRlbnRpdHkuZm4uaW5pdChhKTtcbiAgICB9XG4gICAgTW9uZXQuSWRlbnRpdHkgPSBJZGVudGl0eTtcbiAgICBJZGVudGl0eS5vZiA9IGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJZGVudGl0eShhKTtcbiAgICB9O1xuICAgIElkZW50aXR5LmZuID0gSWRlbnRpdHkucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHRoaXMudmFsID0gdmFsO1xuICAgICAgICAgICAgc2V0VHlwZSh0aGlzLCBUWVBFU19OQU1FUy5JZGVudGl0eSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmQ6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4odGhpcy52YWwpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsO1xuICAgICAgICB9LFxuICAgICAgICBmb3JFYWNoOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgZm4odGhpcy52YWwpO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHM6IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gSWRlbnRpdHkuaXNPZlR5cGUob3RoZXIpICYmIGVxdWFscyh0aGlzLmdldCgpKShvdGhlci5nZXQoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhaW5zOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmVFcXVhbCh0aGlzLnZhbCwgdmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiSWRlbnRpdHkoXCIgKyB0aGlzLnZhbCArIFwiKVwiO1xuICAgICAgICB9LFxuICAgICAgICBpbnNwZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFwOiBmdW5jdGlvbihhcHBseVdpdGhGdW5jdGlvbikge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52YWw7XG4gICAgICAgICAgICByZXR1cm4gYXBwbHlXaXRoRnVuY3Rpb24ubWFwKGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBbIHRoaXMuZ2V0KCkgXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9MaXN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0KHRoaXMuZ2V0KCksIE5pbCk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvU2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBJZGVudGl0eS5mbi5pbml0LnByb3RvdHlwZSA9IElkZW50aXR5LmZuO1xuICAgIHNldFR5cGUoSWRlbnRpdHksIFRZUEVTX05BTUVTLklkZW50aXR5KTtcbiAgICBzZXRUeXBlKElkZW50aXR5LmZuLmluaXQsIFRZUEVTX05BTUVTLklkZW50aXR5KTtcbiAgICBJZGVudGl0eS5pc0luc3RhbmNlID0gaXNJbnN0YW5jZShUWVBFU19OQU1FUy5JZGVudGl0eSk7XG4gICAgSWRlbnRpdHkuaXNPZlR5cGUgPSBpc09mVHlwZShUWVBFU19OQU1FUy5JZGVudGl0eSk7XG4gICAgZnVuY3Rpb24gYWRkRmFudGFzeUxhbmRBbGlhc2VzKHR5cGUpIHtcbiAgICAgICAgWyBcImVxdWFsc1wiLCBcIm1hcFwiLCBcImFwXCIsIFwiY2hhaW5cIiBdLmZpbHRlcihmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKHR5cGUucHJvdG90eXBlW21ldGhvZF0pO1xuICAgICAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgdHlwZS5wcm90b3R5cGVbXCJmYW50YXN5LWxhbmQvXCIgKyBtZXRob2RdID0gdHlwZS5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZEFsaWFzZXModHlwZSkge1xuICAgICAgICB0eXBlLnByb3RvdHlwZS5mbGF0TWFwID0gdHlwZS5wcm90b3R5cGUuY2hhaW4gPSB0eXBlLnByb3RvdHlwZS5iaW5kO1xuICAgICAgICB0eXBlLnB1cmUgPSB0eXBlLnVuaXQgPSB0eXBlLm9mO1xuICAgICAgICB0eXBlLnByb3RvdHlwZS5vZiA9IHR5cGUub2Y7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHR5cGUucHJvdG90eXBlLmFwcGVuZCkpIHtcbiAgICAgICAgICAgIHR5cGUucHJvdG90eXBlLmNvbmNhdCA9IHR5cGUucHJvdG90eXBlLmFwcGVuZDtcbiAgICAgICAgfVxuICAgICAgICB0eXBlLnByb3RvdHlwZS5wb2ludCA9IHR5cGUucHJvdG90eXBlLnB1cmUgPSB0eXBlLnByb3RvdHlwZS51bml0ID0gdHlwZS5wcm90b3R5cGUub2Y7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZEZpbHRlck5vdCh0eXBlKSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHR5cGUucHJvdG90eXBlLmZpbHRlcikpIHtcbiAgICAgICAgICAgIHR5cGUucHJvdG90eXBlLmZpbHRlck5vdCA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFmbihhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkTW9uYWRPcHModHlwZSkge1xuICAgICAgICB0eXBlLnByb3RvdHlwZS5qb2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mbGF0TWFwKGlkRnVuY3Rpb24pO1xuICAgICAgICB9O1xuICAgICAgICB0eXBlLm1hcDIgPSBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG1hLCBtYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYS5mbGF0TWFwKGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1iLm1hcChmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4oYSwgYik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkRnVuY3Rvck9wcyh0eXBlKSB7XG4gICAgICAgIGlmICghaXNGdW5jdGlvbih0eXBlLnByb3RvdHlwZS5tYXApKSB7XG4gICAgICAgICAgICB0eXBlLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJpbmQoY29tcG9zZSh0aGlzLm9mLCBmbikpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRBcHBsaWNhdGl2ZU9wcyh0eXBlKSB7XG4gICAgICAgIHR5cGUucHJvdG90eXBlLnRha2VMZWZ0ID0gZnVuY3Rpb24obSkge1xuICAgICAgICAgICAgcmV0dXJuIGFwcGx5Mih0aGlzLCBtLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdHlwZS5wcm90b3R5cGUudGFrZVJpZ2h0ID0gZnVuY3Rpb24obSkge1xuICAgICAgICAgICAgcmV0dXJuIGFwcGx5Mih0aGlzLCBtLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkQ29sbGVjdGlvblByZWRpY2F0ZXModHlwZSkge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0eXBlLnByb3RvdHlwZS50b0FycmF5KSkge1xuICAgICAgICAgICAgdHlwZS5wcm90b3R5cGUuZXZlcnkgPSB0eXBlLnByb3RvdHlwZS5mb3JhbGwgPSBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvQXJyYXkoKS5ldmVyeShmbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHlwZS5wcm90b3R5cGUuZXhpc3RzID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0FycmF5KCkuc29tZShmbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1ha2VJdGVyYWJsZSh0eXBlKSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHR5cGUucHJvdG90eXBlLnRvQXJyYXkpKSB7XG4gICAgICAgICAgICB0eXBlLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9BcnJheSgpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkVG9PcGVyYXRvcih0eXBlKSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHR5cGUucHJvdG90eXBlLnRvQXJyYXkpKSB7XG4gICAgICAgICAgICB0eXBlLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uKGN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3Rvcih0aGlzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGVjb3JhdGUodHlwZSkge1xuICAgICAgICBhZGRBbGlhc2VzKHR5cGUpO1xuICAgICAgICBhZGRGaWx0ZXJOb3QodHlwZSk7XG4gICAgICAgIGFkZE1vbmFkT3BzKHR5cGUpO1xuICAgICAgICBhZGRGdW5jdG9yT3BzKHR5cGUpO1xuICAgICAgICBhZGRBcHBsaWNhdGl2ZU9wcyh0eXBlKTtcbiAgICAgICAgYWRkQ29sbGVjdGlvblByZWRpY2F0ZXModHlwZSk7XG4gICAgICAgIGFkZEZhbnRhc3lMYW5kQWxpYXNlcyh0eXBlKTtcbiAgICAgICAgbWFrZUl0ZXJhYmxlKHR5cGUpO1xuICAgICAgICBhZGRUb09wZXJhdG9yKHR5cGUpO1xuICAgIH1cbiAgICBkZWNvcmF0ZShNb25hZFQpO1xuICAgIGRlY29yYXRlKEVpdGhlcik7XG4gICAgZGVjb3JhdGUoTWF5YmUpO1xuICAgIGRlY29yYXRlKElPKTtcbiAgICBkZWNvcmF0ZShORUwpO1xuICAgIGRlY29yYXRlKExpc3QpO1xuICAgIGRlY29yYXRlKFZhbGlkYXRpb24pO1xuICAgIGRlY29yYXRlKFJlYWRlcik7XG4gICAgZGVjb3JhdGUoRnJlZSk7XG4gICAgZGVjb3JhdGUoSWRlbnRpdHkpO1xuICAgIHJldHVybiBNb25ldDtcbn0pOyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlNpZ25hbExpc3QgPSBleHBvcnRzLlNpZ25hbEhhbmRsaW5nQmFzZSA9IGV4cG9ydHMuU2lnbmFsRGlzcGF0Y2hlciA9IHZvaWQgMDtcclxudmFyIHNpZ25hbHNfMSA9IHJlcXVpcmUoXCIuL3NpZ25hbHNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNpZ25hbERpc3BhdGNoZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNpZ25hbHNfMS5TaWduYWxEaXNwYXRjaGVyOyB9IH0pO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTaWduYWxIYW5kbGluZ0Jhc2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNpZ25hbHNfMS5TaWduYWxIYW5kbGluZ0Jhc2U7IH0gfSk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNpZ25hbExpc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNpZ25hbHNfMS5TaWduYWxMaXN0OyB9IH0pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlNpZ25hbEhhbmRsaW5nQmFzZSA9IGV4cG9ydHMuU2lnbmFsTGlzdCA9IGV4cG9ydHMuU2lnbmFsRGlzcGF0Y2hlciA9IHZvaWQgMDtcclxudmFyIHN0ZV9jb3JlXzEgPSByZXF1aXJlKFwic3RlLWNvcmVcIik7XHJcbi8qKlxyXG4gKiBUaGUgZGlzcGF0Y2hlciBoYW5kbGVzIHRoZSBzdG9yYWdlIG9mIHN1YnNjaXB0aW9ucyBhbmQgZmFjaWxpdGF0ZXNcclxuICogc3Vic2NyaXB0aW9uLCB1bnN1YnNjcmlwdGlvbiBhbmQgZGlzcGF0Y2hpbmcgb2YgYSBzaWduYWwgZXZlbnQuXHJcbiAqL1xyXG52YXIgU2lnbmFsRGlzcGF0Y2hlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhTaWduYWxEaXNwYXRjaGVyLCBfc3VwZXIpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFNpZ25hbERpc3BhdGNoZXIgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFNpZ25hbERpc3BhdGNoZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIERpc3BhdGNoZXMgdGhlIHNpZ25hbC5cclxuICAgICAqL1xyXG4gICAgU2lnbmFsRGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goZmFsc2UsIHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwYXRjaGVzIHRoZSBzaWduYWwgdGhyZWFkZWQuXHJcbiAgICAgKi9cclxuICAgIFNpZ25hbERpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoQXN5bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2godHJ1ZSwgdGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gZXZlbnQgZnJvbSB0aGUgZGlzcGF0Y2hlci4gV2lsbCByZXR1cm4gdGhlIGRpc3BhdGNoZXJcclxuICAgICAqIGluIGEgd3JhcHBlci4gVGhpcyB3aWxsIHByZXZlbnQgZXhwb3N1cmUgb2YgYW55IGRpc3BhdGNoZXIgbWV0aG9kcy5cclxuICAgICAqL1xyXG4gICAgU2lnbmFsRGlzcGF0Y2hlci5wcm90b3R5cGUuYXNFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5hc0V2ZW50LmNhbGwodGhpcyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFNpZ25hbERpc3BhdGNoZXI7XHJcbn0oc3RlX2NvcmVfMS5EaXNwYXRjaGVyQmFzZSkpO1xyXG5leHBvcnRzLlNpZ25hbERpc3BhdGNoZXIgPSBTaWduYWxEaXNwYXRjaGVyO1xyXG4vKipcclxuICogU3RvcmFnZSBjbGFzcyBmb3IgbXVsdGlwbGUgc2lnbmFsIGV2ZW50cyB0aGF0IGFyZSBhY2Nlc3NpYmxlIGJ5IG5hbWUuXHJcbiAqIEV2ZW50cyBkaXNwYXRjaGVycyBhcmUgYXV0b21hdGljYWxseSBjcmVhdGVkLlxyXG4gKi9cclxudmFyIFNpZ25hbExpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoU2lnbmFsTGlzdCwgX3N1cGVyKTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBTaWduYWxMaXN0IGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBTaWduYWxMaXN0KCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGRpc3BhdGNoZXIgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIFNpZ25hbExpc3QucHJvdG90eXBlLmNyZWF0ZURpc3BhdGNoZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTaWduYWxEaXNwYXRjaGVyKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFNpZ25hbExpc3Q7XHJcbn0oc3RlX2NvcmVfMS5FdmVudExpc3RCYXNlKSk7XHJcbmV4cG9ydHMuU2lnbmFsTGlzdCA9IFNpZ25hbExpc3Q7XHJcbi8qKlxyXG4gKiBFeHRlbmRzIG9iamVjdHMgd2l0aCBzaWduYWwgZXZlbnQgaGFuZGxpbmcgY2FwYWJpbGl0aWVzLlxyXG4gKi9cclxudmFyIFNpZ25hbEhhbmRsaW5nQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFNpZ25hbEhhbmRsaW5nQmFzZSgpIHtcclxuICAgICAgICB0aGlzLl9ldmVudHMgPSBuZXcgU2lnbmFsTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNpZ25hbEhhbmRsaW5nQmFzZS5wcm90b3R5cGUsIFwiZXZlbnRzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIFN1YnNjcmliZXMgb25jZSB0byB0aGUgZXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXHJcbiAgICAgKiBAcGFyYW0gZm4gVGhlIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAgKi9cclxuICAgIFNpZ25hbEhhbmRsaW5nQmFzZS5wcm90b3R5cGUub25lID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLmdldChuYW1lKS5vbmUoZm4pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGl0IHRoZSBldmVudCBoYXMgYSBzdWJzY3JpcHRpb24gZm9yIHRoZSBzcGVjaWZpZWQgaGFuZGxlci5cclxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudC5cclxuICAgICAqIEBwYXJhbSBmbiBUaGUgZXZlbnQgaGFuZGxlci5cclxuICAgICAqL1xyXG4gICAgU2lnbmFsSGFuZGxpbmdCYXNlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzLmdldChuYW1lKS5oYXMoZm4pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3Vic2NyaWJlcyB0byB0aGUgZXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXHJcbiAgICAgKiBAcGFyYW0gZm4gVGhlIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAgKi9cclxuICAgIFNpZ25hbEhhbmRsaW5nQmFzZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLmdldChuYW1lKS5zdWJzY3JpYmUoZm4pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3Vic2NyaWJlcyB0byB0aGUgZXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXHJcbiAgICAgKiBAcGFyYW0gZm4gVGhlIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAgKi9cclxuICAgIFNpZ25hbEhhbmRsaW5nQmFzZS5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUobmFtZSwgZm4pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVW5zdWJzY3JpYmVzIGZyb20gdGhlIGV2ZW50IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLlxyXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxyXG4gICAgICogQHBhcmFtIGZuIFRoZSBldmVudCBoYW5kbGVyLlxyXG4gICAgICovXHJcbiAgICBTaWduYWxIYW5kbGluZ0Jhc2UucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLmdldChuYW1lKS51bnN1YnNjcmliZShmbik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVbnN1YnNjcmliZXMgZnJvbSB0aGUgZXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXHJcbiAgICAgKiBAcGFyYW0gZm4gVGhlIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAgKi9cclxuICAgIFNpZ25hbEhhbmRsaW5nQmFzZS5wcm90b3R5cGUudW5zdWIgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcclxuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKG5hbWUsIGZuKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU2lnbmFsSGFuZGxpbmdCYXNlO1xyXG59KCkpO1xyXG5leHBvcnRzLlNpZ25hbEhhbmRsaW5nQmFzZSA9IFNpZ25hbEhhbmRsaW5nQmFzZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX3NwcmVhZEFycmF5cyA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheXMpIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuRGlzcGF0Y2hlcldyYXBwZXIgPSBleHBvcnRzLkV2ZW50TGlzdEJhc2UgPSBleHBvcnRzLkRpc3BhdGNoZXJCYXNlID0gdm9pZCAwO1xyXG52YXIgbWFuYWdlbWVudF8xID0gcmVxdWlyZShcIi4vbWFuYWdlbWVudFwiKTtcclxudmFyIHN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4vc3Vic2NyaXB0aW9uXCIpO1xyXG4vKipcclxuICogQmFzZSBjbGFzcyBmb3IgaW1wbGVtZW50YXRpb24gb2YgdGhlIGRpc3BhdGNoZXIuIEl0IGZhY2lsaXRhdGVzIHRoZSBzdWJzY3JpYmVcclxuICogYW5kIHVuc3Vic2NyaWJlIG1ldGhvZHMgYmFzZWQgb24gZ2VuZXJpYyBoYW5kbGVycy4gVGhlIFRFdmVudFR5cGUgc3BlY2lmaWVzXHJcbiAqIHRoZSB0eXBlIG9mIGV2ZW50IHRoYXQgc2hvdWxkIGJlIGV4cG9zZWQuIFVzZSB0aGUgYXNFdmVudCB0byBleHBvc2UgdGhlXHJcbiAqIGRpc3BhdGNoZXIgYXMgZXZlbnQuXHJcbiAqL1xyXG52YXIgRGlzcGF0Y2hlckJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBEaXNwYXRjaGVyQmFzZSgpIHtcclxuICAgICAgICB0aGlzLl93cmFwID0gbmV3IERpc3BhdGNoZXJXcmFwcGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBuZXcgQXJyYXkoKTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEaXNwYXRjaGVyQmFzZS5wcm90b3R5cGUsIFwiY291bnRcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBzdWJzY3JpcHRpb25zLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJlYWRvbmx5XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAbWVtYmVyT2YgRGlzcGF0Y2hlckJhc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnNjcmlwdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogU3Vic2NyaWJlIHRvIHRoZSBldmVudCBkaXNwYXRjaGVyLlxyXG4gICAgICogQHBhcmFtIGZuIFRoZSBldmVudCBoYW5kbGVyIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXHJcbiAgICAgKiBAcmV0dXJucyBBIGZ1bmN0aW9uIHRoYXQgdW5zdWJzY3JpYmVzIHRoZSBldmVudCBoYW5kbGVyIGZyb20gdGhlIGV2ZW50LlxyXG4gICAgICovXHJcbiAgICBEaXNwYXRjaGVyQmFzZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoZm4pIHtcclxuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG5ldyBzdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24oZm4sIGZhbHNlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnVuc3Vic2NyaWJlKGZuKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3Vic2NyaWJlIHRvIHRoZSBldmVudCBkaXNwYXRjaGVyLlxyXG4gICAgICogQHBhcmFtIGZuIFRoZSBldmVudCBoYW5kbGVyIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXHJcbiAgICAgKiBAcmV0dXJucyBBIGZ1bmN0aW9uIHRoYXQgdW5zdWJzY3JpYmVzIHRoZSBldmVudCBoYW5kbGVyIGZyb20gdGhlIGV2ZW50LlxyXG4gICAgICovXHJcbiAgICBEaXNwYXRjaGVyQmFzZS5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlKGZuKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN1YnNjcmliZSBvbmNlIHRvIHRoZSBldmVudCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBmbiBUaGUgZXZlbnQgaGFuZGxlciB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxyXG4gICAgICogQHJldHVybnMgQSBmdW5jdGlvbiB0aGF0IHVuc3Vic2NyaWJlcyB0aGUgZXZlbnQgaGFuZGxlciBmcm9tIHRoZSBldmVudC5cclxuICAgICAqL1xyXG4gICAgRGlzcGF0Y2hlckJhc2UucHJvdG90eXBlLm9uZSA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGZuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChuZXcgc3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKGZuLCB0cnVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnVuc3Vic2NyaWJlKGZuKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGl0IHRoZSBldmVudCBoYXMgYSBzdWJzY3JpcHRpb24gZm9yIHRoZSBzcGVjaWZpZWQgaGFuZGxlci5cclxuICAgICAqIEBwYXJhbSBmbiBUaGUgZXZlbnQgaGFuZGxlci5cclxuICAgICAqL1xyXG4gICAgRGlzcGF0Y2hlckJhc2UucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgICAgIGlmICghZm4pXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaXB0aW9ucy5zb21lKGZ1bmN0aW9uIChzdWIpIHsgcmV0dXJuIHN1Yi5oYW5kbGVyID09IGZuOyB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVuc3Vic2NyaWJlcyB0aGUgaGFuZGxlciBmcm9tIHRoZSBkaXNwYXRjaGVyLlxyXG4gICAgICogQHBhcmFtIGZuIFRoZSBldmVudCBoYW5kbGVyLlxyXG4gICAgICovXHJcbiAgICBEaXNwYXRjaGVyQmFzZS5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgICBpZiAoIWZuKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zdWJzY3JpcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdWJzY3JpcHRpb25zW2ldLmhhbmRsZXIgPT0gZm4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVbnN1YnNjcmliZXMgdGhlIGhhbmRsZXIgZnJvbSB0aGUgZGlzcGF0Y2hlci5cclxuICAgICAqIEBwYXJhbSBmbiBUaGUgZXZlbnQgaGFuZGxlci5cclxuICAgICAqL1xyXG4gICAgRGlzcGF0Y2hlckJhc2UucHJvdG90eXBlLnVuc3ViID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZShmbik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmljIGRpc3BhdGNoIHdpbGwgZGlzcGF0Y2ggdGhlIGhhbmRsZXJzIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4ZWN1dGVBc3luYyBUcnVlIGlmIHRoZSBldmVuIHNob3VsZCBiZSBleGVjdXRlZCBhc3luYy5cclxuICAgICAqIEBwYXJhbSB7Kn0gVGhlIHNjb3BlIHRoZSBzY29wZSBvZiB0aGUgZXZlbnQuIFRoZSBzY29wZSBiZWNvbWVzIHRoZSBcInRoaXNcIiBmb3IgaGFuZGxlci5cclxuICAgICAqIEBwYXJhbSB7SUFyZ3VtZW50c30gYXJncyBUaGUgYXJndW1lbnRzIGZvciB0aGUgZXZlbnQuXHJcbiAgICAgKi9cclxuICAgIERpc3BhdGNoZXJCYXNlLnByb3RvdHlwZS5fZGlzcGF0Y2ggPSBmdW5jdGlvbiAoZXhlY3V0ZUFzeW5jLCBzY29wZSwgYXJncykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoc3ViKSB7XHJcbiAgICAgICAgICAgIHZhciBldiA9IG5ldyBtYW5hZ2VtZW50XzEuRXZlbnRNYW5hZ2VtZW50KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnVuc3ViKHN1Yi5oYW5kbGVyKTsgfSk7XHJcbiAgICAgICAgICAgIHZhciBuYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xyXG4gICAgICAgICAgICBuYXJncy5wdXNoKGV2KTtcclxuICAgICAgICAgICAgc3ViLmV4ZWN1dGUoZXhlY3V0ZUFzeW5jLCBzY29wZSwgbmFyZ3MpO1xyXG4gICAgICAgICAgICAvL2NsZWFudXAgc3VicyB0aGF0IGFyZSBubyBsb25nZXIgbmVlZGVkXHJcbiAgICAgICAgICAgIHRoaXNfMS5jbGVhbnVwKHN1Yik7XHJcbiAgICAgICAgICAgIGlmICghZXhlY3V0ZUFzeW5jICYmIGV2LnByb3BhZ2F0aW9uU3RvcHBlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XHJcbiAgICAgICAgLy9leGVjdXRlIG9uIGEgY29weSBiZWNhdXNlIG9mIGJ1ZyAjOVxyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBfX3NwcmVhZEFycmF5cyh0aGlzLl9zdWJzY3JpcHRpb25zKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIHN1YiA9IF9hW19pXTtcclxuICAgICAgICAgICAgdmFyIHN0YXRlXzEgPSBfbG9vcF8xKHN1Yik7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZV8xID09PSBcImJyZWFrXCIpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhbnMgdXAgc3VicyB0aGF0IHJhbiBhbmQgc2hvdWxkIHJ1biBvbmx5IG9uY2UuXHJcbiAgICAgKi9cclxuICAgIERpc3BhdGNoZXJCYXNlLnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24gKHN1Yikge1xyXG4gICAgICAgIGlmIChzdWIuaXNPbmNlICYmIHN1Yi5pc0V4ZWN1dGVkKSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gdGhpcy5fc3Vic2NyaXB0aW9ucy5pbmRleE9mKHN1Yik7XHJcbiAgICAgICAgICAgIGlmIChpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBldmVudCBmcm9tIHRoZSBkaXNwYXRjaGVyLiBXaWxsIHJldHVybiB0aGUgZGlzcGF0Y2hlclxyXG4gICAgICogaW4gYSB3cmFwcGVyLiBUaGlzIHdpbGwgcHJldmVudCBleHBvc3VyZSBvZiBhbnkgZGlzcGF0Y2hlciBtZXRob2RzLlxyXG4gICAgICovXHJcbiAgICBEaXNwYXRjaGVyQmFzZS5wcm90b3R5cGUuYXNFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd3JhcDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBhbGwgdGhlIHN1YnNjcmlwdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIERpc3BhdGNoZXJCYXNlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnNwbGljZSgwLCB0aGlzLl9zdWJzY3JpcHRpb25zLmxlbmd0aCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIERpc3BhdGNoZXJCYXNlO1xyXG59KCkpO1xyXG5leHBvcnRzLkRpc3BhdGNoZXJCYXNlID0gRGlzcGF0Y2hlckJhc2U7XHJcbi8qKlxyXG4gKiBCYXNlIGNsYXNzIGZvciBldmVudCBsaXN0cyBjbGFzc2VzLiBJbXBsZW1lbnRzIHRoZSBnZXQgYW5kIHJlbW92ZS5cclxuICovXHJcbnZhciBFdmVudExpc3RCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRXZlbnRMaXN0QmFzZSgpIHtcclxuICAgICAgICB0aGlzLl9ldmVudHMgPSB7fTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZGlzcGF0Y2hlciBhc3NvY2lhdGVkIHdpdGggdGhlIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXHJcbiAgICAgKi9cclxuICAgIEV2ZW50TGlzdEJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIGV2ZW50ID0gdGhpcy5fZXZlbnRzW25hbWVdO1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV2ZW50ID0gdGhpcy5jcmVhdGVEaXNwYXRjaGVyKCk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzW25hbWVdID0gZXZlbnQ7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZGlzcGF0Y2hlciBhc3NvY2lhdGVkIHdpdGggdGhlIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXHJcbiAgICAgKi9cclxuICAgIEV2ZW50TGlzdEJhc2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1tuYW1lXTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRXZlbnRMaXN0QmFzZTtcclxufSgpKTtcclxuZXhwb3J0cy5FdmVudExpc3RCYXNlID0gRXZlbnRMaXN0QmFzZTtcclxuLyoqXHJcbiAqIEhpZGVzIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgZXZlbnQgZGlzcGF0Y2hlci4gV2lsbCBleHBvc2UgbWV0aG9kcyB0aGF0XHJcbiAqIGFyZSByZWxldmVudCB0byB0aGUgZXZlbnQuXHJcbiAqL1xyXG52YXIgRGlzcGF0Y2hlcldyYXBwZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgRXZlbnREaXNwYXRjaGVyV3JhcHBlciBpbnN0YW5jZS5cclxuICAgICAqIEBwYXJhbSBkaXNwYXRjaGVyIFRoZSBkaXNwYXRjaGVyLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBEaXNwYXRjaGVyV3JhcHBlcihkaXNwYXRjaGVyKSB7XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKGZuKSB7IHJldHVybiBkaXNwYXRjaGVyLnN1YnNjcmliZShmbik7IH07XHJcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGRpc3BhdGNoZXIudW5zdWJzY3JpYmUoZm4pOyB9O1xyXG4gICAgICAgIHRoaXMuX29uZSA9IGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZGlzcGF0Y2hlci5vbmUoZm4pOyB9O1xyXG4gICAgICAgIHRoaXMuX2hhcyA9IGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZGlzcGF0Y2hlci5oYXMoZm4pOyB9O1xyXG4gICAgICAgIHRoaXMuX2NsZWFyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZGlzcGF0Y2hlci5jbGVhcigpOyB9O1xyXG4gICAgICAgIHRoaXMuX2NvdW50ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZGlzcGF0Y2hlci5jb3VudDsgfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEaXNwYXRjaGVyV3JhcHBlci5wcm90b3R5cGUsIFwiY291bnRcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBzdWJzY3JpcHRpb25zLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJlYWRvbmx5XHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKiBAbWVtYmVyT2YgRGlzcGF0Y2hlcldyYXBwZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdWJzY3JpYmUgdG8gdGhlIGV2ZW50IGRpc3BhdGNoZXIuXHJcbiAgICAgKiBAcGFyYW0gZm4gVGhlIGV2ZW50IGhhbmRsZXIgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cclxuICAgICAqIEByZXR1cm5zIEEgZnVuY3Rpb24gdGhhdCB1bnN1YnNjcmliZXMgdGhlIGV2ZW50IGhhbmRsZXIgZnJvbSB0aGUgZXZlbnQuXHJcbiAgICAgKi9cclxuICAgIERpc3BhdGNoZXJXcmFwcGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaWJlKGZuKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN1YnNjcmliZSB0byB0aGUgZXZlbnQgZGlzcGF0Y2hlci5cclxuICAgICAqIEBwYXJhbSBmbiBUaGUgZXZlbnQgaGFuZGxlciB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxyXG4gICAgICogQHJldHVybnMgQSBmdW5jdGlvbiB0aGF0IHVuc3Vic2NyaWJlcyB0aGUgZXZlbnQgaGFuZGxlciBmcm9tIHRoZSBldmVudC5cclxuICAgICAqL1xyXG4gICAgRGlzcGF0Y2hlcldyYXBwZXIucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShmbik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBldmVudCBkaXNwYXRjaGVyLlxyXG4gICAgICogQHBhcmFtIGZuIFRoZSBldmVudCBoYW5kbGVyIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXHJcbiAgICAgKi9cclxuICAgIERpc3BhdGNoZXJXcmFwcGVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlKGZuKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGV2ZW50IGRpc3BhdGNoZXIuXHJcbiAgICAgKiBAcGFyYW0gZm4gVGhlIGV2ZW50IGhhbmRsZXIgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cclxuICAgICAqL1xyXG4gICAgRGlzcGF0Y2hlcldyYXBwZXIucHJvdG90eXBlLnVuc3ViID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZShmbik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdWJzY3JpYmUgb25jZSB0byB0aGUgZXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gZm4gVGhlIGV2ZW50IGhhbmRsZXIgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cclxuICAgICAqL1xyXG4gICAgRGlzcGF0Y2hlcldyYXBwZXIucHJvdG90eXBlLm9uZSA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vbmUoZm4pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGl0IHRoZSBldmVudCBoYXMgYSBzdWJzY3JpcHRpb24gZm9yIHRoZSBzcGVjaWZpZWQgaGFuZGxlci5cclxuICAgICAqIEBwYXJhbSBmbiBUaGUgZXZlbnQgaGFuZGxlci5cclxuICAgICAqL1xyXG4gICAgRGlzcGF0Y2hlcldyYXBwZXIucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oYXMoZm4pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIGFsbCB0aGUgc3Vic2NyaXB0aW9ucy5cclxuICAgICAqL1xyXG4gICAgRGlzcGF0Y2hlcldyYXBwZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2NsZWFyKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIERpc3BhdGNoZXJXcmFwcGVyO1xyXG59KCkpO1xyXG5leHBvcnRzLkRpc3BhdGNoZXJXcmFwcGVyID0gRGlzcGF0Y2hlcldyYXBwZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vKiFcclxuICogU3Ryb25nbHkgVHlwZWQgRXZlbnRzIGZvciBUeXBlU2NyaXB0IC0gQ29yZVxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vS2Vlc0NCYWtrZXIvU3Ryb25seVR5cGVkRXZlbnRzL1xyXG4gKiBodHRwOi8va2Vlc3RhbGtzdGVjaC5jb21cclxuICpcclxuICogQ29weXJpZ2h0IEtlZXMgQy4gQmFra2VyIC8gS2Vlc1RhbGtzVGVjaFxyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5TdWJzY3JpcHRpb24gPSBleHBvcnRzLkV2ZW50TGlzdEJhc2UgPSBleHBvcnRzLkRpc3BhdGNoZXJXcmFwcGVyID0gZXhwb3J0cy5EaXNwYXRjaGVyQmFzZSA9IHZvaWQgMDtcclxudmFyIGRpc3BhdGNoaW5nXzEgPSByZXF1aXJlKFwiLi9kaXNwYXRjaGluZ1wiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRGlzcGF0Y2hlckJhc2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRpc3BhdGNoaW5nXzEuRGlzcGF0Y2hlckJhc2U7IH0gfSk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRpc3BhdGNoZXJXcmFwcGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkaXNwYXRjaGluZ18xLkRpc3BhdGNoZXJXcmFwcGVyOyB9IH0pO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFdmVudExpc3RCYXNlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkaXNwYXRjaGluZ18xLkV2ZW50TGlzdEJhc2U7IH0gfSk7XHJcbnZhciBzdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuL3N1YnNjcmlwdGlvblwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU3Vic2NyaXB0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb247IH0gfSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuRXZlbnRNYW5hZ2VtZW50ID0gdm9pZCAwO1xyXG4vKipcclxuICogQWxsb3dzIHRoZSB1c2VyIHRvIGludGVyYWN0IHdpdGggdGhlIGV2ZW50LlxyXG4gKlxyXG4gKiBAY2xhc3MgRXZlbnRNYW5hZ2VtZW50XHJcbiAqIEBpbXBsZW1lbnRzIHtJRXZlbnRNYW5hZ2VtZW50fVxyXG4gKi9cclxudmFyIEV2ZW50TWFuYWdlbWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEV2ZW50TWFuYWdlbWVudCh1bnN1Yikge1xyXG4gICAgICAgIHRoaXMudW5zdWIgPSB1bnN1YjtcclxuICAgICAgICB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgRXZlbnRNYW5hZ2VtZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBFdmVudE1hbmFnZW1lbnQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuRXZlbnRNYW5hZ2VtZW50ID0gRXZlbnRNYW5hZ2VtZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlN1YnNjcmlwdGlvbiA9IHZvaWQgMDtcclxuLyoqXHJcbiAqIFN0b3JlcyBhIGhhbmRsZXIuIE1hbmFnZXMgZXhlY3V0aW9uIG1ldGEgZGF0YS5cclxuICogQGNsYXNzIFN1YnNjcmlwdGlvblxyXG4gKiBAdGVtcGxhdGUgVEV2ZW50SGFuZGxlclxyXG4gKi9cclxudmFyIFN1YnNjcmlwdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTdWJzY3JpcHRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtURXZlbnRIYW5kbGVyfSBoYW5kbGVyIFRoZSBoYW5kbGVyIGZvciB0aGUgc3Vic2NyaXB0aW9uLlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc09uY2UgSW5kaWNhdGVzIGlmIHRoZSBoYW5kbGVyIHNob3VsZCBvbmx5IGJlIGV4ZWN1dGVkIG9uY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbihoYW5kbGVyLCBpc09uY2UpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgIHRoaXMuaXNPbmNlID0gaXNPbmNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGljYXRlcyBpZiB0aGUgc3Vic2NyaXB0aW9uIGhhcyBiZWVuIGV4ZWN1dGVkIGJlZm9yZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlzRXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgdGhlIGhhbmRsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBleGVjdXRlQXN5bmMgVHJ1ZSBpZiB0aGUgZXZlbiBzaG91bGQgYmUgZXhlY3V0ZWQgYXN5bmMuXHJcbiAgICAgKiBAcGFyYW0geyp9IHNjb3BlIFRoZSBzY29wZSB0aGUgc2NvcGUgb2YgdGhlIGV2ZW50LlxyXG4gICAgICogQHBhcmFtIHtJQXJndW1lbnRzfSBhcmdzIFRoZSBhcmd1bWVudHMgZm9yIHRoZSBldmVudC5cclxuICAgICAqL1xyXG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKGV4ZWN1dGVBc3luYywgc2NvcGUsIGFyZ3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNPbmNlIHx8ICF0aGlzLmlzRXhlY3V0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0V4ZWN1dGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGZuID0gdGhpcy5oYW5kbGVyO1xyXG4gICAgICAgICAgICBpZiAoZXhlY3V0ZUFzeW5jKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmbi5hcHBseShzY29wZSwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZuLmFwcGx5KHNjb3BlLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gU3Vic2NyaXB0aW9uO1xyXG59KCkpO1xyXG5leHBvcnRzLlN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbjtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUVuZHNXaXRoKHNyYywgc3VmZml4KSB7XHJcbiAgICByZXR1cm4gc3JjLmVuZHNXaXRoKHN1ZmZpeCkgPyBzcmMgOiBzcmMgKyBzdWZmaXg7XHJcbn1cclxuIiwiaW1wb3J0IHsgQmFja09mZmljZUFwaUNsaWVudCB9IGZyb20gJy4vc2VydmljZXMvYmFja29mZmljZS1jbGllbnQnO1xyXG5pbXBvcnQgeyBkeW5hbWljSW1wb3J0IH0gZnJvbSAnLi9zZXJ2aWNlcy9keW5hbWljLWltcG9ydCc7XHJcbmltcG9ydCB7IFByb2plY3RCdWZmZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wcm9qZWN0LWJ1ZmZlci1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnVmFsdWVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb25maWctdmFsdWUtc2VydmljZSc7XHJcbmNsYXNzIENDSHViIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BlcnRpZXMpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BlcnRpZXMpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0KGVjb21tZXJjZVNlcnZpY2UsIHVzZVByb2plY3RCdWZmZXIgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBiYWNrb2ZmaWNlQ2xpZW50ID0gbmV3IEJhY2tPZmZpY2VBcGlDbGllbnQoZWNvbW1lcmNlU2VydmljZS5iYWNrb2ZmaWNlVXJsKTtcclxuICAgIGNvbnN0IGludGVncmF0aW9uID0gYXdhaXQgYmFja29mZmljZUNsaWVudC5nZXRJbnRlZ3JhdGlvbkluZm8oZWNvbW1lcmNlU2VydmljZS50ZW5hbnRJZCwgU3RyaW5nKGVjb21tZXJjZVNlcnZpY2UuZ2V0UHJvZHVjdElkKCkpKTtcclxuICAgIGNvbnN0IHByb2plY3RCdWZmZXJTZXJ2aWNlID0gbmV3IFByb2plY3RCdWZmZXJTZXJ2aWNlKHtcclxuICAgICAgICB1cmw6IGludGVncmF0aW9uLnByb2plY3RzQnVmZmVyVXJsLFxyXG4gICAgICAgIHRlbmFudElkOiBlY29tbWVyY2VTZXJ2aWNlLnRlbmFudElkXHJcbiAgICB9KTtcclxuICAgIGlmICh1c2VQcm9qZWN0QnVmZmVyICE9PSBmYWxzZSkge1xyXG4gICAgICAgIHByb2plY3RCdWZmZXJTZXJ2aWNlXHJcbiAgICAgICAgICAgIC53YXJtVXAoNSwgMywgKCkgPT4gY29uc29sZS53YXJuKFwiQ2Fubm90IHBpbmcgcHJvamVjdCBidWZmZXIuLi4gUmV0cnlpbmcgaW4gMyBzZWNvbmRzLlwiKSlcclxuICAgICAgICAgICAgLnRoZW4od2FybVN0YXR1cyA9PiB7XHJcbiAgICAgICAgICAgIGlmICghd2FybVN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiUHJvamVjdCBidWZmZXIgd2FzIG5vdCB3YXJtZWQgdXAuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBkcml2ZXJMb2FkZXIgPSAoYXdhaXQgZHluYW1pY0ltcG9ydChcImVjb21tZXJjZURyaXZlclwiLCBgJHtpbnRlZ3JhdGlvbi51aUZyYW1ld29ya1VybH0vZHJpdmVycy8ke2Vjb21tZXJjZVNlcnZpY2UuZHJpdmVyRmlsZW5hbWV9YCkpLmVjb21tZXJjZURyaXZlcjtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZUNvbmZpZyA9IChjb25maWcpID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gY29uZmlnW1wiY29uZmlnXCJdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBjb25maWc7IH07XHJcbiAgICBjb25zdCBpbnB1dCA9IG5ldyBDQ0h1Yih7XHJcbiAgICAgICAgYXR0cmlidXRlczogaW50ZWdyYXRpb24udGVtcGxhdGVBdHRyaWJ1dGVzLnNsaWNlKCksXHJcbiAgICAgICAgY29uZmlnOiBub3JtYWxpemVDb25maWcoSlNPTi5wYXJzZShpbnRlZ3JhdGlvbi5jb25maWcpKSxcclxuICAgICAgICBjdXN0b21lcnNDYW52YXNVcmw6IGludGVncmF0aW9uLmN1c3RvbWVyQ2FudmFzVXJsLFxyXG4gICAgICAgIHVpRnJhbWV3b3JrVXJsOiBpbnRlZ3JhdGlvbi51aUZyYW1ld29ya1VybCxcclxuICAgICAgICB0ZW5hbnRJZDogZWNvbW1lcmNlU2VydmljZS50ZW5hbnRJZCxcclxuICAgICAgICB0b2tlbjogYXdhaXQgYmFja29mZmljZUNsaWVudC5nZXRUb2tlbihlY29tbWVyY2VTZXJ2aWNlLnRlbmFudElkLCBlY29tbWVyY2VTZXJ2aWNlLmN1c3RvbWVyQXV0aC5pZCwgZWNvbW1lcmNlU2VydmljZS5kb21haW4pXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGRyaXZlckluaXRpYWxpemF0b3IgPSBuZXcgRHJpdmVySW5pdGlhbGl6YXRvcihpbnB1dCwgZWNvbW1lcmNlU2VydmljZSwgZHJpdmVyTG9hZGVyKTtcclxuICAgIHJldHVybiBbYXdhaXQgZHJpdmVySW5pdGlhbGl6YXRvci5nZXREcml2ZXIoKSwgcHJvamVjdEJ1ZmZlclNlcnZpY2VdO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBEcml2ZXJJbml0aWFsaXphdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0RGF0YSwgZWNvbW1lcmNlU2VydmljZSwgZHJpdmVyTG9hZGVyKSB7XHJcbiAgICAgICAgdGhpcy5lY29tbWVyY2VTZXJ2aWNlID0gZWNvbW1lcmNlU2VydmljZTtcclxuICAgICAgICB0aGlzLmRyaXZlckxvYWRlciA9IGRyaXZlckxvYWRlcjtcclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXREYXRhO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgZ2V0RHJpdmVyKCkge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByZXBhcmVEcml2ZXIoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIHByZXBhcmVEcml2ZXIoKSB7XHJcbiAgICAgICAgY29uc3QgW3NldHRpbmdzLCBjb25maWddID0gdGhpcy5wcmVwYXJlU2V0dGluZ3MoKTtcclxuICAgICAgICBjb25zdCBlZGl0b3JMb2FkZXIgPSAoYXdhaXQgZHluYW1pY0ltcG9ydChbeyBpbXBvcnREYXRhOiAnZWRpdG9yJywgdXJsOiBgJHt0aGlzLmlucHV0LnVpRnJhbWV3b3JrVXJsfS9lZGl0b3IuanNgLCBpc0RlZmF1bHQ6IHRydWUgfV0pKVswXS5lZGl0b3I7XHJcbiAgICAgICAgY29uc3QgZHJpdmVyID0gYXdhaXQgdGhpcy5kcml2ZXJMb2FkZXIuaW5pdCh0aGlzLmVjb21tZXJjZVNlcnZpY2UucHJvZHVjdE1vZGVsLCBlZGl0b3JMb2FkZXIsIGNvbmZpZywgc2V0dGluZ3MsIHRoaXMuZWNvbW1lcmNlU2VydmljZS5nZXRCYWNrVG9FZGl0b3JEYXRhKCkub3JOdWxsKCksIHRoaXMuZWNvbW1lcmNlU2VydmljZS5xdWFudGl0eSwgdGhpcy5lY29tbWVyY2VTZXJ2aWNlLmdldFVzZXIoKSk7XHJcbiAgICAgICAgY29uc3QgbmV3QXR0cmlidXRlcyA9IHRoaXMuaW5wdXQuYXR0cmlidXRlcy5tYXAoYXR0ciA9PiAoeyBuYW1lOiBhdHRyLm5hbWUsIHZhbHVlOiBDb25maWdWYWx1ZVNlcnZpY2UucHJvY2VzcyhhdHRyLnZhbHVlKSB9KSk7XHJcbiAgICAgICAgZHJpdmVyLnByb2R1Y3RzLmN1cnJlbnQuYXR0cmlidXRlcy5wdXNoKC4uLm5ld0F0dHJpYnV0ZXMpO1xyXG4gICAgICAgIHJldHVybiBkcml2ZXI7XHJcbiAgICB9XHJcbiAgICBwcmVwYXJlU2V0dGluZ3MoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5lY29tbWVyY2VTZXJ2aWNlLmdldFBsdWdpblNldHRpbmdzKCk7XHJcbiAgICAgICAgc2V0dGluZ3NbXCJ0b2tlblwiXSA9IHRoaXMuaW5wdXQudG9rZW47XHJcbiAgICAgICAgc2V0dGluZ3NbXCJ0ZW5hbnRJZFwiXSA9IHRoaXMuaW5wdXQudGVuYW50SWQ7XHJcbiAgICAgICAgc2V0dGluZ3NbXCJlZGl0b3JVcmxcIl0gPSB0aGlzLmlucHV0LmN1c3RvbWVyc0NhbnZhc1VybDtcclxuICAgICAgICBzZXR0aW5nc1tcImN1c3RvbWVyc0NhbnZhc0Jhc2VVcmxcIl0gPSB0aGlzLmlucHV0LmN1c3RvbWVyc0NhbnZhc1VybDtcclxuICAgICAgICBzZXR0aW5nc1tcImN1c3RvbWVyc0NhbnZhc1VybFwiXSA9IHRoaXMuaW5wdXQuY3VzdG9tZXJzQ2FudmFzVXJsO1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaW5wdXQuY29uZmlnKTtcclxuICAgICAgICAoX2EgPSBjb25maWcudmFycykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKGNvbmZpZy52YXJzID0ge30pO1xyXG4gICAgICAgIGNvbmZpZy52YXJzLnRva2VuID0gdGhpcy5pbnB1dC50b2tlbjtcclxuICAgICAgICBjb25maWcudmFycy51bml0SWQgPSB0aGlzLmlucHV0LnRlbmFudElkO1xyXG4gICAgICAgIGNvbmZpZy52YXJzLnRlbmFudElkID0gdGhpcy5pbnB1dC50ZW5hbnRJZDtcclxuICAgICAgICByZXR1cm4gW3NldHRpbmdzLCBjb25maWddO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1heWJlIH0gZnJvbSBcIm1vbmV0XCI7XHJcbmltcG9ydCB7IERvY3VtZW50U2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9kb2N1bWVudC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEd1aWQgfSBmcm9tIFwiLi4vc2VydmljZXMvZ3VpZFwiO1xyXG5pbXBvcnQgeyBlbnN1cmVFbmRzV2l0aCB9IGZyb20gJy4uL1V0aWxzL1V0aWxzJztcclxuZXhwb3J0IGNsYXNzIERvY2tldE1hbmFnZXJTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHsgYmFja29mZmljZVVybCwgdGVuYW50SWQsIGN1c3RvbWVySWQsIGN1c3RvbWVyU2lnbmF0dXJlLCBzaG9wTmFtZSwgcHJvZHVjdCB9KSB7XHJcbiAgICAgICAgdGhpcy5fcHJvamVjdEhhbmRsZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5nZXRTZWxlY3RlZFZhcmlhbnRJZCA9ICgpID0+IHRoaXNcclxuICAgICAgICAgICAgLmdldFZhcmlhbnRJZCgpXHJcbiAgICAgICAgICAgIC5tYXAodmFsdWUgPT4gTnVtYmVyKHZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5nZXRQbHVnaW5TZXR0aW5ncyA9ICgpID0+ICh7XHJcbiAgICAgICAgICAgIGxhbmd1YWdlOiBuZXcgRG9jdW1lbnRTZXJ2aWNlKGRvY3VtZW50KS5nZXRMYW5ndWFnZSgpLFxyXG4gICAgICAgICAgICBjdXN0b21lcnNDYW52YXNVcmw6IHRoaXMuX3NldHRpbmdzLmN1c3RvbWVyc0NhbnZhc1VybCB8fCBcIlwiLFxyXG4gICAgICAgICAgICBjdXN0b21lcnNDYW52YXNCYXNlVXJsOiB0aGlzLl9zZXR0aW5ncy5jdXN0b21lcnNDYW52YXNCYXNlVXJsIHx8IFwiXCJcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdldEJhY2tUb0VkaXRvckRhdGEgPSAoKSA9PiB0aGlzLmdldEJhY2tUb0VkaXRvckRhdGFGcm9tUXVlcnlTdHJpbmcoKTtcclxuICAgICAgICB0aGlzLmdldFByb2R1Y3RJZCA9ICgpID0+IHRoaXMuX3Byb2R1Y3QuaWQ7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVVzZXJJZCA9ICgpID0+IE1heWJlXHJcbiAgICAgICAgICAgIC5mcm9tRmFsc3kodGhpcy5fY3VzdG9tZXJJZClcclxuICAgICAgICAgICAgLmNhdGEoKCkgPT4gdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCksIGN1c3RvbWVySWQgPT4gdGhpcy5idWlsZEN1c3RvbWVyc0NhbnZhc1VzZXJJZCh0aGlzLmRvbWFpbiwgY3VzdG9tZXJJZCkpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tvZmZpY2VVcmwgPSBiYWNrb2ZmaWNlVXJsO1xyXG4gICAgICAgIHRoaXMuX3RlbmFudElkID0gdGVuYW50SWQ7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJJZCA9IGN1c3RvbWVySWQ7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJTaWduYXR1cmUgPSBjdXN0b21lclNpZ25hdHVyZTtcclxuICAgICAgICB0aGlzLl9zaG9wTmFtZSA9IHNob3BOYW1lIHx8IFwiZG9ja2V0LW1hbmFnZXJcIjtcclxuICAgICAgICB0aGlzLl9wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHt9O1xyXG4gICAgfVxyXG4gICAgZ2V0IGJhY2tvZmZpY2VVcmwoKSB7IHJldHVybiB0aGlzLl9iYWNrb2ZmaWNlVXJsOyB9XHJcbiAgICBnZXQgdGVuYW50SWQoKSB7IHJldHVybiB0aGlzLl90ZW5hbnRJZDsgfVxyXG4gICAgZ2V0IGRvbWFpbigpIHsgcmV0dXJuIHRoaXMuX3Nob3BOYW1lOyB9XHJcbiAgICBnZXQgZHJpdmVyRmlsZW5hbWUoKSB7IHJldHVybiBcImRlZmF1bHQtZHJpdmVyLmpzXCI7IH1cclxuICAgIGdldCBjdXN0b21lckF1dGgoKSB7IHJldHVybiB7IGlkOiB0aGlzLmdlbmVyYXRlVXNlcklkKCksIHNpZ25hdHVyZTogdGhpcy5fY3VzdG9tZXJTaWduYXR1cmUgfTsgfVxyXG4gICAgZ2V0IHByb2R1Y3RNb2RlbCgpIHsgcmV0dXJuIHRoaXMuX3Byb2R1Y3Q7IH1cclxuICAgIGdldCBxdWFudGl0eSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRRdWFudGl0eSgpO1xyXG4gICAgfVxyXG4gICAgYWRkUHJvamVjdEhhbmRsZXIoZnVuYykge1xyXG4gICAgICAgIHRoaXMuX3Byb2plY3RIYW5kbGVycy5wdXNoKGZ1bmMpO1xyXG4gICAgfVxyXG4gICAgYWRkRWRpdG9yRXhpdEhhbmRsZXIoZWRpdG9yKSB7XHJcbiAgICAgICAgZWRpdG9yLmRyaXZlci5jYXJ0Lm9uU3VibWl0dGluZy5zdWJzY3JpYmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBlZGl0b3IuZHJpdmVyLm9yZGVycy5jdXJyZW50LnByb3BzWydoaWRkZW4nXVsncGRmVXJsJ10gPVxyXG4gICAgICAgICAgICAgICAgZW5zdXJlRW5kc1dpdGgodGhpcy5iYWNrb2ZmaWNlVXJsLCBcIi9cIikgKyBcImFwaS9zZXJ2aWNlcy9hcHAvUHJvamVjdC9HZXRQcm9qZWN0UGRmVXJsXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiP3N0YXRlSWQ9XCIgKyBlZGl0b3IuZHJpdmVyLm9yZGVycy5jdXJyZW50LnByb3BzWydzdGF0ZUlkJ10gKyBcIiZ1c2VySWQ9XCIgKyBlZGl0b3IuZHJpdmVyLm9yZGVycy5jdXJyZW50LnByb3BzWyd1c2VySWQnXTtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogZWRpdG9yLmRyaXZlci5wcm9kdWN0cy5jdXJyZW50LmlkLFxyXG4gICAgICAgICAgICAgICAgdXNlcklkOiBlZGl0b3IuZHJpdmVyLm9yZGVycy5jdXJyZW50LnByb3BzW1widXNlcklkXCJdLFxyXG4gICAgICAgICAgICAgICAgbGluZUl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogR3VpZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogZWRpdG9yLmRyaXZlci5vcmRlcnMuY3VycmVudC5xdWFudGl0eVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGVkaXRvci5kcml2ZXIub3JkZXJzLmN1cnJlbnQucHJvcHMpXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZ1bmMgb2YgdGhpcy5fcHJvamVjdEhhbmRsZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBmdW5jKHByb2plY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVQbHVnaW5TZXR0aW5ncyhzZXR0aW5ncykge1xyXG4gICAgICAgIHRoaXMuX3NldHRpbmdzLmN1c3RvbWVyc0NhbnZhc0Jhc2VVcmwgPSBzZXR0aW5ncy5jdXN0b21lcnNDYW52YXNCYXNlVXJsO1xyXG4gICAgICAgIHRoaXMuX3NldHRpbmdzLmN1c3RvbWVyc0NhbnZhc1VybCA9IHNldHRpbmdzLmN1c3RvbWVyc0NhbnZhc1VybDtcclxuICAgIH1cclxuICAgIGdldFF1YW50aXR5KCkge1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWFudGl0eS1ncm91cFwiKS52YWx1ZSkgfHwgMTtcclxuICAgIH1cclxuICAgIGdldFZhcmlhbnRJZCgpIHtcclxuICAgICAgICByZXR1cm4gTWF5YmUuZnJvbU51bGwobnVsbClcclxuICAgICAgICAgICAgLm1hcChmb3JtID0+IG5ldyB3aW5kb3cuRm9ybURhdGEoZm9ybSkpXHJcbiAgICAgICAgICAgIC5tYXAoZm9ybWRhdGEgPT4gZm9ybWRhdGEuZ2V0KFwiaWRcIikpXHJcbiAgICAgICAgICAgIC5tYXAocmVzdWx0ID0+IFN0cmluZyhyZXN1bHQpKTtcclxuICAgIH1cclxuICAgIGdldFVzZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgaWQ6IHRoaXMuZ2VuZXJhdGVVc2VySWQoKSB9O1xyXG4gICAgfVxyXG4gICAgZ2V0Q3VycmVudFNlc3Npb25JZCgpIHtcclxuICAgICAgICBjb25zdCBkb2MgPSBuZXcgRG9jdW1lbnRTZXJ2aWNlKGRvY3VtZW50KTtcclxuICAgICAgICBjb25zdCBjb29raWVzID0gZG9jLmdldENvb2tpZXMoKTtcclxuICAgICAgICByZXR1cm4gYGRvY2tldF8ke2Nvb2tpZXNbXCJkb2NrZXRfbWFuYWdlcl9zZXNzaW9uX2d1aWRcIl0gfHxcclxuICAgICAgICAgICAgR3VpZCgpfWA7XHJcbiAgICB9XHJcbiAgICBidWlsZEN1c3RvbWVyc0NhbnZhc1VzZXJJZChzaG9wRG9tYWluLCBjdXN0b21lcklkKSB7XHJcbiAgICAgICAgcmV0dXJuIGAkeyhzaG9wRG9tYWluICE9PSBudWxsICYmIHNob3BEb21haW4gIT09IHZvaWQgMCA/IHNob3BEb21haW4gOiBcIlwiKS5zcGxpdChcIi5cIilbMF19XyR7Y3VzdG9tZXJJZH1gO1xyXG4gICAgfVxyXG4gICAgZ2V0QmFja1RvRWRpdG9yRGF0YUZyb21RdWVyeVN0cmluZygpIHtcclxuICAgICAgICBjb25zdCBxdWVyeVN0cmluZyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcbiAgICAgICAgcmV0dXJuIE1heWJlLm9mKHF1ZXJ5U3RyaW5nKVxyXG4gICAgICAgICAgICAubWFwKHEgPT4gKHsga2V5OiBxLmdldChcImtleVwiKSwgc25hcHNob3Q6IHEuZ2V0KFwic25hcHNob3RcIikgfSkpXHJcbiAgICAgICAgICAgIC5mbGF0TWFwKGJ0ZSA9PiBidGUua2V5ICE9PSBudWxsICYmIGJ0ZS5zbmFwc2hvdCAhPT0gbnVsbCA/IE1heWJlLm9mKGJ0ZSkgOiBNYXliZS5Ob3RoaW5nKCkpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICcuLi9jY2h1Yi1jb25uZWN0b3InO1xyXG5pbXBvcnQgeyBTaWduYWxEaXNwYXRjaGVyIH0gZnJvbSAnc3RlLXNpZ25hbHMnO1xyXG5leHBvcnQgY2xhc3MgVUlGcmFtZXdvcmtFZGl0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoeyBjb250YWluZXIsIGVjb21tZXJjZVNlcnZpY2UgfSkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMuZWNvbW1lcmNlU2VydmljZSA9IGVjb21tZXJjZVNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5kcml2ZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJvamVjdEJ1ZmZlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vbkNyZWF0aW5nID0gbmV3IFNpZ25hbERpc3BhdGNoZXIoKTtcclxuICAgICAgICB0aGlzLm9uQ3JlYXRlZCA9IG5ldyBTaWduYWxEaXNwYXRjaGVyKCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBjcmVhdGUodXNlUHJvamVjdEJ1ZmZlciA9IHRydWUpIHtcclxuICAgICAgICB0aGlzLm9uQ3JlYXRpbmcuZGlzcGF0Y2goKTtcclxuICAgICAgICBjb25zdCBbZHJpdmVyLCBwcm9qZWN0QnVmZmVyXSA9IGF3YWl0IGNvbm5lY3QodGhpcy5lY29tbWVyY2VTZXJ2aWNlLCB1c2VQcm9qZWN0QnVmZmVyKTtcclxuICAgICAgICB0aGlzLmRyaXZlciA9IGRyaXZlcjtcclxuICAgICAgICB0aGlzLnByb2plY3RCdWZmZXIgPSBwcm9qZWN0QnVmZmVyO1xyXG4gICAgICAgIHRoaXMuZWNvbW1lcmNlU2VydmljZS5hZGRFZGl0b3JFeGl0SGFuZGxlcih0aGlzKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnJlbmRlckVkaXRvcigpO1xyXG4gICAgICAgIHRoaXMub25DcmVhdGVkLmRpc3BhdGNoKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJpdmVyO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgYWRkUHJvamVjdEhhbmRsZXIoZnVuYykge1xyXG4gICAgICAgIHRoaXMuZWNvbW1lcmNlU2VydmljZS5hZGRQcm9qZWN0SGFuZGxlcihmdW5jKTtcclxuICAgIH1cclxuICAgIGFzeW5jIHJlbmRlckVkaXRvcigpIHtcclxuICAgICAgICBjb25zdCBlZGl0b3JIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGVkaXRvckhvbGRlci5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0b3JIb2xkZXIpO1xyXG4gICAgICAgIHRoaXMuZHJpdmVyLnByb2R1Y3RzLmN1cnJlbnQucmVuZGVyRWRpdG9yKGVkaXRvckhvbGRlcik7XHJcbiAgICAgICAgdGhpcy5zeW5jcm9uaXplT3B0aW9ucygpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZXNvbHZlKTtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCByZWplY3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3luY3Jvbml6ZU9wdGlvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5kcml2ZXIub3JkZXJzLmN1cnJlbnQucXVhbnRpdHkgPSB0aGlzLmVjb21tZXJjZVNlcnZpY2UucXVhbnRpdHk7XHJcbiAgICAgICAgY29uc3QgbWF5YmVTZWxlY3RlZFZhcmlhbnRJZCA9IHRoaXMuZWNvbW1lcmNlU2VydmljZS5nZXRTZWxlY3RlZFZhcmlhbnRJZCgpO1xyXG4gICAgICAgIGlmIChtYXliZVNlbGVjdGVkVmFyaWFudElkLmlzSnVzdCgpICYmIHR5cGVvZiB0aGlzLmRyaXZlci5vcmRlcnMuY3VycmVudC51cGRhdGVWYXJpYW50ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJpdmVyLm9yZGVycy5jdXJyZW50LnVwZGF0ZVZhcmlhbnQodGhpcy5lY29tbWVyY2VTZXJ2aWNlLmdldFNlbGVjdGVkVmFyaWFudElkKCkuanVzdCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0ICogZnJvbSAnLi4vZG9ja2V0LW1hbmFnZXIvZG9ja2V0LW1hbmFnZXItc2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4uL2VkaXRvcnMvdWlmcmFtZXdvcmstZWRpdG9yJztcclxuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuZXhwb3J0IGNsYXNzIEJhY2tPZmZpY2VBcGlDbGllbnQge1xyXG4gICAgY29uc3RydWN0b3IoYXBpVXJsKSB7XHJcbiAgICAgICAgdGhpcy5hcGlVcmwgPSBhcGlVcmwgIT09IG51bGwgJiYgYXBpVXJsICE9PSB2b2lkIDAgPyBhcGlVcmwgOiBlbnZpcm9ubWVudC5iYXNlQXBpVXJsO1xyXG4gICAgICAgIHRoaXMuaHR0cCA9IGF4aW9zLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGJhc2VVUkw6IGFwaVVybCAhPT0gbnVsbCAmJiBhcGlVcmwgIT09IHZvaWQgMCA/IGFwaVVybCA6IGVudmlyb25tZW50LmJhc2VBcGlVcmwsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlU3RhdHVzOiBzdGF0dXMgPT4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIGdldEludGVncmF0aW9uSW5mbyh0ZW5hbnRJZCwgcHJvZHVjdElkKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvYXBpL3YxL3RlbmFudHMvJHt0ZW5hbnRJZH0vaW50ZWdyYXRpb25zLyR7cHJvZHVjdElkfWApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGFGcm9tKHJlc3BvbnNlKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGdldFRva2VuKHRlbmFudElkLCB1c2VyR3VpZCwgZWNvbW1lcmNlRG9tYWluKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2FwaS92MS90ZW5hbnRzLyR7dGVuYW50SWR9L2ludGVncmF0aW9ucy9nZXR0b2tlbmAsIHtcclxuICAgICAgICAgICAgdXNlckd1aWQ6IHVzZXJHdWlkLFxyXG4gICAgICAgICAgICBlY29tbWVyY2VEb21haW46IGVjb21tZXJjZURvbWFpbixcclxuICAgICAgICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YUZyb20ocmVzcG9uc2UpO1xyXG4gICAgfVxyXG4gICAgZ2V0RGF0YUZyb20ocmVzcG9uc2UpIHtcclxuICAgICAgICBpZiAoISh0aGlzLmh0dHAuZGVmYXVsdHMudmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSAmJiByZXNwb25zZS5kYXRhLnN1Y2Nlc3MpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fS4gJHtKU09OLnN0cmluZ2lmeShyZXNwb25zZS5kYXRhKX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEucmVzdWx0O1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBDb25maWdWYWx1ZVNlcnZpY2Uge1xyXG4gICAgc3RhdGljIHByb2Nlc3ModmFsdWUpIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IENvbmZpZ1ZhbHVlU2VydmljZS5wcm9jZXNzKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgRG9jdW1lbnRTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGRvYykge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29va2llcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY29va2llU3RyaW5nID0gdGhpcy5fZG9jLmNvb2tpZTtcclxuICAgICAgICAgICAgcmV0dXJuICFjb29raWVTdHJpbmdcclxuICAgICAgICAgICAgICAgID8ge31cclxuICAgICAgICAgICAgICAgIDogY29va2llU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiO1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgY3VyLCBpbmRleCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFpciA9IGN1ci5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhaXIubGVuZ3RoICE9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVhY2ggY29va2llIHNob3VsZCBiZSBhbiBlcXVhbCBzaWduIHNlcGFyYXRlZCBzdHJpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhY2NbcGFpclswXS50cmltKCldID0gcGFpclsxXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fZG9jID0gZG9jO1xyXG4gICAgfVxyXG4gICAgZ2V0TGFuZ3VhZ2UoKSB7XHJcbiAgICAgICAgY29uc3QgbGFuZyA9IHRoaXMuX2RvYy5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKS5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpO1xyXG4gICAgICAgIHJldHVybiBCb29sZWFuKGxhbmcpID8gbGFuZy5zdWJzdHIoMCwgMikgOiBcIkVOXCI7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGR5bmFtaWNJbXBvcnQoaW1wb3J0RGF0YSwgdXJsKSB7XHJcbiAgICBpZiAodHlwZW9mIGltcG9ydERhdGEgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvYWRNb2R1bGUoaW1wb3J0RGF0YSwgdXJsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLmFsbChpbXBvcnREYXRhLm1hcCh4ID0+IGxvYWRNb2R1bGUoeC5pbXBvcnREYXRhLCB4LnVybCwgeC5pc0RlZmF1bHQpKSk7XHJcbn1cclxuZnVuY3Rpb24gbG9hZE1vZHVsZShpbXBvcnREYXRhLCB1cmwsIGlzRGVmYXVsdCA9IGZhbHNlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrTmFtZSA9IFwicmVzb2x2ZV9jYWxsYmFja19cIiArIE1hdGgucm91bmQoMTAwMDAwICogTWF0aC5yYW5kb20oKSk7XHJcbiAgICAgICAgd2luZG93W2NhbGxiYWNrTmFtZV0gPSAoLi4uZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBkZWxldGUgd2luZG93W2NhbGxiYWNrTmFtZV07XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcclxuICAgICAgICAgICAgY29uc3QgYXJyYXkgPSBBcnJheS5mcm9tKGRhdGEpO1xyXG4gICAgICAgICAgICBsZXQga2V5cyA9IGltcG9ydERhdGEuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgICAgICBrZXlzID0ga2V5cy5tYXAoeCA9PiB4LnRyaW0oKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGFycmF5LnJlZHVjZSgoYWNjLCBjdXIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY2Nba2V5c1tpbmRleF1dID0gY3VyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gICAgICAgIHNjcmlwdC50eXBlID0gXCJtb2R1bGVcIjtcclxuICAgICAgICBzY3JpcHQub25lcnJvciA9IChlcnIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVyIGxvYWQgc2NyaXB0IGZyb20gJHt1cmx9YCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB1cmwgKz0gKHVybC5pbmRleE9mKFwiP1wiKSA+PSAwID8gXCImXCIgOiBcIj9cIikgKyBcInQ9XCIgKyBEYXRlLm5vdygpO1xyXG4gICAgICAgIHNjcmlwdC50ZXh0ID0gaXNEZWZhdWx0XHJcbiAgICAgICAgICAgID8gYGltcG9ydCAke2ltcG9ydERhdGF9IGZyb20gJyR7dXJsfSc7ICR7Y2FsbGJhY2tOYW1lfSgke2ltcG9ydERhdGF9LmRlZmF1bHQgfHwgJHtpbXBvcnREYXRhfSApO2BcclxuICAgICAgICAgICAgOiBgaW1wb3J0IHsgJHtpbXBvcnREYXRhfSB9IGZyb20gJyR7dXJsfSc7ICR7Y2FsbGJhY2tOYW1lfSgke2ltcG9ydERhdGF9KTtgO1xyXG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH0pO1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBHdWlkKCkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgbGV0IGQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIGxldCBkMiA9IChfYSA9IChwZXJmb3JtYW5jZSAmJiBwZXJmb3JtYW5jZS5ub3cgJiYgKHBlcmZvcm1hbmNlLm5vdygpICogMTAwMCkpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwO1xyXG4gICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgYyA9PiB7XHJcbiAgICAgICAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpICogMTY7XHJcbiAgICAgICAgaWYgKGQgPiAwKSB7XHJcbiAgICAgICAgICAgIHIgPSAoZCArIHIpICUgMTYgfCAwO1xyXG4gICAgICAgICAgICBkID0gTWF0aC5mbG9vcihkIC8gMTYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgciA9IChkMiArIHIpICUgMTYgfCAwO1xyXG4gICAgICAgICAgICBkMiA9IE1hdGguZmxvb3IoZDIgLyAxNik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzR3VpZCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlLm1hdGNoKC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzAtNV1bMC05YS1mXXszfS1bMDg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pKTtcclxufVxyXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5leHBvcnQgY2xhc3MgUHJvamVjdEJ1ZmZlclNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoeyB1cmwsIHRlbmFudElkLCBodHRwIH0pIHtcclxuICAgICAgICB0aGlzLmFwaVVybCA9IHVybDtcclxuICAgICAgICB0aGlzLnRlbmFudElkID0gdGVuYW50SWQ7XHJcbiAgICAgICAgdGhpcy5odHRwID0gaHR0cCAhPT0gbnVsbCAmJiBodHRwICE9PSB2b2lkIDAgPyBodHRwIDogYXhpb3M7XHJcbiAgICB9XHJcbiAgICBhc3luYyB3YXJtVXAoYXR0ZW1wdHMsIGRlbGF5QmV0d2VlbkF0dGVtcHRzLCBvbmVhY2h0aW1lcikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0ZW1wdHM7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5hcGlVcmx9L3BpbmdgKTtcclxuICAgICAgICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjAwOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAyMDE6XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwNDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTAzOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgYXR0ZW1wdHMgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVyID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIGRlbGF5QmV0d2VlbkF0dGVtcHRzICogMTAwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQm9vbGVhbihvbmVhY2h0aW1lcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uZWFjaHRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGltZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgcmVzcG9uc2UgZnJvbSBzZXJ2aWNlOiBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgcG9zdChwcm9qZWN0KSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgJHt0aGlzLmFwaVVybH0vdGVuYW50cy8ke3RoaXMudGVuYW50SWR9L3Byb2plY3RzL2NyZWF0ZWAsIHByb2plY3QsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9