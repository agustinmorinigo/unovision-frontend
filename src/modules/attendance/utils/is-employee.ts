import type { ReportEmployee } from '@/modules/attendance/types/report-employee';

export default function isEmployee(employees: ReportEmployee[], docValue: string): boolean {
  return employees.some((employee) => employee.profile.documentValue === docValue);
}
