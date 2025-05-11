import {ComponentPropsWithoutRef, PropsWithChildren, ReactNode} from "react";

export interface NavigationsProps {
    headerItems: HeaderProps;
    footerItems: FooterProps;
}

export type HeaderProps = {
    logo: string;
    navItems: NavbarItem[];
}

export type NavbarItem = {
    link: string;
    path: string;
}

export interface NavbarProps {
    navItems: NavbarItem[];
}

export interface FooterProps {
    showFullYear: boolean;
    company: string;
}

export interface HeaderComponentProps {
    headerItems: HeaderProps;
}

export interface FooterComponentProps {
    footerItems: FooterProps;
}

export interface ILayoutContainer extends PropsWithChildren {
    className?: string;
}

export enum HeadingTag {
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    h4 = "h4",
    h5 = "h5",
    h6 = "h6",
}

export enum HeadingSize {
    small = "text-sm",
    medium = "text-md",
    large = "text-lg",
    xl = "text-xl",
    xxl = "text-2xl",
    xxxl = "text-3xl",
}

export type TitleProps<T extends HeadingTag = HeadingTag.h1> = {
    as?: HeadingTag;
    size?: HeadingSize;
    children: ReactNode;
    className?: string;

} & ComponentPropsWithoutRef<T>

export enum TODO_STATUS {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

export type TodoType = {
    id: string;
    status: TODO_STATUS;
    description: string;
};

export type TodoItemProps = {
    todo: TodoType;
    refreshTodos: () => void;
    hasParams?: boolean;
};

export type TodoListProps = {
    todos: TodoType[];
    status?: TODO_STATUS;
};

export enum ButtonType {
    button = "button",
    submit = "submit",
    reset = "reset",
}

export type ButtonProps = {
    className?: string;
    onClick?: () => void;
    type?: ButtonType
    children?: ReactNode;
    label?: string;
    disabled?: boolean;
}


export type TodoContextType = {
    todos: TodoType[];
    refreshTodos: () => void;
};

export interface TodoFormProps {
    onAdd: (description: string, status: TODO_STATUS) => void;
    getAllTodos: () => void;
}