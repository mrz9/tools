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
})({2:[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var state = Object.create(null);
var isInit = false;

var ZSwiper = function () {
    function ZSwiper(opt) {
        var _this = this;

        _classCallCheck(this, ZSwiper);

        if (!(this instanceof ZSwiper)) return new ZSwiper(opt);

        var self = this;
        this.support = {
            touch: function () {
                return !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
            }(),
            transforms3d: function () {
                var div = document.createElement('div').style;
                return 'webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div;
            }(),
            transition: function () {
                var div = document.createElement('div').style;
                return 'webkitTransition' in div || 'MozTransition' in div || 'OTransition' in div || 'MsTransition' in div || 'transition' in div;
            }()
        };

        if (!this.support.transition) return;

        this.container = document.querySelector(opt.el);
        if (!this.container) throw new Error('没有找到容器');
        this.wrap = this.container.querySelector(".zswiper-wrap");
        if (!this.wrap) throw new Error('没有找到.zswiper-wrap');
        var childLength = this.wrap.children.length;
        this.store = {
            childLength: childLength,
            index: 0,
            translateX: 0,
            translateY: 0,
            direction: opt.direction === 'y' ? 'y' : 'x',
            animationDuration: 300,
            fastClickTime: 300,
            autoPlayID: null,
            autoPlay: true,
            autoplayDelay: 3000,
            animating: false
        };

        var touchStart = function touchStart(e) {
            if (!self.support.touch && 'which' in e && e.which === 3) return;
            state.startX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            state.startY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            state.startTime = e.timeStamp;
            state.currentTarget = e.currentTarget;
            state.target = e.target;
            state.currStore = self.store;
            state.touchEnd = state.touchMove = false;
            state.touchStart = true;
            state.diffX = state.diffY = 0;
            state.animatingX = state.animatingY = 0;
        };

        var touchMove = function touchMove(e) {
            if (e.target !== state.target || state.touchEnd || !state.touchStart) return;
            state.touchMove = true;
            var currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            var currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            var currStore = state.currStore;
            if (currStore.animating) {
                var animationTranslate = self.getTranslate(self.wrap);
                state.animatingX = animationTranslate.x - currStore.translateX;
                state.animatingY = animationTranslate.y - currStore.translateY;
                currStore.animating = false;
                self.removeTransitionDuration(self.wrap);
            }
            if (currStore.autoPlayID !== null) {
                clearTimeout(currStore.autoPlayID);
                currStore.autoPlayID = null;
            }
            if (currStore.direction === 'x') {
                state.diffX = Math.round(currentX - state.startX);
                self.translate(self.wrap, state.animatingX + state.diffX + state.currStore.translateX, 0, 0);
            } else {
                state.diffY = Math.round(currentY - state.startY);
                self.translate(self.wrap, 0, state.animatingY + state.diffY + state.currStore.translateY, 0);
            }
        };

        var touchEnd = function touchEnd(e) {
            state.touchEnd = true;
            if (!state.touchStart) return;
            var fastClick;
            var currStore = state.currStore;
            fastClick = e.timeStamp - state.startTime < currStore.fastClickTime;
            if (!state.touchMove) return;
            if (fastClick || Math.abs(state.diffX) < currStore.limitDisX && Math.abs(state.diffY) < currStore.limitDisY) {
                if (state.diffX === 0 && state.diffY === 0 && currStore.autoPlay) self.autoPlay(currStore);
                self.recover(currStore, currStore.translateX, currStore.translateY, 0);
            } else {
                if (state.diffX > 0 || state.diffY > 0) {
                    self.moveTo(currStore, currStore.index - 1);
                } else {
                    self.moveTo(currStore, currStore.index + 1);
                }
            }
        };

        var transitionDurationEndFn = function transitionDurationEndFn() {
            self.store.animating = false;
            self.transitionDuration(self.wrap, 0);
            state = Object.create(null);
            if (self.store.autoPlay) self.autoPlay(self.store);
        };

        var initEvent = function initEvent() {
            _this.update();
            window.addEventListener('resize', function () {
                _this.update();
            }, false);
            var events = _this.support.touch ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
            var transitionEndEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
            for (var i = 0; i < transitionEndEvents.length; i++) {
                _this.addEvent(_this.wrap, transitionEndEvents[i], transitionDurationEndFn, false);
            }

            _this.addEvent(_this.container, events[0], touchStart, false);
            if (!isInit) {
                _this.addEvent(document, events[1], touchMove, false);
                _this.addEvent(document, events[2], touchEnd, false);
                isInit = true;
            }
        };

        initEvent();
        if (this.store.autoPlay) this.autoPlay(this.store);
    }

    _createClass(ZSwiper, [{
        key: 'update',
        value: function update() {
            console.log('update');
            var rect = this.container.getBoundingClientRect();
            this.wrap.style.width = this.store.childLength * rect.width + 'px';
            for (var i = 0; i < this.store.childLength; i++) {
                this.wrap.children[i].style.width = rect.width + 'px';
            }

            this.store.width = rect.width;
            this.store.height = rect.height;
            this.store.limitDisX = 0.3 * rect.width;
            this.store.limitDisY = 0.3 * rect.height;
        }
    }, {
        key: 'addEvent',
        value: function addEvent(target, type, fn) {
            var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            target.addEventListener(type, fn, capture);
        }
    }, {
        key: 'moveToIndex',
        value: function moveToIndex(index) {
            var currStore = this.store;
            if (currStore.index === index) return;
            if (currStore.autoPlayID) {
                clearTimeout(currStore.autoPlayID);
                currStore.autoPlayID = null;
            }
            this.moveTo(currStore, index);
        }
    }, {
        key: 'getIndex',
        value: function getIndex() {
            return this.store.index;
        }
    }, {
        key: 'moveTo',
        value: function moveTo(store, index) {
            var currStore = store;
            if (index < currStore.childLength && index > -1) {
                this.setIndex(currStore, index);
                if (currStore.direction === 'x') {
                    this.recover(currStore, -index * currStore.width, 0, 0);
                    currStore.translateX = -index * currStore.width;
                } else {
                    this.recover(currStore, 0, -index * currStore.height, 0);
                    currStore.translateY = -index * currStore.height;
                }
            } else {
                this.recover(currStore, currStore.translateX, currStore.translateY, 0);
            }
        }
    }, {
        key: 'setIndex',
        value: function setIndex(store, index) {
            store.index = index;
        }
    }, {
        key: 'recover',
        value: function recover(store, x, y, z) {
            store.animating = true;
            this.transitionDuration(this.wrap, store.animationDuration);
            this.translate(this.wrap, x, y, z);
        }
    }, {
        key: 'translate',
        value: function translate(ele, x, y, z) {
            if (this.support.transforms3d) {
                this.transform(ele, 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
            } else {
                this.transform(ele, 'translate(' + x + 'px, ' + y + 'px)');
            }
        }
    }, {
        key: 'transform',
        value: function transform(ele, _transform) {
            var elStyle = ele.style;
            elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = _transform;
        }
    }, {
        key: 'transitionDuration',
        value: function transitionDuration(ele, time) {
            var elStyle = ele.style;
            elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = time + 'ms';
        }
    }, {
        key: 'removeTransitionDuration',
        value: function removeTransitionDuration(ele) {
            var elStyle = ele.style;
            elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = '';
        }
    }, {
        key: 'getTranslate',
        value: function getTranslate(el) {
            var curStyle = window.getComputedStyle(el);
            var curTransform = curStyle.transform || curStyle.webkitTransform;
            var x = void 0,
                y = void 0;x = y = 0;
            curTransform = curTransform.split(', ');
            if (curTransform.length === 6) {
                x = parseInt(curTransform[4], 10);
                y = parseInt(curTransform[5], 10);
            }
            return { 'x': x, 'y': y };
        }
    }, {
        key: 'autoPlay',
        value: function autoPlay(store) {
            var _this2 = this;

            store.autoPlayID = setTimeout(function () {
                var index = store.index;
                ++index;
                if (index === store.childLength) {
                    index = 0;
                }
                _this2.moveTo(store, index);
            }, store.autoplayDelay);
        }
    }]);

    return ZSwiper;
}();

// window.zswiper = new ZSwiper({el:'.zswiper'});
// console.log(zswiper);
},{}],9:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '54656' + '/');
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
},{}]},{},[9,2])
//# sourceMappingURL=/main.a25e72f7.map