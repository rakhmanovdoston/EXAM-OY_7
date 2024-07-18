import { useEffect, useState } from "react";
import { api } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../store/productslice";
import { IoMdArrowDropdown } from "react-icons/io";
import { HighToLow } from "../../store/productslice";

import Line from "../../assets/Line 27.svg";

import Card from "../card/Card";

const base_url = import.meta.env.VITE_BASE_URL;

const Products = ({ cart, setCart }) => {
  const products = useSelector((store) => store.productsReducer.products);
  const dispatch = useDispatch();

  const [byPrice, setByPrice] = useState("");

  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState("");
  const [selectedColors, setSelectedColors] = useState("");

  const [clickOpenBrands, setClickOpenBrands] = useState(false);

  const toggleOpenedBrands = (setFunction, currentState) => {
    setFunction(!currentState);
  };

  useEffect(() => {
    async function fetchingBrands() {
      const response = await api.get("/brands");
      setBrands(response.data);
    }
    fetchingBrands();
  }, []);

  useEffect(() => {
    async function fetchingColors() {
      const response = await api.get(`/colors`);
      setColors(response.data);
    }
    fetchingColors();
  }, []);

  useEffect(() => {
    async function fetchingProducts() {
      setLoading(true);

      let query = `${base_url}/products`;

      const params = [];

      if (selectedColors) {
        params.push(`color_options_like=${encodeURIComponent(selectedColors)}`);
      }

      if (selectedBrands) {
        params.push(`brand_name=${encodeURIComponent(selectedBrands)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await api.get(`${query}`);
        setByPrice(response.data);
        dispatch(addProducts(response.data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchingProducts();
  }, [selectedBrands, selectedColors]);

  const sortProductsByPrice = [...products].sort((a, b) => {
    if (byPrice === "asc") {
      return a.price - b.price;
    } else if (byPrice === "desc") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <div className="">
      <div className="productsMain w-full h-[630px] -z-30">
        <article className="text-white flex flex-col gap-6 py-[215px] px-[180px]">
          <p className="hammer font-normal text-[20px]">
            / Start / Categories <br /> / Headphones and audio for gaming
          </p>
          <h1 className="hammer font-normal text-[46px]">
            Headphones AND AUDIO <br /> FOR GAMING
          </h1>
        </article>
      </div>
      <div className="w-full h-[85px] flex justify-between items-center px-[130px] bg-[#D5F8CF] text-[#0BA42D]">
        <h3>Filter By:</h3>
        <select
          className="bg-transparent outline-none"
          name="price"
          id=""
          value={byPrice}
          onChange={(e) => sortProductsByPrice(e.target.value)}
        >
          <option value="">All</option>
          <option value="asc">Price: High to Low</option>
          <option value="desc">Price: Low to High</option>
        </select>
      </div>
      <div className="mt-[80px] flex gap-[50px] container">
        <aside className="w-[250px] mx-[50px] my-[70px]">
          <img src={Line} alt="" />
          <div>
            <div
              className="w-full flex justify-between items-center cursor-pointer"
              onClick={() =>
                toggleOpenedBrands(setClickOpenBrands, clickOpenBrands)
              }
            >
              <h3 className="ml-[25px] m-[15px]">BRAND</h3>
              <IoMdArrowDropdown
                className={`transform transition-transform ${
                  clickOpenBrands ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {clickOpenBrands && (
              <ul className="w-[200px] m-auto">
                {brands.map((brand, index) => (
                  <li className="flex items-center" key={index}>
                    <input
                      type="checkbox"
                      value={brand}
                      name="brand"
                      id={brand}
                      checked={brand === selectedBrands}
                      onChange={(e) => setSelectedBrands(e.target.value)}
                      className="w-[20px] h-[20px] mt-[5px]"
                    />
                    <label htmlFor={brand} className="ml-[5px]">
                      {brand}
                    </label>
                  </li>
                ))}
                <button
                  className="w-[120px] h-[30px] rounded-md border-2 border-solid border-[#0BA42D] mt-[20px]"
                  onClick={() => setSelectedBrands("")}
                >
                  Reset
                </button>
              </ul>
            )}
            <img src={Line} alt="" className="my-2" />
          </div>
          <div>
            <h3 className="ml-[25px] m-[15px]">COLORS</h3>
            <ul className={" w-[200px] gap-1  flex flex-wrap m-auto"}>
              {colors.map((color, index) => (
                <li key={index}>
                  <div
                    style={{
                      border: "1px solid black",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      outline: selectedColors === color ? "3px solid red" : "",
                    }}
                    onClick={() => setSelectedColors(color)}
                  />
                </li>
              ))}
              <button
                className="w-[120px] h-[30px] rounded-md border-2 border-solid border-[#0BA42D] mt-[30px] mr-[80px]"
                onClick={() => setSelectedColors("")}
              >
                Reset
              </button>
            </ul>
          </div>
        </aside>
        <main className="w-[1250px] m-auto p-[50px]">
          {loading ? (
            <p>Loading...</p>
          ) : products.length ? (
            <div className="ul_container">
              {sortProductsByPrice.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  cart={cart}
                  setCart={setCart}
                />
              ))}
            </div>
          ) : (
            <p>No products</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
