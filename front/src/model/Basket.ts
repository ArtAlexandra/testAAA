export interface Basket{
    id_b: number;
    userId: number;
    goodsId: number;
    quantity: number;
    description: string;
    payment: boolean;
    discount: number;
    createdAt: string;
    updatedAt: string;
    user: {
            id: number;
            username: string;
            password: string;
            balance: number;
            phone: string;
            email: string;
            createdAt: string;
            updatedAt: string;
        },
    goods: {
            id_g: number;
            title: string;
            price: number;
            article: string;
            quantity: number;
            description: string;
            mark: number;
            composition: string;
            state: string;
            firstImage: string;
            typeId: number;
            shopId: number;
            createdAt: string;
            updatedAt: string;
        
        }
}