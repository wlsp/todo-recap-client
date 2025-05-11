import {FormEvent, useRef, useState} from "react";
import {ButtonType, TODO_STATUS, TodoFormProps} from "@/types";
import Button from "@/components/ui/button";
import Draggable from 'react-draggable';
import {cn} from "@/utils";

const TodoForm = ({onAdd, getAllTodos}: TodoFormProps) => {
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<TODO_STATUS>(TODO_STATUS.OPEN);
    const nodeRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (description.trim() === "") return;
        onAdd(description, status);
        setDescription("");
        setStatus(TODO_STATUS.OPEN);
        getAllTodos();
    };

    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*@ts-expect-error*/}
            <Draggable nodeRef={nodeRef}>
                <div ref={nodeRef} className="absolute top-28 -left-92 w-[380px] cursor-grab active:cursor-grabbing">
                    <div className="h-full relative">
                        <form
                            onSubmit={handleSubmit}
                            className="sticky top-0 flex flex-col gap-4 min-h-[200px] p-4 border border-gray-200 rounded-xl shadow-sm bg-lightgray"
                        >
                            <input
                                type="text"
                                placeholder="wash the card..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border border-gray-300 p-3 rounded-lg w-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            <div className="flex gap-4 text-sm text-gray-700">
                                {Object.values(TODO_STATUS).map((s) => (
                                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value={s}
                                            checked={status === s}
                                            onChange={() => setStatus(s)}
                                            className={cn("accent-[--open]",
                                                s === TODO_STATUS.OPEN
                                                    ? "var(--open)"
                                                    : s === TODO_STATUS.IN_PROGRESS
                                                        ? "accent-[--in-progress]"
                                                        : "accent-[--done]",)}
                                        />
                                        <span>{s.replace("_", " ")}</span>
                                    </label>
                                ))}
                            </div>
                            <Button
                                type={ButtonType.submit}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                disabled={description.trim() === ""}
                            >
                                Add Todo
                            </Button>
                        </form>
                    </div>
                </div>
            </Draggable>
        </>
    );
};

export default TodoForm;
