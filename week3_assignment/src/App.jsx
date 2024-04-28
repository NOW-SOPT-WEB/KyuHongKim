import "./App.css";

import PageHeader from "./component/PageHeader";
import ButtonWrapper from "./component/ButtonWrapper";
import GlobalStyle from "./styles/GlobalStyle";
import MainLayout from "./component/Layout/MainLayout";

function App() {
    return (
        <>
            <GlobalStyle />
            <PageHeader />
            <MainLayout>
                <ButtonWrapper />
            </MainLayout>
        </>
    );
}

export default App;
