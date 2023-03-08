import dotenv from "dotenv";


dotenv.config();




export interface PaymentMethod {
    ID?: number,
    paymentMethodType: string
}
