import { LWWRegister } from './lww-register';

export interface Value<T> {
    [key: string]: T;
}

export interface State<T> {
    [key: string]: LWWRegister<T | null>['state'];
}

export class LWWMap<T> {
    private map = new Map<string, LWWRegister<T | null>>();

    constructor(
        private id: string,
        state: State<T>
    ) {
        for (const [key, register] of Object.entries(state)) {
            this.map.set(key, new LWWRegister(this.id, register));
        }
    }

    get value() {
        const value: Value<T> = {};
        for (const [key, register] of this.map.entries()) {
            if (register.value !== null) value[key] = register.value;
        }

        return value;
    }

    get state() {
        const state: State<T> = {};
        for (const [key, register] of this.map.entries()) {
            if (register) state[key] = register.state;
        }

        return state;
    }

    merge(state: State<T>) {
        for (const [key, remote] of Object.entries(state)) {
            const local = this.map.get(key);

            if (local) {
                local.merge(remote);
            } else {
                this.map.set(key, new LWWRegister(this.id, remote));
            }
        }
    }

    set(key: string, value: T) {
        const register = this.map.get(key);

        if (register) {
            register.set(value);
        } else {
            this.map.set(
                key,
                new LWWRegister(this.id, {
                    peer: this.id,
                    timestamp: 1,
                    value
                })
            );
        }
    }

    get(key: string) {
        return this.map.get(key)?.value || undefined;
    }

    delete(key: string) {
        this.map.get(key)?.set(null);
    }

    has(key: string) {
        return this.map.get(key)?.value !== null;
    }
}
