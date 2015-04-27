/*global __non_webpack_require__:true, module:true */
import 'babel/polyfill';
import fluxtable from './fluxtable/index.jsx';

/*eslint-disable camelcase */
window.require = function(parentRequire) {
    return function(module) {
        switch(module) {
        case "fluxtable": return fluxtable;
        }
        return parentRequire(module);
    };
}(typeof __non_webpack_require__ === "function" ? __non_webpack_require__ : function() {
    throw new Error("Module '" + module + "' not found");
});
/*eslint-enable camelcase */
