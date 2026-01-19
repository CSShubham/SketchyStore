import API from "../api";

// profile
export const getProfile = () => API.get("/profile");

// name
export const updateName = (name) =>
  API.put("/profile/name", { name });

// phone
export const addPhone = (number) =>
  API.post("/profile/phone", { number });

export const deletePhone = (phoneId) =>
  API.delete(`/profile/phone/${phoneId}`);

// address
export const addAddress = (data) =>
  API.post("/profile/address", data);

export const deleteAddress = (addressId) =>
  API.delete(`/profile/address/${addressId}`);

export const setDefaultAddress = (addressId) =>
  API.put(`/profile/address/${addressId}/default`);