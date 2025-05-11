import axios from "axios";
import {TODO_STATUS, TodoType} from "@/types";
import {toast} from "sonner";

export const addTodo = async (description: string, status: TODO_STATUS) => {
    await axios.post("/api/todo", {
        description: description,
        status: status,
    }).then((res) => {
        if (res.status === 200) {
            toast.success(`${res.data.description} added`)
        }
    }).catch(error => {
            toast.error(`Could not add todo. Try again later. Error:${error.message}`)
        }
    )
}

export const deleteTodoById = async (tid: string) => {
    await axios.delete(`/api/todo/${tid}`).then(res => {
        if (res.status === 200) {
            toast.success(`Todo deleted:${tid}`)
        }
    }).catch(error => {
        toast.error(`Could not delete Todo with the id: ${tid}. Error: ${error.message}`)
    })
}


export const updateTodo = async (todo: TodoType) => {
    await axios.put(`/api/todo/${todo.id}/update`, {
        id: todo.id,
        description: todo.description,
        status: todo.status,
    }).then(res => {
        if (res.status === 200) {
            toast.success(`${res.data.description} updated.`)
        }
    }).catch(error => {
        toast.error(`Error while updating todo with the id: ${todo}. Error: ${error.message}`)
    })
};

export const getTodoById = async (tid: string): Promise<TodoType | undefined> => {
    try {
        const res = await axios.get(`/api/todo/${tid}`);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error: unknown) {
        if(error instanceof Error) {
            toast.error(`Could not get the todo with the id: ${tid}. Error: ${error.message}`);
        } else {
            toast.error(`Could not get the todo with the id: ${tid}. Error: Unknown. Good look thought`);
        }
    }
};