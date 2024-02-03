import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

interface AuthProps {
  title: string;
  description: string;
  variant: "login" | "register";
  children: ReactNode;
}

export default function Auth({
  variant,
  title,
  description,
  children,
}: AuthProps) {
  const { setTheme } = useTheme();

  return (
    <main className="min-h-dvh grid grid-cols-1 lg:grid-cols-2 overflow-y-hidden">
      <section className="bg-zinc-900 hidden lg:block"></section>
      <section className="flex flex-col items-center justify-center px-6 relative">
        <button
          onClick={() => setTheme("dark")}
          className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 right-8 top-8"
        >
          <Sun className="h-5 w-5" />
        </button>
        <button
          onClick={() => setTheme("light")}
          className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 right-8 top-8"
        >
          <Moon className="h-5 w-5" />
        </button>
        <div className="max-w-[25rem] w-full text-center">
          <h1 className="text-foreground text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-sm mt-2">{description}</p>
          {children}
          {variant === "login" && (
            <p className="text-muted-foreground text-sm text-center mt-4">
              Don't have an account yet ?{" "}
              <Link
                className="underline underline-offset-4 hover:text-primary"
                to="/auth/register"
              >
                Register
              </Link>
            </p>
          )}
          {variant === "register" && (
            <p className="text-muted-foreground text-sm text-center mt-4">
              Already have an account yet ?{" "}
              <Link
                className="underline underline-offset-4 hover:text-primary"
                to="/auth/login"
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
