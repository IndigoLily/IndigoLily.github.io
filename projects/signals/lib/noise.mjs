import { Interpolate } from './interpolate.mjs';

export class Noise {
    constructor() {
        this.values = {'0': Math.random()};
    }

    at(n) {
        //debugger;
        const [i0, i1, i2, i3] = [-1, 0, 1, 2].map(m => Math.floor(n)+m);

        if (this.values[i0] === undefined)
            this.values[i0] = Math.random();

        if (this.values[i1] === undefined)
            this.values[i1] = Math.random();

        if (this.values[i2] === undefined)
            this.values[i2] = Math.random();

        if (this.values[i3] === undefined)
            this.values[i3] = Math.random();

        const y0 = this.values[i0];
        const y1 = this.values[i1];
        const y2 = this.values[i2];
        const y3 = this.values[i3];
        n %= 1;
        if (n < 0) {
            n += 1;
        }

        return Interpolate.hermite(y0, y1, y2, y3, n);
    }
}
