import { MenuLink } from "@/types/menu";
export const getRankingsMenu = async (): Promise<MenuLink[]> => {
  const res = await fetch(`${process.env.BACKEND_HOST}/menu/rankings`);

  if (!res.ok) {
    return [];
  }

  return res.json();
};
