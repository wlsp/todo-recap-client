import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeadingSize, TodoType } from "@/types";
import LayoutContainer from "@/components/layout/layout-container";
import Title from "@/components/ui/title";
import TodoItem from "@/features/todo/components/todo-item";
import {getTodoById} from "@/features/todo/api";
import DualRingSpinner from "@/components/shared/dual-ring-spinner";

const TodoDetailPage = () => {
    const { tid } = useParams<{ tid: string }>();
    const hasTid = Boolean(tid);
    const [todo, setTodo] = useState<TodoType | undefined>(undefined);

    useEffect(() => {
        if (!tid) return;

        const fetchTodo = async () => {
            const data = await getTodoById(tid);
            if (data) setTodo(data);
        };

        fetchTodo();
    }, [tid]);

    const refreshTodos = async () => {
        if (!tid) return;
        const data = await getTodoById(tid);
        if (data) setTodo(data);
    };

    if (!tid) return <div>Sorry.. no tid</div>;

    return (
        <LayoutContainer className="p-6">
            <Title size={HeadingSize.large}>Todo Detail Page</Title>
            {!todo ? (
                <DualRingSpinner />
            ) : (
                <TodoItem
                    todo={todo}
                    refreshTodos={refreshTodos}
                    hasParams={hasTid}
                />
            )}
        </LayoutContainer>
    );
};

export default TodoDetailPage;
