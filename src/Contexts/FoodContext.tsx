import { createContext, useEffect, useState } from 'react'

import api from '../services/api';

export interface Foodie {
  id: number,
  name: string,
  description: string,
  price: number,
  image: string
}

interface AllContextProps {
  foods: Foodie[],
  editingFood: Foodie,

  isModalOpen: boolean,
  isEditModalOpen: boolean,

  toggleModal: () => void,
  toggleEditModal: () => void,

  handleEditFood: (prop: Foodie) => void,
  handleUpdateFood: (prop: Foodie) => void,
  handleAddFood: (prop: Foodie) => void,
  handleDeleteFood: (prop: number) => void,
}

export const FoodContext = createContext({} as AllContextProps);

const FoodContextProvider: React.FC = ({children}) => {
  const [foods, setFoods] = useState<Foodie[]>([]);
  const [editingFood, setEditingFood] = useState<Foodie>({} as Foodie);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    async function getFoods() {
      const response = await api.get('/foods');
      setFoods(response.data);
    }
    getFoods();
  }, [])

  async function handleAddFood(food:Foodie) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([
        ...foods, 
        response.data
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food:Foodie) {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { 
          ...editingFood, 
          ...food 
        },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(foodId: number) {
    await api.delete(`/foods/${foodId}`);

    const foodsFiltered = foods.filter(food => food.id !== foodId);

    setFoods(foodsFiltered);
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function toggleEditModal() {
    setIsEditModalOpen(!isEditModalOpen);
  }

  function handleEditFood(food:Foodie) {
    setEditingFood(food);
    
    setIsEditModalOpen(!isEditModalOpen);
  }

  return (
    <FoodContext.Provider 
        value={{
            foods, 
            editingFood, 
            isModalOpen, 
            isEditModalOpen, 
            toggleModal,
            toggleEditModal,
            handleUpdateFood,
            handleAddFood,
            handleDeleteFood,
            handleEditFood,
        }}>
        {children}
    </FoodContext.Provider >
  );
}

export {FoodContextProvider};