<script setup lang="ts">
import { ref, watch } from 'vue';
import dayjs from 'dayjs';
import DataCard from '../../components/DataCard.vue';
import Input from '../../components/Input.vue';
import { LWWModel } from './LLWModel';

const props = defineProps<{
    name: string;
    delay: number;
    network: boolean;
}>();

const model = new LWWModel(props.name, 'lww');

const viewValue = ref(model.lww.value);

const viewState = ref(model.lww.state);

const emit = defineEmits<{
    (e: 'input', value: string): void;
}>();

const logger = ref<{ message: string; time: number }[]>([]);

const addLogger = (message: string) => {
    logger.value.push({
        message,
        time: Date.now()
    });
};

model.on('change', (value, state) => {
    viewValue.value = value;

    viewState.value = state;
});

model.lww.on('merge', (state, oldState) => {
    addLogger(`被动合入: ${oldState.value} => ${state.value}`);
});

watch(
    () => props.network,
    () => {
        model.ms.setNetwork(props.network);
    }
);

const set = (value: string) => {
    addLogger(`主动修改: ${model.lww.value} => ${value}`);
    model.set(value, props.delay);
    emit('input', value);
};
</script>

<template>
    <div class="llw-item">
        <DataCard :name="name" class="card">
            <div class="header">
                <div class="name">{{ viewState.peer }}</div>
                <div class="clock">{{ viewState.clock }}</div>
            </div>
            <div class="add-value">
                <Input class="mini-input key"></Input>
                <Input class="mini-input value"></Input>
                <div class="add">+</div>
            </div>
            <Input
                :model-value="viewValue"
                @update:model-value="set"
                :label="name"
            />
        </DataCard>
        <div class="logger-panel">
            日志：
            <div
                v-for="({ message, time }, index) in logger"
                :key="index"
                class="item"
            >
                <span>{{ message }}</span>
                <span>{{ dayjs(time).format('HH:mm:ss.SSS') }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.header {
    display: flex;
    justify-content: space-between;
    color: rgb(36, 25, 105);
}

.logger-panel {
    // min-width: 300px;
    margin-top: 30px;
    color: #666;
    font-size: 14px;
    .item {
        display: flex;
        justify-content: space-between;
    }
}

.llw-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    // min-width: 300px;
}

.add-value {
    display: flex;
    margin-bottom: 10px;
    .mini-input {
        // width: 30px;
    }
    .add {
        width: 30px;
        font-size: 24px;
        text-align: center;
        cursor: pointer;
    }
    .key {
        margin-right: 10px;
    }
}
</style>
