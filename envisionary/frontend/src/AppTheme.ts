import { CSSProperties } from "react";

export interface AppTheme {
    dark: CSSProperties;
    light: CSSProperties;
    // Colors that are similar for both dark and light theme
    common?: CSSProperties;
}