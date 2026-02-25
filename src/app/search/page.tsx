import BottomNavbar from "@/components/BottomNavbar";
import NavbarComponent from "@/components/Navbar";
import SearchComponent from "@/components/Search";

export const metadata = {
  title: "NextGram | Search",
  description: "NextGram search route, page",
};

export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <NavbarComponent />
      <SearchComponent />
      <BottomNavbar />
    </div>
  );
}
