import { Outlet } from 'react-router';

export const PrivateLayout = () => {
	return (
		<div className="private-layout">
			<header>Nav privado</header>
			<Outlet />
		</div>
	);
};
