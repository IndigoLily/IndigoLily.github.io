function linear(y1, y2, mu) {
    return y1*(1-mu)+y2*mu;
}

function cosine(y1, y2, mu) {
    const mu2 = (1-Math.cos(mu*Math.PI))/2;
    return y1*(1-mu2)+y2*mu2;
}

function cubic(y0, y1, y2, y3, mu) {
    const mu2 = mu*mu;
    const a0 = y3 - y2 - y0 + y1;
    const a1 = y0 - y1 - a0;
    const a2 = y2 - y0;
    const a3 = y1;

    return a0*mu*mu2+a1*mu2+a2*mu+a3;
}

function hermite(y0, y1, y2, y3, mu, t = 0, b = 0) {
    const mu2 = mu*mu;
    const mu3 = mu2*mu;

    const m0  = (y1-y0)*(1+b)*(1-t)/2 + (y2-y1)*(1-b)*(1-t)/2;
    const m1  = (y2-y1)*(1+b)*(1-t)/2 + (y3-y2)*(1-b)*(1-t)/2;
    const a0 =  2*mu3 - 3*mu2 + 1;
    const a1 =    mu3 - 2*mu2 + mu;
    const a2 =    mu3 -   mu2;
    const a3 = -2*mu3 + 3*mu2;

    return a0*y1+a1*m0+a2*m1+a3*y2;
}

export const Interpolate = {
    linear,
    cosine,
    cubic,
    hermite
};
