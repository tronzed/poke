import { Component, lazy } from "react";
import { Path } from "./Path";

export const ADMIN = "ADMIN"
export const ROLES = {ADMIN}

export const privateRoutes = {

    ADMIN:[
        {
            path: Path.home,
            ComponentIn: lazy(() => import("Components/Home"))
        }
    ]

}