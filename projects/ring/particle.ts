import { random, Point, innerRadius, outerRadius, perpendicularBias, strengthBase, TAU, p, circle } from "./common.js";

const { cos, sin, min, hypot, PI } = Math;

export class Particle {
  static maxAge = 60 * 60 * random(1, 4, 2);

  pos!: Point;
  vel!: Point;
  acc!: Point;

  age!: number;

  reset() {
    const a = random(0, TAU); // random angle at which to place particle
    const r = random(innerRadius, outerRadius); // random position between innerRadius and outerRadius
    this.pos = p(
      cos(a) * r,
      sin(a) * r,
    );

    const a2 = a + TAU/4 + random(-TAU/4, TAU/4) / perpendicularBias; // trajectory angle somewhere clockwise of position
    this.vel = p(
      cos(a2) * 0.0001,
      sin(a2) * 0.0001,
    );

    this.acc = p();

    this.age = 0;
  }

  constructor() {
    this.reset();
  }

  updt(dt: number) {
    dt = min(1000 / 30, dt); // limit dt to 30fps or higher to set an upper bound on physical inaccuracies
    dt /= 3;
    this.age += dt;

    const d = hypot(this.pos.x, this.pos.y);

    function getStrength(n: number): number {
      return strengthBase ** (n / 10) - 1;
    }

    if (d > outerRadius) {
      const strength = getStrength(d - outerRadius);
      this.acc.x -= this.pos.x / d * strength * dt;
      this.acc.y -= this.pos.y / d * strength * dt;
    } else if (d < innerRadius) {
      const strength = getStrength(innerRadius - d);
      this.acc.x += this.pos.x / d * strength * dt;
      this.acc.y += this.pos.y / d * strength * dt;
    }

    this.vel.x += this.acc.x * dt;
    this.vel.y += this.acc.y * dt;

    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;

    this.acc.x = this.acc.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const r = 0.002 * sin(PI * this.age / Particle.maxAge) ** 2;
    ctx.globalAlpha = (r / 0.002)**0.25;
    circle(ctx, this.pos.x, this.pos.y, r);
  }
}
