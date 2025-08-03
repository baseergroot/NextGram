"use client"
import { isLoggedinAction } from "@/actions/isLoggedin";
import { Logout } from "@/actions/logout";
import loggedInUser from "@/lib/getLoggedInUser";
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
import { useEffect, useState } from "react";

const NavbarComponent = ({ profilePic }) => {
  const [isLoggedin, setIsloggedin] = useState<boolean>(false)
  const [user, setUser] = useState<{name: string, username: string} | null>()
  const router = useRouter()
  useEffect(() => {
    async function Fetch() {
      const response:boolean = await isLoggedinAction()
      console.log( response )
      response ? setIsloggedin(true) : setIsloggedin(false)
      const decode = await loggedInUser()
      setUser({name: decode.name, username: decode.username})
    }
    Fetch()
  },[])
  return (
    <Navbar rounded fluid className="px-5 shadow sticky top-0 z-50">
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
            <Image alt="User settings" src={!profilePic ? "/defaultProfile.png" : profilePic} width={50} height={50} className="object-cover w-[45px] h-[45px] rounded-full" />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user ? user.name : "Loading..."}</span>
            <span className="block truncate text-sm font-medium">@{user ? user.username : "Loading..."}</span>
          </DropdownHeader>
          <DropdownItem href="/search">Search</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownDivider />
          {
          isLoggedin ? 
          <DropdownItem onClick={ async () => {
            const response = await Logout()
              if (response)  {
                setIsloggedin(false)
                router.push("/")
              }
          }}>
            Sign out</DropdownItem> : 
            <DropdownItem onClick={() => router.push("/login")}>
            Sign in</DropdownItem>
          }
          
          
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
