import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#ae1d1d',
    primaryLight: '#fff3f3',
    secondary: '#00ff19',
    light: '#fff'
  }
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

export default Theme;