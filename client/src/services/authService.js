import api from "./api";

/*  
   Login
  */

export const login = async (data) => {

    const response = await api.post(
        "/auth/login",
        data
    );

    return response.data;

};

/*  
   Change Password
  */

export const changePassword = async (data) => {

    const response = await api.put(
        "/auth/change-password",
        data
    );

    return response.data;

};