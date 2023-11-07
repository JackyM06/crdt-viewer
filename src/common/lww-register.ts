import { Observable } from './observable';

export interface IState<T> {
    peer: string;
    timestamp: number;
    value: T;
}

export class LWWRegister<T> extends Observable<'change'> {
    readonly id: string;

    state: IState<T>;

    constructor(id: string, state: IState<T>) {
        super();

        this.id = id;
        this.state = state;
    }

    get value() {
        return this.state.value;
    }

    set(value: T) {
        this.state = {
            peer: this.id,
            timestamp: this.state.timestamp + 1, // clock计数器，每次赋值将自动更新
            value
        };
        this.emit('change', this.value, this.state);
    }

    merge(state: IState<T>) {
        const { peer: remotePeer, timestamp: remoteTimestamp } = state;

        const { peer: localPeer, timestamp: localTimestamp } = this.state;

        if (localTimestamp > remoteTimestamp) {
            return;
        }

        if (localTimestamp === remoteTimestamp && remotePeer !== localPeer) {
            return;
        }

        this.state = state; // 如果remote的state优先级更高，则将state更新为remote的state

        this.emit('change', this.value, state);
    }
}
