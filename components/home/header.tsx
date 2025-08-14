"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ThemeSwitch } from "../theme-switch";
import SearchWithBlur from "./SearchWithBlur";
import Link from "next/link";
export default function Header() {
  return (
    <header className="px-6 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-black tracking-wide flex flex-col text-xl text-foreground"
        >
          <p> PORTFOLIO </p>
          <p className="-mt-2">
            MR<span className="text-secondary">.</span>SOFT{" "}
          </p>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground cursor-pointer transition-colors font-poppins">
              <span>Servicios</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#2E2E2E] dark:bg-[#1a1a1a] text-white border-none p-2 rounded-lg shadow-lg before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-transparent">
              <Link
                href={{
                  pathname: "/servicios",
                  query: { s: "desarrollo" },
                }}
              >
                <DropdownMenuItem className="cursor-pointer focus:text-terciary focus:bg-[#333] dark:hover:bg-[#444] dark:focus:text-white">
                  Desarrollo a medida
                </DropdownMenuItem>
              </Link>
              <Link
                href={{
                  pathname: "/servicios",
                  query: { s: "paginas" },
                }}
              >
                <DropdownMenuItem className="cursor-pointer focus:text-terciary focus:bg-[#333] dark:hover:bg-[#444] dark:focus:text-white">
                  Páginas web
                </DropdownMenuItem>
              </Link>
              <Link
                href={{
                  pathname: "/servicios",
                  query: { s: "ecommerce" },
                }}
              >
                <DropdownMenuItem className="cursor-pointer focus:text-terciary focus:bg-[#333] dark:hover:bg-[#444] dark:focus:text-white">
                  E-commerce
                </DropdownMenuItem>
              </Link>
              {/* <DropdownMenuItem className="focus:text-terciary focus:bg-[#333] dark:hover:bg-[#444] dark:focus:text-white">
                Otros
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="/productos"
            className="text-foreground hover:text-secondary transition-colors font-poppins cursor-pointer"
          >
            Productos
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <SearchWithBlur />
          <ThemeSwitch />
          {/* Mobile menu button with options */}
          <div className="md:hidden relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-foreground hover:text-secondary transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-[#2E2E2E] dark:bg-[#1a1a1a] text-white border-none p-2 rounded-lg shadow-lg">
                {/* Submenú Servicios */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="focus:text-terciary focus:bg-[#333] dark:hover:bg-[#444]">
                    Servicios
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-[#2E2E2E] dark:bg-[#1a1a1a] text-white border-none p-2 rounded-lg shadow-lg">
                    <Link
                      href={{
                        pathname: "/servicios",
                        query: { s: "desarrollo" },
                      }}
                    >
                      <DropdownMenuItem className="focus:text-terciary focus:bg-[#333] dark:hover:bg-[#444] dark:focus:text-white">
                        Desarrollo a medida
                      </DropdownMenuItem>
                    </Link>

                    <Link
                      href={{
                        pathname: "/servicios",
                        query: { s: "paginas" },
                      }}
                    >
                      <DropdownMenuItem className="focus:text-terciary focus:bg-[#333] dark:hover:bg-[#444] dark:focus:text-white">
                        Páginas web
                      </DropdownMenuItem>
                    </Link>

                    <Link
                      href={{
                        pathname: "/servicios",
                        query: { s: "ecommerce" },
                      }}
                    >
                      <DropdownMenuItem className="focus:text-terciary focus:bg-[#333] dark:hover:bg-[#444] dark:focus:text-white">
                        E-commerce
                      </DropdownMenuItem>
                    </Link>

                    {/* <Link href="/servicios?s=otros">
                      <DropdownMenuItem className="focus:text-terciary focus:bg-[#333] dark:hover:bg-[#444] dark:focus:text-white">
                        Otros
                      </DropdownMenuItem>
                    </Link> */}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Otro ítem simple */}
                <DropdownMenuItem className="focus:text-terciary focus:bg-[#333] dark:hover:bg-[#444] mt-2">
                  Productos
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
