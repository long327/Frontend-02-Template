  
import { Component, createElement } from "./framework.js";

export class Carousel extends Component {
  constructor() {
      super();
      this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
      this.attributes[name] = value;
  }
  appendChild(child) {
      child.mountTo(this.root);
  }
  mountTo(parent) {
      parent.appendChild(this.render());// 保证render时机是在取到数据之后
  }
  render() {
      console.log(this.attributes.src);
      this.root = document.createElement("div");
      this.root.classList.add("carousel"); // 加一些css
      for (let record of this.attributes.src) {
          // img可以拖拽体验不好
          // let child = document.createElement("img");   
          // child.src = record;
          let child = document.createElement("div");
          child.style.backgroundImage = `url('${record}')`;
          this.root.appendChild(child);
      }
      // 自动播放部分
      // let currentIndex = 0;
      // setInterval(() =>{
      //     let children = this.root.children;
      //     let nextIndex = (currentIndex + 1) % children.length;
      //     let current = children[currentIndex];
      //     let next = children[nextIndex];
      //     next.style.transition = "none";//不希望挪动有动画
      //     next.style.transform = `translateX(${100 - nextIndex * 100}%)`;//减去自身偏移
      //     setTimeout(() => {
      //         next.style.transition = "";
      //         current.style.transform = `translateX(${- 100 - nextIndex * 100}%)`;
      //         next.style.transform = `translateX(${ - nextIndex * 100}%)`;
      //         currentIndex = nextIndex;
      //     }, 16); //用浏览器里的一帧时间
      // },3000);
      
      // 拖拽
      let positon = 0;
      this.root.addEventListener("mousedown", event =>{
          let children = this.root.children;
          let startX = event.clientX;
          // clientX clientY, 可渲染区域的坐标
          let move = event => {
              let x = event.clientX - startX;
              let current = positon - Math.round((x - x % 500)/500); // 避免拖动跳变
              for (let offset of [-2, -1, 0 , 1, 2]){
                  let pos = current + offset;
                  pos = (pos + children.length) % children.length;
                  children[pos].style.transition = "none";
                  children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`;
              }
          }  
          let up = event=>{
              let x = event.clientX - startX;
              positon = positon - Math.round(x / 500);
              // 看有没有超过250, 再去取sign
              for (let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]){
                  let pos = positon + offset;
                  pos = (pos + children.length) % children.length;
                  children[pos].style.transition = ""; // 挪的时候把transition关了
                  children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 }px)`;
              }
              //注意在document监听，在图片外，浏览器外move都可以监听
              document.removeEventListener("mousemove", move);
              document.removeEventListener("mouseup", up);
          }
          document.addEventListener("mousemove", move)
          document.addEventListener("mouseup", up)
      });
      return this.root;
  }
}