import { Outlet } from 'react-router';

export default function AppBody() {
  return (
    <div className="size-full p-4 overflow-x-hidden">
      <Outlet />
    </div>
  );
}
