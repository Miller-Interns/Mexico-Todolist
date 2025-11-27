<script setup lang="ts">
import { ref, nextTick } from 'vue';
import type { TodoCategory } from '../types/TodoTypes';
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
  if (editTitle.value.trim()) {
    emit('editTitle', props.category.id, editTitle.value.trim());
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
  if (newItemTitle.value.trim()) {
    emit('addItem', props.category.id, newItemTitle.value.trim());
    newItemTitle.value = '';
    newItemInput.value?.focus();
  }
};
</script>

<style scoped>

.category-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #111827;
}

.category-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-title {
  margin: 0;
  cursor: pointer;
}

.title-input,
.new-item-input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  background: #ffffff;
  border-radius: 6px;
  min-width: 180px;
  color: #111827;
}

button {
  cursor: pointer;
  border-radius: 6px;
  font-size: 0.9rem;
}

.btn-add,
.btn-save,
.btn-save-small {
  background: #4f46e5;  
  color: #ffffff;
  border: 1px solid #4f46e5;
}

.btn-add:hover,
.btn-save:hover,
.btn-save-small:hover {
  background: #4338ca;
  border-color: #4338ca;
}

.btn-cancel,
.btn-cancel-small,
.btn-edit-category {
  background: #e5e7eb;
  border: 1px solid #d1d5db;
  color: #111827;
}

.btn-cancel:hover,
.btn-cancel-small:hover,
.btn-edit-category:hover {
  background: #d1d5db;
}

.btn-delete-category {
  background: #fef2f2;
  border: 1px solid #fca5a5;
  color: #b91c1c;
}

.btn-delete-category:hover {
  background: #fee2e2;
}

.items-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty-message {
  opacity: 0.7;
  font-size: 0.9rem;
  padding: 0.5rem 0;
}

.add-item-section {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.add-item-form,
.title-edit {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.category-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

</style>


<template>

  <div class="category-card">
    <div class="category-header">
      <h2 v-if="!isEditingTitle" @dblclick="startEditTitle" class="category-title">
        {{ category.title }}
      </h2>
      <div v-else class="title-edit">
        <input 
          v-model="editTitle"
          @keyup.enter="saveTitle"
          @keyup.esc="cancelEditTitle"
          ref="titleInput"
          class="title-input"
        />
        <button @click="saveTitle" class="btn-save-small">Save</button>
        <button @click="cancelEditTitle" class="btn-cancel-small">Cancel</button>
      </div>
      
      <div class="category-actions">
        <button @click="startEditTitle" class="btn-edit-category">Edit Title</button>
        <button @click="$emit('delete', category.id)" class="btn-delete-category">Delete Category</button>
      </div>
    </div>

    <div class="items-section">
      <div v-if="category.items.length === 0" class="empty-message">
        No items yet. Add your first TODO item!
      </div>
      
      <todo-item
        v-for="item in category.items"
        :key="item.id"
        :item="item"
        @toggle="(itemId) => $emit('toggleItem', category.id, itemId)"
        @edit="(itemId, newTitle) => $emit('editItem', category.id, itemId, newTitle)"
        @delete="(itemId) => $emit('deleteItem', category.id, itemId)"
      />
    </div>

    <div class="add-item-section">
      <div v-if="!isAddingItem">
        <button @click="startAddItem" class="btn-add">+ Add Item</button>
      </div>
      <div v-else class="add-item-form">
        <input 
          v-model="newItemTitle"
          @keyup.enter="saveNewItem"
          @keyup.esc="cancelAddItem"
          placeholder="Enter item title..."
          ref="newItemInput"
          class="new-item-input"
        />
        <button @click="saveNewItem" class="btn-save">Save</button>
        <button @click="cancelAddItem" class="btn-cancel">Cancel</button>
      </div>
    </div>
  </div>
  
</template>