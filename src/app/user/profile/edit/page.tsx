import EditForm from "@/components/EditProfile";
import BottomNavbar from "@/components/BottomNavbar";
import NavbarComponent from "@/components/Navbar";
import ConnectDB from "@/lib/ConnectDb";
import loggedInUser, { Decode } from "@/lib/getLoggedInUser";
import User from "@/models/UserModel";
import { UserI } from "@/types/UserType";

await ConnectDB();

export default async function Page() {
  const decode: Decode = await loggedInUser();
  let user: UserI = await (User as any).findById(decode.id).select("-password");
  user = {
    username: user.username,
    name: user.name,
    profilePic: user.profilePic,
    _id: user._id.toString(),
  };

  return (
    <div className="min-h-screen">
      <NavbarComponent profilePic={user.profilePic} />
      <EditForm userDetail={user} />
      <BottomNavbar />
    </div>
  );
}
