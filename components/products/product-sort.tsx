"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "newest";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", e.target.value);

    router.replace(`/products?${params.toString()}`);
  }

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      className="text-sm bg-transparent font-medium outline-none"
    >
      <option value="a-z">A-Z</option>
      <option value="oldest">Oldest</option>
      <option value="newest">Newest</option>
    </select>
  );
}
