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

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dropdown = function Dropdown(root) {
  var _this = this;

  _classCallCheck(this, Dropdown);

  _defineProperty(this, "root", void 0);

  _defineProperty(this, "slideDown", function () {
    $(_this.root).find(".dropdown-menu").slideDown();
  });

  _defineProperty(this, "slideUp", function () {
    $(_this.root).find(".dropdown-menu").slideUp();
  });

  _defineProperty(this, "fadeSlideUp", function () {
    $(_this.root).find(".dropdown-menu").css({
      display: "block"
    }).css({
      opacity: 0,
      top: "150%"
    }).animate({
      top: "100%",
      opacity: 1
    });
  });

  _defineProperty(this, "fadeSlideDown", function () {
    $(_this.root).find(".dropdown-menu").css("display", "block").animate({
      top: "150%",
      opacity: 0
    }, "", function (ev) {
      $(this).css("display", "none");
    });
  });

  _defineProperty(this, "getAnimationFuncs", function (animation) {
    var show, hide;

    switch (animation) {
      case "slide":
        {
          show = _this.slideDown;
          hide = _this.slideUp;
          break;
        }

      case "fadeSlide":
      default:
        {
          show = _this.fadeSlideUp;
          hide = _this.fadeSlideDown;
          break;
        }
    }

    return [show, hide];
  });

  _defineProperty(this, "setAnimation", function (animation) {
    var _this$getAnimationFun = _this.getAnimationFuncs(animation),
        _this$getAnimationFun2 = _slicedToArray(_this$getAnimationFun, 2),
        showAnim = _this$getAnimationFun2[0],
        hideAnim = _this$getAnimationFun2[1];

    $(_this.root).on("show.bs.dropdown", showAnim);
    $(_this.root).on("hide.bs.dropdown", hideAnim);
  });

  this.root = root;
};

var adminPanelMenuDropdown = new Dropdown("#adminPanelMenu .dropdown");
var shopHeaderDropdown = new Dropdown("#shopHeader .dropdown");
adminPanelMenuDropdown.setAnimation("slide");
shopHeaderDropdown.setAnimation("fadeSlide");
/*const selector = { slide: ".dropdown-slide", expand: ".dropdown-expand" };

if ($(selector.slide).length) {
  $(rootSelector)
    .find(".dropdown-menu")
    .on("animationend", (ev) => {
      const dropdown = $(ev.target);
      dropdown.removeClass("dropdown-opened");
    });

  $(rootSelector).on("hide.bs.dropdown", (ev) => {
    const dropdown = $(ev.target);
    dropdown.find(".dropdown-menu").addClass("dropdown-opened");
  });
}*/

var displayImage = function displayImage(ev) {
  var image = $(".imageUploader__dist");
  image.attr("src", URL.createObjectURL(ev.target.files[0]));
};

$(".imageUploader__src").on("change", displayImage); //simple delete modal script

$("#simpleDeleteModal").on("show.bs.modal", function (ev) {
  var button = $(ev.relatedTarget),
      id = button.data("id"),
      modal = $("#simpleDeleteModal");
  modal.find(".modal-footer form").attr("action", "/admin/delete-product/".concat(id));
});

var productCard = function productCard(product, currency, sizing) {
  return "\n<div class=\"mb-3 ".concat(sizing, "\">\n    <div class=\"card shadow rounded-lg\">\n        <div class=\"card-img-top\">\n            <div class=\"image--square\">\n                <img src=\"").concat(product.img, "\" alt=\"alt\"/>\n            </div>\n        </div>\n        <div class=\"card-body px-4 d-flex\">\n            <div class=\"p-1 mr-auto\">\n                <h5 class=\"font-weight-bold\">\n                    ").concat(product.title, "\n                </h5>\n                <p class=\"card-text\">\n                    ").concat(product.desc.length > 60 ? "".concat(product.desc.slice(0, 59), " ...") : product.desc, "\n                </p>\n            </div>\n            <div class=\"d-flex flex-column justify-content-center\">\n                <a class=\"h5\">\n                    <i class=\"fas fa-shopping-basket\"></i>\n                </a>\n                <a href=\"/product/").concat(product._id, "\" class=\"h5 text-primary\">\n                    <i class=\"fas fa-location-arrow rotate-45\"></i>\n                </a>\n            </div>\n            <div class=\"card-label\">\n                <h6 class=\"m-0\">\n                    ").concat(product.price, " ").concat(currency, "\n                </h6>\n            </div>\n        </div>\n    </div>\n</div>\n    ");
};

var _loader = new WeakMap();

var _init = new WeakMap();

var Loader = function Loader(loaderSelector) {
  var _this2 = this;

  _classCallCheck(this, Loader);

  _loader.set(this, {
    writable: true,
    value: void 0
  });

  _init.set(this, {
    writable: true,
    value: function value() {
      document.addEventListener("DOMContentLoaded", _this2.enableLoading);
    }
  });

  _defineProperty(this, "disableLoading", function () {
    return _classPrivateFieldGet(_this2, _loader).classList.remove("loader--loading");
  });

  _defineProperty(this, "enableLoading", function () {
    return _classPrivateFieldGet(_this2, _loader).classList.add("loader--loading");
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
    var _this3;

    _classCallCheck(this, ProductsCards);

    _this3 = _super.call(this, selectors.loader);

    _settings.set(_assertThisInitialized(_this3), {
      writable: true,
      value: {
        page: 1,
        pageSize: 10
      }
    });

    _endpoints.set(_assertThisInitialized(_this3), {
      writable: true,
      value: {
        products: "/api/products",
        currency: "/api/settings/currency"
      }
    });

    _selectors.set(_assertThisInitialized(_this3), {
      writable: true,
      value: {
        content: "",
        loader: ""
      }
    });

    _init2.set(_assertThisInitialized(_this3), {
      writable: true,
      value: function value() {
        document.addEventListener("DOMContentLoaded", _this3.create);
      }
    });

    _calcOffset.set(_assertThisInitialized(_this3), {
      writable: true,
      value: function value() {
        var _classPrivateFieldGet2 = _classPrivateFieldGet(_assertThisInitialized(_this3), _settings),
            page = _classPrivateFieldGet2.page,
            pageSize = _classPrivateFieldGet2.pageSize;

        return (page - 1) * pageSize;
      }
    });

    _createUrlWithQuery.set(_assertThisInitialized(_this3), {
      writable: true,
      value: function value(url) {
        return url + "?" + new URLSearchParams({
          offset: _classPrivateFieldGet(_assertThisInitialized(_this3), _calcOffset).call(_assertThisInitialized(_this3)),
          amount: _classPrivateFieldGet(_assertThisInitialized(_this3), _settings).pageSize
        });
      }
    });

    _fetchData.set(_assertThisInitialized(_this3), {
      writable: true,
      value: function value() {
        var _classPrivateFieldGet3 = _classPrivateFieldGet(_assertThisInitialized(_this3), _endpoints),
            currency = _classPrivateFieldGet3.currency,
            products = _classPrivateFieldGet3.products,
            data = {};

        return fetch(_classPrivateFieldGet(_assertThisInitialized(_this3), _createUrlWithQuery).call(_assertThisInitialized(_this3), products)).then(function (res) {
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

    _checkIfContainerEmpty.set(_assertThisInitialized(_this3), {
      writable: true,
      value: function value() {
        return $(_classPrivateFieldGet(_assertThisInitialized(_this3), _selectors).content).children().length === 0;
      }
    });

    _defineProperty(_assertThisInitialized(_this3), "create", function () {
      if (!_classPrivateFieldGet(_assertThisInitialized(_this3), _checkIfContainerEmpty).call(_assertThisInitialized(_this3))) return;

      _this3.enableLoading();

      _classPrivateFieldGet(_assertThisInitialized(_this3), _fetchData).call(_assertThisInitialized(_this3)).then(function (_ref) {
        var products = _ref.products,
            currency = _ref.currency;
        var target = document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_this3), _selectors).content);

        _this3.disableLoading();

        products.forEach(function (product) {
          target.insertAdjacentHTML("beforeend", productCard(product, currency, "col-12 col-sm-6 col-md-4 col-lg-3"));
        });
      });
    });

    if (!endpoint || !selectors) console.log("Constructor properties undefinded!");

    for (var key in settings) {
      _classPrivateFieldGet(_assertThisInitialized(_this3), _settings)[key] = settings[key];
    }

    for (var _key in selectors) {
      _classPrivateFieldGet(_assertThisInitialized(_this3), _selectors)[_key] = selectors[_key];
    }

    _classPrivateFieldGet(_assertThisInitialized(_this3), _init2).call(_assertThisInitialized(_this3));

    return _this3;
  }

  return ProductsCards;
}(Loader);

var _qty = new WeakMap();

var _init3 = new WeakMap();

var QtySelector = function QtySelector(selectors) {
  var _this4 = this;

  _classCallCheck(this, QtySelector);

  _qty.set(this, {
    writable: true,
    value: void 0
  });

  _defineProperty(this, "selectors", {
    incrementor: "",
    decrementor: "",
    counter: ""
  });

  _init3.set(this, {
    writable: true,
    value: function value() {
      var _this4$selectors = _this4.selectors,
          inc = _this4$selectors.incrementor,
          dec = _this4$selectors.decrementor,
          counter = _this4$selectors.counter;

      for (var key in _this4.selectors) {
        if (!$(_this4.selectors[key]).length) return;
      }

      $(inc).on("click", _this4.increment);
      $(dec).on("click", _this4.decrement);
      $(counter).on("input", _this4.getQty);
      $(document).on("DOMContentLoaded", _this4.getQty);
    }
  });

  _defineProperty(this, "updateQty", function (qty) {
    $(_this4.selectors.counter).val(qty);
  });

  _defineProperty(this, "getQty", function (ev) {
    var qty = $(_this4.selectors.counter).val();

    _classPrivateFieldSet(_this4, _qty, Number(qty));
  });

  _defineProperty(this, "increment", function () {
    var _this$qty;

    _classPrivateFieldSet(_this4, _qty, (_this$qty = +_classPrivateFieldGet(_this4, _qty)) + 1), _this$qty;

    _this4.updateQty(_classPrivateFieldGet(_this4, _qty));
  });

  _defineProperty(this, "decrement", function () {
    var _this$qty2;

    if (_classPrivateFieldGet(_this4, _qty) <= 1) return;
    _classPrivateFieldSet(_this4, _qty, (_this$qty2 = +_classPrivateFieldGet(_this4, _qty)) - 1), _this$qty2;

    _this4.updateQty(_classPrivateFieldGet(_this4, _qty));
  });

  _defineProperty(this, "setQty", function (qty) {
    _classPrivateFieldSet(_this4, _qty, Number(qty));
  });

  this.selectors = selectors;

  _classPrivateFieldGet(this, _init3).call(this);
};

var _init4 = new WeakMap();

var CartQtySelector = /*#__PURE__*/function (_QtySelector) {
  _inherits(CartQtySelector, _QtySelector);

  var _super2 = _createSuper(CartQtySelector);

  function CartQtySelector(props) {
    var _this5;

    _classCallCheck(this, CartQtySelector);

    _this5 = _super2.call(this, props); //console.log(this.selectors);
    //this.#init();

    _init4.set(_assertThisInitialized(_this5), {
      writable: true,
      value: function value() {
        var _this5$selectors = _this5.selectors,
            inc = _this5$selectors.incrementor,
            dec = _this5$selectors.decrementor;
        $(inc).on("click", _this5.updateCart);
        $(dec).on("click", _this5.updateCart);
      }
    });

    _defineProperty(_assertThisInitialized(_this5), "sendSetQtyReq", function () {
      fetch();
    });

    _defineProperty(_assertThisInitialized(_this5), "updateCart", function () {
      console.log("wwww");
    });

    return _this5;
  }

  return CartQtySelector;
}(QtySelector); //const urlBase = "http://localhost:8000";


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
} //qty selector


var cartProducts = ".cart__products ul";
$(cartProducts).find("li").each(function (key, elem) {
  var elemId = $(elem).attr("id"),
      qtySelectors = {
    incrementor: "#".concat(elemId, " .incQty"),
    decrementor: "#".concat(elemId, " .decQty"),
    counter: "#".concat(elemId, " .qtyCounter")
  };
  var qtySelector = new CartQtySelector(qtySelectors);
});