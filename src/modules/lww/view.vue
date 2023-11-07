<script setup lang="ts">
import { ref } from 'vue';
import LLWItem from './LLWItem.vue';

const delay = ref(100);
</script>

<template>
    <h2>CRDT: LWW Register</h2>

    <div>
        <div>
            <el-slider v-model="delay" />
        </div>
        <div class="content">
            <LLWItem name="alice"></LLWItem>
            <LLWItem name="Bob"></LLWItem>
        </div>
    </div>
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
./LLWModel
