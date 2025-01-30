import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  console.log(location.pathname.split("/").pop());
  return <div>Chat</div>;
};

export default Chat;
