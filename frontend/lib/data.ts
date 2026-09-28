import type { Application, Document, Fine, Issue, AppNotification, Payment, Poll, Service } from "./types";

export const services: Service[] = [
  {
    slug: "national-id",
    name: "National ID",
    category: "Identity",
    description: "Apply for a new National Identity Card (Rastriya Parichaya Patra). Required for citizens above 16.",
    fee: 500,
    processingTime: "15 working days",
    requiredDocs: ["Citizenship certificate", "Passport-size photo", "Birth certificate"],
    office: "District Administration Office, Kathmandu",
  },
  {
    slug: "driving-license",
    name: "Driving License",
    category: "Transport",
    description: "Apply for a new driving license — written exam and trial through the Department of Transport.",
    fee: 1500,
    processingTime: "30 working days",
    requiredDocs: ["Citizenship certificate", "Medical report", "Passport-size photo"],
    office: "Yatayat Office, Ekantakuna",
  },
  {
    slug: "pan",
    name: "PAN",
    category: "Tax",
    description: "Permanent Account Number registration with the Inland Revenue Department for tax and payroll use.",
    fee: 0,
    processingTime: "3 working days",
    requiredDocs: ["Citizenship certificate", "Passport-size photo"],
    office: "Inland Revenue Office, Kathmandu",
  },
  {
    slug: "voter-card",
    name: "Voter Card",
    category: "Identity",
    description: "Register on the voter roll with the Election Commission of Nepal.",
    fee: 0,
    processingTime: "10 working days",
    requiredDocs: ["Citizenship certificate", "Migration certificate (if applicable)"],
    office: "Election Commission, Kantipath",
  },
  {
    slug: "bluebook",
    name: "Bluebook",
    category: "Transport",
    description: "New vehicle registration and Bluebook renewal including tax clearance.",
    fee: 2500,
    processingTime: "5 working days",
    requiredDocs: ["Bluebook copy", "Insurance papers", "Tax receipt"],
    office: "Yatayat Office, Bagmati",
  },
];

export const applications: Application[] = [
  {
    id: "NID-2026-1042",
    serviceSlug: "national-id",
    serviceName: "National ID",
    applicant: "Ram Sharma",
    status: "Processing",
    submittedAt: "2026-09-18",
    updatedAt: "2026-09-24",
    fee: 500,
    paid: true,
    remarks: "Verified by ward secretary. Queued for card printing.",
    timeline: [
      { label: "Submitted", date: "2026-09-18", done: true },
      { label: "Under Review", date: "2026-09-20", done: true },
      { label: "Processing", date: "2026-09-24", done: true },
      { label: "Approved", date: "—", done: false },
    ],
  },
  {
    id: "DL-2026-1038",
    serviceSlug: "driving-license",
    serviceName: "Driving License",
    applicant: "Ram Sharma",
    status: "Pending",
    submittedAt: "2026-09-15",
    updatedAt: "2026-09-22",
    fee: 1500,
    paid: true,
    remarks: "Written exam passed. Trial date awaited.",
    timeline: [
      { label: "Submitted", date: "2026-09-15", done: true },
      { label: "Under Review", date: "2026-09-22", done: true },
      { label: "Processing", date: "—", done: false },
      { label: "Approved", date: "—", done: false },
    ],
  },
  {
    id: "PAN-2026-1021",
    serviceSlug: "pan",
    serviceName: "PAN",
    applicant: "Ram Sharma",
    status: "Requires Action",
    submittedAt: "2026-09-10",
    updatedAt: "2026-09-12",
    fee: 0,
    paid: true,
    remarks: "Photo unclear. Please re-upload a passport-size photo.",
    timeline: [
      { label: "Submitted", date: "2026-09-10", done: true },
      { label: "Under Review", date: "2026-09-12", done: true },
      { label: "Processing", date: "—", done: false },
      { label: "Approved", date: "—", done: false },
    ],
  },
  {
    id: "VTR-2026-0997",
    serviceSlug: "voter-card",
    serviceName: "Voter Card",
    applicant: "Ram Sharma",
    status: "Approved",
    submittedAt: "2026-08-28",
    updatedAt: "2026-09-02",
    fee: 0,
    paid: true,
    timeline: [
      { label: "Submitted", date: "2026-08-28", done: true },
      { label: "Under Review", date: "2026-08-30", done: true },
      { label: "Processing", date: "2026-09-01", done: true },
      { label: "Approved", date: "2026-09-02", done: true },
    ],
  },
  {
    id: "BLB-2026-0988",
    serviceSlug: "bluebook",
    serviceName: "Bluebook",
    applicant: "Ram Sharma",
    status: "Rejected",
    submittedAt: "2026-08-20",
    updatedAt: "2026-08-25",
    fee: 2500,
    paid: false,
    remarks: "Insurance papers expired. Renew insurance and re-apply.",
    timeline: [
      { label: "Submitted", date: "2026-08-20", done: true },
      { label: "Under Review", date: "2026-08-22", done: true },
      { label: "Processing", date: "—", done: false },
      { label: "Approved", date: "—", done: false },
    ],
  },
];

export const documents: Document[] = [
  { id: "doc-1", name: "Citizenship Certificate", category: "Citizenship", fileName: "citizenship-ram.pdf", docNumber: "27-01-72-04412", uploadedAt: "2026-06-12", expiryDate: "—", size: "1.2 MB", verified: true },
  { id: "doc-2", name: "National ID", category: "National ID", fileName: "national-id.pdf", docNumber: "NID-60281144", uploadedAt: "2026-07-04", expiryDate: "2036-07-04", size: "800 KB", verified: true },
  { id: "doc-3", name: "Passport", category: "Passport", fileName: "passport.pdf", docNumber: "PA0991220", uploadedAt: "2026-06-20", expiryDate: "2031-06-20", size: "1.1 MB", verified: true },
  { id: "doc-4", name: "PAN Card", category: "PAN Card", fileName: "pan-card.pdf", docNumber: "PAN-6028114", uploadedAt: "2026-08-02", expiryDate: "—", size: "420 KB", verified: true },
  { id: "doc-5", name: "Driving License", category: "Driving License", fileName: "license.pdf", docNumber: "DL-04-088122", uploadedAt: "2026-08-15", expiryDate: "2029-08-15", size: "950 KB", verified: false },
  { id: "doc-6", name: "Bluebook", category: "Bluebook", fileName: "bluebook.pdf", docNumber: "BLB-BA2KHA4412", uploadedAt: "2026-09-01", expiryDate: "2027-09-01", size: "2.1 MB", verified: false },
];

export const payments: Payment[] = [
  { id: "pay-1", title: "National ID — NID-2026-1042", amount: 500, date: "2026-09-18", method: "eSewa", status: "Paid", receiptNo: "RCP-881201" },
  { id: "pay-2", title: "Driving License — DL-2026-1038", amount: 1500, date: "2026-09-15", method: "Khalti", status: "Paid", receiptNo: "RCP-881140" },
  { id: "pay-3", title: "Bluebook renewal — BLB-2026-0988", amount: 2500, date: "2026-08-20", method: "ConnectIPS", status: "Paid", receiptNo: "RCP-879001" },
  { id: "pay-4", title: "PAN — PAN-2026-1021", amount: 0, date: "2026-09-10", method: "—", status: "Paid", receiptNo: "RCP-880112" },
];

export const fines: Fine[] = [
  { id: "FINE-2026-3001", title: "Helmet violation", reason: "Riding without helmet, Baneshwor Chowk", amount: 500, issuedAt: "2026-09-05", dueDate: "2026-10-05", status: "Unpaid", ward: "Kathmandu" },
  { id: "FINE-2026-3002", title: "Overspeeding", reason: "Overspeeding, Ring Road Lalitpur", amount: 1000, issuedAt: "2026-08-19", dueDate: "2026-09-19", status: "Unpaid", ward: "Lalitpur" },
  { id: "FINE-2026-3003", title: "No parking zone", reason: "Parked in no-parking zone, Durbarmarg", amount: 700, issuedAt: "2026-07-02", dueDate: "2026-08-02", status: "Paid", ward: "Kathmandu" },
];

export const polls: Poll[] = [
  {
    id: "poll-1",
    question: "What service should be improved next?",
    description: "Help the department prioritise which service counter to improve first.",
    options: [
      { id: "o1", label: "Driving License", votes: 214 },
      { id: "o2", label: "National ID", votes: 168 },
      { id: "o3", label: "PAN Services", votes: 97 },
    ],
    totalVotes: 479,
    closesAt: "2026-10-10",
    category: "Services",
  },
  {
    id: "poll-2",
    question: "Preferred timing for license trial slots?",
    description: "Transport office is adding Saturday trial slots in Ekantakuna.",
    options: [
      { id: "o1", label: "Saturday morning", votes: 142 },
      { id: "o2", label: "Sunday morning", votes: 96 },
      { id: "o3", label: "Weekday evening", votes: 44 },
    ],
    totalVotes: 282,
    closesAt: "2026-10-05",
    category: "Transport",
  },
];

export const issues: Issue[] = [
  { id: "ISS-301", title: "Pothole near Baneshwor chowk", category: "Road", description: "Large pothole causing traffic jams near Baneshwor chowk.", location: "Baneshwor, Kathmandu", reporter: "Sita Thapa", status: "In Progress", createdAt: "2026-09-20", votes: 24 },
  { id: "ISS-298", title: "Garbage not collected for a week", category: "Waste", description: "Garbage piling up in our street, Kirtipur.", location: "Kirtipur, Kathmandu", reporter: "Ram Sharma", status: "Reported", createdAt: "2026-09-18", votes: 18 },
  { id: "ISS-295", title: "Streetlight not working", category: "Electricity", description: "Street lights off for 5 days on this road.", location: "Pulchowk, Lalitpur", reporter: "Gita Karki", status: "Under Review", createdAt: "2026-09-14", votes: 15 },
  { id: "ISS-290", title: "Water pipe leaking near temple", category: "Water", description: "Drinking water pipe leaking near the temple.", location: "Bhaktapur Durbar", reporter: "Hari Bahadur", status: "Resolved", createdAt: "2026-09-10", votes: 32 },
];

export const notifications: AppNotification[] = [
  { id: "n1", title: "Application moved to Processing", body: "NID-2026-1042 (National ID) is now being processed.", date: "2026-09-24", read: false, type: "application" },
  { id: "n2", title: "Payment receipt ready", body: "Receipt RCP-881201 for NPR 500 is available.", date: "2026-09-18", read: false, type: "payment" },
  { id: "n3", title: "Action needed on PAN application", body: "PAN-2026-1021 needs a clearer photo. Please update.", date: "2026-09-12", read: false, type: "application" },
  { id: "n4", title: "New poll: service improvement", body: "Vote on which service should be improved next.", date: "2026-09-22", read: false, type: "community" },
  { id: "n5", title: "Issue resolved", body: "ISS-290 water pipe leak marked resolved.", date: "2026-09-12", read: true, type: "community" },
];

export const announcements = [
  { id: "a1", title: "Dashain holiday office hours", body: "Offices open 10am–2pm during Ghatasthapana week. Online applications remain open.", date: "2026-09-25" },
  { id: "a2", title: "License trial slots on Saturdays", body: "Ekantakuna adds Saturday trials from Oct. Book early, 200 tokens per day.", date: "2026-09-21" },
  { id: "a3", title: "eSewa maintenance on Sep 30", body: "Online payments may be slow 11pm–1am. Use Khalti or ConnectIPS.", date: "2026-09-20" },
];

export const monthlyApplications = [
  { month: "Apr", count: 42 },
  { month: "May", count: 58 },
  { month: "Jun", count: 51 },
  { month: "Jul", count: 73 },
  { month: "Aug", count: 66 },
  { month: "Sep", count: 81 },
];

export const statusBreakdown = [
  { name: "Approved", value: 148 },
  { name: "Processing", value: 42 },
  { name: "Pending", value: 35 },
  { name: "Submitted", value: 28 },
  { name: "Rejected", value: 12 },
];
