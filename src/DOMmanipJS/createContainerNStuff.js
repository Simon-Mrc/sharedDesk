import { state } from "../constJS/exportConst";

export function createColorPicker(container, defaultColor = "#d654a4") {
    let input = document.createElement("input");
    input.type = "color";
    input.value = defaultColor;
    input.classList.add("container-color-picker"); 
    container.appendChild(input);
    return input;
}
