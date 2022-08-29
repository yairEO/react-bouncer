/**
  * @yaireo/react-bouncer - Wrap components with a debounce, throttle, or any other delayed-rendering method, to stop them from re-rendering often when their props change
  *
  * @version v1.0.2
  * @homepage https://github.com/yairEO/react-bouncer
  * @author Yair Even-Or <vsync.design@gmail.com>
  */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bouncer = function (Comp) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  let method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _lodash.default;
  return props => {
    // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
    const [dep, forceUpdate] = (0, _react.useReducer)(x => ++x, 0);
    const updater = (0, _react.useCallback)(method(forceUpdate, duration), []); // call the delayed function when props change (or was re-rendered without any props)

    (0, _react.useEffect)(updater, [props]);
    return (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, { ...props
    }), [dep]);
  };
};

var _default = bouncer;
exports.default = _default;

//# sourceMappingURL=react-bouncer.js.map