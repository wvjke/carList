import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ITheme, Theme, changeActiveTheme } from "../redux/slices/theme";

const ThemeToggler = () => {
    const dispatch = useDispatch();
    const theme: Theme = useSelector(
        (state: { theme: ITheme }) => state.theme.activeTheme
    );

    const handleThemeChange = () => {
        dispatch(changeActiveTheme());
    };

    return (
        <div className="toggler">
            <div>{theme === "dark" ? "dark" : "light"} mode</div>
            <IconButton
                sx={{ ml: 1 }}
                color="inherit"
                onClick={handleThemeChange}
            >
                {theme === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
        </div>
    );
};

export default ThemeToggler;
