<script setup lang="ts">
import { ref, nextTick } from 'vue';
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon
} from "@heroicons/vue/24/solid";

import type { TodoItem } from '../types/Types';

const props = defineProps<{
  item: TodoItem;
}>();

const emit = defineEmits<{
  toggle: [itemId: string];
  edit: [itemId: string, newTitle: string];
  delete: [itemId: string];
}>();

const isEditing = ref(false);
const editTitle = ref('');
const editInput = ref<HTMLInputElement | null>(null);

const startEdit = async () => {
  isEditing.value = true;
  editTitle.value = props.item.title;
  await nextTick();
  editInput.value?.focus();
};

const cancelEdit = () => {
  isEditing.value = false;
  editTitle.value = '';
};

const saveEdit = () => {
  if (editTitle.value.trim()) {
    emit('edit', props.item.id, editTitle.value.trim());
    isEditing.value = false;
  }
};
</script>

<template>

  <div class="todo-item" :class="{ completed: item.completed }">
    <div v-if="!isEditing" class="item-view">
      <input type="checkbox" :checked="item.completed" @change="$emit('toggle', item.id)" class="checkbox" />

      <span class="item-title" @dblclick="startEdit">{{ item.title }}</span>

      <div class="item-actions">
        <button @click="startEdit" class="icon-btn edit">
          <PencilIcon class="icon" />
        </button>

        <button @click="$emit('delete', item.id)" class="icon-btn delete">
          <TrashIcon class="icon" />
        </button>
      </div>
    </div>

    <div v-else class="item-edit">
      <input v-model="editTitle" @keyup.enter="saveEdit" @keyup.esc="cancelEdit" ref="editInput" class="edit-input" />

      <button @click="saveEdit" class="icon-btn save">
        <CheckIcon class="icon" />
      </button>

      <button @click="cancelEdit" class="icon-btn cancel">
        <XMarkIcon class="icon" />
      </button>
    </div>
  </div>

</template>

<style scoped>
.todo-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #111827;
}

.todo-item.completed .item-title {
  text-decoration: line-through;
  opacity: 0.6;
}

.item-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.checkbox {
  width: 1.1rem;
  height: 1.1rem;
  cursor: pointer;
  accent-color: #4f46e5;
}

.item-title {
  flex: 1;
  cursor: pointer;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  border: none;
  background: none;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 20px;
  height: 20px;
  display: block;
}

.icon-btn.edit:hover {
  background: #eef2ff;
}

.icon-btn.delete {
  color: #b91c1c;
}

.icon-btn.delete:hover {
  background: #fee2e2;
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

.item-edit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: nowrap;
  width: 100%;
}

.edit-input {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  color: #111827;
  box-sizing: border-box;
}
</style>
