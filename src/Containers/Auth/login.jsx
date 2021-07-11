import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss';
import { useState } from 'react';
import axios from 'axios';


export function Login(props){
    // const [form] = Form.useForm();
    const { setCurrent } = props;
    const [ loading, setLoading ] = useState();
    const [ error, setError ] = useState();

    const submit = async(values) =>{
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:4000/api/v1/users/signin`, values);
            if(res.status === 200){
                setLoading(false);
                localStorage.setItem("auth-token", res.data.data.token);
                setCurrent("quiz")
            }
        } catch (error) {
            if(error.response.data.error){
                setError(error.response.data.error)
            }else{
                setError("veuillez reessayer")
            }
            setLoading(false)
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

                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" className="login-form-button" block>
                        Log in
                        </Button>
                        Or <span onClick={() =>setCurrent("register")} className="link-register">register now!</span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}