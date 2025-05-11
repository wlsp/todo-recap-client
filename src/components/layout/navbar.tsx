import {useLocation, NavLink} from "react-router-dom";
import {NavbarItem, NavbarProps} from "@/types";
import Spinner from "@/components/shared/dual-ring-spinner";
import {cn} from "@/utils";

const Navbar = ({navItems}: NavbarProps) => {
    const location = useLocation();
    const current = location.pathname;

    return (
        <nav className="flex gap-10 items-center py-4 max-w-6xl mx-auto h-full">
            {navItems.map((navItem: NavbarItem) => {
                const isActive = (() => {
                    if (navItem.path === "/") return current === "/";
                    if (navItem.path === "/todos") {
                        return (
                            current === "/todos" ||
                            current.startsWith("/todos/status") && current.split("/").length === 3
                        );
                    }
                    return current.startsWith(navItem.path);
                })();

                return (
                    <NavLink key={navItem.path} to={navItem.path}>
                        {({isPending}) => (
                            <span className={cn(
                                "flex items-center gap-1 relative transition-all border-b-2",
                                isActive
                                    ? "text-[var(--color-header-active)] border-indigo-400"
                                    : "text-gray-400 border-transparent hover:text-[var(--color-header-hover)]"
                            )}>
                {navItem.link} {isPending && <Spinner/>}
              </span>
                        )}
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default Navbar;
