export interface TechnologyInfo {
  title: string;
  image: string;
}

export const technologies: Record<string, TechnologyInfo> = {
  react: {
    title: "React",
    image: "/technologies/react.svg",
  },
  laravel: {
    title: "Laravel",
    image: "/technologies/laravel.svg",
  },
  vite: {
    title: "Vite",
    image: "/technologies/vite.svg",
  },
  nextjs: {
    title: "Next.js",
    image: "/technologies/nextjs.svg",
  },
};
