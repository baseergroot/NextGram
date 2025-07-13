import BottomNavbar from "@/components/BottomNavbar";
import SearchComponent from "@/components/Search";

export const metadata = {
  title: "NextGram | Search",
  description: "NextGram search route, page"
};

export default function SearchPage() {

  return (
    <>
      <SearchComponent />
      <BottomNavbar />
    </>
  );
}
