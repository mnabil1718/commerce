import { Google } from "@/components/google-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signInWithGoogle } from "@/service/google.service";

export function GoogleSignInForm({ className = "" }: { className?: string }) {
  return (
    <form action={signInWithGoogle}>
      <Button
        type="submit"
        variant="outline"
        className={cn("w-full", className)}
      >
        <Google />
        Continue with Google
      </Button>
    </form>
  );
}
