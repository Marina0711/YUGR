export enum StatusEnum {
    error,
    success,
    loading
}

export type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
}

export type CategoryType = {
    id: number,
    name: string
}

export type ProductType = {
    id: number,
    name: string,
    price: number,
    rating: {
        isRated: boolean,
        rate: number
    },
    img: string,
    categoryId: number
}
