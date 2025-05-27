export interface Shop {
    id: string,
    name: string,
    apiKey: string,
    activate: boolean,
    isAuto: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export interface CreateShop {
    name: string,
    apiKey: string,
}

export interface UpdateShop {
    name: string,
    apiKey: string,
    activate: boolean,
    isAuto: boolean,
}

export const transformShop = (raw: any): Shop => ({
    ...raw,
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
});
