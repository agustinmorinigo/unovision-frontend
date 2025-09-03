import { Controller, useFormContext } from 'react-hook-form';
import FormRadioGroup from '@/components/common/form-radio-group';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';
import genders from '@/shared/users/constants/genders';

export default function GenderField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserFormSchema>();

  return (
    <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <FormRadioGroup
          id="gender"
          label="Género"
          required
          error={errors.gender}
          options={genders}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}
