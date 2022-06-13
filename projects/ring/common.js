export function random(min = 0, max = 1, curve = 1) {
    const num = Math.random() ** curve;
    return min + num * (max - min);
}
export function p(x, y) {
    return { x: x ?? 0, y: y ?? 0 };
}
export function circle(ctx, x, y, r, method = "fill") {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    if (method === "fill") {
        ctx.fill();
    }
    else {
        ctx.stroke();
    }
}
export const TAU = Math.PI * 2;
export const outerRadius = random(0.3, 0.4, 0.75);
export const innerRadius = random(0.1, outerRadius, 0.75);
export const strengthBase = random(1, 1.01, 8);
export const slowness = random(1, 10, 3);
export const perpendicularBias = random(1, 10, 3);
