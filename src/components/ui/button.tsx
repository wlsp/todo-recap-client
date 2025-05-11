import {ButtonProps, ButtonType} from "@/types";
import {FC} from "react";
import {cn} from "@/utils";

const Button: FC<ButtonProps> = ({className, onClick, children, type = ButtonType.button, label, disabled, ...rest}) => {
    const buttonContent = children ?? label
    return (
        <button
            className={cn(
                "flex flex-col justify-center items-center text-indigo-700 transition-all bg-indigo-100",
                "rounded-lg border border-transparent px-5 py-[0.6em] text-base",
                "font-medium font-inherit cursor-pointer transition-colors duration-200 focus:outline focus:outline-auto ring-0",
                className, disabled && "text-neutral-400 bg-gray-200/50 hover:bg-gray-200/50 cursor-not-allowed"
            )}
            type={type}
            onClick={onClick}
            disabled={disabled}
            {...rest}>
            {buttonContent && <span>{buttonContent}</span>}
        </button>
    )
}

export default Button;