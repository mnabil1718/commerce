import { Product } from "@/types/product.type";

export const products: Product[] = [
    {
        id: 1,
        stock: 10,
        price: 57000,
        image: "/products/teh-poci.jpg",
        created_at: "2026-01-20",
        title: "Signature Teh Poci Original",
        description: "Authentic Teh Poci with a timeless, bold aroma — classic Indonesian tea in every sip.",
        slug: "signature-teh-poci-original",
    },
    {
        id: 2,
        stock: 0,
        price: 125000,
        image: "/products/matcha-latte.jpg",
        created_at: "2026-01-20",
        title: "Overpriced Japanese Matcha Latte",
        description: "Smooth ceremonial-grade matcha blended with fresh milk for a creamy, earthy latte experience.",
        slug: "matcha-latte",
    },

    {
        id: 3,
        stock: 25,
        price: 89000,
        image: "/products/powder.jpg",
        created_at: "2026-01-22",
        title: "Premium Matcha Green Tea Powder",
        description: "Stone-ground Japanese matcha with a vibrant green color and balanced umami bitterness.",
        slug: "premium-matcha-green-tea",
    },

    {
        id: 4,
        stock: 12,
        price: 68000,
        image: "/products/float.jpg",
        created_at: "2026-01-22",
        title: "Creamy Matcha Ice Cream Float",
        description: "Rich and silky matcha ice cream made with real green tea for a refreshing dessert.",
        slug: "creamy-matcha-ice-cream-float",
    },

    {
        id: 5,
        stock: 1,
        price: 99000,
        image: "/products/expresso.jpg",
        created_at: "2026-01-23",
        title: "Matcha Espresso Fusion Latte",
        description: "A bold fusion of earthy matcha and espresso — smooth caffeine with a modern twist.",
        slug: "matcha-espresso-fusion-latte",
    },

    {
        id: 6,
        stock: 8,
        price: 185000,
        image: "/products/yerba-matte.jpg",
        created_at: "2026-01-23",
        title: "Original Argentinian Yerba Matte",
        description: "High-grade ceremonial matcha sourced from Japan, perfect for traditional preparation.",
        slug: "yerba-matte",
    }
];
