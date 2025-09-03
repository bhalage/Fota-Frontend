import fleetUrl from "@/fleetUrl";
import axios from "axios";
const BinaryService = {
  uploadFile: async (file, fileName) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fleetUrl.post(
        `/api/v1/upload?fileName=${encodeURIComponent(fileName)}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File upload response:", response.data);

      return response.data;
    } catch (error) {
      console.error("File upload failed:", error);
      throw error;
    }
  },
};

export default BinaryService;
