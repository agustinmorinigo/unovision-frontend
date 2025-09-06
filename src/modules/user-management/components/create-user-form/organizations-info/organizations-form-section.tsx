import { Controller, useFormContext } from 'react-hook-form';
import FormCheckboxGroup from '@/components/common/form-checkbox-group';
import FormSectionLayout from '@/modules/user-management/components/create-user-form/form-section-layout';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';
import useGetOrganizationsQuery from '@/shared/organizations/queries/use-get-organizations-query';

export default function OrganizationsFormSection() {
  const { data } = useGetOrganizationsQuery();
  const organizations = data || [];

  const options = organizations.map((org) => ({
    value: org.id,
    label: org.businessName,
  }));

  const {
    formState: { errors },
    control,
  } = useFormContext<CreateUserFormSchema>();

  return (
    <FormSectionLayout
      title="Organizaciones"
      description="Seleccioná las organizaciones a las que pertenece el usuario"
      hasErrors={!!errors.organizationIds}
    >
      <Controller
        name="organizationIds"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormCheckboxGroup
            id="organizationIds"
            error={errors.organizationIds?.message}
            options={options}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </FormSectionLayout>
  );
}
