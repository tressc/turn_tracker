import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TheGrid from './theGrid';
import './App.css';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { ItemsProvider } from './items';
import { RoundsProvider } from './rounds';
import LogBox from './logBox';


const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: purple[300],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RoundsProvider>
        <ItemsProvider>
          <div className="App">
            <LogBox />
            <TheGrid type="lights"/>
            <TheGrid type="spells"/>
          </div>
        </ItemsProvider>
      </RoundsProvider>
    </ThemeProvider>
  );
}

export default App;
