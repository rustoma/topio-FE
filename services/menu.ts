import { MenuLink } from "@/types/menu";
export const getRankingsMenu = async (): Promise<MenuLink[]> => {
  const res = await fetch(`${process.env.BACKEND_HOST}/api/v1/menus/page`, {
    headers: {
      "x-api-key": `Bearer ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
};
