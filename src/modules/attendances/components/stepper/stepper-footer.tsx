import { Button } from "@/components/ui/button"

interface StepperFooterProps {
  canGoNext: boolean;
  canGoBack: boolean;
  handleNext: () => void;
  handleBack: () => void;
}

export default function StepperFooter(props: StepperFooterProps) {
  const { canGoNext, canGoBack, handleNext, handleBack } = props;

  return (
    <div className="flex items-center justify-center gap-4 w-full shrink-0 overflow-hidden select-none">
      <Button
        variant="outline"
        className="w-32"
        onClick={handleBack}
        disabled={!canGoBack}
      >
        Volver
      </Button>
      <Button
        variant="outline"
        className="w-32"
        onClick={handleNext}
        disabled={!canGoNext}
      >
        Siguiente
      </Button>
    </div>
  )
}
