<script setup lang="ts">

import { ref, nextTick, watch } from "vue";
import { PlusIcon, CheckIcon, XMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
    isAdding: boolean;
    newTitle: string;
}>();

const emit = defineEmits<{
    (e: "start"): void;
    (e: "save", title: string): void;
    (e: "cancel"): void;
}>();

const localTitle = ref(props.newTitle);
const inputRef = ref<HTMLInputElement | null>(null);

watch(
    () => props.isAdding,
    async (val) => {
        if (val) {
            localTitle.value = "";
            await nextTick();
            inputRef.value?.focus();
        }
    }
);

</script>

<template>
    <div class="add-wrap">

        <button v-if="!isAdding" class="add-btn" @click="emit('start')">
            <PlusIcon class="icon" />
            <span>Add Category</span>
        </button>

        <div v-else class="form">
            <input ref="inputRef" v-model="localTitle" class="input" placeholder="Enter category title..."
                @keyup.enter="emit('save', localTitle)" @keyup.esc="emit('cancel')" />

            <button class="icon-btn save" @click="emit('save', localTitle)">
                <CheckIcon class="icon" />
            </button>

            <button class="icon-btn cancel" @click="emit('cancel')">
                <XMarkIcon class="icon" />
            </button>
        </div>

    </div>
</template>

<style scoped>
.add-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;
}

.add-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #4f46e5;
    color: white;
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.2s ease;
}

.add-btn:hover {
    background: #4338ca;
}

.icon {
    width: 20px;
    height: 20px;
    color: currentColor;
}

.form {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.input {
    padding: 0.65rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    width: 250px;
    font-size: 1rem;
}

.icon-btn {
    border: none;
    padding: 0.5rem;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-btn.save {
    background: #4f46e5;
    color: white;
}

.icon-btn.save:hover {
    background: #4338ca;
}

.icon-btn.cancel {
    background: #e5e7eb;
}

.icon-btn.cancel:hover {
    background: #d1d5db;
}
</style>
