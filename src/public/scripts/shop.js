"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var displayImage = function displayImage(ev) {
  var image = $(".imageUploader__dist");
  image.attr("src", URL.createObjectURL(ev.target.files[0]));
};

$(".imageUploader__src").on("change", displayImage);
document.querySelector(".dropdown-toggle").addEventListener("click", function (ev) {
  $(ev.target).find("~ .dropdown-menu").removeClass("disable");
});
document.querySelector(".dropdown-menu").addEventListener("animationend", function (ev) {
  var dropdown = $(ev.target);
  if (!dropdown.hasClass("show")) dropdown.addClass("disable"); //else dropdown.addClass("disable");
}); //simple delete modal script

$("#simpleDeleteModal").on("show.bs.modal", function (ev) {
  var button = $(ev.relatedTarget),
      id = button.data("id"),
      modal = $("#simpleDeleteModal");
  modal.find(".modal-footer form").attr("action", "/admin/delete-product/".concat(id));
});

var _loader = new WeakMap();

var _init = new WeakMap();

var Loader = function Loader(loaderSelector) {
  var _this = this;

  _classCallCheck(this, Loader);

  _loader.set(this, {
    writable: true,
    value: void 0
  });

  _init.set(this, {
    writable: true,
    value: function value() {
      document.addEventListener("DOMContentLoaded", _this.enableLoading);
    }
  });

  _defineProperty(this, "disableLoading", function () {
    return _classPrivateFieldGet(_this, _loader).classList.remove("loader--loading");
  });

  _defineProperty(this, "enableLoading", function () {
    return _classPrivateFieldGet(_this, _loader).classList.add("loader--loading");
  });

  _classPrivateFieldSet(this, _loader, document.querySelector(loaderSelector));

  _classPrivateFieldGet(this, _init).call(this);
};

var _settings = new WeakMap();

var _endpoints = new WeakMap();

var _selectors = new WeakMap();

var _init2 = new WeakMap();

var _calcOffset = new WeakMap();

var _createUrlWithQuery = new WeakMap();

var _fetchData = new WeakMap();

var _checkIfContainerEmpty = new WeakMap();

var ProductsCards = /*#__PURE__*/function (_Loader) {
  _inherits(ProductsCards, _Loader);

  var _super = _createSuper(ProductsCards);

  _createClass(ProductsCards, [{
    key: "setPage",
    value: function setPage(page) {
      if (typeof page === "number") _classPrivateFieldGet(this, _settings).page = page;else throw new Error("Invalid property type!");
    }
  }, {
    key: "setSelector",
    value: function setSelector(key, val) {
      if (_classPrivateFieldGet(this, _selectors)[key]) _classPrivateFieldGet(this, _selectors)[key] = val;
    }
  }]);

  function ProductsCards(selectors, settings) {
    var _this2;

    _classCallCheck(this, ProductsCards);

    _this2 = _super.call(this, selectors.loader);

    _settings.set(_assertThisInitialized(_this2), {
      writable: true,
      value: {
        page: 1,
        pageSize: 10
      }
    });

    _endpoints.set(_assertThisInitialized(_this2), {
      writable: true,
      value: {
        products: "/api/products",
        currency: "/api/settings/currency"
      }
    });

    _selectors.set(_assertThisInitialized(_this2), {
      writable: true,
      value: {
        content: "",
        loader: ""
      }
    });

    _init2.set(_assertThisInitialized(_this2), {
      writable: true,
      value: function value() {
        document.addEventListener("DOMContentLoaded", _this2.create);
      }
    });

    _calcOffset.set(_assertThisInitialized(_this2), {
      writable: true,
      value: function value() {
        var _classPrivateFieldGet2 = _classPrivateFieldGet(_assertThisInitialized(_this2), _settings),
            page = _classPrivateFieldGet2.page,
            pageSize = _classPrivateFieldGet2.pageSize;

        return (page - 1) * pageSize;
      }
    });

    _createUrlWithQuery.set(_assertThisInitialized(_this2), {
      writable: true,
      value: function value(url) {
        return url + "?" + new URLSearchParams({
          offset: _classPrivateFieldGet(_assertThisInitialized(_this2), _calcOffset).call(_assertThisInitialized(_this2)),
          amount: _classPrivateFieldGet(_assertThisInitialized(_this2), _settings).pageSize
        });
      }
    });

    _fetchData.set(_assertThisInitialized(_this2), {
      writable: true,
      value: function value() {
        var _classPrivateFieldGet3 = _classPrivateFieldGet(_assertThisInitialized(_this2), _endpoints),
            currency = _classPrivateFieldGet3.currency,
            products = _classPrivateFieldGet3.products,
            data = {};

        return fetch(_classPrivateFieldGet(_assertThisInitialized(_this2), _createUrlWithQuery).call(_assertThisInitialized(_this2), products)).then(function (res) {
          return res.json();
        }).then(function (res) {
          return data.products = res;
        }).then(function () {
          return fetch(currency);
        }).then(function (res) {
          return res.json();
        }).then(function (res) {
          return data.currency = res.currency;
        }).then(function () {
          return data;
        });
      }
    });

    _checkIfContainerEmpty.set(_assertThisInitialized(_this2), {
      writable: true,
      value: function value() {
        return $(_classPrivateFieldGet(_assertThisInitialized(_this2), _selectors).content).children().length === 0;
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "create", function () {
      if (!_classPrivateFieldGet(_assertThisInitialized(_this2), _checkIfContainerEmpty).call(_assertThisInitialized(_this2))) return;

      _this2.enableLoading();

      _classPrivateFieldGet(_assertThisInitialized(_this2), _fetchData).call(_assertThisInitialized(_this2)).then(function (_ref) {
        var products = _ref.products,
            currency = _ref.currency;
        var target = document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_this2), _selectors).content);

        _this2.disableLoading();

        products.forEach(function (product) {
          target.insertAdjacentHTML("beforeend", productCard(product, currency, "col-12 col-sm-6 col-md-4 col-lg-3"));
        });
      });
    });

    if (!endpoint || !selectors) console.log("Constructor properties undefinded!");

    for (var key in settings) {
      _classPrivateFieldGet(_assertThisInitialized(_this2), _settings)[key] = settings[key];
    }

    for (var _key in selectors) {
      _classPrivateFieldGet(_assertThisInitialized(_this2), _selectors)[_key] = selectors[_key];
    }

    _classPrivateFieldGet(_assertThisInitialized(_this2), _init2).call(_assertThisInitialized(_this2));

    return _this2;
  }

  return ProductsCards;
}(Loader);

var productCard = function productCard(product, currency, sizing) {
  return "\n<div class=\"mb-3 ".concat(sizing, "\">\n    <div class=\"card shadow rounded-lg\">\n        <div class=\"card-img-top\">\n            <div class=\"embed-responsive embed-responsive-16by9\">\n                <img src=\"http://unsplash.it/g/1500?random&gravity=center\" alt=\"alt\" class=\"embed-responsive-item\"/>\n            </div>\n        </div>\n        <div class=\"card-body px-4 d-flex\">\n            <div class=\"p-1 mr-auto\">\n                <h5 class=\"font-weight-bold\">\n                    ").concat(product.title, "\n                </h5>\n                <p class=\"card-text\">\n                    ").concat(product.desc, "\n                </p>\n            </div>\n            <div class=\"d-flex flex-column justify-content-center\">\n                <a class=\"h5\">\n                    <i class=\"fas fa-shopping-basket\"></i>\n                </a>\n                <a class=\"h5 text-primary\">\n                    <i class=\"fas fa-location-arrow rotate-45\"></i>\n                </a>\n            </div>\n            <div class=\"card-label\">\n                <h6 class=\"m-0\">\n                    ").concat(product.price, " ").concat(currency, "\n                </h6>\n            </div>\n        </div>\n    </div>\n</div>\n    ");
}; //const urlBase = "http://localhost:8000";


var shopTabsSelector = "#shopProductsList",
    mainPageLastProdsSelector = "#productsList",
    mainPageLastProds = $(mainPageLastProdsSelector),
    shopTabs = $(shopTabsSelector),
    endpoint = "/api/products";

if (mainPageLastProds.length) {
  var mainPageLastProducts = new ProductsCards({
    loader: "".concat(mainPageLastProdsSelector),
    content: "".concat(mainPageLastProdsSelector, " #tab_1 .row")
  });
}

if (shopTabs.length) {
  var productsPerPage = shopTabs.find("#tabs").data("productsperpage");
  var shopProducts = new ProductsCards({
    loader: "".concat(shopTabsSelector),
    content: "".concat(shopTabsSelector, " #tab_1 .row")
  }, {
    pageSize: productsPerPage
  });
  $("".concat(shopTabsSelector, " a[data-toggle='pill']")).on("show.bs.tab", function (ev) {
    var paginationLink = ev.target;
    var contentSelector = $(paginationLink).attr("href");
    var page = Number(contentSelector.slice(-1));
    shopProducts.setPage(page);
    shopProducts.setSelector("content", "".concat(shopTabsSelector, " ").concat(contentSelector, " .row"));
    shopProducts.create();
  });
}