"use client";
import { format } from "date-fns";
import { Todo } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  createdAt: Date;
  updatedAt: Date;
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
      }[]
    >
  >;
  arrayIndex: number;
};

export function TodoItem({
  id,
  title,
  complete,
  createdAt,
  updatedAt,
  toggleTodo,
  todoDelete,
  showTodos,
  setShowTodos,
  arrayIndex,
}: TodoItemProps) {
  const todoDeleteClick = () => {
    todoDelete(id);
    showTodos.splice(arrayIndex, 1);
    setShowTodos(showTodos);
  };
  return (
    <li
      className="flex border-2 border-slate-300 rounded p-2 flex-col"
      key={id}
    >
      <div className="flex flex-row gap-2 items-center">
        <input
          id={id}
          type="checkbox"
          className="cursor-pointer peer"
          defaultChecked={complete}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className="cursor-pointer peer-checked:text-slate-500 peer-checked:line-through"
        >
          {title}
        </label>
        <button
          className="rounded-xl w-6 border border-red-500 text-red-500 text-sm ml-auto"
          onClick={() => todoDeleteClick()}
        >
          X
        </button>
      </div>
      <div className="flex flex-row gap-2 text-sm">
        <div>Created At: {format(createdAt, "MM/dd/yyyy, hh:mm:ss a")}</div>
        <div>Updated At: {format(updatedAt, "MM/dd/yyyy, hh:mm:ss a")}</div>
      </div>
    </li>
  );
}
