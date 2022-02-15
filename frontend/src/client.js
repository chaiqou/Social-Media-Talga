import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "qvgwpwwx",
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token:
    "skqHdaHpfhgw9NZ7W7uNrXkobk2Gt5yJoUWiM2Suq5TLtcUbd3YaITsl2YaAvSJlhoDqftimMjzzmqrs5XZ0djSiGsLivAdsyptFbtFu1k1RpGhAEeMEMST07f8Goo8xaFLuANJY12mug6nGV8LzTifw81JeCjuZHqUDW4LD3CA93Pfas4VS",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
