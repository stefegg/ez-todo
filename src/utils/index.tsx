"use server";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({
    where: { id },
    data: { complete, updatedAt: new Date(Date.now()) },
  });
  revalidatePath("/");
}
export async function todoDelete(id: string) {
  "use server";
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/");
}

export async function getTodos() {
  return prisma.todo.findMany();
}
