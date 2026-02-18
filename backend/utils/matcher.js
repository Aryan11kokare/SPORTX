import Fuse from "fuse.js";

export const findMatches = (items, newItem) => {
  const fuse = new Fuse(items, {
    keys: ["title", "description", "price", "category"],
    threshold: 0.4,
  });

  return fuse.search(newItem.title).map((r) => r.item);
};
