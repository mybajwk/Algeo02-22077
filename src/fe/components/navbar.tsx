"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarMenuItem,
  Button,
  NavbarItem,
  cn,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
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

  const linkSearch = {
    label: "Search",
    href: "/search",
    active: pathName.startsWith("/search"),
    subLinks: [
      {
        label: "default",
        href: "/search",
      },
      {
        label: "camera",
        href: "/search/camera",
      },
    ],
  };
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
        className="shadow-lg shadow-indigo-800/30 bg-[#03001417] backdrop-blur-md py-2 px-0 phone:px-[16px] sm:px-[56px] lg:px-[122px] z-[800]"
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
            <NavbarItem key={item.label}>
              <p
                className={cn(
                  "cursor-pointer font-sans pb-2 hover:text-white relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-500 after:origin-left",
                  item.active
                    ? "text-white after:scale-x-100"
                    : "text-slate-500"
                )}
                onClick={() => {
                  setRedirect("yes");
                  setTimeout(() => {
                    router.push(item.href);
                    if (pathName === item.href) setRedirect("");
                  }, 1000);
                }}
              >
                {item.label}
              </p>
            </NavbarItem>
          ))}
          <Dropdown classNames={{ content: "bg-indigo-800/80 text-slate-400" }}>
            <DropdownTrigger>
              <p
                className={cn(
                  "cursor-pointer font-sans pb-2 hover:text-white relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-500 after:origin-left",
                  linkSearch.active
                    ? "text-white after:scale-x-100"
                    : "text-slate-500"
                )}
                // onClick={() => {
                //   setRedirect("yes");
                //   setTimeout(() => {
                //     router.push(item.href);
                //     if (pathName === item.href) setRedirect("");
                //   }, 1000);
                // }}
              >
                {linkSearch.label}
              </p>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Link Actions"
              itemClasses={{
                base: "data-[hover=true]:bg-blue-900/70 data-[hover=true]:text-white",
              }}
            >
              {linkSearch.subLinks.map((link) => (
                <DropdownItem key={link.href}>
                  <p
                    onClick={() => {
                      setRedirect("yes");
                      setTimeout(() => {
                        router.push(link.href);
                        if (pathName === link.href) setRedirect("");
                      }, 1000);
                    }}
                  >
                    {link.label}
                  </p>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
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
          <Link
            href="https://github.com/mybajwk/Algeo02-22077"
            className="text-white hover:text-slate-400"
            rel="noopener noreferrer"
            target="_blank"
          >
            <AiFillGithub size={30} />
          </Link>
        </NavbarContent>

        <NavbarMenu className="z-[800]">
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
