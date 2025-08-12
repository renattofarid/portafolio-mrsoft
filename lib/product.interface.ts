export interface Product {
  index: number;
  title: string;
  description: string;
  image: string;
  benefits: Benefit[];
  color: string;
  icon: string;
}

export interface Benefit {
  title: string;
  description: string;
}
