import { useContext } from "react";
import { FoodContext } from "../Contexts/FoodContext";

export const useFood = () => {
  const foodContext = useContext(FoodContext);
  return foodContext;
};