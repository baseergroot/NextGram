import Image from "next/image";

const FeedContent = ({ file }) => {
  return (
    <section className=" max-h-8/10 flex max-w-full md:h-5/10 lg:h-5/10 items-center justify-center rounded">
      <Image
        src={file}
        alt="post image"
        width={100}
        height={100}
        className="h-full w-full object-contain bg-gray-100/70 rounded"
      />
    </section>
  );
};

export default FeedContent;
