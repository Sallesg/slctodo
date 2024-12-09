import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContainer, Form, Button } from './styles';
import { useAuth } from '@app/contexts/AuthProvider/AuthProvider';
import { Text } from '@views/components/Text/Text';
import { TextInput } from '@views/components/TextInput/TextInput';
import { validatePassword } from '@app/utils/validatePassword';
import { isValidEmail } from '@app/utils/validateEmail';
import { ClipLoader } from 'react-spinners';
export const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setEmailTouched(true);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleNameChange = (e: FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Text preset="headingLarge" margin="0 0 18px" bold>
        {isRegister ? 'Cadastre-se' : 'Bem-vindo de volta!'}
      </Text>
      <Form onSubmit={handleSubmit}>
        {isRegister && (
          <TextInput
            label="Nome"
            inputprops={{
              placeholder: 'Nome',
              value: name,
              required: true,
              onChange: handleNameChange,
            }}
          />
        )}
        <TextInput
          errorMessage={emailTouched ? isValidEmail(email) : undefined}
          label="E-mail"
          inputprops={{
            placeholder: 'Digite seu e-mail',
            required: true,
            onChange: handleEmailChange,
            value: email,
            autoComplete: 'email',
            type: 'email',
          }}
        />
        <TextInput
          label="Senha"
          type="password"
          inputprops={{
            placeholder: 'Digite sua senha',
            value: password,
            required: true,
            onChange: handlePasswordChange,
            type: 'password',
          }}
          errorMessage={validatePassword(password)}
        />
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <ClipLoader size={50} color="#074c4e" loading={loading} />
          </div>
        ) : (
          <Button type="submit">{isRegister ? 'Registrar' : 'Login'}</Button>
        )}
        <Button type="button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Ainda não possuo uma conta'}
        </Button>
      </Form>
    </LoginContainer>
  );
};
