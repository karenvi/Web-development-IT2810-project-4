import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../App";

const ThemeToggle = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const changeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const label = { inputProps: { 'aria-label': 'Theme switch' } };

    const labelForSwitch = `Switch to ${theme === 'light' ? 'dark' : 'light'} theme?`;

    return (
        <FormGroup>
            <FormControlLabel control={<Switch {...label} onClick={changeTheme} checked={theme === 'dark'} />} label={labelForSwitch} />
        </FormGroup>
    )
}

export default ThemeToggle;