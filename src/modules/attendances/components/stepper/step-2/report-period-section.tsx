import { Controller, useFormContext } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from '@/modules/attendances/components/stepper/form-field';
import type { BasicReportInfoSchema } from '@/modules/attendances/schemas/basic-report-info-schema';
import ISOMonths from '@/shared/date-time/constants/iso-months';
import { MonthName } from '@/shared/date-time/types/months';
import isMonth from '@/shared/date-time/utils/is-month';

function generateYearOptions(
  startYear: number,
  endYear: number
): { value: number; label: string }[] {
  const years: { value: number; label: string }[] = []
  for (let year = startYear; year <= endYear; year++) {
    years.push({ value: year, label: year.toString() })
  }
  return years
};

const today = new Date();
const currentYear = today.getFullYear();
const prevYear = currentYear - 1;
const validYears = generateYearOptions(prevYear, currentYear).reverse();

export default function ReportPeriodSection() {
  const { formState: { errors }, control } = useFormContext<BasicReportInfoSchema>();

  return (
    <Card className='w-full flex flex-col gap-4'>
      <p>Período del reporte</p>

      <div className='w-full flex items-start gap-2'>
        <FormField
          name="monthNumber"
          label="Mes"
          error={errors.monthNumber?.message}
        >
          <Controller
            name="monthNumber"
            control={control}
            render={({ field }) => (
              <Select value={field.value ? field.value.toString() : undefined} onValueChange={(value) => field.onChange(Number(value))}>
                <SelectTrigger
                  className="w-full max-w-[250px]"
                  {...(errors.monthNumber ? { 'aria-invalid': true } : {})}
                >
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {ISOMonths.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          name="yearNumber"
          label="Año"
          error={errors.yearNumber?.message}
        >
          <Controller
            name="yearNumber"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? field.value.toString() : undefined}
                onValueChange={(value) => field.onChange(Number(value))}
                disabled={!isMonth(today, MonthName.January)}
              >
                <SelectTrigger
                  className="w-full max-w-[250px]"
                  {...(errors.yearNumber ? { 'aria-invalid': true } : {})}
                >
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {validYears.map((year) => (
                    <SelectItem
                      key={year.value}
                      value={year.value.toString()}
                    >
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
      </div>
    </Card>
  )
}
