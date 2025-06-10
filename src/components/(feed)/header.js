import Image from "next/image"

const  FeedHeader = () => {
  return (
    <section className=" h-[15%] flex items-center gap-4 px-3">
                    <div>
                        <Image src="logo.svg" alt="profile" width={40} height={40}/>
                    </div>
                    <div className="leading-4">
                        <h2 className="font-bold">Alex</h2>
                        <h3 className="text-black/90">alex_kha</h3>
                    </div>
                  </section>
  )
}

export default FeedHeader