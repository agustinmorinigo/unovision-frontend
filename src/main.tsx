import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import router from '@/router';

// Meter todo esto en <App />. Desde acá solo se importa el App.
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
		<Toaster position="top-center" richColors />
	</StrictMode>,
);
