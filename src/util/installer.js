const Slider = require("../models/slider");
const { getImageUrl } = require("./paths");

class Installer {

    static #InitSlider = () => {
        const slider = {slides: []};

        for(let i=0;i<3;i++)
            slider.slides.push({
                    url: getImageUrl("slide.png", "placeholders"),
                    order: i
                });

        return Slider.create(slider);
    }

    static #isInstalled = () => {
        let res = true;
        
        return Slider.exists()
            .then(isExist => res = isExist)
            .then(() => res);
    }

    static #install = () => {
        this.#InitSlider();
    }

    static start = () => {
        this.#isInstalled()
            .then(res => {
                if(!res)
                    this.#install();
            });
    }
}

module.exports = Installer;