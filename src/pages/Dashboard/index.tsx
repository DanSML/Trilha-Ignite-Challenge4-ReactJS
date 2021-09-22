import {ModalAddFood} from '../../components/ModalAddFood';
import {ModalEditFood} from '../../components/ModalEditFood';
import {Header} from '../../components/Header';
import {Food} from '../../components/Food';


import { FoodsContainer } from './styles'
import { FoodContextProvider} from '../../Contexts/FoodContext';
import { useFood } from '../../hooks/useFood';

function Dashboard() {
  const {foods, handleDeleteFood, handleEditFood} = useFood();

  return (
    <FoodContextProvider>
      <Header/>
      <ModalAddFood/>
      <ModalEditFood/>

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
    </FoodContextProvider>
  );
};

export {Dashboard};
