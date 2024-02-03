import {
  CreateTouristRequest,
  ListTourist,
  Tourist,
  UpdateTouristRequest,
} from "@/types/tourist";
import { ResponseError } from "@/types";
import axiosInstance from "@/config/axios";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTourist = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["me", { id }],
    queryFn: async (): Promise<Tourist> => {
      const { data } = await axiosInstance.get(`/api/Tourist/${id}`);
      return data;
    },
    enabled,
  });
};

export const useGetListTourist = (page: string) => {
  return useQuery({
    queryKey: ["tourist", { page }],
    queryFn: async (): Promise<ListTourist> => {
      const { data } = await axiosInstance.get(`/api/Tourist?page=${page}`);
      return data;
    },
  });
};

export const useDeleteTourist = () => {
  const doDelete = async (id: string): Promise<AxiosResponse<Tourist>> => {
    return axiosInstance.delete(`/api/Tourist/${id}`);
  };
  return useMutation<AxiosResponse<Tourist>, AxiosError<ResponseError>, string>(
    {
      mutationFn: doDelete,
    }
  );
};

export const useEditTourist = () => {
  const doEdit = async (
    data: UpdateTouristRequest
  ): Promise<AxiosResponse<Tourist>> => {
    return axiosInstance.put(`/api/Tourist/${data.id}`, {
      tourist_email: data.tourist_email,
      tourist_location: data.tourist_location,
      tourist_name: data.tourist_name,
    });
  };
  return useMutation<
    AxiosResponse<Tourist>,
    AxiosError<ResponseError>,
    UpdateTouristRequest
  >({
    mutationFn: doEdit,
  });
};

export const useCreateTourist = () => {
  const doEdit = async (
    data: CreateTouristRequest
  ): Promise<AxiosResponse<Tourist>> => {
    return axiosInstance.post("/api/Tourist/", {
      tourist_email: data.tourist_email,
      tourist_location: data.tourist_location,
      tourist_name: data.tourist_name,
    });
  };
  return useMutation<
    AxiosResponse<Tourist>,
    AxiosError<ResponseError>,
    CreateTouristRequest
  >({
    mutationFn: doEdit,
  });
};
