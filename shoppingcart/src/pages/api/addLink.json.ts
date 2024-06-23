import type { APIRoute } from "astro";
import type { Links } from "@/types/Links";

export const POST: APIRoute = async ({ request }) => {
  const data: Links = await request.json();

  try {
    const res = await fetch("https://shopping-cart-backend-three.vercel.app/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error adding link");
    }

    const dbRes = await res.json();
    if (dbRes._id) {
      return new Response(JSON.stringify({ message: "Link added successfully", success: true }), {
        status: 200,
      });
    } else {
      throw new Error("Error adding link");
    }
  } catch (err) {
    console.error("Error adding link:", err);
    return new Response(JSON.stringify({ message: "Error adding link", success: false }), {
      status: 500,
    });
  }
};
