import React, {useState} from "react";
import { useRecoilState } from "recoil";
import { UserData, UserData2 } from "../../atoms/UserAtom";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

const Login = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useRecoilState(UserData);
    const [userData2, setUserData2] = useRecoilState(UserData2);

    const [userName, setUserName] = useState('');
    const [userName2, setUserName2] = useState('');


    const handleSubmit = () => {
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    // "https://api.github.com/users/wolever/"
                    `https://api.github.com/users/${userName}`
                )
            ).json();

            setUserData(data);
        };

        const dataFetch2 = async () => {
            const data = await (
                await fetch(
                    // "https://api.github.com/users/wolever/"
                    `https://api.github.com/users/${userName2}`
                )
            ).json();

            setUserData2(data);
        };

        dataFetch();
        dataFetch2();

        navigate('/dashboard');
    };

    return (
        <div className={'login-page'}>
            <div className="card">
                <h1>Login</h1>
                <p>Enter GitHub username</p>
                <p style={{fontSize: '9pt', textAlign: 'center'}}>
                    <small>tumiduong | mildlywilde  = 1 <br/>
                        wolever | shazow = few</small>
                </p>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder={'User 1:'}/>
                <input type="text" value={userName2} onChange={e => setUserName2(e.target.value)} placeholder={'User 2:'}/>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
};

export default Login;
