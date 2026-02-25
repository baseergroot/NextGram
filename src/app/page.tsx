import Hero from "@/components/Hero";
import NavbarComponent from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavbarComponent profilePic="/defaultProfile.png" />
      <Hero />
    </div>
  );
}
