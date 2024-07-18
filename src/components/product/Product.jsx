import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import line from "../../assets/Line 27 (1).svg";
import { FaCartShopping } from "react-icons/fa6";
import like from "../../assets/Frame 246.svg";
import schoolBusIcon from "../../assets/fi-rs-school-bus.svg";
import boxIcon from "../../assets/fi-rs-box-alt.svg";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    async function fetchProductId() {
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data);
    }

    fetchProductId();
  }, [productId]);

  return (
    <div className="flex justify-around mb-5">
      <div className="w-[700px] h-[700px] flex flex-col gap-10">
        {product && (
          <>
            <p>
              Products / Gaming Headsets & Audio /
              {product && <span className="font-bold">{product.name}</span>}
            </p>
            <img
              className="w-[600px] h-[600px]"
              src={product.image_url}
              alt=""
            />
          </>
        )}
      </div>
      <aside>
        {product && (
          <>
            <h1 className="hammer font-normal text-[48px]">{product.name}</h1>
            <p className="readex font-medium text-[18px]">
              {product.description}
            </p>
            <div className="my-3 flex items-center gap-1">
              {product && (
                <div>{"⭐️".repeat(Math.round(product.ratings_stars))}</div>
              )}
              <small>({product.rating_counts})</small>
            </div>
            <img className="my-3" src={line} alt="" />
            <p className="readex font-bold text-[36px]">
              {`$${product.price}`}or 99.99/month
            </p>
          </>
        )}
        <p className="readex font-medium text-[18px]">
          Suggested payments with 6 month special financing
        </p>
        <img className="my-3" src={line} alt="" />
        <p className="readex font-semibold text-[24px]">Choose a color</p>
        <div className="flex gap-2 my-4">
          {product &&
            product.color_options.map((color, index) => (
              <div
                key={index}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid black",
                  background: color,
                }}
                className=""
              />
            ))}
        </div>
        <img className="my-8" src={line} alt="" />
        <div className="w-[412px] flex gap-16 items-center">
          <button className="w-[193px] h-[70px] border-[3px] border-[#0BA42D] rounded-[40px] font-semibold Inter text-[26px] text-center">
            - <span className="mx-8">1</span> +
          </button>
          <p className="Inter font-semibold text-[18px]">
            Only <span className="text-[#0BA42D]">16 items</span> left! Don’t
            miss it
          </p>
        </div>
        <div className="flex gap-4 items-center my-10">
          <button className="w-[442px] h-[60px] bg-[#0BA42D] text-white flex justify-center items-center gap-2 rounded-[10px]">
            <FaCartShopping />
            Add To Cart
          </button>
          <img src={like} alt="" />
        </div>
        <div className="w-[523px] h-[185px] border-2 border-dashed border-[#6A6969] rounded-[10px]">
          <section className="flex gap-5 items-center pl-10">
            <img className="my-8" src={schoolBusIcon} alt="" />
            <article>
              <b className="readex text-[18px]">Free delivery</b>
              <p className="Inter font-semibold text-[16px] underline">
                Enter your Postal Code for Delivery Availability
              </p>
            </article>
          </section>
          <img src={line} alt="" />
          <section className="flex gap-5 items-center pl-10 pt-5">
            <img src={boxIcon} alt="" />
            <article>
              <b className="readex text-[18px]">Return Delivery</b>
              <p className="Inter font-semibold text-[16px] underline">
                Free delivery 30 Days return
              </p>
            </article>
          </section>
        </div>
      </aside>
    </div>
  );
};

export default Product;
