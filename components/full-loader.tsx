import { Loader } from "lucide-react";

export function FullLoader() {
  return (
    <div className="w-full h-screen bg-background flex flex-col justify-center items-center">
      <Loader size={32} className="animate-spin text-primary" />
    </div>
  );
}
