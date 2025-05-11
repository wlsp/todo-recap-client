import Navbar from "@/components/layout/navbar";
import {FC} from "react";
import {HeaderComponentProps} from "@/types";

const Header: FC<HeaderComponentProps> = ({headerItems}) => {
    const {logo, navItems} = headerItems;

    return (
        <header className="flex justify-center h-16 bg-[var(--bg-header)] transition-colors px-30 fixed w-full z-10">
            <img src={logo} alt="svg logo"/>
            <Navbar navItems={navItems}/>
        </header>
    )
}

export default Header;