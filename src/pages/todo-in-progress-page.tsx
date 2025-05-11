import LayoutContainer from "@/components/layout/layout-container";
import {useOutletContext} from "react-router-dom";
import {filterByStatus} from "@/utils";
import {TODO_STATUS, TodoContextType} from "@/types";
import TodosList from "@/features/todo/components/todos-list";

const TodoInProgressPage = () => {
    const {todos} = useOutletContext<TodoContextType>();
    const inProgressTodos = filterByStatus(todos, TODO_STATUS.IN_PROGRESS);

    return (
        <LayoutContainer>
            Todo In Progress Page
            <TodosList
                todos={inProgressTodos}
                status={TODO_STATUS.IN_PROGRESS}
            />
        </LayoutContainer>
    )
}

export default TodoInProgressPage;