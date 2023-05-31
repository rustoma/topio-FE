import axios from "axios";

import { MenuLink } from "@/types/menu";
export const getRankingsMenu = async () => {
  const res = await axios.get<MenuLink[]>("http://localhost:8080/menu/rankings");
  return res.data;
};
