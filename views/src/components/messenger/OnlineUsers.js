import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { avatar } from '../tools/functions/useAvatar';
import { useClickOutside } from '../tools/functions/useClickOutside';

const OnlineUsers = ({ onlineUsers, currentId, changeCurrentChat, setConversations, user }) => {
  const userData = useSelector((state) => state.userReducer)
  const [friendInfos, setFriendInfos] = useState([])
  // const [onlineFriends, setOnlineFriends] = useState([])
  const [usersConnected, setUsersConnected] = useState([])
  const [hoveredCard, setHoveredCard] = useState(-1)
  const wrapperRef = useRef()

  useClickOutside(wrapperRef, setHoveredCard, -1)
  // useEffect(() => { setOnlineFriends(onlineUsers) }, [onlineUsers])

  useEffect(() => {
    if (user) {
      const fetchFriendsData = () => {
        try {
          const friendsFound = user.friends.map(async (element) => {
            return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${element.friend}`)
              .then((res) => res.data)
              .catch((err) => console.error(err))
          })
          Promise.all(friendsFound).then((res) => {
            setFriendInfos(res)
          })
        } catch (err) { console.log(err) }
      }
      fetchFriendsData()
    }
  }, [user])

  useEffect(() => {
    if (onlineUsers.length > 0) {
      onlineUsers.map((friend) => {
        const index = friendInfos.findIndex(element => element._id === friend.friend)
        return setUsersConnected(friendInfos.splice(index, 1))
      })
    }
  }, [onlineUsers, friendInfos])

  const handleClick = async (receiver) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/conversations/${currentId}`)
      let isConversation = response.data.filter(element => element.members.length === 2)
      isConversation = isConversation.filter(element => element.members[0].id === currentId || element.members[1].id === currentId)
      isConversation = isConversation.find(element => element.members[0].id === receiver._id || element.members[1].id === receiver._id)

      if (isConversation) {
        changeCurrentChat(isConversation)
      } else {
        const createNewConversation = async () => {
          const user = { id: userData._id, pseudo: userData.pseudo, picture: userData.picture }
          const friend = { id: receiver._id, pseudo: receiver.pseudo, picture: receiver.picture }
          const data = { type: 'dialog', owner: user, creator: user, members: [user, friend], waiter: receiver._id }
          await axios.post(`${process.env.REACT_APP_API_URL}api/conversations/`, data)
            .then((res) => {
              changeCurrentChat(res.data)
              setConversations(conversations => [...conversations, res.data])
            })
        }
        createNewConversation()
      }
    } catch (err) { console.log(err) }
  }

  return (
    <>
      {onlineUsers.length > 0 && (
        <div>
          {usersConnected.map((element, key) => {
            return (
              <div className="online-users" key={key} ref={wrapperRef} onClick={() => {hoveredCard === element._id ? setHoveredCard(-1) : setHoveredCard(element._id)}}>
                <div className="online-user">
                  <div className="online-user-img" style={avatar(element.picture)}></div>
                  <div className="online-user-name">
                    <div className="online-user-pseudo">{element.pseudo}</div>
                    <div className="online-user-status"><em>Actif</em></div>
                  </div>
                </div>
                <div className="online-badge connected"></div>
                {hoveredCard === element._id && (
                  <div className="online-user-menu" ref={wrapperRef}>
                    <ul>
                      <li onClick={() => {handleClick(element); setHoveredCard(-1)}}>Conversation</li>
                      <li>Voir au profil</li>
                      <li><NavLink to={"/" + element.pseudo}>Aller le profil</NavLink></li>
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {friendInfos.map((element, key) => {
        return (
          <div className="online-users" key={key} ref={wrapperRef} onClick={() => setHoveredCard(element._id)}>
            <div className="online-user">
              <div className="online-user-img" style={avatar(element.picture)}></div>
              <div className="online-user-name">
                <div className="online-user-pseudo">{element.pseudo}</div>
                <div className="online-user-status"><em>Déconnecté</em></div>
              </div>
            </div>
            {hoveredCard === element._id && (
              <div className="online-user-menu" ref={wrapperRef}>
                <ul>
                  <li onClick={() => {handleClick(element); setHoveredCard(-1)}}>Conversation</li>
                  <li>Voir au profil</li>
                  <li><NavLink to={"/" + element.pseudo}>Aller le profil</NavLink></li>
                </ul>
              </div>
            )}
            <div className="online-badge"></div>
          </div>
        )
      })}
    </>
  );
};

export default OnlineUsers;