import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Input, Row } from 'renderer/components/ui/primitives';
import { attachProcess, getInstalledPackages, getProcessList, spawnProcess } from 'renderer/fridaClient';

const Process = () => {
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
        setProcesses([]);
        setApplications([]);
        setSelectedProcess(null);
        setSelectedApplication(null);
        setType('process');
        const processList = await getProcessList();
        setProcesses(processList);
    }

    const handleApplicationList = async () => {
        setProcesses([]);
        setApplications([]);
        setSelectedProcess(null);
        setSelectedApplication(null);
        setType('application');
        const applicationList = await getInstalledPackages();
        setApplications(applicationList);
    }

    const handleExecute = async () => {
        if (type === 'process') {
            if (selectedProcess === null) return;
            await attachProcess(selectedProcess!);
        } else {
            if (selectedApplication === null) return;
            await spawnProcess(selectedApplication!);
        }
    }

    useEffect(() => {
        setSelectedProcess(null);
        setSelectedApplication(null);
        if (processes.filter(([name, _]) => name.toLowerCase().includes(search.toLowerCase())).length === 1) {
            setSelectedProcess(processes.find(([name, _]) => name.toLowerCase().includes(search.toLowerCase()))![1]);
        }
        if (applications.filter(([identifier, _]) => identifier.toLowerCase().includes(search.toLowerCase())).length === 1) {
            setSelectedApplication(applications.find(([identifier, _]) => identifier.toLowerCase().includes(search.toLowerCase()))![0]);
        }
    }, [search])

    return <Container $gap='xs'>
        <Row>
            <Button
                $rounded='xs 0 0 0'
                $padding='sm'
                $width='full'
                $size='caption'
                $border={type === 'process' ? '1px solid outline' : ''}
                onClick={handleProcessList}
            >
                Processes
            </Button>
            <Button
                $rounded='0 xs 0 0'
                $padding='sm'
                $width='full'
                $size='caption'
                $border={type === 'application' ? '1px solid outline' : ''}
                onClick={handleApplicationList}
            >
                Applications
            </Button>
        </Row>
        <Box $border='1px solid outline' $width='full' $padding='sm' $height='80%'>
            <Container $scroll>
                {
                    type === 'process' ? processes.filter(
                        ([name, _]) => name.toLowerCase().includes(search.toLowerCase())
                    ).map(([name, pid], i) =>
                        <Button
                            $width='full'
                            $padding='sm'
                            $border='1px solid outline'
                            $size='caption'
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
                $size='caption'
                placeholder='Search' value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search.trim() && handleExecute()}
            />
            <Button
                $rounded='0 0 xs 0'
                $border='1px solid outline'
                $padding='sm'
                $size='caption'
                onClick={handleExecute}
                disabled={type === 'process' ? selectedProcess === null : selectedApplication === null}
            >{type === 'process' ? 'Attach' : 'Spawn'}</Button>
        </Row>
    </Container>
}

export default Process;