import LayoutContainer from "@/components/layout/layout-container";
import {useOutletContext} from "react-router-dom";
import {TODO_STATUS, TodoContextType} from "@/types";
import {filterByStatus} from "@/utils";
import TodosList from "@/features/todo/components/todos-list";

const TodoOpenPage = () => {
    const {todos} = useOutletContext<TodoContextType>();
    const openTodos = filterByStatus(todos, TODO_STATUS.OPEN);

    return (
        <LayoutContainer>
            Todo Open Page
            <TodosList
                todos={openTodos}
                status={TODO_STATUS.OPEN}
            />
        </LayoutContainer>
    )
}

export default TodoOpenPage;