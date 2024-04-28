import "./App.css";

import PageHeader from "./component/PageHeader";
import ButtonWrapper from "./component/ButtonWrapper";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
    return (
        <>
            <GlobalStyle />
            <PageHeader />
            <ButtonWrapper />
        </>
    );
}

export default App;
