import Hero from "@/components/Hero";
import NavbarComponent from "@/components/Navbar";

export default function Home() {
  return (
    <div className="h-[100svh]">
      <NavbarComponent />
      <Hero />
    </div>
  );
}
