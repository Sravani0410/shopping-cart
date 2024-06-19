import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
//   inStock: boolean;
};

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
//   const [inStock, setInStock] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try{
        console.log("gfhjk");
        const res = await fetch("http://localhost:8087/api/products");
        const data: Product[] = await res.json();
        console.log("data====>", data);
        setProducts(data);
    }
    catch(err){
        console.log(err)
    }
  };

  const addProduct = async () => {
    try{
        const res = await fetch("http://localhost:8087/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, description }),
          });
          console.log("res=======>", res);
          if (res.ok) fetchProducts();
    }
    catch(err){
        console.log(err)
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPrice(Number(e.target.value));
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
//   const handleInStockChange = (e: ChangeEvent<HTMLInputElement>) =>
//     setInStock(e.target.checked);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProduct();
  };
  console.log("product data", products);
  return (
    <>
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          placeholder="Price"
        />
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
        ></textarea>
        {/* <label>
          <input
            type="checkbox"
            checked={inStock}
            onChange={handleInStockChange}
          />
          In Stock
        </label> */}
        <button type="submit">Add Product</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
};

export default ProductManagement;
