import React from 'react';
import{Box, Grid,Text,Stat,StatLabel,StatNumber,Icon} from"@chakra-ui/react"

type Props={icon: React.ElementType; label: string; value: number;}

export const StatCard = ({ icon, label, value,}:Props) =>{ 
return(
<Box bg="cardBg.100" p={5} borderRadius="md">
    <Grid templateColumns="auto 1fr" gap={2} alignItems="center" mb={3}>
        <Icon as={icon} w={6} h={6} />
        <Text fontSize="lg">{label}</Text>
    </Grid>
    <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
    </Stat>
</Box>
)}

