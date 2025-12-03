export interface TodoItem {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

export interface TodoCategory {
  id: string
  title: string
  items: TodoItem[]
  createdAt: Date
}
