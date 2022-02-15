import {
    Anchor,
    Footer,
    Grommet,
    Main,
    Text,
    Box, Avatar, Button, Header, Menu, Heading
} from 'grommet';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from "recoil"
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "./pages/Order";
import AddMenu from "./pages/AddMenu";
import Receipt from "./pages/Receipt";
import LoginForm from "./pages/Login";
import {Java, User, Script, Add} from "grommet-icons";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/Main";
import {loginState, loginUsername, loginNickname, roleOfUser} from "./state";
import axios from "axios";

function App() {
    return (
        <Grommet full>
            <Header background="neutral-3" align="center" direction="row" as="header" gap="small" pad="small">
                <Anchor href="/" label="SbSiren Order" />
                <Box direction="row" gap={"small"}>
                    <Button href= "/order" icon={<Java />} hoverIndicator />
                    <Button href= "/receipt" icon={<Script />} hoverIndicator />
                    <Button href= "/addmenu" icon={<Add />} hoverIndicator />
                </Box>
                <Menu icon={<User />} items={localStorage.getItem('jwtToken')
                    ?
                    [{ label: 'logout', onClick:()=>{
                        window.location.href="/logout";
                        localStorage.removeItem('jwtToken');
                        window.location.href="/";
                    }}]
                    :
                    [{ label: 'login', href: '/login'}, {label: 'signup', href: '/signup'}]} />
            </Header>
            <Main pad="large">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" caseSensitive={false} element={<MainPage/>} />
                        <Route path="/order" caseSensitive={false} element={<Order/>} />
                        <Route path="/receipt" caseSensitive={false} element={<Receipt/>} />
                        <Route path="/addmenu" caseSensitive={false} element={<AddMenu/>} />
                        <Route path="/login" caseSensitive={false} element={<LoginForm/>} />
                        <Route path="/signup" caseSensitive={false} element={<SignUp/>} />
                        <Route path="*" caseSensitive={false} element={<h1>404 Not Found...</h1>}/>
                    </Routes>
                </BrowserRouter>
            </Main>
            <Footer background="neutral-3" pad="medium">
                <Text>Copyright &copy; 2022 megabrain All right reserved.</Text>
                <Anchor label="About" href="https://www.megabrain.kr"/>
            </Footer>
        </Grommet>
    );
}

export default App;