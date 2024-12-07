import { useNavigate } from 'react-router-dom';
import { IntroContainer, Content, ImageContainer, Illustration } from './style';
import { Text } from '@views/components/Text/Text';
import todoImage from '@assets/images/todoImage.png';
import { ButtonGeneral } from '@views/components/ButtonGeneral/ButtonGeneral';

export const IntroPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <IntroContainer>
      <Content>
        <div>
          <Text
            preset="headingLarge"
            color="#FFFFFF"
            semiBold
            margin="0 0 16px 0"
          >
            Não esqueça de planejar o seu dia.
          </Text>
          <Text preset="headingSmall" color="#C6C6C6" light margin="0 0 16px 0">
            Planeje o seu dia de uma forma simples e eficiente.
          </Text>
          <ButtonGeneral
            title="Comece agora!"
            onClick={handleStart}
            width="100%"
            height="50px"
            bgcolor="#074c4e"
            border="1px solid #ffffff"
          />
        </div>
        <ImageContainer>
          <Illustration
            src={todoImage}
            alt="Ilustração de uma folha com uma lista de tarefas"
          />
        </ImageContainer>
      </Content>
    </IntroContainer>
  );
};
