import React from 'react'
import { Button, Row, Text } from './ui/primitives'
import { useGlobal } from 'renderer/contexts/globalContext'
import { detachProcess } from 'renderer/fridaClient'

const tabs = ["memory", "hooking", "interceptor", ""]

const Header = () => {
    const {session, setTab} = useGlobal()

    const handleDetach = () => {
        detachProcess()
    }

    return <Row $gap='xs' $padding='xs'>
        <Text $size='caption'>Attached to PID : {session}</Text>
        <Button
            $background='surface'
            $color='content'
            $padding='xs'
            $rounded='xs'
            $border='1px solid outline'
            $size='caption'
            onClick={handleDetach}
        >Detach</Button>
    </Row>
}

export default Header