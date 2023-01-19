import './App.css'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import {BrowserRouter} from "react-router-dom";
import {Router} from "./Route"
import {CycleContextProvider} from "./contexts/CycleContext";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
            <CycleContextProvider>
                <Router />
            </CycleContextProvider>
        </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
