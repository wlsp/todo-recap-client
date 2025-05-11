import LayoutContainer from "@/components/layout/layout-container";
import Button from "@/components/ui/button";
import {TODO_STATUS, TodoItemProps} from "@/types";
import {cn} from "@/utils";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {deleteTodoById, updateTodo} from "@/features/todo/api";
import Spinner from "@/components/shared/dual-ring-spinner";
import {toast} from "sonner";

const TodoItem = ({todo, refreshTodos, hasParams}: TodoItemProps) => {
    const {id, description, status} = todo;
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(description);
    const [editStatus, setEditStatus] = useState<TODO_STATUS>(status);
    const [isLoadingAction, setIsLoadingAction] = useState<null | "advance" | "editing" | "detail" | "undo">(null);

    const handleSaveEdit = async () => {
        setIsLoadingAction("editing");
        if (editText !== description || editStatus !== status) {
            await updateTodo({...todo, description: editText, status: editStatus});
            setIsLoadingAction(null);
        }
        setIsEditing(false);
        refreshTodos();
    };

    const handleAdvance = async () => {
        setIsLoadingAction("advance");
        try {
            if (status === TODO_STATUS.OPEN) {
                await updateTodo({...todo, status: TODO_STATUS.IN_PROGRESS});

            } else if (status === TODO_STATUS.IN_PROGRESS) {
                await updateTodo({...todo, status: TODO_STATUS.DONE});
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsLoadingAction(null)
            refreshTodos();
        }
    };

    const handleUndo = async () => {
        setIsLoadingAction("undo");
        if (status === TODO_STATUS.IN_PROGRESS) {
            await updateTodo({...todo, status: TODO_STATUS.OPEN});
            setIsLoadingAction(null);
        } else if (status === TODO_STATUS.DONE) {
            await updateTodo({...todo, status: TODO_STATUS.IN_PROGRESS});
            setIsLoadingAction(null);
        }
        refreshTodos();
    };

    const handleRemove = async () => {
        deleteTodoById(id).then(() => {
            setIsLoadingAction(null);
            refreshTodos();
        })
    };

    return (
        <>
            {isEditing && (
                <div className="absolute inset-0 backdrop-blur-xs bg-white/30 z-40"/>
            )}
            <LayoutContainer
                className={cn(
                    "flex items-center justify-between p-4 relative min-h-[200px] transition-colors bg-[var(--bg-header)] rounded-xl shadow-sm",
                    "flex-grow-0 text-[var(--text-container)]",
                    status === TODO_STATUS.OPEN && "border-[var(--color-open)]",
                    status === TODO_STATUS.IN_PROGRESS && "border-[var(--color-in-progress)]",
                    status === TODO_STATUS.DONE && "border-[var(--color-done)]",
                    isEditing && "z-50"
                )}
            >
                <Button
                    className="absolute top-0 right-0 bg-transparent p-2 h-fit w-fit focus-visible:outline-none"
                    onClick={handleRemove}
                >
                    <span className="text-2xl">🗑️</span>
                </Button>
                {isEditing ? (
                    <>
                        <input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="border-b p-2 w-full text-lg"
                        />
                        <div className="flex items-center gap-4 mt-2">
                            {Object.values(TODO_STATUS).map((s) => (
                                <label key={s} className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        checked={editStatus === s}
                                        onChange={() => setEditStatus(s)}
                                    />
                                    {s.replace("_", " ")}
                                </label>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Button
                                className="px-3 py-1 text-sm bg-[var(--color-button-save-bg)]
                                text-[var(--color-button-save-text)] rounded-md hover:bg-green-300"
                                onClick={handleSaveEdit}
                            >
                                Save
                            </Button>
                            <Button
                                className="px-3 py-1 text-sm bg-[var(--color-button-cancel-bg)] text-[var(--color-button-cancel-text)] rounded-md hover:bg-gray-300"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditText(description);
                                    setEditStatus(status);
                                    setIsLoadingAction(null)
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-lg h-full flex justify-between items-center">
                            {description}
                        </p>
                        <div className="flex space-x-2">
                            <Button
                                className="px-3 py-1 text-sm bg-[var(--color-button-detail-bg)] text-[var(--color-button-detail-text)] rounded-md hover:bg-blue-200"
                                onClick={() =>
                                    navigate(`/todos/status/${status.toLowerCase()}/${id}`)
                                }
                                disabled={hasParams}
                            >
                                {isLoadingAction === "detail" ? <Spinner/> : "Detail"}
                            </Button>
                            <Button
                                className="px-3 py-1 text-sm bg-[var(--color-button-edit-bg)] text-[var(--color-button-edit-text)] rounded-md hover:bg-yellow-200"
                                onClick={() => setIsEditing(true)}
                            >
                                {isLoadingAction === "editing" ? <Spinner/> : "Edit"}
                            </Button>
                            <Button
                                className="px-3 py-1 text-sm bg-[var(--color-button-advance-bg)] text-[var(--color-button-advance-text)] rounded-md hover:bg-green-200"
                                onClick={handleAdvance}
                                disabled={status === TODO_STATUS.DONE}
                            >
                                {isLoadingAction === "advance" ? <Spinner/> : "Advance"}
                            </Button>
                            <Button
                                onClick={handleUndo}
                                className="px-3 py-1 text-sm bg-[var(--color-button-undo-bg)] text-[var(--color-button-undo-text)] rounded-md hover:bg-gray-300"
                                disabled={status === TODO_STATUS.OPEN}
                            >
                                {isLoadingAction === "undo" ? <Spinner/> : "Undo"}
                            </Button>
                        </div>
                    </>
                )}
            </LayoutContainer>
        </>
    );
};

export default TodoItem;
