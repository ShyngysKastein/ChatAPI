import React from "react";
import './DataInput.css';

const DataInput = ({ dataSubmit, dataChange, authorValue, messageValue }) => {
    return (
        <form className="data" onSubmit={dataSubmit}>
            <input value={authorValue} onChange={dataChange} name="author" className="author" type="text" placeholder="Your name..." />
            <input value={messageValue} onChange={dataChange} name="message" className="message" type='text' placeholder="Write something..." />
            <button className="send">Send</button>
        </form>
    );
}

export default DataInput;