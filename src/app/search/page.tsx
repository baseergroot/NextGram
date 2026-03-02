import BottomNavbar from "@/components/share/BottomNavbar";
import SearchComponent from "@/components/search/Search";

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
