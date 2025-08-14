import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/modules/app/providers/theme-provider';
import useAuthListener from '@/modules/auth/hooks/use-auth-listener';
import router from '@/routes/router';

const queryClient = new QueryClient();

export default function App() {
  useAuthListener();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
