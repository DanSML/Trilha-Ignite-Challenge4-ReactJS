import api from '../../services/api';
import { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';
import { Container } from './styles';
import { Foodie } from '../../Contexts/FoodContext';

interface FunctionalFoodProps {
  food: Foodie,
  handleEditFood: (food: Foodie) => void,
  handleDeleteFood: (id: number) => void,
}

function Food({food, handleEditFood, handleDeleteFood}: FunctionalFoodProps) {
  const [isAvailable, setIsAvailable] = useState(false);

  async function toggleAvailable() {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
  });

    setIsAvailable(!isAvailable);
  }

  function setEditingFood(){
    handleEditFood(food);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDeleteFood(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export { Food };
