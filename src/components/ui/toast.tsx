import { ErrorIcon, CheckmarkIcon } from "react-hot-toast";

interface ToastProps {
  variant: "error" | "success";
  message: string;
}

export default function Toast({ message, variant }: ToastProps) {
  return (
    <div
      id="toast-danger"
      className="flex items-center w-full max-w-xs p-2 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-background dark:border"
      role="alert"
    >
      {variant === "error" && (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          <ErrorIcon />
          <span className="sr-only">Error icon</span>
        </div>
      )}
      {variant === "success" && (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <CheckmarkIcon />
          <span className="sr-only">Check icon</span>
        </div>
      )}
      <div
        className={`ms-3 text-sm font-normal ${
          variant === "error" ? "text-red-500" : "text-muted-foreground"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
