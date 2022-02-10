import {
    Anchor,
    Footer,
    Grommet,
    Main,
    Text,
    Box, Avatar, Button, Sidebar, Nav
} from 'grommet';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "./pages/Order";
import Receipt from './pages/Receipt';
import {Paypal, Help, Projects} from "grommet-icons";

function App() {
    return (
        <Grommet>
            <Box
                direction="row"
                border={{ color: 'neutral-3', size: 'large' }}
                pad="xsmall"
            >
                    <Box pad="small" >
                        <Sidebar background="neutral-3" round="small"
                                 header={
                                     <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
                                 }
                                 footer={
                                     <Button icon={<Help />} hoverIndicator />
                                 }
                        >
                            <Nav gap="small">
                                <Button href= "/" icon={<Paypal />} hoverIndicator />
                                <Button href= "/receipt" icon={<Projects />} hoverIndicator />
                            </Nav>
                        </Sidebar>
                    </Box>
                    <Box pad="large" >
                        <Main pad="large">
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" caseSensitive={false} element={<Order/>} />
                                    <Route path="/receipt" caseSensitive={false} element={<Receipt/>} />
                                    <Route path="*" caseSensitive={false} element={<h1>404 Not Found...</h1>}/>
                                </Routes>
                            </BrowserRouter>
                        </Main>
                    </Box>
            </Box>
            <Footer background="neutral-3" pad="medium">
                <Text>Copyright 2022 megabrain All right reserved.</Text>
                <Anchor label="About"/>
            </Footer>
        </Grommet>
    );
}

export default App;