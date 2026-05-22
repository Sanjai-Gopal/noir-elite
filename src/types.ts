export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string; // For markdown/discount displays
  image: string;
  secondaryImage: string;
  description: string;
  specifications: string[];
  dimensions?: string;
  composition: string;
  origin: string;
  availStatus: "AVAILABLE" | "MADE TO ORDER" | "ARCHIVE ONLY";
  sizes?: string[]; // E.g. ['XS', 'S', 'M', 'L', 'XL']
  colors?: { name: string; hex: string }[]; // E.g. [{ name: "Noir", hex: "#000000" }]
  rating?: number; // 4.8, 5.0, etc.
  reviewsCount?: number;
  stockCount?: number; // 2 etc.
  tags?: string[]; // ['New Season', 'Best Seller', 'Sustainable']
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  isVerified: boolean;
}

export interface Collection {
  id: string;
  title: string;
  season: string;
  tagline: string;
  description: string;
  heroImage: string;
  manifesto: string;
  coordinates: string;
}

export interface CampaignStory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  year: string;
  location: string;
}
