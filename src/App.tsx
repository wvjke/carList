import "./App.scss";
import Carlist from "./Components/CarList/CarList";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import ThemeToggler from "./Components/ThemeToggler.tsx";
import { useSelector } from "react-redux";
import { Theme, ITheme } from "./redux/slices/theme.ts";
import { Container } from "@mui/material";

function App() {
    const theme: Theme = useSelector(
        (state: { theme: ITheme }) => state.theme.activeTheme
    );

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const lightTheme = createTheme({
        palette: {
            mode: "light",
        },
    });

    return (
        <>
            <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
                <CssBaseline />
                <Container>
                    <ThemeToggler />
                    <Carlist />
                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;
