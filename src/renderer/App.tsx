import React from "react";
import { Column, Container, Row } from "./components/ui/primitives";
import { useGlobal } from "./contexts/globalContext";
import Logger from "./components/logger";
import Process from "./tabs/process";
import Memory from "./tabs/memory";
import Header from "./components/header";
import { SessionProvider } from "./contexts/sessionContext";

const App = () => {
    const { tab, session } = useGlobal();
    return <Container $background="background">
        <Row $padding="sm" $gap="xs" $height="full">
            <Container>
                { session && <Header /> }
                {
                    session === null ? <Process />:
                    <SessionProvider>{
                        tab ===  "memory" ? <Memory />:
                        <></>
                    }</SessionProvider>
                }
            </Container>
            <Logger />
        </Row>
    </Container>;
};

export default App;
