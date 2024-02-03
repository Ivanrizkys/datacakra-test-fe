import Cookies from "js-cookie";
import { User } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface UserProfileProps extends Omit<User, "password"> {
  variant: "admin" | "tourist";
}

export default function UserProfile({
  id,
  avatar,
  email,
  name,
  variant,
}: UserProfileProps) {
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("userId");
    Cookies.remove("token");
    navigate("/auth/login");
  };

  return (
    <main className="pt-24 px-6 md:px-12 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <div className="w-52 h-52 rounded-full overflow-hidden">
          <img
            src={avatar}
            alt="profile picture"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-bold text-2xl text-center text-foreground">
          {name}
        </h2>
        <div className="text-base text-primar text-center">
          <p className="font-bold">ID</p>
          <p className="font-normal">{id}</p>
        </div>
        <div className="text-base text-primary text-center">
          <p className="font-bold">EMAIL</p>
          <p className="font-normal">{email}</p>
        </div>
      </div>
      {variant === "admin" && (
        <Button variant="destructive" onClick={logOutHandler}>
          Logout
        </Button>
      )}
      {variant === "tourist" && (
        <Button onClick={() => navigate(-1)}>Back</Button>
      )}
    </main>
  );
}
