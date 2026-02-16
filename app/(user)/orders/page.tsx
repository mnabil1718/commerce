import { MyOrderList } from "@/components/order/my-order-list";
import { getOrdersWithRelation } from "@/service/order.service";
import { OrderWithRelation } from "@/types/order.type";

async function getUsersOrders(): Promise<OrderWithRelation[]> {
  const { data: orders } = await getOrdersWithRelation();
  return orders;
}

export default async function MyOrdersPage() {
  const orders = await getUsersOrders();

  return (
    <div className="grid grid-cols-2 gap-5 p-5">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">My Orders</h2>
      </div>
      <div className="col-span-2 flex flex-col gap-5">
        <MyOrderList orders={orders} />
      </div>
    </div>
  );
}
