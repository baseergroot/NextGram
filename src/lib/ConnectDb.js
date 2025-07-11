import mongoose, { connect, connections } from "mongoose"

const ConnectDB = async () => {

  if(!process.env.MONGODB_URI) {
    console.log("please provide database url ")
    return
  }
  if(connections[0].readyState === 1) {
    console.log("db, already connected")
    return
  }
  try {
    await connect(process.env.MONGODB_URI)
    console.log("db connected successfully")
  } catch (error) {
    console.log("db error: ",error)
  }
}

export default ConnectDB