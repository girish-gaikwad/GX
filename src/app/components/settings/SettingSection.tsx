import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const SettingSection = ({ icon: Icon, title, children }) => {
	const {theme} = useTheme();
	const isDark = theme==="dark";
	return (
		<motion.div
		className={`overflow-hidden bg-opacity-50 mb-8 p-6 backdrop-blur-md shadow-lg rounded-xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
		}`} 			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='flex items-center mb-4 '>
				<Icon className='text-indigo-400 mr-4' size='26' />
				<h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>{title}</h2>
			</div>
			{children}
		</motion.div>
	);
};
export default SettingSection;
