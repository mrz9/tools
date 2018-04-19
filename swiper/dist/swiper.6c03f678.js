// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Swiper = function () {
    function Swiper() {
        var _this = this;

        _classCallCheck(this, Swiper);

        this.swiper = document.querySelector('.zswiper');
        this.wrap = this.swiper.querySelector('.zswiper-wrap');

        this.timeHandle;

        this.time = 3;

        this.index = 0;

        this.width;
        this.length;
        this.update();
        window.addEventListener('resize', this.update);

        this.wrap.addEventListener('transitionend', function () {
            _this.wrap.style.transitionDuration = '0ms';
        });

        this.swiper.addEventListener('touchstart', moveStart);
        this.swiper.addEventListener('mousedown', moveStart);

        this.swiper.addEventListener('mousemove', moveMove);
        this.swiper.addEventListener('touchmove', moveMove);

        this.swiper.addEventListener('mousecancel', mouseEnd);
        this.swiper.addEventListener('touchcancel', mouseEnd);
        this.swiper.addEventListener('mouseup', mouseEnd);
        this.swiper.addEventListener('touchend', mouseEnd);

        var self = this;
        this.pos = {
            sx: 0,
            sy: 0,
            x: 0,
            y: 0,
            last: 0
        };
        function moveStart(e) {
            if (self.timeHandle) {
                clearTimeout(self.timeHandle);
                self.timeHandle = 0;
            }
            self.pos.x = self.pos.sx = e.pageX;
            self.pos.y = self.pos.sy = e.pageY;
            self.pos.last = self.index * self.width;
        }

        function moveMove(e) {
            if (self.pos.last == 0) return;
            var mx = self.pos.x - e.pageX;
            self.pos.last += mx;
            self.transform(Math.abs(self.pos.last));
            self.pos.x = e.pageX;
            self.pos.y = e.pageY;

            var ex = self.pos.sx - e.pageX;
            if (Math.abs(ex) >= self.width / 3) {
                var te = document.createEvent("MouseEvents");
                te.initEvent("mouseup", true, true); //这里的click可以换成你想触发的行为
                self.swiper.dispatchEvent(te);
            }
        }

        function mouseEnd(e) {
            var mx = self.pos.sx - e.pageX;
            if (Math.abs(mx) >= self.width / 3) {
                console.log('end', mx);
                if (mx > 0) {
                    self.move(self.index + 1);
                } else {
                    self.move(self.index - 1);
                }
            } else {
                self.move(self.index);
            }

            self.pos = {
                x: 0,
                y: 0,
                sy: 0,
                sx: 0,
                last: 0
            };
        }
    }

    _createClass(Swiper, [{
        key: 'move',
        value: function move(step) {
            var _this2 = this;

            if (this.timeHandle) {
                clearTimeout(this.timeHandle);
                this.timeHandle = 0;
            }
            if ((typeof step === 'undefined' ? 'undefined' : _typeof(step)) !== undefined && !isNaN(step)) {
                step = step > this.length - 1 ? 0 : step;
                this.transform(this.width * step);
                this.wrap.style.transitionDuration = '300ms';
                this.index = step;
                this.timeHandle = setTimeout(function () {
                    return _this2.move(_this2.index + 1);
                }, this.time * 1000);
            }
        }
    }, {
        key: 'transform',
        value: function transform(px) {
            console.log('transform', px);
            this.wrap.style.transform = "translate3d(-" + px + "px, 0px, 0px)";
        }
    }, {
        key: 'update',
        value: function update() {
            var _this3 = this;

            console.log('update');
            if (this.timeHandle) {
                clearTimeout(this.timeHandle);
                this.timeHandle = 0;
            }

            this.items = this.wrap.querySelectorAll('.zswiper-item');
            this.width = this.swiper.getBoundingClientRect().width;
            this.length = this.items.length;
            console.log(this.items);
            this.items.forEach(function (item) {
                console.log(item);
                item.style.width = _this3.width + 'px';
            });

            this.wrap.style.width = this.width * this.length + 'px';

            this.move(this.index);
        }
    }]);

    return Swiper;
}();

var store = Object.create(null);
var ic = {
    touch: function touch() {
        return !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
    }

};

var getTranslate = function getTranslate(el) {
    var curStyle = window.getComputedStyle(el);
    var curTransform = curStyle.transform || curStyle.webkitTransform;
    var x, y;x = y = 0;
    curTransform = curTransform.split(', ');
    if (curTransform.length === 6) {
        x = parseInt(curTransform[4], 10);
        y = parseInt(curTransform[5], 10);
    }
    return { 'x': x, 'y': y };
};

var translate = function translate(ele, x, y, z) {
    if (ic.support.transforms3d) {
        transform(ele, 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
    } else {
        transform(ele, 'translate(' + x + 'px, ' + y + 'px)');
    }
};

var touchStart = function touchStart(e) {
    //mouse事件会提供which值， e.which为3时表示按下鼠标右键，鼠标右键会触发mouseup，但右键不允许移动滑块
    if (!ic.support.touch && 'which' in e && e.which === 3) return;
    //获取起始坐标。TouchEvent使用e.targetTouches[0].pageX，MouseEvent使用e.pageX。
    state.startX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    state.startY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

    state.target = e.target;
    //时间戳
    state.startTime = e.timeStamp;
    //state的touchStart 、touchMove、touchEnd代表是否进入该函数
    state.touchEnd = state.touchMove = false;
    state.touchStart = true;
    //表示滑块移动的距离
    state.diffX = state.diffY = 0;
};

var touchMove = function touchMove(e) {
    // 1. 如果当前触发touchMove的元素和触发touchStart的元素不一致，不允许滑动。
    // 2. 执行touchMove时，需保证touchStart已执行，且touchEnd未执行。
    if (e.target !== state.target || state.touchEnd || !state.touchStart) return;
    state.touchMove = true;

    //取得当前坐标
    var currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    var currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    //如果轮播进行中，将定时器清除
    if (currStore.autoPlayID !== null) {
        clearTimeout(currStore.autoPlayID);
        currStore.autoPlayID = null;
    }
    //判断移动方向是水平还是垂直
    if (currStore.direction === 'x') {
        //currStore.touchRatio是移动系数
        state.diffX = Math.round((currentX - state.startX) * currStore.touchRatio);
        //移动元素
        translate(currStore.container, state.animatingX + state.diffX + state.currStore.translateX, 0, 0);
    } else {
        state.diffY = Math.round((currentY - state.startY) * state.currStore.touchRatio);
        translate(currStore.container, 0, state.animatingY + state.diffY + state.currStore.translateY, 0);
    }
};

var touchEnd = function touchEnd(e) {
    state.touchEnd = true;
    if (!state.touchStart) return;
    var fastClick;
    var currStore = state.currStore;
    //如果整个触摸过程时间小于fastClickTime，会认为此次操作是点击。但默认是屏蔽了容器的click事件的，所以提供一个clickCallback参数，会在点击操作时调用。
    if (fastClick = e.timeStamp - state.startTime < currStore.fastClickTime && !state.touchMove && typeof currStore.clickCallback === 'function') {
        currStore.clickCallback();
    }
    if (!state.touchMove) return;
    //如果移动距离没达到切换页的临界值，则让它恢复到最近的一次稳定状态
    if (fastClick || Math.abs(state.diffX) < currStore.limitDisX && Math.abs(state.diffY) < currStore.limitDisY) {
        //在transitionend事件绑定的函数中判定是否重启轮播，但是如果transform前后两次的值一样时，不会触发transitionend事件，所以在这里判定是否重启轮播
        if (state.diffX === 0 && state.diffY === 0 && currStore.autoPlay) autoPlay(currStore);
        //恢复到最近的一次稳定状态
        recover(currStore, currStore.translateX, currStore.translateY, 0);
    } else {
        //位移满足切换
        if (state.diffX > 0 || state.diffY > 0) {
            //切换到上一个滑块
            moveTo(currStore, currStore.index - 1);
        } else {
            //切换到下一个滑块
            moveTo(currStore, currStore.index + 1);
        }
    }
};

var transitionDurationEndFn = function transitionDurationEndFn() {
    //将动画状态设置为false
    ic.store.animating = false;
    //执行自定义的iceEndCallBack函数
    if (typeof ic.store.iceEndCallBack === 'function') ic.store.iceEndCallBack();
    //将动画时间归零
    transitionDuration(container, 0);
    //清空state
    if (ic.store.id === state.id) state = Object.create(null);
    //检测是否开启轮播
    if (ic.store.autoPlay) autoPlay(ic.store);
};

var autoPlay = function autoPlay(store) {
    store.autoPlayID = setTimeout(function () {
        //当前滑块的索引
        var index = store.index;
        ++index;
        //到最后一个了，重置为0
        if (index === store.childLength) {
            index = 0;
        }
        //移动
        moveTo(store, index);
    }, store.autoplayDelay);
};
var zswiper = new Swiper();
},{}],12:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55735' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[12,4])
//# sourceMappingURL=/swiper.6c03f678.map