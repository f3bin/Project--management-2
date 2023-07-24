import React, { useEffect } from "react";
import { useState } from "react";
import "./TeamInstructionAndDiscussions.scss";
import { AiFillWechat } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchChats } from "../../Store/chatSlice";
  import { addNewChat } from "../../Store/chatSlice";

const TeamInstructionAndDiscussions = () => {
  const [inputValue, setInputValue] = useState("");
 
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.currentUser);
  const {chats} = useSelector((state) => state.chats);

  console.log(user);
 

  // Handler for sending messages
  const handleSendMessage = () => {
    if (user && user.id && inputValue.trim() !== "") {
      const newChatData = {
        senderId:user.id,
        senderName:user.username,
        message:inputValue
      };

      // Dispatch the addNewChat action to save the new chat data in the Redux store and send it to the server
      dispatch(addNewChat(newChatData));

      // Clear the input field after sending the message
      setInputValue("");
    }
  };

  useEffect(() => {
    dispatch(fetchChats());
  }, []);


  return (
    <div className="discussions-container">
      <div className="discussions-sidebar">
        <div className="discussions-sidebar-title">
          <AiFillWechat size={85} color="teal" />
        </div>
        <ul className="discussions-sidebar-headers">
          <Link to="/teamchat/general" className="discussions-link">
            General
          </Link>
          <Link to="/teamchat/instructions" className="discussions-link">
            Instructions
          </Link>
          {/* <Link className="discussions-link">Strategy</Link>
          <Link className="discussions-link">Updates</Link>
          <Link className="discussions-link">Budget</Link> */}
        </ul>
        <div className="discussions-sidebar-footer">
          <p>Promanage@2023</p>
        </div>
      </div>
      <div className="discussions-chatscreen">
        <Outlet />
        <div className="chatscreen-header">
          <h2>Team Discussions</h2>
        </div>
        <div className="discussions-chatscreen">
          <div className="chatscreen-messages">
            {chats && chats.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender ? message.sender : ""}`}
              >
                <p style={{ color: "blue" }}>{message.senderName}</p>
                {message.message}
              </div>
            ))}
          </div> 
          <div className="chatscreen-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInstructionAndDiscussions;
