import { ThemeProvider } from './components/theme-provider'


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
