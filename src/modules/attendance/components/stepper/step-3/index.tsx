import { StepperLayout } from '@/modules/attendance/components/stepper/stepper-layout';
import useAttendanceReportStepperStore from '@/modules/attendance/stores/use-attendance-report-stepper-store';

export default function Step3() {
  const { goToPrevStep, goToNextStep } = useAttendanceReportStepperStore();
  
  return (
    <StepperLayout.Root>
      <p onClick={goToPrevStep}>Step3</p>
    </StepperLayout.Root>
  )
}
