import { Todo } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: string;
  toggleTodo: (id: string, complete: boolean) => void;
  todoDelete: (id: string) => void;
  showTodos: Todo[];
  setShowTodos: Dispatch<
    SetStateAction<
      {
        id: string;
        title: string;
        complete: boolean;
        createdAt: Date;
        updatedAt: Date;
        priority: string;
      }[]
    >
  >;
  arrayIndex: number;
};

export type TodoListProps = {
  todos: Todo[];
};
