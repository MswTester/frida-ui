import React, { useState } from 'react'
import { useSession } from 'renderer/contexts/sessionContext'
import { Box, Button, Column, Input, Row, Select, Text } from './ui/primitives'
import MemoryLib from './memorylib'
import { RedoIcon, SaveIcon, UndoIcon } from 'lucide-react'

const Scan = () => {
    const {
        scanlist, setScanlist, addresslist, setAddresslist,
        scanHistory, setScanHistory, scanRange, setScanRange,
        selectedModules, selectedRanges, setSelectedModules, setSelectedRanges,
        setViewCurrent, setViewType, viewCurrent, viewType
    } = useSession()
    const [scan, setScan] = useState<string>("")
    const [scantype, setScanType] = useState<string>("Byte")

    const firstScan = () => {
    }

    return <Column $gap="xs" $height='full'>
        <Row $gap="xs">
            <Input
                $width="full" $padding="xs" $rounded="xs"
                $border="1px solid outline"
                placeholder="Scan Value"
                $size='caption'
                value={scan} onChange={e => setScan(e.target.value)}
            />
            <Select
                $size='caption' $padding="xs" $border="1px solid outline" $rounded="xs"
                value={scantype} onChange={e => setScanType(e.target.value)}
            >
                {["Byte", "Short", "Int", "Long", "Float", "Double", "String"].map(
                    (type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    )
                )}
            </Select>
            <Button $size='caption' $width="32 * xs" $padding="xs" $border="1px solid outline" $rounded="xs"
            >{scanlist.length ? "New" : "First"} Scan</Button>
            <Button $size='caption' $width="32 * xs" $padding="xs" $border="1px solid outline" $rounded="xs"
            disabled={scanlist.length == 0}>Next Scan</Button>
        </Row>
        <Row $gap='xs'>
            <Button $size='caption' $padding='xs' $border='1px solid outline' $rounded='xs'>
                <UndoIcon />
            </Button>
            <Button $size='caption' $padding='xs' $border='1px solid outline' $rounded='xs'>
                <RedoIcon />
            </Button>
            <Button $size='caption' $padding='xs' $border='1px solid outline' $rounded='xs'>
                <SaveIcon />
            </Button>
            <Text $width="full" $size="caption" $padding="xs">
                {scanRange === "range"? ``: ``}
            </Text>
        </Row>
        <MemoryLib ptrs={scanlist} />
        <MemoryLib ptrs={addresslist} libSize={24}/>
    </Column>
}

export default Scan