import { PropsWithChildren } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ec407a',
    },
  },
});

export default function AppThemeProvider({
  children,
}: PropsWithChildren<object>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
