import {Component, createElement} from "./framework.js";
import {Carousel} from "./Carousel.js";
import {Timeline, Animation} from "./animation.js";
import {Button} from "./Button.js";
import {List} from "./List.js";

let pictures = [
    {
        url: "http://www.pngall.com/wp-content/uploads/2016/03/Cat-PNG-2.png",
        title: "cat-1"
    }, {
        url: "http://www.pngall.com/wp-content/uploads/2016/03/Cat-PNG-6.png",
        title: "cat-2"
    }, {
        url: "http://www.pngall.com/wp-content/uploads/2016/03/Cat-PNG-9.png",
        title: "cat-3"
    }, {
        url: "http://www.pngall.com/wp-content/uploads/2016/03/Cat-PNG-7.png",
        title: "cat-4"
    }
]

let a = <List data={pictures}>
        {(collections) => 
            <div>
                <a href={collections.url}>{collections.title}</a>
            </div>
        }
        </List>

a.mountTo(document.body);




