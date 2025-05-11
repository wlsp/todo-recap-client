import {HeadingSize, TODO_STATUS, TodoType} from "@/types";
import LayoutContainer from "@/components/layout/layout-container";
import Title from "@/components/ui/title";
import TodoItem from "@/features/todo/components/todo-item";
import { cn } from "@/utils";

const renderTodos = (title: string, items: TodoType[], renderTodos: () => void) => (
    <LayoutContainer className="text-center gap-4">
        <Title
            className={cn("mb-4",
                `text-${title.toLowerCase()}`)}
            size={HeadingSize.xl}>
            {title === TODO_STATUS.IN_PROGRESS ? "IN PROGRESS" : title}
        </Title>
        {items.length === 0
            ? <p>No Todos {title} yet.</p>
            : items.map(item => (
                <TodoItem
                    key={item.id}
                    todo={item}
                    refreshTodos={renderTodos}
                />
            ))}
    </LayoutContainer>
);

export default renderTodos;