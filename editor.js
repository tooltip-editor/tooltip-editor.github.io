CodeMirror.defineMode("colorCodes", function () {
    const states = ['color', 'matrix', 'bold', 'strikethrough', 'underline', 'italic', 'special']
    const codes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'k', 'l', 'm', 'n', 'o', 'r'];
    return {
        startState: () => {
            return {
                [states[0]]: null,
                [states[1]]: false,
                [states[2]]: false,
                [states[3]]: false,
                [states[4]]: false,
                [states[5]]: false,
                [states[6]]: 0,
            };
        },
        token: function (stream, state) {
            // check for the formatting codes
            if (stream.peek() == '&') {
                stream.next();
                switch (stream.peek()) {

                    case '0': state[states[0]] = 'black'; break;
                    case '1': state[states[0]] = 'dark_blue'; break;
                    case '2': state[states[0]] = 'dark_green'; break;
                    case '3': state[states[0]] = 'dark_aqua'; break;
                    case '4': state[states[0]] = 'dark_red'; break;
                    case '5': state[states[0]] = 'dark_purple'; break;
                    case '6': state[states[0]] = 'gold'; break;
                    case '7': state[states[0]] = 'gray'; break;
                    case '8': state[states[0]] = 'dark_gray'; break;
                    case '9': state[states[0]] = 'blue'; break;
                    case 'a': state[states[0]] = 'green'; break;
                    case 'b': state[states[0]] = 'aqua'; break;
                    case 'c': state[states[0]] = 'red'; break;
                    case 'd': state[states[0]] = 'light_purple'; break;
                    case 'e': state[states[0]] = 'yellow'; break;
                    case 'f': state[states[0]] = 'white'; break;
                    case 'k': state[states[1]] = true; break;
                    case 'l': state[states[2]] = true; break;
                    case 'm': state[states[3]] = true; break;
                    case 'n': state[states[4]] = true; break;
                    case 'o': state[states[5]] = true; break;
                    case 'r': {
                        state[states[0]] = null;
                        state[states[1]] = false;
                        state[states[2]] = false;
                        state[states[3]] = false;
                        state[states[4]] = false;
                        state[states[5]] = false;
                        break;
                    }
                }
            } else stream.next();
            // ============ mark special characters
            // first case
            stream.backUp(2);
            if (stream.peek() == '&') state.special = 1;
            else state.special = 0;
            stream.next();
            if (codes.includes(stream.peek()) && state.special == 1) state.special = 2;
            else state.special = 0;
            stream.next();
            // second case
            if (state.special != 2) {
                stream.backUp(1);
                if (stream.peek() == '&') state.special = 1;
                else state.special = 0;
                stream.next();
                if (codes.includes(stream.peek()) && state.special == 1) state.special = 2;
                else state.special = 0;
            }

            //parse classes
            let ret = '';
            states.forEach(s => {
                if (s == 'color' && state[s]) {
                    ret = state[s];
                }
                else if ((s == 'special' && state[s] == 2) || (s != 'special' && state[s])) {
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
    if (e.key == 'Enter') e.preventDefault();
});