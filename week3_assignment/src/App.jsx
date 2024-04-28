import "./App.css";
import { Global } from "@emotion/react";
import { GlobalSytle } from "./styles/GlobalStyle";
import PageHeader from "./component/PageHeader";
import ButtonWrapper from "./component/ButtonWrapper";

function App() {
    return (
        <>
            <Global styles={GlobalSytle} />
            <PageHeader />
            <ButtonWrapper />
        </>
    );
}

export default App;
