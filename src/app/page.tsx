import Link from "next/link";
import { prisma } from "@/db";
import { TodoItem } from "@/components/TodoItem";
import { revalidatePath } from "next/cache";
import { FilterBar } from "@/components/FilterBar";
import { getTodos } from "@/utils";

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
      <FilterBar todos={todos} />
    </>
  );
}
