import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss';
import { useState } from 'react';
import axios from 'axios';


export function Register(props){
    const { setCurrent } = props;
    const [ loading, setLoading ] = useState();
    const [ error, setError ] = useState();

    const submit = async(values) =>{
        if(values.confirmPwd === values.password){
            setLoading(true)
            setError(null)
            try {
                const res = await axios.post(`http://localhost:4000/api/v1/users/create-user`, values);
                if(res.status === 201){
                    setLoading(false);
                    localStorage.setItem("auth-token", res.data.data.token);
                    // setCurrent("")
                    alert(res.data.msg)
                }
            } catch (error) {
                if(error.response.data.error){
                    setError(error.response.data.error)
                }else{
                    setError("veuillez reessayer")
                }
                setLoading(false)
            }
        }else{
            setError("les mots de passes ne correspondent pas")
        }
    }

    return(
        <div className="login-page">
            <div className="card-login">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={submit}
                    >
                        <div className="div-error"> {error} </div>
                    <Form.Item
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full name" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPwd"
                        rules={[{ required: true, message: 'Please confirm your Password!' }]}
                    >
                        <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm your password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" className="login-form-button" block>
                        Register
                        </Button>
                        Or <span onClick={() =>setCurrent("login")} className="link-register">log in!</span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}