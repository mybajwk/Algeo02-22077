"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarMenuItem,
  Button,
  Tabs,
  Tab,
  NavbarItem,
  cn,
} from "@nextui-org/react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const pathName = usePathname();
  const [redirect, setRedirect] = useState("");
  const router = useRouter();
  const links = [
    {
      label: "Home",
      href: "/",
      active: pathName === "/",
    },
    {
      label: "Search",
      href: "/search",
      active: pathName === "/search",
    },
    {
      label: "Description",
      href: "/desc",
      active: pathName === "/desc",
    },
    {
      label: "About",
      href: "/about",
      active: pathName === "/about",
    },
  ];
  useEffect(() => {
    setRedirect("");
  }, [pathName]);
  return (
    <>
      <div
        data-redirect={redirect}
        className="absolute w-full translate-x-[-100%] transition transform ease-in-out duration-[0.6s] data-[redirect=yes]:translate-x-0 h-full bg-[#2e2257] z-[900]"
      ></div>
      <NextUINavbar
        maxWidth="full"
        position="sticky"
        className="shadow-lg shadow-indigo-800/30 bg-[#03001417] backdrop-blur-md py-2 px-[122px] z-[800]"
      >
        <NavbarContent className="sm:flex hidden" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <Link className="flex justify-start items-center gap-1" href="/">
              <p className="font-bold text-inherit">VisuMatch</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="sm:flex hidden gap-5" justify="center">
          {links.map((item) => (
            <NavbarItem>
              <p
                className={cn(
                  "cursor-pointer font-sans pb-2 hover:text-white relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left",
                  item.active
                    ? "text-white after:scale-x-100"
                    : "text-slate-500"
                )}
                onClick={() => {
                  setRedirect("yes");
                  setTimeout(() => {
                    router.push(item.href);
                    if (pathName === item.href) setRedirect("")
                  }, 1000);
                }}
              >
                {item.label}
              </p>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent className="sm:hidden flex" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden flex" justify="center">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <Link className="flex justify-start items-center gap-1" href="/">
              <p className="font-bold text-inherit">VisuMatch</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="" justify="end">
          <Button className="rounded-full pt-1 pb-[5px] bg-gradient-to-br from-indigo-800 via-blue-800 via-30% to-blue-600 to-80%">
            Try It
          </Button>
        </NavbarContent>

        <NavbarMenu className="z-[990]">
          <div className="mx-4 mt-10 flex flex-col gap-2">
            {links.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link className="text-white" href={item.href}>
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
