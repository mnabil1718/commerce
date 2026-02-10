import { Badge } from "./ui/badge";

export function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <Badge
        variant={"outline"}
        className="border-destructive rounded-full font-medium text-destructive text-xs"
      >
        Out of Stock
      </Badge>
    );
  }

  if (stock < 3) {
    return (
      <Badge
        variant={"outline"}
        className="border-primary rounded-full font-medium text-primary- text-xs"
      >
        Low Stock
      </Badge>
    );
  }

  return (
    <Badge
      variant={"outline"}
      className="rounded-full font-medium text-muted-foreground text-xs"
    >
      In Stock
    </Badge>
  );
}
