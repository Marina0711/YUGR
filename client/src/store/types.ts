export enum StatusEnum {
    error,
    success,
    loading
}

export enum RoleEnum {
    admin = 'ADMIN'
}

export type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    role: string
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

export type ProductDetailsType = {
    id: number,
    name: string,
    price: number,
    img: string,
    categoryId: number,
    info: [
        {
            id: number,
            title: string,
            description: string,
            productId: number
        }
    ],
    rateInfo: {
        isRated: boolean,
        rate: number
    }
}

export type AddedProductsType = ProductType & {
    count: number
}

export type OrderType = {
    id: number,
    date: string,
    products: AddedProductsType[],
    total: number
}
