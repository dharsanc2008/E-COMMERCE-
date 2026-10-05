export type ProductCategory = 'all' | 'furniture' | 'lighting' | 'ceramics' | 'textiles';

export interface ProductFinish {
  id: string;
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'furniture' | 'lighting' | 'ceramics' | 'textiles';
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  finishes: ProductFinish[];
  material: string;
  dimensions: string;
  weight: string;
  origin: string;
  leadTime: string;
  description: string;
  details: string[];
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  selectedFinish: ProductFinish;
  quantity: number;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'apple_pay' | 'cod';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  promoCode?: string;
  shippingDetails: CheckoutDetails;
  date: string;
  status: 'confirmed' | 'dispatched' | 'delivered';
}
