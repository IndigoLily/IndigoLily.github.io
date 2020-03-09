let gaussY = null;
export const Rand = {
    /*
    gaussian() {
        if (gaussY) {
            const y = gaussY;
            gaussY = null;
            return y;
        }
        const U = Math.random();
        const V = Math.random();
        if (U === 0 || V === 0) {
            return Rand.gaussian();
        }
        const sqrt = Math.sqrt(-2*Math.log(U));
        const theta = Math.PI*2*V;
        gaussY = sqrt*Math.sin(theta);
        return sqrt*Math.cos(theta);
    }
    */
    gaussian() {
        if (gaussY) {
            const y = gaussY;
            gaussY = null;
            return y;
        }
        const U = Math.random() * 2 - 1;
        const V = Math.random() * 2 - 1;
        const S = U*U + V*V;
        if (U == -1 || U == 1 || V == -1 || V == 1 || S >= 1) {
            return Rand.gaussian();
        }
        const sqrt = Math.sqrt(-2*Math.log(S)/S);
        gaussY = V*sqrt;
        return U*sqrt;
    }
}
