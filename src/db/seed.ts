import { breakfastItems, hotelAreas, nearbyPlaces, rooms, siteSettings, transportRoutes } from "@/lib/data/site";

export const seedData = {
  rooms,
  roomImages: rooms.flatMap((room) => room.images),
  hotelAreas,
  breakfastItems,
  transportRoutes,
  nearbyPlaces,
  siteSettings,
};

async function main() {
  console.log(JSON.stringify(seedData, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
