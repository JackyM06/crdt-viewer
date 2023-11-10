<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Animation } from './animation';

const viewEl = ref<HTMLDivElement>();

const animation = new Animation();

onMounted(() => {
    if (viewEl.value) {
        animation.start(viewEl.value);
    }
});

defineExpose({
    importSoldier: animation.importText
});
</script>

<template>
    <div ref="viewEl" class="view"></div>
</template>

<style scoped lang="less">
.view {
    background: #fff;
}
</style>
