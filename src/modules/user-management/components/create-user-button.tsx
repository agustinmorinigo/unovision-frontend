import { Button } from '@/components/ui/button';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';

export default function CreateUserButton() {
  const { open } = useHandleUserModalStore();
  return <Button onClick={() => open({ type: 'creation' })}>Agregar usuario</Button>;
}
