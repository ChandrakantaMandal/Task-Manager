import { useEffect, useState } from "react";

import { LuUser, LuX } from "react-icons/lu";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";

import AvatarGroup from "../AvatarGroup";
import Modal from "../Modal";

const SelectUsers = ({ selectUsers, setSelectUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [tempSelectUsers, setTempSelectUsers] = useState([]);
  const [search, setSearch] = useState("");

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

  const toggleUsersSelection = (userId) => {
    setTempSelectUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const removeSelectedUser = (userId) => {
    const updated = selectUsers.filter((id) => id !== userId);
    setSelectUsers(updated);
    // keep modal selection in sync when open
    setTempSelectUsers((prev) => prev.filter((id) => id !== userId));
  };

  const handleAssign = () => {
    setSelectUsers(tempSelectUsers);
    setIsModelOpen(false);
  };

  const selectedUsersData = allUsers.filter((user) =>
    selectUsers.includes(user._id)
  );
  const filteredUsers = allUsers.filter((u) =>
    [u.name, u.email].some((v) =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectUsers.length === 0) {
      setTempSelectUsers([]);
    }
    return () => {};
  }, [selectUsers]);

  return (
    <div className="space-y-4 mt-2">
      {selectedUsersData.length === 0 && (
        <button className="card-btn" onClick={() => setIsModelOpen(true)}>
          <LuUser className="text-sm" /> Add Members
        </button>
      )}

      {selectedUsersData.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div
              className="cursor-pointer"
              onClick={() => setIsModelOpen(true)}
            >
              <AvatarGroup users={selectedUsersData} maxVisible={5} />
            </div>
            <button className="card-btn" onClick={() => setIsModelOpen(true)}>
              Manage
            </button>
          </div>

          {/* Selected users chips */}
          <div className="flex flex-wrap gap-2">
            {selectedUsersData.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-2 px-2 py-1 rounded-full bg-gray-100 border border-gray-200"
              >
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.name}
                    className="h-6 w-6 rounded-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <div className="h-6 w-6 flex items-center justify-center rounded-full bg-slate-400 text-white text-xs">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <span className="text-xs text-gray-800 font-medium">
                  {user.name}
                </span>
                <button
                  onClick={() => removeSelectedUser(user._id)}
                  className="text-gray-500 hover:text-rose-500"
                >
                  <LuX className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        title="Select Users"
      >
        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="overflow-y-auto space-y-2 h-[60vh] pr-1">
          {filteredUsers.map((user) => {
            const selected = tempSelectUsers.includes(user._id);
            return (
              <div
                key={user._id}
                className={`flex items-center gap-4 p-3 border rounded-md ${
                  selected
                    ? "bg-blue-50 border-blue-200"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {user.profileImageUrl && user.profileImageUrl.trim() !== "" ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="h-10 w-10 hidden items-center justify-center bg-slate-400 text-white font-medium text-lg rounded-full"
                  style={{
                    display:
                      user.profileImageUrl && user.profileImageUrl.trim() !== ""
                        ? "none"
                        : "flex",
                  }}
                >
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-[13px] text-gray-500 ">{user.email}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleUsersSelection(user._id)}
                  className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded-sm outline-none"
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button
            className="card-btn rounded-md"
            onClick={() => setIsModelOpen(false)}
          >
            CANCEL
          </button>
          <button className="card-btn-fill rounded-md" onClick={handleAssign}>
            DONE
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
