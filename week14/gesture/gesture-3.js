let element = document.documentElement;

let isListeningMouse = false;

element.addEventListener("mousedown", event => {
    let content = Object.create(null);
    content.set("mouse" + (1 << event.button), content);
    start(event, content);
    let mousemove = event => {
        let button = 1;
        console.log("mousemove", event,buttons)
        while (button <= event.buttons) {
            if (button & event.buttons) {
                let key;
                if (button === 2) {
                    key = 4;
                }
                else if (button === 4) {
                    key = 2;
                }
                else {
                    key = button;
                }
                let content = contents.get("mouse" + key);
                move(event, content);
            }
            button = button << 1;
        }
        move(event, content);
    }

    let mouseup = event => {
        console.log("end", event,button);
        let content = contents.get("mouse" + (1 << event.button));
        end(event, content);
        contents.delete("mouse" + (1 << event.button))
        if (event.buttons === 0) {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
            isListeningMouse = false;
        }
    }

    if (!isListeningMouse) {
        document.addEventListener("mousemove", $(selector).mouseup(function () { 
            
        });)
    }

})