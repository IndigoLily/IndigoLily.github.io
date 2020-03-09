import { Vec } from '/lib/vec.mjs';

export class Particle {
    constructor(ctx, pos, vel) {
        this.ctx = ctx;
        this.pos = pos || new Vec(0, 0);
        this.vel = vel || new Vec(0, 0);
        this.acc = new Vec(0, 0);
    }

    addForce(force) {
        this.acc.add(force);
    }

    move() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    draw(r = 1) {
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, r, 0, Math.PI*2);
        this.ctx.fill();
    }
}

export class MParticle extends Particle {
    constructor(mass, ctx, pos, vel) {
        super(ctx, pos, vel);
        this.mass = mass;
    }

    get r() {
        return Math.sqrt(this.mass)/Math.PI;
    }

    addForce(force) {
        super.addForce(Vec.scale(force, 1/this.mass));
    }

    draw(c = 1) {
        super.draw(this.r * c);
    }
}
