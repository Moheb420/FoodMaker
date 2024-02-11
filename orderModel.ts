// import mongoose, { Schema, Document } from 'mongoose';

// // Define the Address interface
// interface Address {
//     street_name: string;
//     street_number: string;
//     city: string;
//     postal_code: string;
// }

// // Define the Delivery interface
// interface Delivery {
//     first_name: string;
//     last_name: string;
//     address: Address;
// }

// // Define the Order interface extending from Document
// interface Order extends Document {
//     material: string;
//     amount: number;
//     currency: string;
//     price: number;
//     delivery: Delivery;
//     timestamp: Date;
// }

// // Create a new Mongoose schema for Order
// const orderSchema = new Schema<Order>({
//     material: { type: String },
//     amount: { type: Number },
//     currency: { type: String },
//     price: { type: Number },
//     delivery: {
//         first_name: { type: String },
//         last_name: { type: String },
//         address: {
//             street_name: { type: String },
//             street_number: { type: String },
//             city: { type: String },
//             postal_code: { type: String }
//         }
//     },
//     timestamp: { type: Date }
// });

// // Create the Order model
// const OrderModel = mongoose.model<Order>('Order', orderSchema);

// export default OrderModel;
