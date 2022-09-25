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
    Button,Checkbox, CheckboxGroup 
  } from '@chakra-ui/react'
import { Web3Context } from '../context/Web3Context'
import { ethers } from "ethers";
const DonateModal = ({c}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [amount, setAmount] = useState()
    const {contribute,recurringDonate,contributeS,chainId} = useContext(Web3Context)
    const [flow, setFlow] = useState(false)
    const handleSubmit = (e)=>{
      e.preventDefault()
      if(chainId!=80001){contributeS(c.campaignAddr, ethers.utils.parseEther(amount));return}
      console.log(flow)
 
        flow==true?recurringDonate(c.creator,ethers.utils.parseEther(amount).toString()):contribute(c.campaignAddr, ethers.utils.parseEther(amount))
      
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
        {chainId==80001&&<Checkbox colorScheme='green' onChange={()=>setFlow(!flow)}>
        Allow Constant Flow(fDaix)
      </Checkbox>}
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