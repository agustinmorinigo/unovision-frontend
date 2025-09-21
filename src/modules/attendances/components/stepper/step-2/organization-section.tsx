import { Controller, useFormContext } from 'react-hook-form';
import Loader from '@/components/common/loader';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from '@/modules/attendances/components/stepper/form-field';
import type { BasicReportInfoSchema } from '@/modules/attendances/schemas/basic-report-info-schema';
import useGetOrganizationsQuery from '@/shared/organizations/queries/use-get-organizations-query';

export default function OrganizationSection() {
  const { data, isPending, isError } = useGetOrganizationsQuery();
  const organizations = data ?? [];

  const {
    formState: { errors },
    control,
  } = useFormContext<BasicReportInfoSchema>();
  
  return (
    <Card className='w-full flex flex-col gap-4'>
      <p>Organización</p>

      {
        isPending ? (
          <Loader />
        ) : isError ? (
          <p className='text-sm text-red-600'>Error al cargar las organizaciones</p>
        ) : (
          <FormField
            name="organizationId"
            label="Seleccionar organización"
            error={errors.organizationId?.message}
          >
            <Controller
              name="organizationId"
              control={control}
              render={({ field }) => (
                <Select value={field.value ? field.value.toString() : undefined} onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className="w-full max-w-[250px]"
                    {...(errors.organizationId ? { 'aria-invalid': true } : {})}
                  >
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizations.map((organization) => (
                      <SelectItem key={organization.id} value={organization.id}>
                        {organization.businessName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        )
      }
    </Card>
  )
}
