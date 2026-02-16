import { EmptyOrders } from "@/components/empty-orders";
import { Button } from "@/components/ui/button";
import { getOrders } from "@/service/order.service";
import { Order } from "@/types/order.type";
import Link from "next/link";

async function getUsersOrders(): Promise<Order[]> {
  const { data: orders } = await getOrders();
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
        {orders.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center min-h-72 gap-5">
            <EmptyOrders />
            <span className="text-muted-foreground">You have no orders</span>
            <Link href="/products">
              <Button className="font-medium rounded-full">
                Choose your drinks
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
