const svg = document.querySelector("svg");
export const circle = () => svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "circle"));
let needsResize = true;
window.addEventListener("resize", () => { needsResize = true; });
window.addEventListener("load", () => { needsResize = true; });
export function resize() {
    if (needsResize) {
        const min = `${Math.min(window.innerWidth, window.innerHeight)}`;
        svg.setAttribute("width", min);
        svg.setAttribute("height", min);
        needsResize = false;
    }
}
