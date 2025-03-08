import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardNavbar from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();

  // Local state for user profile fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [profilePic, setProfilePic] = useState(null); // File input
  const [profilePicUrl, setProfilePicUrl] = useState(""); // Profile picture preview

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("customerToken")); // Fix applied here

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;

      // Populate state
      setName(userData.name || "");
      setEmail(userData.email || "");
      setCity(userData.city || "");
      setStateVal(userData.state || "");
      setCountry(userData.country || "");
      setPhoneNumber(userData.phoneNumber || "");
      setDob(userData.dob || "");
      if (userData.profilePicUrl) {
        setProfilePicUrl(userData.profilePicUrl);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  // Use FormData to send both text fields + file
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("customerToken")); // ✅ Fix applied
  
      if (!token) {
        alert("Unauthorized: Please log in again.");
        return;
      }
  
      // Build form data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", city);
      formData.append("state", stateVal);
      formData.append("country", country);
      formData.append("phoneNumber", phoneNumber);
      formData.append("dob", dob);
  
      // If profile picture is uploaded, add it
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }
  
      // Make API request
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Profile updated:", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />

      <div className="max-w-4xl mx-auto p-6 bg-white mt-10 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

        {/* Display current profile picture if exists */}
        {profilePicUrl && (
          <div className="mb-4">
            <img
              src={`http://localhost:5000${profilePicUrl}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}

        <form onSubmit={handleUpdateProfile} encType="multipart/form-data">
          {/* Name and DOB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Date of Birth</label>
              <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="mm/dd/yyyy"
              />
            </div>
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">State</label>
              <input
                type="text"
                value={stateVal}
                onChange={(e) => setStateVal(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter state"
              />
            </div>
          </div>

          {/* Country and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Email and Profile Pic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Profile Picture</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Go to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
