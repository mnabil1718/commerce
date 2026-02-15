import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { MapPin, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useShippingAddressStore } from "@/providers/shipping-address.provider";
import { constructFullAddress } from "@/utils/address";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field";
import { AddShippingAddressDialog } from "./shipping-address-dialog";
import { Badge } from "../ui/badge";
import { useState } from "react";

export function SelectedShippingAddress() {
  const { getPrimary, addresses, selectedAddress, setSelected } =
    useShippingAddressStore((state) => state);
  const primary = getPrimary();
  const selected = selectedAddress || primary || addresses[0];
  const [selectedId, setSelectedId] = useState<string>(selected.id);

  if (addresses.length === 0) return null;

  const selectAddress = () => {
    setSelected(selectedId);
  };

  return (
    <Item variant={"outline"}>
      <ItemMedia variant="default">
        <MapPin />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1">{selected.label}</ItemTitle>
        <ItemDescription className="line-clamp-1 text-muted-foreground/80">
          {selected.phone}
        </ItemDescription>
        <ItemDescription className="line-clamp-2">
          {constructFullAddress(selected)}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Dialog>
          <DialogTrigger className="font-medium">Change</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Selected Address</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto space-y-3 px-5">
              <AddShippingAddressDialog>
                <Button variant={"outline"} className="w-full">
                  <Plus /> Add New Address
                </Button>
              </AddShippingAddressDialog>
              <RadioGroup
                defaultValue={selectedId}
                value={selectedId}
                onValueChange={setSelectedId}
              >
                {addresses.map((a) => {
                  return (
                    <FieldLabel key={a.id} htmlFor={a.id}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          {a.is_primary && (
                            <Badge variant={"outline"}>Primary</Badge>
                          )}
                          <FieldTitle>{a.label}</FieldTitle>
                          <span className="text-muted-foreground/80 font-normal">
                            {a.phone}
                          </span>
                          <FieldDescription className="line-clamp-1">
                            {constructFullAddress(a)}
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value={a.id} id={a.id} />
                      </Field>
                    </FieldLabel>
                  );
                })}
              </RadioGroup>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={selectAddress}>Select</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ItemActions>
    </Item>
  );
}
