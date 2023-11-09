import { Observable } from './observable';

export interface IState<T> {
    peer: string;
    timestamp: number;
    clock: number;
    value: T;
}

export class LWWRegister<T> extends Observable<'change' | 'merge'> {
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
            clock: this.state.clock + 1, // clock计数器，每次赋值将自动更新
            timestamp: Date.now(),
            value
        };
        this.emit('change', this.value, this.state);
    }

    merge(state: IState<T>) {
        const {
            peer: remotePeer,
            clock: remoteClock,
            timestamp: remoteTime
        } = state;

        const {
            peer: localPeer,
            clock: localClock,
            timestamp: localTime
        } = this.state;

        if (localClock > remoteClock) {
            return;
        }

        // 当出现相同的情况时，只需要明确好到底优先听谁的就可以
        if (localClock === remoteClock && remoteTime < localTime) {
            return;
        }

        this.emit('merge', state, this.state);

        this.state = state; // 如果remote的state优先级更高，则将state更新为remote的state

        this.emit('change', this.value, state);
    }
}
