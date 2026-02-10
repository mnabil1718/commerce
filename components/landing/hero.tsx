import Image from "next/image";
import BannerImage from "../../public/teh-poci.jpg";
import Coffee from "../../public/matcha-latte.jpg";
import Icecream from "../../public/ice-cream.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="col-span-2 grid grid-cols-2 gap-5">
      <Card className="col-span-2 overflow-hidden">
        <CardContent className="relative grid grid-cols-2 gap-0 p-0 overflow-hidden">
          <div className="col-span-2 md:col-span-1 p-7 space-y-5">
            <Badge
              variant={"outline"}
              className="rounded-full flex gap-1 items-center w-fit"
            >
              <Star size={12} /> Best Seller
            </Badge>
            <div>
              <h1 className="text-3xl tracking-tight font-bold mb-3">
                Signature Teh Poci Original
              </h1>
              <p>
                Authentic Teh Poci with a timeless, bold aroma — classic
                Indonesian tea in every sip.
              </p>
            </div>
            <h2 className="font-semibold text-3xl tracking-tight text-primary">
              Rp 57.000
            </h2>

            <Button className="rounded-full">Order Now</Button>
          </div>
          <Image
            src={BannerImage}
            alt="Signature Teh Poci"
            placeholder="blur"
            className="order-first md:order-last col-span-2 md:col-span-1 w-full h-full object-cover overflow-hidden"
          />
        </CardContent>
      </Card>

      <Card className="col-span-2 md:col-span-1 overflow-hidden">
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

      <Card className="col-span-2 md:col-span-1 overflow-hidden">
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

            <Button className="mt-auto rounded-full bg-secondary-foreground text-foreground hover:bg-secondary-foreground/80 font-semibold group">
              Explore
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
