"use client";
import { format } from "date-fns";
import { ChangeEvent } from "react";
import { TodoItemProps } from "@/app/types";

export function TodoItem({
  id,
  title,
  complete,
  createdAt,
  updatedAt,
  priority,
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
  const toggleTodoClick = (e: ChangeEvent<HTMLInputElement>) => {
    toggleTodo(id, e.target.checked);
    showTodos.splice(arrayIndex, 1);
    setShowTodos(showTodos);
  };
  console.log(priority, "-------prio");
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
          onChange={(e) => toggleTodoClick(e)}
        />
        <label
          htmlFor={id}
          className="cursor-pointer peer-checked:text-slate-500 peer-checked:line-through"
        >
          {title}
        </label>
        {priority === "true" ? (
          <div className="text-red-500">High Priority</div>
        ) : null}
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
