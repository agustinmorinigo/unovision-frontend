import { Loader } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/cn';
import CreateUserForm from '@/modules/user-management/components/create-user-form';
import useCreateUserMutation from '@/modules/user-management/queries/use-create-user-mutation';
import useAddUserModalStore from '@/modules/user-management/stores/create-user-modal-store';

interface CreateUserFormRef {
  submit: () => void;
}

export default function AddUserModal() {
  const { isPending, mutateAsync: createUserAsync } = useCreateUserMutation();
  const { isOpen, close } = useAddUserModalStore();
  const formRef = useRef<CreateUserFormRef>(null);

  const handleCreateUser = () => {
    if (isPending) return;
    formRef.current?.submit();
  };

  const handleOnClose = () => {
    if (isPending) return;
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className="h-auto max-h-[95%] w-auto min-w-[500px] max-w-[95%] overflow-hidden gap-12 flex flex-col">
        <DialogHeader className="shrink-0 h-auto">
          <DialogTitle>Crear usuario</DialogTitle>
          <DialogDescription>Complete los pasos para crear un nuevo usuario</DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            'overflow-x-hidden overflow-y-auto h-full pr-2.5',
            isPending && 'pointer-events-none select-none opacity-60',
          )}
        >
          <CreateUserForm ref={formRef} createUserAsync={createUserAsync} />
        </div>

        <DialogFooter className="shrink-0 h-auto">
          <DialogClose asChild disabled={isPending}>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" onClick={handleCreateUser} disabled={isPending}>
            {isPending && <Loader className='mr-2 animate-spin' />}
            {isPending ? 'Creando...' : 'Crear usuario'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
