import React, { useContext, useState } from 'react'
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
import { Web3Context } from '../context/Web3Context'
  
const DonateModal = ({c}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [amount, setAmount] = useState(0)
    const {contribute} = useContext(Web3Context)
    const handleSubmit = (e)=>{
      e.preventDefault()
      contribute(c.campaignAddr, amount)
    }
  return (
    <>
    <Button mt={2} colorScheme={"blue"} variant="outline" onClick={onOpen}>
            Support 💪
          </Button>

    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Donation Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize="1.2em">
              ◈
            </InputLeftElement>
            <Input placeholder="Enter donation amount" onChange={(e) => setAmount(e.target.value)}/>
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme='blue' variant="outline"  onClick={(e) => handleSubmit(e)}>Donate</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default DonateModal