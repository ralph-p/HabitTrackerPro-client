import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';

interface LoginFormProps {
  
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = (email: string, password: string) => {
    console.log(email, password);
    
  };
  const handleLogin = async () => {
    try {
      await onLogin(email, password);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid email or password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <FormControl maxW="400px" mx="auto">
      <FormLabel fontSize="xl" fontWeight="bold" mb={2}>
        Login to your account
      </FormLabel>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb={4}
      />
      <Input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb={4}
      />
      <Button
        colorScheme="blue"
        onClick={handleLogin}
        fontWeight="bold"
        _hover={{ bg: 'blue.500' }}
        _active={{ bg: 'blue.600' }}
      >
        Login
      </Button>
    </FormControl>
  );
};

export default LoginForm;
