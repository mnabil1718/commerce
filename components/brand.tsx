import Link from "next/link";

export function Brand() {
  return (
    <Link href={"/"} className="flex items-center py-2">
      <div className="text-2xl font-semibold tracking-tighter">
        <span className="hidden group-data-[state=collapsed]:block text-primary">
          é
        </span>

        <span className="block group-data-[state=collapsed]:hidden">
          matt<span className="text-primary">é</span>
        </span>
      </div>
    </Link>
  );
}
