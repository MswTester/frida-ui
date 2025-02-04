import React, { useEffect, useState } from 'react'
import { Box, Column, Container, Row, Text } from './ui/primitives'

interface MemoryLibProps {
    libSize?: number;
    ptrs: Address[];
}

interface Memory{
    address: string;
    value: string;
    type: string;
    protect: string;
}

const MemoryLib = ({
    libSize,
    ptrs
}: MemoryLibProps) => {
    const [cvtd, setCvtd] = useState<Memory[]>([]);
    useEffect(() => {
        if (!ptrs.length) return setCvtd([]);
        const fetchData = async () => {
            const results = await Promise.all(
                ptrs.map(async (addr) => ({
                    address: addr.address,
                    value: await window.API.readMemory(addr.address, addr.type.toLowerCase()),
                    type: addr.type,
                    protect: await window.API.getMemoryProtect(addr.address),
                }))
            );
            setCvtd(results);
        };
        fetchData();
    }, [ptrs]);
    const _height = libSize ? `${libSize} * xs` : 'full';
    return <Box $width='full' $height={_height}
        $background='background' $border='1px solid outline' $rounded='xs'
    >
        <Column $height={_height}>
            <Box $width='full' $bb='1px solid outline' $padding='xs'>
                <Row $gap='xs'>
                    <Text $size='caption' $weight='strong' $width='full'>Address</Text>
                    <Text $size='caption' $weight='strong' $width='full'>Value</Text>
                    <Text $size='caption' $weight='strong' $width='full'>Type</Text>
                    <Text $size='caption' $weight='strong' $width='full'>Protect</Text>
                </Row>
            </Box>
            <Container $scroll $gap='xs' $padding='xs'
                $maxHeight={_height}
            >
                {cvtd.map((addr, index) => {
                    return <Row $gap='xs' key={index}>
                        <Text $size='caption' $width='full'>{addr.address}</Text>
                        <Text $size='caption' $width='full'>{addr.value}</Text>
                        <Text $size='caption' $width='full'>{addr.type}</Text>
                        <Text $size='caption' $width='full'>{addr.protect}</Text>
                    </Row>
                })}
            </Container>
        </Column>
    </Box>
}

export default MemoryLib