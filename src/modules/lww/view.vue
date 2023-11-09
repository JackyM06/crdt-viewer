<script setup lang="ts">
import { ref } from 'vue';
import LLWItem from './LLWItem.vue';
import NetworkSwitch from '../../components/NetworkSwitch.vue';
import Slider from '../../components/Slider.vue';

const delay = ref(500);

const network = ref(true);
</script>

<template>
    <h2>CRDT: LWW Register</h2>

    <div>
        <div class="control-group">
            <div class="control">
                <span class="label">Network</span>
                <NetworkSwitch v-model="network"></NetworkSwitch>
            </div>
            <div class="control">
                <span class="label">Latency</span>
                <Slider v-model="delay"></Slider>
            </div>
        </div>
        <div class="content">
            <LLWItem :delay="delay" :network="network" name="alice"></LLWItem>
            <LLWItem :delay="delay" :network="network" name="bob"></LLWItem>
        </div>
    </div>
</template>

<style scoped lang="less">
.control-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .control {
        display: flex;
        align-items: center;
        margin-right: 40px;
        .label {
            margin-right: 10px;
            color: rgb(36, 25, 105);
            opacity: 0.6;
        }
    }
}
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
