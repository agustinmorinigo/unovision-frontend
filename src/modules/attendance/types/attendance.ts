export type AttendanceType = 'in' | 'out' | 'break';

export interface Attendance {
  timestamp: string;
  fullName: string;
  type: AttendanceType;
  documentValue: string;
}