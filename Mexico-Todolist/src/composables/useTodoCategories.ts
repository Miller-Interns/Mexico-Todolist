import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todoStores'

export function useTodoCategories() {
  const store = useTodoStore()

  const isAddingCategory = ref(false)
  const newCategoryTitle = ref('')

  const categories = computed(() => store.categories)

  const startAdding = () => {
    isAddingCategory.value = true
  }

  const finishAdding = () => {
    isAddingCategory.value = false
    newCategoryTitle.value = ''
  }

  const addCategory = (title: string) => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    const exists = store.categories.some(
      (cat) => cat.title.toLowerCase() === trimmedTitle.toLowerCase()
    )
    if (exists) {
      alert('Category already exists')
      return
    }

    store.addCategory(trimmedTitle)
    finishAdding()
  }

  const updateCategory = (categoryId: string, newTitle: string) => {
    const trimmedTitle = newTitle.trim()
    if (!trimmedTitle) return

    const exists = store.categories.some(
      (cat) => cat.id !== categoryId && cat.title.toLowerCase() === trimmedTitle.toLowerCase()
    )
    if (exists) {
      alert('Category already exists')
      return
    }

    store.updateCategory(categoryId, trimmedTitle)
  }

  const confirmDeleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      store.deleteCategory(categoryId)
    }
  }

  return {
    isAddingCategory,
    newCategoryTitle,
    categories,
    startAdding,
    finishAdding,
    addCategory,
    updateCategory,
    confirmDeleteCategory,
  }
}
