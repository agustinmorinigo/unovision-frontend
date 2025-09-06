import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import FormSectionLayout from '@/modules/user-management/components/create-user-form/form-section-layout';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';

export default function DoctorForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserFormSchema>();

  return (
    <FormSectionLayout
      title="Información del doctor"
      description="Proporcione la información específica del doctor"
      hasErrors={!!errors.doctorInfo}
    >
      <div className="flex flex-col gap-1 items-start">
        <label htmlFor="doctorInfo.isResident" className="text-sm inline-block cursor-pointer select-none">
          ¿Es residente?
        </label>
        <Controller
          name="doctorInfo.isResident"
          control={control}
          render={({ field }) => <Checkbox id={field.name} checked={field.value} onCheckedChange={field.onChange} />}
        />
      </div>
    </FormSectionLayout>
  );
}
