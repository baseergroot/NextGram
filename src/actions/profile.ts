import ConnectDB from "@/lib/ConnectDb";
import loggedInUser, { Decode } from "@/lib/getLoggedInUser";
import User from "@/models/UserModel";


await ConnectDB()
const Profile = async () => {
  const decode: Decode = await loggedInUser()
  const user = await (User as any).findById(decode.id).select("-password -__v")
  return {
    user: {
      name: user.name,
      username: user.username,
      profilePic: user.profilePic,
    },
  }
}

export default Profile;