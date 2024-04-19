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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}
