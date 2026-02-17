import Image from "next/image";
import Coffee from "../../public/matcha-latte.jpg";
import Icecream from "../../public/ice-cream.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSingleLatestProduct } from "@/service/product.service";
import { Product } from "@/types/product.type";

import { HeroBestSeller } from "./hero-best-seller";

async function getSingleBestSellerProduct(): Promise<Product> {
  const { data } = await getSingleLatestProduct();
  return data;
}

export async function Hero() {
  const featured = await getSingleBestSellerProduct();

  return (
    <div className="col-span-2 grid grid-cols-2 gap-5">
      <HeroBestSeller product={featured} />

      <Card className="col-span-2 md:col-span-1 overflow-hidden p-0">
        <CardContent className="relative flex flex-col w-full p-0 h-full overflow-hidden">
          <Image
            src={Coffee}
            alt="Matcha Ice Cream"
            placeholder="blur"
            className="col-span-2 w-full object-cover overflow-hidden"
          />
          <div className="bg-primary flex-1 flex flex-col items-start p-7">
            <div className="space-y-3 mb-7">
              <h1 className="text-3xl tracking-tight font-bold text-primary-foreground">
                Explore Our Coffee Collections
              </h1>
              <p className="text-primary-foreground">
                Discover rich flavors and handcrafted brews — coffee made for
                every mood.
              </p>
            </div>

            <Button className="mt-auto rounded-full bg-primary-foreground text-foreground hover:bg-primary-foreground/80 font-semibold group">
              Explore
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2 md:col-span-1 overflow-hidden p-0">
        <CardContent className="relative flex flex-col w-full p-0 h-full overflow-hidden">
          <Image
            src={Icecream}
            alt="Matcha Ice Cream"
            placeholder="blur"
            className="col-span-2 w-full object-cover overflow-hidden"
          />
          <div className="bg-secondary flex-1 flex flex-col items-start p-7">
            <div className="space-y-3 mb-7">
              <h1 className="text-3xl tracking-tight font-bold text-secondary-foreground">
                Ice cream & Desserts
              </h1>
              <p className="text-secondary-foreground">
                Creamy matcha delights — cool, smooth, and perfectly indulgent.
              </p>
            </div>

            <Button className="mt-auto rounded-full bg-secondary-foreground text-foreground dark:text-background hover:bg-secondary-foreground/80 font-semibold group">
              Explore
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
