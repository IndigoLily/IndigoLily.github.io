const deg_to_rad_ratio = Math.PI/180;
const rad_to_deg_ratio = 180/Math.PI;
const TAU = Math.PI*2;

export class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    get copy() {
        return new Vec(this.x, this.y);
    }

    static scale(vec, c) {
        return new Vec(vec.x * c, vec.y * c);
    }
    static add(v0, v1) {
        return new Vec(v0.x + v1.x, v0.y + v1.y);
    }
    static sub(v0, v1) {
        return new Vec(v0.x - v1.x, v0.y - v1.y);
    }

    get mag() {
        return Math.hypot(this.x, this.y);
    }
    get rads() {
        return (TAU + Math.atan2(this.y, this.x)) % TAU;
    }
    get degs() {
        return this.rads * rad_to_deg_ratio;
    }

    set mag(m) {
        const mag = this.mag;
        if (m == 0 || mag == 0) {
            return 0;
        }
        this.set(this.x/mag*m, this.y/mag*m);
        return m;
    }
    set rads(r) {
        const mag = this.mag;
        this.set(Math.cos(r)*mag, Math.sin(r)*mag);
        return r;
    }
    set degs(d) {
        this.rads = d * deg_to_rad_ratio;
        return d;
    }

    scale(c) {
        this.x *= c;
        this.y *= c;
        return this;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
}
