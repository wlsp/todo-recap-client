import LayoutContainer from "@/components/layout/layout-container";
import {TODO_STATUS, TodoContextType} from "@/types";
import {useOutletContext} from "react-router-dom";
import {filterByStatus} from "@/utils";
import TodosList from "@/features/todo/components/todos-list";

const TodoDonePage = () => {
    const {todos} = useOutletContext<TodoContextType>();
    const doneTodos = filterByStatus(todos, TODO_STATUS.DONE);
    return (
        <LayoutContainer>
            Todo done Page
            <TodosList
                todos={doneTodos}
                status={TODO_STATUS.DONE}
            />
        </LayoutContainer>
    )
}

export default TodoDonePage;