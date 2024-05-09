import { ThemeProvider } from 'styled-components';

import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Router from './components/Router';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
