import { useState, useEffect } from "react";
import { ChevronLeft, Plus, X, MapPin, Phone, Check } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { loadProfile } from "../slice/ProfileSlice";
import {toast} from "react-toastify";
import {
  deleteAddress,
  setDefaultAddress,
  updateName,
  addPhone,
  deletePhone,
  addAddress,
} from "../services/profileAPIs";
function ProfileForm() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);

  // Form states
  const [name, setName] = useState("");
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  // Update name
  const handleUpdateName = async () => {
    try {

      await updateName(name);
      dispatch(loadProfile());
      console.log("Updating name to:", name);
      toast.success("Name updated successfully!");
    } catch (error) {
      toast.error("Failed to update name");
    }
  };

  // Add phone
  const handleAddPhone = async () => {
    if (!newPhone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }
    try {
      await addPhone(newPhone);
      dispatch(loadProfile());
      setNewPhone("");
      setShowPhoneForm(false);
      toast.success("Phone number added!");
    } catch (error) {
      toast.error("Failed to add phone");
    }
  };

  // Delete phone
  const handleDeletePhone = async (phoneId) => {
    try {
      await deletePhone(phoneId);
      dispatch(loadProfile());
      toast.success("Phone number removed!");
    } catch (error) {
      toast.error("Failed to remove phone");
    }
  };

  // Add address
  const handleAddAddress = async () => {
    if (
      !newAddress.line1 ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.pincode
    ) {
      toast.error("Please fill all required address fields");
      return;
    }
    try {
      await addAddress(newAddress);
      setNewAddress({
        label: "Home",
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      });
      setShowAddressForm(false);
      dispatch(loadProfile());
      toast.success("Address added!");
    } catch (error) {
      toast.error("Failed to add address");
    }
  };

  // Delete address
  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress(addressId);
      dispatch(loadProfile());
      toast.success("Address removed!");
    } catch (error) {
      toast.error("Failed to remove address");
    }
  };

  // Set default address
  const handleSetDefaultAddress = async (addressId) => {
    try {
      await setDefaultAddress(addressId);
      dispatch(loadProfile());
      toast.success("Default address updated!");
    } catch (error) {
      toast.error("Failed to set default");
    }
  };
  if (loading) return <p>Loading profile...</p>;
  if (!user) return null;
  return (
    <div className="p-2 md:p-4 md:pt-0 space-y-6 mb-5 md:mb-0 w-full">
      <div className="flex p-3 md:pt-0">
        <div className="text-xl md:text-2xl font-semibold">My Details</div>
      </div>

      <div className="flex flex-col-reverse md:flex-row w-full gap-6">
        {/* Left Section - Forms */}
        <div className="flex-1 px-5 space-y-6">
          {/* Name Section */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  className="w-full border rounded-lg p-2 mt-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  className="w-full border bg-gray-200 rounded-lg p-2 mt-1"
                  disabled
                  value={user?.email || ""}
                />
              </div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={handleUpdateName}
              >
                Update Name
              </button>
            </div>
          </div>

          {/* Phone Numbers Section */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Phone size={20} /> Phone Numbers
              </h3>
              <button
                onClick={() => setShowPhoneForm(!showPhoneForm)}
                className="text-[#FF735C] hover:text-[#ff6347] flex items-center gap-1"
              >
                <Plus size={18} /> Add
              </button>
            </div>

            {showPhoneForm && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <input
                  type="tel"
                  className="w-full border rounded-lg p-2 mb-2"
                  placeholder="+1234567890"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddPhone}
                    className="bg-[#FF735C] text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowPhoneForm(false)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {user?.phones?.length === 0 ? (
                <p className="text-gray-500 text-sm">No phone numbers added</p>
              ) : (
                user?.phones?.map((phone) => (
                  <div
                    key={phone._id}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium">{phone.number}</span>
                    <button
                      onClick={() => handleDeletePhone(phone._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Addresses Section */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin size={20} /> Addresses
              </h3>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="text-[#FF735C] hover:text-[#ff6347] flex items-center gap-1"
              >
                <Plus size={18} /> Add
              </button>
            </div>

            {showAddressForm && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-2">
                <select
                  className="w-full border rounded-lg p-2"
                  value={newAddress.label}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, label: e.target.value })
                  }
                >
                  <option>Home</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>
                <input
                  className="w-full border rounded-lg p-2"
                  placeholder="Address Line 1 *"
                  value={newAddress.line1}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, line1: e.target.value })
                  }
                />
                <input
                  className="w-full border rounded-lg p-2"
                  placeholder="Address Line 2"
                  value={newAddress.line2}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, line2: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <input
                    className="flex-1 border rounded-lg p-2"
                    placeholder="City *"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                  <input
                    className="flex-1 border rounded-lg p-2"
                    placeholder="State *"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 border rounded-lg p-2"
                    placeholder="Pincode *"
                    value={newAddress.pincode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, pincode: e.target.value })
                    }
                  />
                  <input
                    className="flex-1 border rounded-lg p-2"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, country: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddAddress}
                    className="bg-[#FF735C] text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Save Address
                  </button>
                  <button
                    onClick={() => setShowAddressForm(false)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {user?.addresses?.length === 0 ? (
                <p className="text-gray-500 text-sm">No addresses added</p>
              ) : (
                user?.addresses?.map((address) => (
                  <div
                    key={address._id}
                    className={`p-3 rounded-lg border-2 ${
                      address.isDefault
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#FF735C]">
                          {address.label}
                        </span>
                        {address.isDefault && (
                          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check size={12} /> Default
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteAddress(address._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-700">
                      {address.line1}
                      {address.line2 && `, ${address.line2}`}
                    </p>
                    <p className="text-sm text-gray-700">
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p className="text-sm text-gray-600">{address.country}</p>
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefaultAddress(address._id)}
                        className="mt-2 text-xs text-[#FF735C] hover:text-[#ff6347] font-medium"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Profile Picture */}
        <div className="flex flex-col items-center md:px-10 md:mx-20 md:mt-5 gap-4 mb-6">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="h-20 w-20 md:h-40 md:w-40 rounded-full object-cover border-4 border-[#FF735C]"
            />
          ) : (
            <span className="h-20 w-20 md:h-40 md:w-40 bg-gradient-to-br from-[#FF735C] to-[#ff6347] flex justify-center items-center rounded-full text-white text-3xl md:text-5xl font-bold">
              {name?.[0]?.toUpperCase() || "U"}
            </span>
          )}
          <span className="text-center text-gray-500 text-lg md:text-xl font-semibold">
            Profile Picture
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
