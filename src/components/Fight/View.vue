<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Camp } from './animation';

const viewEl = ref<HTMLDivElement>();

function importSoldier(camp: Camp, name: string, duration: number) {
    console.log(
        '🚀 ~ file: view.vue:6 ~ importSoldier ~ name:',
        camp,
        name,
        duration
    );
}

onMounted(() => {
    // 初始化一下动画
});

defineExpose({
    importSoldier
});
</script>

<template>
    <div ref="viewEl" class="view"></div>
</template>

<style scoped lang="less">
.view {
    background: #e7e7e7;
}
</style>
