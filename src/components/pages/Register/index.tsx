import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Toast from "@/components/ui/toast";
import { RegisterBody } from "@/types/auth";
import { useRegister } from "@/service/auth";
import { Input } from "@/components/ui/input";
import Auth from "@/components/template/Auth";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

type RegisterFormValues = RegisterBody;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const auth = useAuth();
  const navigate = useNavigate();
  const { mutate: doRegister, isPending } = useRegister();

  const handleRegister: SubmitHandler<RegisterFormValues> = (data) => {
    doRegister(data, {
      onSuccess() {
        toast.custom(() => (
          <Toast
            variant="success"
            message="Register sucesfully, please login first!"
          />
        ));
        navigate("/auth/login");
      },
      onError(error) {
        toast.custom(() => (
          <Toast
            variant="error"
            message={
              error.response
                ? error.response.data.message
                : "Register failed, please try again leter!"
            }
          />
        ));
      },
    });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <Auth
      variant="register"
      title="Create an Account"
      description="Please enter your name, email and password"
    >
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-full text-left mt-6"
      >
        <div className="mb-4">
          <label className="text-sm text-muted-foreground">Name</label>
          <Input
            placeholder="Enter your name"
            className="w-full mt-2"
            {...register("name", {
              required: "Name is required",
            })}
          />
          <p
            className={`mt-1 text-xs transition-opacity duration-500 text-destructive ${
              errors.name ? "opacity-100" : "opacity-0"
            }`}
          >
            {errors?.name?.message ?? ""}
          </p>
        </div>
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
          Register
        </Button>
      </form>
    </Auth>
  );
}

export default Register;
