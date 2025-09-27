import { TriangleAlert } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import useAttendanceReportErrorsDialogStore from '@/modules/attendance/stores/use-attendance-report-errors-dialog-store'

export default function AttendanceReportErrorsDialog() {

  const { isOpen, errors, close } = useAttendanceReportErrorsDialogStore()

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>El archivo de asistencia contiene errores</AlertDialogTitle>
          <AlertDialogDescription className='w-full flex flex-col gap-8 mt-8'>
            <p className='text-md'>
              <strong>Tómese un momento para revisar los detalles proporcionados. Errores:</strong>
            </p>

            <div className='w-full flex flex-col gap-2'>
              
              {errors.map((error) => (
                <div className='w-full flex items-start gap-2' key={crypto.randomUUID()}>
                  <TriangleAlert className='text-amber-500 size-4 shrink-0' />
                  <p>{error}</p>
                </div>
              ))}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
