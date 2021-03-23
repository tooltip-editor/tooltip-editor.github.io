const nameEditor = document.getElementById('editor-name');
const descEditor = document.getElementById('editor-desc');

const nameField = document.getElementById('tooltip-name');
const descField = document.getElementById('tooltip-desc');

const colors = {
    '0': 'black',
    '1': 'dark_blue',
    '2': 'dark_green',
    '3': 'dark_aqua',
    '4': 'dark_red',
    '5': 'dark_purple',
    '6': 'gold',
    '7': 'gray',
    '8': 'dark_gray',
    '9': 'blue',
    'a': 'green',
    'b': 'aqua',
    'c': 'red',
    'd': 'light_purple',
    'e': 'yellow',
    'f': 'white',
    'r': 'gray'
}

function parseToTooltip(val) {
    val.replace(/&([0-9a-fr])(.*?)(&[0-9a-fr]|$)/gm, `<span class="$1">$2</span>$3`);
    val.replace(/&k(.*?)(&r|$)/gm, `<span class="matrix">$2</span>$3`);
    val.replace(/&l(.*?)(&r|$)/gm, `<span class="bold">$2</span>$3`);
    val.replace(/&m(.*?)(&r|$)/gm, `<span class="strikethrough">$2</span>$3`);
    val.replace(/&n(.*?)(&r|$)/gm, `<span class="underline">$2</span>$3`);
    val.replace(/&o(.*?)(&r|$)/gm, `<span class="italic">$2</span>$3`);
    return val;
}

function wrapInTags(val, inputClass) {
    return `<span class="${inputClass}">${val}</span>`;
}
