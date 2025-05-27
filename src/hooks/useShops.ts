import { useState } from "react"
import type { CreateShop, Shop, UpdateShop } from "../models/shop";
import shopService from "../services/shopService";

export const useShops = () => {
    const [shops, setShops] = useState<Shop[]>([]);
    const [selectedShop, setSelectedShop] = useState<Shop | undefined>();
    const [loading, setLoading] = useState(true);

    const fetchShop = async () => {
        try {
            const data = await shopService.getAll();
            setShops(data);
        } catch (err) {
            console.error("Error fetching shops", err);
        } finally {
            setLoading(false);
        }
    };

    const createShop = async (createShop: CreateShop) => {
        const newShop = await shopService.create(createShop);
        setShops(prev => [...prev, newShop]);
    };

    const updateShop = async (id: string, updateShop: UpdateShop) => {
        const updated = await shopService.update(id, updateShop);
        setShops(prev => prev.map(p => (p.id === id ? { ...updated } : p)));
    };

    const deleteShop = async (id: string) => {
        await shopService.delete(id);
        setShops(prev => prev.filter(p => p.id !== id));
        setSelectedShop(undefined);
    };

    const toggleActivate = async (id: string) => {
        const updated = await shopService.toggleActivate(id);
        setShops(prev => prev.map(p => (p.id === id ? { ...updated } : p)));
        if (selectedShop?.id === id) {
            setSelectedShop(updated);
        }
    };

    const toggleIsAuto = async (id: string) => {
        const updated = await shopService.toggleIsAuto(id);
        setShops(prev => prev.map(p => (p.id === id ? { ...updated } : p)));
        if (selectedShop?.id === id) {
            setSelectedShop(updated);
        }
    };

    const changeSelectedShop = (shop: Shop) => {
        setSelectedShop(shop);
    }

    return {
        shops,
        loading,
        selectedShop,
        fetchShop,
        createShop,
        updateShop,
        deleteShop,
        toggleActivate,
        toggleIsAuto,
        changeSelectedShop,
    };

};