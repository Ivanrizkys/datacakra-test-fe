import Cookies from "js-cookie";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { LoginBody } from "@/types/auth";
import Toast from "@/components/ui/toast";
import { useLogin } from "@/service/auth";
import { Input } from "@/components/ui/input";
import Auth from "@/components/template/Auth";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

type LoginFormValues = LoginBody;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const auth = useAuth();
  const navigate = useNavigate();
  const { mutate: doLogin, isPending } = useLogin();

  const handleLogin: SubmitHandler<LoginFormValues> = async (data) => {
    doLogin(data, {
      onSuccess(res) {
        localStorage.setItem("userId", res.data.data.Id);
        Cookies.set("token", res.data.data.Token);
        navigate("/profile");
        toast.custom(() => (
          <Toast
            variant="success"
            message={`Sucesfully login as ${res.data.data.Name}!`}
          />
        ));
      },
      onError(error) {
        toast.custom(() => (
          <Toast
            variant="error"
            message={
              error.response
                ? error.response.data.message
                : "Login failed, please try again leter!"
            }
          />
        ));
      },
    });
  };

  if (auth) return <Navigate to="/profile" />;

  return (
    <Auth
      variant="login"
      title="Login to Dashboard"
      description="Please enter your email and password"
    >
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full text-left mt-6"
      >
        <div className="mb-4">
          <label className="text-sm text-muted-foreground">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                message: "Must be a valid email",
              },
            })}
          />
          <p
            className={`mt-1 text-xs transition-opacity duration-500 text-destructive ${
              errors.email ? "opacity-100" : "opacity-0"
            }`}
          >
            {errors?.email?.message ?? ""}
          </p>
        </div>
        <div className="mb-4">
          <label className="text-sm text-muted-foreground">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            className="w-full mt-2"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <p
            className={`mt-1 text-xs transition-opacity duration-500 text-destructive ${
              errors.password ? "opacity-100" : "opacity-0"
            }`}
          >
            {errors?.password?.message ?? ""}
          </p>
        </div>
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Auth>
  );
}

export default Login;
