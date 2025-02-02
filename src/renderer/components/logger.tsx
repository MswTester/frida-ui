import React, { useEffect, useRef } from 'react'
import { Box, Column, Container, Text } from './ui/primitives'
import { useGlobal } from 'renderer/contexts/globalContext'

const Logger = () => {
    const { log, setLog } = useGlobal()
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
    }, [log])
    return <Box
        $background='#2a2a2a'
        $color='#eee'
        $border='1px solid #333'
        $rounded='xs'
        $width='half'
        $height='full'
    >
        <Container $scroll ref={containerRef}>
            <Column
                $justify='flex-start'
                $padding='sm'
                $gap='xs'
            >
                {log.map((entry, i) => 
                    <Text $width='full' $size='caption' key={i}>
                        {entry}
                    </Text>
                )}
            </Column>
        </Container>
    </Box>
}

export default Logger