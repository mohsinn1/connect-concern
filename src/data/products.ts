export interface PlanOption {
  name: string;
  priceMonthly: number;
  dataGb: string;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  basePriceMonthly: number;
  retailPrice: number;
  image: string; // placeholder or generated image path
  badge?: string;
  specs: {
    screen: string;
    camera: string;
    battery: string;
    storageOptions: string[];
  };
  plans: PlanOption[];
}

export const PRODUCTS: Product[] = [
  {
    id: "samsung-galaxy-s26",
    name: "Samsung Galaxy S26",
    brand: "Samsung",
    tagline: "Latest Samsung Galaxy S-series flagship.",
    basePriceMonthly: 29.00,
    retailPrice: 999,
    image: "/images/samsung.png",
    badge: "Latest Model",
    specs: {
      screen: "6.2\" Dynamic AMOLED 2X",
      camera: "50MP Triple Detail Array",
      battery: "4000mAh with Fast Charge",
      storageOptions: ["128GB", "256GB"]
    },
    plans: [
      {
        name: "Saver 5G (50GB)",
        priceMonthly: 29.00,
        dataGb: "50GB",
        features: ["5G Speeds", "Samsung Care Plus", "EU Roaming"]
      },
      {
        name: "Pro 5G (Unlimited)",
        priceMonthly: 39.00,
        dataGb: "Unlimited",
        features: ["Priority 5G Access", "Samsung Care+ Premium", "Global Roaming"]
      }
    ]
  },
  {
    id: "iphone-17",
    name: "Apple iPhone 17",
    brand: "Apple",
    tagline: "The next generation of Apple design and intelligence.",
    basePriceMonthly: 27.00,
    retailPrice: 899,
    image: "/images/iphone17.png",
    badge: "New Release",
    specs: {
      screen: "6.1\" Super Retina XDR",
      camera: "48MP Dual Lens Camera",
      battery: "3870mAh with MagSafe",
      storageOptions: ["128GB", "256GB", "512GB"]
    },
    plans: [
      {
        name: "Essential 5G (50GB)",
        priceMonthly: 27.00,
        dataGb: "50GB",
        features: ["High-speed 5G", "Apple Care+ Available", "EU Roaming"]
      },
      {
        name: "Infinity 5G (Unlimited)",
        priceMonthly: 37.00,
        dataGb: "Unlimited",
        features: ["Ultra 5G Speed", "Free Apple Arcade 1-yr", "Global Roaming"]
      }
    ]
  },
  {
    id: "google-pixel-10-pro",
    name: "Google Pixel 10 Pro",
    brand: "Google",
    tagline: "The AI flagship with standard Gemini integration.",
    basePriceMonthly: 35.00,
    retailPrice: 1099,
    image: "/images/google pixel.png",
    badge: "AI Powered",
    specs: {
      screen: "6.7\" Super Actua Display",
      camera: "50MP Triple Pro Camera",
      battery: "5050mAh with Fast Wireless",
      storageOptions: ["128GB", "256GB", "512GB"]
    },
    plans: [
      {
        name: "Standard 5G (50GB)",
        priceMonthly: 35.00,
        dataGb: "50GB",
        features: ["5G Speed Boost", "Google One AI Premium", "EU Roaming"]
      },
      {
        name: "Elite 5G (Unlimited)",
        priceMonthly: 45.00,
        dataGb: "Unlimited",
        features: ["Priority 5G Access", "Uncapped Bandwidth", "Free Hotspot sharing", "Global Roaming"]
      }
    ]
  },
  {
    id: "sim-only-unlimited",
    name: "5G SIM Only Offers",
    brand: "Apex Link",
    tagline: "Unbeatable network coverage. The ultimate flexible tariff.",
    basePriceMonthly: 9.00,
    retailPrice: 0,
    image: "/images/sim.png",
    badge: "Special Deal",
    specs: {
      screen: "Universal eSIM / Physical SIM",
      camera: "No Hardware",
      battery: "Network Level Only",
      storageOptions: ["N/A"]
    },
    plans: [
      {
        name: "Saver Unlimited",
        priceMonthly: 9.00,
        dataGb: "Unlimited",
        features: ["Unlimited 5G Data", "Unlimited Texts & Calls", "1-Month Rolling Contract", "eSIM instant setup"]
      },
      {
        name: "Turbo Unlimited",
        priceMonthly: 14.00,
        dataGb: "Unlimited Turbo",
        features: ["Priority Bandwidth (Uncapped)", "Unlimited Texts & Calls", "Free Hotspot sharing", "Global Roaming"]
      }
    ]
  }
];
