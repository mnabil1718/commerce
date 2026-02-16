import z from "zod";

export const ShippingAddressFormSchema = z.object({
    full_name: z.string().min(1, "Name cannot be empty").max(75, "Name cannot exceeds 75 characters"),
    label: z.string().min(1, "Label cannot be empty"),
    phone: z.string().min(1, "Phone cannot be empty"),
    address_line1: z.string().min(1, "Street name cannot be empty").max(350),
    address_line2: z.string().optional(),
    city: z.string().min(1, "City cannot be empty"),
    state: z.string().min(1, "State/Province cannot be empty"),
    postal_code: z.string().min(1, "Postal code cannot be empty"),
    country: z.string().min(1, "Country cannot be empty"),
    is_primary: z.boolean(),
});