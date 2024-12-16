import { Box,Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Link, Button } from '@chakra-ui/react';

import { useEffect } from 'react';

export const Info = () => {
const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen(); 
  }, [onOpen]);

    return ( 
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Data Information</ModalHeader>
              <ModalCloseButton color="blue.500" />
              <ModalBody>
                <Box color="black">
                  Some of the data is incomplete, but the city of Baltimore is working hard to provide more publicly available data. For more information, visit <Link href="https://data.baltimorecity.gov/" color="blue.500" isExternal>Open Baltimore</Link>.
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
    );
}