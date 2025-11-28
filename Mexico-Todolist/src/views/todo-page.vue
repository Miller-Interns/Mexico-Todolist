<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';
import { useTodoCategories } from '../composables/useTodoCategories';
import { useTodoItems } from '../composables/useTodoItems';
import TodoCategory from '../components/todo-categories.vue';

const categoryControls = useTodoCategories();
const itemControls = useTodoItems();

const newCategoryInput = ref<HTMLInputElement | null>(null);

watch(() => categoryControls.isAddingCategory.value, async (isAdding) => {
  if (isAdding) {
    await nextTick();
    newCategoryInput.value?.focus();
  }
});

const handleDeleteCategory = (categoryId: string) => {
  categoryControls.confirmDeleteCategory(categoryId);
};

const handleEditCategoryTitle = (categoryId: string, newTitle: string) => {
  categoryControls.updateCategory(categoryId, newTitle);
};

const handleAddItem = (categoryId: string, title: string) => {
  itemControls.addItem(categoryId, title);
};

const handleEditItem = (categoryId: string, itemId: string, newTitle: string) => {
  itemControls.updateItem(categoryId, itemId, newTitle);
};

const handleToggleItem = (categoryId: string, itemId: string) => {
  itemControls.toggleItem(categoryId, itemId);
};

const handleDeleteItem = (categoryId: string, itemId: string) => {
  itemControls.deleteItem(categoryId, itemId);
};
</script>

<style scoped>

.todo-page {
  padding: 2rem;
  background: #f4f4f5;
  border-radius: 12px;
  max-width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  margin: 0;
  color: #111827;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.empty-state {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  color: #111827;
}

.empty-state h2 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.empty-state p {
  margin: 0;
  opacity: 0.8;
}

.add-category-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.btn-add-category,
.btn-save,
.btn-cancel {
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  border: 1px solid #4f46e5;
  background: #4f46e5;      
  color: #ffffff;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-save:hover,
.btn-add-category:hover {
  background: #4338ca;
  border-color: #4338ca;
}

.btn-cancel {
  background: #ffffff;
  color: #4f46e5;
  border: 1px solid #4f46e5;
}

.btn-cancel:hover {
  background: #f0f0ff;
}

.category-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  outline: none;
  min-width: 200px;
  box-sizing: border-box;
}

.category-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.add-category-form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

</style>

<template>
  <div class="todo-page">
    <header class="page-header">
      <h1>TODO</h1>
    </header>

    <div class="container">

      <div v-if="categoryControls.categories.value.length === 0" class="empty-state">
        <h2>No categories yet!</h2>
        <p>Create your first TODO category to get started.</p>
      </div>

      <todo-category
        v-for="category in categoryControls.categories.value"
        :key="category.id"
        :category="category"
        @delete="handleDeleteCategory"
        @edit-title="handleEditCategoryTitle"
        @add-item="handleAddItem"
        @edit-item="handleEditItem"
        @toggle-item="handleToggleItem"
        @delete-item="handleDeleteItem"
      />

      <div class="add-category-section">
        <div v-if="!categoryControls.isAddingCategory.value">
          <button @click="categoryControls.startAdding()" class="btn-add-category">
            + Add New Category
          </button>
        </div>
        <div v-else class="add-category-form">
          <input 
            v-model="categoryControls.newCategoryTitle.value"
            @keyup.enter="categoryControls.addCategory(categoryControls.newCategoryTitle.value)"
            @keyup.esc="categoryControls.finishAdding()"
            placeholder="Enter category title..."
            ref="newCategoryInput"
            class="category-input"
          />
          <button @click="categoryControls.addCategory(categoryControls.newCategoryTitle.value)" class="btn-save">Save</button>
          <button @click="categoryControls.finishAdding()" class="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
