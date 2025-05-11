import {HeadingSize, HeadingTag, TitleProps} from "@/types";
import {cn} from "@/utils";

const Title = <T extends HeadingTag = HeadingTag.h1>(
    { as, children, size = HeadingSize.xxxl, className, ...rest }: TitleProps<T>
) => {
    const Component = as || HeadingTag.h1;
    return <Component className={cn("mb-2", size, className)} {...rest}>{children}</Component>;
};

export default Title;
