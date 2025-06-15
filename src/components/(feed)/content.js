import Image from "next/image";

const FeedContent = ({ file }) => {
  return (
    <section className=" h-8/10 flex items-center justify-center">
      <Image
        src={file}
        alt="post image"
        width={100}
        height={100}
        className="h-full w-full object-contain bg-amber-100"
      />
    </section>
  );
};

export default FeedContent;
