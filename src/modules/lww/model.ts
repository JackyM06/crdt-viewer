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
            timestamp: 1,
            value: ''
        });

        this.ms = new MessageSocket<IState<string>>(id, roomId);

        this.ms.on('data', (state: IState<string>) => {
            this.lww.merge(state);
        });

        // 这个可能在Merger之后触发
        this.lww.on('change', (value, state) => {
            this.lastState = state;
            this.emit('change', value, state);
        });
    }

    // 本地更新方法
    set(value: string) {
        this.lww.set(value);
    }
}
