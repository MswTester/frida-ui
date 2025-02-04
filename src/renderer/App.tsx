import React from "react";
import { Container, Row } from "./components/ui/primitives";
import { useGlobal } from "./contexts/globalContext";
import Logger from "./components/logger";
import Process from "./tabs/process";
import Memory from "./tabs/memory";

const App = () => {
    const { tab, session } = useGlobal();
    return <Container $background="background">
        <Row $padding="sm" $gap="xs" $height="full">
            {
                session === null ? <Process />:
                tab ===  "memory" ? <Memory />:
                <></>
            }
            <Logger />
        </Row>
    </Container>;
};

export default App;
