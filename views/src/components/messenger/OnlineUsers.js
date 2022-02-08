import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OnlineUsers = ({ onlineUsers, currentId, changeCurrentChat }) => {
  const avatar = (props) => { return ({ backgroundImage: `url(${props})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }) }
  const [friends, setFriends] = useState([])
  const [friendInfos, setFriendInfos] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])

  useEffect(() => {
    const getFriends = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${currentId}`)
      setFriends(response.data.friends)
    }
    getFriends()
  }, [currentId])

  // useEffect(() => {
  //   const onlineFriendsFound = friends.filter(object => onlineUsers.some(user => user.userId === object.friend))
  //   setOnlineFriends(onlineFriendsFound)
  //   console.log(onlineFriendsFound)
  //   console.log(onlineUsers)
  // }, [friends, onlineUsers])

  useEffect(() => {
    setOnlineFriends(onlineUsers)
  }, [onlineUsers])

  useEffect(() => {
    const fetchFriendsData = () => {
      try {
        const friendsFound = onlineFriends.map(async (element) => {
          return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${element.friend}`)
            .then((res) => res.data)
            .catch((err) => console.error(err))
        })
        Promise.all(friendsFound).then((res) => {
          setFriendInfos(res)
        })
      }
      catch (err) { console.log(err) }
    }
    fetchFriendsData()
  }, [onlineFriends])

  const handleClick = async (receiver) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/conversations/${currentId}`)
      const conversationFound = response.data.filter(element => element.members.includes([currentId, receiver._id]))

      if (conversationFound === true) {
        changeCurrentChat(receiver)
      } else {
        const createNewConversation = async () => {
          const newConversation = await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/conversations/`,
            data: {
              senderId: currentId,
              receiverId: receiver._id
            }
          })
          changeCurrentChat(newConversation.data)
        }
        createNewConversation()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {friendInfos.map((element, key) => {
        return (
          <div className="online-users" key={key} onClick={() => handleClick(element)}>
            <div className="online-user-img" style={avatar(element.picture)}></div>
            <div className="online-badge"></div>
            <span className="online-user-name">{element.pseudo}</span>
          </div>
        )
      })}
    </>
  );
};

export default OnlineUsers;
