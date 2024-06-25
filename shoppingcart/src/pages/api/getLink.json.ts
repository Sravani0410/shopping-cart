import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    try {
        const endpoint = id
            ? `https://shopping-cart-backend-three.vercel.app/api/products/${id}`
            : "https://shopping-cart-backend-three.vercel.app/api/products";

        const res = await fetch(endpoint, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!res.ok) throw new Error("There was a problem with the DB connection");

        const dbRes = await res.json();
        if (id && dbRes.id || !id && dbRes.length) {
            return new Response(JSON.stringify({ data: dbRes, success: true }), { status: 200 });
        } else {
            throw new Error("Problem with DB response");
        }
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({ message: err, success: false }), { status: 404 });
    }
};
