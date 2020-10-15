"use strict";

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