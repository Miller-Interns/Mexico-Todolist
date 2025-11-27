<script setup lang="ts">
import { ref, nextTick } from 'vue';
import type { TodoItem } from '../types/TodoTypes';

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

button {
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
  border-radius: 6px;
  cursor: pointer;
}

.btn-save {
  background: #4f46e5;
  color: #ffffff;
  border: 1px solid #4f46e5;
}

.btn-save:hover {
  background: #4338ca;
}

.btn-cancel,
.btn-edit {
  background: #e5e7eb;
  border: 1px solid #d1d5db;
  color: #111827;
}

.btn-cancel:hover,
.btn-edit:hover {
  background: #d1d5db;
}

.btn-delete {
  background: #fef2f2;
  border: 1px solid #fca5a5;
  color: #b91c1c;
}

.btn-delete:hover {
  background: #fee2e2;
}

.item-edit {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.edit-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  color: #111827;
  min-width: 180px;
}
</style>

<template>

  <div class="todo-item" :class="{ completed: item.completed }">
    <div v-if="!isEditing" class="item-view">
      <input 
        type="checkbox" 
        :checked="item.completed"
        @change="$emit('toggle', item.id)"
        class="checkbox"
      />
      <span class="item-title" @dblclick="startEdit">{{ item.title }}</span>
      <div class="item-actions">
        <button @click="startEdit" class="btn-edit">Edit</button>
        <button @click="$emit('delete', item.id)" class="btn-delete">Delete</button>
      </div>
    </div>
    
    <div v-else class="item-edit">
      <input 
        v-model="editTitle"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        ref="editInput"
        class="edit-input"
      />
      <button @click="saveEdit" class="btn-save">Save</button>
      <button @click="cancelEdit" class="btn-cancel">Cancel</button>
    </div>
  </div>
  
</template>