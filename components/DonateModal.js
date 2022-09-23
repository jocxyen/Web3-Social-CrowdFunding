import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    InputGroup,
    InputLeftElement,
    Input,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'
  
const DonateModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
  return (
    <>
    <Button mt={2} colorScheme={"blue"} variant="outline" onClick={onOpen}>
            Support 💪
          </Button>

    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize="1.2em">
              ◈
            </InputLeftElement>
            <Input placeholder="Enter donation amount" />
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Donate</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default DonateModal