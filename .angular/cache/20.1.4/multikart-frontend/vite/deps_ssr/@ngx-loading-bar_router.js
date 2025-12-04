import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  LoadingBarModule,
  LoadingBarService
} from "./chunk-ITBZHXHM.js";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule
} from "./chunk-ARXO47RX.js";
import "./chunk-23BPAI44.js";
import "./chunk-EDBC5UVJ.js";
import "./chunk-7TEFVG75.js";
import "./chunk-PN74ESDT.js";
import "./chunk-6K7GMTFC.js";
import {
  APP_INITIALIZER,
  NgModule,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-FZUTJXMD.js";
import "./chunk-AIVA4SAL.js";
import "./chunk-QFGGP64A.js";
import "./chunk-3LZRLABZ.js";
import "./chunk-YHCV7DAQ.js";

// node_modules/@ngx-loading-bar/router/fesm2022/ngx-loading-bar-router.mjs
function getCurrentNavigationState(router) {
  const currentNavigation = router.getCurrentNavigation && router.getCurrentNavigation();
  if (currentNavigation && currentNavigation.extras) {
    return currentNavigation.extras.state;
  }
  return {};
}
function registerRouterListener(router, loader) {
  return () => {
    const ref = loader.useRef("router");
    router.events.subscribe((event) => {
      const navState = getCurrentNavigationState(router);
      if (navState && navState.ignoreLoadingBar) {
        return;
      }
      if (event instanceof NavigationStart) {
        ref.start();
      }
      if (event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel) {
        ref.complete();
      }
    });
  };
}
function provideLoadingBarRouter() {
  return {
    provide: APP_INITIALIZER,
    useFactory: registerRouterListener,
    deps: [Router, LoadingBarService],
    multi: true
  };
}
var _LoadingBarRouterModule = class _LoadingBarRouterModule {
  constructor(router, loader) {
    registerRouterListener(router, loader)();
  }
};
_LoadingBarRouterModule.ɵfac = function LoadingBarRouterModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoadingBarRouterModule)(ɵɵinject(Router), ɵɵinject(LoadingBarService));
};
_LoadingBarRouterModule.ɵmod = ɵɵdefineNgModule({
  type: _LoadingBarRouterModule,
  imports: [RouterModule, LoadingBarModule],
  exports: [RouterModule, LoadingBarModule]
});
_LoadingBarRouterModule.ɵinj = ɵɵdefineInjector({
  imports: [RouterModule, LoadingBarModule, RouterModule, LoadingBarModule]
});
var LoadingBarRouterModule = _LoadingBarRouterModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingBarRouterModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule, LoadingBarModule],
      exports: [RouterModule, LoadingBarModule]
    }]
  }], function() {
    return [{
      type: Router
    }, {
      type: LoadingBarService
    }];
  }, null);
})();
export {
  LoadingBarRouterModule,
  provideLoadingBarRouter
};
//# sourceMappingURL=@ngx-loading-bar_router.js.map
