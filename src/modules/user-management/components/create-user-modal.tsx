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
import CreateUserForm from '@/modules/user-management/components/create-user-form';
import useAddUserModalStore from '@/modules/user-management/stores/create-user-modal-store';

interface CreateUserFormRef {
  submit: () => void;
}

export default function AddUserModal() {
  const { isOpen, close } = useAddUserModalStore();
  const formRef = useRef<CreateUserFormRef>(null);

  const handleCreateUser = () => {
    formRef.current?.submit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-auto max-h-[95%] w-auto min-w-[500px] max-w-[95%] overflow-hidden gap-12 flex flex-col">

        <DialogHeader className='shrink-0 h-auto'>
          <DialogTitle>Crear usuario</DialogTitle>
          <DialogDescription>Complete los pasos para crear un nuevo usuario</DialogDescription>
        </DialogHeader>

        <div className='overflow-x-hidden overflow-y-auto h-full pr-2.5'>
          <CreateUserForm ref={formRef} />
        </div>

        <DialogFooter className='shrink-0 h-auto'>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" onClick={handleCreateUser}>
            Crear usuario
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
