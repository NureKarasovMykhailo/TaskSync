import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import { updateProfile} from "../../../API/userApi";
import {useNavigate} from "react-router-dom";
import {PROFILE_PAGE_PATH} from "../../../utils/consts";
import {decodeToken} from "react-jwt";

const UserProfile = observer(() => {
    const { userStore } = useContext(Context);
    const navigation = useNavigate();

    const [isUpdating, setIsUpdating] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: userStore.user.firstName,
        secondName: userStore.user.secondName,
        birthday: userStore.user.birthday,
        phoneNumber: userStore.user.phoneNumber,
        userImage: {}
    });

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setUserInfo({
                ...userInfo,
                userImage: e.target.files[0]
            });
        } else {
            setUserInfo({
                ...userInfo,
                [e.target.name]: e.target.value
            });
        }
    }

    const updateUser = async (e) => {
        try {
            const formData = new FormData();
            formData.append('firstName', userInfo.firstName);
            formData.append('secondName', userInfo.secondName);
            formData.append('birthday', userInfo.birthday);
            formData.append('phoneNumber', userInfo.phoneNumber);
            formData.append('userImage', userInfo.userImage);

            const response = await updateProfile(formData);

            if (response.token) {
                localStorage.setItem('token', response.token);
                userStore.setUser(decodeToken(response.token))
            }
            setIsUpdating(false);
            navigation(PROFILE_PAGE_PATH);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form className={"justify-content-center w-100 border p-4"}>
            <div className={"d-flex justify-content-center p-3"}><h2 className={"align-items-center"}>Профіль</h2></div>
            <div className={"d-flex  align-items-center justify-content-center"}>
                <div>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control disabled={true} name={"email"} size={"lg"} type={"email"} value={userStore.user.email} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control disabled={!isUpdating} name={"firstName"} type={"text"} value={userInfo.firstName} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Прізвище</Form.Label>
                        <Form.Control disabled={!isUpdating} name={"secondName"} type={"text"} value={userInfo.secondName} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Дата народження</Form.Label>
                        <Form.Control disabled={!isUpdating} name={"birthday"} type={"date"} value={userInfo.birthday} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Телефоний номер</Form.Label>
                        <Form.Control disabled={!isUpdating} name={"phoneNumber"} type={"text"} value={userInfo.phoneNumber} onChange={handleChange}/>
                    </Form.Group>
                </div>
                <div className={"d-flex flex-column align-items-start"}>
                    <Form.Group className={"px-4"}>
                        <Form.Label>Зображення профіля</Form.Label>
                        <div className={"h-100 w-auto p-3"}>
                            <img
                                alt={"Error while loading photo"}
                                src={process.env.REACT_APP_API_URL + userStore.user.userImage}
                                className={"img-fluid rounded"}
                                style={{width: '200px', height: 'auto'}}
                            />
                        </div>
                        <Form.Control name={"userImage"} type={"file"} disabled={!isUpdating} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </div>
            <div className={"p-4 d-flex justify-content-end"}>
                {isUpdating ?
                    <Button variant={"success"} onClick={updateUser}>Прийняти</Button>
                    :
                    <Button
                        type={"button"}
                        variant={"primary"}
                        onClick={() => setIsUpdating(true)}
                    >
                        Редагувати
                    </Button>
                }
            </div>
        </Form>
    );
});

export default UserProfile;