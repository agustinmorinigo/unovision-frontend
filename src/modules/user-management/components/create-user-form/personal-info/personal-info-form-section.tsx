import { useFormContext } from 'react-hook-form';
import { FormField } from '@/components/common/form-field';
import FormSectionLayout from '@/modules/user-management/components/create-user-form/form-section-layout';
import DocumentField from '@/modules/user-management/components/create-user-form/personal-info/document-field';
import GenderField from '@/modules/user-management/components/create-user-form/personal-info/gender-field';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';

export default function PersonalInfoFormSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateUserFormSchema>();

  const hasErrors =
    !!errors.name ||
    !!errors.lastName ||
    !!errors.birthDate ||
    !!errors.documentType ||
    !!errors.documentValue ||
    !!errors.gender ||
    !!errors.email;

  return (
    <FormSectionLayout
      title="Información personal"
      description="Completá los datos básicos del usuario"
      hasErrors={hasErrors}
    >
      <div className='w-full flex items-start justify-between gap-4'>
        <FormField
          id="name"
          label="Nombre"
          required
          register={register('name')}
          error={errors.name}
        />

        <FormField
          id="lastName"
          label="Apellido"
          required
          register={register('lastName')}
          error={errors.lastName}
        />
      </div>

      <div className='w-full flex items-start justify-between gap-4'>
        <FormField
          id="birthDate"
          label="Fecha de nacimiento"
          type="date"
          required
          register={register('birthDate')}
          error={errors.birthDate}
        />

        <FormField
          id="email"
          label="Correo electrónico"
          type="email"
          required
          register={register('email')}
          error={errors.email}
        />
      </div>

      <DocumentField />

      <div className='w-full flex items-start justify-between gap-4'>
        <FormField
          id="phone"
          label="Teléfono"
          type="text"
          register={register('phone')}
          error={errors.phone}
        />

        <FormField
          id="address"
          label="Dirección"
          type="text"
          register={register('address')}
          error={errors.address}
        />
      </div>

      <GenderField />
    </FormSectionLayout>
  );
}
