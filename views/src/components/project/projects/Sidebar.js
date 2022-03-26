import React, { useState } from 'react'
import { MdOutlineMessage, MdGroups, MdOutlineDescription } from 'react-icons/md'
import { BsFillDiagram3Fill, BsFillCaretRightFill } from 'react-icons/bs'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BiTask } from 'react-icons/bi'
import { FiHome } from 'react-icons/fi'
import { GoThreeBars } from 'react-icons/go'
import { avatar } from '../../tools/functions/useAvatar'
import { useEffect } from 'react'

const Sidebar = ({ user, projects, setProject, project, changeProject, isLoading, home, setHome, description, setDescription, members, setMembers, tasks, setTasks }) => {
    const [reduce, setReduce] = useState(false)
    const [submenu, setSubmenu] = useState(0)
    const openSubmenu = (key) => { if (submenu !== key) { setSubmenu(key) } else { setSubmenu(-1) } }
    const [hoverCard, setHoverCard] = useState(-1)
    const localStore = localStorage.getItem("sideState")
    const addActive = (state, classe) => { if (state) { return classe } else { return "" } }

    const handleState = () => {
        if (!reduce) {
            localStorage.setItem("sideState", "closed");
            setReduce(true)
        } else {
            localStorage.setItem("sideState", "open");
            setReduce(false)
        }
    }

    useEffect(() => {
        if (!isLoading) {
            if (localStore !== null && localStore === "closed") {
                setReduce(true)
            } else if (localStore !== null && localStore === "closed") {
                setReduce(false)
            } else {
                localStorage.setItem("sideState", "open");
            }
        }
    }, [isLoading, localStore])

    const navigate = (element, key) => {
        openSubmenu(key)
        if (element._id !== project._id) {
            changeProject(element)
        }
    }

    const move = (firstState, secondState, thirdState, fourthState, fifthState) => {
        firstState(true)
        secondState(false)
        thirdState(false)
        fourthState(false)
    }

    return (
        <div className={`sidebar ${addActive(reduce, "reduced")}`}>
            <div className={`sidebar-header ${addActive(reduce, "reduced")}`}>
                <div className={`sidebar-header-inner ${addActive(reduce, "reduced")}`}>
                    <div className="sidebar-header-icon"><BsFillDiagram3Fill /></div>
                    <p>Mes Projets ({projects.length})</p>
                </div>
                <div className="sidebar-header-toggle" onClick={handleState}><GoThreeBars /></div>
            </div>
            <div className="sidebar-inner">
                {!isLoading ? (
                    projects.map((element, key) => {
                        return (
                            <div className="sidebar-container" key={key}>
                                <div className={`sidebar-title ${addActive(reduce, "reduced")}`} onClick={() => navigate(element, key)} onMouseEnter={() => setHoverCard(key)} onMouseLeave={() => setHoverCard(-1)}>
                                    <div className="sidebar-title-inner">
                                        <div className="sidebar-img" style={avatar('img/paysage-4.jpg')}></div>
                                        <div className={`sidebar-name ${addActive(reduce, "reduced")} one-line`}>{element.title}</div>
                                    </div>
                                    <div className={`${reduce ? "hidden" : ""}`}><BsFillCaretRightFill /></div>
                                    {reduce && hoverCard === key && (
                                        <div className="sidebar-hover-card">{element.title}</div>
                                    )}
                                </div>
                                {submenu === key && (
                                    <div className={`sidebar-submenu ${addActive(reduce, "reduced")}`}>
                                        <div className="sidebar-submenu-card" onClick={() => move(setHome, setMembers, setTasks, setDescription)}>
                                            <div className={`sidebar-submenu-title ${addActive(home, "active")}`}>
                                                <FiHome />
                                                <div className="sidebar-submenu-text">Home</div>
                                            </div>
                                        </div>
                                        <div className="sidebar-submenu-card" onClick={() => move(setDescription, setMembers, setHome, setTasks)}>
                                            <div className={`sidebar-submenu-title ${addActive(description, "active")}`}>
                                                <MdOutlineDescription />
                                                <div className="sidebar-submenu-text">Description</div>
                                            </div>
                                        </div>
                                        <div className="sidebar-submenu-card" onClick={() => move(setTasks, setMembers, setHome, setDescription)}>
                                            <div className={`sidebar-submenu-title ${addActive(tasks, "active")}`}>
                                                <BiTask />
                                                <div className="sidebar-submenu-text">Tâches</div>
                                            </div>
                                        </div>
                                        <div className="sidebar-submenu-card">
                                            <div className={`sidebar-submenu-title`}>
                                                <MdOutlineMessage />
                                                <div className="sidebar-submenu-text">Messenger</div>
                                            </div>
                                        </div>
                                        <div className="sidebar-submenu-card" onClick={() => move(setMembers, setHome, setTasks, setDescription)}>
                                            <div className={`sidebar-submenu-title ${addActive(members, "active")}`}>
                                                <MdGroups />
                                                <div className="sidebar-submenu-text">Membres</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                ) : (
                    [...Array(5)].map((element, key) => {
                        return (
                            <div className={`sidebar-skeleton ${addActive(reduce, "reduced")}`} key={key}>
                                <div className="sidebar-skeleton-card">
                                    <div className="sidebar-skeleton-round animate-pulse"></div>
                                    <div className="sidebar-skeleton-text animate-pulse"></div>
                                </div>
                                <div className={`${reduce ? "hidden" : "flex"}`}><BsFillCaretRightFill /></div>
                            </div>
                        )
                    })
                )}
            </div>
            {user &&
                <div className={`sidebar-bottom ${addActive(reduce, "reduced")}`}>
                    <div className="sidebar-bottom-inner">
                        <div className="sidebar-bottom-avatar" style={avatar(user.picture)}></div>
                        <div className="sidebar-bottom-pseudo">{user.pseudo}</div>
                    </div>
                    <div className={`${reduce ? "hidden" : "flex"} tools-btn`}><BiDotsVerticalRounded /></div>
                </div>
            }
        </div>
    )
}

export default Sidebar