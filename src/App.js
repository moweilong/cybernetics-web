import { useMediaQuery,createTheme,ThemeProvider, CssBaseline,LinearProgress } from "@mui/material";
import { zhCN } from '@mui/material/locale';
import { useAtom } from "jotai";
import { useMemo,useEffect,useState,Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import titleState from './state/title';
import { ColorModeContext } from "./hook/colormode";
import Login from './login';

function App() {

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
  const title = useAtom(titleState);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  const theme = useMemo(()=>createTheme({
    palette: {
      mode: mode,
      secondary: {
        main: '#FF1493',
      },
    },
    components: {
      // 给 Typography 增加 disabled 风格
      MuiTypography: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            if (ownerState.disabled) {
              return {
                color: theme.palette.text.disabled,
                pointerEvents: 'none',
              }
            }
          },
        }
      },
      // 给表格行增加 disabled 和 deleted 风格
      MuiTableRow: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            if (ownerState.deleted === 'true') {
              return {
                textDecoration: 'line-through',
                color: theme.palette.error.main,
                '& td:not(.action)': {
                  color: theme.palette.text.disabled,
                  pointerEvents: 'none',
                },
              }
            }
            if (ownerState.disabled) {
              return {
                '& td:not(.action)': {
                  color: theme.palette.text.disabled,
                  pointerEvents: 'none',
                },
              }
            }
          },
        }
      }
    }
  },zhCN), [mode]);

  // 更新文档标题
  useEffect(() => { document.title = title; }, [title])

  // 更新色彩模式
  useEffect(() => { setMode(prefersDarkMode ? 'dark' : 'light'); }, [prefersDarkMode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter
          future={{
        v7_startTransition: true,
      }}
        >
                <Suspense fallback={<LinearProgress />}>
                  <Routes>
                    <Route path='/login/*' element={<Login />} />
                    <Route path='/*' element={<Login />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
