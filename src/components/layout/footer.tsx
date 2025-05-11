import {FooterComponentProps} from "@/types";
import {FullYear} from "@/utils";

const Footer = ({ footerItems }: FooterComponentProps) => {
    const { showFullYear, company }= footerItems;
    return (
        <footer className="h-16 flex justify-between items-center transition-colors bg-[var(--bg-footer)] text-[var(--text-dark)]">
            <div className="flex w-full max-w-6xl mx-auto ">
                <small>{showFullYear && FullYear()} &#169; {company}</small>
            </div>
        </footer>
    )
}

export default Footer;