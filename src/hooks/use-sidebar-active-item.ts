import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sidebar-active-item-id';

interface SidebarItem {
  label: string;
  path: string;
  icon: LucideIcon;
  id: string;
}

const useSidebarActiveItem = (items: SidebarItem[]) => {
  if (!items || items.length === 0) {
    throw new Error('useSidebarActiveItem requires a non-empty array of items');
  }

  const getInitialValue = (): string => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && items.some((item) => item.id === saved)) {
      return saved;
    }
    return items[0].id;
  };

  const [activeItemId, setActiveItemStateId] = useState<string>(getInitialValue);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeItemId);
  }, [activeItemId]);

  const setActiveItemId = (itemId: string) => setActiveItemStateId(itemId);

  return { activeItemId, setActiveItemId };
};

export default useSidebarActiveItem;
