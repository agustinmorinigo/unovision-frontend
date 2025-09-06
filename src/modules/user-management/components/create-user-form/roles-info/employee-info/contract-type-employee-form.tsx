import { Controller, useFormContext } from 'react-hook-form';
import FormRadioGroup from '@/components/common/form-radio-group';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';
import contractTypes from '@/shared/employees/constants/contract-types';

export default function ContractTypeEmployeeForm() {
  const { formState: { errors }, control } = useFormContext<CreateUserFormSchema>();

  return (
    <Controller
      name="employeeInfo.contractType"
      control={control}
      render={({ field }) => (
        <FormRadioGroup
          id="employeeInfo.contractType"
          label="Tipo de contrato"
          required
          error={errors.employeeInfo?.contractType}
          options={contractTypes}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  )
}
