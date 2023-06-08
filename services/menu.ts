import { MenuLink } from "@/types/menu";
export const getRankingsMenu = async (): Promise<MenuLink[]> => {
  const res = await fetch(`${process.env.BACKEND_HOST}/menu/rankings`, {
    referrer: process.env.FRONTEND_HOST,
    referrerPolicy: "origin",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
};
