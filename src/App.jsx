import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import VideoQuestions from './containers/VideoQuestions'
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
      <VideoQuestions />
    </div>
    </ThemeProvider>
  )
}

export default App
