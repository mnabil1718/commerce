import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { useShippingAddressStore } from "@/providers/shipping-address.provider";
import { constructFullAddress } from "@/utils/address";

export function SelectedShippingAddress() {
  const getPrimary = useShippingAddressStore((state) => state.getPrimary);

  const primary = getPrimary();

  if (!primary) return null;

  return (
    <Item variant={"outline"}>
      <ItemMedia variant="default">
        <MapPin />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1">{primary.label}</ItemTitle>
        <ItemDescription className="line-clamp-2">
          {constructFullAddress(primary)}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant={"ghost"}>Change</Button>
      </ItemActions>
    </Item>
  );
}
