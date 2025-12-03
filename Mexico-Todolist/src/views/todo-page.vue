<script setup lang="ts">

import { computed } from "vue";
import { useTodoCategories } from "../composables/useTodoCategories";
import { useTodoItems } from "../composables/useTodoItems";

import TodoCategory from "../components/todo-categories.vue";
import AddCategory from "../components/todo-addcategory.vue";

const categories = useTodoCategories();
const items = useTodoItems();

const orderedCategories = computed(() =>
  [...categories.categories.value].reverse()
);

const onDeleteCategory = (id: string) => categories.confirmDeleteCategory(id);
const onEditCategory = (id: string, title: string) =>
  categories.updateCategory(id, title);

const onAddItem = (categoryId: string, title: string) =>
  items.addItem(categoryId, title);

const onEditItem = (categoryId: string, itemId: string, newTitle: string) =>
  items.updateItem(categoryId, itemId, newTitle);

const onToggleItem = (categoryId: string, itemId: string) =>
  items.toggleItem(categoryId, itemId);

const onDeleteItem = (categoryId: string, itemId: string) =>
  items.deleteItem(categoryId, itemId);

</script>


<template>

  <div class="todo-page">
    <header class="page-header">
      <h1>TODO</h1>
    </header>

    <add-category :isAdding="categories.isAddingCategory.value" :newTitle="categories.newCategoryTitle.value"
      @start="categories.startAdding()" @save="categories.addCategory" @cancel="categories.finishAdding()" />

    <div v-if="categories.categories.value.length === 0" class="empty-state">
      <h2>No categories yet!</h2>
      <p>Create your first TODO category to get started.</p>
    </div>

    <div class="category-grid">
      <todo-category v-for="category in orderedCategories" :key="category.id" :category="category"
        @delete="onDeleteCategory" @edit-title="onEditCategory" @add-item="onAddItem" @edit-item="onEditItem"
        @toggle-item="onToggleItem" @delete-item="onDeleteItem" class="category-card" />
    </div>

  </div>

</template>

<style scoped>
.todo-page {
  width: 100%;
  min-height: 100vh;
  background: #f4f4f5;
  padding: 2rem 1.5rem 3rem;
  box-sizing: border-box;
}

.page-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.page-header h1 {
  font-size: 2rem;
  margin: 0;
  color: #111827;
}

.empty-state {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  text-align: center;
  margin: 1rem auto 2rem;
  max-width: 600px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding-bottom: 2rem;
}
</style>
