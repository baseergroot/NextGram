import { Profile } from "@/actions/profile";
import ProfileComponent from "@/components/ProfileComponent";

export const metadata = {
  title: "User Profile",
  description: "NextGram profile route, page",
};

export default async function ProfilePage() {
  const response = await Profile()
  
  return <ProfileComponent response={response} />
}