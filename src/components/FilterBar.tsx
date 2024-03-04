"use client";
import { useState } from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "@prisma/client";
import { toggleTodo, todoDelete } from "@/utils";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

type FilterBarProps = {
  todos: Todo[];
};

export function FilterBar({ todos }: FilterBarProps) {
  const [showTodos, setShowTodos] = useState(todos);
  const [activeFilter, setActiveFilter] = useState("all");
  const clickIncomp = () => {
    const x = todos.filter((todo: Todo) => todo.complete !== true);
    setShowTodos(x);
  };
  const clickComp = () => {
    const x = todos.filter((todo: Todo) => todo.complete === true);
    setShowTodos(x);
  };
  const clickAll = () => {
    setShowTodos(todos);
  };
  return (
    <>
      <div className="flex border-2 border-slate-300 rounded gap-2 p-2 mb-2 w-1/4 justify-evenly">
        <div
          onClick={() => clickAll()}
          className="p-1 rounded cursor-pointer flex w-1/3 justify-center hover:bg-slate-700"
        >
          All
        </div>
        <div
          onClick={() => clickIncomp()}
          className="p-1 rounded cursor-pointer flex w-1/3 justify-center hover:bg-slate-700"
        >
          Incomplete
        </div>
        <div
          onClick={() => clickComp()}
          className="p-1 rounded cursor-pointer flex w-1/3 justify-center hover:bg-slate-700"
        >
          Complete
        </div>
      </div>
      <ul className="gap-2 flex flex-col">
        {showTodos.map((todo: Todo, idx) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            todoDelete={todoDelete}
            showTodos={showTodos}
            setShowTodos={setShowTodos}
            arrayIndex={idx}
          />
        ))}
      </ul>
    </>
  );
}
