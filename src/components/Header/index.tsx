
import { Container } from './styles';
import Logo from '../../assets/logo.svg';
import { FiPlusSquare } from 'react-icons/fi';
import { useFood } from '../../hooks/useFood';

function Header() {
  const {toggleModal} = useFood();

  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button
              type="button"
              onClick={toggleModal}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
};

export { Header };

