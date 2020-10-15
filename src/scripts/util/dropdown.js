class Dropdown {
  root;

  slideDown = () => {
    $(this.root).find(".dropdown-menu").slideDown();
  };

  slideUp = () => {
    $(this.root).find(".dropdown-menu").slideUp();
  };

  fadeSlideUp = () => {
    $(this.root)
      .find(".dropdown-menu")
      .css({ display: "block" })
      .css({ opacity: 0, top: "150%" })
      .animate({ top: "100%", opacity: 1 });
  };

  fadeSlideDown = () => {
    $(this.root)
      .find(".dropdown-menu")
      .css("display", "block")
      .animate({ top: "150%", opacity: 0 }, "", function (ev) {
        $(this).css("display", "none");
      });
  };

  getAnimationFuncs = (animation) => {
    let show, hide;

    switch (animation) {
      case "slide": {
        show = this.slideDown;
        hide = this.slideUp;
        break;
      }
      case "fadeSlide":
      default: {
        show = this.fadeSlideUp;
        hide = this.fadeSlideDown;
        break;
      }
    }

    return [show, hide];
  };

  setAnimation = (animation) => {
    let [showAnim, hideAnim] = this.getAnimationFuncs(animation);

    $(this.root).on("show.bs.dropdown", showAnim);
    $(this.root).on("hide.bs.dropdown", hideAnim);
  };

  constructor(root) {
    this.root = root;
  }
}

const adminPanelMenuDropdown = new Dropdown("#adminPanelMenu .dropdown");
const shopHeaderDropdown = new Dropdown("#shopHeader .dropdown");
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
