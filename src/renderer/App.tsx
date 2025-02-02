import React, { useEffect, useState } from "react";
import { Button, Column, Container, Row } from "./components/ui/primitives";
import { useGlobal } from "./contexts/globalContext";
import Logger from "./components/logger";
import Process from "./tabs/process";

const App = () => {
    const { log, setLog, tab, setTab } = useGlobal();
    return <Container $background="background">
        <Row $padding="sm" $gap="xs" $height="full">
            {
                tab === "process" ? <Process />:
                <></>
            }
            <Logger />
        </Row>
    </Container>;
};

export default App;
