import { SidebarProvider } from '@/components/ui/sidebar';
import useSidebarVisibility from '@/modules/app/hooks/use-sidebar-visibility';
import AppBody from '@/modules/app/layouts/private/app-body';
import AppHeader from '@/modules/app/layouts/private/app-header';
import AppSidebar from '@/modules/app/layouts/private/app-sidebar';

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
