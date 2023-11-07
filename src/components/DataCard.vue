<script setup lang="ts">
const props = defineProps<{
    name: string;
}>();
</script>

<template>
    <div>
        <div class="title">
            ID:
            <span class="name">
                {{ props.name }}
            </span>
        </div>
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
.title {
    color: #675c9c;
    text-align: left;
    .name {
        font-weight: bolder;
    }
}
.container {
    min-width: 220px;
    min-height: 40px;
    padding: 10px;
    background-color: #dbdbdb;
    border-radius: 6px;
}
</style>
