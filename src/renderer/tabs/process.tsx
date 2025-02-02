import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Input, Row, Text } from 'renderer/components/ui/primitives';
import { useGlobal } from 'renderer/contexts/globalContext';
import { attachProcess, getInstalledPackages, getProcessList, spawnProcess } from 'renderer/fridaClient';

const Process = () => {
    const { log, setLog } = useGlobal();
    const [type, setType] = useState<'process' | 'application'>('process');
    const [processes, setProcesses] = useState<[string, number][]>([]);
    const [applications, setApplications] = useState<[string, string][]>([]);
    const [selectedProcess, setSelectedProcess] = useState<number | null>(null);
    const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        handleProcessList();
    }, []);

    const handleProcessList = async () => {
        setSelectedProcess(null);
        setSelectedApplication(null);
        setType('process');
        const [message, processList] = await getProcessList();
        setLog([...log, message]);
        setProcesses(processList);
    }

    const handleApplicationList = async () => {
        setSelectedProcess(null);
        setSelectedApplication(null);
        setType('application');
        const [message, applicationList] = await getInstalledPackages();
        setLog([...log, message]);
        setApplications(applicationList);
    }

    const handleExecute = async () => {
        if (type === 'process') {
            const [message] = await attachProcess(selectedProcess!);
            setLog([...log, message]);
        } else {
            const [message] = await spawnProcess(selectedApplication!);
            setLog([...log, message]);
        }
    }

    useEffect(() => {
        setSelectedProcess(null);
        setSelectedApplication(null);
    }, [search])

    return <Container $rounded='xs' $gap='xs'>
        <Row>
            <Button
                $rounded='xs 0 0 0'
                $padding='sm'
                $width='full'
                $border={type === 'process' ? '1px solid outline' : ''}
                onClick={handleProcessList}
            >
                Processes
            </Button>
            <Button
                $rounded='0 xs 0 0'
                $padding='sm'
                $width='full'
                $border={type === 'application' ? '1px solid outline' : ''}
                onClick={handleApplicationList}
            >
                Applications
            </Button>
        </Row>
        <Box $border='1px solid outline' $width='full' $height='80%'
            $padding='sm'>
            <Container $scroll>
                {
                    type === 'process' ? processes.filter(
                        ([name, _]) => name.toLowerCase().includes(search.toLowerCase())
                    ).map(([name, pid], i) =>
                        <Button
                            $width='full'
                            $padding='sm'
                            $border='1px solid outline'
                            $background={selectedProcess === pid ? 'primary' : ''}
                            $color={selectedProcess === pid ? 'white' : ''}
                            key={i}
                            onClick={() => setSelectedProcess(pid)}
                        >
                            {name} ({pid})
                        </Button>
                    ) : applications.filter(
                        ([identifier, _]) => identifier.toLowerCase().includes(search.toLowerCase())
                    ).map(([identifier, name], i) =>
                        <Button
                            $width='full'
                            $padding='sm'
                            $border='1px solid outline'
                            $background={selectedApplication === identifier ? 'primary' : ''}
                            $color={selectedApplication === identifier ? 'white' : ''}
                            key={i}
                            onClick={() => setSelectedApplication(identifier)}
                        >
                            {name} ({identifier})
                        </Button>
                    )
                }
            </Container>
        </Box>
        <Row $width='full' $gap='xs'>
            <Input
                $width='full'
                $rounded='0 0 0 xs'
                $border='1px solid outline'
                $padding='sm'
                placeholder='Search' value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button
                $rounded='0 0 xs 0'
                $border='1px solid outline'
                $padding='sm'
                onClick={handleExecute}
                disabled={type === 'process' ? selectedProcess === null : selectedApplication === null}
            >{type === 'process' ? 'Attach' : 'Spawn'}</Button>
        </Row>
    </Container>
}

export default Process;