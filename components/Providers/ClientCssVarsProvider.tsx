'use client'
import { CssVarsProvider } from "@mui/joy";
import { PropsWithChildren } from "react";

export default function ClientCssVarsProvider(props: PropsWithChildren) {
    return (
        <CssVarsProvider
            defaultMode="system"
            modeStorageKey="theme-mode"
            disableNestedContext
        >
            {props.children}
        </CssVarsProvider>
    )
}