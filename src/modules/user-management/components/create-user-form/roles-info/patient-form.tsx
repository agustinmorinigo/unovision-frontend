import { useFormContext } from 'react-hook-form';
import { FormField } from '@/components/common/form-field';
import FormSectionLayout from '@/modules/user-management/components/create-user-form/form-section-layout';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';

export default function PatientForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateUserFormSchema>();

  return (
    <FormSectionLayout
      title="Información del paciente"
      description="Proporcione la información específica del paciente"
      hasErrors={!!errors.patientInfo}
    >
      <FormField
        id="patientInfo.healthInsuranceName"
        label="Nombre de la obra social"
        required
        register={register('patientInfo.healthInsuranceName')}
        error={errors.patientInfo?.healthInsuranceName}
      />
    </FormSectionLayout>
  );
}
