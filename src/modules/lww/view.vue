<script setup lang="ts">
import { ref } from 'vue';
import DataCard from '../../components/DataCard.vue';
import Input from '../../components/Input.vue';
import { LWWModel } from './model';

const alice = new LWWModel('alice', 'lww');

const aliceValue = ref(alice.lww.value);

const aliceState = ref(alice.lww.state);

alice.on('change', (value, state) => {
    aliceValue.value = value;
    aliceState.value = state;
});

const bob = new LWWModel('bob', 'lww');

const bobValue = ref(bob.lww.value);

const bobState = ref(bob.lww.state);

bob.on('change', (value, state) => {
    bobValue.value = value;

    bobState.value = state;
});
</script>

<template>
    <h2>CRDT: LWW Register</h2>

    <div>
        <div class="content">
            <DataCard name="Alice" class="left">
                <div class="header">
                    <div class="name">alice</div>
                    <div class="clock">{{ aliceState.timestamp }}</div>
                </div>
                <Input
                    :model-value="aliceValue"
                    @update:model-value="alice.set"
                />
            </DataCard>
            <DataCard name="Bob" class="left">
                <div class="header">
                    <div class="name">bob</div>
                    <div class="clock">{{ bobState.timestamp }}</div>
                </div>
                <Input :model-value="bobValue" @update:model-value="bob.set" />
            </DataCard>
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
