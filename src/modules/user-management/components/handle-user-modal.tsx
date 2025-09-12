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
import HandleUserForm from '@/modules/user-management/components/handle-user-form';
import useCreateUserMutation from '@/modules/user-management/queries/use-create-user-mutation';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';
import useUpdateUserMutation from '@/modules/user-management/queries/use-update-user-mutation';
import useGetUserQuery from '@/modules/user-management/queries/use-get-user-query';

interface HandleUserFormRef {
  submit: () => void;
}

const getTitle = (type: 'creation' | 'edition' | 'details'): string => {
  if (type === 'creation') return 'Crear usuario';
  if (type === 'edition') return 'Editar usuario';
  if (type === 'details') return 'Detalles del usuario';
  return '';
}

export default function HandleUserModal() {
  const { isOpen, close, type, isCreation, isEdition, isDetails } = useHandleUserModalStore();
  const { isPending: isCreateUserPending, mutateAsync: createUserAsync } = useCreateUserMutation();
  const { isPending: isEditUserPending, mutateAsync: updateUserAsync } = useUpdateUserMutation();
  const formRef = useRef<HandleUserFormRef>(null);
  const { data: userData, isPending: isGetUserPending, isError: isGetUserError } = useGetUserQuery();
  const isSomethingPending = isCreateUserPending || isEditUserPending;

  const handleOnSubmit = () => {
    if (isSomethingPending) return;
    formRef.current?.submit();
  };

  const handleOnClose = () => {
    if (isSomethingPending) return;
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className="h-auto max-h-[95%] w-auto min-w-[500px] max-w-[95%] overflow-hidden gap-12 flex flex-col">
        <DialogHeader className="shrink-0 h-auto">
          <DialogTitle>{getTitle(type)}</DialogTitle>

          { isCreation && (
            <DialogDescription>Complete los pasos para crear un nuevo usuario</DialogDescription>
          )}
        </DialogHeader>

        <div
          className={cn(
            'overflow-x-hidden overflow-y-auto h-full pr-2.5',
            isSomethingPending && 'pointer-events-none select-none opacity-60',
          )}
        >
          {
            (!isCreation && isGetUserPending) ? (
              <Loader className="mx-auto my-20 animate-spin" />
            ) : (!isCreation && isGetUserError) ? (
              <p className="text-center my-20">Error al cargar los datos del usuario.</p>
            ) : (
              <HandleUserForm
                ref={formRef}
                createUserAsync={createUserAsync}
                updateUserAsync={updateUserAsync}
                userData={userData}
              />
            )
          }
        </div>

        {/* Meter esto en <HandleUserModalFooter /> */}
        {
          isDetails ? (
            <DialogFooter className="shrink-0 h-auto">
              <DialogClose asChild disabled={isSomethingPending}>
                <Button>Cerrar</Button>
              </DialogClose>
            </DialogFooter>
          ) : isEdition ? (
            <DialogFooter className="shrink-0 h-auto">
              <DialogClose asChild disabled={isSomethingPending}>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" onClick={handleOnSubmit} disabled={isSomethingPending}>
                {isSomethingPending && <Loader className="mr-2 animate-spin" />}
                {isSomethingPending ? 'Editando...' : 'Editar'}
              </Button>
            </DialogFooter>
          ) : (
            <DialogFooter className="shrink-0 h-auto">
              <DialogClose asChild disabled={isSomethingPending}>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" onClick={handleOnSubmit} disabled={isSomethingPending}>
                {isSomethingPending && <Loader className="mr-2 animate-spin" />}
                {isSomethingPending ? 'Creando...' : 'Crear'}
              </Button>
            </DialogFooter>
          )
        }
        {/* Meter esto en <HandleUserModalFooter /> */}
      </DialogContent>
    </Dialog>
  );
}
