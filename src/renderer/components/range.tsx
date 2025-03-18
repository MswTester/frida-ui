import React from "react"
import { Column, Container, Row, Select, Text } from "./ui/primitives"
import { useSession } from "renderer/contexts/sessionContext"

const Range = () => {
    const {
        scanlist, setScanlist, addresslist, setAddresslist,
        scanHistory, setScanHistory, scanRange, setScanRange,
        ranges, setRanges, modules, setModules,
        selectedModules, selectedRanges, setSelectedModules, setSelectedRanges,
        setViewCurrent, setViewType, viewCurrent, viewType
    } = useSession()

    return <Column $gap="xs">
        <Row $gap="xs">
            <Select value={scanRange} onChange={e => setScanRange(e.target.value)}>
                <option value="range">Range</option>
                <option value="module">Module</option>
            </Select>
        </Row>
        <Container $scroll>
            {scanRange === "range" ? ranges.map((range, idx) => {
                const selected = selectedRanges.includes(idx)
                return <Row key={idx} $gap="xs" onClick={() => setSelectedRanges([idx])}>
                    <Text>{range.base.toString()} - {range.base.add(range.size).toString()}</Text>
                    <Text>{range.size}</Text>
                    <Text>{range.protection}</Text>
                </Row>
            }) : modules.map((modul, idx) => {
                const selected = selectedModules.includes(idx)
                return <Row key={idx} $gap="xs" onClick={() => setSelectedModules([idx])}>
                    <Text>{modul.base.toString()} - {modul.base.add(modul.size).toString()}</Text>
                    <Text>{modul.size}</Text>
                    <Text>{modul.name}</Text>
                </Row>
            })}
        </Container>
    </Column>
}

export default Range;