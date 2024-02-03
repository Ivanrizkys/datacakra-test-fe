import { useParams } from "react-router-dom";
import { useGetTourist } from "@/service/tourist";
import UserProfile from "@/components/organism/UserProfile";
import PrivateRoute from "@/components/template/PrivateRoute";

function TouristDetail() {
  const params = useParams();
  const { data } = useGetTourist(params.id as string, !!params.id);

  return (
    <PrivateRoute>
      {data && (
        <UserProfile
          variant="tourist"
          id={data.id}
          name={data.tourist_name}
          avatar={data.tourist_profilepicture}
          email={data.tourist_email}
        />
      )}
    </PrivateRoute>
  );
}

export default TouristDetail;
