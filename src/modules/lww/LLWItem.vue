<script setup lang="ts">
import { ref } from 'vue';
import DataCard from '../../components/DataCard.vue';
import Input from '../../components/Input.vue';
import { LWWModel } from './LLWModel';

const props = defineProps<{
    name: string;
}>();

const model = new LWWModel(props.name, 'lww');

const viewValue = ref(model.lww.value);

const viewState = ref(model.lww.state);

model.on('change', (value, state) => {
    viewValue.value = value;

    viewState.value = state;
});

const set = (value: string) => {
    model.set(value, 1300);
};
</script>

<template>
    <DataCard :name="name" class="left">
        <div class="header">
            <div class="name">{{ props.name }}</div>
            <div class="clock">{{ viewState.timestamp }}</div>
        </div>
        <Input :model-value="viewValue" @update:model-value="set" />
    </DataCard>
</template>

<style scoped lang="less">
.content {
    display: flex;
    .left {
        margin-right: 280px;
    }
    .header {
        display: flex;
        justify-content: space-between;
        color: rgb(36, 25, 105);
    }
}
</style>
