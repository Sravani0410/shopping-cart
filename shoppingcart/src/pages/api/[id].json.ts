import type { APIRoute } from "astro";
import type { Links } from "@/types/Links";

export const DELETE: APIRoute = async ({ params }) => {
  const id = params._id;

  try {
    const res = await fetch(`https://shopping-cart-backend-three.vercel.app/api/products/${id}`, {
      method: "DELETE",
    });
const response=await res.json()
console.log("delteres==>",res,response)


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
