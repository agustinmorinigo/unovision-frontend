import type { ControllerRenderProps, FieldErrors } from 'react-hook-form';
import type { EmployeeSchedule } from '@/client/entities';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';
import isoWeekDays from '@/shared/date-time/constants/iso-week-days';
import ScheduleDayField from './schedule-day-field';

type Schedule = Omit<EmployeeSchedule, 'id' | 'employeeId'>;

interface Props {
  field: ControllerRenderProps<CreateUserFormSchema, 'employeeInfo.schedules'>;
  errors: FieldErrors<CreateUserFormSchema>;
}

export default function EmployeeSchedulesFieldContent({ field, errors }: Props) {
  const handleDayToggle = (weekday: number, checked: boolean) => {
    if (checked) {
      const newSchedule: Schedule = {
        weekday,
        startTime: '09:00',
        endTime: '17:00',
        isRemote: false,
      };
      field.onChange([...field.value, newSchedule]);
    } else {
      field.onChange(field.value.filter((s: Schedule) => s.weekday !== weekday));
    }
  };

  const handleTimeChange = (weekday: number, key: 'startTime' | 'endTime', value: string) => {
    field.onChange(
      field.value.map((s: Schedule) =>
        s.weekday === weekday ? { ...s, [key]: value } : s,
      ),
    );
  };

  const handleRemoteToggle = (weekday: number, checked: boolean) => {
    field.onChange(
      field.value.map((s: Schedule) =>
        s.weekday === weekday ? { ...s, isRemote: checked } : s,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {isoWeekDays.map((day) => {
        const schedule = field.value.find((s: Schedule) => s.weekday === day.value);
        const scheduleIndex = field.value.findIndex((s: Schedule) => s.weekday === day.value);

        const dayErrors =
          scheduleIndex >= 0
            ? (errors.employeeInfo?.schedules?.[scheduleIndex] as {
              startTime?: { message?: string };
              endTime?: { message?: string };
            })
            : undefined;

        return (
          <ScheduleDayField
            key={day.value}
            day={day}
            schedule={schedule}
            dayErrors={dayErrors}
            onToggle={handleDayToggle}
            onTimeChange={handleTimeChange}
            onRemoteToggle={handleRemoteToggle}
          />
        );
      })}
    </div>
  );
}
