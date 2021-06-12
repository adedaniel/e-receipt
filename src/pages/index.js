import {
  Box,
  Center,
  Heading,
  Stack,
  Text,
  Link as ChakraLink,
  Input,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react'
import Axios from 'axios'
import Router from 'next/router'
import { useState } from 'react'
import { BASE_API_URL } from '../utils'

const Index = () => {
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitSignUp = (event) => {
    event.preventDefault()
    setIsLoading(true)
    Axios.post(BASE_API_URL + '/user/jwt/token/create', {
      email,
      password,
    })
      .then(({ data }) => {
        // localStorage.setItem(
        //   "e_receipt_acccess_token",
        //   data?.data?.access_token
        // );
        // dispatch(setUserDetails(data?.data?.user));
        // Router.push("/");
        console.log(data)
      })
      .catch(({ response }) => {
        // toast(toastError(null, "An error occurred", response?.data?.errors[0]));
        setIsLoading(false)
        console.log(response)
      })
  }

  return (
    <Stack direction="row" align="center" spacing={0} minH="100vh">
      <Stack
        d={['none', 'none', 'flex', 'flex']}
        minH="100vh"
        w="full"
        px={8}
        py={12}
        bg="white"
        backgroundPosition="center"
        backgroundSize="cover"
        justify="space-between"
        bgImage="url(./images/login-bg.jpg)"
        color="white"
      >
        <Heading fontSize="3xl">E-Receipt</Heading>
        <Text>
          © {new Date().getFullYear()} E-Receipt. All rights reserved.
        </Text>
      </Stack>
      <Stack
        align="center"
        w="full"
        minH="100vh"
        p={8}
        bg="blackAlpha.50"
        spacing={16}
        pt={28}
      >
        <Stack justify="center" align="center" spacing={4}>
          <Heading fontSize="4xl" textAlign="center">
            Sign Up
          </Heading>
          <Text textAlign="center">
            Already have an account?{' '}
            <ChakraLink textDecor="underline !important">Login</ChakraLink>
          </Text>
        </Stack>
        <Stack
          onSubmit={onSubmitSignUp}
          as="form"
          spacing={6}
          w="full"
          maxW="sm"
        >
          <Stack w="full">
            <Text fontWeight="bold">Email Address</Text>
            <Input
              size="lg"
              isRequired
              type="email"
              w="full"
              placeholder="Write your email here"
              bg="white"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Stack>
          <Stack w="full">
            <Text fontWeight="bold">Password</Text>
            <Input
              size="lg"
              isRequired
              type="password"
              w="full"
              minLength={8}
              placeholder="Minimum of 8 characters"
              bg="white"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Stack>
          <Flex pt={2} w="full">
            <Button
              variant="solid"
              colorScheme="blackAlpha"
              size="lg"
              isFullWidth
              type="submit"
              isLoading={isLoading}
              loadingText="Hold on..."
            >
              Get Started
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Index
