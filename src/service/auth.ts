import {
  AuthResponse,
  LoginBody,
  LoginResponseData,
  RegisterBody,
  RegisterResponseData,
  User,
} from "@/types/auth";
import { ResponseError } from "@/types";
import axiosInstance from "@/config/axios";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  const doLogin = async (
    body: LoginBody
  ): Promise<AxiosResponse<AuthResponse<LoginResponseData>>> => {
    return axiosInstance.post("/api/authaccount/login", body);
  };

  return useMutation<
    AxiosResponse<AuthResponse<LoginResponseData>>,
    AxiosError<ResponseError>,
    LoginBody
  >({
    mutationFn: doLogin,
  });
};

export const useRegister = () => {
  const doLogin = async (
    body: RegisterBody
  ): Promise<AxiosResponse<AuthResponse<RegisterResponseData>>> => {
    return axiosInstance.post("/api/authaccount/registration", body);
  };

  return useMutation<
    AxiosResponse<AuthResponse<RegisterResponseData>>,
    AxiosError<ResponseError>,
    RegisterBody
  >({
    mutationFn: doLogin,
  });
};

export const useGetMe = () => {
  const id = localStorage.getItem("userId");

  return useQuery({
    queryKey: ["me", { id }],
    queryFn: async (): Promise<User> => {
      const { data } = await axiosInstance.get(`/api/users/${id}`);
      return data;
    },
  });
};
