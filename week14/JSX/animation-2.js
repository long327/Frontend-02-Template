// setInterval(()=>{}, 16) // 软件一般是60帧，所以用16ms  比较不可控
// // 浏览器不一定正常按照设置的interval执行，或者有可能会有积压 取决于浏览器 执行完再去setTimeout或者rAF是个相对安全的做法

// let tick = () => {
//     setTimeout(tick, 16)
// }

// let tick = () => {
//     requestAnimationFrame(tick) // rAF 申请浏览器执行下一帧的时候执行这个代码  推荐使用来进行自重复时间线的操作
// }
const TICK = Symbol("tick"); // 特殊字符串symbol，永远不会重复
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time");

export class Timeline {
    constructor() {
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
    }
    start() {
        let startTime = Date.now();
        this[TICK] = () => {
            let now = Date.now() - startTime;
            for (let animation of this[ANIMATIONS]) {
                //console.log(animation.duration);
                let t;
                if(this[START_TIME].get(animation) < startTime){
                    t = now - startTime;
                }else{
                    t = now - this[START_TIME].get(animation);
                }
                if(animation.duration < t){
                    this[ANIMATIONS].delete(animation);
                    t = animation.duration;
                }
                animation.receive(t);
            }

            requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }
    // set rate() {}
    // get rate() {}
    pause() {

    }

    resume() {

    }
    reset() {}
    add(animation, startTime) {
        if (arguments.length < 2) {
            startTime = Date.now();
        }
        this[ANIMATIONS].add(animation);
        this[START_TIME].set(animation, startTime)
    }
}

// 属性动画 有一个起始值一个终止值
export class Animation {
    constructor(object, property, startValue, endValue, duration, delay, timingFunction) {
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.timingFunction = timingFunction;
        this.delay = delay;
    }

    receiveTime(time) { // 虚拟时间
        //console.log(time);
        let range = this.endValue - this.startValue;
        this.object[this.property] = this.startValue + range * time / this.duration;
    }
}