import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";

const FeedDetails = () => {
  return (
    <section className=" h-[15%] flex flex-col gap-3 px-3">
      <p className="font-bold">watch my moves</p>
      <div className="flex gap-10 text-2xl">
        <div className="flex items-center gap-2">
          <FaRegHeart />
          <span className="text-[20px]">23</span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCommentDots className="" />
          <span className="text-[20px]">10</span>
        </div>
      </div>
    </section>
  );
};

export default FeedDetails;
