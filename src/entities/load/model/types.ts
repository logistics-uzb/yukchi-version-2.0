export interface LoadLocation {
  country?: string;
  region?: string;
}

export interface Load {
  id?: string;
  _id?: string;
  title?: string;
  cargoName?: string;
  from?: LoadLocation | string;
  to?: LoadLocation | string;
  countryFrom?: string;
  regionFrom?: string;
  countryTo?: string;
  regionTo?: string;
  weight?: number;
  cargoUnit?: string;
  vehicleType?: string;
  pickupDate?: string;
  volume?: number;
  distance?: number;
  price?: number;
  currency?: string;
  paymentAmount?: number;
  paymentCurrency?: "sum" | "usd" | null;
  status?: string;
  phone?: string;
  phoneNumber?: string;
  ownerName?: string;
  companyName?: string;
  isVerified?: boolean;
  createdAt?: string;
  sentToTelegramAt?: string;
  sentAgo?: {
    count?: number;
    unit?: string;
  };
}

export interface GetLoadsParams {
  username?: string;
  isComplete?: string;
  aiStatus?: string;
  limit?: number;
  countryFrom?: string;
  regionFrom?: string;
  countryTo?: string;
  regionTo?: string;
}

export interface GetLoadsResponse {
  data?: {
    data?: Load[];
  };
}
