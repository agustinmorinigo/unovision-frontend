import CreateUserButton from '@/modules/user-management/components/create-user-button';
import CreateUserModal from '@/modules/user-management/components/create-user-modal';
import UserManagementTable from '@/modules/user-management/components/user-management-table';

export default function UserManagementLayout() {
  return (
    <div className="w-full flex flex-col gap-8 max-w-4xl overflow-hidden mx-auto mt-24">
      <div className='w-full flex items-center justify-end'>
        <CreateUserButton />
      </div>
      <UserManagementTable />
      <CreateUserModal />
    </div>
  );
}
