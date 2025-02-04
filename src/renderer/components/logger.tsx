import React, { useEffect, useRef, useState } from 'react'
import { Box, Column, Container, Input, Text } from './ui/primitives'
import { useGlobal } from 'renderer/contexts/globalContext'

const Logger = () => {
    const { log, setLog } = useGlobal()
    const [code, setCode] = useState<string>("")
    const [history, setHistory] = useState<string[]>([])
    const [curHistoryIndex, setCurHistoryIndex] = useState<number>(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
        window.API.on('log', (_e:any, ...args: string[]) => {
            setLog([...log, ...args])
        })
    }, [log])
    return <Box
        $background='#2a2a2a'
        $color='#eee'
        $border='1px solid #333'
        $rounded='xs'
        $width='half'
        $height='full'
    >
        <Container $gap='xs'>
            <Container $scroll ref={containerRef}>
                <Column
                    $justify='flex-start'
                    $padding='sm'
                    $gap='xs'
                    $height='full'
                >
                    {log.map((entry, i) => 
                        <Text $width='full' $size='caption' key={i}>
                            {entry}
                        </Text>
                    )}
                </Column>
            </Container>
            <Input
                $width='full'
                $padding='xs'
                $background='#333'
                $color='#eee'
                $border='1px solid outline'
                $rounded='xs'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && code.trim()) {
                        setHistory(prev => [code, ...prev])
                        window.API.eval(code)
                        setCode('')
                    } else if (e.key === 'ArrowUp') {
                        if (curHistoryIndex < history.length - 1) {
                            setCurHistoryIndex(curHistoryIndex + 1)
                            setCode(history[curHistoryIndex + 1])
                        }
                    } else if (e.key === 'ArrowDown') {
                        if (curHistoryIndex > 0) {
                            setCurHistoryIndex(curHistoryIndex - 1)
                            setCode(history[curHistoryIndex - 1])
                        } else {
                            setCurHistoryIndex(-1)
                            setCode('')
                        }
                    }
                }}
                placeholder='Enter JavaScript code to evaluate...'
                />
        </Container>
    </Box>
}

export default Logger