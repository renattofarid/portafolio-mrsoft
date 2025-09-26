export interface Project {
  title: string;
  description: string;
  client: string;
  problem: string;
  solution: string;
  sector: string;
  gallery: string[];
  technologies?: string[];
  color: string;
  figma: string;
  category: "desarrollo" | "paginas" | "ecommerce";
}
