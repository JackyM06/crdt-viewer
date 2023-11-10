<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    modelValue: string;
    label?: string;
}>();

const input = ref(props.modelValue);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const onInput = (e: any) => {
    emit('update:modelValue', e.target.value);
};
</script>

<template>
    <div class="input-container">
        <span v-if="label" class="label">{{ label }}</span>
        <input type="text" :value="props.modelValue" @input="onInput" />
    </div>
</template>

<style scoped lang="less">
.input-container {
    display: flex;
    align-items: center;
    .label {
        margin-right: 10px;
        color: #241969cd;
        font-weight: bolder;
    }
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
