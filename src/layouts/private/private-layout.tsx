import { SidebarProvider } from '@/components/ui/sidebar';
import useSidebarVisibility from '@/hooks/use-sidebar-visibility';
import AppBody from '@/layouts/private/app-body';
import AppHeader from '@/layouts/private/app-header';
import AppSidebar from '@/layouts/private/app-sidebar';

export const PrivateLayout = () => {
  const { isOpen } = useSidebarVisibility();

  return (
    <SidebarProvider defaultOpen={isOpen}>
      <AppSidebar />
      <main className="size-full overflow-x-hidden overflow-y-auto">
        <AppHeader />
        <AppBody />
      </main>
    </SidebarProvider>
  );
};
