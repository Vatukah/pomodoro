import { create } from "zustand";
import type { ITodo } from "../type";

import type { UUIDTypes } from "../type";

export interface ITodoStore {
  todos: ITodo[];
  activeTodoId: UUIDTypes | null;

  addTodo(todo: ITodo): void;
  updateTodo(id: UUIDTypes, data: Partial<ITodo>): void;
  deleteTodo(id: UUIDTypes): void;

  activateTodo(id: UUIDTypes): void;
  deactivateActiveTodo(): void;
  markCompleted(id: UUIDTypes): void;
  getTodos():ITodo[];
}

export const useTodoStore = create<ITodoStore>((set, get) => ({
  todos: [],
  activeTodoId: null,
  addTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),
  updateTodo: (id, data) =>
    set((state) => {
      const nextTodos = state.todos.map((todo) => {
        if (todo.id !== id) return todo;

        const updateTodo = { ...todo, ...data };

        return {
          ...updateTodo,
          status: resolveTodoStatus(updateTodo),
        };
      });
      return { todos: nextTodos };
    }),
  deleteTodo: (id) =>
    set((state) => {
      const filtered = state.todos.filter((todo) => todo.id !== id);
      return { todos: filtered };
    }),
  activateTodo: (id) => {
    const { activeTodoId } = get();
    if (activeTodoId === id) return;

    set({ activeTodoId: id });
  },

  deactivateActiveTodo: () => {
    const { activeTodoId } = get();

    if (!activeTodoId) return;

    set({
      activeTodoId: null,
    });
  },
  markCompleted: (id) => {
    const { activeTodoId, todos, updateTodo } = get();
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    updateTodo(todo.id, { completedPomo: todo.estimatedPomo });

    if (activeTodoId && activeTodoId === todo.id) {
      set({ activeTodoId: null });
    }
  },
  getTodos: ()=> get().todos
}));

function resolveTodoStatus(todo: ITodo): ITodo["status"] {
  if (todo.completedPomo >= todo.estimatedPomo) return "completed";
  return "pending";
}
