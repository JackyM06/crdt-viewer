type ListenerType = (...args: any) => void;

export class Observable<T> {
    observers: Map<T, ListenerType[]> = new Map();

    on(name: T, func: ListenerType) {
        const listeners = this.observers.get(name) || [];
        listeners.push(func);
        this.observers.set(name, listeners);
    }

    once(name: T, func: ListenerType) {
        const _f = (...args: any[]) => {
            this.off(name, func);
            func(...args);
        };
        this.on(name, _f);
    }

    off(name: T, func: ListenerType) {
        const listeners = this.observers.get(name) || [];
        this.observers.set(
            name,
            listeners.filter((e) => e !== func)
        );
    }

    emit(name: T, ...args: any[]) {
        const listeners = this.observers.get(name) || [];

        listeners.forEach((func) => {
            func(...args);
        });
    }

    clear() {
        this.observers.clear();
    }
}
