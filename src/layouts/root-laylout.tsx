import {Outlet} from "react-router-dom";
import {FC, PropsWithChildren} from "react";
import navigations from "../../data/navigations.json"
import {NavigationsProps} from "@/types";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LayoutContainer from "@/components/layout/layout-container";
import {Toaster} from "sonner";

const typedNavigations = navigations as NavigationsProps;

const RootLayout: FC<PropsWithChildren> = () => {
    const {headerItems, footerItems} = typedNavigations;
    return (
        <>
            <Header headerItems={headerItems}/>
            <LayoutContainer className={"relative block p-6"}>
                <LayoutContainer className="flex flex-col max-w-6xl mx-auto min-h-[calc(100dvh-128px)] mt-16">
                    <Outlet/>
                </LayoutContainer>
            </LayoutContainer>
            <Footer footerItems={footerItems}/>
            <Toaster richColors/>
        </>
    )
}

export default RootLayout;