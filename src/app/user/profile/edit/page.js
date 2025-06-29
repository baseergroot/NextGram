"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Edit = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    axios.get("/api/user/profile")
    .then(res => {
      setName(res.data.user.name)
      setUsername(res.data.user.username)
    })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    console.log("selectedFile:", selectedFile)
    const formdata = new FormData()
    formdata.append("file", selectedFile)
    // formdata.append("name", name)
    // formdata.append("username", username)
    formdata.append("upload_preset", "nextgram")
    console.log(formdata)
    axios.post(process.env.NEXT_PUBLIC_CLOUDNARY_IMAGE_URL, formdata)
    .then(res => {
      console.log(res.data.secure_url)
      axios.patch("/api/user/profile/edit", {file: res.data.secure_url, name, username})
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file"
        onChange={event => setSelectedFile(event.target.files[0])} />
        <input type="text" value={name}  name='name' onChange={e => setName(e.target.value)}/>
        <input type="text" value={username} name='username' onChange={e => setUsername(e.target.value)}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Edit