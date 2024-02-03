import { useGetMe } from "@/service/auth";
import UserProfile from "@/components/organism/UserProfile";
import PrivateRoute from "@/components/template/PrivateRoute";

function Profile() {
  const { data } = useGetMe();

  return (
    <PrivateRoute>
      {data && (
        <UserProfile
          variant="admin"
          avatar={data.avatar}
          email={data.email}
          id={data.id}
          name={data.name}
        />
      )}
    </PrivateRoute>
  );
}

export default Profile;
