(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "./node_modules/@dcloudio/uni-app-plus/dist/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-app-plus/dist/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var SYNC_API_RE = /requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      Promise.prototype.finally = function (callback) {
        var promise = this.constructor;
        return this.then(
        function (value) {return promise.resolve(callback()).then(function () {return value;});},
        function (reason) {return promise.resolve(callback()).then(function () {
            throw reason;
          });});

      };
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var protocols = {};

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("app-plus ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("app-plus \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var returnValue = wx[options.name || methodName](arg1, arg2);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

function requireNativePlugin(pluginName) {
  /* eslint-disable no-undef */
  if (typeof weex !== 'undefined') {
    return weex.requireModule(pluginName);
  }
  /* eslint-disable no-undef */
  return __requireNativePlugin__(pluginName);
}

var api = /*#__PURE__*/Object.freeze({
  requireNativePlugin: requireNativePlugin });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = 'onLoad';
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
      return oldHook.apply(this, args);
    };
  }
  return MPPage(options);
};

var behavior = Behavior({
  created: function created() {
    initTriggerEvent(this);
  } });


Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (options.behaviors || (options.behaviors = [])).unshift(behavior);
  return MPComponent(options);
};

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function triggerLink(mpInstance, vueOptions) {
  mpInstance.triggerEvent('__l', mpInstance.$vm || vueOptions, {
    bubbles: true,
    composed: true });

}

function handleLink(event) {
  if (event.detail.$mp) {// vm
    if (!event.detail.$parent) {
      event.detail.$parent = this.$vm;
      event.detail.$parent.$children.push(event.detail);

      event.detail.$root = this.$vm.$root;
    }
  } else {// vueOptions
    if (!event.detail.parent) {
      event.detail.parent = this.$vm;
    }
  }
}

function initPage$1(pageOptions) {
  initComponent$1(pageOptions);
}

function initComponent$1(componentOptions) {
  componentOptions.methods.$getAppWebview = function () {
    return plus.webview.getWebviewById("".concat(this.__wxWebviewId__));
  };
}

function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks(mpOptions, hooks) {
  hooks.forEach(function (hook) {
    mpOptions[hook] = function (args) {
      return this.$vm.__call_hook(hook, args);
    };
  });
}

function getData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"app-plus","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function getBehaviors(vueOptions) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = String;
          vueProps['value'] = null;
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    Behavior({
      properties: getProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        Behavior({
          properties: getProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function getProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && eventType === type) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handler = _this.$vm[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(_this.$vm, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$mp[vm.mpType];
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

var hooks = [
'onHide',
'onError',
'onPageNotFound',
'onUniNViewMessage'];


function initVm(vm) {
  if (this.$vm) {// 百度竟然 onShow 在 onLaunch 之前？
    return;
  }

  this.$vm = vm;

  this.$vm.$mp = {
    app: this };

}

function createApp(vm) {
  // 外部初始化时 Vue 还未初始化，放到 createApp 内部初始化 mixin
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        {// 头条的 selectComponent 竟然是异步的
          initRefs(this);
        }
        initMocks(this, mocks);
      }
    },
    created: function created() {// 处理 injections
      this.__init_injections(this);
      this.__init_provide(this);
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      initVm.call(this, vm);

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');

      this.$vm.__call_hook('onLaunch', args);
    },
    onShow: function onShow(args) {
      initVm.call(this, vm);

      this.$vm.__call_hook('onShow', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks); // 延迟执行，因为 App 的注册在 main.js 之前，可能导致生命周期内 Vue 原型上开发者注册的属性无法访问

  App(appOptions);

  return vm;
}

var hooks$1 = [
'onShow',
'onHide',
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap',
'onBackPress',
'onNavigationBarButtonTap',
'onNavigationBarSearchInputChanged',
'onNavigationBarSearchInputConfirmed',
'onNavigationBarSearchInputClicked'];


function initVm$1(VueComponent) {// 百度的 onLoad 触发在 attached 之前
  if (this.$vm) {
    return;
  }

  this.$vm = new VueComponent({
    mpType: 'page',
    mpInstance: this });


  this.$vm.__call_hook('created');
  this.$vm.$mount();
}

function createPage(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = _vue.default.extend(vueOptions);
  }
  var pageOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    lifetimes: { // 当页面作为组件时
      attached: function attached() {
        initVm$1.call(this, VueComponent);
      },
      ready: function ready() {
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    methods: { // 作为页面时
      onLoad: function onLoad(args) {
        initVm$1.call(this, VueComponent);
        this.$vm.$mp.query = args; // 又要兼容 mpvue
        this.$vm.__call_hook('onLoad', args); // 开发者可能会在 onLoad 时赋值，提前到 mount 之前
      },
      onUnload: function onUnload() {
        this.$vm.__call_hook('onUnload');
      },
      __e: handleEvent,
      __l: handleLink } };



  initHooks(pageOptions.methods, hooks$1);

  initPage$1(pageOptions);

  return Component(pageOptions);
}

function initVm$2(VueComponent) {
  if (this.$vm) {
    return;
  }

  var options = {
    mpType: 'component',
    mpInstance: this,
    propsData: this.properties };

  // 初始化 vue 实例
  this.$vm = new VueComponent(options);

  // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
  var vueSlots = this.properties.vueSlots;
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    this.$vm.$scopedSlots = this.$vm.$slots = $slots;
  }
  // 性能优先，mount 提前到 attached 中，保证组件首次渲染数据被合并
  // 导致与标准 Vue 的差异，data 和 computed 中不能使用$parent，provide等组件属性
  this.$vm.$mount();
}

function createComponent(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;

  var behaviors = getBehaviors(vueOptions);

  var properties = getProperties(vueOptions.props, false, vueOptions.__file);

  var VueComponent = _vue.default.extend(vueOptions);

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    behaviors: behaviors,
    properties: properties,
    lifetimes: {
      attached: function attached() {
        initVm$2.call(this, VueComponent);
      },
      ready: function ready() {
        initVm$2.call(this, VueComponent); // 目前发现部分情况小程序 attached 不触发
        triggerLink(this); // 处理 parent,children

        // 补充生命周期
        this.$vm.__call_hook('created');
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __e: handleEvent,
      __l: handleLink } };



  initComponent$1(componentOptions);

  return Component(componentOptions);
}

var uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$mp && vm.$mp[vm.mpType]){
        return vm.$mp[vm.mpType].is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          !vm._getFormData && warn(//fixed by xxxxxx uni://form-field 时不告警
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"app-plus","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"app-plus","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"app-plus","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
    // 确保当前 vm 所有数据被同步
    var dataKeys = [].concat(
        Object.keys(vm._data || {}),
        Object.keys(vm._computedWatchers || {}));

    var ret = dataKeys.reduce(function(ret, key) {
        ret[key] = vm[key];
        return ret
    }, Object.create(null));
    //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
    Object.assign(ret, vm.$mp.data || {});
    if (
        Array.isArray(vm.$options.behaviors) &&
        vm.$options.behaviors.indexOf('uni://form-field') !== -1
    ) { //form-field
        ret['name'] = vm.name;
        ret['value'] = vm.value;
    }
    return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
    var this$1 = this;

    if (vnode === null) { //destroy
        return
    }
    if (this.mpType === 'page' || this.mpType === 'component') {
        var mpInstance = this.$mp[this.mpType];
        var data = cloneWithData(this);
        data.__webviewId__ = mpInstance.data.__webviewId__;
        var mpData = Object.create(null);
        Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
            mpData[key] = mpInstance.data[key];
        });
        var diffData = diff(data, mpData);
        if (Object.keys(diffData).length) {
            if (Object({"VUE_APP_PLATFORM":"app-plus","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
                console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
                    ']差量更新',
                    JSON.stringify(diffData));
            }
            this.__next_tick_pending = true;
            mpInstance.setData(diffData, function () {
                this$1.__next_tick_pending = false;
                flushCallbacks$1(this$1);
            });
        } else {
            flushCallbacks$1(this);
        }
    }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
    var parts = path.split('.');
    var key = parts[0];
    if (key.indexOf('__$n') === 0) { //number index
        key = parseInt(key.replace('__$n', ''));
    }
    if (parts.length === 1) {
        return obj[key]
    }
    return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

    var oldEmit = Vue.prototype.$emit;

    Vue.prototype.$emit = function(event) {
        if (this.$mp && event) {
            this.$mp[this.mpType]['triggerEvent'](event, {
                __args__: toArray(arguments, 1)
            });
        }
        return oldEmit.apply(this, arguments)
    };
    
    Vue.prototype.$nextTick = function (fn) {
      return nextTick$1(this, fn)
    };

    MP_METHODS.forEach(function (method) {
        Vue.prototype[method] = function(args) {
            if (this.$mp) {
                return this.$mp[this.mpType][method](args)
            }
        };
    });

    Vue.prototype.__init_provide = initProvide;

    Vue.prototype.__init_injections = initInjections;

    Vue.prototype.__call_hook = function(hook, args) {
        var vm = this;
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget();
        var handlers = vm.$options[hook];
        var info = hook + " hook";
        var ret;
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit('hook:' + hook);
        }
        popTarget();
        return ret
    };

    Vue.prototype.__set_model = function(target, key, value, modifiers) {
        if (Array.isArray(modifiers)) {
            if (modifiers.indexOf('trim') !== -1) {
                value = value.trim();
            }
            if (modifiers.indexOf('number') !== -1) {
                value = this._n(value);
            }
        }
        target[key] = value;
    };

    Vue.prototype.__set_sync = function(target, key, value) {
        target[key] = value;
    };

    Vue.prototype.__get_orig = function(item) {
        if (isPlainObject(item)) {
            return item['$orig'] || item
        }
        return item
    };

    Vue.prototype.__get_value = function(dataPath, target) {
        return getTarget(target || this, dataPath)
    };


    Vue.prototype.__get_class = function(dynamicClass, staticClass) {
        return renderClass(staticClass, dynamicClass)
    };

    Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
        if (!dynamicStyle && !staticStyle) {
            return ''
        }
        var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
        var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
        return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
    };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "E:\\github\\uniapp_demo\\main.js":
/*!*************************************!*\
  !*** E:/github/uniapp_demo/main.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ "E:\\github\\uniapp_demo\\pages.json");
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "E:\\github\\uniapp_demo\\App.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.config.productionTip = false;

_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createApp"]))

/***/ }),

/***/ "E:\\github\\uniapp_demo\\main.js?{\"page\":\"pages%2Fapi%2Fapi\"}":
/*!******************************************************************!*\
  !*** E:/github/uniapp_demo/main.js?{"page":"pages%2Fapi%2Fapi"} ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "E:\\github\\uniapp_demo\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _api = _interopRequireDefault(__webpack_require__(/*! ./pages/api/api.vue */ "E:\\github\\uniapp_demo\\pages\\api\\api.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_api.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "E:\\github\\uniapp_demo\\main.js?{\"page\":\"pages%2Fdemo%2Fdemo\"}":
/*!********************************************************************!*\
  !*** E:/github/uniapp_demo/main.js?{"page":"pages%2Fdemo%2Fdemo"} ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "E:\\github\\uniapp_demo\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _demo = _interopRequireDefault(__webpack_require__(/*! ./pages/demo/demo.vue */ "E:\\github\\uniapp_demo\\pages\\demo\\demo.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_demo.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "E:\\github\\uniapp_demo\\main.js?{\"page\":\"pages%2Findex%2Findex\"}":
/*!**********************************************************************!*\
  !*** E:/github/uniapp_demo/main.js?{"page":"pages%2Findex%2Findex"} ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "E:\\github\\uniapp_demo\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/index/index.vue */ "E:\\github\\uniapp_demo\\pages\\index\\index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "E:\\github\\uniapp_demo\\pages.json":
/*!****************************************!*\
  !*** E:/github/uniapp_demo/pages.json ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "E:\\github\\uniapp_demo\\static\\img\\tiem.jpg":
/*!*************************************************!*\
  !*** E:/github/uniapp_demo/static/img/tiem.jpg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/tiem.67105504.jpg";

/***/ }),

/***/ "E:\\github\\uniapp_demo\\static\\img\\tiem2.jpg":
/*!**************************************************!*\
  !*** E:/github/uniapp_demo/static/img/tiem2.jpg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEsAhUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDzLHtScelLSV7Jxh06UHnrRRQAmKOlLRQAUlGKKACilooAT8KMUUtACYHpRgelLRTEGKKKKADFGKKKACjFFGaAEKjOc0oUUhz1FKjh+M80tLgOwPSjaB2p1LiqAbijFOpcUWENApcD0p2KMUBcbyOhpadijFMBtLinAU4DHYHjHNKwXGBe9Ltp2KUCiwrjQtLil2c8E04LRYLjNtIQ3bFTbcUuM0WC5AOe1Hzf3am2ZqPynQHByKLBcUKSKcQVBzniozI644zUg3MoI4oAjEyd8j6075JVwDUnlgj5gCab9mTr0PtRZhdEQhC9JDn2phjkALAg+oNTsVVfkZc+p5qP5w2cZB6npmpaHcrFTnnrRsPer6xq65xijyBzijkDmKIjBOM07yT0zVryQMnbyKgR5N+AuR6Ypco73GeSUGeCKbu29qvNGWXBwBTTbo0e0HOKfL2FzFUSZ4zQxzSm3k3hQp56UPDIn3hS1KuhowO9DOBSNGw60zbxzSAfuVh1pOPWmgdsU7bSAcWWmFwXFKVIqUxK8QZPvdxT1AsxyEYB6elWBg1nx7l+9VmGcA7Wq4shos49qMU8DNG2tLEXG49qOAM9BT9tNdCyMoOCRgEUWFcoXcmPLdJ1VWHGW4Pv1oqnb3yyq0E9sXaA7QRgf56UVyuSlrc2s1oLjiil7UlajCkpaKAEoxS0UAJRS0YoATFFLijFACYoxTsUYoAbijFDMFPQ04cii4DCQBk0iuG6VIVBHNNESg5o1AXBoPHNPxSMMqaYiB5dpHpSurSqChxUnlhgMinqgUcVNn1HcrCN0Gc5pFjO/dire3jmlAp8ouYavSnUuOaXHNUITFLinYo20CExRin7aNtMBuKUCnBaULQIaBS4p2KUKaAGYpQMU8LTtvtTAaBTWD/wjNS4pcUhDPLyBmh4txBDEYqUCnAUwGBTS7aeAfSl2nNAiMxg0oTFSYpdtMVyIj2o25qXbS7KLBciIyAMAcfnSbFPVQalK+gpApxzRYLjMe1IVOKk20mKLAQGRQ2CeaQyIGx3prWjO5JbFPS2SPkkk1OpWhBcT4G1etNiL7gCOKnliSPDbcn3pqM5yRHml1H0JWZFA3HBqvLIjLyMj61YeASLk8Gols/cih3BWK+MrwSR71HwD0q+lqRwSMU2S0z90c0uVlKSKm0MM05YHYZxxVhLQqhZuW7ClhlZDtccdqVu4X7EHkktgA05YJFfaFIrSXHUUtXyk85TFmf4j+VOWzAbO6rdFVyonmYgGBijFLUdzcC3RZHUlNwDH+6PWnolcnckxxWHbakQJowHLAiSNSckjPK/hgit7jA9643XA8GrmSOdP3gI+VcbR0Of15rDEScEpI0pJSdmZ15Kftb4Jx2JOcjsfyoqGZg07lCzJn5S3XHaivJbbZ2WOp7UlOxwKSvXOcSilpKAFpKUCigAopaMUhBiilzwR/SimAlGKWnBRzzzSAZjPUUuKdijFOwhNtLilxRinYBMU1wccVJijFOwXGqMClxTttKBmgVxoFLingUuKLBcYBTttOxS4piuNApcU7FOC0ANxS7acBTsUCuMxS4p2KUCmA0D6UYp+2l20WEMpcE04Cl20AJgE9MfSl20oXmnBaYDQKeBShaXbQK4lFLijbQACnAUBaUA0wDFO20YpQKBCbaQpUmKWgRFt4prLkk4ABPQdqn20mKdh3K+2meV+83ZP0q1spPLpWHcgKBuopQuKmKUm2gLkW2k21LtpdtICLbQBUu2k20wuR4pDEp6qKlApQtKwrkeMdqXFS7aNtMLkRFG2pdtKFpiuRAVW1JW/s6bZD5zbfuevNX9lQ3kPmWcyAZYoccd+1TJe6xp6lJrtLrR/tKAswQMVj5KsOf0NYmtuLvTIZ03N5Z+djgYLc/41d0C4WPT54I1Y3SEsyOuAWPb9K54T7rS8SNFXewcqzZwBngZ+vWuGrUvBX6o6IQtJ+Rn5yScUUKaK4DoOu7UYpaXFewcw2kxT8UmKAG4op2KMUANpaXFKBQA2inYpcU0IbinUYpQKYgxSgUYopWAXFGKUUoFMBMUYp2KcFpiGYpcU/bShaAGAU7bTttLimIZinYp22nKvIz0oAYBTsZp22nAUBcYFpwWnhadsGOvNOwrkeKMVIFpdtArjAKMU/FOC0AMC0pFPwScnqe9Ltp2FcYFpcU/bShaBXGYpdtSBfanbRxxQFyILxShakC0uKYXGbaNtSYoxQK4zFOAp6gdxnilx7UBcZilFPwKNtAXG4oxzT9tLgUCuRhKd5Yx/SnAUtA7kRTimFcVZ4ppUUBcr7aNoqxtzTTHQFyHbSban2UbaQ7kISl21NtpdlMLkQGeAKNtSFKQCgBm0Uu3mn7TxS7TQIZtqC88lbSQzkiID5jkjH4jkVb2mqeptJFaM6syR4O90Xc6+hA7+9TJ2ixxWp58l3IlxNdRuI5ByPnOTk9s9aoEl2LE5J5q5dLFFdsFnNygx+8wVzx6HpVRjzkDrXhyvseigAFFKoopIDsNh45oCkVEk7Y5ANSCXPUV6qnFnPZi9aXBpnmc8U5ZOeaOZdxWYuKMGpOPWl4qnJBYixRiptopQvtSUh2IdtOAqXaKUIKq6YrMi20AYqbYMUeWaE+4WIttLtFP2Uu2qRJFtp2Kk2U7ZVCIgKcBUmynBKLCuR7aULUwSl2UxXIgtLtqXZTtnGcUWFchC0oWpQlOCUWAiC0u2pglOCe1MVyILTttSBKTgNigBm2nBDjPapABinKMjpQK5DtxS8VK0TN0pRb4pBdEYXPNLsqdY6cFqhXK/lU4R4qxt9qcEoFcqlcDpUfmjvU85ZBwOKpHk5qJTsaQjzFpWDdOaUEYqup28jrSkN1IOD3qVVRbossDB6Gl28023hbOT0q35Y242jPrWqd9TGWjsV9tOxxUvl0oj74pk3IdpoxU4Sgx0Bchxz0oAqbYfSlEdILkOKMVOEo8ugLkG2l21P5dJ5dAXIce1GM1P5dHlUAQbaCvpU/l0nl0DuQYxRj2qby+aPLNICLbS7fapfLPpThHQBBtpQKm8ujZSuMi2VR1LYYjBLObVJBhZwwGD/drU21xXiS7ju7T7RFcR+ZHmOWA4PBJxjjrxnrxWVafLE0pxuzlboRC6kWFmZAeC/3j9agwDxSE5YnvSjnGa8e92dwq5opwH0opAdOE4p2ykXJIFWFiyvWu5IixEFpwUYqXySRxSiD6imHKQ7SDxUinjkVJ5XHBpCj56UJjcWhAaXfSeU3U0mMHmnclpkgcdxT9wqJcGnEYqlImxKGpeDUGTTtx9apVBOJOFzS7KhDN2qRXYda0VREOLJNmKUJSK+am7VakmQ0xmynBKNwxTwR1quZCaY0LTtvrQZRmk3hqXMkHKwdlz8owPQnNNEnbFJjninBQKhzZaiiVVyM0/ZzUWCR1xU8ZY4zVxmZyi0Js9qXbjtU+z5eKrGXaxHWqbSJSbH8Ac1Wd8ninFyxpTA+zcBxWcpNrQ0jFLcjDMDxUyT4HIqNYJGPAoMbA81Ck0ackWWRcrjPemPcE8LUG00oQ0OqwVFDxcOBjNAuHHXmmlakWM4+6fyoVRsbpJDTO5OQcGnrdSdCATTxbSEbthqPZsbmm5tCVNPQNzyDmhIpGcBACfenr7GrkAdzhi2PVeKUZcz1CceRXQwWsmFUxRt6nOKsxW4RCNoGe2c1ZVOByT9aftrZJI5XNsreSB0Ao8urQWjyxTuSVClAUZ5GfarRj9BULJIXGCAtFwsM2+1Gz1qUAZIyMiqV9K6KpXlD3ovYaV2Tb4ufnXioftUW7BDY9azwTIeKe0cicFfz71DmaqmaivG2MODUgSsy3t7qQ5jTIHU5rcjgKxgHrTUrkTjylcp7UeXVryqXy6q5Fip5ftS+XVvy/al8ulcCn5ftSCKrvl0eWM0XGUxDzTvJ9queXS+X7UXApeV7UeVVwx0nlnPSlcZUMNN8o5q8IvakmAhiMjLkDsOpPYD3o5hmDq94+m28UogMkZkCycdF7/j6V5nqxhN/KLZi0JwVJXb29O1eqX2qWyS+RctAtrPEWjk88ozY+8OnBBHrXlN46TXcskZJVmLfN15/nXBipX6nVQRSC9eOaaAAx61KBjOOlREkn0rjOgcDjoaKXp2op2A69IeOlOKyL93NOU4I5IqwhyOefevQUUzJtoprJIrZyfxp4uGJ56VNMi4z0NViB2qGrFJssCQN0FPzkVUBIp4dqVi+cnMnGO9L5fGTzUSqcZwalQnGCDinYV2x3lArxUflEnFPLYPFSKxI6mgLkXkVGy7TVsLuHSmmFmPC0AQIrHpUyo+Mdac0MoXjFCifIwvFO7CyFVDnmplXAweRTQsmelTKHxz1o5mg5UyIRc88ineV74qYKTShM0+ZhyortCMcHmmiNhVsRZo8ujnD2ZVIK9RQFPWrq27MOcUjWrqcAqc+9WudrYzagna5DFC0mSuGI7VbMRjUMSo9jTFhmjUsqgEe9QzSzy/Kw49AK0U0lqjJwcno9Cx9riIwVNKqW0gLBf1qk8MiY3Iwz04p4hZI97MAPTPNCq33QOjZaMlkjiz8mPzpwndE2hR9agil8t8lQw6Yq9Hb+egePIB9aOdv4Q5EviKbPMx+8cVGVbOa2U09MfMTmg6cm7O449KLSFz00ZCI7/dUnFTLA5G58Kvqa21gVU2KoCjtSC2jDZ25yMc80/Zon2z6GfDaQM4BcFxyVBzWgIhgcDj2pyW0SPvVAG9al21aSRlKTkyAxFgRmoG0+MsT0B61f2cUoShpPcSnJbGV/ZhD5WQY96uxQLGMEgmnzbImEjggDqwGapRqJ775POljHBbOBUpJbFuUpLVl8lVGSQKia7t0GWkAp8lhAzbnLD/gWAKgkh08zCPd83opp3ZCSHx3cczgRMrZ7HIP8qiu3lj37WwD09qvQW1vbjci49zTbnyXG3eob0pXGkr6GFPfysoRTj1PXNVUuZo2JVzzwc1oXtqoZRHjn1GMmmNo9ykZkdcY6DrUSb6HRBQtqUPOlJPznn3qRGcpsdiU9Km+yEg7cEgcipLOyNxIFCyEZ521F2aWikQRRNNMIoh971rbsdKnt5d0kilSOVHOatwx/Z8JDYNuH8WByPrV+MM65aMofQkZ/SrXmc85diAQbRwAKDEatceZs2tnrnHH508R1VzKxS8k+lHlkdqv+VSGDNLmCxQ2HsKXyzV0W5pwtjRzDsUfLzilELHtV8W/tUghA7UuYLGeIcdaXyfatLyge1KIQO1LmHYzBDnjFOFu3pWkIh6U8RD0o5gsZgt2Haquq6Yl/p0sLxlzjegDbTuHI5+tb3l+1RyyQQSRxyyIjSnCBjjcfQe9S5XWo0mtjwXW4Z7P/AEW+to1uFJ2kTFmUk5ORuI5z171idO9eh+PNNi1WVdZ065guIMASshJMQAwNw7DIODgcmvPGwK4KitI7YO6I88mmnBp74HIqPrUFhnmilA9RRSA7wzRlQuzilVk/D0qmsp4zUu4jGMHNegkjPmZMShODigRR+gqMJJIpcIFjX7zkhVH1J4FQi905W2tfxlx1KqzAfiB/LNAXNBIEYdOlKYoxxioYLyzcfu763c+77P8A0LFTKrStlVEo9Ym3j8xmi1+o+byHxoijHH41L5aL2FMWMBvn3ow7EUrSY6KG+vFXy6ak8+ugpgRx0o+x8ZUYp1u26TiFvwNWDY/MSsjAHseatU7rQh1bOzKvk44IINIEwepzVpoooGwTIc/lUeC/Kxtj86hwaLjUTRGc4wOTSZkXqlVb66ntriKOON97c8Dkj2q7HcXLwg4+7w3GeaIpPRilJrVChztwyGnRZkJCjJHarlvP5kQ3JyPSp42Zif3W0Z65HNa+yizH20kVYIC4O9StP+xnP36uBadiq9lEh1p33KiWrBhlhj0FS/ZkzwMVPilpqEV0JdWb6kZhQjBFRNZ8/I2BnkGrWKWnyoXPLuMSJUXaBxUb25yvlomB1BFWcUmaZKbM2aCd2KxxsoxnB6VUFrOz7RC+fyrfzgZPFO4xk1nKCZtGs46WMy1swpxLDx3LHvV9WRAFUADsAKRnyxCuM+hWoG8xM5dXYc4PFNJLYmUnPcu9uBQKiglLR5IXOMkBulNF2McGPPpu5p3I5SyFp20VDHdoVJb5SPWsi4v2knJ3nb0wDjik2NRbNlZ4WGVcEDripQwx0rBN6AFW3ymBj3NSxRS3aKHnZWU5BJpXHyGyksbHAP51ICp4BrHS1jQlrm9DL3UN1qSPU7K2/dxhyPWlcOS+xotbh12mSQehDcinCFRj95J+fWsu41xAo8kHPvUkFyLpQbgrxyArD/Gi4+SS3JLm8gWQRLC0zelSCwjngEkcXkSkDkjpUsd9aqQqNkn2/wAavxYlXcpzg4pXCzKMljLJGqi46dSV601NHRWV/NZnA79D+FaaqCcblz0609InH3iP8aVwtIowWO0HztjndkYXGBVpkAU/Ln2qbYaULSuKzMySG6eNkSBUB6EPg1et4yIU3IEbHKjsanxTgKLjGBKcEp4FPAHrSuFiMJTgozin/KO4pwK0rj5RgSnbKeBTwKVx8pGI6XZUoWniMVPMNRIRHS+XU6wqDkDn60/yx6UuYrkK4jpMAE7htA9asiFS3SpREv8AdH5UudDUSgHjZsCTPsBSlj5gQRn69av+QpOSq/lUgiGMAYHtS50VyopbTkALWJr94fsM9rahJ7lkYNAsoSQJtOSODzyD0z9a6O7jkS2LQNCjKQxabO3aD82T24zz2ryL4oaw0uqWwsVaMW6hjOjhWfOQMY54ywIP9eYlU0HGB5xNOtvLLDaSuYSTiRhtZlI6EAkYqpkkUHLHJpcAcVym43HY0uMUpHFKCDimgAYop+1c0VQjppby0t0AnmUnGdsI3t/PH61Qk1xidtpbrGP78nzt+X3f0P1rP2cYx1p0cJPCAs391Rk10uTZCHXNxcXjhrieSUjpvYnH09KhVfnIAHrz/StCHS55CDI6xL/303+FNvtNgXUbK3gkkJk++7nJ6ik09xpFMpTNnHTmty50e2T5YLuVnzyOGUfj3/D86z7iya1jLtdIB/tinySWtieZXtcbDqOoWwAhvriNf7okOPyq2niPU04aSGQdw8Kc/iADWQZJQ+1wowcHipxEjfxqfxK/zFSm+hT0O5sLmSWytrkIiPKhLKududxHck9AK0IxKTn7QuPQiqthp9zHp9rF5YASIAknPXn+tTrEigB5tpJxnBx9K7IXSMJ8rLqqxzuCkdsU7aqISAFAGaZYrCQdk29h1GaTU5GtbU3A3FE+8FAOAeM8/jWvNZXOe2tjjtYe4juCXM+ZcrvLfKy8HA9s5P4itLw5cDcd8uHlbb5fbgfeH5YrmrmVZZdyBsDuT19/amRsysCCR3BBxXAqnLPmR3OneNj0Zri2EuxuucZA4qR54onCs2CRWN4fvI72eeI4iQhdqFixLHJJyf8APStubTTMQTKeBgZGa7YVOZXRxygouzHLIrKShVyPQ0hDyLxujYevNRppTRqQs3X1WnT2d0y7UkJXGCDVcxPKujIvtMschEgV0B+8tTrco0oQc571WTTrmLIRuGHPFWUNxGoTyiSO5pcxTiuhZApQtU/t7K5R4iGHtTH1ItGwVMN2NHMLkZo7aXbWdbTXr7R+7IPdjitEJMRghSR1waOYTjYhubczx7A4Xn0zUKWtxGoRZlwPY81akR04J5PQCo0aRmIRGbHU46UrlJOxKiOVG5l3DrgcUjQRbtzjn1qXyJyvQVBLZzyMVaRUX1znNFxWIpbSGU7kJUnriqc9ikSkg5PrmtePTdqYaVifUDFNl0dZAMSMB7mlcpHOEHoWNN2CugfQYhE3ztnGeKpWukyysQ6soB6lajU3Uo2MtYyalG9BgE/hXSHRbfYCQQQOSo6/hVa50+ONVMFpJIMfMxJXH50rB7SJheYPxp0cfnOoUZJOK0IdLeSYMUxGezDmtWKyt7PDOij0JHNOwnU7GQums03kmVFA7seK0rC1s42Kecsz5x0rSSK0uU4WJlz3HerEVpFFkRxqmeTtGKV0iHNvQp+SIgzRWoyD7cj2pyWcMigmNwM5AYkYNaHlcU4Re1HMRqV1jAOQoHfpUgU1N5dPEXtU8w7MgCmnBanEXtThFS5h2IApp2zNTiE+lSCGlzWGosqiIU4RirQh9qcIfalzlcpVEQ9KcI6s+SaURH0pcwcpAI6esVTiI1IsR9KlzKUSAR1IFqYR+1OCjNQ5FqJBlFPPWgyKpAIbn0U1aCgdqcMdwaXMPlKgmUNjy3P4VKJox1OPY1ODFnBpptrVnyY8n1pcyLURodSeDkVOkQYZFL9khKjHy/Q0otkOAJGB+tS5IaiBijCkORjvmvFfGvgPZJcXuj3cc0+3z7izt4yC/wAxBaMbmJxnkdu3pXqerzaVpZxdXaQyMhkXzWIDAEA4/Fhx71wnjbQNUs5rm8s4oLqC4t2EtmtvubaCNzhh3B2nrn2IHCdmr3KseN3kEdvKFjk35UFs9m7j8DVYc8Vau1maITPGqBpXBwAvzHBwAO2CKqZ29qkQ49KjY88U5mB6U3NSBIJCoHNFMYcD6UU7iNq/tjCIArZLNhgBgYxW6YEjkaOJQFDEAKMVY1yzVdS0tHt0iZ2YsFbOR8vOPzqK91VIy/kf6PE3Vi3zEe57fh+td3LZu5jzXSsNZEgyZ/vD/lmv3vx9P5+1Z5kil1qGWRVjSOMkAdsHvWZda2o+S1TcTxvPSnacJbiG6mlcsyxSdfZaXPFuyHaW7I7jW8KwtFzg43sOPwFZM8ktwglmcu5YjJPbilEZW2Ler4/T/wCvUrRAQW3HLk/zxWEpSluaRUY7Fqf57h2xyXz+tOUZqeSIFmOO5oiiy6r6mrSIkz0SP7TGzQpdwAHICs5JFU5t8LmLz1fPLEncM1I1oZL6SMFxIZCApX3py6TM0m1TA2eRiQZP4da67mNkmRW0bGTcFR+vBfbj+VZeoam0GyIq+11DMu49/wAv61sarot3b20fkSRCZicIW5OBk4z6DmuGvI2hvJYWDKY2K4Y5IrKpNpWRpCKeoSNG88hTOzJ25ABx744pAwI4qLkYpVPP0rmZsa2hypBrFs8jhUVtzEn0GcV6hCVngjlQHa6hhkYODXkMbBjtLYBOeBXo9jrUVpHDZ+VI3lxBRzk5Bwf1rehK2hhWhfU2Pk3lCwDDGQak8vAqhcX8JjZJYyxIyN2P6YrHkupJDgqT7Fif6108xgqdzqFjB6YP0p3kg9qzLS21CO1HlRD58HcHFaEcWou2G2Io7nnNS5ByWH+Qv90flVeTToHbcYEb6cVcFtO74kK7M9jz/KgaTGz7mmuG9jKcfpRzBylZNOtQAPs6g+4qYW8SnIRQfXFTLpzqTiYjjA4/x61PHZsgwZC34VPMPluVGES4LMo924pWaNOp/IZq29hDKCJE3AnOCalS1jQfLGo/CjmHyGasqSZEfzEdhTDYJN8+Tk+9bIiUdABTVto0YsoxnrzxS5w5TmLrTb+3YyQMxQc43VD9u1KNRuhIX1xmuw2p3K4Jx1rPup7CObynkYMM7guMLxnnPr2o5x8rMqx1MyPiWQD8q1lmhYgK2c+gqwmkWzAttB3deKfDptva5xxnpmk5oXKV8jzNmxj744qcRA9qsq0BfaXUN6E1LsVeannHyFEWqj7qrUht1YYZQatI0bHAz+RqcRjsKXOPkM4WUec+WM/SpVtgOgq+IxUgiz2qecrkKAt/anC39qv+T7cUoiB6nHtS5x8hQFqKf9m+taC24FP8nA4GannHymcLc+9OFsT3NaIi4zg04IB/C2PXFLnGomd9ncd8/hTxA2O1aOwYztJH0p3lNjITNTzl8hliGbP3VqQQyjqgP0NaYhbGdmKREfP3A3pxj+dLnKUCgIW7xmn+Sf7prRCgfeAU+hNIhVjghQPfNLnBQKQh56cVIsIx0q8ixngsoPpmpliRiQMEipcyuQzhbrSm1Q9QK0/so9KX7IvpU84+QzBaJjFNNjk8TMB6ZrWFmncUosY8YxR7QpRM5LOLAB5PqTUotogoAAAq6LKMevPvSnTomOTuP41PP5j5SmLdAOwFKLdHGQwI9RV0WEYzgdab/Z46BiB2AouOx5V8WbaNLGMpaSzzCM4zNGIth5bcpO4kbQQQMZI5rQ8FahFr/hC7trCwig+zARrazTscowyd7AZBJ39s9Kt/EvwwdR0eKW4uoIrCBi1wzK3mnKlUVMBs5ZhxivD/AA14xv8AwaLuycTRbLuOWW3PyM5VsPH04JHXPpVJ36kvRlTxxocmk6qghtoVtJYlngaCVpF8tu4JOQCckA8881ymSR1rfi8V3VpNcPatIkVwZGa2Zsopbpj1A7A9KwAdx96DNiA880Kp5B6U7A4ocgdKBAX59RRUaE80UwOut75b29e7WQytAjMXbnJHPXvXNP5tw0sk7l9iBsdhkgf1ra0KNY9Lvjj/AJZScfVcf0rOniKDUCBgBxHj/gX/ANjXTJNpNkKydkQxQr59ghHD4JH1citfTgBpN5IB96OX+RFZ6RkahZD+5Gjfpuq7YnGg3XPSI/q2KIoGZDDFgjesrD8gv+NSEbl04eoP/ow0syY0uAessh/RamtlD3emoegx/wChk1NtSi6Rwvuf6VLZR772BP70ij9asf2dMVRpisC9f3vBI9l6/jjFPjuLKyniMCvc3QYeWCM/NnjCg9c+pP0raxieryWlxEzvDK0j5+7KeD9D2qRofMKB7YNkclsHbTPC82q6hoqTaxbtBdb2ADIEZk4wSB0PJHQdKu6iJba0kmUptT5iWbYFA55PPHGOneq9oR7NnK+KpnRDAXhjR0K7pAR1BzhsgA4GO/X615pfuZL5yywqRhSYWLKeOuSTXoXiC8OoaUzXxitVu4h9nhnGVyo3E7s4VuSASB6c15huKD2rOTub042RKuD3496UkdO4qLexYcA546cGlU9MjiosWTpxyK6zwbIs2rAXDq+1QsSF8OTz939c81yYPGKvaTqcmnXAeMBX3hvMBIZcZGAemDnnINStHcUldWPa2s4WB3QoQeuVHNNbTLV02m3j25z92sifWxcSacxxhFSa4KE7Bu4ABIyTyeP8Djqo4y8at03AHFbe0MPZmUdItjGUWFUB4ynB/OpI9P8AKICTShAMBd2f51qiGnCGl7Qfs2UkgwOST7mniOrYhpwi9qXtBqmVBHThF7VbEVY994p0DTNQWxvdUghuSQCjE/Ln+8eg/Gp9oPkZe8r2pfJ9qtxhJY1kjZXRwGVlOQQehBp/l0vaFKLKIhpfIq8Iqd5XtS9oOzOR8STNBaO8Mjq9udxUAc5UnjjsATnpkV55PqSy3H2ra32jJPJ+XAPy5Bz2rZ8UXrWmq3ce3H20B3CsCONy84GeMHgn6iuRblyV5HrW0dgPWPDOpT6pYs88670KoegOSM549f6VvmxZzlzn614xo94ItRsxKT5KTBsKcdx3/AV74sLn+MflUVHylxuZT6YkoG9Q2PUZpP7FtmAzBHx/s1tLEw64P4U4Rt7Vl7Vjs2Z0VmIlCqoCjsBTnKxSKhST5v4lQkD646VpeW3oKcsR7r+VT7QXIZrCRXULBIynqwxgfmaWWYW0JlmjfaOpUZxWqE9j+VOCDHI/MUvaD9mU40yAQeO1SrEasJDCq4Xao9AcVJHCiZ2sTk55bNS5j9mVxCPSniL2q0Ix1zSqEI4YH8annGqZXEQ9KkEXtU4A9RTwlS5lchAIuOlOEXNThacFpc4+QhEQpwiFTBaXFHMHKRiIHtThCvcCpFp2RS5h8pAbWI9Y1P1FAsbfr5YqxkU7NO7AqvYxuuNzgem6lWxjQYDyj/gZq1mii7C5AYH2gLMQR3Kg5qGd1s4zJPe28C/3pAFH6mrNwsr20qW8qxTMhEcjLuCtjgkd8HtXgmsfCbxbql7Lc6tqkl7cs/DRcoR6jJGPpgVUVfcTbR61/wAJn4fgn8u58SaSTnACzL19+eKST4heEoGKSeILBnHaN9/8s1yHg/4KaTpNwL7Wv+JhMpBiglUeWnuwHDH26fWvUYba3t1CwwRRj0RAP5UOwrs5dviX4UXpqLv7pbSEf+g0g+J/g4f6zWFh/wCusMi/zWuvqpqN7a6dp1xeXsqRW8KF5JJBkKPeloByusa1o/iXSnfR/EFtO0CO7WcZSUXK45Ro2IJOOnIwTmvnPxdCus65cz6Ob2exeeSQNeSKpLEgEhTgjgAc8nbXX+L/ABB4c1vRoZ7+4ig1NkMirp+mqMnAABkbDDLKT3xuxk9+DtdRf7DJ5CDZDLtBkySQ2SP5H862pRi5amdWTS0KK+HrvGZJII/ZmJ/9BBp39hiPHmXQ/wC2cZI/UilttYu7+5SAeXHuzyEz2z3NQXV7d8ETExsOPlHBHUdP88Vq/ZWukzFe0Jxp1nGfnknk+mE/xp32axUcW7t/10kJ/kBVK/LwXssRlkKoRjLe1MukVbO0lAIMgbcck5IOKV4q9lsOz7mhizX7tpbr/wACb+rUU3Q4opEm82NG+7jcM+tFaRjdXsS3Z2uXrFdtldLnh1C/m2P61nzHfa3r/wB65Q/nvNW9OffLNGTxlB/4+tSwaTLJZZm2QB5AwMxIJGDyF+8Rz1ArS10F7FIrjU0P921H6Q07TUmudKvreCJ5JDGmAo6fOM59K0pn0mzuGkAe5mK7ArcDG3bjap9Pf8KoyavdSI6Q7IYohnYigAc44A4BqWrDTuOfTIIrO3W9uQpj3Fo4iDyT/e6dO43U6PUI4pI49Ot1R1XCyfx4HfcefXpj6VmXSN5cEpZ2eRSzbjn+Ij+lWYBnUYTzxbjP/fukt9Aew66M7xkyTEsT0HT/AOvV3wmjnxbpAIUL9thzx23iq8qbh+NWtHufsGr2l4F3fZ5BNtPfb839KpomLPocQ47Vyuq6+bDWp7K9i8qH7I0tvhxukYbt3Az/AA8gEHp68ViWXjXxfrEUM2m6NDJFIGiDRqcB+PmJPAAz61mfE67ie5sovMmN7GhZhu+42ecDqBnPPOcDHHNcsW72Z1OKtdHIeKNQstS1eS6sIZbeOY7/ACGwApKjJAB7nJrE3k9ec07yuOCaaVKHp+YrZPoZgAeNvrU55A4x7VEoXGCR/hU8ZDFeTx0FMRJEvGW49KnSI71cAdQQGAI/KoQSzemO9TrOq9OadkJtm3p14G1K2e+l/dGdGcxqE2AYGeF9B0Fe36Ze2mqWguLM77fO1W9cfr+deAW91AI5HaSRJ8fuwigg5POTnjjPrXrvw5ONIMcZSSL7xkXeAp/ujdwTndnbwPfPGdZWVy6V27M6/wAoelKIR3FVdUuxBayBbqC1kxhZJuACemM8HvXE6P4nmt7y4e5lup3mcKkJwEDEnuSSvXHGen0xhCMpJtGsrRdmegeSPSlEIp8TmSMMUZM/wt1qUVlzs09mV2jVUZjnAGTXzDfaQfssl35rSzs29yecknn+fOfSvpPXtf07w3prahqcxjhDBF2qWZmOcAAd+D+VeC6z4m0u5upL+006KO3eUGKykyQygjO/HQHB4B71UZNkuKW5638Nob7/AIQTTjflt5U+UHHIiz8n4Y6e2K6vyqxfBviuz8W6Mbu1t3tzE/lSRNj5SADxjqOa6Hg0nNpjVNNXRBsqO5c21rLOEL7FLbc4z+dWT1rG8VSlfDeoIkirIbd+CRyMc9apSbdiXBI8P1TUZdQum8zcPLZtsZG3y8npgVW3A4C8DvSNGPNcg4B6Y5qPLbvSvRjrojmZYth+/iXjBcAknA6179oWqWt3ZWluLkyXfkAyI5BcEfKS2OhyDXz/ABhiAAOSa7v4f6hPc61Dpz3U0UagyIsOAHbgnfnrwp9+Tis8RC8b9i6b1sewKlOCe1OzzTq8vnOv2Y0JUipSCiWeO3TfNIka/wB52AH60uZj5B52opZiFUDJJPAqtb6laXN61rDMkjiMSgqcgrnHB6en5iuT1z4g2GnzXlsJbKRAu2NvtCne2OQVz0569+RXnCeKoNN1Rryz1VIpGDj5QxAUnKrgA9MAdeO3TneFGcldmcpxifQO1ccqD+FNEEWP9Wn5V5Ra/GXSrOONZxfXW2EBtsa8yZOeSQcYwOn4VXuvjzAuRa6C7f7Ut0F/QKf51PsanYPa0+57H5SFcFVx6YoEMYXAQY9hXhMvxt8Q3KSPZaVZKkYJZtkkuwAZySCBVC6+JXxCntre5US29tdSCKCWOxUJIx6BWYHPQ9+1UqE+rF7aPS59BGAZwoIH1pjxzICQ52ivmrxJ4m8d6NNHDrd/qttJKnmLGLkJlckZwh9Qas6b4Y8TeJPEV/ost3Ct1YokkrXV07ghwCMEA5OCKr2SWspB7eTdlE9/l1jTbLm81e1g9pLlF/mapS/EHwpaAiXXbd/+uYaT/wBBBrw7w54FvfEGj6xqDalBa/2bNLCYxbl/MKLnIO4YB6dKmt/BMU3wrbxXJqtwl4YXdLdVQJuDlccgk8DNPkpdWxOdWWyR6vc/GDwtBny3vLj/AK5QY/8AQiKy7j43aemfs2j3Uvp5sqp/LNcR4h8DaZp/wmt/EFvPenUpIbZ3ZpztBcqGwoA45rT+Ingvw7pPg7TLzTtOWGeS8gEkhkdyylWJB3E8E4pr2V7W8iWqtr38y5dfHO7H+p0yxg/67Tl/5baxZ/jdrryqY5tOTnhEiJDe3JNdP8RfD+i6YnhmXT9JsLTGswhvIt0TcMMcHA5HHeuU+O9ug8V6G6IqoLYjCjHRz/jVRnB2tFakyhNXvLY7Hwd8YF1i/wDsWtrb2rPhY54gQm70YEnGfWvUDdIjbS4x64r5Gj0K7fQrzXbWdFWxlijlibOXD8Aj6EfrXpHw4+KEcUcWla5ITbqQkVy5yYD2V/8AZ9D2+nQqUk/h3HSq2sp7M9yW9i3YDCpBcKTgMpNUikMi54ZTyDnNIIIQOFx75rkujs5IsuNO+7CmP8TSGacf8sl/B/8A61VxhehOKk82jmDkJFnuOjRAe4YH/CpFmc43IR+NV/No82jmFyeRb83A5oEgI5waqebVS/1a20yJZrtvKt+d8zEBI+P4j2z0HuQO9HML2ZwPivwFYrYakDqVhpsN08jpJNEryO2HcIGbG1QSeFBbA69q8Kisxp9pewPcW1wRLCwe3lEinKydxX0F420rxBr2n2cuhas6N5LEvbYRJMrwcl+AQeMAn3r5/v8AR9U0OGaHVLC4tJX8t/3y43csMg9+v6V0UXqc9eGhk6MmNZs17M+PzFO2bpZLdiArscEn7pyQD9OxqSwUpqNm4/hl5/OobvcuogBc/vHXHr8x/wAa1StEwvqSa3EyapKrDDbVyPTgVHcpu0ix56NIP1qzq4aa5jmTJU2sTE/UYzUcg3aDAe63Lr+G0Gqa1YlshdOmEAkHrj+tFVFyBRWibSJauzoY9Rjtt40q32ucFpAcsD15c9Dx/CBUBiuLtd9xOcFjlV7n1J79aqaWWEU55wzYz6kK3+NdBBp8kVvFPdvHaQdd05wW57L1PHtWkPeWpE9NiotvFDHN5SBRjA9cFh/SsyygMq3jf9NAv6k/0q7d6pbQfu7ZWm7F5RtB+ig5/X8Kp2+peQsirbQgSMGbluvPv70pSi2hxUrMsT2hIjRcHYoB/n/WnQQt58j44SMqT+AWmLqgZifs+c4zh/YD09qYNYhjWZPJP7zO7Mo4y2fSnzQFyyJWOBU2mm3/ALSQXWfI2OZMdduw5rNN2sx+QFQO2c1a0pydRQlQ2Ec4IyD8hpN32BKz1J7X7SZlcXBtrcTcESHah6jHJ6ZHrTtWtniihla6EyPGBESTnb1wR25J/wAnNOvLWNmMwYFdu8KmcJ2xj8BVN1tzDKGRlf5TGwfgeuRg5z7EYrDladzaMkypEDnFIcs5DHkDPSnAjAAH1oZRvPy4o6jGYHChVIznJ61Mm1XK4xxxgUwYRyNufTNOBQKpxk54HpVITHSEIBtOKhDHBqR8Phug7jNR9TkcZqriJI5AhBYZX0zXd+FPGTaZDDa2dlbxTE5uJWcgSqAcZzwuM5zx/j56amtZ2ilUbysbMN4B6jNJpS0ZSbWqPYfEWr2mrFf9Nmlxg/Z4+I1OOcMR8x/D/CoNPl1PTZfJgu4IIz8/lkqcnHH48dvX3rCsp2v1MsWmusG7hFVugGM56jPWt3TbvRLS7c6parFbOBxLcKrL7DcR71fIowsiOdyndnoejea8LfaNRt7uQ84hx8mSf6Y7dq1RAxAwwz3Brg7Dxl4J0K8ZUu4Y45E+eSF3mGQeBgA88n2qe5+Mfg+3OImvro9hFBj/ANCIrz503zaI74VIqOrPOfidrWtaxctotzZRxDTp2eTyWLBztG08/wCySfx6V55fosU4hUqRGoyVOQSRW54k1ttX8Wz3trJPBBczmSPzsK4VjnBwcYHbnoKydRuN1zLC6ROVY4kVQGP1I61pGLSsc85KTPbPglp8i+ELq62nE14wHuFVR/PNelGBwehrwvwvq/jrTNDsdK0kWttbOYmjd1QlvtEjBCSc9we3AFMXWfHWqSXccniJ4jbm7DiJtnNugdsbVHBzgVLpXd2zaNZRSVj3h7aRYXcAEqpIBOM14j4vv5NS1BXgFwEC/O0oK5YgBhzgY+Wsy90XUpQx1LxJdT4ks1KMzMWWePeSNzH7vA6c57VyL2SgtiWQ/K57dunatqMFF33MqtVyVjaCIkuWuLdRjn9+h/QHNILqzjJL3sTn/ZRyf1XFc/c24WdI0ZgNgJ+bqauLZwmZx5a8SIRnnAxzXRdtnPc0G1nTo8/NMT6+Wo/9mpbPxHHZ3cNxZWs5nQ74m8zPI74C896ght1WWLYoGJ3IwMcYbitbQfLh1jT2eGJ1RpZNsgyDw/B9qdnYE9TSHxa8WNdrp8MFvFdPLs2vA2/exwAdxwOSB0FOufE3xHntNRuZr54IrCRYrkIIkKMcYHyjJ+8OlYiq9z8SDJOsYla+jdgn3Qd69PavQdTtMaP41Yjlb2Itjv8A6uuXlStov6sbqTd7t6f8E5u60bxvNdanbXviKXfYWgu5AbyUq6kMcDHGflP51Cvw6ubm70lbrWN51G0kuQRFkptCEKSzc534zx0r0O/sW/t3xKgO7/iTI3P0lFZupkW1j4XuDOkJl0mfDP0z5cWB+PT8aLvv/VinCPX+tTyibQvs+kSXjXBMqFgUBHGH2g9Oc+x9aq6TZx3KtJcFnUISVDEYO4Dt7ZrYvpFk0V8Z6sRuOSfnPU1S0Y7YZB/sH/0Ja6FHXU5bkb2EB0yUpFhnmIUk5KruXjJr1cWmmQfEHwobW0t4gtjI0gSFV3EoeTgcmvMWb/iVfSdsH/gS10vhy8LePLCWeXcxEiEt6Y4H60qtNNX7GlOdnb+tzp9OKJZfEsDAExn6f7stVtScf8K08Irn/V6hER+UlJZSAp49XPXze/qslVL9y3w88NL3F9Gf/RlYJar1j+Rs3o/R/mUvjewl8Saef+nMD/x9q6zwhPt+JniB+8lnbN/5Djrjfi+3ma1p7+luR/48a3fC92ieONSm8wKGsLbn38uOoUfct5Mr/l6/VGr4EfGi+LIPW+uR+eRXLjWzb/CGz04KXWa1n8wEAgZdtpHoQQfwzVzw7rkOkxeIzJucS6jKAqjkgs3P6iuMWaSTwjEhZmWO1cAZ4XLNn8zWihdtvy/ImU+VJev5npOv3AuvgZGoGNsNuuMg/dlQf0qz8RZvO+HNgf7s1s36Y/rXB3Wqmz8C3FiUObsQEFsgYXaSR26gc10ni+/E/wAPbWMIflFsSx+q1EocsvmUnzRa/unR/EyfzNE0eTP3NUhb/wAdeuO+N7b9Z0R/+mTj8mH+NaXji/ln8OWhZCFW7hYHH1H9awvi5OLq60iTaVIEg5+q1MI2a8mx1dpeiK+kKJfhr4kTHJktm/JxUfjTw1HBdeH5tFtdt5fWCF44+ksiqvb1OefU+9V9G1Sx/wCEV1HS0eb7XdbNm5cRuysDtB9cZ474rrNRP/E58FMxPyKQQe2AnFdM1rdf1ocsLONn/WpQ+HnxMk0orpGrs/2JTsVnzvtT6Hvs/l+le1Leq6K6OrIwBVlOQQehBr511vQX1HWPE17bzGKaynedVK5DqSSwPp/n61peB/H7aWRpuoMxtBjGOTAT3HqvqO3UehwqUlU1W/5nRTrOnpLY96+1D1pjXyqDlulYcc/nRrLHIrxuAyspyGB6EHuKSW5SKJpJXVUQZLHgCuTksdvMmrmsNVPOV+nNSx6ijj72D6GuOfxXpcRHmyyIrAkOyHB/Ln1q7p+pWmqKzWcvmqrbWwCMGqcLdCVNPRHRS6kE4HJ+tUtaitNd0a5066MhhmTDCN9jHv1/yKz764Gn20s8gJ2IzhScbsDOBXmTfEq80+/O6yae2d8lZZgxUYH3WCjA74IP1pxhfVCnUUdJFy08baz4CVNH1OBhZQQutm7qHaYiQEbyGO35MrgHjIOCKq/EDxvovivwuY9PiZbkPHPIXjCsMHbgnv8AeHtWH438W6Tr85hhtNqxTqTMqLumXABJbqCMYHUEemBXMMttLJqD6fBItqIFzuOdpLr39OK2hBN8xyTqtXitUMsObqIn+/8A1pLuInVmQdRO39KTTTm8jXuHH8xVydT/AG/MT08xj/6DXSleKOVuzIJHWK4s9wyrWoQg9x6U64tTDpvlg5X7SGVvUFcVDq0Z8myI4ZY36ezkVcEhuNEIBy8VwikD1Jql1QPoUFg4+bNFS4x3orblRFyeDUV08eXYoQ4JIlkAZwfYdB+tQSyT3Eplnkd5D1Z2yTSqiqTgD3ofrWOvUu5GFAOe/rSg0UlAC55rPuWzIzGQo4OPKweR61oAc1QvIs3Jf6VnUWhcdya3GGkCtuHGDitbSppWuI/MMf7mJlDLGBke+Bz171lW3+rb61dgnNtDcTKiuUjBCtnB+ZR2+taR0VyJauxc1fUnbcxWMk/I21dvoegwKyftTMgVmIJ43bjwPT6e1Mk1OdmLLb2qZJJHlB+f+BZpw1K95CXLxD0ixGP/AB3FQ53ZSjZE8NrcTgmKCZ19VQn+VWPsk4YhzHGcf8tZVQ/kxBrMdprjJkkeQ+rMT2oMQ3AYHTPT3qdxml5Nug/e39sj+mWf9VBFN8zT063Mrf8AXOHI/UiqjhQhI68fzpAo/I01cLlo3dgPl8i5k9DvCfpg/wA6b9vgBxHp6EessjHt/skVXAyzAeoH6U4phc+3+NVdiuPOpyn/AFVraxj08oP3/wBrJpo1XUFXMc5h7/uRs9P7uPWo1X5RTDjGPp/n9KljuWzPcXTr9omuJicAB5cnPy56/j/kVbFjbpAzFCT5ZPLHr5bH+YFQwJtbeQPb8xUu9vs8hPTaR/47/wDXrRJdTNvsT6VBCsMUhijdww5dA3/LVPX8R+JrqNM1r7HLZultCPLaBjtUKTtedu3+/wDoK5ewk22qDHUgg/8AbQf4Vbin2CInJwEP5BzTUYtahzNbFTxFci91S0mCgCCwtocN3KxAf0rEktJpZdyqpLngA9zWhcS+cwk5A2quB3wAP6U60YLNC7AkKQ5A745/pXM7c1ka30uz0DSdctoV02Nkf90unKc4/wCWcrMf51S0i8gMuqTEkbzqzfg0QArno7tVMWEPyCHv/dBNVLW88qK5PPzxz9D/AHsCujkRKqM6jXL+G6eRI4ir5tVEhwCDFbbSPpk569hXNuv+ilsf8u24fXIFTzXHmXZIz/r2HJ9IwKhB3WZHpZt/6EK0iklZESberKd1GBqbqOi8D9a0VhVLvb2NwF69sD/Gs+/YLqcp78H9TWi7Mb119LtP1xQuogi25h9TLKP/AB00sOS9qM4zHKMn/gdRR8CEg/8ALzL/AOgmnRHd9mBP8Mv8nq0NBbz7vF4kaTzS1wnzA7Q3zL37dOtd5rev2tvYeKbOVszX1xHs8o7kyqRk8+leY2xI1yIf9Nl/9CFaDxn+z7j5vuSk8d+ErHkTK57XPZp76KTxBr0kUqOkmiRqCDnPMvFc/rMQ1vQPB9nDMI5Rp0o3E8ZCRnHtnbiuFuwyz6gI2K5KtwfeSnW1/PFNZjzXZUt22qW4XKKDj0qXR5df66l+2Uun9aFO5Jj0mSNiCwZgSPUOaj0dflkA6iMn/wAfSluPm02U9fnk5J/2qr6ZLj5efnjdfyZT/StOqMy3JhdH46tcP/6EtXbeTyfEUMmSNqyNkdRwKzHkzpbr/cnc/qKticJrEEhVSPLdsEcH5QcVoK51Oh3LG18V+dJH5k8bNtHfKOcj8/1qO4vIpfBGhwrIpkhu4t655H3v6EVzt1fRyy6qbcMkUkgwgO0Y2ng4qm8mIrJwSPmQn9ax5Nb+n4Fuppb1Oh+Krb9RsCD/AMsmH61seGGX/hLbjIGG0u3b/wAdjrifFeo3GoJaG5YyTRl13YxkZGK6Pwpe+b4geRkKf8SyOM59V2j+lY8jWhp7ROXMFou+/wBcT7SIol1F98YwCylj0z6YFc7GSfDsSgcfZ3z+bVrB1a81wGNiz3e+Nse7Zx9eKy4IJTo6IY5AwR1wVPqf8a2imQ2iTUZGk0WMNIxEdtHtGcgDaM/Suj1K/e78AXETyOzQpbfKQMKA6Y9+R/KuXuY5X0sKI2J+zquO+dvStGe6C+Hbu12ZkmhhUFWHVSpORn60ThdBGVjqfGLyP4OR2cFRJAwGOnzD/Gsf4mCSWLSmZt5JkCgD/dqxr+oW0/g4263cMk37ohBKpPDqex7D+VZnjnUba+tdO+zXUUrxsxPluCV4Hp06VkotP5mk5pp+iINDRT4P1tGClUWNgrDPIYc10EzGzn8Oz6nqHmW4PmQzkZaMHbvST1A4w35+tc9o7L/YuqW5eNXnjAjDuF3HI9au6vcsw0WF8KIVPzghs5Ucjt2rezRzKSt/Xc3bKNJNU8ZL5oKm3dlKjIfKHB+lc/qvh+2vPCfha8slRNSuGa2d/u567c/l3qrHfpaTtCxdoBtRGjJ3KGTtjqvJ+X8vSmtdS29tawhmYQskkMivlG+VuV/GodNPZl+00d/M0vBfjS68L38ml6xaySW0blZLcn5om7lD/Tof1r0vWdRsNS8OvPaAqs0W4DIIrwjUy99JNdvn7QxWXepxz5eT/KtLw94qlsllsLgkwuMMp7H++vv6jv8AkRnKmpb7mkKrhp0Onuo/MiQFHVumAx6Y9SentXYfD+/tNOt9T8xNzGRGX1PB+teSalfXMdx87fJICUaP7rL7flUMWpXKESRXEqHAAwxHTp0pzgpKw4T5XzHb+J9evNV1El5C4hllSNBGAEXd9PQAfhXMX2kvdl44jGWVNwGRkD7ozj6daqzeILiSJlmbc5JYN6E+3Ssa8uppG3+a+cdd1VaMY2Jk3J3G6xp0Om3bxRX0NyAxH7tXUrz0IYA/lmk0pyyXMGMh4Tg+mCD/AEqlNJ5x3k/OetXNDG7U1QEDdHIOTgfcNYx+JWE9htk3k6yFx3X+laNydmqzMe5z+Y/+tWTeO0F/K8UgVyF4xkkcH+YrcsIJLy3Wdp0kLgbi0IJBHatoPXlIa0uR6go8+zBHH70f+PGq5iMNteyDhS8TfiCTW6LRiPnaJz2LRA469PTqaR7FpIxH5u1NwYqqYBI6Z5rVxTJVzLlt2uCJoVLBvvBR0NFa4tJl+7dMvsoAoq7isYDLhjUTdavNFuqtLCUHNYjuQUopCMUUhgxwpOM47VSlkWVhuYR5IHzA8e/SroqjO2+Rl98VEy4ksWRCxQqTng9qttIZba7YqikxLkIMD76Uy1ti8Q5xWtosRjnuT/0zx/48P8K0jG9kTJ21OcHKgbc81MkEnURMQSei11FqrNZQnc2do71DboxtY8kkYHWqWHempHtkYcUEzEkQyEEkcIe1SLaXLScW8v3M/cPHJ/wrShgyrn/po38zToIcXkhx/Av8zS9hsHtUZ09pLHCuInyxA6d9wpgsroH/AFLdc88Vs3w/dxj/AKap/OpMc4xVex1F7XQworO5eVysY+VgDlgMcfWpHsbpYmZkGApJ+dff3rWtlAe4IOcy+nsOKW9H+hTe6mmqK5b3E62trGONMvGjBCIQe4lX296jfTLiKItJsUAj+MHHOO31rfhX9yg/2RUV9EGs2z3YfzodBWuCra2IYLPAAmmjX5ycfMeMr6D2NNkhiW0dRMhfYflAbk7R7eoNX2h+aoLy1Q2kpY4wp5NU6NkSqqb1IbGKA20K/ao2Iw2QrAH588ZA7U6by0iGJeUjxwvU7SP5mo7W3AsYCO6CldOCCMg1Ki+UvmVynBs84K2Qu1sYGe2B/PP4UWxVXTduxtI4GTypFN5ik56oefp/+qiP76fU/wAjXItLLzN33LqtCD1lx8v8A7KR6+9VLby2SaMlifmTIAxyQfX2qUHmhI0jdthyDznGK6ErsxbsTb0E4cxuR5hk++B1GMdKPMjERQRPzEYsmUdM5/u0w0mKq1tgTIJ9k+o7mjY7lxhZMbfc/LzWgZB5hkEbBjIsn+szyMe3tVUIgdm3Zc4GMdKlCt2FCXUTkKrMrLtRRtkMgySeSPrSqzIUOyI7CxAIbvnP8XuaQBlzml5NXYXMymh/4mTOqpnO7BBwrA9uenTrV8TYjePyosOct97np7+wqmqKLz5WJyCWyMYPpVnHNKKFJ3J2vZHeRisWXADfJ6Z/xNILyUFSBECq7F/dKcDp3HtUKoWPAp3lEVVmxc1hk0rCBlkOYSdzIiIpPPODt4qtp886xZHljYxVT5KZxx3xzViWMeWwfIXuQMnFQ2m0xPt6B8foKzlHUuMicXEuHXeArnLAIoyfwFSLNOWQ+fLlfukMRt+lRLHuarCqFFKMZN7lSkkSqH3MxmnJf7x81ufrzUuxWRUMkuE5UeY2B9OahyaTcfWt+VGPM73M3WgVC5Z3Yg4ZnJK8jkVpWEUL2UJdAzFAWJ5ycVS1LaYstnIU7cevHX8M0tncEWsYB/hArBq0jZO6NF4rdQSLeL/vgVV8qL/nmn/fIpxkJ4pAfWqsLmHxrGjA+Wv5VqReWUBCIPwrJDDNTRzFcDNGw7mqNvoPyrJ14BYoWCgn5l55AyOv1rQR9wBzVDWTmGLcQE3HLfh6U2tBNmNcoJz+8+b5QMnrgcCp7G/+zRraX+6W0B/dyD70RPH+fX9REGV1BUkjGDn1704qGUgjisut0UtrMvzwtBPA24SQvLAI5V+62Fwf/wBVMtrpowIdvmRHYzRHjkgjcp7N/PvVa0vJNOba8YnsywZom/hI6EehH+e9aZtYPsMF1ayiaAyou7+JeTww/wA/0q0r7EN23KNzDthjkhk82BxsDgY/5ZMMEdj/AJFYt7A7XYKkjKBgR7CuqW0FvNcJAcCG3BKsMhlwchh3/mO1U5rVJ4hJArbcDcjctGCMA+6+/wCBwaUqV9GNT6ozLLUQY/sl2N8bcj1U/wB5fQ+o6H+TLqOS1kw0nmIwzHKucMP6H27UtxZqdO88D51fbx9aLa4KFrK9TdGW9e/qD2NQ09mWnbVFYzlhtI6etIyiUdMmrd3pbwqJYX82E9Hx+h9D7UyJPKiMpx/jU8r2Zd10MpsqxGMfWtDRv+QnGf8AYkH/AI41JK0VxEYyFilGW5HB/GjRSBqsBIyC2CPXIxWcY+8rB0H3kOdTV+2AP0rqLFFSziCqFG3oBXNSEvdqAqlXI+8M454ro9MaU2YEyBSpIGO49a1j8TJWyLnagU2nCtkJjjRSZopk3ZiCiRQ64IpAacqlgSOg6knAH1PaoJRSeDPSoWiIFWXvrFHKmfJHUqhI/OmG5tH6XKge6t/hU6F2ZTkcQoXYEgelZykfaXZnCqckZzzW0WtD/wAvMRHurf4VlLaFZGfzoHB54f8AxxWM076GkTQjleKBfLUM+eAe/NbdmrMJ5FTy2IXKryB69fpVTSrdXh8xhyGOK1RH+4nIbb8yc5I/veldEbrUh6orxJLFAkeSMKB0B/rSQrNHCinsAOgP9aTybhn4kH5n/wCvVj7K6p/x8Pu9OD/StFKRk4IrxxyquCoBLE8r6n60qiWO4kZgBlVH3Dz1qZopE2jznz6lR/hSMsrPnzR+K03JonlTK84lkWPADYkU8I3GDUxeQdNmf91v8KAZFyC69P7v/wBekDSluqn8KSqPcPZrYjgMo80+XjMhPzAjPTpx0pLlpjbSDy06dmOfyxV+L7QV+VYz9WI/pU4+0ovMKHPcSf8A1qpS0sLkV7lFBKka5SPp/wA9f/rVBezSC3AaJcFhyJAe9dVbi8MYY2BYY4xMv9aZdyzqvzWEqnj+NCP51Tktrgqb3OfaeQn/AFK/9/BVe9mf7HNviKrtOSGBrqFuJS2W025K+gjB/rTbi6jK7W0+4XPdrc05STVriVO2py9u7CxgAgaQeWuCpHPHvT/NwMm0nPsAP8a6QT2Hl82zKQOd1ox/pUTXemY+eKEfW2I/pUcyS3K9mcNeXEa30jOGjGANjdfyFLZSo0kfO/BJwvJxg9q1dXs9MurszJgZ4wvy/pS6NZ6db3wLBMMpG6STAFcjg3UubKS5LEEjJgkxSgf7tRxGNnfDkgHqVPpXTvBpxBw1ueP4bj/69V4LOwCMVgQ5Padhn9a6uW70ZjqjE2KefMXH4igmNf8Alon/AH0K6JbGyYf6lh/21J/rQ2l2ZXOxx/wKn7Ni5jlkIlulWJ1Yk9MjsD3/ABq+GRRhpIwfdx/jV1tGsmuhIS+4dMMP8K0o9BseP3lwPoQf/ZaIwktwbTMHMbHiaI/9tF/xp3ksASApHruFdF/wj9mP+W034hf8Khm0G0UZ81+neMGqsKzZykCl9SYRnzCQSQo6c1f8qU/8sm/KnR6JGL8ypOQTkY2DH5Vpf8I+neZD6Zh/+vUQi+pUtdjPjt5Mf6tvf5TUwgf+43HtVj+wChykkYz/ANMiKa2hOfvSR/iCK0WiIcG2U7i3b7PISpUY5ZgcCqGnRk20uATiQ8j6CtS70VxDgGNmI4OSMVDY+HLtYmOY2JbIIdhgflUS1kmVGLSsRrGQOh/KnGr50fUSmCeB/dlamnSNUAwkrD6yk07pBytlJeeKUrx0qT+xdXVt3myH6Tf/AF6lXTdTC/Mbj8Jh/jRGfcJQaMfUULQtjHCknJA9Pzo0+Pdax/SrWo6ZekbWWVmweHcHH0qSy0jVUtoyY7gKB/CAQKzfx3KV+WyGNHtFRk+tXJLXUxwIJmHvCD/SoTBqWMGyf6/Zv/rVTkiVGRATzxSpJzg1MIb5F+a1J+sH/wBamZulOHsgR7xYpNoaTRchlG7rVbViZooo40Z2L5AUZ7GozNMoz9lC++01WuJWmXD4ReowMHP1pXVrFakSqEVQCDkZ4p1U1uiJSrLgZOCQSKtK4YdCrj7ynt/9aoTTKd0hxptvPPps/wBotcFT/rIiMq4+lLRR6CR0MN3Dqn2u8tdq7rVlkg/iQgHOPUfqP1rDu7x7aOzkiYiZY12levcVWxLBMLi2cxyqc5B61NNNBqbwznbb3EACSQ4wG5JyuOnJ6dPT0puTat1EopPyLs8a3OnzRxIFud5LRKPlcgjJT/4n8vave2kc946OuAYcj67hSfa1+zJG+RJKxdcZ4IwePSrCXMeoyyCWXbdRkxCZ8KsvI4bsD79D3xVO2wK5mWt3PZ4Eq7oZflIY8Pj+R9DVm+gi+xiWMeZDnpjkH0Pp/WkmgbyktZkZcS4ZSMEfMc1SS4lsp3UZaLhWznDA9j/jUPsy15FCcpK+6NNgxjFXNHjxqtmB3mQfqKjmt0/10JLRE4OeqH0P+Pf8wJtOcR6jat/dmQ/qKmEdbstsnvIGtL23R+GJHB+tdDb8QgehP865/wAQySR3du6Ft5ZgwB5bkVPYXF/EZA9q5VjkbieP0pJpVGiFfkubxpM1XW4bHzQyg+y5pyzqeTHOv1T/AOvXTFIylJkxNFRmaHaCTNn02D/GimTcwZdRgi4hHnP6kEL/AIn9Kpyfa70gyudo6DoB9AKnitVTt+JqTz4o+FBc+i81yvXc6E+xWXTo8fNkn1qxHpCyY2qQP7xOB+Zq1Ba3lzgiMQIe7cn/AD+VXHsDbqZDdT78fwtihR7IObuypH4ftyis7PIT1VO341m6xp9vZ3ccVuH2mMM2455yajvtRMN60UimTbjDudx6VC2owTsCxaPjHOSP61nJx2NEnubthMsNinPJJP61t6SBe21yVXdtZMj67q5G3eKRQBeR/jgZ/Cul0K8vtJWdrVIpVkALFlBPHTA6962jK+xnLTc0lsYlfJibIPpVxtLl2h41z+NULnWLzCrdWaxDO/Jh2Hn61ch8SyPEIwwRQMZeJT/LJrZJ3uRzxM6eNxK0bIwIODyKqmJ1Lc/hWlLPHdOZTJECfvM3yD8AQKp3IhG1llkWM8bgyEfyFXLUlFZ4JSrNsLYHOADj9aqgqnWNyfoP8auAoxZUvjs4yTGuCPyzVVrQup8i/RmGfm27R+JrJp9EUrGhaSxxoScLnsf/ANdWBJJKTsVmUcZAGP51j266pHk/bAVJ9eMfgKS5n1RYSVuG3Y6RsaXM0tUx2T6nf2Mcpt0DAA4AwT/+um3ls3lkgZOR39/pXDWd/q+xxJe3WByAkhzVa+1TVRcRpJeXQ4BZfObH86l1ba2NUtLHo8L+WuWyPbI/wqve3KEx4Dda4EXt3uGLuXnkjzGyf16fSo7nU72FcR3Eqtn/AJ6E4/P+tJ1uoculj02Fy0agRyMcdhmoXaQxq4jnAJI4jrirLxBqKRs/2tzgcsQpA/E8fr+FWn8R30KRBmjwOR5kY5J/AE/lR7S4WViHVpDNqDg7sBscrg0ywjQ6igKArk8Fc1QTUXkvMPEj5PPUE/hnir9lexwTpctFG6RklySduPr3NHOmZ21NtraxYMWggz/1yFVrexs5QwMaZzwAlQtrFukHmm0I3n5Vzgn9KfpGuW8V2hZJsAFm2npnjvVqUROOpINPslPMKn/gJp/2GzP/ACzx+OKc+p6fOpkbcFXC8x/r155qiZl3fu3XDHC5StFKHYhwYS2kIn2IzBT38yp4NNcgbbmVf92SqBugLnY88YIIyOn9K1g9t5jCK5ieLIG8OMf+g0LlbFZjv7PusjbfXA+pzUclveojbNRdiB0KD/GtT7M/l5tyZVHdDn+RpkVhcyY8wMuQww6+n0NJ8vQpJ9TmYIrieYKJVVs9SK1Ehv4hgXERHuh/wqDT4A96U2gkZ/hb+lbFtYTyyMpjlAVS3zK2PzNFkgSZQEt+OrwN/wABI/pTDeXidRF/wHNXmVhGX2IFBwSWX/GoDO3IUR8ejD/Gn8wsUbi6kfBaLn2b/E0sV7cpH+6iY/iP8aL2R9wDqc47gU+2YFOVT8TU69xpakZ1S8U/NbP+dOGrTt/y5zH6GrYAXn7vuDx/M1LEGc/K7MBzww/wpa9yij/aki8yWlx9Cf8A69L/AGtADmSGZSPb/wCvWqgymS5H1Of5NV+bTY9sAYS5cdfKP9c1LdupSi2cjd6nbyy7lLAYA5Wtyy8Q6OmjyQTTMJ+Nv7piPzxWVq0S2980ayAjA9P8K29LtLa58P3LMkLyjGNyjP5nFU+axC0k0URrFiRkXK/98N/hT11KyPHnR/jkVNHoUElhLOtoh8vrhFNRW2l2Tqd0CevBA/lS1KsyePULDH/HzCv/AAKplmtJCMXEeD33AVFbaNpsz7JYWI9FV8/nmnv4T06S48uO0uOTgBpcUmxpSLyJbqmI7gk/7MiGsXVYJmZdoZv+BA/yNXJ/BFjG5SQtCe37/J/IrWNq/hqDTDHsluGLZ6gDFJS1Kmpct2a2gxzozBo2A75JH9a25EGz5lrj9J0GS8Y7LyWHHcKD/KtT/hH5YiVGuyEjgqP/ANqmyYt22LshhXO+Jfqyiq7R2chB+zxP/uxhv5ZrOl0DUFOYtRnY++R/WmHStbHB1Jx7ZNUpPsS0+xr/AGOx25NhAR6tEo/nUT6VpzjcLG13eqxKf5Cs8W+uQjnU41H+0wH8xQT4hcAJcLIOzKAAfxIApuXkLUfdabbSyCSS2jZl6Hy1GOMd/pVVtN00Bx9lhbecvtYnJ/AVM58Qg/PDE+O5VD/Wq1xd6sqfv4o0Uf7IH8jSugCe3jnWNRAGEYwrMDkD0yWyaoPpNtIWVhH82Mr5hPT2HNO8y5mXcbTzB67WYGpUvLqJcfZig/3Dj+VLmT3FsV00G0hk8xI5G4wQuVVh6EMc1Tk0u3hlBjhdWU5GHLH8sVqNf7vvx8n1JH6YqBrwsDt2D8Aad49AuzMvbL7fciaYvv3bsjgZ+mKtfv04MwyegEef6809fvZZzj/ZGKmS4SMnYx565brQlG9xXexHGl63JZFX1dMH8s1KzOuVEm5vQR5/9moN1K7bQCo/2JDk1PHOEXGHXHUZJp7bBZdSsom2/PjPsv8A9eirrXKEDn9M0UXfcLROZisHl5uXYY6qe34VpW8VtDjYBn16mqsFy0zsqxfMOzHFTJOxlKL5W8dV3ZIrGKRbuaUcqY4PFVb2dJBtDZx6VTe8d5TFvXeP4c4P5UrRyEfMf0rTcVrHLaqQdTlz7fyFVdowKtaqpGoyE9Tj+VVAeMGuGXxM6VshNtPillhO6NypHcHFNyKMZNIDWtvE2sWmGjv7gY/6aE/oc1ZHi69b/Wx28vu8IB/MYrCphGeatVJrZk8kXujqovF0Q4ks/wAY3/oRV638U6XI6mUzRe7R5x+Rrh8DFJirWJqLqQ6EGelRazp03+rvoHPYM23+eKuJvljLRPGyDnG1MfnjJ/OvKwuOQaekskbZjYofVSQa1WMl9pEfVl0Z6aIrvkRrvXH3Y15/M7jTWuSqlZISh+nmt+bkAflXBQa7q0H+rvZiOmHO7+daUfjPVAAsohkA9VK/yOKtYqD3uhexkux0v2yRgoMbsRxmR9+B/ujAqGVlZ1KxEn1kWOMD8sn9azLfxjaMwF7pe5T18sj8+Mfzq5Hrvh6fgm4tT6EED/2aqVSD6kuM10LpilGDLbIFPBOSo/76JI/Sqs+n280gCQrx18u5WT8gFq5BBotwQ1prVsHPZlVTn6kg/pWmvhzVLpMw3EF0oHAMhcf+PgrV8qltqS5230Mc6dGh3l4UfHHmSBSPoC3X8KH0aWSLcjuQP4wr/wDoRTH61ovouu2hyLW5CjqLRlA/KOs26EiOPtMMyPnrLEA3/fRGf1pOmuxSqra5QXR18/BnhPPzIkqEn9c1orp8iqnm27+VGcqojOP5Uz7VDLD5ctxe4PVd2U/Lf/SljtrBk+URFv725k/Qx4/8eqPZxHzMrTlWhkaU4kx8oUcj86i0+DZaM/7wyHrxWmlqGQpEiSnPyhWVyB/wCT/2WmfZTA2+WExg/wDPUMo/8fQD9aPZK9x87ISqpZ7WzuIyQwxUHmp9mJ3gFDnjnFX1gSY/uwG9osN/6BI38qbNarCmXUx5/wCem9P/AEOMD9aUqY1N9jAu2kefzY2yMc4Hv9K1bZWSMSRkPG5G8baPIRydhDeoRon/APQXz+lSWxhiVkWaMZPKujrz+RH61MYWDmLWwQqxJLwdQuDlOKbLcE27uku+PA2sjfMv1/SooWS2dvKXKtyQjfL+HSmttLsUyoc5IOW/rgVTi+hXMirbzXSSs8c0yfNw6Px+IBrWGuapbB2+0yxqF5YtlfxB5H5npWVHbiCXzFJ2luVztBH5GrQZN++MqrnqNxIx9ARUqLJUkiwPEF19nVROGQtyyoGQ9+wzSnW7o4YJbFWx8rRbs/iPu/lWdIplZcmZZQeXUDH6k0oxEq+dGsYzjzUwCfrxT17gpIfquttJOjPbwIcY+UkD8/8A9VFrrkZQKbRWJPG45z+QNULlYG2nAZRkFoiefwqOySMO0iMWc/KAqhXGe/zHFRzSTHpc6T7fbhXLxgbBklUCqT6Bm4/Wruna3pkUfnTtcRqxKjYFOcf7tc9EFt4h8wjdmyRJKkTY56FB/OkuY45hAu92AGc4Zxk/7QIzVczL0O8j1rShb+RHLOZO5kjbb+Y4q5JrWgSXFtN9tsVjXIZjE2Acdya4AQ/6cJRDJnON/lrjp13ZzUYdxNNCsoDclcSgHI/3cEUnqUpWN3xDLDdaq0tteJJCVG10Iwf0rS0G7h/s6WFZmlc9QJFAH1BI/lXm15KzkbyGaNuOp4/HmtC2MwRJ4Em9GVFRN3vk8/rR7ToRb3nI9RsYpm0q9221sw7lsE/oag06J1ikLeSgC9TFnH5GvPZ1kih3MGMBwS010wKH8P8AGnQ6hdxQqI7/AMuPHyvboz9Ox5NPnGd/BtaVT9puCM4Pkqcfov8AWrPkxnUIz9md/mGPPmyD+Bc/yrgE1XUY7hDFdajvUA7g4VHxzyO35VcTxdq5cst5CJo85V5Q7cewBNS3ctSR6PrFq6XUQiS0g3Doihh+mK534gWUlrc2YeeVi0ZJ+bj9FFczd+ONcvJonuLpbmLOMJbKnP1OD+lZOt+LLjUijS2tgJIjt+QFiR70KSTuE3eNjqfDKwtcZZRKfQhn7j3rtr5WVkEUAXcucFkH8ia8j0bxjPZTBVtIjxwfMKDNdlD49+3WsZmsm3gYzHM7DP8A3zxTck9hU9FZmtcRXBB4A+o3f41Te0DKWfJHuzD9OBWafFcLI4vZJrYj+GJozx+IJpYNc0iZwI4bhu4mkiDg/Rs1SlYppMvQiGIEw7Fz1McYH609mODhgf8AecfyzWZPr+mxvk3JwenyOf5GpBq8RUmOQsuMnJYYHuT0/GtU0zOw+YMc55yOiqf/AIkn9azZfskJ3NCFI/jfr+bc1Mb5Lj5luLUL/wBM5FYn8SMD9aqyhWO9F34/iJVsfkwxSZLQi3MLt+6TPuz4H86Vvn6uPoJP/wBdNi81sn58L1xn+hNWtQAtooyWYbh1ct/XNCIZSK7cgDHqVjJJ/GoJOI5JHUlE6lmx+masxW0txk4jHcb8An8Cv88V0mj6TEum3czBHkCkg5XI6+jD9BSlJIFG+5wAZZXyqAD8zVoW0PsPX90TUZLbwdrD/P1p8hmPRXP/AAE//EmnoSiZI7fOGSPjuVI/pUU5tVOyPyPNb/pocKPU1TeV/M8pGCy4zywAUe/yj8quQqIY8BmYk5Z/M+8fXrUt32LSsC20JRdsgfA5OaKljaZwcIzY9AD/AFoqbDscbDqm3at3GZVXhZE4dR9a2rcxan8tu8d8FGdj/JMv0Pf8PzrlI+SQaahaKXfGzIysNpU4IrnjUcdzRxTOym0658vaUMi/88LtfmH0NJHY3Kx7ome3P/POVhIv4HORVrwvrV3q8c9lqGy4SOPcruPnHtkfz6+9Q6oW0++itEdpIZUBKy/Nj6H/ABrs5U4qaMOd83KzmdQjklupGlVA4ODtJxxVJbQupK1o6gvksWjJHzdO1WNPtIbuJzInzA8MpwRXG4XkzoUtDFNlL2UH6VG0MiHlSPrWuXa3uniB3qvTfyatvGp7daXs7hz2ObKnuP1pMYHGRW9JZwNk7MfSqDQosxUDgetLkHzGfg0YPpWi0SdNoqCSJAMgYpODQKSZAqmnBaRhgcE06MlutSuwMXbTlFOApcVfKTcb5YPUCl8pccZqQDilxV8qFdlR48N7U+OeW3YNFJLGR3RyKmZQaaVGMVHL2KUjTtPGOvWmBDrV2AOiyneP1zW3bfE/xDENs4s7tOhDR7Cf++cVxjICR9alVRVRqVFsyJU6b3id9D8QNKuQRqfhyMMTy0RB/mM/rVmPVvAl6RkXNk565DY/Qt/KvOSg7cfSmlRjNbKvPrqZewh0uj1GHRtD1Bm+yeI4Cp/1aM4Yj67tv8qmHg/Vrf59P1GM+6bo8/8AfGa8oiiV2xjH0p4vLuyl/wBGu7iLB42SEU/rC6xF7CX2ZHo17oevlQt1FHdqfWZWb9fmFZr2V9aAh7C8gA67VO2sC28deJLXgarNIPSbDj9a6rRfG2qXrKtxHaOf7wjKn9CK0hOE9rkTjUhvYzBcWoG2aF2x6HH6Ef1qzBPYhsiXjH3JoiR+aN/SvQVghvrTzJoYzkdCu4frmuf1DStPx/x5xA+qjb/KtnTktmZxrp7oxc2zDKG2V88bbkKf++ZEqV1kePPlSkf7Nukg/ONh/KoJdMgUtsLqAOADWG58uRsAHHcgZrNya3Nk0zdMgiIDXRT/AGZJJocf99Aipwr3DDB+0Z/uPBN/gawor67Rf3dzMnsJDj8icUyTUpycSLbyk95LdCfzxS5ylE6N7eOLma1EfvJYyp+qEioW+yYwslpn0W+KH8nUVzkd5cxSFobiWE+kTlB+lSteXV4/+k3U83+/Kx/maXOOyNl7ZJBkxXBH96Jo5h/461ZkthpkjF1u/m9JLdx/LIqAqq/wKfcipUY+w+gpOz3QlpsOjQRgJCwZV9AwH6ihFlWXf9qnHOcBhj8qQu3rTYbry7gRtDHIG/vFhj8iKjlRSbZcUQGQSESB856tjNQzMwuWkjW1APqMP9c461uQaZa3aBtrRZH/ACzc/wBc1R1SKSxUCO5lZR2dUI/9BolGxSuczdpO8xJZmBPAGDV3TMh1ElvJgggu0mR/3zUY1FzMEe3t3HqY+f0rrbPR7O6+yjY8XmrlvLkYfzJqYUuZ6A5W3OeFwLJHDQQw7wcNAjHn34xTY57mSIZaZweQyMEI/lXR614etbGANHLO27s5U/0rl0neBiigEZ/iFEoNCcrj3CyTAlobhYxnJYtJ69as20s8kDsouJWJAIJELD3DAA0yMqxyI0UnrtGKfJbpcBVfdgf3WI/lU2sSpajJQgeLzWt1f0uMyP1/vE1W1A+ZG4JvG+bgSKAv4HFXwdibQM7eATyayLu6mkuTE0hMW4/JgYps1vdEMBSN0Zmjiwf+Wibv14roYpYpgxRrq5jccBQAmfqMEYrBgCxTZRFHBOPwresria5sN4kMTI2AY1HP1BBFEVYUXckZLhFMhS3tPLXJZiZSR9eD2qHzrSbkTXN53IjAKqT+II/Wpls4ZHW5lQST9fMYAEn8MCqWo6nNb3P2dEj2so5OcjJxxg1T2uO5aUOir+7t7bAxktv3fouP1pBLbSDG57iRT9w5yPcZwMfjSiyjP+uLTgDgTYYD9Kh1G4a1tCYgo2gYGOBzSFcfJ5hLFisUfbgZ/HqPyNZ8rRLcH7zyLxyCTj2J4/Wm2btfxNLM75DY2qxCnHqKlkjRVwqhQOw4qb3E3YjM8mAFkaIEc4wCR+uPwq7DdSEopllmOMrly459+cfjXPyTu05jyRtJwykg1vaeAsaEAZI5Pc0ou7Kehpw3eoIQ32pkAGNiqD+ZOfbpimTeMdbt4pLW2vUljk++uyNgM8c8Eiq+phktInV2Ac4ZeMfyz+tV7knaeSfqc/qapiehDA8rAGYRMevCYxTnvWlm8i0jZn6F1cqoqje3EiskKHarAEkDmtvT7WK1h2xjGep7mhSbdiUupJFaGGPAd9x5clycn1yagEwe4EP74k9CqrgjucmnazcyWtgWiwGZgufQH0o0mJBaibaPMk5Y4Gap72KSW5ejgtowctKSf9lf8KKG7UUWC5//2Q=="

/***/ }),

/***/ "E:\\github\\uniapp_demo\\static\\img\\tiem3.jpg":
/*!**************************************************!*\
  !*** E:/github/uniapp_demo/static/img/tiem3.jpg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ })

}]);