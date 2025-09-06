import { Button } from '@/components/ui/button';
import useAddUserModalStore from '@/modules/user-management/stores/create-user-modal-store';

export default function CreateUserButton() {
  const { open } = useAddUserModalStore();

  return (
    <Button onClick={open}>
      Agregar usuario
    </Button>
  )
}
