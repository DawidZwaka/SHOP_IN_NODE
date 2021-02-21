const {Schema, model, Types} = require("mongoose");

//Helpers

const compare = (a, b) => {
    let res = 0;
  
    if (a > b) {
      res = 1;
    } else if (a < b) {
      res = -1;
    }
    return res;
  }

const swapLimitValues = (arr) => {
    let temp, maxIndex = arr.length -1;
    
    temp = arr[maxIndex];
    arr.pop();
    arr.push(arr[0]);
    arr.shift();
    arr.unshift(temp);
}

const isSwapingLimitValue = (min, max, val, direction) => {
    let res = false;

    switch(direction){
        case 1: {
            if(val === max)
                res = true;
            
            break;
        }
        case -1: {
            if(val === min)
                res = true;

            break;
        }
        default: break;
    }

    return res;
}

const swapValues = (arr, index, direction) => {
    let temp = arr[index], nextIndex = index+direction;

    if(isSwapingLimitValue(0,arr.length-1,index,direction))
        swapLimitValues(arr);
    else{
        arr[index] = arr[nextIndex];
        arr[nextIndex] = temp;
    }
 
}

const rearrangeSlidesOrder = (slides, direction, slideID) => {
    const q = [];

    slides.forEach(({order}) => q.push(order));

    let index = slides.findIndex(({_id}) => _id.equals(slideID));
    
    swapValues(q,index,direction);


    slides.forEach((slide,index) => {
        slides[index].order = q[index];
    });

    return slides;
}

//Schema

const sliderSchema = new Schema({
    slides: [
        {
            url: {type: String , required: true},
            order:{ type: Number, required: true} 
        }
    ]
})

sliderSchema.methods.sortSlides = function() {
    this.slides.sort((a,b) => compare(a.order,b.order));
}

sliderSchema.methods.incrementSlideOrder = function(slideID) {
    this.sortSlides();
    rearrangeSlidesOrder(this.slides, 1, slideID);

    return this.save();
}

sliderSchema.methods.decrementSlideOrder = function(slideID) {
    this.sortSlides();
    rearrangeSlidesOrder(this.slides, -1, slideID);

    return this.save();
}


module.exports = model("Slider", sliderSchema);