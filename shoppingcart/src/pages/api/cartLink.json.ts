import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        const { productId, quantity } = await request.json();

        const res = await fetch("https://shopping-cart-backend-three.vercel.app/api/cart", {
             method: "POST", 
             headers: { 
                "Content-Type": "application/json" 
             },
             body: JSON.stringify({ productId, quantity }),
        });

        if (!res.ok) throw new Error("There was a problem with the DB connection");

        const dbRes = await res.json();
        const data = Array.isArray(dbRes.items) ? dbRes.items : [];

        return new Response(JSON.stringify({ data, success: true }), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({ message: err, success: false }), { status: 404 });
    }
};
