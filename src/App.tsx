import { ThemeProvider } from './components/theme-provider'
import React from "react";


type AppProps = {
  children: React.ReactNode
}

function App({ children }: AppProps) {
  
  return (
    <ThemeProvider>
        {children}
    </ThemeProvider>
  )
}

export default App
