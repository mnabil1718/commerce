import { MyShippingAddressList } from "@/components/shipping-address/my-shipping-address-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  return (
    <div className="grid grid-cols-2 gap-5 p-5">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Preferences</h2>
      </div>
      <div className="col-span-2 flex flex-col gap-5">
        <Tabs defaultValue="address" className="w-full">
          <TabsList variant={"line"}>
            <TabsTrigger value="address">Saved Addresses</TabsTrigger>
          </TabsList>
          <TabsContent value="address" className="flex flex-col gap-5">
            <MyShippingAddressList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
