import Image from "next/image";

const categories = [
  {
    image: "/categories/matcha.jpg",
    label: "Original Matcha",
  },
  {
    image: "/categories/latte.jpg",
    label: "Coffee",
  },
  {
    image: "/categories/ice-cream.jpg",
    label: "Ice Creams & Desserts",
  },
  {
    image: "/categories/green-tea.jpg",
    label: "Green Tea",
  },
];

export function CategoriesSection() {
  return (
    <section id="categories" className="col-span-2">
      <h2 className="text-2xl font-bol tracking-tight font-medium mb-5">
        Explore Categories
      </h2>
      <ul className="grid grid-cols-4 gap-5">
        {categories.map((c, i) => {
          return (
            <li key={i} className="col-span-2 md:col-span-1">
              {" "}
              <div className="flex flex-col items-center gap-3 p-5 hover:bg-secondary/10 rounded-xl cursor-pointer">
                <div className="relative bg-transparent w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.label}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>{" "}
                <span>{c.label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
