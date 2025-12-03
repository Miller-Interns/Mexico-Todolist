import { useTodoStore } from '../stores/todoStores'

export function useTodoItems() {
  const store = useTodoStore()

  const addItem = (categoryId: string, title: string) => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    const category = store.categories.find((cat) => cat.id === categoryId)
    if (!category) return

    const exists = category.items.some(
      (item) => item.title.toLowerCase() === trimmedTitle.toLowerCase()
    )
    if (exists) {
      alert('Item already exists in this category')
      return
    }

    store.addItem(categoryId, trimmedTitle)
  }

  const updateItem = (categoryId: string, itemId: string, newTitle: string) => {
    const trimmedTitle = newTitle.trim()
    if (!trimmedTitle) return

    const category = store.categories.find((cat) => cat.id === categoryId)
    if (!category) return

    const exists = category.items.some(
      (item) => item.id !== itemId && item.title.toLowerCase() === trimmedTitle.toLowerCase()
    )
    if (exists) {
      alert('Item already exists in this category')
      return
    }

    store.updateItem(categoryId, itemId, trimmedTitle)
  }

  const toggleItem = (categoryId: string, itemId: string) => {
    store.toggleItemComplete(categoryId, itemId)
  }

  const deleteItem = (categoryId: string, itemId: string) => {
    if (confirm('Delete this item?')) {
      store.deleteItem(categoryId, itemId)
    }
  }

  return {
    addItem,
    updateItem,
    toggleItem,
    deleteItem,
  }
}
