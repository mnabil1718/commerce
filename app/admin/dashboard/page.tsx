import { Crumb, PrivateNavbar } from "@/components/private/private-navbar";

const crumbs: Crumb[] = [
  {
    label: "Dashboard",
    isPage: true,
  },
];

export default function AdminDashboardPage() {
  return (
    <>
      <PrivateNavbar crumbs={crumbs} />
      <div className="grid grid-cols-2 gap-5 p-5">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-2xl mb-4">Admin Dashboard</h2>
        </div>
      </div>
    </>
  );
}
