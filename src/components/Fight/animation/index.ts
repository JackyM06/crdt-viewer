import { Application } from 'pixi.js';
import { gsap } from 'gsap';

export const enum Camp {
    LEFT = 'left',
    RIGHT = 'right'
}

export class Animation {
    private app: Application;

    constructor() {
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

    private resize(parent: HTMLDivElement) {
        this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
        this.app.stage.scale.set(
            parent.clientWidth / 828,
            parent.clientWidth / 828
        );
    }

    public async start(parent: HTMLDivElement) {
        this.resize(parent);

        let resizeTime = 0;
        let timer = 0;
        window.addEventListener('resize', () => {
            const now = Date.now();
            const diff = now - resizeTime;

            clearTimeout(timer);
            timer = window.setTimeout(
                () => {
                    this.resize(parent);
                },
                Math.max(0, 100 - diff)
            );

            resizeTime = now;
        });

        parent.appendChild(this.app.view as HTMLCanvasElement);
    }

    public importText(camp: Camp, text: string, duration: number) {}
}
