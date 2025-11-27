import { ref, computed } from 'vue';
import { useTodoStore } from '../stores/todoStores';

export function useTodoCategories() {
  const store = useTodoStore();

  const isAddingCategory = ref(false);
  const newCategoryTitle = ref('');

  const categories = computed(() => store.categories);

  const startAdding = () => {
    isAddingCategory.value = true;
  };

  const finishAdding = () => {
    isAddingCategory.value = false;
    newCategoryTitle.value = '';
  };

  const addCategory = (title: string) => {
    if (!title.trim()) return;
    store.addCategory(title);
    finishAdding();
  };

  const updateCategory = (categoryId: string, newTitle: string) => {
    store.updateCategory(categoryId, newTitle);
  };

  const confirmDeleteCategory = (categoryId: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      store.deleteCategory(categoryId);
    }
  };

  return {
    isAddingCategory,
    newCategoryTitle,
    categories,         
    startAdding,
    finishAdding,
    addCategory,
    updateCategory,
    confirmDeleteCategory,
  };
}
