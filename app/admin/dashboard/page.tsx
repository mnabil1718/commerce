import { Crumb, PrivateNavbar } from "@/components/private/private-navbar";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { displayRupiah } from "@/utils/price";
import { ChartLine, Receipt, Star } from "lucide-react";

const crumbs: Crumb[] = [
  {
    label: "Dashboard",
    isPage: true,
  },
];

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Query Total Revenue (Sum of total_amount where payment is 'paid')
  const { data: revenueData } = await supabase
    .from("orders")
    .select("total_amount")
    .eq("payment_status", "paid");

  const totalRevenue =
    revenueData?.reduce((acc, curr) => acc + (curr.total_amount || 0), 0) || 0;

  // Query Total Orders Count
  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  // Top Selling Product
  // We fetch order_items and count which product_id appears most in 'paid' orders
  const { data: topProductData } = await supabase
    .from("order_items")
    .select(
      `
    quantity,
    products (title)
  `,
    )
    // Inner join with orders to ensure we only count 'paid' status
    // .textSearch('orders.payment_status', 'paid')
    .order("quantity", { ascending: false })
    .limit(1)
    .single();

  const bestSeller = topProductData?.products?.title || "No sales yet";

  return (
    <>
      <PrivateNavbar crumbs={crumbs} />
      <div className="grid grid-cols-3 gap-5 p-5">
        <header className="col-span-3 flex flex-col gap-2 items-start">
          <h1 className="font-bold text-2xl mb-4">Admin Dashboard</h1>
        </header>
        <Card className="col-span-3 lg:col-span-1">
          <CardContent className="flex flex-wrap justify-between gap-2">
            <div className="h-full">
              <h2 className="font-medium text-lg text-muted-foreground">
                Total Revenue
              </h2>
              <span className="font-bold tracking-tight text-3xl">
                {displayRupiah(totalRevenue)}
              </span>
            </div>
            <div className="flex-none w-16 aspect-square bg-muted/50 rounded-lg flex flex-col items-center justify-center">
              <ChartLine size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 lg:col-span-1">
          <CardContent className="flex flex-wrap justify-between gap-2">
            <div className="h-full">
              <h2 className="font-medium text-lg text-muted-foreground">
                Total Orders
              </h2>
              <span className="font-bold tracking-tight text-3xl">
                {totalOrders}
              </span>
            </div>
            <div className="flex-none w-16 aspect-square bg-muted/50 rounded-lg flex flex-col items-center justify-center">
              <Receipt size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 lg:col-span-1">
          <CardContent className="flex justify-between gap-2">
            <div className="shrink">
              <h2 className="font-medium text-lg text-muted-foreground">
                Top Selling
              </h2>
              <span className="font-medium tracking-tight min-w-0 text-2xl line-clamp-1">
                {bestSeller}
              </span>
            </div>
            <div className="flex-none w-16 aspect-square bg-muted/50 rounded-lg flex flex-col items-center justify-center">
              <Receipt size={32} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
