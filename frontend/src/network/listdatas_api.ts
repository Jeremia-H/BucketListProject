import { ConflictError, UnauthorizedError } from "../errors/http_errors.ts";
import { ListData } from "../models/listdata";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage)
    } else {
      throw Error("Request failed with status: " + response.status + "message" + errorMessage);
  }
}
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("/api/users", { method: "GET"})
  return response.json();
  
}

export interface SignUpCredentials {
  username: string,
  password: string,
}

export async function signUp(credentials: SignUpCredentials ): Promise<User> {
  const response = await fetchData("/api/users/signup",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //this tells our backend we are sending a json
    },
    body: JSON.stringify(credentials),
  })
  return response.json();
}

export interface LoginCredentials {
  username: string,
  password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("/api/users/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //this tells our backend we are sending a json
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  fetchData("/api/users/logout",
  {
    method: "GET",
  });
}


// listdatas_api.ts
export async function fetchListDatas() {
  try {
      const response = await fetch("/api/listdata");
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched data:", data); // Debugging log
      return data;
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
  }
}
export interface ListDataInput {
  title: string;
  notes: string;
  budget: number;
  country: string;
  city: string;
  activity: string;
  actbudget: number;
  category: string;
  date: Date;
}

export async function createListData(
  Listdata: ListDataInput
): Promise<ListData> {
  const response = await fetchData("/api/Listdata", {
    method: "POST", //because we want to send data
    headers: {
      "Content-Type": "application/json", //this tells our backend we are sending a json
    },
    body: JSON.stringify(Listdata), //we can only send strings back and forth between server and frontend
  });

  return response.json();
}
export async function updateListData(
  ListdataID: string,
  Listdata: ListDataInput
): Promise<ListData> {
  const response = await fetchData(
    "/api/Listdata/" + ListdataID,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", //this tells our backend we are sending a json
      },
      body: JSON.stringify(Listdata), //we can only send strings back and forth between server and frontend
    }
  );
  return response.json();
}

export async function deleteListData(ListdataID: string) {
  await fetchData("/api/Listdata/" + ListdataID, {
    method: "DELETE",
  });
}