import React from 'react';
import { Box, Grid, Text, Stat, StatLabel, StatNumber, Icon } from "@chakra-ui/react";

type Props = {
icon: React.ElementType;
label: string;
value: number;
color: string;
}

export const StatCard = ({ icon, label, value, color }: Props) => {
return (
    <Box bg="cardBg.100" p={5} borderRadius="md">
    <Grid templateColumns="auto 1fr" gap={2} alignItems="center" mb={3}>
        <Icon as={icon} w={6} h={6} color={color} /> {/* Apply color to icon */}
        <Text fontSize="lg" color={color}>{label}</Text> {/* Apply color to text */}
    </Grid>
    <Stat>
        <StatLabel color={color}>{label}</StatLabel> {/* Apply color to StatLabel */}
        <StatNumber color={color}>{value}</StatNumber> {/* Apply color to StatNumber */}
    </Stat>
    </Box>
    );
}
