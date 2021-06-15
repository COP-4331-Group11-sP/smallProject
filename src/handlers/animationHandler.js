

// Functions for making the add contacts popup visible
function show() {
    var popup = document.querySelector(".popup-container");
    var overlay = document.querySelector(".overlay");
    var toBlur = document.querySelectorAll(".toBlur");


    popup.classList.add("visible")
    overlay.classList.add("visible");
    toBlur.forEach((element) => {
        element.classList.add("blur");
    });
}

// function is used to hide add contact popup box
function hide() {
    var popup = document.querySelector(".popup-container");
    var overlay = document.querySelector(".overlay");
    var toBlur = document.querySelectorAll(".toBlur");


    popup.classList.remove("visible")
    overlay.classList.remove("visible");
    toBlur.forEach((element) => {
        element.classList.remove("blur");
    });
}


export{show,hide};