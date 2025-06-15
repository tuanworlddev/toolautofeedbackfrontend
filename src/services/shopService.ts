import { toast } from "react-toastify";
import axiosClient from "../api/axiosClient";
import { transformShop, type CreateShop, type Shop, type UpdateShop } from "../models/shop";

const shopService = {
    async getAll(): Promise<Shop[]> {
        try {
            const response = await axiosClient.get<Shop[]>("/shops");
            return response.data.map(transformShop);
        } catch (error) {
            console.error("Failed to fetch shops:", error);
            toast.error("Lỗi lấy danh sách shop")
            throw error;
        }
    },

    async getById(id: string): Promise<Shop> {
        try {
            const response = await axiosClient.get<Shop>(`/shops/${id}`);
            return transformShop(response.data);
        } catch (error) {
            console.error(`Failed to fetch shop with id ${id}:`, error);
            toast.error("Lỗi lấy shop theo ID")
            throw error;
        }
    },

    async create(createShop: CreateShop): Promise<Shop> {
        try {
            const response = await axiosClient.post<Shop>("/shops", createShop);
            return transformShop(response.data);
        } catch (error) {
            console.error("Failed to create shop:", error);
            toast.error("Lỗi tạo shop")
            throw error;
        }
    },

    async update(id: string, updateShop: UpdateShop): Promise<Shop> {
        try {
            const response = await axiosClient.put<Shop>(`/shops/${id}`, updateShop);
            return transformShop(response.data);
        } catch (error) {
            console.error(`Failed to update shop with id ${id}:`, error);
            toast.error("Lỗi cập nhật shop")
            throw error;
        }
    },

    async delete(id: string): Promise<void> {
        try {
            await axiosClient.delete(`/shops/${id}`);
        } catch (error) {
            console.error(`Failed to delete shop with id ${id}:`, error);
            toast.error("Lỗi xóa shop")
            throw error;
        }
    },

    async toggleActivate(id: string): Promise<Shop> {
        try {
            const response = await axiosClient.patch<Shop>(`/shops/activate/${id}`);
            return transformShop(response.data);
        } catch (error) {
            console.error(`Failed to update shop with id ${id}:`, error);
            toast.error("Lỗi")
            throw error;
        }
    },

    async toggleIsAuto(id: string): Promise<Shop> {
        try {
            const response = await axiosClient.patch<Shop>(`/shops/isauto/${id}`);
            return transformShop(response.data);
        } catch (error) {
            console.error(`Failed to update shop with id ${id}:`, error);
            toast.error("Lỗi")
            throw error;
        }
    },
};

export default shopService;
