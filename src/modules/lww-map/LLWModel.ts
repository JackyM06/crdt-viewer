import { LWWRegister, IState } from '../../common/lww-register';
import { MessageSocket } from '../../common/message-socket';
import { Observable } from '../../common/observable';

export class LWWModel extends Observable<'change'> {
    lastState?: IState<string>;

    ms: MessageSocket<IState<string>>;

    lww: LWWRegister<string>;

    constructor(id: string, roomId: string) {
        super();
        this.lww = new LWWRegister(id, {
            peer: id,
            timestamp: Date.now(),
            clock: 1,
            value: ''
        });

        this.ms = new MessageSocket<IState<string>>(id, roomId);

        this.ms.on('data', (state: IState<string>) => {
            this.lww.merge(state);
        });

        this.lww.on('change', (value, state) => {
            this.lastState = state;
            this.emit('change', value, state);
        });
    }

    // 对外暴露的更新方法
    set(value: string, timeout = 0) {
        this.lww.set(value);
        // 通过ms广播出去
        this.ms.send(this.lww.state, timeout);
    }
}
