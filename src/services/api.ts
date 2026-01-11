import {
  ILoginResponse,
  ILoginFormInputs,
  IUser,
  ISignUp,
  IUserProfile,
  IOrder,
  IDateWiseOrders,
  IProduct,
  CommonResponse,
  IAddress,
} from "../interface/types";
import { httpWithCredentials, httpWithoutCredentials } from "./http";

const isAuthorized = async () => {
  try {
    const response = await httpWithCredentials.get<IUser>(
      "/customer/isAuthorized"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (credential: ILoginFormInputs) => {
  try {
    const response = await httpWithCredentials.post<ILoginResponse>(
      "/customer/login",
      credential
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const signUp = async (credential: ISignUp) => {
  try {
    const response = await httpWithCredentials.post<ILoginResponse>(
      "/customer/signup",
      credential
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logOut = async () => {
  try {
    const response = await httpWithCredentials.get<ILoginResponse>(
      "/customer/logout"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (
  phoneNumber: number,
  token: string,
  newPassword: string
) => {
  try {
    const response = await httpWithCredentials.post("/customer/resetPassword", {
      phoneNumber,
      token,
      newPassword,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserByUserId = async (userId: string) => {
  try {
    var response = await httpWithCredentials.get<IUserProfile>(
      `/customer/getUserByUserId/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    var response = await httpWithCredentials.update<IUserProfile>(
      `/customer/updateProfile/${userId}`,
      profileData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createProductOrder = async (data: IOrder) => {
  // console.log(data);
  try {
    const response = await httpWithCredentials.post<CommonResponse<any>>(
      "orders/createNewOrder",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchLoggedInUserOrders = async (userId: string) => {
  try {
    const response = await httpWithCredentials.get<IDateWiseOrders[]>(
      "/orders/getOrdersByUserId",
      {
        params: {
          id: userId,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function fetchStates() {
  const headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    "S1lMZ0c4M3RSTDhGemI4V1lONWhaQUt2OEJjQU5pQ3pUc2hhYkpJRg=="
  );
  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://api.countrystatecity.in/v1/countries/IN/states",
      requestOptions
    );
    const data = await response.json();
    const stateNames = data.map((state) => state.name);

    return stateNames;
  } catch (error) {
    console.error("Error fetching states: ", error);
    return [];
  }
}

const getNewArrivalProductsData = async () => {
  try {
    const response = await httpWithoutCredentials.get<IProduct[]>(
      "/product/getNewArrivalProducts"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserAddress = async (
  userId: string,
  address: IAddress
): Promise<void> => {
  await httpWithCredentials.update(`/customer/${userId}/address`, address);
};

export {
  isAuthorized,
  login,
  signUp,
  logOut,
  resetPassword,
  createProductOrder,
  getUserByUserId,
  updateUserProfile,
  fetchLoggedInUserOrders,
  getNewArrivalProductsData,
};
