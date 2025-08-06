import { Button } from '@/components/ui/button';
import useSignInWithGoogleMutation from '@/modules/auth/queries/use-sign-in-with-google-mutation';

export default function ProviderButtons() {
  const { mutate: signInWithGoogle } = useSignInWithGoogleMutation();
  return (
    <div className="w-full gap-4">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 bg-transparent"
        onClick={() => signInWithGoogle()}
      >
        Gmail
      </Button>
    </div>
  );
}
