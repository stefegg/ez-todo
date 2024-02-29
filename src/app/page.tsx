import Link from "next/link";
import { prisma } from "@/db";
import { TodoItem } from "@/components/TodoItem";
import { revalidatePath } from "next/cache";
function getTodos() {
  return prisma.todo.findMany();
}
async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({
    where: { id },
    data: { complete, updatedAt: new Date(Date.now()) },
  });
  revalidatePath("/");
}
async function todoDelete(id: string) {
  "use server";
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/");
}
export default async function Home() {
  const todos = await getTodos();
  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="gap-2 flex flex-col">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            todoDelete={todoDelete}
          />
        ))}
      </ul>
    </>
  );
}
