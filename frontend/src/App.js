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
import AddMenu from "./pages/AddMenu";
import Receipt from "./pages/Receipt";
import {Java, Help, Script, Add} from "grommet-icons";

function App() {
    return (
        <Grommet full>
            <Box
                direction="row"
                border={{ color: 'neutral-3', size: 'medium' }} >
                    <Box pad="medium" >
                        <Sidebar background="neutral-3" round="small"
                                 header={
                                     <Avatar src="https://avatars.githubusercontent.com/u/80839419?v=4" />
                                 }
                        >
                            <Nav gap="small">
                                <Button href= "/" icon={<Java />} hoverIndicator />
                                <Button href= "/receipt" icon={<Script />} hoverIndicator />
                                <Button href= "/addmenu" icon={<Add />} hoverIndicator />
                            </Nav>
                        </Sidebar>
                    </Box>
                    <Box pad="large" >
                        <Main>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" caseSensitive={false} element={<Order/>} />
                                    <Route path="/receipt" caseSensitive={false} element={<Receipt/>} />
                                    <Route path="/addmenu" caseSensitive={false} element={<AddMenu/>} />
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