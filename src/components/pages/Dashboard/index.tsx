import {
  useCreateTourist,
  useDeleteTourist,
  useEditTourist,
  useGetListTourist,
} from "@/service/tourist";
import toast from "react-hot-toast";
import Toast from "@/components/ui/toast";
import { useGetMe } from "@/service/auth";
import { useCallback, useState } from "react";
import Pagination from "@/components/ui/pagination";
import { UpdateTouristRequest } from "@/types/tourist";
import { useQueryClient } from "@tanstack/react-query";
import TouristTable from "@/components/organism/TouristTable";
import LoaderTable from "@/components/organism/TouristTable/Loader";

function Dashboard() {
  const [page, setPage] = useState<number>(1);
  const [deletedId, setDeletedId] = useState<string>("");
  const [dialogEdit, setDialogEdit] = useState<boolean>(false);
  const [dialogCreate, setDialogCreate] = useState<boolean>(false);
  const [dialogDelete, setDialogDelete] = useState<boolean>(false);
  const [touristData, setTouristData] = useState<UpdateTouristRequest>({
    id: "",
    tourist_email: "",
    tourist_location: "",
    tourist_name: "",
  });

  const queryClient = useQueryClient();
  const { data: profile } = useGetMe();
  const { data, isPending } = useGetListTourist(`${page}`);
  const { mutate: doEdit } = useEditTourist();
  const { mutate: doDelete } = useDeleteTourist();
  const { mutate: doCreate } = useCreateTourist();

  const handleCreateTourist = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const locationValue = formData.get("location");
      const nameValue = formData.get("name");
      const emailValue = formData.get("email");
      doCreate(
        {
          tourist_email: emailValue as string,
          tourist_location: locationValue as string,
          tourist_name: nameValue as string,
        },
        {
          onSuccess() {
            toast.custom(() => (
              <Toast variant="success" message="Sucesfully create a tourist!" />
            ));
            setDialogCreate(false);
          },
          onError(error) {
            toast.custom(() => (
              <Toast
                variant="error"
                message={
                  error.response
                    ? error.response.data.message
                    : "Create a tourist failed, please try again leter!"
                }
              />
            ));
          },
        }
      );
    },
    [doCreate]
  );

  const handleEditTourist = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const locationValue = formData.get("location");
      const nameValue = formData.get("name");
      const emailValue = formData.get("email");
      doEdit(
        {
          id: touristData.id,
          tourist_email: emailValue as string,
          tourist_location: locationValue as string,
          tourist_name: nameValue as string,
        },
        {
          onSuccess() {
            queryClient.invalidateQueries({
              queryKey: ["tourist", { page: page.toString() }],
            });
            toast.custom(() => (
              <Toast variant="success" message="Sucesfully update a tourist!" />
            ));
            setDialogEdit(false);
          },
          onError(error) {
            toast.custom(() => (
              <Toast
                variant="error"
                message={
                  error.response
                    ? error.response.data.message
                    : "Update a tourist failed, please try again leter!"
                }
              />
            ));
          },
        }
      );
    },
    [doEdit, page, queryClient, touristData.id]
  );

  const handleDeleteTourist = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      doDelete(deletedId, {
        onSuccess() {
          queryClient.invalidateQueries({
            queryKey: ["tourist", { page: page.toString() }],
          });
          toast.custom(() => (
            <Toast variant="success" message="Sucesfully delete tourist!" />
          ));
          setDialogDelete(false);
        },
        onError(error) {
          toast.custom(() => (
            <Toast
              variant="error"
              message={
                error.response
                  ? error.response.data.message
                  : "Delete tourist failed, please try again leter!"
              }
            />
          ));
        },
      });
    },
    [deletedId, doDelete, page, queryClient]
  );

  return (
    <main className="px-6 md:px-12 pt-24 pb-8">
      <h1 className="text-foreground text-2xl font-bold">
        Welcome {profile?.name}!
      </h1>
      <p className="text-muted-foreground text-sm">
        This in your list tourist that you can find and modified!
      </p>
      <div className="mt-8">
        {isPending ? (
          <LoaderTable />
        ) : (
          <>
            {data?.data && (
              <TouristTable
                data={data.data}
                dialogEdit={dialogEdit}
                dialogCreate={dialogCreate}
                dialogDelete={dialogDelete}
                touristData={touristData}
                setDeletedId={setDeletedId}
                setDialogCreate={setDialogCreate}
                setDialogDelete={setDialogDelete}
                setDialogEdit={setDialogEdit}
                setTouristData={setTouristData}
                handleEditTourist={handleEditTourist}
                handleCreateTourist={handleCreateTourist}
                handleDeleteTourist={handleDeleteTourist}
              />
            )}
          </>
        )}
      </div>
      <div className="mt-4">
        <Pagination
          page={page}
          totalPage={data?.total_pages}
          setPage={setPage}
        />
      </div>
    </main>
  );
}

export default Dashboard;
