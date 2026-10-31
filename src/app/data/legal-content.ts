/**
 * The ONE legal-content store (A6). Rules:
 *  - Do NOT invent statute section numbers, limitation periods, fees or
 *    helpline numbers. Anything unverified carries a [VERIFY] marker.
 *  - Every entry starts verified:false in this prototype. The owner verifies
 *    before flipping.
 *  - Nothing user-facing may cite law outside this file.
 */
export interface LegalEntry {
  id: string
  /** the claim in plain words */
  claim: string
  /** where the claim comes from (statute / official channel / practice note) */
  source: string
  sectionRef: string
  verified: boolean
  lastChecked: string
  notes?: string
}

export const LEGAL_CONTENT: LegalEntry[] = [
  {
    id: 'cpa-defect-goods',
    claim:
      'Goods that arrive damaged or faulty can count as a "defect" under the Consumer Protection Act, 2019 — the seller is responsible for the condition of what they sold.',
    source: 'Consumer Protection Act, 2019 (India)',
    sectionRef: 'S. 2(10) [VERIFY — exact definition wording]',
    verified: false,
    lastChecked: '2026-10-25',
    notes: 'Ported from v1 research; owner must verify section text before any verified flip.',
  },
  {
    id: 'cpa-complaint-where',
    claim:
      'A consumer complaint can be filed with the appropriate District Consumer Commission, including electronically.',
    source: 'Consumer Protection Act, 2019 (India)',
    sectionRef: 'S. 35 [VERIFY — filing provision and current procedure]',
    verified: false,
    lastChecked: '2026-10-25',
    notes:
      'Electronic filing has moved to e-Jagriti (which absorbed the earlier e-Daakhil portal). Re-verify the current channel name and URL before any verified flip.',
  },
  {
    id: 'cpa-limitation',
    claim:
      'There is a time limit for filing consumer complaints, counted from when the cause of action arose; delay can sometimes be condoned.',
    source: 'Consumer Protection Act, 2019 (India)',
    sectionRef: '[VERIFY — limitation period and condonation rule]',
    verified: false,
    lastChecked: '2026-10-25',
    notes: 'Deliberately NO number stated anywhere in the UI until verified.',
  },
  {
    id: 'national-consumer-helpline',
    claim:
      'A free national consumer helpline exists to register and route consumer complaints.',
    source: 'Government of India consumer helpline',
    sectionRef: '1915 [VERIFY — number, hours, languages]',
    verified: false,
    lastChecked: '2026-10-25',
    notes: 'v1 consistently used 1915; verify before any verified flip.',
  },
  {
    id: 'dlsa-routing',
    claim:
      'District Legal Services Authorities provide free legal aid and are organised district-wise.',
    source: 'Legal Services Authorities Act, 1987 (India)',
    sectionRef: '[VERIFY — DLSA contact data per district]',
    verified: false,
    lastChecked: '2026-10-25',
    notes: 'Prototype shows a clearly-marked placeholder contact until real data is added.',
  },
  {
    id: 'cpa-ecommerce-grievance',
    claim:
      'An online marketplace must run a grievance process for defective deliveries, and its own store policy cannot shorten or waive the remedies the law gives the consumer.',
    source: 'Consumer Protection (E-Commerce) Rules, 2020',
    sectionRef: '[VERIFY — rule citation & acknowledgement window]',
    verified: false,
    lastChecked: '2026-10-28',
    notes: 'Backs the refund-domain playbook. Owner must verify the rule citation and the acknowledgement window before any flip.',
  },
  {
    id: 'tpa-wear-tear',
    claim:
      'A tenant must return premises as received, allowing for reasonable wear and tear — routine repainting after a long stay is the owner’s cost, and deductions need itemised bills.',
    source: 'Transfer of Property Act, 1888 (India)',
    sectionRef: 'S. 108 [VERIFY — clause letter; state rent acts may override]',
    verified: false,
    lastChecked: '2026-10-28',
    notes: 'Backs the deposit-domain playbook. State-specific rent/control acts must be checked before any flip.',
  },
  {
    id: 'tpa-implied-tenancy',
    claim:
      'Regular rent payments and a deposit transfer can establish a month-to-month tenancy even without a written agreement.',
    source: 'Transfer of Property Act, 1888 (India)',
    sectionRef: 'S. 106 [VERIFY — tacit month-to-month tenancy]',
    verified: false,
    lastChecked: '2026-10-28',
    notes: 'Backs the deposit informal (no-agreement) caution.',
  },
  {
    id: 'contract-mistake-72',
    claim:
      'Money paid to another person by mistake can be recovered — the recipient has no right to keep it.',
    source: 'Indian Contract Act, 1872 (India)',
    sectionRef: 'S. 72 [VERIFY — money paid by mistake]',
    verified: false,
    lastChecked: '2026-10-28',
    notes: 'Backs the UPI wrong-credit playbook.',
  },
  {
    id: 'npci-wrong-credit',
    claim:
      'Banks and the UPI operator run a dispute window for wrongly credited transfers, and the receiving bank can place a hold on the credited amount.',
    source: 'NPCI UPI dispute redressal mechanism',
    sectionRef: '[VERIFY — circular number & dispute window]',
    verified: false,
    lastChecked: '2026-10-28',
    notes: 'Backs the UPI playbook ladder. Circular number deliberately unstated until verified.',
  },
  {
    id: 'payment-wages-ff',
    claim:
      'After the notice period is served and assets are cleared, earned wages and the relieving certificate must be released; a free online labour-portal claim exists for withholding.',
    source: 'Payment of Wages Act, 1936 / labour grievance portals',
    sectionRef: '[VERIFY — act applicability & portal URL]',
    verified: false,
    lastChecked: '2026-10-28',
    notes: 'Backs the salary playbook. Portal name lives here only, [VERIFY]-badged.',
  },
  {
    id: 'cyber-fraud-report',
    claim:
      'A national cybercrime reporting channel exists to flag fraudulent or withheld payment transactions quickly, and the receiving account can be flagged.',
    source: 'National cybercrime reporting portal / helpline',
    sectionRef: '1930 [VERIFY — number & portal]',
    verified: false,
    lastChecked: '2026-10-28',
    notes: 'Backs the refund-informal and UPI playbooks. Same [VERIFY] pattern as the 1915 entry.',
  },
  {
    id: 'mmc-property-tax',
    claim:
      'Municipal corporations issue annual property-tax demands under their governing municipal act; the demand notice states the amount, the period, and the payment deadline.',
    source: 'Mumbai Municipal Corporation Act, 1888',
    sectionRef: 'S. 149 [VERIFY — property-tax demand provision]',
    verified: false,
    lastChecked: '2026-10-26',
    notes: 'Cited by the notice-interpretation scenario. Section number is a placeholder pending verification.',
  },
]

export function legalById(id: string): LegalEntry | undefined {
  return LEGAL_CONTENT.find((e) => e.id === id)
}
