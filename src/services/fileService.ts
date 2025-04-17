import { axiosInstance } from "../core/api/axios.config.ts";

const fileUploadDocuments = async (file: File, userId: number | undefined) => {

    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosInstance.post(`/upload/file/${userId}?folder=documents&imageType=${file.name}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }); 
        if (!response.data) {
            return null;
        }

        return response.data.data;
    } catch (error) {
        console.log(error)
        return null;
    }
};

const getFileDocumentsUrl = async (userId: number | undefined, name: string) => {

    try {
        const response = await axiosInstance.get(`/file/${userId}/?folder=documents&name=${name}`);
        if (!response.data) {
            return null;
        }
        
        return response.data;
    } catch (error) {
        console.log(error)
        return null;
    }
};

export { fileUploadDocuments, getFileDocumentsUrl }