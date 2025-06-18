import Image from "next/image";

const FeedHeader = ({ name, username }) => {
  return (
    <section className=" h-[13%] flex items-center gap-5 px-3">
      <div>
        <Image src="logo.svg" alt="profile" width={40} height={40} />
      </div>
      <div className="leading-5">
        <h2 className="font-bold">{name}</h2>
        <h3 className="text-black/90">{username}</h3>
      </div>
    </section>
  );
};

export default FeedHeader;
