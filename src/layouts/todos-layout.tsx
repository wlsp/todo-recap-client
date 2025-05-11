import LayoutContainer from "@/components/layout/layout-container";
import Title from "@/components/ui/title";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import TodoForm from "@/features/todo/components/todo-form";
import {TODO_STATUS, TodoType} from "@/types";
import {addTodo} from "@/features/todo/api";
import {toast} from "sonner";

const TodosLayout = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const  getAllTodos =  () => {
           axios
            .get("/api/todo")
            .then(res => {
                setTodos(res.data);
            })
            .catch(error => {
                toast.error(`Could not get todos! Try again later.  Error: ${error.message}`)
            })
    }

    useEffect( () => {
        getAllTodos();
    },[])

    const handleAdd = async (description: string, status: TODO_STATUS) => {
         await addTodo(description, status);
         getAllTodos();
    }

    return (
        <LayoutContainer className="todos-layout relative">
            <Title>Todo's</Title>
            <Outlet context={{todos, refreshTodos: getAllTodos}} />
            <TodoForm onAdd={handleAdd} getAllTodos={getAllTodos} />
        </LayoutContainer>
    )
}

export default TodosLayout;