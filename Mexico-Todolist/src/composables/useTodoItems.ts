import { useTodoStore } from '../stores/todoStores';

export function useTodoItems() {
  const store = useTodoStore();

  const addItem = (categoryId: string, title: string) => {
    store.addItem(categoryId, title);
  };

  const updateItem = (categoryId: string, itemId: string, newTitle: string) => {
    store.updateItem(categoryId, itemId, newTitle);
  };

  const toggleItem = (categoryId: string, itemId: string) => {
    store.toggleItemComplete(categoryId, itemId);
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    if (confirm("Delete this item?")) {
      store.deleteItem(categoryId, itemId);
    }
  };

  return {
    addItem,
    updateItem,
    toggleItem,
    deleteItem,
  };
}
