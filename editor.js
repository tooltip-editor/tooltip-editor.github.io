CodeMirror.defineMode("colorCodes", function () {
    let states = ['color', 'matrix', 'bold', 'strikethrough', 'underline', 'italic', 'special']
    let codes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'k', 'l', 'm', 'n', 'o', 'r'];
    return {
        startState: () => {
            return {
                [states[0]]: null,
                [states[1]]: false,
                [states[2]]: false,
                [states[3]]: false,
                [states[4]]: false,
                [states[5]]: false,
                [states[6]]: false,
            };
        },
        token: function (stream, state) {
            // check for the formatting codes
            if (stream.peek() == '&') {
                stream.next();
                if (stream.peek() == '0') state[states[0]] = 'black';
                else if (stream.peek() == '1') state[states[0]] = 'dark_blue';
                else if (stream.peek() == '2') state[states[0]] = 'dark_green';
                else if (stream.peek() == '3') state[states[0]] = 'dark_aqua';
                else if (stream.peek() == '4') state[states[0]] = 'dark_red';
                else if (stream.peek() == '5') state[states[0]] = 'dark_purple';
                else if (stream.peek() == '6') state[states[0]] = 'gold';
                else if (stream.peek() == '7') state[states[0]] = 'gray';
                else if (stream.peek() == '8') state[states[0]] = 'dark_gray';
                else if (stream.peek() == '9') state[states[0]] = 'blue';
                else if (stream.peek() == 'a') state[states[0]] = 'green';
                else if (stream.peek() == 'b') state[states[0]] = 'aqua';
                else if (stream.peek() == 'c') state[states[0]] = 'red';
                else if (stream.peek() == 'd') state[states[0]] = 'light_purple';
                else if (stream.peek() == 'e') state[states[0]] = 'yellow';
                else if (stream.peek() == 'f') state[states[0]] = 'white';
                else if (stream.peek() == 'k') state[states[1]] = true;
                else if (stream.peek() == 'l') state[states[2]] = true;
                else if (stream.peek() == 'm') state[states[3]] = true;
                else if (stream.peek() == 'n') state[states[4]] = true;
                else if (stream.peek() == 'o') state[states[5]] = true;
                else if (stream.peek() == 'r') {
                    state[states[0]] = null;
                    state[states[1]] = false;
                    state[states[2]] = false;
                    state[states[3]] = false;
                    state[states[4]] = false;
                    state[states[5]] = false;
                }
            } else stream.next();
            //mark special characters
            console.log(2, codes.includes(stream.peek()));
            if (codes.includes(stream.peek())) state[states[6]] = false;
            stream.backUp(1);
            if (stream.peek() == '&') {
                stream.next();
                console.log(3, codes.includes(stream.peek()));
                if (codes.includes(stream.peek())) {
                    state[states[6]] = true;
                }
                else state[states[6]] = false;
                stream.next();
            }
            else {
                stream.next();
            }
            stream.backUp(1)
            if (stream.peek() == ' ') state[states[6]] = false;
            stream.next()
            //parse classes
            let ret = '';
            states.forEach(s => {
                if (s == 'color' && state[s]) {
                    ret = state[s];
                }
                else if (state[s]) {
                    ret += (ret ? ' ' : '') + s;
                }
            })
            return ret;
        }
    };
});

var editor_name = CodeMirror.fromTextArea(document.getElementById('editor-name'), {
    mode: "colorCodes",
    simpleScrollbar: true,
});
var editor_desc = CodeMirror.fromTextArea(document.getElementById('editor-desc'), {
    mode: "colorCodes",
    simpleScrollbar: true,
});

var editorIn = document.getElementById("editor-name");
editorIn.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) e.preventDefault();
});