import Image from "next/image"


const FeedContent = () => {
  return (
    <section className=" h-7/10 flex items-center justify-center">
              <Image src="/post1.jpeg" alt="post image" width={100} height={100}  className="w-full object-contain"/>
              </section>
  )
}

export default FeedContent