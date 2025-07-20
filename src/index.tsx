import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
 document.getElementById('root') as HTMLElement
);

root.render(
 <React.StrictMode>
   <QueryClientProvider client={queryClient}>
     <ThemeProvider theme={theme}>
       <CssBaseline />
       <App />
     </ThemeProvider>
   </QueryClientProvider>
 </React.StrictMode>
);
