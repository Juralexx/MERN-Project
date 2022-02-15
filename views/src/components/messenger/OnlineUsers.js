import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const OnlineUsers = ({ onlineUsers, currentId, changeCurrentChat, setConversations, conversations }) => {
  const userData = useSelector((state) => state.userReducer)
  const avatar = (props) => { return ({ backgroundImage: `url(${props})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }) }
  const [friendInfos, setFriendInfos] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])

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
      var conversationFound = response.data.filter(element => element.members.length === 2)
          conversationFound = conversationFound.filter(element => element.members[0].id === currentId || element.members[1].id === currentId)
          conversationFound = conversationFound.find(element => element.members[0].id === receiver._id || element.members[1].id === receiver._id)

      if (conversationFound) {
        changeCurrentChat(conversationFound)
      } else {
        const createNewConversation = async () => {
          var user = { id: userData._id, pseudo: userData.pseudo, picture: userData.picture }
          var friend = { id: receiver._id, pseudo: receiver.pseudo, picture: receiver.picture }
          await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/conversations/`,
            data: {
              members: [user, friend],
              owner: currentId,
              creator: currentId
            }
          }).then((res) => {
            changeCurrentChat(res.data)
            setConversations(conversations => [...conversations, res.data])
          })
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



  // useEffect(() => {
  //   const onlineFriendsFound = friends.filter(object => onlineUsers.some(user => user.userId === object.friend))
  //   setOnlineFriends(onlineFriendsFound)
  //   console.log(onlineFriendsFound)
  //   console.log(onlineUsers)
  // }, [friends, onlineUsers])