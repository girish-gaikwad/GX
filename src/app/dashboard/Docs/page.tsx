"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  X,
  File,
  ChevronRight,
  Info,
  ListChecks,
  CalendarDays,
} from "lucide-react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { DialogPortal } from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";

const DocumentPreview = ({ isOpen, docData, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleDownload = async () => {
    try {
      const response = await fetch(docData.pdfPath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${docData.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  if (!docData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30 dark:bg-black/70 z-50 backdrop-blur-sm" />

        <DialogContent className="fixed left-[50%] top-[50%] w-full max-w-3xl max-h-[95vh] translate-x-[-50%] translate-y-[-50%] rounded-xl shadow-2xl p-6 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            <div className="mb-4">
              <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {docData.title}
              </h3>
              <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {docData.description}
              </p>
            </div>

            {/* Content Area */}
            <div className="flex  flex-col md:flex-row gap-6 overflow-auto">
              {/* Left Section - PDF Preview */}
              <div className="w-full  h-full md:w-1/2 space-y-4">
                <div className={` rounded-lg overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <iframe
                    src={`${docData.pdfPath}#toolbar=0`}
                    className="w-full h-full"
                    style={{ minHeight: '400px' }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Template
                </motion.button>
              </div>

              {/* Right Section - Details */}
              <div className="w-full md:w-1/2 space-y-2 ">
                {/* Purpose */}
                <div className={`rounded-lg p-4 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-center mb-3">
                    <Info className={`w-5 h-5 mr-2 ${isDark ? 'text-white/60' : 'text-gray-400'}`} />
                    <h4 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Purpose</h4>
                  </div>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {docData.details?.purpose}
                  </p>
                </div>

                {/* Required Fields */}
                <div className={`rounded-lg p-4 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-center mb-3">
                    <ListChecks className={`w-5 h-5 mr-2 ${isDark ? 'text-white/60' : 'text-gray-400'}`} />
                    <h4 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Required Fields</h4>
                  </div>
                  <ul className={`flex flex-col space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {docData.details?.requiredFields.map((field, index) => (
                      <li key={index} className="flex items-center">
                        <ChevronRight className={`w-4 h-4 mr-2 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                        {field}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Validity */}
                <div className={`rounded-lg p-4 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-center mb-3">
                    <CalendarDays className={`w-5 h-5 mr-2 ${isDark ? 'text-white/60' : 'text-gray-400'}`} />
                    <h4 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Validity & Requirements</h4>
                  </div>
                  <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p>
                      <span className={isDark ? 'text-white/60' : 'text-gray-500'}>
                        Validity Period:{' '}
                      </span>
                      {docData.details?.validityPeriod}
                    </p>
                    <p>
                      <span className={isDark ? 'text-white/60' : 'text-gray-500'}>
                        Requirements:{' '}
                      </span>
                      {docData.details?.requirements}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

const DocumentCard = ({ docData: doc, index }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleDownload = async () => {
    try {
      const response = await fetch(doc.pdfPath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${doc.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`relative p-6 rounded-lg backdrop-blur-md border transition-all group ${isDark
          ? 'bg-white/10 border-white/20 hover:bg-white/20'
          : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {doc.title}
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {doc.description}
              </p>
            </div>
            <File className={isDark ? 'text-white/60' : 'text-gray-400'} />
          </div>

          <div className="flex gap-2 mt-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPreviewOpen(true)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${isDark
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Preview
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className={`flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${isDark
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </motion.button>
          </div>
        </div>
      </motion.div>

      <DocumentPreview
        isOpen={isPreviewOpen}
        docData={doc}
        onClose={() => setIsPreviewOpen(false)}
      />
    </>
  );
};

const ExportDocHub = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Sample documents data with PDF paths
  const documents = [

    {
      title: "Export Agreement/Proforma Invoice",
      description:
        "Initial agreement outlining terms, prices, and conditions before final invoice",
      preview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sections include: Buyer & Seller Details, Terms of Trade, Product Specifications, Payment Terms...",
      pdfPath: "/pdfs/export_agreement_proforma_invoice.pdf", // Add the path to your PDF file

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
      pdfPath: "/pdfs/commercial_invoice.pdf", // Add the path to your PDF file
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
      pdfPath: "/pdfs/packing_list.pdf", // Add the path to your PDF file
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
      pdfPath: "/pdfs/certificate_of_origin.pdf", // Add the path to your PDF file
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
      pdfPath: "/pdfs/letter_of_credit.pdf", // Add the path to your PDF file
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
      pdfPath: "/pdfs/bill_of_lading.pdf", // Add the path to your PDF file
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
      pdfPath: "/pdfs/tax_invoice.pdf", // Add the path to your PDF file
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
      pdfPath: "/pdfs/Inland_Bill_of_Lading.pdf", // Add the path to your PDF file
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
      pdfPath: "/pdfs/Ocean_Bill_of_Lading.pdf",
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
      pdfPath: "/pdfs/Dock_Receipt.pdf", // Add the path to your PDF file
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
      pdfPath: "/pdfs/Air_Waybill.pdf", // Add the path to your PDF file
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

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Export Documentation Hub
          </h1>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Access and download all essential export documentation templates
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {documents.map((doc, index) => (
            <DocumentCard key={index} docData={doc} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ExportDocHub;