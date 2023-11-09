import { Observable } from './observable';
import { sleep } from './utils';

export class MessageSocket<T> extends Observable<'data'> {
    bc: BroadcastChannel;

    private block = false;

    private blockCache: (() => void)[] = [];

    constructor(
        private id: string,
        room = 'llw'
    ) {
        super();

        this.bc = new BroadcastChannel(room);

        this.bc.addEventListener('message', ({ data }) => {
            const { id, payload } = data;
            if (id === this.id) {
                return;
            }
            this.emit('data', payload && JSON.parse(payload));
        });
    }

    private clearBlockCacheTask() {
        this.blockCache.forEach((fn) => {
            fn();
        });
        this.blockCache = [];
    }

    async send(data: T, timeout = 0) {
        // 过一层clone, 真实网络环境本身也会进行序列化
        const payload = JSON.stringify(data);

        const task = async () => {
            await sleep(timeout);

            this.bc.postMessage({
                id: this.id,
                payload
            });
        };
        if (this.block) {
            this.blockCache.push(task);
            return;
        }
        task();
    }

    setNetwork(run = true) {
        this.block = !run;

        if (run) {
            this.clearBlockCacheTask();
        }
    }
}
