import React, {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import { UserData, UserData2, UserDataFollowers} from "../../atoms/UserAtom";
import './styles.scss';

import { MdAutorenew } from "react-icons/md";

const Dashboard = () => {
    const userData = useRecoilValue(UserData);
    const userData2 = useRecoilValue(UserData2);

    const [userDataFollowers, setUserDataFollowers] = useRecoilState(UserDataFollowers);


    async function getData(){
        const url1 = `https://api.github.com/users/${userData.login}/followers`;
        const url2 = `https://api.github.com/users/${userData2.login}/followers`;

        const responses = await Promise.all([fetch(url1), fetch(url2)]);

        const data1 = await responses[0].json();
        const data2 = await responses[1].json();


        const j = JSON.stringify(data2);
        const tempArr = [];

        data1.map(obj => {
            if (j.includes(JSON.stringify(obj.login))) {
                tempArr.push(obj);
            }
        });

        setUserDataFollowers(tempArr);
    }

    useEffect(() => {
        if(userData && userData2) {
            getData();
        }
    }, [userData, userData2]);

    return (
        <div className={'dashboard-page'}>
            <div style={{display: 'flex', gap: '16px'}}>
                <div className={'card'}>
                    <img src={userData.avatar_url} alt="" className={'avatar'}/>
                    <div>
                        <div>User: {userData.login}</div>
                        <div>Name: {userData.name}</div>
                        <div>Location: {userData.location}</div>
                    </div>
                </div>
                <div className={'card'}>
                    <img src={userData2.avatar_url} alt="" className={'avatar'}/>
                    <div>
                        <div>User: {userData2.login}</div>
                        <div>Name: {userData2.name}</div>
                        <div>Location: {userData2.location}</div>
                    </div>
                </div>
            </div>

            <br/>
            <br/>
            <p><strong>Try again!</strong></p>
            <a href="/" className={'replay'}><MdAutorenew/></a>

            <br/>

            <h2>{userData.login} & {userData2.login} Common Followers</h2>
            <ol>
                {userDataFollowers && userDataFollowers.map((user, key) => (
                    <li key={key}>User: <a href={`https://github.com/${user.login}`} target={'_blank'}>{user.login}</a></li>
                ))}
            </ol>
        </div>
    )
};

export default Dashboard;
