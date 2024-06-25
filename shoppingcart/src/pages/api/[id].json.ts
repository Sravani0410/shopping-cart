import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;
  try {
    const res = await fetch(`https://shopping-cart-backend-three.vercel.app/api/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Error deleting link from external API");
    }
    const response = await res.json();
    console.log("delete response =>", response);
    return new Response(JSON.stringify({ message: "Link deleted successfully", success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error deleting link:", err);
    return new Response(JSON.stringify({ message: "Error deleting link", success: false }), {
      status: 500,
    });
  }
};
