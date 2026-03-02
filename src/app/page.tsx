import Hero from "@/components/share/Hero";
import NavbarComponent from "@/components/share/Navbar";
import loggedInUser from "@/helpers/getLoggedInUser";

export default async function Home() {
  const decode = await loggedInUser()
  return (
    <div className="h-[100svh]" >
      <NavbarComponent profilePic="/defaultProfile.png" decode={decode} />
      < Hero />
    </div>
  );
}
