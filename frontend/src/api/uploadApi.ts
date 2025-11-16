import { axiosClient } from "./axiosClient";

export interface UploadRequestOptions {
  folder?: string;
  resourceType?: "image" | "video" | "raw" | "auto";
}

export interface UploadResponse {
  url: string;
  secureUrl: string;
  publicId: string;
  resourceType: string;
  format?: string;
  bytes: number;
  originalFilename?: string;
}

export const uploadApi = {
  async uploadFile(file: File, options: UploadRequestOptions = {}): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);
    if (options.folder) {
      formData.append("folder", options.folder);
    }
    if (options.resourceType) {
      formData.append("resourceType", options.resourceType);
    }

    const response = await axiosClient.post("/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data as UploadResponse;
  },
};
