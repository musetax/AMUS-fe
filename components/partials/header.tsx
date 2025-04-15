"use client";
import Image from "next/image";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { MdClose } from "react-icons/md";
import { MenuIcon } from "lucide-react";
import Logo from "public/images/logo/main-logo.svg";
const HeaderBar: React.FC<any> = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <div className="w-full py-3 bg-lightGray">
        <div className="px-4 xl:px-20 container-custom">
          <Navbar
            onMenuOpenChange={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            classNames={{
              base: "bg-transparent backdrop-blur-none relative custom-backdrop-saturate",
              wrapper: "w-full max-w-full px-0",
              item: ` font-normal text-base text-black dropdown-menu`,
              menuItem: ``,
            }}
          >
            {/* Brand and toggle */}
            <NavbarBrand>
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Paragon Gents"
                  width={280}
                  height={30}
                  className="w-[120px] min-w-[120px] dark:hidden"
                />
              </Link>
            </NavbarBrand>

            <NavbarContent className="lg:hidden" justify="end">
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="text-white text-2xl"
                icon={isMenuOpen ? <MdClose /> : <MenuIcon />}
              />
            </NavbarContent>

            {/* Desktop menu */}
            <NavbarContent className="hidden lg:flex gap-5 " justify="center">
              <NavbarItem>
                <Link href="#">Dashboard</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="#">Financial Goals</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="#">Settings</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="#">Support</Link>
              </NavbarItem>
            </NavbarContent>

            {/* Mobile menu content */}
            <NavbarMenu className="bg-primaryColor pt-10 gap-5">
              <NavbarMenuItem>
                <Link href="#">Dashboard</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="#">Financial Goals</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="#">Settings</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="#">Support</Link>
              </NavbarMenuItem>
            </NavbarMenu>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
