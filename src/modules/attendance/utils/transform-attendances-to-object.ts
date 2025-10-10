import type { Attendance } from '@/modules/attendance/types/attendance';
import type { AttendancesInfo } from '@/modules/attendance/types/basic-report-info';

export default function transformAttendancesToObject(attendances: Attendance[]): AttendancesInfo {
  const attendancesInfo: AttendancesInfo = {};

  attendances.forEach((attendance) => {
    const key = attendance.documentValue;

    if (!attendancesInfo[key]) {
      attendancesInfo[key] = [];
    }

    attendancesInfo[key].push(attendance);
  });

  return attendancesInfo;
}