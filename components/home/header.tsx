import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import { ThemeSwitch } from "../theme-switch";
export default function Header() {
  return (
    <header className="px-6 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="font-black tracking-wide flex flex-col text-xl text-foreground">
          <p> PORTFOLIO </p>
          <p className="-mt-2">
            MR<span className="text-secondary">.</span>SOFT{" "}
          </p>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground  transition-colors font-poppins">
              <span>Servicios</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#2E2E2E] dark:bg-[#1a1a1a] text-white border-none p-2 rounded-lg shadow-lg before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-transparent">
              <DropdownMenuItem className="focus:text-terciary focus:bg-[#333]">
                Desarrollo a medida
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:text-terciary focus:bg-[#333]">
                Páginas web
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:text-terciary focus:bg-[#333]">
                E-commerce
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:text-terciary focus:bg-[#333]">
                Otros
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="#"
            className="text-foreground hover:text-secondary transition-colors font-poppins"
          >
            Productos
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-foreground hover:text-secondary transition-colors cursor-pointer" />
          <ThemeSwitch />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
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
        </div>
      </div>
    </header>
  );
}
