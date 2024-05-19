import React from 'react';
import WorkerList from "../Worker/WorkerList/WorkerList";
import {deleteUserFromActivity} from "../../API/adminActivityApi";

const AdminUserActivity = ({ users, activityId, onUpdate }) => {

    const onDelete = async (id) => {
        try {
            const formData = new FormData();
            formData.append('userId', id);
            await deleteUserFromActivity(activityId, formData);
            onUpdate(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <strong>Користувачі закрпілені за активностей</strong>
            <WorkerList workers={users} onDelete={onDelete} />
        </div>
    );
};

export default AdminUserActivity;