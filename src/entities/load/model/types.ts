export interface LoadLocation {
  country?: string
  region?: string
  city?: string
}

export interface Load {
  _id: string
  title?: string
  cargoName?: string
  from?: LoadLocation | string
  to?: LoadLocation | string
  weight?: number
  volume?: number
  distance?: number
  price?: number
  currency?: string
  status?: string
  phone?: string
  ownerName?: string
  companyName?: string
  isVerified?: boolean
  createdAt?: string
}

export interface GetLoadsParams {
  username?: string
  fromCountry?: string
  fromRegion?: string
  toCountry?: string
  toRegion?: string
}
