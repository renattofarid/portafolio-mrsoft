export interface Product {
  link: string;
  index: number;
  title: string;
  description: string;
  image: string;
  benefits: Benefit[];
  color: string;
  foreground?: string;
  icon: string;
}

export interface Benefit {
  title: string;
  description: string;
}
