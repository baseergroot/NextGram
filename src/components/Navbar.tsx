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

const NavbarComponent = () => {
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
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </DropdownHeader>
          <DropdownItem href="/search">Search</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        {/* <NavbarToggle className="hidden"/> */}
      </div>
      <NavbarCollapse className="absolute top-15 lg:relative lg:top-0 bg-white rounded shadow-2xl">
        <NavbarLink href="/feed" active>
          Feed
        </NavbarLink>
        <NavbarLink href="/profile">Profile</NavbarLink>
        <NavbarLink href="/search">Search</NavbarLink>
        <NavbarLink href="/saved">Saved</NavbarLink>
        <NavbarLink href="/">About</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavbarComponent;
