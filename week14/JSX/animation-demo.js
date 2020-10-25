import {Timeline, Animation} from "./animation.js"
import {ease} from "./ease.js"

let timeline = new Timeline();
timeline.start();

// timeline.add(new Animation(document.querySelector("#el").style, "transform", 0, 500, 2000, 0, null, v => `translateX(${v}px)`));
tl.add(new Animation(document.querySelector("#el").style, "transform", 0, 500, 5000, 0, ease, v => `translateX(${v}px)`));

document.querySelector("#el2").style.transition = "transform 5s ease";
document.querySelector("#el2").style.transform = `translateX(500px)`;

document.querySelector("#pause-btn").addEventListener("click", () => timeline.pause());
document.querySelector("#resume-btn").addEventListener("click", () => timeline.resume());


