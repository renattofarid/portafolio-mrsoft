export interface Service {
  title: string;
  description: string;
  image: string;
  benefits: Benefit[];
}

export interface Benefit {
  title: string;
  description: string;
}
