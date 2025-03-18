import React from "react"
import Range from "renderer/components/range"
import Scan from "renderer/components/scan"
import { Container, Select } from "renderer/components/ui/primitives"

const Memory = () => {
    const [memoryTab, setMemoryTab] = React.useState<string>("scan")
    return <Container $gap="xs">
        <Select
            $width="full"
            $size='caption' $padding="xs" $border="1px solid outline" $rounded="xs"
            value={memoryTab} onChange={e => setMemoryTab(e.target.value)}
        >
            <option value="scan">Scan</option>
            <option value="view">View</option>
            <option value="range">Ranges & Modules</option>
            <option value="compare">Compare</option>
            <option value="patch">Patch</option>
        </Select>
        {
            memoryTab === "scan" ? <Scan />:
            memoryTab === "view" ? <></>:
            memoryTab === "range" ? <Range />:
            memoryTab === "compare" ? <></>:
            memoryTab === "patch" ? <></>:
            <></>
        }
    </Container>
}

export default Memory