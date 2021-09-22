import {ModalAddFood} from '../../components/ModalAddFood';
import {ModalEditFood} from '../../components/ModalEditFood';
import {Header} from '../../components/Header';
import {Food} from '../../components/Food';

import api from '../../services/api';
import { useState } from 'react';


import { FoodsContainer } from './styles'
import { useEffect } from 'react';
import { Foodie } from '../../Contexts/FoodContext';

function Dashboard() {
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
  }, []);

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
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={isEditModalOpen}
        onRequestClose={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDeleteFood={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export {Dashboard};
