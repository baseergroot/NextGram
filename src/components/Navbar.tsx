"use client"
import axios from "axios";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavbarComponent = ({ profilePic }) => {
  const router = useRouter()
  return (
    <Navbar fluid rounded className="px-5">
      <NavbarBrand href="/logo.svg">
        {/* <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">NextGram</span>
      </NavbarBrand>
      <div className="flex md:order-2 gap-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            // <Avatar alt="User settings" img={profilePic} rounded className="object-cover w-[50px] h-[50px] rounded-full"/>
            <Image alt="User settings" src={profilePic || "/defaultProfile.png"} width={50} height={50} className="object-cover w-[45px] h-[45px] rounded-full" />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </DropdownHeader>
          <DropdownItem href="/search">Search</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => {
            axios.get("/api/auth/logout")
              .then(() => router.push("/"))
          }}>
            Sign out</DropdownItem>
        </Dropdown>
        {/* <NavbarToggle className="hidden"/> */}
      </div>
      <NavbarCollapse className="absolute top-15 md:hidden lg:block lg:relative lg:top-0 bg-white rounded shadow-2xl">
        <NavbarLink href="/" active>Home</NavbarLink>
        <NavbarLink href="/feed">
          Feed
        </NavbarLink>
        
        <NavbarLink href="/user/profile">Profile</NavbarLink>
        <NavbarLink href="/post/search">Search</NavbarLink>
        <NavbarLink href="/user/saved">Saved</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavbarComponent;
