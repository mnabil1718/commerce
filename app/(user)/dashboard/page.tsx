import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { MyOrderList } from "@/components/order/my-order-list";

import { createClient } from "@/lib/supabase/server";
import { getOrdersWithRelation } from "@/service/order.service";
import { getUserFavoriteAsServiceRole } from "@/service/product.service";
import { OrderWithRelation } from "@/types/order.type";

async function getUsersOrders(limit?: number): Promise<OrderWithRelation[]> {
  const { data: orders } = await getOrdersWithRelation(limit);
  return orders;
}

async function getFavourite() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  return getUserFavoriteAsServiceRole(user?.id || "0");
}

export default async function DashboardPage() {
  const orders = await getUsersOrders();
  const product = await getFavourite();

  return (
    <div className="grid grid-cols-2 gap-5">
      <DashboardHero product={product} orders={orders} />

      <div className="col-span-2 grid grid-cols-1 gap-5">
        <MyOrderList orders={orders} />
      </div>
    </div>
  );
}
