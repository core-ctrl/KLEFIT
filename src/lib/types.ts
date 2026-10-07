// ─── EFIT Types ───

// ─── Member / Team ───
export interface Member {
  id: string;
  slug: string;
  name: string;
  role: string;
  roleCategory: RoleCategory;
  studentId: string;
  email: string;
  department: string;
  branch: string;
  year: string;
  bio: string;
  profileImage: string;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    portfolio?: string;
  };
  projects: string[]; // project IDs
  order: number;
}

export type RoleCategory =
  | 'MENTOR'
  | 'ZERO_ORDER'
  | 'BROADCASTING'
  | 'EDITING'
  | 'DESIGNING'
  | 'TECHNICAL'
  | 'LOGISTICS'
  | 'COORDINATORS';

export type SystemRole =
  | 'SUPER_ADMIN'
  | 'PRESIDENT'
  | 'SECRETARY'
  | 'JOINT_SECRETARY'
  | 'TREASURER'
  | 'ADVISOR'
  | 'DIRECTOR'
  | 'LEAD'
  | 'COORDINATOR';

// ─── Events ───
export interface EfitEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: EventCategory;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  image: string;
  organizedBy: string;
  coordinators: string[];
  rules: string[];
  eligibility: string;
  timeline: EventTimeline[];
  registrationOpen: boolean;
  maxParticipants?: number;
  currentRegistrations: number;
  tags: string[];
}

export type EventCategory =
  | 'All'
  | 'Workshop'
  | 'Hackathon'
  | 'Competition'
  | 'Talk'
  | 'Recruitment'
  | 'Social';

export interface EventTimeline {
  time: string;
  title: string;
  description: string;
}

// ─── Projects ───
export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  techStack: string[];
  contributors: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'Active' | 'Completed' | 'Archived';
  featured: boolean;
}

// ─── Contests ───
export interface Contest {
  id: string;
  slug: string;
  title: string;
  description: string;
  rules: string[];
  deadline: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  image: string;
  problemStatement?: string;
  maxTeamSize?: number;
  prizes: string[];
  registrationOpen: boolean;
}

// ─── Notices ───
export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  date: string;
  important: boolean;
  author: string;
}

export type NoticeCategory =
  | 'IMPORTANT'
  | 'GENERAL'
  | 'EVENT'
  | 'UPDATE';

// ─── Wall of KL ───
export interface WallItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'event' | 'achievement' | 'hackathon' | 'project' | 'moment' | 'award';
  date: string;
}

// ─── Recruitment ───
export interface RecruitmentDepartment {
  id: string;
  name: string;
  description: string;
  positions: number;
  open: boolean;
}

// ─── Auth ───
export interface User {
  id: string;
  email: string;
  studentId: string;
  accountType: 'STUDENT' | 'MEMBER';
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  name: string;
  profileImage?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: string[];
  roles: string[];
}

// ─── Permissions ───
export interface Permission {
  id: string;
  key: string;
  module: string;
  action: 'VIEW' | 'CREATE' | 'EDIT' | 'DELETE' | 'PUBLISH' | 'REVIEW' | 'EXPORT' | 'SUSPEND';
  scope: 'ALL' | 'OWN' | 'ASSIGNED';
}

export interface Role {
  id: string;
  name: string;
  slug: string;
  description: string;
  isSystemRole: boolean;
  permissions: string[];
}

// ─── Navigation ───
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// ─── Admin Dashboard ───
export interface DashboardStat {
  label: string;
  value: number;
  trend?: number;
  suffix?: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  actor: string;
  target: string;
  timestamp: string;
  metadata: Record<string, string>;
}
