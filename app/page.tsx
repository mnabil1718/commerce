import { Hero } from "@/components/landing/hero";
import { PublicLayout } from "@/layouts/public";
import { CategoriesSection } from "@/components/landing/categories";
import { BestSellerSection } from "@/components/landing/best-seller";

export default function Home() {
  return (
    <PublicLayout>
      <div className="grid grid-cols-2 gap-5">
        <Hero />
        <CategoriesSection />
        <BestSellerSection />
      </div>
    </PublicLayout>
  );
}
