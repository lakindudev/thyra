export interface ProjectEntry {
  id: string;
  name: string;
  alias: string;
  path: string;
  createdAt: string;
  lastOpenedAt?: string;
  openCount?: number;
  favorite?: boolean;
}
