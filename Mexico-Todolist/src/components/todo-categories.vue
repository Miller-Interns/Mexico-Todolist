<script setup lang="ts">
import { ref, nextTick, computed } from 'vue';
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon
} from "@heroicons/vue/24/solid";

import type { TodoCategory } from '../types/Todo';
import TodoItem from '../components/todo-items.vue';

const props = defineProps<{
  category: TodoCategory;
}>();

const emit = defineEmits<{
  delete: [categoryId: string];
  editTitle: [categoryId: string, newTitle: string];
  addItem: [categoryId: string, title: string];
  editItem: [categoryId: string, itemId: string, newTitle: string];
  toggleItem: [categoryId: string, itemId: string];
  deleteItem: [categoryId: string, itemId: string];
}>();

const isEditingTitle = ref(false);
const editTitle = ref('');
const titleInput = ref<HTMLInputElement | null>(null);

const isAddingItem = ref(false);
const newItemTitle = ref('');
const newItemInput = ref<HTMLInputElement | null>(null);

const orderedItems = computed(() =>
  [...props.category.items].reverse()
);

const startEditTitle = async () => {
  isEditingTitle.value = true;
  editTitle.value = props.category.title;
  await nextTick();
  titleInput.value?.focus();
};

const cancelEditTitle = () => {
  isEditingTitle.value = false;
  editTitle.value = '';
};

const saveTitle = () => {
  const trimmed = editTitle.value.trim();
  if (trimmed) {
    emit('editTitle', props.category.id, trimmed);
    isEditingTitle.value = false;
  }
};

const startAddItem = async () => {
  isAddingItem.value = true;
  newItemTitle.value = '';
  await nextTick();
  newItemInput.value?.focus();
};

const cancelAddItem = () => {
  isAddingItem.value = false;
  newItemTitle.value = '';
};

const saveNewItem = () => {
  const trimmed = newItemTitle.value.trim();
  if (trimmed) {
    emit('addItem', props.category.id, trimmed);
    newItemTitle.value = '';
    newItemInput.value?.focus();
  }
};
</script>

<template>
  <div class="category-card">

    <div class="header">

      <div class="title-area">

        <h2 v-if="!isEditingTitle" @dblclick="startEditTitle" class="title-text">
          {{ category.title }}
        </h2>

        <div v-else class="title-edit">
          <input v-model="editTitle" ref="titleInput" @keyup.enter="saveTitle" @keyup.esc="cancelEditTitle"
            class="title-input" />

          <button class="icon-btn save" @click="saveTitle">
            <CheckIcon class="icon" />
          </button>

          <button class="icon-btn cancel" @click="cancelEditTitle">
            <XMarkIcon class="icon" />
          </button>
        </div>
      </div>

      <div class="actions" v-if="!isEditingTitle">
        <button class="icon-btn edit" @click="startEditTitle">
          <PencilIcon class="icon" />
        </button>

        <button class="icon-btn delete" @click="$emit('delete', category.id)">
          <TrashIcon class="icon" />
        </button>
      </div>
    </div>

    <div class="items">
      <div v-if="orderedItems.length === 0 && !isAddingItem" class="empty">
        No items yet. Add your first TODO item!
      </div>

      <todo-item v-for="item in orderedItems" :key="item.id" :item="item"
        @toggle="itemId => $emit('toggleItem', category.id, itemId)"
        @edit="(itemId, newTitle) => $emit('editItem', category.id, itemId, newTitle)"
        @delete="itemId => $emit('deleteItem', category.id, itemId)" />
    </div>

    <div class="add-item">

      <button v-if="!isAddingItem" @click="startAddItem" class="add-item-btn">
        <PlusIcon class="icon" />
        <span>Add Item</span>
      </button>

      <div v-else class="add-item-form">
        <input v-model="newItemTitle" ref="newItemInput" @keyup.enter="saveNewItem" @keyup.esc="cancelAddItem"
          placeholder="Enter item title..." class="new-item-input" />

        <button class="icon-btn save" @click="saveNewItem">
          <CheckIcon class="icon" />
        </button>

        <button class="icon-btn cancel" @click="cancelAddItem">
          <XMarkIcon class="icon" />
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.category-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 350px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title-area {
  flex: 1;
  min-width: 0;
}

.title-text {
  margin: 0;
  font-size: 1.25rem;
  cursor: pointer;
  overflow-wrap: break-word;
}

.title-edit {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  max-width: 100%;
  flex-wrap: nowrap;
}

.title-input {
  padding: 0.4rem 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  flex: 1;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

.actions {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
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

.items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  padding-right: 4px;
  flex: 1;
  min-height: 0;
}

.empty {
  opacity: 0.7;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  text-align: center;
}

.add-item {
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
  flex-shrink: 0;
}

.add-item-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
}

.add-item-btn:hover {
  background: #4338ca;
}

.add-item-form {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.new-item-input {
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  flex: 1;
}
</style>
