import React from "react";
import {Heading, Form, Box, FormField, Button, Paragraph} from "grommet";
import axios from "axios";

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
        window.location.href = "/login?username="+this.loginForm.id+"&password="+this.loginForm.pw;
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
                                placeholder="id" required
                                onChange={this.handleChangeId}
                            />
                        </Box>
                        <Box direction="column" gap="small">
                            <Heading level="3" margin ="0">Password</Heading>
                            <FormField
                                type="password"
                                placeholder="pw" required
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