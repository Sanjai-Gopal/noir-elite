import { Product, Collection, CampaignStory } from "./types";
import campaignModel from "./assets/images/campaign-model.png";
import perfumeBottle from "./assets/images/perfume-bottle.png";
import showroomBanner from "./assets/images/showroom-banner.png";

export const PRODUCTS: Product[] = [
  {
    id: "prod-perfume",
    name: "L'ÉTERNEL NOIR PERFUME",
    category: "MAISON DE PARFUM",
    price: "€380",
    originalPrice: "€450",
    image: perfumeBottle,
    secondaryImage: showroomBanner,
    description: "An olfactory kinetic exploration. Formulated from cold ash, pure obsidian distillate, white santal, and deep vetiver. Incased in basalt stone and raw-milled solid silver.",
    specifications: [
      "Top: Frozen Bergamot, Volcanic Ash",
      "Heart: Midnight Cardamom, Szechuan Pepper",
      "Base: Black Suede, Somalian Frankincense, Vetiver",
      "Vessel: Basalt stone body, Solid sterling silver atomizer"
    ],
    composition: "90% basaltic glass, 10% pure sterling silver cap",
    origin: "Maison Grasse, France",
    availStatus: "AVAILABLE",
    sizes: ["50mL", "100mL"],
    colors: [
      { name: "Obsidian Noir", hex: "#0c0c0c" },
      { name: "Basalt Grey", hex: "#4a4a4a" }
    ],
    rating: 4.8,
    reviewsCount: 34,
    stockCount: 8,
    tags: ["Best Seller", "Cruelty-Free"]
  },
  {
    id: "prod-trench",
    name: "OBELISK ARCHITECTURAL TRENCH",
    category: "HAUTE COUTURE",
    price: "€4,200",
    image: campaignModel,
    secondaryImage: showroomBanner,
    description: "Sartorial shielding. Engineered with structural technical polymers to retain a severe geometric stance. Liquid silver double-breasted orbital fasteners.",
    specifications: [
      "Rigid high-collar construction",
      "Signature 3D dorsal spine seam",
      "Dual internal concealed climate pockets",
      "Bespoke laser-etched carbon fiber buckle"
    ],
    composition: "80% Bio-derived Tech-Neoprene, 20% Recycled Carbon Filament Threads",
    origin: "Atelier Paris, France",
    availStatus: "MADE TO ORDER",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Matte Noir", hex: "#080808" },
      { name: "Silt", hex: "#3e3d36" }
    ],
    rating: 4.9,
    reviewsCount: 12,
    stockCount: 3,
    tags: ["New Season", "Sustainable", "Limited"]
  },
  {
    id: "prod-eyewear",
    name: "CYBER-SHELL MAGNESIUM SHADES",
    category: "ACCESSORIES",
    price: "€750",
    originalPrice: "€900",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
    secondaryImage: campaignModel,
    description: "Aerodynamic face shield made of a single continuous block of hyper-dense dark silver magnesium alloy, supporting polarized monolithic light filters.",
    specifications: [
      "Laser-sintered matte magnesium frame",
      "100% UV400 Dark Onyx polycarbonate block",
      "Integrated micro-ventilation hinges",
      "Total weight: 34 grams"
    ],
    composition: "Carbon-treated Magnesium, Polymer Filter",
    origin: "Atelier Milan, Italy",
    availStatus: "AVAILABLE",
    sizes: ["Regular", "Oversized"],
    colors: [
      { name: "Chrome Silver", hex: "#c0c0c0" },
      { name: "Anodized Slate", hex: "#2f3e46" }
    ],
    rating: 4.7,
    reviewsCount: 56,
    stockCount: 15,
    tags: ["Exclusive", "Ultralight"]
  },
  {
    id: "prod-boots",
    name: "MONOLITH PLATEAU ZIP BOOT",
    category: "FOOTWEAR",
    price: "€1,850",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    secondaryImage: showroomBanner,
    description: "Brutalist block silhouette footwear. Hand-molded full grain leather upper with laser-welded titanium composite support core.",
    specifications: [
      "120mm structural honeycomb block heel",
      "High-grip cyber-groove vulcanized sole",
      "Asymmetric front double zip detail",
      "Thermoregulating moisture-wicking lining"
    ],
    composition: "100% Calfskin leather upper, Titanium alloy core, Vulcanized rubber",
    origin: "Atelier Milan, Italy",
    availStatus: "MADE TO ORDER",
    sizes: ["EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43"],
    colors: [
      { name: "Raw Pitch Black", hex: "#030303" }
    ],
    rating: 5.0,
    reviewsCount: 18,
    stockCount: 5,
    tags: ["Archive Item"]
  },
  {
    id: "prod-gown",
    name: "VOLCANIC ASYMMETRIC GOWN",
    category: "HAUTE COUTURE",
    price: "€6,800",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    secondaryImage: campaignModel,
    description: "Ethereal meets structural. Flowing silk georgette bonded with fluid silver alloys, forming a continuous drape that contours to human anatomy like liquid metal.",
    specifications: [
      "Seamless invisible spine enclosure",
      "Raw draped asymmetrical hems",
      "Integrated fluid-metal neck collar piece",
      "Reinforced woven shape-memory wire lining"
    ],
    composition: "60% Organic Silk, 40% Low-density Silver Alloy Filament",
    origin: "Atelier Lyon, France",
    availStatus: "MADE TO ORDER",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Molten Platinum", hex: "#e5e5eb" },
      { name: "Volcanic Ash", hex: "#222222" }
    ],
    rating: 4.9,
    reviewsCount: 7,
    stockCount: 2,
    tags: ["Haute Couture", "Rare"]
  },
  {
    id: "prod-bag",
    name: "ECLIPSE COMPOSITE CLUTCH",
    category: "LEATHER GOODS",
    price: "€1,950",
    originalPrice: "€2,200",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    secondaryImage: showroomBanner,
    description: "A hard-shell structural clutch. Created through hyper-compressed carbon dust and biological leather fibers. Fastened with a magnetic gravity-lock clip.",
    specifications: [
      "Rigid carbon shell body",
      "Micro-fiber protective interior lining",
      "Ergonomic finger silhouette grip bar",
      "Neodymium internal lock mechanism"
    ],
    composition: "Carbon-fiber sheet matrix, Premium calfskin trim",
    origin: "Atelier Florence, Italy",
    availStatus: "AVAILABLE",
    sizes: ["One Size"],
    colors: [
      { name: "Shadow Obsidian", hex: "#0a0a0c" },
      { name: "Graphite Matte", hex: "#1c1c1e" }
    ],
    rating: 4.6,
    reviewsCount: 29,
    stockCount: 11,
    tags: ["Best Seller", "Carbon Neutral"]
  },
  {
    id: "prod-puffer",
    name: "STRATUM LIQUID-MATTE PUFFER",
    category: "HAUTE COUTURE",
    price: "€2,400",
    image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80",
    secondaryImage: showroomBanner,
    description: "Segmented insulated structure replicating geothermal rock layers. Coated with premium water-repellent liquid matte elastomer.",
    specifications: [
      "800-fill sustainable goose down insulation",
      "Modular zip-off protective high-hood",
      "Fully taped water-impermeable internal seams",
      "Integrated thumbhole tech cuffs"
    ],
    composition: "100% Recycled Technical Polyamide, Goose Down Shell",
    origin: "Atelier Lyon, France",
    availStatus: "AVAILABLE",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Pitch Coal Noir", hex: "#020202" },
      { name: "Alabaster Frost", hex: "#f0f0f3" }
    ],
    rating: 4.9,
    reviewsCount: 22,
    stockCount: 6,
    tags: ["New Season", "Thermal Core"]
  },
  {
    id: "prod-ring",
    name: "MÖBIUS COLD-FORGED SILVER BAND",
    category: "ACCESSORIES",
    price: "€450",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    secondaryImage: campaignModel,
    description: "Bespoke continuous-surface band. Hand-beaten solid sterling silver cold-quenched in liquid helium to achieve crystalline metal stability.",
    specifications: [
      "Asymmetric twisted Möbius loop shape",
      "Micro-etched brand authentication key",
      "Scratch-mitigating rhodium glaze finish",
      "Individually hand-milled, signed, and numbered"
    ],
    composition: "92.5% Solid Sterling Silver, 7.5% Hardened Platinum Alloy",
    origin: "Atelier Milan, Italy",
    availStatus: "AVAILABLE",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    colors: [
      { name: "Distressed Sterling", hex: "#cfd2cd" },
      { name: "Sintered Dark Ruthenium", hex: "#343a40" }
    ],
    rating: 4.8,
    reviewsCount: 42,
    stockCount: 19,
    tags: ["Best Seller", "Ethical Silver"]
  },
  {
    id: "prod-gloves",
    name: "CHROME SHEATH RUNWAY GLOVES",
    category: "ACCESSORIES",
    price: "€620",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
    secondaryImage: campaignModel,
    description: "Second-skin protective tech-leather gloves featuring laser-guided joint flexibility matrices and capacitive fingertip overlays.",
    specifications: [
      "Ultra-thin premium nappa leather base",
      "Carbon fiber composite knuckle shield panels",
      "Touch-responsive smart device integration",
      "Magnetic wrist-lock compression straps"
    ],
    composition: "100% Nappa Leather, Carbon-Core Inserts",
    origin: "Atelier Florence, Italy",
    availStatus: "AVAILABLE",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Glossy Ink", hex: "#030204" }
    ],
    rating: 4.5,
    reviewsCount: 14,
    stockCount: 4,
    tags: ["Limited Run"]
  },
  {
    id: "prod-runner",
    name: "EXO-STRUCTURE VULCAN SHOE",
    category: "FOOTWEAR",
    price: "€1,200",
    originalPrice: "€1,450",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
    secondaryImage: showroomBanner,
    description: "Anatomically mapped sneakers constructed around an skeletal nylon lattice shell, supporting a thermo-regulating breathable mesh sleeve.",
    specifications: [
      "Skeletal TPU heel counter arch suspension",
      "Injected carbon fiber propulsion core plate",
      "Hand-finished raw seam detailing",
      "Recycled dual-density rubber lugs"
    ],
    composition: "Recycled Thermopolyurethane, Nylon filaments, Rubber core",
    origin: "Atelier Milan, Italy",
    availStatus: "AVAILABLE",
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"],
    colors: [
      { name: "Neon Carbon", hex: "#161b1a" },
      { name: "Chalk Silt", hex: "#dcd8cf" }
    ],
    rating: 4.9,
    reviewsCount: 31,
    stockCount: 8,
    tags: ["New Season", "Performance"]
  },
  {
    id: "prod-backpack",
    name: "CYSTIC GEOMETRIC SHELL BACKPACK",
    category: "LEATHER GOODS",
    price: "€2,250",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
    secondaryImage: showroomBanner,
    description: "Hexagonal outer exoskeleton shielding an expandable interior compartment. Engineered with water-repellent ballistic weave composites.",
    specifications: [
      "Dynamic load-distributing harness straps",
      "Reinforced computer armor sleeve (16 inch)",
      "Anodized quick-tension compression hooks",
      "Secret breathable mesh luggage anchor block"
    ],
    composition: "90% Ballistic Nylon, 10% Full-grain Bovine Leather trims",
    origin: "Atelier Paris, France",
    availStatus: "AVAILABLE",
    sizes: ["One Size"],
    colors: [
      { name: "Mineral Slate", hex: "#1a2221" }
    ],
    rating: 4.7,
    reviewsCount: 19,
    stockCount: 7,
    tags: ["Water Resistant"]
  },
  {
    id: "prod-candle",
    name: "SANTAL ASH GLASS VESSEL CANDLE",
    category: "MAISON DE PARFUM",
    price: "€160",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    secondaryImage: showroomBanner,
    description: "Emanates a dense atmosphere. Slow combustion of cold cypress resin, smoked birchwood logs, sweet patchouli leaf, and raw amber shards.",
    specifications: [
      "Soy-wax vegetable organic component",
      "Pure woven linen braid triple-wick",
      "Burn time approx: 80 total hours",
      "Brutalist blown raw dark glass vessel"
    ],
    composition: "100% Organic eco-wax, Blown mineral glass containment",
    origin: "Maison Grasse, France",
    availStatus: "AVAILABLE",
    sizes: ["250g", "600g"],
    colors: [
      { name: "Smoked Glass", hex: "#111111" }
    ],
    rating: 4.8,
    reviewsCount: 112,
    stockCount: 30,
    tags: ["Maison Classic", "Aromatherapy"]
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: "coll-01",
    title: "CAPSULE I: COLD METROPOLIS",
    season: "WINTER COLLECTION 2026/27",
    tagline: "Sartorial armor for the post-organic eras.",
    description: "An architectural exploration of high-end human shielding. Designed with materials responding to micro-climatic fluctuations and severe urban silhouettes.",
    heroImage: campaignModel,
    manifesto: "In a world of excessive light and digitisation, NOIR ÉLITE returns to the solace of pure shadow. Every item is hand-milled, numbered, and treated as wearable sculpture.",
    coordinates: "48.8566º N, 2.3522º E [PARIS]"
  },
  {
    id: "coll-02",
    title: "HAUTE CLINIQUE II: TECH OBSIDIAN",
    season: "SUMMER CAPSULE 2027",
    tagline: "Where volcanic chemistry meets sartorial precision.",
    description: "Infusing raw minerals into high-end silks. The garments adapt to the light, radiating subtle metallic chrome tints when hitting absolute darkness.",
    heroImage: showroomBanner,
    manifesto: "Form follows texture. The interaction of carbon fiber vectors and organic silk georgettes produces garments which do not merely cover, but rather architecture the body.",
    coordinates: "45.4642º N, 9.1900º E [MILANO]"
  }
];

export const CAMPAIGNS: CampaignStory[] = [
  {
    id: "camp-01",
    title: "SUBTERRANEAN SARTORIAL",
    subtitle: "Campaign Act I",
    description: "A spatial dialogue set in the brutalist volcanic vaults of Iceland. Shot inside deep volcanic chambers beneath frozen terrains.",
    image: showroomBanner,
    year: "2026",
    location: "REYKJAVÍK, IS"
  },
  {
    id: "camp-02",
    title: "THE ECLIPSE PROTOCOL",
    subtitle: "Campaign Act II",
    description: "Capturing models in pure dark silhouettes against extreme white reflectors on the outskirts of Tokyo.",
    image: campaignModel,
    year: "2026",
    location: "SHIBUYA, JP"
  }
];
