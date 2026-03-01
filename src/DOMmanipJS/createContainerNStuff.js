export function createColorPicker(container, defaultColor = "#5caf7c") {
    let input = document.createElement("input");
    input.type = "color";
    input.value = defaultColor;
    input.classList.add("container-color-picker"); 
    container.appendChild(input);
    return input;
}
