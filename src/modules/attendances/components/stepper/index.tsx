import StepperHeader from '@/modules/attendances/components/stepper/stepper-header';
import StepperBody from '@/modules/attendances/components/stepper/stepper-body';
import StepperFooter from '@/modules/attendances/components/stepper/stepper-footer';
import { attendanceReportSteps } from '@/modules/attendances/constants/attendance-report-steps';
import { useStep } from 'usehooks-ts'

export default function AttendanceReportStepper() {
  const [currentStep, helpers] = useStep(attendanceReportSteps.length)
  const { goToNextStep, goToPrevStep, canGoToNextStep, canGoToPrevStep } = helpers;

  return (
    <div className="size-full flex flex-col gap-10 max-w-5xl mx-auto pt-12 pb-[100px]">
      <StepperHeader currentStep={currentStep} />

      <StepperBody currentStep={currentStep} />

      <StepperFooter
        canGoNext={canGoToNextStep}
        canGoBack={canGoToPrevStep}
        handleNext={goToNextStep}
        handleBack={goToPrevStep}
      />
    </div>
  );
}
