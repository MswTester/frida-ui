import React from 'react'
import { Button, Column, Row, Text } from './ui/primitives'
import { useGlobal } from 'renderer/contexts/globalContext'
import { detachProcess, killProcess } from 'renderer/fridaClient'
import { capitalize } from 'renderer/utils/capitalize'

const tabs = ["memory", "hooking", "interceptor"]

const Header = () => {
    const {session, tab, setTab} = useGlobal()

    return <Column $gap='xs' $mb='xs'>
        <Row $gap='xs'>
            <Text $size='caption'>Attached to PID : {session}</Text>
            <Button
                $background='surface'
                $color='content'
                $padding='xs'
                $rounded='xs'
                $border='1px solid outline'
                $size='caption'
                onClick={detachProcess}
            >Detach</Button>
            <Button
                $background='surface'
                $color='content'
                $padding='xs'
                $rounded='xs'
                $border='1px solid outline'
                $size='caption'
                onClick={killProcess}
            >Kill</Button>
        </Row>
        <Row $gap='xs'>
            {tabs.map(_tab => <Button
                key={_tab}
                $width='full'
                $color='content'
                $padding='xs'
                $border={_tab === tab ? "1px solid outline" : ""}
                $size='caption'
                onClick={() => setTab(_tab)}
            >{capitalize(_tab)}</Button>)}
        </Row>
    </Column>
}

export default Header