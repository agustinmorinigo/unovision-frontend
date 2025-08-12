import clsx from 'clsx';
import { ListTodo, Receipt } from 'lucide-react';
import { Link } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import useSidebarActiveItem from '@/modules/app/hooks/use-sidebar-active-item';

const items = [
  {
    label: 'Gastos',
    path: '/accounting/expenses',
    icon: Receipt,
    id: 'accounting-expenses',
  },
  // {
  //   label: 'Vencimientos',
  //   path: '/accounting/expirations',
  //   icon: Calendar,
  //   id: 'accounting-expirations',
  // },
  // {
  //   label: 'Estadísticas',
  //   path: '/accounting/statistics',
  //   icon: ChartNoAxesCombined,
  //   id: 'accounting-statistics',
  // },
];

export default function AppSidebar() {
  const { activeItemId, setActiveItemId } = useSidebarActiveItem(items);

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ListTodo className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Business Management</span>
            <span className="text-xs text-muted-foreground">Gestión Empresarial</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Contabilidad</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={'#'} // to={item.path}
                      onClick={() => setActiveItemId(item.id)}
                      className={clsx(
                        'flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted',
                        activeItemId === item.id && 'bg-primary text-primary-foreground',
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
