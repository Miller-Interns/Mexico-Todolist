export interface TodoItem { // single task
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoCategory { // group of tasks
  id: string;
  title: string;
  items: TodoItem[];
  createdAt: Date;
}