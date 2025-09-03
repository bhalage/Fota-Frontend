import fleetUrl from "@/fleetUrl";

const BinaryService = {
  uploadFile: async (file, fileName) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // backend expects "file"
      if (fileName) {
        formData.append("name", fileName); // optional metadata
      }

      const response = await fleetUrl.post("/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File upload response:", response.data);
      return response.data;
    } catch (error) {
      console.error("File upload failed:", error);
      throw error;
    }
  },
  getAllFiles: async () => {
    try {
      const response = await fleetUrl.get("/api/v1/getBinariesListFroms3");
      return response.data;
    } catch (error) {
      console.error("Fetching files failed:", error);
      throw error;
    }
  },
};

export default BinaryService;
