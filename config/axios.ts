import axios, { AxiosError, GenericAbortSignal, RawAxiosRequestConfig, ResponseType } from "axios";

export const FORM_DATA_TYPE = "multipart/form-data";

enum ERROR_MESSAGES_ENUM {
  networkError = "There were network problems. Check your internet connection and try again.",
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export const instance = axios.create({
  baseURL,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface CallApi {
  url: string;
  data?: any;
  method: "get" | "post" | "put" | "patch" | "delete";
  params?: any;
  signal?: GenericAbortSignal;
  isFormData?: boolean;
}

export const axiosErrorHandler = (error: AxiosError) => {
  if (error.isAxiosError) {
    console.log({ error });

    if (error.response) {
      console.error(`[API Error]: ${JSON.stringify(error.response.data)}`);
      return Promise.reject(error);
    } else {
      console.error("[Network Error]: No Response Received");
      return Promise.reject(ERROR_MESSAGES_ENUM.networkError);
    }
  } else {
    console.error("[Non-HTTP Error]:", error);
    return Promise.reject(error);
  }
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.message !== "canceled") return axiosErrorHandler(error);
  }
);

export const getApi = (apiConfig?: { accessToken?: string; type?: ResponseType }) => {
  const callApi = async <T = any>(
    options: CallApi
  ): Promise<{
    success: true;
    result: T;
  }> => {
    const config: RawAxiosRequestConfig = {
      data: {},
      params: {},
      ...options,
      responseType: apiConfig?.type || "json",
      withCredentials: true,
      headers: {
        Authorization: apiConfig?.accessToken ? `Bearer ${apiConfig.accessToken}` : undefined,
        "Content-Type": options.isFormData ? FORM_DATA_TYPE : "application/json",
      },
    };

    try {
      const result = await instance(config);
      return { success: true, result: result?.data };
    } catch (error) {
      throw error;
    }
  };

  return {
    post: <T = any>(
      url: string,
      data?: Record<string, any>,
      params?: Record<string, any>,
      isFormData?: boolean,
      signal?: GenericAbortSignal
    ) =>
      callApi<T>({
        method: "post",
        params,
        url,
        data,
        isFormData,
        signal,
      }),
    get: <T = any>(url: string, params?: Record<string, any> | undefined, signal?: GenericAbortSignal) =>
      callApi<T>({
        method: "get",
        params,
        url,
        signal,
      }),
    patch: <T = any>(url: string, data?: Record<string, any>, params?: Record<string, any>) =>
      callApi<T>({
        method: "patch",
        params,
        url,
        data,
      }),
    put: <T = any>(url: string, data?: Record<string, any>, params?: Record<string, any>) =>
      callApi<T>({
        method: "put",
        params,
        url,
        data,
      }),
    delete: <T = any>(url: string, params?: Record<string, any>) =>
      callApi<T>({
        method: "delete",
        params,
        url,
      }),
  };
};

export type ApiClient = ReturnType<typeof getApi>;
