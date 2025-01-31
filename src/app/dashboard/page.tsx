"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, RotateCcw, CircleDot, Circle } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Description } from '@radix-ui/react-dialog';




const steps = [
  {
    title: 'Pan Card',
    Description: 'Permanent Account Number for tax identification and required for business registration and export activities',
    content:
      <div className="grid grid-cols-3 gap-4">
        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Decide the Type of PAN</h3>
          <p className="text-sm text-green-600 py-2">For Individuals: Personal PAN</p>
          <p className="text-sm text-blue-600 py-2">For Businesses: PAN for Proprietorship, Partnership, LLP, Company, Trust, etc.</p>
        </div>
        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Gather Required Documents</h3>
          <p className="text-sm text-green-600 py-2">Identity Proof: Aadhaar card, voter ID, passport, or driving license</p>
          <p className="text-sm text-blue-600 py-2">Address Proof: Aadhaar, utility bill, or passport</p>
          <p className="text-sm text-gray-600 py-2">Date of Birth Proof: Birth certificate, school leaving certificate, or Aadhaar</p>
          <p className="text-sm text-gray-600 py-2">Photograph: Passport-size</p>
        </div>
        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">3. Apply Online</h3>
          <p className="text-sm text-green-600 py-2">Visit NSDL e-Gov or UTIITSL portal</p>
          <p className="text-sm text-blue-600 py-2">Fill Form 49A/49AA</p>
          <p className="text-sm text-green-600 py-2">Upload documents</p>
          <p className="text-sm text-blue-600 py-2">Pay fee (₹110 for Indian address)</p>
          <p className="text-sm text-green-600 py-2">Complete e-KYC</p>
          <p className="text-sm text-blue-600 py-2">Track status with acknowledgment number</p>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Bank Account Number',
    Description: 'Needed for financial transactions and linking to IEC and AD Codes',
    content:
      <div className="grid grid-cols-2 gap-4">

        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Opening a Bank Account</h3>
          <p className="text-sm text-green-600 py-2">Choose a bank offering export-import account services</p>
          <p className="text-sm text-blue-600 py-2">Gather documents: PAN, Aadhaar, proof of business registration, and address proof</p>
          <p className="text-sm text-gray-600 py-2">Fill account opening form</p>
          <p className="text-sm text-gray-600 py-2">Submit Know Your Customer (KYC) documents</p>
          <p className="text-sm text-gray-600 py-2">Link account to GST and IEC codes</p>
        </div>
        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Maintaining Account</h3>
          <p className="text-sm text-green-600 py-2">Keep records of transactions for audits</p>
          <p className="text-sm text-blue-600 py-2">Monitor account for IEC-related activities</p>
          <p className="text-sm text-green-600 py-2">Ensure sufficient balance for application fees and trade activities</p>

        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Aadhaar Card Business Registration Certificate',
    Description: 'Aadhaar Card for personal identification and Business Registration Certificate for business verification',
    content:
      <div className="grid grid-cols-2 gap-4">

        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Using Aadhaar for Verification</h3>
          <p className="text-sm text-green-600 py-2">Ensure Aadhaar is updated with correct details</p>
          <p className="text-sm text-blue-600 py-2">Link Aadhaar to PAN and bank account</p>
          <p className="text-sm text-green-600 py-2">Use Aadhaar OTP for e-KYC during applications</p>

        </div>
        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Using Business Registration Certificate</h3>
          <p className="text-sm text-green-600 py-2">Obtain certificate from respective authorities based on business type (e.g., MSME, Shops and Establishments Act)</p>
          <p className="text-sm text-blue-600 py-2">Ensure details match other submitted documents</p>
          <p className="text-sm text-green-600 py-2">Provide digital and physical copies where required</p>

        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'HS Code',
    Description: 'Harmonized System Code for product classification and customs clearance',
    content:
      <div className="grid grid-cols-2 gap-4">

        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Finding the HS Code</h3>
          <p className="text-sm text-green-600 py-2">Visit DGFT or CBIC HS Code lookup websites</p>
          <p className="text-sm text-blue-600 py-2">Identify code based on product type</p>
          <p className="text-sm text-green-600 py-2">Consult with trade experts if needed</p>

        </div>
        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Using HS Code</h3>
          <p className="text-sm text-green-600 py-2">Include in Shipping Bill and Invoice</p>
          <p className="text-sm text-blue-600 py-2">Verify accuracy to avoid penalties or delays</p>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'IEC Code',
    Description: 'Import Export Code for international trade and customs clearance from DGFT',
    content:
      <div className="grid grid-cols-3 gap-4">
        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Prerequisites</h3>
          <p className="text-sm text-green-600 py-2">Valid PAN Card</p>
          <p className="text-sm text-blue-600 py-2">Active Bank Account</p>
          <p className="text-sm text-green-600 py-2">Digital Signature Certificate (recommended)</p>

        </div>
        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Online Application</h3>
          <p className="text-sm text-green-600 py-2">Visit DGFT website</p>
          <p className="text-sm text-blue-600 py-2">Register as new user</p>
          <p className="text-sm text-green-600 py-2">Fill online IEC application form</p>
          <p className="text-sm text-blue-600 py-2">Upload required documents</p>
          <p className="text-sm text-green-600 py-2">Pay application fee</p>
        </div>
        <div className=" shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">3. Post-Approval Steps</h3>
          <p className="text-sm text-green-600 py-2">Download IEC certificate</p>
          <p className="text-sm text-blue-600 py-2">Link IEC with AD Code in the bank</p>
          <p className="text-sm text-green-600 py-2">Maintain IEC for audits and renewals</p>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'GST Registration Certificate',
    Description: 'Needed for claiming GST refunds on exports',
    content:
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Required Documents</h3>
          <p className="text-sm text-green-600 py-2">PAN of Business</p>
          <p className="text-sm text-blue-600 py-2">Aadhaar of Proprietor/Partners/Directors</p>
          <p className="text-sm text-green-600 py-2">Bank Account Details</p>
          <p className="text-sm text-blue-600 py-2">Business Registration Documents</p>
        </div>
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Steps to Register</h3>
          <p className="text-sm text-green-600 py-2">Visit GST portal</p>
          <p className="text-sm text-blue-600 py-2">Fill registration form GST REG-01</p>
          <p className="text-sm text-green-600 py-2">Upload scanned documents</p>
          <p className="text-sm text-blue-600 py-2">Submit e-signature</p>
          <p className="text-sm text-green-600 py-2">Track application status and download GSTIN</p>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'RCMC (Registration-Cum-Membership Certificate)',
    Description: 'Required for export benefits under government schemes',
    content:
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Obtaining RCMC</h3>
          <p className="text-sm text-green-600 py-2">Apply to Export Promotion Council relevant to your product</p>
          <p className="text-sm text-blue-600 py-2">Submit proof of business registration, PAN, and IEC</p>
          <p className="text-sm text-green-600 py-2">Pay membership fees</p>
          <p className="text-sm text-blue-600 py-2">Receive RCMC certificate</p>
        </div>
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Using RCMC</h3>
          <p className="text-sm text-green-600 py-2">Access export incentives under MEIS, SEIS, or similar schemes</p>
          <p className="text-sm text-blue-600 py-2">Provide RCMC details in customs filings</p>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'AD Code',
    Description: 'Assigned by the bank and linked to IEC; required for customs clearance',
    content:
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Steps to Obtain AD Code</h3>
          <p className="text-sm text-green-600 py-2">Request AD Code from your bank</p>
          <p className="text-sm text-blue-600 py-2">Provide IEC, bank account details, and business registration proof</p>
          <p className="text-sm text-green-600 py-2">Bank issues AD Code letter</p>
        </div>
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Linking AD Code</h3>
          <p className="text-sm text-green-600 py-2">Submit AD Code to customs at the port of export</p>
          <p className="text-sm text-blue-600 py-2">Ensure AD Code is activated for your port</p>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Export Agreement (Proforma Invoice)',
    Description: 'Defines the terms of trade and initial agreement between exporter and importer',
    content:
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Components of an Export Agreement</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Details of exporter and importer</li>
            <li className="text-sm text-blue-600 py-2">Product description, quantity, and quality</li>
            <li className="text-sm text-green-600 py-2">Delivery terms (e.g., FOB, CIF, EXW)</li>
            <li className="text-sm text-blue-600 py-2">Payment terms (e.g., advance, letter of credit)</li>
            <li className="text-sm text-green-600 py-2">Applicable laws and dispute resolution clauses</li>
          </ul>
        </div>
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Preparing a Proforma Invoice</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Include exporter and importer details</li>
            <li className="text-sm text-blue-600 py-2">Provide product details: description, HS Code, unit price, and total value</li>
            <li className="text-sm text-green-600 py-2">Mention payment terms and delivery timeline</li>
            <li className="text-sm text-blue-600 py-2">Add reference to applicable taxes/duties if relevant</li>
            <li className="text-sm text-green-600 py-2">Include exporter’s signature and date</li>
          </ul>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Letter of Credit or Payment Terms Agreement',
    Description: 'Secures payment terms for the export',
    content:
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Steps to Obtain a Letter of Credit</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Agree on LC terms with the importer</li>
            <li className="text-sm text-blue-600 py-2">Importer applies for LC at their bank</li>
            <li className="text-sm text-green-600 py-2">Bank issues LC and sends it to exporter’s bank</li>
            <li className="text-sm text-blue-600 py-2">Ensure LC terms match the sales agreement</li>
          </ul>
        </div>
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Common Payment Terms</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Advance Payment</li>
            <li className="text-sm text-blue-600 py-2">Open Account (payment after delivery)</li>
            <li className="text-sm text-green-600 py-2">Cash Against Documents (CAD)</li>
            <li className="text-sm text-blue-600 py-2">Letter of Credit (most secure)</li>
          </ul>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Commercial Invoice',
    Description: 'Prepared by the exporter; details the goods being exported',
    content:
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Key Elements of a Commercial Invoice</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Exporter and importer details</li>
            <li className="text-sm text-blue-600 py-2">Invoice number and date</li>
            <li className="text-sm text-green-600 py-2">Product details: name, quantity, unit price, and total value</li>
            <li className="text-sm text-blue-600 py-2">HS Code for each product</li>
            <li className="text-sm text-green-600 py-2">Payment and delivery terms</li>
            <li className="text-sm text-blue-600 py-2">Shipping details: mode, carrier, and destination</li>
          </ul>
        </div>
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Tips for Preparing</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Ensure details match the Proforma Invoice</li>
            <li className="text-sm text-blue-600 py-2">Check for compliance with import country’s regulations</li>
            <li className="text-sm text-green-600 py-2">Include reference to any trade agreements for duty benefits</li>
          </ul>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Packing List',
    Description: 'Lists the details of packaging, supplementing the Commercial Invoice',
    content:
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">1. Components of a Packing List</li>
            <ul className="list-disc pl-8">
              <li className="text-sm text-blue-600 py-2">Exporter and importer details</li>
              <li className="text-sm text-green-600 py-2">Invoice number linked to the Packing List</li>
              <li className="text-sm text-blue-600 py-2">Description of goods, including quantity and packaging details</li>
              <li className="text-sm text-green-600 py-2">Gross and net weight of each package</li>
              <li className="text-sm text-blue-600 py-2">Dimensions of packages</li>
            </ul>
          </ul>
        </div>
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Best Practices</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Use standardized packaging materials for ease of handling</li>
            <li className="text-sm text-blue-600 py-2">Ensure proper labeling for fragile or perishable items</li>
            <li className="text-sm text-green-600 py-2">Attach the Packing List to the outside of the shipment</li>
          </ul>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Certificate of Inspection (Quality Certificate)',
    Description: 'Needed for certain goods to meet importer or country-specific standards',
    content:
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">1. Steps to Obtain</li>
            <ul className="list-disc pl-8">
              <li className="text-sm text-blue-600 py-2">Identify if your product requires inspection (e.g., machinery, chemicals)</li>
              <li className="text-sm text-green-600 py-2">Contact approved inspection agencies (e.g., BIS, SGS)</li>
              <li className="text-sm text-blue-600 py-2">Schedule an inspection of goods</li>
              <li className="text-sm text-green-600 py-2">Receive certificate after successful inspection</li>
            </ul>
          </ul>
        </div>
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Using the Certificate</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Attach it to customs documents for clearance</li>
            <li className="text-sm text-blue-600 py-2">Share with importer to meet trade requirements</li>
          </ul>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Phytosanitary and Fumigation Certificate',
    Description: 'Mandatory for agricultural products or plant-based goods',
    content:
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">1. Steps to Obtain Phytosanitary Certificate</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Submit application to the nearest Plant Quarantine office</li>
            <li className="text-sm text-blue-600 py-2">Provide details of shipment and exporter</li>
            <li className="text-sm text-green-600 py-2">Get goods inspected by quarantine officers</li>
            <li className="text-sm text-blue-600 py-2">Receive certificate if goods meet standards</li>
          </ul>
        </div>
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Steps to Obtain Fumigation Certificate</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Contact approved fumigation service providers</li>
            <li className="text-sm text-blue-600 py-2">Arrange fumigation for goods as per standards</li>
            <li className="text-sm text-green-600 py-2">Receive certificate confirming compliance</li>
          </ul>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Certificate of Origin',
    Description: 'May be needed for preferential duty benefits under trade agreements; depends on the Commercial Invoice',
    content:
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">Types of Certificates of Origin</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Preferential: For reduced duties under trade agreements</li>
            <li className="text-sm text-blue-600 py-2">Non-Preferential: Certifies origin but doesn’t provide duty benefits</li>
          </ul>
        </div>
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Steps to Obtain</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Apply to authorized agency (e.g., chambers of commerce)</li>
            <li className="text-sm text-blue-600 py-2">Submit Commercial Invoice, Packing List, and HS Codes</li>
            <li className="text-sm text-green-600 py-2">Receive stamped Certificate of Origin</li>
          </ul>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Marine Insurance Policy (Insurance Certificate)',
    Description: 'Ensures protection of goods during transit',
    content:
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">1. Steps to Obtain Marine Insurance</li>
            <ul className="list-disc pl-8">
              <li className="text-sm text-blue-600 py-2">Select insurance provider specializing in exports</li>
              <li className="text-sm text-green-600 py-2">Provide shipment details: route, mode, and goods value</li>
              <li className="text-sm text-blue-600 py-2">Choose type of coverage (e.g., All Risk, Total Loss)</li>
              <li className="text-sm text-green-600 py-2">Pay premium and receive policy</li>
            </ul>
          </ul>
        </div>
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">2. Using Insurance Certificate</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">Submit to customs if required</li>
            <li className="text-sm text-blue-600 py-2">Present to importer for assurance of goods’ safety</li>
          </ul>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Shipping Bill',
    Description: 'Core document for customs clearance; depends on the Commercial Invoice, Packing List, and Certificate of Origin',
    content:
      <div >
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">1. Preparing the Shipping Bill</li>
            <ul className="list-disc pl-8">
              <li className="text-sm text-blue-600 py-2">Submit Commercial Invoice, Packing List, and IEC</li>
              <li className="text-sm text-green-600 py-2">Provide HS Code and AD Code details</li>
              <li className="text-sm text-blue-600 py-2">Include export duty (if applicable)</li>
            </ul>
            <li className="text-sm text-green-600 py-2">2. Submission</li>
            <ul className="list-disc pl-8">
              <li className="text-sm text-blue-600 py-2">File online through ICEGATE portal</li>
              <li className="text-sm text-green-600 py-2">Receive Shipping Bill number for tracking</li>
            </ul>
          </ul>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Bill of Lading (or Airway Bill)',
    Description: 'Issued by the carrier and confirms the goods\' shipment; depends on the Shipping Bill',
    content:
      <div >
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">1. Details Included</li>
            <ul className="list-disc pl-8">
              <li className="text-sm text-blue-600 py-2">Exporter and importer details</li>
              <li className="text-sm text-green-600 py-2">Carrier name and mode of transport</li>
              <li className="text-sm text-blue-600 py-2">Description of goods, including weight and quantity</li>
              <li className="text-sm text-green-600 py-2">Destination and port of loading</li>
            </ul>
            <li className="text-sm text-green-600 py-2">2. Obtaining the Bill</li>
            <ul className="list-disc pl-8">
              <li className="text-sm text-blue-600 py-2">Submit Shipping Bill and proof of customs clearance to carrier</li>
              <li className="text-sm text-green-600 py-2">Receive original and duplicate copies for use</li>
            </ul>
          </ul>
        </div>
      </div>,

    status: 'pending'
  },
  {
    title: 'Let Export Order (Customs-issued clearance)',
    Description: 'Customs-issued clearance for the export after verifying Shipping Bill and related documents',
    content:
      <div className="w-full">
        <div className="shadow-lg border-2 border-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">Step-by-Step Guide</h3>
          <ul className="list-disc pl-4">
            <li className="text-sm text-green-600 py-2">1. Steps to Obtain</li>
            <ul className="list-disc pl-8">
              <li className="text-sm text-blue-600 py-2">Submit Shipping Bill to customs</li>
              <li className="text-sm text-green-600 py-2">Undergo customs inspection (if required)</li>
              <li className="text-sm text-blue-600 py-2">Receive Let Export Order once documents are verified</li>
            </ul>
          </ul>
        </div>
      </div>,

    status: 'pending'
  },
]

const ModernStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetStepper = () => {
    setCurrentStep(0);
    setCompleted(false);
  };

  return (
    <div className="   ">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
            Export Journey Quest
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Navigate through our intelligent documentation process
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Smart Guidance</div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Step-by-step assistance through every document requirement</div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">Compliance Assured</div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Meet international trade standards with confidence</div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Time Efficient</div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Streamlined process saving you valuable time</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div
          className={`overflow-hidden bg-opacity-50 p-6 backdrop-blur-md shadow-lg rounded-xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
            }`}	        >
          {/* Progress Timeline */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Documentation Progress</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 dark:bg-gray-700" />
              <div className="relative flex justify-between">
                {steps.slice(Math.max(0, currentStep - 2), Math.min(steps.length, currentStep + 4)).map((step, idx) => {
                  const stepNumber = Math.max(0, currentStep - 2) + idx;
                  return (
                    <div key={stepNumber} className="flex flex-col items-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentStep(stepNumber)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center z-10
                          ${stepNumber === currentStep
                            ? 'bg-blue-500 text-white'
                            : stepNumber < currentStep
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}
                      >
                        {stepNumber < currentStep ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : stepNumber === currentStep ? (
                          <CircleDot className="w-6 h-6" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </motion.button>
                      <span className="mt-2 text-sm  font-medium text-gray-600 dark:text-gray-400">
                        {step.title.split(' ').slice(0, 1).join(' ')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {completed ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-block p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4"
                    >
                      <CheckCircle className="w-12 h-12 text-green-500 dark:text-green-400" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Journey Completed!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Congratulations! You've successfully completed all documentation steps.
                    </p>
                    <button
                      onClick={resetStepper}
                      className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Start New Journey
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {steps[currentStep].title}
                      </h3>
                      <Link
                        href={`/dashboard/learner/${encodeURIComponent(steps[currentStep].title.toLowerCase().replace(/\s+/g, '-'))}`}
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Details →
                      </Link>
                    </div>
                    <h4>{steps[currentStep]?.Description}</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {steps[currentStep].content}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors
                  ${currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              {!completed && (
                <button
                  onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernStepper;