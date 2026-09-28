export type Role = "user" | "admin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  role: Role;
  dob?: string;
  gender?: string;
  joinedAt: string;
}

export interface Service {
  slug: string;
  name: string;
  category: string;
  description: string;
  fee: number;
  processingTime: string;
  requiredDocs: string[];
  office: string;
}

export type DocCategory = "Citizenship" | "National ID" | "Passport" | "PAN Card" | "Driving License" | "Bluebook" | "Other";

export interface Document {
  id: string;
  name: string;
  category: DocCategory;
  fileName: string;
  docNumber: string;
  uploadedAt: string;
  expiryDate?: string;
  size: string;
  verified: boolean;
}

export type AppStatus = "Pending" | "Submitted" | "Under Review" | "Processing" | "Approved" | "Rejected" | "Requires Action";

export interface Application {
  id: string;
  serviceSlug: string;
  serviceName: string;
  applicant: string;
  status: AppStatus;
  submittedAt: string;
  updatedAt: string;
  fee: number;
  paid: boolean;
  remarks?: string;
  timeline: { label: string; date: string; done: boolean }[];
}

export interface Payment {
  id: string;
  title: string;
  amount: number;
  date: string;
  method: string;
  status: "Paid" | "Pending" | "Failed";
  receiptNo: string;
}

export type FineStatus = "Unpaid" | "Paid" | "Waived";

export interface Fine {
  id: string;
  title: string;
  reason: string;
  amount: number;
  issuedAt: string;
  dueDate: string;
  status: FineStatus;
  ward: string;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  description: string;
  options: PollOption[];
  totalVotes: number;
  closesAt: string;
  category: string;
}

export type IssueStatus = "Reported" | "Under Review" | "In Progress" | "Resolved";

export interface Issue {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  reporter: string;
  status: IssueStatus;
  createdAt: string;
  votes: number;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
  type: "application" | "payment" | "community" | "system";
}
