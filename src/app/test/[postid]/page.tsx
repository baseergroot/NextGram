// "use client"
import { PostParam } from "@/actions/postParam"
// import { useParams } from "next/navigation"
// import { useEffect } from "react"

export default async function Page() {
  // const {postid} = useParams()
  // useEffect(() => {
  //   const fetchData = async () => {
      const response = await PostParam("687885b3e6084d44b0c201c4")
      console.log(response)
    // }
    // fetchData()
  // })
  return (
    <>
    <h1>
      hello
    </h1>
    </>
  )
}

//  687885b3e6084d44b0c201c4
