import { useFormContext } from 'react-hook-form';
import Component from '@/components/comp-548';
import { Card } from '@/components/ui/card';
import { FormField } from '@/modules/attendances/components/stepper/form-field';
import type { BasicReportInfoSchema } from '@/modules/attendances/schemas/basic-report-info-schema';

// EN EL EXCEL VALIDAR LO DE SIEMPRE. SI NO ESTÁ ESO VÁLIDO, NO PUEDE AVANZAR. Validar columnas, dni, gaps, espacios en blanco, años, mes, TODO.
export default function FileSection() {
  const { formState: { errors } } = useFormContext<BasicReportInfoSchema>();
  
  return (
    <Card className='w-full flex flex-col gap-4'>
      <p>Archivo de fichaje</p>

      <FormField error={errors.file?.message}>
        {/* Change this component */}
        <Component />
      </FormField>
    </Card>
  )
}
