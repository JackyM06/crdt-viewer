import { Observable } from './observable';
import { sleep } from './utils';

export class MessageSocket<T> extends Observable<'data'> {
    bc: BroadcastChannel;

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
            this.emit('data', payload);
        });
    }

    async send(payload: T, timeout = 0) {
        await sleep(timeout);
        this.bc.postMessage({
            id: this.id,
            payload
        });
    }
}
