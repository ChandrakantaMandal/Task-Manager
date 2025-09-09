import React, { useState,useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";

import axiosInstance from "../../utils/axiosInstance";
import { PRIORITY_DATA } from "../../utils/data";
import { API_PATHS } from "../../utils/apiPath";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import SelectDropdown from "../../components/Inputes/SelectDropdown";
import SelectUsers from "../../components/Inputes/SelectUsers";
import TodoListInput from "../../components/Inputes/TodoListInput";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });
  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    //reset form
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  //create task
  const createTask = async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoChecklist?.map((item) => ({
        text: item, completed: false
      }));

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
      });
      if (response.data) {
        toast.success("Task Created Successfully");
        clearData();
        navigate("/admin/tasks");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //update task
  const updateTask = async () => {
    setLoading(true);

    try {
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodochecklist = currentTask?.todoChecklist || [];
        const matchedTask = prevTodochecklist.find(
          (task) => task.text === item
        );

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      const responce = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoChecklist: todolist,
        }
      );

      toast.success("Task Update Successfully");
    } catch (error) {
      console.error("Error Creating Task", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setError(null);

    //Input Validation
    if (!taskData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!taskData.dueDate || taskData.dueDate.trim() === "") {
      setError("Due date is required");
      return;
    }
    if (taskData.assignedTo?.length === 0) {
      setError("Assign task to at least one user");
      return;
    }
    if (taskData.todoChecklist?.length === 0) {
      setError("Add at least one item to todo checklist");
      return;
    }
    if (taskId) {
      updateTask();
    } else {
      createTask();
    }
  };

  //get Task info by ID
  const getTaskdetailById = async () => {
    try {
      const responce = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (responce.data) {
        const taskInfo = responce.data;
        setCurrentTask(taskInfo);

        setTaskData((prevState) => ({
          title: taskInfo.title || "",
          description: taskInfo.description || "",
          priority: taskInfo.priority || "Low",
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : "",
          assignedTo: taskInfo.assignedTo.map((item) => item?._id) || [],
          todoChecklist:
            taskInfo?.todoChecklist.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //delete Task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

      setOpenDeleteAlert(false);
      toast.success("Task deleted successfully");
      navigate("/admin/tasks");
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskdetailById(taskId);
    }

    // cleanup function
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 mt-4 md:grid-cols-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                placeholder="Create App UI"
                className="form-input"
                value={taskData.title || ""}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Describe task"
                className="form-input"
                rows={4}
                value={taskData.description || ""}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4 ">
                <label className="text-shadow-xs text-slate-600 font-medium">
                  Priority
                </label>
                <SelectDropdown
                  option={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>
            </div>
            <div className="col-span-6 md:col-span-4">
              <label className="text-sm font-medium text-slate-600">
                Due Date
              </label>
              <input
                placeholder="Create App UI"
                className="form-input"
                value={taskData.dueDate || ""}
                onChange={({ target }) =>
                  handleValueChange("dueDate", target.value)
                }
                type="date"
              />
            </div>
            <div className="col-span-12 md:col-span-3">
              <label className="text-sm font-medium text-slate-600">
                Assign To
              </label>
              <SelectUsers
                selectUsers={taskData.assignedTo}
                setSelectUsers={(value) => {
                  handleValueChange("assignedTo", value);
                }}
              />
            </div>
            <div className="mt-3">
              <label className="text-sm font-medium text-slate-600">
                TODO Checklist
              </label>
              <TodoListInput
                todoList={taskData.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>
            <div className="mt-3">
              <label className="text-sm font-medium text-slate-600">
                Add Attachment
              </label>
              <input
                type="file"
                multiple
                className="form-input"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  handleValueChange("attachments", files);
                }}
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-medium">{error}</p>
            )}
            <div className="flex justify-end mt-7 ">
              <button
                className="add-btn rounded-md"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={openDeleteAlert} onClose={() => setOpenDeleteAlert(false)} title="Delete Task">
        <DeleteAlert content="Are you sure you want to delete this task?" onDelete={deleteTask} />
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
