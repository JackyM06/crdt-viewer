import { Application } from 'pixi.js';
import { gsap } from 'gsap';

export const enum Camp {
    LEFT = 'left',
    RIGHT = 'right'
}

export class Animation {
    private app: Application;

    constructor(private parent: HTMLElement) {
        this.app = new Application({
            resolution: window.devicePixelRatio,
            backgroundAlpha: 0,
            autoDensity: true
        });

        this.app.ticker.stop();
        gsap.ticker.add(() => {
            this.app.ticker.update(); // 由gsap接管
        });
    }
}
