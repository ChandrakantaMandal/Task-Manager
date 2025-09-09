import React, { useState } from "react";
import { useEffect } from "react";
import { LuTrash2 } from "react-icons/lu";
import { LuFileSpreadsheet } from "react-icons/lu";

import axiosInstance from "../../utils/axiosInstance";
import downloadAxiosInstance from "../../utils/downloadAxiosInstance";
import { API_PATHS } from "../../utils/apiPath";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import UserCard from "../../components/Cards/UserCard";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error Fetching users:", error);
    }
  };

  //download users report
  const handleDowloadReport = async () => {
    try {
      const response = await downloadAxiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      });

      // Check if response is actually a blob
      if (response.data && response.data.size > 0) {
        //create a url from blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users_report.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Report downloaded successfully!");
      } else {
        toast.error("No data available for download.");
      }
    } catch (error) {
      console.error("Error downloading report:", error);
      // Don't let authentication errors cause logout for downloads
      if (error.response?.status === 401) {
        toast.error("Please login again to download reports.");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to download this report.");
      } else {
        toast.error("Error downloading report. Please try again.");
      }
    }
  };

  // const handleDeleteUser = async (userId) => {
  //   try {
  //     await axiosInstance.delete(API_PATHS.USERS.DELETE_USER(userId));
  //     getAllUsers();
  //   } catch (error) {
  //     console.error("Error Deleting users:", error);
  //   }
  // };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <DashboardLayout activeMenu={"Team Members"}>
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium">Team Members</h2>
          <button className="download-btn flex md:flex" onClick={handleDowloadReport}>
            <LuFileSpreadsheet className="text-lg"/>
            Download Report
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
