import { getProductCategories } from "@/service/category.service";
import { Category } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";

async function getCategories(): Promise<Category[]> {
  const { data: categories } = await getProductCategories();
  return categories;
}

export async function CategoriesSection() {
  const categories = await getCategories();

  return (
    <section id="categories" className="col-span-2">
      <h2 className="text-2xl font-bol tracking-tight font-medium mb-5">
        Explore Categories
      </h2>
      <ul className="grid grid-cols-4 gap-5">
        {categories.map((c, i) => {
          return (
            <Link
              key={i}
              href={`/products?category=${c.id}`}
              className="col-span-2 md:col-span-1"
            >
              <li className="w-full">
                {" "}
                <div className="flex flex-col items-center gap-3 p-5 hover:bg-secondary/10 rounded-xl cursor-pointer">
                  <div className="relative bg-secondary/20 w-16 h-16 rounded-full overflow-hidden">
                    {c.image && (
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>{" "}
                  <span>{c.title}</span>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
