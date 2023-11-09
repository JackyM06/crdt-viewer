<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: number;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
}>();

const timeoutEnum = [
    0,
    50,
    100,
    300,
    500,
    1000,
    2000,
    5000,
    10 * 1000,
    20 * 1000
];

const index = computed(() => {
    return timeoutEnum.indexOf(props.modelValue) + 1;
});

function update(value: number) {
    emit('update:modelValue', timeoutEnum[value - 1]);
}
</script>

<template>
    <el-slider
        class="slider"
        :min="1"
        :max="10"
        :modelValue="index"
        :show-tooltip="false"
        @update:modelValue="update"
    ></el-slider>
</template>

<style scoped lang="less">
.slider {
    width: 160px;
    :deep(.el-slider__bar) {
        background-color: rgb(108, 79, 255);
    }
    :deep(.el-slider__button) {
        border-color: rgb(108, 79, 255);
    }
}
</style>
