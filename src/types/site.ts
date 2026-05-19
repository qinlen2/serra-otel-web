export type Room = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  capacity: number;
  bedType: string;
  size: string;
  hasBalcony: boolean;
  hasAirConditioning: boolean;
  hasTv: boolean;
  hasWifi: boolean;
  hasBathroom: boolean;
  suitableFor: string[];
  sortOrder: number;
  isActive: boolean;
  images: RoomImage[];
};

export type RoomImage = {
  id: string;
  roomId: string;
  url: string;
  alt: string;
  sortOrder: number;
  isCover: boolean;
};

export type HotelAreaType = "reception" | "dining" | "common" | "exterior" | "corridor";

export type HotelArea = {
  id: string;
  title: string;
  type: HotelAreaType;
  description: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
};

export type BreakfastItem = {
  id: string;
  name: string;
  sortOrder: number;
  isHighlighted: boolean;
  isActive: boolean;
};

export type TransportRouteType = "bus" | "minibus" | "car" | "airport" | "izmir_center";

export type TransportRoute = {
  id: string;
  title: string;
  type: TransportRouteType;
  description: string;
  estimatedTime: string;
  stopName: string;
  walkingDistance: string;
  sortOrder: number;
  isActive: boolean;
};

export type NearbyPlace = {
  id: string;
  name: string;
  type: string;
  distance: string;
  walkingTime: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
};

export type HotelHighlight = {
  id: string;
  title: string;
  description: string;
};
