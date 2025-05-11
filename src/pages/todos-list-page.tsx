import LayoutContainer from "@/components/layout/layout-container";
import TodosList from "@/features/todo/components/todos-list";
import {useOutletContext} from "react-router-dom";
import {TodoContextType} from "@/types";

const TodosListPage = () => {
    const { todos } = useOutletContext<TodoContextType>();
    return (
        <LayoutContainer>
            <TodosList todos={todos} />
        </LayoutContainer>
    )
}

export default TodosListPage;