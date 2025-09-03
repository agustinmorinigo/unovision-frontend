import type { EmployeeSchedule } from '@/client/entities';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Schedule = Omit<EmployeeSchedule, 'id' | 'employeeId'>;

interface Props {
  day: { label: string; value: number };
  schedule?: Schedule;
  dayErrors?: { startTime?: { message?: string }; endTime?: { message?: string } };
  onToggle: (weekday: number, checked: boolean) => void;
  onTimeChange: (weekday: number, key: 'startTime' | 'endTime', value: string) => void;
  onRemoteToggle: (weekday: number, checked: boolean) => void;
}

export default function ScheduleDayField({
  day,
  schedule,
  dayErrors,
  onToggle,
  onTimeChange,
  onRemoteToggle,
}: Props) {
  const active = !!schedule;

  return (
    <div>
      <div
        onClickCapture={(e) => {
          const target = e.target as HTMLElement;
          if (
            target.tagName === 'INPUT' ||
            target.tagName === 'LABEL' ||
            target.closest('button')
          ) {
            return;
          }
          onToggle(day.value, !active);
        }}
        className={`rounded-lg border p-3 transition cursor-pointer ${active
            ? 'bg-background border-primary shadow-sm'
            : 'bg-muted text-muted-foreground border-muted hover:border-primary/40'
          }`}
      >
        <div className="flex items-center gap-3">
          <Checkbox
            id={`weekday-${day.value}`}
            checked={active}
            onCheckedChange={(checked) => onToggle(day.value, checked as boolean)}
          />
          <Label
            htmlFor={`weekday-${day.value}`}
            className={`font-medium ${!active ? 'opacity-70' : ''}`}
          >
            {day.label}
          </Label>

          {active && schedule && (
            <div className="flex items-center gap-2 flex-1">
              <Input
                type="time"
                step="60"
                value={schedule.startTime}
                onChange={(e) => onTimeChange(day.value, 'startTime', e.target.value)}
                className="w-28"
              />
              <span className="text-sm">a</span>
              <Input
                type="time"
                step="60"
                value={schedule.endTime}
                onChange={(e) => onTimeChange(day.value, 'endTime', e.target.value)}
                className="w-28"
              />
            </div>
          )}
        </div>

        {active && schedule && (
          <div className="flex items-center gap-2 mt-2">
            <Label htmlFor={`remote-${day.value}`} className="text-xs text-muted-foreground">
              Remoto
            </Label>
            <Checkbox
              id={`remote-${day.value}`}
              checked={schedule.isRemote}
              onCheckedChange={(checked) => onRemoteToggle(day.value, checked as boolean)}
            />
          </div>
        )}
      </div>

      {dayErrors && (
        <div className="mt-1 text-xs text-destructive">
          {dayErrors.startTime?.message && <p>{dayErrors.startTime.message}</p>}
          {dayErrors.endTime?.message && <p>{dayErrors.endTime.message}</p>}
        </div>
      )}
    </div>
  );
}
