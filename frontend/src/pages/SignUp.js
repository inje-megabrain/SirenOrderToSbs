import React from "react";
import {Box, Button, Form, Heading, Paragraph, Select, TextInput} from "grommet";
import axios from "axios";

class SignUp extends React.Component {
    loginForm = {
        id: '',
        pw: '',
        nickname: '',
    };

    state = {
        id: '',
        pw: '',
        pwCheckInput: '',
        pwCheck: false,
        pwIsGood: false,
        nickname: '',
        ispwcheckedited: false,
        ispwedited: false,
    }

    signUpSubmit = async () => {
        if (this.state.pwCheck && !this.state.idChecked && this.state.pwIsGood) {
            await axios.post('/signup', {
                username:this.loginForm.id,
                password:this.loginForm.pw,
                nickname:this.loginForm.nickname,
            })
                .then((response) => {
                    alert(response.data);
                    console.log(response);
                    window.location.href="/";
                })
                .catch((error) => alert(error.response.data))
        } else {
            alert('something wrong!');
        }
    }

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
        if (e.target.value.length >= 6){
            this.setState({
                pwIsGood: true,
                ispwedited: true
            });
        }else{
            this.setState({
                pwIsGood: false,
                ispwedited: true
            });
        }
        if (this.state.pwCheckInput === e.target.value){
            this.setState({
                pw: e.target.value,
                pwCheck: true
            });
            e.target.error = true
        }else{
            this.setState({
                pw: e.target.value,
                pwCheck: false
            });
        }
    }

    handleChangePwCheck = (e) => {
        console.log(e.target.value);
        if (this.state.pw === e.target.value){
            this.setState({
                pwCheckInput: e.target.value,
                pwCheck: true,
                ispwcheckedited: true
            });
            e.target.error = true
        }else{
            this.setState({
                pwCheckInput: e.target.value,
                pwCheck: false,
                ispwcheckedited: true
            });
        }
    }

    handleChangeNickname = (e) => {
        console.log(e.target.value);
        this.loginForm.nickname = e.target.value;
        this.setState({
            nickname: this.loginForm.nickname
        });
    }

    render() {
        return (
            <>
            <Heading>Sign Up</Heading>
            <Form
                onChange={({value}) => {
                    console.log("Submit: ", value)
                }}
            >
                <Box width="large" direction="column" gap="medium">
                <Box direction="column" gap="small">
                    <Heading level="3" margin ="0">Id</Heading>
                <TextInput
                    type="normal"
                    placeholder="id"
                    onChange={this.handleChangeId}
                />
                </Box>
                <Box direction="column" gap="small">
                    <Heading level="3" margin ="0">Password</Heading>
                <TextInput
                    type="password"
                    placeholder="pw"
                    value={this.state.pw}
                    onChange={this.handleChangePw}
                />
                    {this.state.ispwedited && !this.state.pwIsGood &&
                        <Paragraph color="status-critical">Pw must at least 6</Paragraph>}
                <TextInput
                    type="password"
                    placeholder="pw check"
                    value={this.state.pwCheckInput}
                    onChange={this.handleChangePwCheck}
                />
                    {this.state.ispwcheckedited && !this.state.pwCheck &&
                        <Paragraph color="status-critical">Pw and pwcheck is not same</Paragraph>}
                </Box>
                <Box direction="column" gap="small">
                    <Heading level="3" margin ="0">NickName</Heading>
                <TextInput
                    type="normal"
                    placeholder="nickname"
                    onChange={this.handleChangeNickname}
                />
                </Box>
                <Box direction="row" gap="small">
                <Button type="submit" onClick={this.signUpSubmit} primary label="Submit"/>
                </Box>
                </Box>
            </Form>
            </>
        )
    }
}
export default SignUp;