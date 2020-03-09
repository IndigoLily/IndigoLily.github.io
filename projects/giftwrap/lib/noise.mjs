import { Interpolate } from './interpolate.mjs';

function cubic_hermite(type) {
    const values = {'0': Math.random()};
    const interpolate = Interpolate[type];
    return function(n) {
        //const [i0, i1, i2, i3] = [-1, 0, 1, 2].map(m => Math.floor(n)+m);
        const i0 = Math.floor(n)-1;
        const i1 = Math.floor(n)+0;
        const i2 = Math.floor(n)+1;
        const i3 = Math.floor(n)+2;

        if (values[i0] === undefined)
            values[i0] = Math.random();

        if (values[i1] === undefined)
            values[i1] = Math.random();

        if (values[i2] === undefined)
            values[i2] = Math.random();

        if (values[i3] === undefined)
            values[i3] = Math.random();

        const y0 = values[i0];
        const y1 = values[i1];
        const y2 = values[i2];
        const y3 = values[i3];
        n %= 1;
        if (n < 0) {
            n += 1;
        }

        return interpolate(y0, y1, y2, y3, n);
    }
}

export const Noise = {
    cubic() {
        return cubic_hermite('cubic');
    },
    hermite() {
        return cubic_hermite('hermite');
    },
    sine(octaves = 1) {
        octaves = Math.max(1, Math.floor(octaves));

        const phases = [],
              freqs  = [];
        for (let i = 0; i < octaves; i++) {
            phases[i] = Math.random() * Math.PI * 2;
            freqs[i]  = Math.random() + 0.5;
        }

        return function(n) {
            let sum = 0;
            for (let i = 0; i < octaves; i++) {
                sum += Math.sin(n*freqs[i]*2**i/2 + phases[i]) / 2**i;
            }
            return sum / (2-2**(1-octaves));
        }
    },
};
