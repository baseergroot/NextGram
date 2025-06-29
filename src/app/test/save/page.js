"use client"
import axios from 'axios'

const Save = () => {
  const save = () => {
    axios.post("/api/post/save", {postId: "6856ea43ef1294cd244b6139"})
    .then(res => console.log(res.data))
  }
  return (
    <div>
    <button onClick={save}>Save</button>
    </div>
  )
}

export default Save