import React, { useState } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import profile from '../image/profile.png';
import '../profile/profilr.css';

function Profile() {
    let data = JSON.parse(sessionStorage.getItem('user'));
    const [inputValue, setInput] = useState('');
    const [inputErr, setInputErr] = useState(false);
    const [list, setList] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);

    function AddEvent() {
        if (inputValue.trim().length === 0) {
            setInputErr(true);
        } else {
            setInputErr(false);
            let newList = [...list, inputValue];
            setList(newList);
            setInput('');
        }
    }

    function SaveProfile() {
        sessionStorage.setItem('profile', JSON.stringify({ 'name': data.name, 'address': list }));
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000); // Hide message after 3 seconds
    }

    function remove(listname) {
        let removeList = list.filter((ele) => ele !== listname);
        setList(removeList);
    }

    return (
        <div className="profile-bg">
            <Header />
            <div className="profile-main">
                <img src={profile} className='imge' alt="profile" /><br />
                <label> UserName </label>
                : <p> {data.name}</p><br />
                <label> Phone no </label>
                : <p>9003079869</p>
                <label>Address </label>
                <div style={{ marginLeft: '208px', marginTop: '-32px' }}>
                    <textarea
                        rows="4"
                        cols="55"
                        value={inputValue}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Enter Your Address...'
                    ></textarea>
                    {inputErr && <small style={{ display: "block" }}>You must write something</small>}
                    <button className="btne" onClick={AddEvent}>Add Address</button>
                    <ul className="profile-ul">
                        {list.map((ele, index) => (
                            <li className="profile-li" key={index}>
                                {ele}
                                <button onClick={() => remove(ele)}>x</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={SaveProfile} className='savebutton'>Save</button>
                    {successMessage && <div className="success-message">Profile saved successfully!</div>}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
