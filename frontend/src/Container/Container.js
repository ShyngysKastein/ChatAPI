import React, { useEffect } from "react";
import "./Container.css";
import DataInput from "../Components/DataInput/DataInput";
import MessageUsers from "../Components/MessageUsers/MessageUsers";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { clearInput, inputHandler, lastDateGet, messagePost } from "../store/services/messageSlice";

const Container = () => {
  const dispatch = useDispatch();
  const { message, author, generalInfo } = useSelector(state => state, shallowEqual);

  const dataChange = (e) => {
    const { name, value } = e.target;
    dispatch(inputHandler({ name, value }));
  }

  const myAlert = (headTitle, bodyAlert) => {
    let newElement = document.createElement('div');
    newElement.classList.add('dialogOverlay');

    let elements = `<div class = 'mainDialog'>
                <div class='dialog'>
                <div class='dialogHead'>${headTitle}</div>
                <div class='dialogBody'>${bodyAlert}</div> 
                <div class='dialogFoot'>
                <button type='button' class='dialogButton dialogOk'>OKAY</button>
                </div>
                </div></div>`;

    newElement.innerHTML = elements;
    const dialogButton = newElement.querySelector('.dialogButton');
    dialogButton.addEventListener('click', () => {
      newElement.remove();
    });
    const mainDialog = newElement.querySelector('.mainDialog');
    mainDialog.addEventListener('click', () => {
      newElement.remove();
    });
    const dialog = newElement.querySelector('.dialog');
    dialog.addEventListener('click', event => {
      event.stopPropagation()
    })
    document.body.append(newElement);
  }

  const dataSubmit = (event) => {
    event.preventDefault();
    const data = {
      message,
      author
    };
    if (message && author !== '') {
      dispatch(messagePost(data))
      dispatch(clearInput())
    } else {
      myAlert(
        "Предупреждение!",
        `<div>Поля ввода не должны быть пустыми</div>`
      )
    }
  };

  useEffect(() => {
    dispatch(lastDateGet());
  }, [dispatch]);

  return (
    <>
      <DataInput
        dataSubmit={dataSubmit}
        messageValue={message}
        authorValue={author}
        dataChange={dataChange}
      />

      {generalInfo.map((el) => (
        <div className="container" key={el.id}>
          <MessageUsers
            message={el.message}
            datetime={el.datetime}
            author={el.author}
          />
        </div>
      ))
      }
    </>
  )
};

export default Container;
