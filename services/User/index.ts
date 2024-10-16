import envConfig from "@/config/envConfig";
import { cookies, headers } from "next/headers";

export const getUsers = async ({
  limit = 10,
  page = 1,
  role,
}: {
  limit?: number | undefined;
  page?: number | undefined;
  role?: string | undefined;
}) => {
  const fetchOptions = {
    next: {
      tags: ["users"],
    },
  };

  const queryParams = new URLSearchParams();

  if (limit) {
    queryParams.append("limit", limit.toString());
  }
  if (page) {
    queryParams.append("page", page.toString());
  }

  if (role) {
    queryParams.append("role", role);
  }

  queryParams.append("sort", "-createdAt");
  const fetchURL = `${envConfig.baseApi}/users/all?${queryParams.toString()}`
  console.log(fetchURL);
  
  const res = await fetch(fetchURL,fetchOptions);
  const data= await res.json()
// console.log(data);

  return data;
};

export const getUserData = async () => {
  const token = cookies().get("accessToken")?.value;
  const fetchOptions: Record<string, unknown> = {
    next: {
      tags: ["userData"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(`${envConfig.baseApi}/users/me`, fetchOptions);

  const data= await res.json()
  // console.log(data);
  
    return data;
};

