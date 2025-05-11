import {twMerge} from "tailwind-merge";
import {ClassValue, clsx} from "clsx";
import {TODO_STATUS, TodoType} from "@/types";

export const FullYear = () => new Date().getFullYear();

export function dateFormat(date: string) {
    const formatedDate = new Date(date);
    return new Intl.DateTimeFormat("de-DE", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(formatedDate);
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function filterByStatus(todos: TodoType[], status: TODO_STATUS): TodoType[] {
    return (todos ?? []).filter(todo => todo.status === status);
}