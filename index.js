const nameEditor = document.getElementById('editor-name');
const descEditor = document.getElementById('editor-desc');

const nameField = document.getElementById('tooltip-name');
const descField = document.getElementById('tooltip-desc');

const colorPatterns = [
    [/&0(.*?)(&[1-9a-fr]|$)/, `<span class="black">$1</span>$2`],
    [/&1(.*?)(&[02-9a-fr]|$)/, `<span class="dark_blue">$1</span>$2`],
    [/&2(.*?)(&[013-9a-fr]|$)/, `<span class="dark_green">$1</span>$2`],
    [/&3(.*?)(&[0-24-9a-fr]|$)/, `<span class="dark_aqua">$1</span>$2`],
    [/&4(.*?)(&[0-35-9a-fr]|$)/, `<span class="dark_red">$1</span>$2`],
    [/&5(.*?)(&[0-46-9a-fr]|$)/, `<span class="dark_purple">$1</span>$2`],
    [/&6(.*?)(&[0-57-9a-fr]|$)/, `<span class="gold">$1</span>$2`],
    [/&7(.*?)(&[0-689a-fr]|$)/, `<span class="gray">$1</span>$2`],
    [/&8(.*?)(&[0-79a-fr]|$)/, `<span class="dark_gray">$1</span>$2`],
    [/&9(.*?)(&[0-8a-fr]|$)/, `<span class="blue">$1</span>$2`],
    [/&a(.*?)(&[0-9b-fr]|$)/, `<span class="green">$1</span>$2`],
    [/&b(.*?)(&[0-9ac-fr]|$)/, `<span class="aqua">$1</span>$2`],
    [/&c(.*?)(&[0-9abd-fr]|$)/, `<span class="red">$1</span>$2`],
    [/&d(.*?)(&[0-9a-cefr]|$)/, `<span class="light_purple">$1</span>$2`],
    [/&e(.*?)(&[0-9a-dfr]|$)/, `<span class="yellow">$1</span>$2`],
    [/&f(.*?)(&[0-9a-er]|$)/, `<span class="white">$1</span>$2`],
]
const formatPatterns = [
    [/&k(.*?)(&r|$)/, `<span class="matrix">$1</span>$2`],
    [/&l(.*?)(&r|$)/, `<span class="bold">$1</span>$2`],
    [/&m(.*?)(&r|$)/, `<span class="strikethrough">$1</span>$2`],
    [/&n(.*?)(&r|$)/, `<span class="underline">$1</span>$2`],
    [/&o(.*?)(&r|$)/, `<span class="italic">$1</span>$2`],
    [/&r(.*?)(&r|$)/, `<span class="italic">$1</span>$2`],
]

function parseToTooltip(val) {
    val = val.replace(/\n/g, `<br/>`)
    colorPatterns.forEach(set => {
        while (val.match(set[0])) val = val.replace(set[0], set[1]);
    })
    formatPatterns.forEach(set => {
        while (val.match(set[0])) val = val.replace(set[0], set[1]);
    })
    return val;
}

console.log(descEditor.value);

function wrapInTags(val, inputClass) {
    return `<span class="${inputClass}">${val}</span>`;
}

// function parsePreviewName() {
//     nameField.innerHTML = parseToTooltip(nameEditor.value);
// }
// function parsePreviewDesc() {
//     descField.innerHTML = parseToTooltip(descEditor.value);
// }
document.getElementById("editor-name").addEventListener("input", function(){
	nameField.innerHTML = parseToTooltip(nameEditor.value);
})
document.getElementById("editor-desc").addEventListener("input", function(){
    descField.innerHTML = parseToTooltip(descEditor.value);
})

nameField.innerHTML = parseToTooltip(nameEditor.value);
descField.innerHTML = parseToTooltip(descEditor.value);
