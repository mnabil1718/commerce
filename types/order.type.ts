import { Tables } from "@/database.types";

export type OrderItem = Tables<"order_items">;

export type OrderAddress = Tables<"order_addresses">;

export type Order = Tables<"orders">;


export type CreateOrderItem = Omit<OrderItem, "id"| "order_id">;

export type OrderWithRelation = Order & {
  order_items: OrderItem[];
  order_addresses: OrderAddress[];
};


export type OrderStatus = "unfulfilled" | "request cancellation" | "cancelled" | "shipping" | "completed";
export type OrderPaymentStatus = "waiting payment" | "pending" | "paid" | "failed";