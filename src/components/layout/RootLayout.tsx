import { Outlet } from "react-router-dom";
import { Header } from "../shared/Header";

export function RootLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}