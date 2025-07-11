import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSave } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

const BottomNavbar = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 text-2xl w-full bg-gray-100 py-2 flex justify-between px-5 items-center">
      <Link href="/feed">
        <GoHomeFill />
      </Link>
      <Link href="/search">
        <IoSearch />
      </Link>
      <Link href="/post/create">
        <IoMdAdd href="/create" className="text-white bg-black rounded" />
      </Link>
      <Link href="/user/save">
        <AiOutlineSave />
      </Link>
      <Link href="/user/profile">
        <CgProfile />
      </Link>
    </nav>
  );
};

export default BottomNavbar;
