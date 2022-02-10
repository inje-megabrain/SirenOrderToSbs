import {
    Anchor,
    Footer,
    Grommet,
    Main,
    Text,
    Box,
} from 'grommet';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './pages/Nav'
import Order from "./pages/Order";
import Receipt from './pages/Receipt';

function App() {
    return (
        <Grommet>
            <Box
                direction="row"
                border={{ color: 'neutral-3', size: 'large' }}
                pad="xsmall"
            >
                    <Box pad="small" >
                        <Nav />
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