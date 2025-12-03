import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TodoCategory, TodoItem } from '../types/Todo'

export const useTodoStore = defineStore('todo', () => {
  const categories = ref<TodoCategory[]>([])

  const loadFromStorage = () => {
    const stored = localStorage.getItem('todoCategories')
    if (stored) {
      categories.value = JSON.parse(stored)
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('todoCategories', JSON.stringify(categories.value))
  }

  const addCategory = (title: string) => {
    const newCategory: TodoCategory = {
      id: crypto.randomUUID(),
      title,
      items: [],
      createdAt: new Date(),
    }
    categories.value.push(newCategory)
    saveToStorage()
  }

  const updateCategory = (categoryId: string, newTitle: string) => {
    const category = categories.value.find((cat) => cat.id === categoryId)
    if (category) {
      category.title = newTitle
      saveToStorage()
    }
  }

  const deleteCategory = (categoryId: string) => {
    categories.value = categories.value.filter((cat) => cat.id !== categoryId)
    saveToStorage()
  }

  const addItem = (categoryId: string, title: string) => {
    const category = categories.value.find((cat) => cat.id === categoryId)
    if (category) {
      const newItem: TodoItem = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date(),
      }
      category.items.push(newItem)
      saveToStorage()
    }
  }

  const updateItem = (categoryId: string, itemId: string, newTitle: string) => {
    const category = categories.value.find((cat) => cat.id === categoryId)
    if (category) {
      const item = category.items.find((item) => item.id === itemId)
      if (item) {
        item.title = newTitle
        saveToStorage()
      }
    }
  }

  const toggleItemComplete = (categoryId: string, itemId: string) => {
    const category = categories.value.find((cat) => cat.id === categoryId)
    if (category) {
      const item = category.items.find((item) => item.id === itemId)
      if (item) {
        item.completed = !item.completed
        saveToStorage()
      }
    }
  }

  const deleteItem = (categoryId: string, itemId: string) => {
    const category = categories.value.find((cat) => cat.id === categoryId)
    if (category) {
      category.items = category.items.filter((item) => item.id !== itemId)
      saveToStorage()
    }
  }

  loadFromStorage()

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addItem,
    updateItem,
    toggleItemComplete,
    deleteItem,
  }
})
