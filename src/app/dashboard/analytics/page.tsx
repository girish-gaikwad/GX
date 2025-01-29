'use client';

import AIPoweredInsights from "@/app/components/analytics/AIPoweredInsights";
import ChannelPerformance from "@/app/components/analytics/ChannelPerformance";
import CustomerSegmentation from "@/app/components/analytics/CustomerSegmentation";
import OverviewCards from "@/app/components/analytics/OverviewCards";
import ProductPerformance from "@/app/components/analytics/ProductPerformance";
import RevenueChart from "@/app/components/analytics/RevenueChart";
import UserRetention from "@/app/components/analytics/UserRetention";



const AnalyticsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>

			<main className='max-w-7xl mx-auto '>
				<OverviewCards />
				<RevenueChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<ChannelPerformance />
					<ProductPerformance />
					<UserRetention />
					<CustomerSegmentation />
				</div>

				<AIPoweredInsights />
			</main>
		</div>
	);
};
export default AnalyticsPage;
