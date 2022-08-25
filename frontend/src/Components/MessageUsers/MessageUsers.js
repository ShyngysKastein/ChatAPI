import React from "react";
import './MessageUsers.css';

const MessageUsers = ({ author, message, datetime }) => {
    const newDate = new Date(datetime);
    return (
        <>
            <div className="message_users">
                <div className="author_user">
                    <label><strong>Author</strong></label>
                    <p> {author}</p>
                </div>
                <div>
                    <label><strong>Message</strong></label>
                    <p className="message_user">{message}</p>
                </div>
                <div>
                    <label><strong>Datetime</strong></label>
                    <p className="data_time">{newDate.toLocaleString()}</p>
                </div>
            </div>
        </>
    );
}

export default MessageUsers;