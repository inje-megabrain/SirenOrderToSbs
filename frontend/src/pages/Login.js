import React from "react";
import {Heading, Form, Box, FormField, Button, Paragraph} from "grommet";
import axios from "axios";
import {useRecoilState} from "recoil";
import {loginState} from "../state";

class Login extends React.Component {
    loginForm = {
        id: '',
        pw: '',
    };

    handleChangeId = (e) => {
        console.log(e.target.value);
        this.loginForm.id = e.target.value;
        this.setState({
            id: this.loginForm.id
        });
    }

    handleChangePw = (e) => {
        console.log(e.target.value);
        this.loginForm.pw = e.target.value;
        this.setState({
            pw: this.loginForm.pw
        });
    }

    LoginSubmit = () => {
        const data = {
            username: this.state.id,
            password: this.state.pw
        };
        axios.post('/login', data).then(response => {
            const token = response.data.token;
            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            axios.defaults.withCredentials = true;
            console.log(axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);
            localStorage.setItem('jwtToken', token);
            alert('logined!');
            // accessToken을 localStorage, cookie 등에 저장하지 않는다!
            window.location.href = "/";

        }).catch(error => {
            // ... 에러 처리
        });
    }

    render() {
        return (
            <>
                <Heading>Login</Heading>
                <Form
                    onChange={({value}) => {
                        console.log("Submit: ", value)
                    }}
                >
                    <Box width="large" direction="column" gap="medium">
                        <Box direction="column" gap="small">
                            <Heading level="3" margin ="0">Id</Heading>
                            <FormField
                                type="normal"
                                placeholder="id"
                                onChange={this.handleChangeId}
                            />
                        </Box>
                        <Box direction="column" gap="small">
                            <Heading level="3" margin ="0">Password</Heading>
                            <FormField
                                type="password"
                                placeholder="pw"
                                onChange={this.handleChangePw}
                            />
                        </Box>
                        <Button type="submit" primary label="Login" onClick={this.LoginSubmit}/>
                    </Box>
                </Form>
            </>
        )
    }
}
export default Login;