

var _RecommendationRequestUtils = require("main/utils/RecommendationRequestUtils");

var _jestMockConsole = _interopRequireDefault(require("jest-mock-console"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mockToast = jest.fn();
jest.mock('react-toastify', function () {
  var originalModule = jest.requireActual('react-toastify');
  return _objectSpread({
    __esModule: true
  }, originalModule, {
    toast: function toast(x) {
      return mockToast(x);
    }
  });
});
describe("RecommendationRequestUtils", function () {
  describe("onDeleteSuccess", function () {
    test("It puts the message on console.log and in a toast", function () {
      // arrange
      var restoreConsole = (0, _jestMockConsole["default"])(); // act

      (0, _RecommendationRequestUtils.onDeleteSuccess)("abc"); // assert

      expect(mockToast).toHaveBeenCalledWith("abc");
      expect(console.log).toHaveBeenCalled();
      var message = console.log.mock.calls[0][0];
      expect(message).toMatch("abc");
      restoreConsole();
    });
  });
  describe("cellToAxiosParamsDelete", function () {
    test("It returns the correct params", function () {
      // arrange
      var cell = {
        row: {
          values: {
            id: 17
          }
        }
      }; // act

      var result = (0, _RecommendationRequestUtils.cellToAxiosParamsDelete)(cell); // assert

      expect(result).toEqual({
        url: "/api/recommendationrequest",
        method: "DELETE",
        params: {
          id: 17
        }
      });
    });
  });
});