import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSave } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";


const BottomNavbar = () => {
    return (
        <nav className="lg:hidden absolute bottom-0 text-2xl w-full bg-gray-100 py-2 flex justify-between px-5 items-center">
            <GoHomeFill href="/feed"/>
            <IoSearch href="/search"/>
            <IoMdAdd href="/create" className="text-white bg-black rounded"/>
            <AiOutlineSave href="/save"/>
            <CgProfile href="/profile"/>
        </nav>
    )
}

export default BottomNavbar