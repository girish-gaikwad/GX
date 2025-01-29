'use client';

import ConnectedAccounts from "@/app/components/settings/ConnectedAccounts";
import DangerZone from "@/app/components/settings/DangerZone";
import Notifications from "@/app/components/settings/Notifications";
import Profile from "@/app/components/settings/Profile";
import Security from "@/app/components/settings/Security";


const SettingsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 '>
			<main className='max-w-4xl mx-auto '>
				<Profile />
				<Notifications />
				<Security />
				<ConnectedAccounts />
				<DangerZone />
			</main>
		</div>
	);
};
export default SettingsPage;
