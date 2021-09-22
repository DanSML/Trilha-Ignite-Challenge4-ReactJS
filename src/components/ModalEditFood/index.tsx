import { createRef } from 'react';

import {Modal} from '../Modal';
import {Input} from '../Input';

import { Form } from './styles';
import { FiCheckSquare } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

function ModalEditFood({isOpen, onRequestClose} : ModalProps) {
  const { editingFood } = this.props;
  const { setIsOpen, handleUpdateFood } = this.props;
  const formRef = createRef();

  async function handleSubmit(data:any) {
    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
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
