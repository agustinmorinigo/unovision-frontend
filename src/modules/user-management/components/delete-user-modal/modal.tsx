import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter, 
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/cn';
import useDeleteUserModalStore from '@/modules/user-management/stores/delete-user-modal-store';


export default function DeleteUserModal() {
  const { isOpen, close } = useDeleteUserModalStore();
  const isPending = false

  const handleOnSubmit = () => {
    if (isPending) return;
    // formRef.current?.submit();
  };

  const handleOnClose = () => {
    if (isPending) return;
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className="h-auto max-h-[95%] w-auto min-w-[500px] max-w-[95%] overflow-hidden gap-12 flex flex-col">
        <DialogHeader className="shrink-0 h-auto">
          <DialogTitle>Eliminar usuario</DialogTitle>
          <DialogDescription>Estás a punto de eliminar un usuario</DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            'overflow-x-hidden overflow-y-auto h-full pr-2.5',
            isPending && 'pointer-events-none select-none opacity-60',
          )}
        >
          {/* Acá. */}
        </div>

        <DialogFooter className="shrink-0 h-auto">
          <DialogClose asChild disabled={isPending}>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" onClick={handleOnSubmit} disabled={isPending}>
            {isPending && <Loader className="mr-2 animate-spin" />}
            {isPending ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
