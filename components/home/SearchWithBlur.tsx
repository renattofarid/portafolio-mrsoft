import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function SearchWithBlur() {
  return (
    <Dialog>
      <DialogTrigger>
        <Search className="w-5 h-5 text-foreground hover:text-secondary transition-colors cursor-pointer" />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="p-0 space-y-0 gap-0"
        classOverlay="backdrop-blur bg-transparent"
      >
        <DialogHeader>
          <DialogTitle className="hidden" />
          <DialogDescription className="hidden" />
        </DialogHeader>

        <Input
          className="focus-visible:border-secondary focus-visible:ring-secondary !ring-[1px] border border-secondary !bg-white"
          placeholder="Buscar..."
        />
        <Search className="absolute top-2 right-3 w-5 h-5 text-secondary pointer-events-none" />
      </DialogContent>
    </Dialog>
  );
}
