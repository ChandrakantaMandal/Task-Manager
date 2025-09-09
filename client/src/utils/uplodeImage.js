import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formatData = new FormData();

  //Append image file to from data
  formatData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formatData,
      {
        headers: {
          "Content-Type": "multipart/form-data", //set header file for upload
        },
      }
    );
    return response.data; //Return responce data
  } catch (error) {
    console.error("Error uploading the image", error);
    throw error; //Rethrow error for heading
  }
};

export default uploadImage;