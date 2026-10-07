import type { NavItem } from './types';

// ─── Navigation ───
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'Events', href: '/events' },
  { label: 'Contests', href: '/contests' },
  { label: 'Wall of KL', href: '/wall' },
  { label: 'Clubs', href: '/projects' },
  { label: 'Notices', href: '/notices' },
];

// ─── Homepage Index Sections ───
export const INDEX_SECTIONS = [
  { number: '01', label: 'PEOPLE', id: 'people' },
  { number: '02', label: 'BUILD', id: 'build' },
  { number: '03', label: 'COMPETE', id: 'compete' },
  { number: '04', label: 'CREATE', id: 'create' },
  { number: '05', label: 'CONNECT', id: 'connect' },
] as const;

// ─── Team Role Categories ───
export const ROLE_CATEGORIES = {
  MENTOR: {
    label: 'Mentor & Faculty',
    description: 'Faculty Mentors',
    roles: ['Faculty Mentor'],
  },
  ZERO_ORDER: {
    label: 'Zero Order',
    description: 'President to Secretary',
    roles: ['President', 'Vice President', 'Secretary', 'Joint Secretary'],
  },
  BROADCASTING: {
    label: 'Broadcasting',
    description: 'Media & Broadcasting',
    roles: ['Broadcasting Director', 'Broadcasting Lead'],
  },
  EDITING: {
    label: 'Editing',
    description: 'Video & Photo Editing',
    roles: ['Editing Director', 'Editing Lead'],
  },
  DESIGNING: {
    label: 'Designing',
    description: 'UI/UX & Graphics',
    roles: ['Designing - Director', 'Designing - Lead'],
  },
  SOCIAL_MEDIA: {
    label: 'Social Media',
    description: 'Social Media Management',
    roles: ['Social Media - Director', 'Social Media - Lead'],
  },
  TECHNICAL: {
    label: 'Tech & Non-Tech',
    description: 'Events & Development',
    roles: ['Tech/non-Tech Events Director', 'Technical/non-Technical Events - Lead'],
  },
  LOGISTICS: {
    label: 'Logistics',
    description: 'Operations & Management',
    roles: ['Logistics - Director', 'Logistics Lead'],
  },
  COORDINATORS: {
    label: 'Coordinators',
    description: 'Event Coordinators',
    roles: ['Coordinator'],
  },
} as const;

// ─── System Roles ───
export const SYSTEM_ROLES = [
  'SUPER_ADMIN',
  'PRESIDENT',
  'SECRETARY',
  'JOINT_SECRETARY',
  'TREASURER',
  'ADVISOR',
  'DIRECTOR',
  'LEAD',
  'COORDINATOR',
] as const;

// ─── Permission Modules ───
export const PERMISSION_MODULES = [
  'DASHBOARD',
  'MEMBERS',
  'EVENTS',
  'CONTESTS',
  'PROJECTS',
  'NOTICES',
  'RECRUITMENT',
  'APPLICATIONS',
  'TEAM',
  'MEDIA',
  'AUDIT',
  'ROLES',
  'PERMISSIONS',
  'SETTINGS',
] as const;

// ─── Permission Actions ───
export const PERMISSION_ACTIONS = [
  'VIEW',
  'CREATE',
  'EDIT',
  'DELETE',
  'PUBLISH',
  'REVIEW',
  'EXPORT',
  'SUSPEND',
] as const;

// ─── Event Categories ───
export const EVENT_CATEGORIES = [
  'All',
  'Workshop',
  'Hackathon',
  'Competition',
  'Talk',
  'Recruitment',
  'Social',
] as const;

// ─── Contest Statuses ───
export const CONTEST_STATUSES = ['Upcoming', 'Live', 'Completed'] as const;

// ─── Notice Categories ───
export const NOTICE_CATEGORIES = ['IMPORTANT', 'GENERAL', 'EVENT', 'UPDATE'] as const;

// ─── Recruitment Departments ───
export const RECRUITMENT_DEPARTMENTS = [
  'Creative',
  'Technical',
  'Events',
  'Broadcasting',
  'Social Media',
  'Content',
  'Design',
  'Operations',
] as const;

// ─── Admin Sidebar Items ───
export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: 'dashboard', permission: 'DASHBOARD_VIEW' },
  { label: 'Members', href: '/admin/members', icon: 'person', permission: 'MEMBERS_VIEW' },
  { label: 'Roles', href: '/admin/roles', icon: 'layers', permission: 'ROLES_VIEW' },
  { label: 'Permissions', href: '/admin/permissions', icon: 'lockOpen', permission: 'PERMISSIONS_VIEW' },
  { label: 'Events', href: '/admin/events', icon: 'calendar', permission: 'EVENTS_VIEW' },
  { label: 'Contests', href: '/admin/contests', icon: 'trophy', permission: 'CONTESTS_VIEW' },
  { label: 'Recruitment', href: '/admin/recruitment', icon: 'rocket', permission: 'RECRUITMENT_VIEW' },
  { label: 'Projects', href: '/admin/projects', icon: 'cube', permission: 'PROJECTS_VIEW' },
  { label: 'Notices', href: '/admin/notices', icon: 'bell', permission: 'NOTICES_VIEW' },
  { label: 'Media', href: '/admin/media', icon: 'image', permission: 'MEDIA_VIEW' },
  { label: 'Audit Log', href: '/admin/audit', icon: 'file', permission: 'AUDIT_VIEW' },
  { label: 'Settings', href: '/admin/settings', icon: 'gear', permission: 'SETTINGS_VIEW' },
] as const;

// ─── Student Portal Nav Items ───
export const PORTAL_NAV_ITEMS = [
  { label: 'Dashboard', href: '/portal' },
  { label: 'Events', href: '/portal/events' },
  { label: 'Registrations', href: '/portal/registrations' },
  { label: 'Profile', href: '/portal/profile' },
] as const;

// ─── KL Email Pattern ───
export const KL_EMAIL_PATTERN = /^[0-9]+@kluniversity\.in$/;
