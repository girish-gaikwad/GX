import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return new Response(JSON.stringify({ 
        error: 'Google AI API key is not configured' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return new Response(JSON.stringify({ 
        error: 'Invalid query. Please provide a valid search query.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `
Comprehensive Export Incentives Database:

1. Remission of Duties and Taxes on Exported Products (RoDTEP)
    Sector/Product: All export sectors (excluding SEZs, EOUs).
    Eligibility Criteria: Exporters with a valid Importer Exporter Code (IEC) exporting goods under notified HS codes.
    Benefits: Refund of embedded taxes and duties (e.g., VAT on fuel, mandi tax, electricity duties) not refunded under other mechanisms. Rates depend on the HS code.
    Ineligibility: SEZs, EOUs, products already availing MEIS benefits, or other tax remission schemes.
    Conflict with other Schemes: Duty Drawback, MEIS (replaced by RoDTEP).
    Documentation Required: IEC, shipping bill, export invoice, HS code details.
    Authority/Contact: Directorate General of Foreign Trade (DGFT).
    Steps to Apply:
    Include RoDTEP declaration in shipping bill.
    File application on DGFT’s ICEGATE portal.
    Claim benefits as per notification.
    URL or Resources: DGFT Portal.
    Products Included:
        Agricultural Products: Rice, wheat, maize, fruits, vegetables, spices.
        Marine Products: Fish, prawns, and seafood.
        Leather Products: Shoes, handbags, garments.
        Textile Products: Cotton yarn, fabrics, readymade garments.
        Engineering Goods: Machinery, auto parts.
        Chemicals: Organic, inorganic chemicals.
        Pharmaceuticals: Bulk drugs, APIs.
        Gems & Jewelry: Gold jewelry, diamonds.

________________________________________
2. Duty Drawback Scheme
    Sector/Product: All export sectors involving customs and excise duty-paid inputs.
    Eligibility Criteria: Direct and indirect exporters using customs/excise duty-paid inputs.
    Benefits: Refund of customs and excise duties paid on imported or indigenous inputs. Refund rates vary by product.
    Ineligibility: Exports availing benefits under Advance Authorization, DFIA, or EPCG schemes.
    Conflict with other Schemes: Advance Authorization, EPCG.
    Documentation Required: IEC, Bill of Entry, export invoice, duty payment proof.
    Authority/Contact: Central Board of Indirect Taxes and Customs (CBIC).
    Steps to Apply:
    File shipping bill with drawback declaration.
    Submit the claim on ICEGATE.
    Receive refund based on product-specific rates.
    URL or Resources: CBIC Portal.
    Applicable to all products where customs or central excise duties are paid during production.
    Includes:
        Textiles and Garments
        Engineering goods
        Leather and Footwear
        Food processing products
        Chemicals and Pharmaceuticals
________________________________________
3. Export Promotion Capital Goods (EPCG) Scheme
    Sector/Product: All sectors requiring capital goods for export production.
    Eligibility Criteria:
    Importers of capital goods for producing export-oriented goods/services.
    Minimum export obligation: 6x the duty saved within 6 years.
    Benefits: Import of capital goods at zero customs duty.
    Ineligibility: Failure to meet export obligation within the prescribed timeframe.
    Conflict with other Schemes: Advance Authorization.
    Documentation Required: IEC, export obligation statement, Bill of Entry.
    Authority/Contact: DGFT.
    Steps to Apply:
    Apply online on DGFT portal.
    Submit shipping details and proof of export.
    URL or Resources: EPCG Scheme Details.
    Capital goods/machinery for all industries, including:
        Textiles
        Chemicals
        Pharmaceuticals
        Electronics
        Engineering
        Food processing
________________________________________
4. Advance Authorization Scheme
    Sector/Product: Sectors requiring raw materials and components for exports.
    Eligibility Criteria:
    Exporters importing inputs for manufacturing export products.
    Export obligation within 18 months.
    Benefits: Duty-free import of raw materials, consumables, components.
    Ineligibility: Availability of similar inputs in the domestic market.
    Conflict with other Schemes: Duty Drawback, EPCG.
    Documentation Required: IEC, input-output norms statement, export obligation fulfillment report.
    Authority/Contact: DGFT.
    Steps to Apply:
    Apply through DGFT portal.
    Declare and fulfill export obligations.
    URL or Resources: Advance Authorization Details.
    Raw materials for production, including:
        Chemicals, dyes, plastics
        Textile fabrics and yarns
        Metal components and alloys
        Ingredients for processed food

________________________________________
5. Duty-Free Import Authorization (DFIA) Scheme
    Sector/Product: Manufacturers requiring duty-free inputs for export production.
    Eligibility Criteria:
    Exporters manufacturing and exporting finished goods using imported inputs.
    Export obligation specified in the license.
    Benefits: Duty-free import of specified inputs for manufacturing.
    Ineligibility: Non-compliance with input-output norms.
    Conflict with other Schemes: EPCG, Advance Authorization.
    Documentation Required: IEC, Bill of Entry, export invoice.
    Authority/Contact: DGFT.
    Steps to Apply:
    Submit application on DGFT portal.
    Fulfill export obligation within the validity period.
    URL or Resources: DFIA Scheme Details.
    Similar to Advance Authorization, but for value-added exports.
    Products include:
        Sugar, flour, and food products
        Textiles and garments
        Engineering goods
________________________________________
6. Interest Equalization Scheme (IES) on Pre- and Post-Shipment Credit
    Sector/Product: MSMEs, labor-intensive sectors (e.g., handicrafts, textiles).
    Eligibility Criteria:
    MSME exporters or those dealing with eligible product categories.
    Credit availed through eligible banks.
    Benefits: Interest subvention (2-5%) on export credit.
    Ineligibility: Large-scale exporters (other than those in specified sectors).
    Conflict with other Schemes: None.
    Documentation Required: Proof of credit availed, IEC, export turnover certificate.
    Authority/Contact: Reserve Bank of India (RBI).
    Steps to Apply:
    Apply through the lending bank.
    Provide proof of eligibility and export.
    URL or Resources: IES Scheme Details.
    Broad applicability across MSME exporters in:
        Textiles
        Handicrafts
        Engineering goods
        Agriculture products
        Leather goods
________________________________________
7. Production-Linked Incentive (PLI) Scheme
    Sector/Product: Electronics, pharmaceuticals, textiles, automobiles, etc.
    Eligibility Criteria:
    Companies meeting minimum incremental production and turnover criteria.
    Investment in target sectors.
    Benefits: Direct financial incentives (4-6% of incremental production value).
    Ineligibility: Failure to meet investment and production targets.
    Conflict with other Schemes: Overlapping state incentives.
    Documentation Required: Investment proof, production data, financial statements.
    Authority/Contact: Respective Ministries (e.g., Electronics, Textiles).
    Steps to Apply:
    Submit application via the ministry portal.
    Report annual progress for incentives.
    URL or Resources: PLI Scheme Details.
    Electronics: Mobile phones, laptops, semiconductors.
    Automobiles: EVs, auto parts.
    Pharmaceuticals: Critical drugs, APIs.
    Food Products: Processed food, organic foods.
    Solar Modules: High-efficiency PV modules.
________________________________________
8. Trade Infrastructure for Export Scheme (TIES)
    Sector/Product: Infrastructure development for export promotion across all sectors.
    Eligibility Criteria:
    Projects by central/state government agencies or export promotion councils.
    Focus on enhancing logistics, warehousing, and testing facilities for exports.
    Benefits: Financial assistance up to 50% of the total project cost (max ₹20 crores).
    Ineligibility: Private sector-led projects without government partnership.
    Conflict with other Schemes: Overlapping central/state infrastructure funding schemes.
    Documentation Required: Project proposal, detailed project report (DPR), cost estimates, and approvals.
    Authority/Contact: Ministry of Commerce and Industry.
    Steps to Apply:
    Submit project proposal to the Ministry of Commerce.
    Approval by an empowered committee based on project feasibility.
    URL or Resources: TIES Details.
    Covers infrastructure needs for all products and sectors, such as:
        Export terminals
        Warehouses for agriculture products
        Cold storage for seafood
________________________________________
9. Special Economic Zones (SEZs)
    Sector/Product: All sectors operating within SEZs.
    Eligibility Criteria:
    Businesses operating within notified SEZs.
    Exports contributing to foreign exchange earnings.
    Benefits:
    100% income tax exemption on export income (first 5 years).
    Duty-free import of goods and raw materials.
    Exemption from GST and other indirect taxes.
    Ineligibility: Businesses not operating within SEZ boundaries.
    Conflict with other Schemes: Exporters using RoDTEP or MEIS may face exclusions.
    Documentation Required: SEZ registration, IEC, export turnover certificate.
    Authority/Contact: SEZ Development Commissioner.
    Steps to Apply:
    Register with SEZ Authority.
    Obtain a letter of approval for SEZ operations.
    URL or Resources: SEZ Portal.
    Sectors:
        IT and IT-enabled services (ITES)
        Pharmaceuticals
        Textiles and apparel
        Food processing
        Electronics and engineering goods

________________________________________
10. Export Oriented Units (EOUs)
    Sector/Product: Manufacturing and service sectors exporting 100% of their production.
    Eligibility Criteria:
    Entities must export at least 66% of the total value of goods/services.
    Registered as an EOU under customs provisions.
    Benefits:
    Duty-free import of inputs, raw materials, and capital goods.
    Reimbursement of GST and state levies.
    Ineligibility: Failure to meet export obligations or non-compliance with customs provisions.
    Conflict with other Schemes: Exclusion from RoDTEP benefits.
    Documentation Required: Customs registration, IEC, EOU approval.
    Authority/Contact: Development Commissioner (SEZ/EOU).
    Steps to Apply:
    Apply through the SEZ portal or directly with customs authorities.
    URL or Resources: EOU Details.
    Includes units producing:
        Agricultural goods
        Electronics
        Gems and jewelry
        Pharmaceuticals
________________________________________
11. Agri Export Zones (AEZs)
    Sector/Product: Agricultural products from notified regions (e.g., mangoes, spices).
    Eligibility Criteria:
    Exporters sourcing produce from notified AEZs.
    Products meeting international quality standards.
    Benefits:
    Infrastructure support (packhouses, cold storage, etc.).
    Financial assistance for certification and quality improvement.
    Ineligibility: Products sourced outside AEZs or non-compliance with quality standards.
    Conflict with other Schemes: Overlapping state-specific agricultural incentives.
    Documentation Required: Proof of sourcing from AEZ, export invoices, quality certification.
    Authority/Contact: Agricultural and Processed Food Products Export Development Authority (APEDA).
    Steps to Apply:
    Register with APEDA.
    Apply for AEZ-specific benefits with required documentation.
    URL or Resources: AEZ Details.
    Items:
        Mangoes, bananas, grapes, and citrus fruits
        Vegetables: Potatoes, onions, tomatoes
        Rice, wheat, maize
        Spices: Turmeric, ginger, chili
        Marine products
________________________________________
12. Market Access Initiative (MAI)
    Sector/Product: All export sectors focusing on new markets or products.
    Eligibility Criteria:
    Export promotion councils, industry bodies, and trade associations.
    Proposals for market access or trade fairs participation.
    Benefits:
    Financial support for participation in trade fairs and buyer-seller meets.
    Market research and branding initiatives.
    Ineligibility: Individual exporters are not eligible directly.
    Conflict with other Schemes: None.
    Documentation Required: Proposal submission, event details, cost estimates.
    Authority/Contact: Ministry of Commerce and Industry.
    Steps to Apply:
    Submit proposals through respective export promotion councils.
    Receive approval based on feasibility and market potential.
    URL or Resources: MAI Details.
    Sectors eligible:
        Textiles and handicrafts
        Engineering goods
        Food and agriculture
        Pharmaceuticals
        IT services
________________________________________
13. Merchandise Exports from India Scheme (MEIS) (Replaced by RoDTEP)
    Sector/Product: Previously covered all sectors; replaced by RoDTEP.
    Eligibility Criteria: Not applicable post-RoDTEP implementation.
    Benefits: Provided duty credit scrips as a percentage of FOB value.
    Ineligibility: Superseded by RoDTEP.
    Conflict with other Schemes: RoDTEP and SEIS.
    Documentation Required: NA (scheme replaced).
    Authority/Contact: DGFT.
    Steps to Apply: Not applicable post-replacement.
    URL or Resources: MEIS Archive.
    Items covered previously included:
        Textiles and garments
        Gems and jewelry
        Leather goods
        Engineering products
        Chemicals and plastics
________________________________________
14. Services Exports from India Scheme (SEIS)
    Sector/Product: Services sectors like IT, hospitality, healthcare, and consultancy.
    Eligibility Criteria:
    Service providers with net foreign exchange earnings.
    Services falling under notified categories.
    Benefits: Duty credit scrips up to 5% of net foreign exchange earnings.
    Ineligibility: Domestic services or those not falling under notified categories.
    Conflict with other Schemes: RoDTEP for goods.
    Documentation Required: Export turnover details, foreign exchange realization certificate.
    Authority/Contact: DGFT.
    Steps to Apply:
    Submit application through DGFT portal.
    Claim duty credit based on earnings.
    URL or Resources: SEIS Details.
    Services:
        IT services
        Financial services
        Legal services
        Educational and healthcare services
        Entertainment and media
________________________________________
15. Transport and Marketing Assistance (TMA) for Specified Agriculture Products
    Sector/Product: Specified agricultural exports (e.g., cereals, vegetables, dairy).
    Eligibility Criteria:
    Exporters of eligible products to specific countries.
    Transport cost reimbursement linked to distance.
    Benefits: Financial assistance for freight and marketing costs.
    Ineligibility: Products not listed in the scheme guidelines.
    Conflict with other Schemes: None directly but overlaps in incentives.
    Documentation Required: Export invoice, shipping bill, transport cost proof.
    Authority/Contact: DGFT.
    Steps to Apply:
    Register exports under the scheme.
    Submit claims for transport reimbursement.
    URL or Resources: TMA Details.
    Products:
        Agriculture: Cereals, pulses, oilseeds
        Horticulture: Fruits, vegetables
        Processed foods: Spices, tea, coffee
________________________________________
16. Agri Export Policy
    Sector/Product: Agricultural and processed food products (e.g., spices, fruits, dairy).
    Eligibility Criteria:
    Exporters of agricultural products adhering to international quality standards.
    Focus on value addition and market diversification.
    Benefits:
    Infrastructure support like packhouses and cold chains.
    Financial assistance for certification, quality improvement, and branding.
    Support for organic produce exports.
    Ineligibility: Products failing to meet international standards or sourced from unapproved regions.
    Conflict with other Schemes: Overlaps with TMA and AEZs.
    Documentation Required:
    Proof of agricultural sourcing.
    Quality and certification documents.
    Export details (shipping bills, invoices).
    Authority/Contact: Ministry of Commerce and APEDA.
    Steps to Apply:
    Register with APEDA.
    Apply for benefits under the Agri Export Policy through notified agencies.
    URL or Resources: Agri Export Policy Details.
    Products:
        Organic produce
        Fruits and vegetables
        Spices
        Processed food items
        Marine products
________________________________________
17. Textile Export Incentives (e.g., RoSCTL)
    Sector/Product: Textile and apparel products.
    Eligibility Criteria:
    Exporters of textile and apparel items covered under the RoSCTL scheme.
    Compliance with GST and export norms.
    Benefits:
    Rebate of State and Central Taxes and Levies (RoSCTL) on exported goods.
    Incentives range from 1%-5% of the FOB value.
    Ineligibility: Exporters already availing similar benefits under RoDTEP or SEIS.
    Conflict with other Schemes: RoDTEP for overlapping products.
    Documentation Required: Export invoices, GST returns, and RoSCTL claim forms.
    Authority/Contact: Ministry of Textiles and DGFT.
    Steps to Apply:
    File claims via DGFT’s online portal.
    Provide necessary export documentation.
    URL or Resources: RoSCTL Guidelines.
    Items:
        Readymade garments
        Fabrics and made-ups
        Technical textiles
________________________________________
18. Electronics Manufacturing Schemes (under PLI)
    Sector/Product: Electronics and IT hardware manufacturing (e.g., mobile phones, components).
    Eligibility Criteria:
    Companies engaged in the production of electronics for export markets.
    Meeting production and investment thresholds specified under the scheme.
    Benefits:
    Financial incentives linked to incremental production value.
    Subsidies on investments in capital goods.
    Ineligibility: Non-compliance with PLI conditions or focus only on domestic markets.
    Conflict with other Schemes: Overlapping benefits under EPCG or Advance Authorization.
    Documentation Required:
    Production and investment proofs.
    Export realization certificates.
    Authority/Contact: Ministry of Electronics and IT.
    Steps to Apply:
    Submit applications on the PLI scheme portal.
    Provide quarterly production and export data.
    URL or Resources: PLI Details.
    Products:
        Mobile phones
        Consumer electronics
        IT hardware
________________________________________
19. Pharmaceutical and Chemical Export Incentives
    Sector/Product: Pharmaceuticals, bulk drugs, and chemicals.
    Eligibility Criteria:
    Manufacturers/exporters meeting international quality standards.
    Registration with export councils like Pharmexcil or Chemexcil.
    Benefits:
    Assistance for export promotion activities.
    Incentives for compliance with global regulatory requirements.
    Financial support for market access and branding.
    Ineligibility: Non-compliance with export council membership or quality norms.
    Conflict with other Schemes: None explicitly but subject to scheme overlaps.
    Documentation Required:
    Proof of compliance with regulatory standards.
    Export invoices and membership certificates.
    Authority/Contact: Pharmexcil or Chemexcil.
    Steps to Apply:
    Register with the appropriate council.
    Apply for scheme benefits as per council guidelines.
    URL or Resources: Pharmexcil | Chemexcil.
    Products:
        APIs and drugs
        Vaccines
        Specialty chemicals
        Biotech products
________________________________________
20. Leather and Footwear Export Promotion
    Sector/Product: Leather, footwear, and related accessories.
    Eligibility Criteria:
    Exporters of leather and footwear products adhering to export quality standards.
    Membership with export councils like CLE.
    Benefits:
    Subsidies on raw material imports.
    Support for participation in international trade fairs.
    Assistance for certification and compliance costs.
    Ineligibility: Exporters not registered with the Council for Leather Exports (CLE).
    Conflict with other Schemes: None explicitly.
    Documentation Required:
    Membership proof with CLE.
    Export and quality documentation.
    Authority/Contact: Council for Leather Exports (CLE).
    Steps to Apply:
    Register with CLE.
    Apply for benefits via council’s portal or notified processes.
    URL or Resources: CLE.
    Products:
        Shoes
        Leather handbags
        Wallets
        Leather garments
________________________________________
21. Cluster Development Program for Export-Oriented Clusters
    Sector/Product: Small and medium enterprises (SMEs) across multiple sectors.
    Eligibility Criteria:
    Clusters involved in export-oriented production.
    Collaboration among multiple SMEs within a geographical region.
    Benefits:
    Financial aid for technology upgrades, quality certification, and infrastructure.
    Marketing and branding support.
    Ineligibility: Clusters without a defined export focus or failing to meet eligibility norms.
    Conflict with other Schemes: Overlapping state-level cluster development initiatives.
    Documentation Required:
    Cluster proposal.
    Export turnover data and SME membership details.
    Authority/Contact: Ministry of MSME.
    Steps to Apply:
    Submit cluster proposals to the Ministry of MSME.
    Obtain approval and funding.
    URL or Resources: MSME Cluster Development.
    Focused on:
        Handicrafts
        Textiles
        Leather products
        Agro-processing clusters
________________________________________
22. State-Level Export Promotion Schemes
    Sector/Product: Varies by state; generally across agriculture, textiles, and manufacturing.
    Eligibility Criteria: Exporters registered and operating within the state.
    Benefits:
    Subsidies on power, infrastructure, and logistics.
    Support for certification and branding.
    Ineligibility: Exporters not meeting state-level criteria or registered elsewhere.
    Conflict with other Schemes: Overlap with central schemes like TIES or MAI.
    Documentation Required: Registration with state export authority and proof of business operations.
    Authority/Contact: State export promotion boards or departments.
    Steps to Apply:
    Apply to the state-level authority.
    Provide required documentation for evaluation.
    URL or Resources: Contact respective state websites.
    Products vary by state:
        Textiles (e.g., Gujarat, Tamil Nadu)
        Handicrafts (e.g., Rajasthan, Uttar Pradesh)
        Agriculture (e.g., Maharashtra, Punjab)
________________________________________
23. Free Trade Agreements (FTAs) with Various Countries and Regions
    Sector/Product: All sectors, with a focus on goods and services covered under specific FTAs.
    Eligibility Criteria:
    Exporters trading products/services listed in FTA agreements.
    Adherence to the Rules of Origin (ROO) requirements.
    Benefits:
    Reduced or zero customs duties on exports to FTA partner countries.
    Simplified trade processes with partner nations.
    Ineligibility: Products/services not covered under the FTA or non-compliance with ROO.
    Conflict with other Schemes: None directly but coordination with overlapping incentives is needed.
    Documentation Required:
    Certificate of Origin (COO).
    Export invoices and shipping bills.
    Proof of compliance with FTA terms.
    Authority/Contact: Ministry of Commerce and Industry, Directorate General of Foreign Trade (DGFT).
    Steps to Apply:
    Obtain COO from authorized agencies (e.g., Export Inspection Council).
    Submit documents to customs authorities of the importing country.
    URL or Resources: FTAs in India.
    Products depend on the agreement.
        Includes textiles, electronics, machinery, food items, etc.
________________________________________
24. Bilateral Line of Credit (LOC) to Boost Indian Exports
    Sector/Product: Project exports, engineering goods, and large-scale infrastructure products.
    Eligibility Criteria:
    Exporters involved in projects financed through EXIM Bank's LOC programs.
    Products/services sourced from India.
    Benefits:
    Access to financing for overseas buyers through LOC.
    Promotion of Indian goods in targeted markets.
    Ineligibility: Projects not meeting EXIM Bank's financing criteria.
    Conflict with other Schemes: Minimal, but overlaps may occur with project export promotion initiatives.
    Documentation Required:
    Project details and financing agreements.
    Export documentation and approvals.
    Authority/Contact: EXIM Bank of India.
    Steps to Apply:
    Approach EXIM Bank for LOC eligibility.
    Facilitate buyer agreements under LOC terms.
    URL or Resources: EXIM Bank LOC.
    Products:
        Engineering goods
        Food processing machinery
        Pharmaceuticals
________________________________________
25. Project Exports Promotion (facilitated by EXIM Bank)
    Sector/Product: Large-scale infrastructure, engineering, and construction projects.
    Eligibility Criteria:
    Exporters engaged in project exports like railways, roads, power plants, etc.
    Registration with Project Exports Promotion Council (PEPC).
    Benefits:
    Financial assistance for project bidding and execution.
    Market development and risk mitigation support.
    Ineligibility: Non-registration with PEPC or non-compliance with EXIM Bank’s terms.
    Conflict with other Schemes: Possible overlaps with LOC initiatives.
    Documentation Required:
    Project details and proof of bidding.
    Export and financial compliance documents.
    Authority/Contact: EXIM Bank and PEPC.
    Steps to Apply:
    Register with PEPC.
    Apply for funding/support through EXIM Bank.
    URL or Resources: PEPC.
    Focus on:
        Infrastructure: Roads, ports, power plants
        Engineering consultancy
        IT services
________________________________________
26. Exemption of GST on Exported Goods and Services
    Sector/Product: All sectors eligible for exports.
    Eligibility Criteria:
    Exporters registered under GST.
    Exports classified as zero-rated supply.
    Benefits:
    No GST levied on exported goods/services.
    Input tax credit (ITC) can be claimed.
    Ineligibility: Failure to comply with GST filing requirements.
    Conflict with other Schemes: None explicitly but must coordinate with IGST refund claims.
    Documentation Required:
    GST returns (GSTR-1, GSTR-3B).
    Shipping bills and export invoices.
    Authority/Contact: GST Network (GSTN) and Central Board of Indirect Taxes and Customs (CBIC).
    Steps to Apply:
    File GSTR-1 with export details.
    Claim ITC or refunds as applicable.
    URL or Resources: GST Export Guide.
    All goods and services exported are covered.
________________________________________
27. Refund of Integrated GST (IGST) under the GST Framework
    Sector/Product: All sectors eligible for exports.
    Eligibility Criteria:
    Payment of IGST on exported goods/services.
    Filing of relevant GST returns.
    Benefits:
    Refund of IGST paid on exports.
    Simplified refund process through GSTN.
    Ineligibility: Failure to file returns or mismatched data in GSTN records.
    Conflict with other Schemes: None directly but overlaps with zero-rated GST exemptions.
    Documentation Required:
    GST returns (GSTR-1 and GSTR-3B).
    Proof of IGST payment and export invoices.
    Authority/Contact: GSTN and CBIC.
    Steps to Apply:
    File GSTR-1 with IGST payment details.
    Claim refunds through the GST portal.
    URL or Resources: IGST Refund Details.
    Applicable to all products exported, such as textiles, engineering goods, etc.
________________________________________
28. Exemptions and Refunds for Custom Duties on Inputs for Exports
    Sector/Product: All manufacturing and exporting sectors.
    Eligibility Criteria:
    Importers/exporters under schemes like EPCG, DFIA, or Advance Authorization.
    Benefits:
    Duty-free import of inputs used for export production.
    Refund of duties paid on inputs via drawback mechanisms.
    Ineligibility: Non-compliance with scheme conditions or export obligations.
    Conflict with other Schemes: Overlaps with RoDTEP and Duty Drawback Scheme.
    Documentation Required:
    Import/export invoices and shipping bills.
    Proof of usage of inputs in exported goods.
    Authority/Contact: DGFT and Customs Department.
    Steps to Apply:
    Register for applicable schemes (e.g., EPCG).
    Submit documentation for duty exemptions or refunds.
    URL or Resources: Customs Refunds.
    All inputs used in export production.
________________________________________
29. Indian Trade Portal and Export Facilitation Centres (by DGFT)
    Sector/Product: All export sectors.
    Eligibility Criteria: Exporters seeking trade information and facilitation.
    Benefits:
    Access to global trade insights and export promotion resources.
    Dedicated support for policy clarifications and application processes.
    Ineligibility: Not applicable; open to all exporters.
    Conflict with other Schemes: None.
    Documentation Required: None directly; varies by service availed.
    Authority/Contact: DGFT.
    Steps to Apply:
    Register on the Indian Trade Portal.
    Utilize facilitation services as needed.
    URL or Resources: Indian Trade Portal.
    Applicable to all exporters across sectors.
________________________________________
30. Export Credit Guarantee Scheme (ECGS) by ECGC Limited
    Sector/Product: All export sectors.
    Eligibility Criteria: Exporters facing payment risks in international trade.
    Benefits:
    Credit insurance coverage for export-related receivables.
    Risk mitigation against non-payment by buyers.
    Ineligibility: Exporters with poor credit histories or non-compliant transactions.
    Conflict with other Schemes: None explicitly but aligns with financial risk management programs.
    Documentation Required:
    Export invoices and contract details.
    Application forms and credit history.
    Authority/Contact: ECGC Limited.
    Steps to Apply:
    Apply for coverage with ECGC.
    Pay applicable premiums and secure the policy.
    URL or Resources: ECGC.
    Covers all export products.
________________________________________
31. Skill Development Programs for Exporters
    Sector/Product: All sectors with focus on capacity building.
    Eligibility Criteria: Exporters and workforce in export-related industries.
    Benefits:
    Training in export management, compliance, and market strategies.
    Certification programs to enhance workforce skills.
    Ineligibility: Participants not linked to export-oriented activities.
    Conflict with other Schemes: None.
    Documentation Required: Proof of employment in export-related activities.
    Authority/Contact: Export Promotion Councils and Ministry of Commerce.
    Steps to Apply:
    Enroll in training programs via export promotion councils.
    Complete training for certifications.
    URL or Resources: Contact relevant export promotion councils.
    Products:
        Textiles
        IT services
        Engineering goods
        Handicrafts

Context: You are an expert in Indian export incentives for SMB owners.
Task: Analyze the following query and recommend the most relevant incentives.

Query: ${query}

Guidelines:
- Provide 5 most relevant schemes based on the query
- Explain eligibility and benefits concisely
- Focus on practical implementation for SMBs
- Highlight financial and technical support aspects

Analyze the query against the comprehensive incentives database and generate a targeted response for SMB exporters.`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Return response
    return new Response(JSON.stringify({ 
      response: text 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Export Incentives API Error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to process export incentives request',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}