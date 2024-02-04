import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <main className="w-full h-dvh flex items-center justify-center">
      <Loader2 className="w-11 h-11 animate-spin" />
    </main>
  );
}
