<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: string;
}>();

const input = ref(props.modelValue);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

watch(
    () => props.modelValue,
    () => {
        input.value = props.modelValue;
    },
    {
        immediate: true
    }
);

watch(
    () => input.value,
    () => {
        emit('update:modelValue', input.value);
    }
);
</script>

<template>
    <div class="input-container">
        <input type="text" v-model="input" />
    </div>
</template>

<style scoped lang="less">
.input-container {
    display: flex;
}
input {
    flex: 1;
    height: 30px;
    padding: 2px 8px;
    border: none;
    border-radius: 4px;
    outline: none;
}
</style>
