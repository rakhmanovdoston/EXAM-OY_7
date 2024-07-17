import { GiCheckMark } from "react-icons/gi";

const Home = () => {
  return (
    <main className="main w-full h-[745px] -z-30">
      <div className=" text-white pt-[200px] ml-[220px]">
        <article>
          <h1 className="hammer font-normal text-[60px] bg-gradient-to-r from-[white] to-[#14FF00] text-transparent bg-clip-text inline-block">
            START YOUR GAME <br /> WITH THE BEST
          </h1>
          <p className="readex font-normal text-[18px]">
            We've Got Everything <br /> You Need for Gaming Supremacy
          </p>
        </article>
        <button className="w-[295px] h-[60px] bg-[#21D511] rounded-xl Inter font-bold text-xl my-5">
          Shop
        </button>
        <div className="hammer text-[22px]">
          <article className="flex items-center gap-5">
            <GiCheckMark />
            <h3 className="">
              MORE THAN <span className="text-[#0BA42D]"> 15+</span> POPULAR{" "}
              <br /> PROFESSIONAL <br />
              <span className="text-[#0BA42D]">BRANDS</span>
            </h3>
          </article>
          <article className="flex items-center gap-5 my-4">
            <GiCheckMark />

            <h3 className="">
              <span className="text-[#0BA42D]">2500+</span> ITEMS
            </h3>
          </article>
        </div>
      </div>
    </main>
  );
};

export default Home;
