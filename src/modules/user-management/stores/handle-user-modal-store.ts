import { create } from 'zustand';

type State = {
  isOpen: boolean;
  type: 'creation' | 'edition' | 'details';
  isDisabled: boolean;
  isCreation: boolean;
  isEdition: boolean;
  isDetails: boolean;
  // Agregar 'user' acá, me va a servir para cargar los datos del usuario a editar/ver detalles.
};

type Actions = {
  open: (type: State['type']) => void;
  close: () => void;
};

const useHandleUserModalStore = create<State & Actions>((set) => ({
  isOpen: false,
  type: 'creation',
  isDisabled: false,
  isCreation: true,
  isEdition: false,
  isDetails: false,
  open: (type) => set({
    isOpen: true,
    type,
    isDisabled: type === 'details',
    isCreation: type === 'creation',
    isEdition: type === 'edition',
    isDetails: type === 'details',
  }),
  close: () => set({
    isOpen: false,
    type: 'creation',
    isDisabled: false,
    isCreation: true,
    isEdition: false,
    isDetails: false,
  }),
}));

export default useHandleUserModalStore;
