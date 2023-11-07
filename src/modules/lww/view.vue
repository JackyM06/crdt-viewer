<script setup lang="ts">
import LLWItem from './LLWItem.vue';
</script>

<template>
    <h2>CRDT: LWW Register</h2>

    <div>
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
