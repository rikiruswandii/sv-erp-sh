import type { SvelteComponent } from 'svelte';
import type { Config } from 'ziggy-js';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: string;
  icon?: typeof SvelteComponent | null;
  isActive?: boolean;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export type BreadcrumbItem =
  | {
      type: 'link';
      href: string;
      label: string;
    }
  | {
      type: 'page';
      label: string;
    }
  | {
      type: 'dropdown';
      icon?: boolean;
      items: string[];
    };
