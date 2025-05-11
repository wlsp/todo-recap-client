import './index.css'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RootLayout from "@/layouts/root-laylout";
import TodosLayout from "@/layouts/todos-layout";
import TodoDetailPage from "@/pages/todo-detail-page";
import TodoOpenPage from "@/pages/todo-open-page";
import TodoInProgressPage from "@/pages/todo-in-progress-page";
import TodoDonePage from "@/pages/todo-done-page";
import TodosListPage from "@/pages/todos-list-page";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename={"todos"}>
            <Routes>
                <Route element={<RootLayout/>}>
                    {/*
                    Intentionally disabled – use for a future home or dashboard after login
                    if so, please remove basename from BrowserRouter and fix vite.config.ts and do the setup
                    <Route index element={<App/>}/>
                     */}
                    <Route element={<TodosLayout/>}>
                        <Route index element={<TodosListPage/>}/>
                        <Route path="status">
                            <Route path="open" element={<TodoOpenPage/>}/>
                            <Route path="in_progress" element={<TodoInProgressPage/>}/>
                            <Route path="done" element={<TodoDonePage/>}/>
                            <Route path=":status/:tid" element={<TodoDetailPage/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
