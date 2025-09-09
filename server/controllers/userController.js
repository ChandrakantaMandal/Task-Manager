import Task from "../models/Task.js";
import User from "../models/User.js";
import bycrypt from "bcryptjs";

//get all user (Admin Only)
const getUsers = async (req, res) => {
  try {
    const user = await User.find({ role: "member" }).select("-password");

    //add task count to each users
    const userWithTaskCount = await Promise.all(
      user.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });

        return {
          ...user._doc,
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );

    res.json(userWithTaskCount);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//get user by Id
const getUserById = async (req, res) => {
  try {
    const user=await User.findById(req.params.id).select("-password");
    if(!user) return res.status(404).json({message:"User Not Found"});
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//delete user (Admin Only)
// const deleteUser = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

export { getUsers, getUserById };
