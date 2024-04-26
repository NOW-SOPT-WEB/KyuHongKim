import "./App.css";
import { Global } from "@emotion/react";
import { GlobalSytle } from "./styles/GlobalStyle";

function App() {
    return (
        <>
            <Global styles={GlobalSytle} />
        </>
    );
}

export default App;
