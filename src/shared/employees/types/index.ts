import type { EmployeeSchedule } from '@/client/entities';

export type Schedule = Omit<EmployeeSchedule, 'id' | 'employeeId'>;