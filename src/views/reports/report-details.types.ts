export interface ColItem {
  name: string;
  label: string;
  description: string;
  type: string;
  enabled: boolean;
}

export interface ScheduleEntry {
  frequency: string;
  dayOfWeek: number;
  dayOfMonth: number;
  format: string;
  accounts: string;
}
