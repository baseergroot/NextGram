import FeedContent from "@/components/(feed)/content";
import FeedDetails from "@/components/(feed)/details";
import FeedHeader from "@/components/(feed)/header";
import BottomNavbar from "@/components/BottomNavbar"
import NavbarComponent from "@/components/Navbar"

const Feed = () => {
    return (
        <div>
        <NavbarComponent />
            <main className="aspect-6/8 ">
              <FeedHeader />
              <FeedContent />
              <FeedDetails  />
            </main>
        <BottomNavbar />
        </div>
    )
}

export default Feed