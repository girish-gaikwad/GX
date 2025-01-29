"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const StatCard = ({ name, icon: Icon, value, color }) => {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <motion.div
      className={`overflow-hidden bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
      }`}
      whileHover={{
        y: -5,
        boxShadow: isDark
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          : "0 25px 50px -12px rgba(255, 255, 255, 0.5)",
      }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span
          className={`flex items-center text-sm font-medium ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <p
          className={`mt-1 text-3xl font-semibold ${
            isDark ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;
