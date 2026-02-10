import Link from "next/link";

export function Brand() {
  return (
    <Link href={"/"}>
      <div className="text-2xl font-semibold tracking-tighter">
        matt<span className="text-primary">é</span>
      </div>
    </Link>
  );
}
