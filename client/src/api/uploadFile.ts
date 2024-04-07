import axios from "axios";

export async function uploadFile(data: FormData) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL! + "/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("failed to fetch!!");
  }
}
