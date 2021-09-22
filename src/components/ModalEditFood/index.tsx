import { useRef } from 'react';

import {Modal} from '../Modal';
import {Input} from '../Input';

import { Form } from './styles';
import { FiCheckSquare } from 'react-icons/fi';
import { useFood } from '../../hooks/useFood';

function ModalEditFood() {
  const {isEditModalOpen, toggleEditModal, editingFood, handleUpdateFood} = useFood();

  const formRef = useRef(null);

  async function handleSubmit(data:any) {
    handleUpdateFood(data);
    toggleEditModal();
  };

  return (
    <Modal isOpen={isEditModalOpen} onRequestClose={toggleEditModal}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export {ModalEditFood};
