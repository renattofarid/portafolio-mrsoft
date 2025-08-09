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
import { GalleryResource } from "./lib/gallery.interface";

interface Props {
  item: GalleryResource;
}

export default function GalleryItem({ item }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          key={item.id}
          className="bg-card border border-border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-foreground text-lg font-segoe">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm font-poppins">
                {item.product}
              </p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="!max-w-7xl w-full p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="hidden" />
          <DialogDescription className="hidden" />
        </DialogHeader>

        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-auto object-cover mb-4"
        />
      </DialogContent>
    </Dialog>
  );
}
