import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
const salesByCategory = [
	{ name: "Electronics", value: 400 },
	{ name: "Clothing", value: 300 },
	{ name: "Home & Garden", value: 200 },
	{ name: "Books", value: 100 },
	{ name: "Others", value: 150 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const SalesByCategoryChart = () => {
	const { theme } = useTheme();

	const isDark = theme === "dark";
	return (
		<motion.div
		className={`overflow-hidden bg-opacity-50 mb-8 p-6 backdrop-blur-md shadow-lg rounded-xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
		}`} 			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4'>Sales by Category</h2>

			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={salesByCategory}
							cx='50%'
							cy='50%'
							outerRadius={80}
							fill='#8884d8'
							dataKey='value'
							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{salesByCategory.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesByCategoryChart;













// Sample documents data
const documents = [
    {
      title: "Export Agreement/Proforma Invoice",
      description:
        "Initial agreement outlining terms, prices, and conditions before final invoice",
      preview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sections include: Buyer & Seller Details, Terms of Trade, Product Specifications, Payment Terms...",
      details: {
        purpose:
          "Establishes initial terms and conditions for international trade",
        requiredFields: [
          "Buyer Information",
          "Seller Information",
          "Product Details",
          "Payment Terms",
          "Delivery Terms",
        ],
        validityPeriod: "30 days from issue",
        requirements: "Company letterhead, authorized signature, company stamp",
      },
    },
    {
      title: "Commercial Invoice",
      description:
        "Official invoice stating the value, quantity, and details of exported goods",
      preview:
        "Contains detailed information including item descriptions, quantities, values, and terms of sale. Sections include: Buyer Information, Seller Information, Product Descriptions, and Total Costs.",
      details: {
        purpose:
          "Serves as a formal bill for goods being exported, used for customs clearance and tax calculation",
        requiredFields: [
          "Invoice Number",
          "Date",
          "Buyer Information",
          "Seller Information",
          "Item Details",
          "Total Amount",
        ],
        validityPeriod: "Valid for customs purposes during shipment",
        requirements:
          "Printed on company letterhead with signatures and company stamp",
      },
    },
    {
      title: "Packing List",
      description:
        "Detailed list of items, quantities, and packaging details for shipment",
      preview:
        "Includes packaging details for each item such as weight, dimensions, and number of units. Essential for logistics and customs inspections.",
      details: {
        purpose:
          "Helps with proper handling and customs inspections by listing all package contents clearly",
        requiredFields: [
          "Package Number",
          "Contents",
          "Weight",
          "Dimensions",
          "Total Packages",
        ],
        validityPeriod: "Valid until shipment reaches its destination",
        requirements: "Accurate information aligned with the commercial invoice",
      },
    },
    {
      title: "Certificate of Origin",
      description:
        "Official document certifying where goods were manufactured or produced",
      preview:
        "Official certification from authorized bodies proving the origin of goods. Required for customs and trade agreements.",
      details: {
        purpose:
          "Certifies the country of origin of goods to comply with trade agreements and customs regulations",
        requiredFields: [
          "Exporter Information",
          "Consignee Information",
          "Country of Origin",
          "Product Details",
        ],
        validityPeriod: "Depends on customs or trade agreement requirements",
        requirements: "Issued by authorized government or trade bodies",
      },
    },
    {
      title: "Letter of Credit",
      description:
        "Bank guarantee ensuring payment upon meeting specified conditions",
      preview:
        "A secure payment method for international trade, issued by the buyer's bank to guarantee payment to the seller upon fulfillment of conditions.",
      details: {
        purpose:
          "Guarantees seller's payment in international trade upon meeting the terms specified in the letter",
        requiredFields: [
          "Buyer Information",
          "Seller Information",
          "Bank Details",
          "Terms of Payment",
        ],
        validityPeriod: "Specified in the letter of credit",
        requirements:
          "Issued by a recognized bank and authenticated with supporting documents",
      },
    },
    {
      title: "Bill of Lading",
      description:
        "Transport document serving as receipt and title to shipped goods",
      preview:
        "Acts as a receipt for goods shipped, a contract of carriage, and a document of title. Vital for legal and logistical purposes.",
      details: {
        purpose:
          "Provides proof of goods being shipped and serves as a contract between shipper and carrier",
        requiredFields: [
          "Shipper Information",
          "Consignee Information",
          "Carrier Details",
          "Goods Description",
        ],
        validityPeriod: "Valid throughout the shipment's transit period",
        requirements: "Must be signed by the carrier and shipper",
      },
    },
    {
      title: "Tax Invoice",
      description:
        "Document showing tax calculations and charges on exported goods",
      preview:
        "Lists all applicable taxes for the transaction. Includes details like GST, VAT, or other tax codes specific to the trade region.",
      details: {
        purpose:
          "Ensures compliance with tax regulations and provides clarity on the tax breakdown for goods",
        requiredFields: [
          "Invoice Number",
          "Date",
          "Taxpayer Identification",
          "Tax Breakdown",
          "Total Tax Amount",
        ],
        validityPeriod: "Based on the transaction date",
        requirements:
          "Printed on company letterhead with tax registration number",
      },
    },
    {
      title: "Inland Bill Of Lading",
      description: "Transport document for domestic land-based shipment of goods",
      preview:
        "Documents the transport of goods within a country via land, providing proof of delivery and shipping details.",
      details: {
        purpose:
          "Ensures proper handling of goods during domestic transportation",
        requiredFields: [
          "Shipper Information",
          "Receiver Information",
          "Goods Description",
          "Delivery Address",
        ],
        validityPeriod: "Valid during the inland shipment period",
        requirements: "Signed by the carrier and shipper",
      },
    },
    {
      title: "Ocean Bill Of Lading",
      description: "Maritime transport document for international sea freight",
      preview:
        "Serves as a receipt for goods transported by sea, providing details for the shipper, consignee, and carrier.",
      details: {
        purpose:
          "Acts as a document of title, receipt, and carriage contract for sea freight",
        requiredFields: [
          "Shipper Information",
          "Consignee Information",
          "Carrier Details",
          "Goods Description",
        ],
        validityPeriod: "Valid throughout the maritime transit",
        requirements: "Must be signed by the carrier and shipper",
      },
    },
    {
      title: "Dock Receipt",
      description: "Proof of delivery of goods to the shipping terminal or dock",
      preview:
        "Acknowledges receipt of goods at the shipping dock, essential for initiating the export process.",
      details: {
        purpose: "Confirms goods have been delivered to the dock for shipment",
        requiredFields: [
          "Exporter Information",
          "Dock Information",
          "Goods Description",
          "Date of Receipt",
        ],
        validityPeriod: "Until goods are loaded onto the vessel",
        requirements: "Issued by the dock authority or shipping agent",
      },
    },
    {
      title: "Airway Bill",
      description:
        "Air transport document and receipt for goods shipped by air freight",
      preview:
        "Documents the transportation of goods by air, providing essential details for shippers, consignees, and customs.",
      details: {
        purpose:
          "Ensures proper documentation and tracking for air freight shipments",
        requiredFields: [
          "Shipper Information",
          "Consignee Information",
          "Carrier Details",
          "Goods Description",
        ],
        validityPeriod: "Valid during the air transit period",
        requirements: "Issued by the airline or authorized freight forwarder",
      },
    },
  ];