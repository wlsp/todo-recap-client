import LayoutContainer from "@/components/layout/layout-container";
import {TODO_STATUS, TodoListProps} from "@/types";
import {filterByStatus} from "@/utils";
import renderTodos from "@/features/todo/components/render-todos";
import {useOutletContext} from "react-router-dom";

const TodosList = ({todos, status}: TodoListProps) => {
    const { refreshTodos } = useOutletContext<{ refreshTodos: () => void }>();
    if (status) {
        const filtered = filterByStatus(todos, status);
        return (
            <LayoutContainer className="p-6">
                {renderTodos(status, filtered, refreshTodos)}
            </LayoutContainer>
        );
    }

    return (
        <LayoutContainer className="p-6 flex flex-row gap-4">
            {renderTodos(TODO_STATUS.OPEN, filterByStatus(todos, TODO_STATUS.OPEN), refreshTodos)}
            {renderTodos(TODO_STATUS.IN_PROGRESS, filterByStatus(todos, TODO_STATUS.IN_PROGRESS), refreshTodos)}
            {renderTodos(TODO_STATUS.DONE, filterByStatus(todos, TODO_STATUS.DONE), refreshTodos)}
        </LayoutContainer>
    );
};

export default TodosList;