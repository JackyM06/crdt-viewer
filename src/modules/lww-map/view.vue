<script setup lang="ts">
import { ref } from 'vue';
import LLWItem from './LLWItem.vue';
import NetworkSwitch from '../../components/NetworkSwitch.vue';
import Slider from '../../components/Slider.vue';
import FightView from '../../components/Fight/View.vue';
import { Camp } from '../../components/Fight/animation';

const delay = ref(500);

const network = ref(true);

const fightView = ref<InstanceType<typeof FightView>>();

const onAliceInput = (value: string) => {
    fightView.value?.importSoldier(Camp.LEFT, value, delay.value);
};

const onBobInput = (value: string) => {
    fightView.value?.importSoldier(Camp.RIGHT, value, delay.value);
};
</script>

<template>
    <h2>CRDT: LWW Map</h2>
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
            <LLWItem
                :delay="delay"
                :network="network"
                name="alice"
                @input="onAliceInput"
            ></LLWItem>
            <FightView ref="fightView" class="fight-view"></FightView>
            <LLWItem
                :delay="delay"
                :network="network"
                name="bob"
                @input="onBobInput"
            ></LLWItem>
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
            opacity: .6;
        }
    }
}
.content {
    display: flex;
    .fight-view {
        width: 280px;
    }
}
</style>
./LLWModel
