import User from "../models/User.js";

// get logged in user profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};
// update name
export const updateName = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    user,
  });
};
// add phone number
export const addPhone = async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ message: "Phone number required" });
  }

  const user = await User.findById(req.user.id);

  user.phones.push({ number });

  await user.save();

  res.status(200).json({
    success: true,
    phones: user.phones,
  });
};
// delete phone number
export const deletePhone = async (req, res) => {
  const { phoneId } = req.params;

  const user = await User.findById(req.user.id);

  user.phones = user.phones.filter(
    (phone) => phone._id.toString() !== phoneId
  );

  await user.save();

  res.status(200).json({
    success: true,
    phones: user.phones,
  });
};
// add address
export const addAddress = async (req, res) => {
  const user = await User.findById(req.user.id);

  // If first address → make it default
  if (user.addresses.length === 0) {
    req.body.isDefault = true;
  }

  user.addresses.push(req.body);

  await user.save();

  res.status(200).json({
    success: true,
    addresses: user.addresses,
  });
};
// delete address
export const deleteAddress = async (req, res) => {
  const { addressId } = req.params;

  const user = await User.findById(req.user.id);

  user.addresses = user.addresses.filter(
    (addr) => addr._id.toString() !== addressId
  );

  // Ensure one default always exists
  if (
    user.addresses.length > 0 &&
    !user.addresses.some((a) => a.isDefault)
  ) {
    user.addresses[0].isDefault = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    addresses: user.addresses,
  });
};
// set default address
export const setDefaultAddress = async (req, res) => {
  const { addressId } = req.params;

  const user = await User.findById(req.user.id);

  user.addresses.forEach((address) => {
    address.isDefault = address._id.toString() === addressId;
  });

  await user.save();

  res.status(200).json({
    success: true,
    addresses: user.addresses,
  });
};
