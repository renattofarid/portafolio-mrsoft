// app/components/SearchWithBlur.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function SearchWithBlur() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = inputRef.current?.value?.trim() || "";
    if (!q) return;

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
        cache: "no-store",
      });
      const data = await res.json();

      setOpen(false);

      if (data?.ok && data?.type && data?.slug) {
        if (data.type === "product") router.push(`/productos?p=${data.slug}`);
        else if (data.type === "service")
          router.push(`/servicios/${data.slug}`);
        else router.push(`/${data.slug}`);
      } else {
        router.push(`/search?query=${encodeURIComponent(q)}`);
      }
    } catch {
      setOpen(false);
      router.push(`/search?query=${encodeURIComponent(q)}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        <form onSubmit={onSubmit} className="relative">
          <Input
            ref={inputRef}
            autoFocus
            className="text-black focus-visible:border-secondary focus-visible:ring-secondary !ring-[1px] border border-secondary !bg-white pr-10"
            placeholder="Buscar productos o servicios…"
          />
          <button
            type="submit"
            className="absolute top-2 right-3"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5 text-secondary" />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
