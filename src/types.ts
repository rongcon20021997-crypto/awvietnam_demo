export type UserRole = 'technician' | 'dealer' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  points: number;
  totalEarned: number;
  installCount: number;
  joinedAt: string;
  avatar?: string;
  cccdUploaded: boolean;
  region: string;
}

export interface Installation {
  id: string;
  technicianId: string;
  technicianName: string;
  serialNumber: string;
  model: string;
  customerName: string;
  customerPhone: string;
  address: string;
  region: string;
  installedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  points: number;
  photos: string[];
  gpsValid: boolean;
  aiScore: number;
  rejectReason?: string;
}

export interface RewardRequest {
  id: string;
  technicianId: string;
  technicianName: string;
  type: 'cash' | 'gift';
  amount: number;
  points: number;
  giftItem?: string;
  status: 'pending' | 'approved' | 'paid';
  requestedAt: string;
  bankAccount?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reward' | 'promo' | 'reminder' | 'system';
  read: boolean;
  createdAt: string;
}

export interface Stats {
  totalTechnicians: number;
  pendingApprovals: number;
  totalInstallations: number;
  thisMonthInstallations: number;
  totalPointsIssued: number;
  pendingRewards: number;
  topRegions: { region: string; count: number }[];
  topModels: { model: string; count: number }[];
}
