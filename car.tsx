// import { motion } from "framer-motion";
// import { useTheme } from "next-themes";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
// const salesByCategory = [
// 	{ name: "Electronics", value: 400 },
// 	{ name: "Clothing", value: 300 },
// 	{ name: "Home & Garden", value: 200 },
// 	{ name: "Books", value: 100 },
// 	{ name: "Others", value: 150 },
// ];

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

// const SalesByCategoryChart = () => {
// 	const { theme } = useTheme();

// 	const isDark = theme === "dark";
// 	return (
// 		<motion.div
// 		className={`overflow-hidden bg-opacity-50 mb-8 p-6 backdrop-blur-md shadow-lg rounded-xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
// 		}`} 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ delay: 0.3 }}
// 		>
// 			<h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4'>Sales by Category</h2>

// 			<div style={{ width: "100%", height: 300 }}>
// 				<ResponsiveContainer>
// 					<PieChart>
// 						<Pie
// 							data={salesByCategory}
// 							cx='50%'
// 							cy='50%'
// 							outerRadius={80}
// 							fill='#8884d8'
// 							dataKey='value'
// 							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
// 						>
// 							{salesByCategory.map((entry, index) => (
// 								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// 							))}
// 						</Pie>
// 						<Tooltip
// 							contentStyle={{
// 								backgroundColor: "rgba(31, 41, 55, 0.8)",
// 								borderColor: "#4B5563",
// 							}}
// 							itemStyle={{ color: "#E5E7EB" }}
// 						/>
// 						<Legend />
// 					</PieChart>
// 				</ResponsiveContainer>
// 			</div>
// 		</motion.div>
// 	);
// };
// export default SalesByCategoryChart;













// // Sample documents data
// const documents = [
//     {
//       title: "Export Agreement/Proforma Invoice",
//       description:
//         "Initial agreement outlining terms, prices, and conditions before final invoice",
//       preview:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sections include: Buyer & Seller Details, Terms of Trade, Product Specifications, Payment Terms...",
//       details: {
//         purpose:
//           "Establishes initial terms and conditions for international trade",
//         requiredFields: [
//           "Buyer Information",
//           "Seller Information",
//           "Product Details",
//           "Payment Terms",
//           "Delivery Terms",
//         ],
//         validityPeriod: "30 days from issue",
//         requirements: "Company letterhead, authorized signature, company stamp",
//       },
//     },
//     {
//       title: "Commercial Invoice",
//       description:
//         "Official invoice stating the value, quantity, and details of exported goods",
//       preview:
//         "Contains detailed information including item descriptions, quantities, values, and terms of sale. Sections include: Buyer Information, Seller Information, Product Descriptions, and Total Costs.",
//       details: {
//         purpose:
//           "Serves as a formal bill for goods being exported, used for customs clearance and tax calculation",
//         requiredFields: [
//           "Invoice Number",
//           "Date",
//           "Buyer Information",
//           "Seller Information",
//           "Item Details",
//           "Total Amount",
//         ],
//         validityPeriod: "Valid for customs purposes during shipment",
//         requirements:
//           "Printed on company letterhead with signatures and company stamp",
//       },
//     },
//     {
//       title: "Packing List",
//       description:
//         "Detailed list of items, quantities, and packaging details for shipment",
//       preview:
//         "Includes packaging details for each item such as weight, dimensions, and number of units. Essential for logistics and customs inspections.",
//       details: {
//         purpose:
//           "Helps with proper handling and customs inspections by listing all package contents clearly",
//         requiredFields: [
//           "Package Number",
//           "Contents",
//           "Weight",
//           "Dimensions",
//           "Total Packages",
//         ],
//         validityPeriod: "Valid until shipment reaches its destination",
//         requirements: "Accurate information aligned with the commercial invoice",
//       },
//     },
//     {
//       title: "Certificate of Origin",
//       description:
//         "Official document certifying where goods were manufactured or produced",
//       preview:
//         "Official certification from authorized bodies proving the origin of goods. Required for customs and trade agreements.",
//       details: {
//         purpose:
//           "Certifies the country of origin of goods to comply with trade agreements and customs regulations",
//         requiredFields: [
//           "Exporter Information",
//           "Consignee Information",
//           "Country of Origin",
//           "Product Details",
//         ],
//         validityPeriod: "Depends on customs or trade agreement requirements",
//         requirements: "Issued by authorized government or trade bodies",
//       },
//     },
//     {
//       title: "Letter of Credit",
//       description:
//         "Bank guarantee ensuring payment upon meeting specified conditions",
//       preview:
//         "A secure payment method for international trade, issued by the buyer's bank to guarantee payment to the seller upon fulfillment of conditions.",
//       details: {
//         purpose:
//           "Guarantees seller's payment in international trade upon meeting the terms specified in the letter",
//         requiredFields: [
//           "Buyer Information",
//           "Seller Information",
//           "Bank Details",
//           "Terms of Payment",
//         ],
//         validityPeriod: "Specified in the letter of credit",
//         requirements:
//           "Issued by a recognized bank and authenticated with supporting documents",
//       },
//     },
//     {
//       title: "Bill of Lading",
//       description:
//         "Transport document serving as receipt and title to shipped goods",
//       preview:
//         "Acts as a receipt for goods shipped, a contract of carriage, and a document of title. Vital for legal and logistical purposes.",
//       details: {
//         purpose:
//           "Provides proof of goods being shipped and serves as a contract between shipper and carrier",
//         requiredFields: [
//           "Shipper Information",
//           "Consignee Information",
//           "Carrier Details",
//           "Goods Description",
//         ],
//         validityPeriod: "Valid throughout the shipment's transit period",
//         requirements: "Must be signed by the carrier and shipper",
//       },
//     },
//     {
//       title: "Tax Invoice",
//       description:
//         "Document showing tax calculations and charges on exported goods",
//       preview:
//         "Lists all applicable taxes for the transaction. Includes details like GST, VAT, or other tax codes specific to the trade region.",
//       details: {
//         purpose:
//           "Ensures compliance with tax regulations and provides clarity on the tax breakdown for goods",
//         requiredFields: [
//           "Invoice Number",
//           "Date",
//           "Taxpayer Identification",
//           "Tax Breakdown",
//           "Total Tax Amount",
//         ],
//         validityPeriod: "Based on the transaction date",
//         requirements:
//           "Printed on company letterhead with tax registration number",
//       },
//     },
//     {
//       title: "Inland Bill Of Lading",
//       description: "Transport document for domestic land-based shipment of goods",
//       preview:
//         "Documents the transport of goods within a country via land, providing proof of delivery and shipping details.",
//       details: {
//         purpose:
//           "Ensures proper handling of goods during domestic transportation",
//         requiredFields: [
//           "Shipper Information",
//           "Receiver Information",
//           "Goods Description",
//           "Delivery Address",
//         ],
//         validityPeriod: "Valid during the inland shipment period",
//         requirements: "Signed by the carrier and shipper",
//       },
//     },
//     {
//       title: "Ocean Bill Of Lading",
//       description: "Maritime transport document for international sea freight",
//       preview:
//         "Serves as a receipt for goods transported by sea, providing details for the shipper, consignee, and carrier.",
//       details: {
//         purpose:
//           "Acts as a document of title, receipt, and carriage contract for sea freight",
//         requiredFields: [
//           "Shipper Information",
//           "Consignee Information",
//           "Carrier Details",
//           "Goods Description",
//         ],
//         validityPeriod: "Valid throughout the maritime transit",
//         requirements: "Must be signed by the carrier and shipper",
//       },
//     },
//     {
//       title: "Dock Receipt",
//       description: "Proof of delivery of goods to the shipping terminal or dock",
//       preview:
//         "Acknowledges receipt of goods at the shipping dock, essential for initiating the export process.",
//       details: {
//         purpose: "Confirms goods have been delivered to the dock for shipment",
//         requiredFields: [
//           "Exporter Information",
//           "Dock Information",
//           "Goods Description",
//           "Date of Receipt",
//         ],
//         validityPeriod: "Until goods are loaded onto the vessel",
//         requirements: "Issued by the dock authority or shipping agent",
//       },
//     },
//     {
//       title: "Airway Bill",
//       description:
//         "Air transport document and receipt for goods shipped by air freight",
//       preview:
//         "Documents the transportation of goods by air, providing essential details for shippers, consignees, and customs.",
//       details: {
//         purpose:
//           "Ensures proper documentation and tracking for air freight shipments",
//         requiredFields: [
//           "Shipper Information",
//           "Consignee Information",
//           "Carrier Details",
//           "Goods Description",
//         ],
//         validityPeriod: "Valid during the air transit period",
//         requirements: "Issued by the airline or authorized freight forwarder",
//       },
//     },
//   ];








//   const steps = [
//     {
//       title: 'Pan Card',
//       Description: 'Permanent Account Number for tax identification and required for business registration and export activities',
//       content:
//         <div className="grid grid-cols-3 gap-4">
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Decide the Type of PAN</h3>
//             <p className="text-sm text-green-600 py-2">For Individuals: Personal PAN</p>
//             <p className="text-sm text-blue-600 py-2">For Businesses: PAN for Proprietorship, Partnership, LLP, Company, Trust, etc.</p>
//           </div>
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Gather Required Documents</h3>
//             <p className="text-sm text-green-600 py-2">Identity Proof: Aadhaar card, voter ID, passport, or driving license</p>
//             <p className="text-sm text-blue-600 py-2">Address Proof: Aadhaar, utility bill, or passport</p>
//             <p className="text-sm text-gray-600 py-2">Date of Birth Proof: Birth certificate, school leaving certificate, or Aadhaar</p>
//             <p className="text-sm text-gray-600 py-2">Photograph: Passport-size</p>
//           </div>
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">3. Apply Online</h3>
//             <p className="text-sm text-green-600 py-2">Visit NSDL e-Gov or UTIITSL portal</p>
//             <p className="text-sm text-blue-600 py-2">Fill Form 49A/49AA</p>
//             <p className="text-sm text-green-600 py-2">Upload documents</p>
//             <p className="text-sm text-blue-600 py-2">Pay fee (₹110 for Indian address)</p>
//             <p className="text-sm text-green-600 py-2">Complete e-KYC</p>
//             <p className="text-sm text-blue-600 py-2">Track status with acknowledgment number</p>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Bank Account Number',
//       Description: 'Needed for financial transactions and linking to IEC and AD Codes',
//       content:
//         <div className="grid grid-cols-2 gap-4">
  
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Opening a Bank Account</h3>
//             <p className="text-sm text-green-600 py-2">Choose a bank offering export-import account services</p>
//             <p className="text-sm text-blue-600 py-2">Gather documents: PAN, Aadhaar, proof of business registration, and address proof</p>
//             <p className="text-sm text-gray-600 py-2">Fill account opening form</p>
//             <p className="text-sm text-gray-600 py-2">Submit Know Your Customer (KYC) documents</p>
//             <p className="text-sm text-gray-600 py-2">Link account to GST and IEC codes</p>
//           </div>
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Maintaining Account</h3>
//             <p className="text-sm text-green-600 py-2">Keep records of transactions for audits</p>
//             <p className="text-sm text-blue-600 py-2">Monitor account for IEC-related activities</p>
//             <p className="text-sm text-green-600 py-2">Ensure sufficient balance for application fees and trade activities</p>
  
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Aadhaar Card/Business Registration Certificate',
//       Description: 'Aadhaar Card for personal identification and Business Registration Certificate for business verification',
//       content:
//         <div className="grid grid-cols-2 gap-4">
  
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Using Aadhaar for Verification</h3>
//             <p className="text-sm text-green-600 py-2">Ensure Aadhaar is updated with correct details</p>
//             <p className="text-sm text-blue-600 py-2">Link Aadhaar to PAN and bank account</p>
//             <p className="text-sm text-green-600 py-2">Use Aadhaar OTP for e-KYC during applications</p>
  
//           </div>
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Using Business Registration Certificate</h3>
//             <p className="text-sm text-green-600 py-2">Obtain certificate from respective authorities based on business type (e.g., MSME, Shops and Establishments Act)</p>
//             <p className="text-sm text-blue-600 py-2">Ensure details match other submitted documents</p>
//             <p className="text-sm text-green-600 py-2">Provide digital and physical copies where required</p>
  
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'HS Code',
//       Description: 'Harmonized System Code for product classification and customs clearance',
//       content:
//         <div className="grid grid-cols-2 gap-4">
  
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Finding the HS Code</h3>
//             <p className="text-sm text-green-600 py-2">Visit DGFT or CBIC HS Code lookup websites</p>
//             <p className="text-sm text-blue-600 py-2">Identify code based on product type</p>
//             <p className="text-sm text-green-600 py-2">Consult with trade experts if needed</p>
  
//           </div>
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Using HS Code</h3>
//             <p className="text-sm text-green-600 py-2">Include in Shipping Bill and Invoice</p>
//             <p className="text-sm text-blue-600 py-2">Verify accuracy to avoid penalties or delays</p>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'IEC Code',
//       Description: 'Import Export Code for international trade and customs clearance from DGFT',
//       content:
//         <div className="grid grid-cols-3 gap-4">
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Prerequisites</h3>
//             <p className="text-sm text-green-600 py-2">Valid PAN Card</p>
//             <p className="text-sm text-blue-600 py-2">Active Bank Account</p>
//             <p className="text-sm text-green-600 py-2">Digital Signature Certificate (recommended)</p>
  
//           </div>
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Online Application</h3>
//             <p className="text-sm text-green-600 py-2">Visit DGFT website</p>
//             <p className="text-sm text-blue-600 py-2">Register as new user</p>
//             <p className="text-sm text-green-600 py-2">Fill online IEC application form</p>
//             <p className="text-sm text-blue-600 py-2">Upload required documents</p>
//             <p className="text-sm text-green-600 py-2">Pay application fee</p>
//           </div>
//           <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">3. Post-Approval Steps</h3>
//             <p className="text-sm text-green-600 py-2">Download IEC certificate</p>
//             <p className="text-sm text-blue-600 py-2">Link IEC with AD Code in the bank</p>
//             <p className="text-sm text-green-600 py-2">Maintain IEC for audits and renewals</p>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'GST Registration Certificate',
//       Description: 'Needed for claiming GST refunds on exports',
//       content:
//         <div className="grid grid-cols-2 gap-4">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Required Documents</h3>
//             <p className="text-sm text-green-600 py-2">PAN of Business</p>
//             <p className="text-sm text-blue-600 py-2">Aadhaar of Proprietor/Partners/Directors</p>
//             <p className="text-sm text-green-600 py-2">Bank Account Details</p>
//             <p className="text-sm text-blue-600 py-2">Business Registration Documents</p>
//           </div>
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Steps to Register</h3>
//             <p className="text-sm text-green-600 py-2">Visit GST portal</p>
//             <p className="text-sm text-blue-600 py-2">Fill registration form GST REG-01</p>
//             <p className="text-sm text-green-600 py-2">Upload scanned documents</p>
//             <p className="text-sm text-blue-600 py-2">Submit e-signature</p>
//             <p className="text-sm text-green-600 py-2">Track application status and download GSTIN</p>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'RCMC (Registration-Cum-Membership Certificate)',
//       Description: 'Required for export benefits under government schemes',
//       content:
//         <div className="grid grid-cols-2 gap-4">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Obtaining RCMC</h3>
//             <p className="text-sm text-green-600 py-2">Apply to Export Promotion Council relevant to your product</p>
//             <p className="text-sm text-blue-600 py-2">Submit proof of business registration, PAN, and IEC</p>
//             <p className="text-sm text-green-600 py-2">Pay membership fees</p>
//             <p className="text-sm text-blue-600 py-2">Receive RCMC certificate</p>
//           </div>
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Using RCMC</h3>
//             <p className="text-sm text-green-600 py-2">Access export incentives under MEIS, SEIS, or similar schemes</p>
//             <p className="text-sm text-blue-600 py-2">Provide RCMC details in customs filings</p>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'AD Code',
//       Description: 'Assigned by the bank and linked to IEC; required for customs clearance',
//       content:
//         <div className="grid grid-cols-2 gap-4">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Steps to Obtain AD Code</h3>
//             <p className="text-sm text-green-600 py-2">Request AD Code from your bank</p>
//             <p className="text-sm text-blue-600 py-2">Provide IEC, bank account details, and business registration proof</p>
//             <p className="text-sm text-green-600 py-2">Bank issues AD Code letter</p>
//           </div>
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Linking AD Code</h3>
//             <p className="text-sm text-green-600 py-2">Submit AD Code to customs at the port of export</p>
//             <p className="text-sm text-blue-600 py-2">Ensure AD Code is activated for your port</p>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Export Agreement/Proforma Invoice',
//       Description: 'Defines the terms of trade and initial agreement between exporter and importer',
//       content:
//         <div className="grid grid-cols-2 gap-4">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Components of an Export Agreement</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Details of exporter and importer</li>
//               <li className="text-sm text-blue-600 py-2">Product description, quantity, and quality</li>
//               <li className="text-sm text-green-600 py-2">Delivery terms (e.g., FOB, CIF, EXW)</li>
//               <li className="text-sm text-blue-600 py-2">Payment terms (e.g., advance, letter of credit)</li>
//               <li className="text-sm text-green-600 py-2">Applicable laws and dispute resolution clauses</li>
//             </ul>
//           </div>
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Preparing a Proforma Invoice</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Include exporter and importer details</li>
//               <li className="text-sm text-blue-600 py-2">Provide product details: description, HS Code, unit price, and total value</li>
//               <li className="text-sm text-green-600 py-2">Mention payment terms and delivery timeline</li>
//               <li className="text-sm text-blue-600 py-2">Add reference to applicable taxes/duties if relevant</li>
//               <li className="text-sm text-green-600 py-2">Include exporter’s signature and date</li>
//             </ul>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Letter of Credit or Payment Terms Agreement',
//       Description: 'Secures payment terms for the export',
//       content:
//         <div className="grid grid-cols-2 gap-4">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Steps to Obtain a Letter of Credit</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Agree on LC terms with the importer</li>
//               <li className="text-sm text-blue-600 py-2">Importer applies for LC at their bank</li>
//               <li className="text-sm text-green-600 py-2">Bank issues LC and sends it to exporter’s bank</li>
//               <li className="text-sm text-blue-600 py-2">Ensure LC terms match the sales agreement</li>
//             </ul>
//           </div>
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Common Payment Terms</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Advance Payment</li>
//               <li className="text-sm text-blue-600 py-2">Open Account (payment after delivery)</li>
//               <li className="text-sm text-green-600 py-2">Cash Against Documents (CAD)</li>
//               <li className="text-sm text-blue-600 py-2">Letter of Credit (most secure)</li>
//             </ul>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Commercial Invoice',
//       Description: 'Prepared by the exporter; details the goods being exported',
//       content:
//         <div className="grid grid-cols-2 gap-4">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Key Elements of a Commercial Invoice</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Exporter and importer details</li>
//               <li className="text-sm text-blue-600 py-2">Invoice number and date</li>
//               <li className="text-sm text-green-600 py-2">Product details: name, quantity, unit price, and total value</li>
//               <li className="text-sm text-blue-600 py-2">HS Code for each product</li>
//               <li className="text-sm text-green-600 py-2">Payment and delivery terms</li>
//               <li className="text-sm text-blue-600 py-2">Shipping details: mode, carrier, and destination</li>
//             </ul>
//           </div>
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Tips for Preparing</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Ensure details match the Proforma Invoice</li>
//               <li className="text-sm text-blue-600 py-2">Check for compliance with import country’s regulations</li>
//               <li className="text-sm text-green-600 py-2">Include reference to any trade agreements for duty benefits</li>
//             </ul>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Packing List',
//       Description: 'Lists the details of packaging, supplementing the Commercial Invoice',
//       content:
//         <div className="grid grid-cols-2 gap-4">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">1. Components of a Packing List</li>
//               <ul className="list-disc pl-8">
//                 <li className="text-sm text-blue-600 py-2">Exporter and importer details</li>
//                 <li className="text-sm text-green-600 py-2">Invoice number linked to the Packing List</li>
//                 <li className="text-sm text-blue-600 py-2">Description of goods, including quantity and packaging details</li>
//                 <li className="text-sm text-green-600 py-2">Gross and net weight of each package</li>
//                 <li className="text-sm text-blue-600 py-2">Dimensions of packages</li>
//               </ul>
//             </ul>
//           </div>
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Best Practices</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Use standardized packaging materials for ease of handling</li>
//               <li className="text-sm text-blue-600 py-2">Ensure proper labeling for fragile or perishable items</li>
//               <li className="text-sm text-green-600 py-2">Attach the Packing List to the outside of the shipment</li>
//             </ul>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Certificate of Inspection/Quality Certificate',
//       Description: 'Needed for certain goods to meet importer or country-specific standards',
//       content:
//         <div className="grid grid-cols-2 gap-4">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">1. Steps to Obtain</li>
//               <ul className="list-disc pl-8">
//                 <li className="text-sm text-blue-600 py-2">Identify if your product requires inspection (e.g., machinery, chemicals)</li>
//                 <li className="text-sm text-green-600 py-2">Contact approved inspection agencies (e.g., BIS, SGS)</li>
//                 <li className="text-sm text-blue-600 py-2">Schedule an inspection of goods</li>
//                 <li className="text-sm text-green-600 py-2">Receive certificate after successful inspection</li>
//               </ul>
//             </ul>
//           </div>
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Using the Certificate</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Attach it to customs documents for clearance</li>
//               <li className="text-sm text-blue-600 py-2">Share with importer to meet trade requirements</li>
//             </ul>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Phytosanitary and Fumigation Certificate',
//       Description: 'Mandatory for agricultural products or plant-based goods',
//       content:
//         <div className="grid grid-cols-2 gap-4">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">1. Steps to Obtain Phytosanitary Certificate</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Submit application to the nearest Plant Quarantine office</li>
//               <li className="text-sm text-blue-600 py-2">Provide details of shipment and exporter</li>
//               <li className="text-sm text-green-600 py-2">Get goods inspected by quarantine officers</li>
//               <li className="text-sm text-blue-600 py-2">Receive certificate if goods meet standards</li>
//             </ul>
//           </div>
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Steps to Obtain Fumigation Certificate</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Contact approved fumigation service providers</li>
//               <li className="text-sm text-blue-600 py-2">Arrange fumigation for goods as per standards</li>
//               <li className="text-sm text-green-600 py-2">Receive certificate confirming compliance</li>
//             </ul>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Certificate of Origin',
//       Description: 'May be needed for preferential duty benefits under trade agreements; depends on the Commercial Invoice',
//       content:
//         <div className="grid grid-cols-2 gap-4">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">Types of Certificates of Origin</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Preferential: For reduced duties under trade agreements</li>
//               <li className="text-sm text-blue-600 py-2">Non-Preferential: Certifies origin but doesn’t provide duty benefits</li>
//             </ul>
//           </div>
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Steps to Obtain</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Apply to authorized agency (e.g., chambers of commerce)</li>
//               <li className="text-sm text-blue-600 py-2">Submit Commercial Invoice, Packing List, and HS Codes</li>
//               <li className="text-sm text-green-600 py-2">Receive stamped Certificate of Origin</li>
//             </ul>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Marine Insurance Policy/Insurance Certificate',
//       Description: 'Ensures protection of goods during transit',
//       content:
//         <div className="grid grid-cols-2 gap-4">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">1. Steps to Obtain Marine Insurance</li>
//               <ul className="list-disc pl-8">
//                 <li className="text-sm text-blue-600 py-2">Select insurance provider specializing in exports</li>
//                 <li className="text-sm text-green-600 py-2">Provide shipment details: route, mode, and goods value</li>
//                 <li className="text-sm text-blue-600 py-2">Choose type of coverage (e.g., All Risk, Total Loss)</li>
//                 <li className="text-sm text-green-600 py-2">Pay premium and receive policy</li>
//               </ul>
//             </ul>
//           </div>
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">2. Using Insurance Certificate</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">Submit to customs if required</li>
//               <li className="text-sm text-blue-600 py-2">Present to importer for assurance of goods’ safety</li>
//             </ul>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Shipping Bill',
//       Description: 'Core document for customs clearance; depends on the Commercial Invoice, Packing List, and Certificate of Origin',
//       content:
//         <div >
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">1. Preparing the Shipping Bill</li>
//               <ul className="list-disc pl-8">
//                 <li className="text-sm text-blue-600 py-2">Submit Commercial Invoice, Packing List, and IEC</li>
//                 <li className="text-sm text-green-600 py-2">Provide HS Code and AD Code details</li>
//                 <li className="text-sm text-blue-600 py-2">Include export duty (if applicable)</li>
//               </ul>
//               <li className="text-sm text-green-600 py-2">2. Submission</li>
//               <ul className="list-disc pl-8">
//                 <li className="text-sm text-blue-600 py-2">File online through ICEGATE portal</li>
//                 <li className="text-sm text-green-600 py-2">Receive Shipping Bill number for tracking</li>
//               </ul>
//             </ul>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Bill of Lading (or Airway Bill)',
//       Description: 'Issued by the carrier and confirms the goods\' shipment; depends on the Shipping Bill',
//       content:
//         <div >
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">1. Details Included</li>
//               <ul className="list-disc pl-8">
//                 <li className="text-sm text-blue-600 py-2">Exporter and importer details</li>
//                 <li className="text-sm text-green-600 py-2">Carrier name and mode of transport</li>
//                 <li className="text-sm text-blue-600 py-2">Description of goods, including weight and quantity</li>
//                 <li className="text-sm text-green-600 py-2">Destination and port of loading</li>
//               </ul>
//               <li className="text-sm text-green-600 py-2">2. Obtaining the Bill</li>
//               <ul className="list-disc pl-8">
//                 <li className="text-sm text-blue-600 py-2">Submit Shipping Bill and proof of customs clearance to carrier</li>
//                 <li className="text-sm text-green-600 py-2">Receive original and duplicate copies for use</li>
//               </ul>
//             </ul>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//     {
//       title: 'Let Export Order (Customs-issued clearance)',
//       Description: 'Customs-issued clearance for the export after verifying Shipping Bill and related documents',
//       content:
//         <div className="w-full">
//           <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
//             <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
//             <ul className="list-disc pl-4">
//               <li className="text-sm text-green-600 py-2">1. Steps to Obtain</li>
//               <ul className="list-disc pl-8">
//                 <li className="text-sm text-blue-600 py-2">Submit Shipping Bill to customs</li>
//                 <li className="text-sm text-green-600 py-2">Undergo customs inspection (if required)</li>
//                 <li className="text-sm text-blue-600 py-2">Receive Let Export Order once documents are verified</li>
//               </ul>
//             </ul>
//           </div>
//         </div>,
  
//       status: 'pending'
//     },
//   ]




































"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronRight, ChevronDown, BookOpen } from 'lucide-react';

const Learner = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const decodedTitle = params.title ? decodeURIComponent(params.title)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/learn/${params.title}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        console.log('Document details:', result);
        setData(result);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.title]);

  const renderContent = (content) => {
    if (!content) return null;

    // Split content into sections based on numbered headers
    const sections = content.split(/(?=\d+\.\s+[A-Z])/);

    return sections.map((section, index) => {
      if (!section.trim()) return null;

      // Extract section title and content
      const [title, ...contentParts] = section.split('\n');
      const sectionContent = contentParts.join('\n');

      // Process subsections
      const subsections = sectionContent.split(/(?=(?:Key Benefits|When|Validity Period|Required|Processing Timeline|List of|Format Specifications|Special Requirements|Industry Standards|Quality Checks|Professional Tips|Frequent Mistakes|How to Avoid|Solution Strategies|Regulatory Requirements|Important Regulations|Compliance Checklist|Fee Structure|Additional Charges|Payment Methods|Time-Saving Strategies|Efficiency Improvements|Professional Recommendations):)/);

      return (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {title.trim()}
          </h2>
          
          {subsections.map((subsection, subIndex) => {
            if (!subsection.trim()) return "car";

            const [subTitle, ...subContent] = subsection.split('\n');
            const content = subContent.join('\n');

            return (
              <div key={subIndex} className="ml-4 mb-4">
                {subTitle.includes(':') ? (
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {subTitle.trim()}
                  </h3>
                ) : null}
                
                <div className="prose dark:prose-invert max-w-none">
                  {content.split('\n').map((paragraph, pIndex) => {
                    if (!paragraph.trim()) return null;

                    // Handle special formatting
                    if (paragraph.includes('✓')) {
                      return (
                        <div key={pIndex} className="flex items-start space-x-2 text-green-600 dark:text-green-400 my-1">
                          <span className="mt-1">✓</span>
                          <span>{paragraph.replace('✓', '').trim()}</span>
                        </div>
                      );
                    }
                    
                    if (paragraph.includes('⚠️')) {
                      return (
                        <div key={pIndex} className="flex items-start space-x-2 text-yellow-600 dark:text-yellow-400 my-1">
                          <span className="mt-1">⚠️</span>
                          <span>{paragraph.replace('⚠️', '').trim()}</span>
                        </div>
                      );
                    }
                    
                    if (paragraph.includes('💡')) {
                      return (
                        <div key={pIndex} className="flex items-start space-x-2 text-purple-600 dark:text-purple-400 my-1">
                          <span className="mt-1">💡</span>
                          <span>{paragraph.replace('💡', '').trim()}</span>
                        </div>
                      );
                    }

                    return (
                      <p key={pIndex} className="my-2 text-gray-700 dark:text-gray-300">
                        {paragraph.trim()}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="text-red-500">Error: {error}</div>
        </CardContent>
      </Card> 
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <CardTitle className="text-2xl font-bold">
              {decodedTitle}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {data && renderContent(data.document_content)}
        </CardContent>
      </Card>
    </div>
  );
};

export default Learner;
