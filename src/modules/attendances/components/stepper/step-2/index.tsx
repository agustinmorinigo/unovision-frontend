import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import FileSection from '@/modules/attendances/components/stepper/step-2/file-section';
import OrganizationSection from '@/modules/attendances/components/stepper/step-2/organization-section';
import ReportPeriodSection from '@/modules/attendances/components/stepper/step-2/report-period-section';
import { StepperLayout } from '@/modules/attendances/components/stepper/stepper-layout'
import { type BasicReportInfoSchema, basicReportInfoSchema } from '@/modules/attendances/schemas/basic-report-info-schema';
import useAttendanceReportStepperStore from '@/modules/attendances/stores/use-attendance-report-stepper-store';
import { MonthName } from '@/shared/date-time/types/months';
import getISOMonthNumber from '@/shared/date-time/utils/get-iso-month-number';
import isMonth from '@/shared/date-time/utils/is-month';

const today = new Date();
const currentYear = today.getFullYear();
const prevYear = currentYear - 1;
const isJanuary = isMonth(today, MonthName.January);

const defaultMonth = isJanuary ? getISOMonthNumber(MonthName.December) : (getISOMonthNumber('current') - 1);
const defaultYear = isJanuary ? prevYear : currentYear;

export default function Step2() {
  const { goToPrevStep } = useAttendanceReportStepperStore();

  const methods = useForm({
    resolver: zodResolver(basicReportInfoSchema),
    defaultValues: {
      monthNumber: defaultMonth,
      yearNumber: defaultYear,
      organizationId: '',
    }
  });
  
  const { handleSubmit } = methods;

  const onSubmit = (formValues: BasicReportInfoSchema) => {
    console.log('formValues: ', formValues);
  }
  
  return (
    <StepperLayout.Root>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-8'
        >
          <div className='w-full overflow-hidden flex flex-col gap-5'>
            <div className='w-full flex items-center flex-col gap-2'>
              <h5 className='text-lg'>Completa los datos básicos</h5>
              <p className='text-base text-muted-foreground'>Completa los datos para el cual deseas generar el reporte de asistencia</p>
            </div>

            <div className='w-full flex flex-col gap-6'>
              <div className='w-full flex items-start gap-6'>
                <ReportPeriodSection />
                <OrganizationSection />
              </div>

              <div className='w-full'>
                <FileSection />
              </div>
            </div>
          </div>

          <StepperLayout.Footer>
            <StepperLayout.Button onClick={goToPrevStep}>
              Volver
            </StepperLayout.Button>

            <StepperLayout.Button type='submit'>
              Siguiente
            </StepperLayout.Button>
          </StepperLayout.Footer>
        </form>
      </FormProvider>
    </StepperLayout.Root>
  )
}
