import Image from "next/image";

const FeedHeader = ({ name, username, profilePic }) => {
  return (
    <section className=" h-[13%] flex items-center gap-5 px-3">
      <div>
        <Image src={profilePic} alt="profile" width={40} height={40}
        className="w-[50px] h-[50px] rounded-full object-cover"
        />
      </div>
      <div className="leading-5">
        <h2 className="font-bold">{name}</h2>
        <h3 className="text-black/90">{username}</h3>
      </div>
    </section>
  );
};

export default FeedHeader;


