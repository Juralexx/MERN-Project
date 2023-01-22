import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/tools/icons/Icon'
import Oval from '../components/tools/loaders/Oval'
import { Button } from '../components/tools/global/Button'
import { addClass, divideArrayIntoSizedParts, getHourOnly, numericDateParser, reverseArray } from '../components/Utils'

const Researches = ({ user, search, setDatas }) => {
    const [researches, setResearches] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchResearches = async () => {
            await axios
                .get(`${process.env.REACT_APP_API_URL}api/user/${user._id}`)
                .then(res => {
                    let reversed = reverseArray(res.data.research)
                    let divided = divideArrayIntoSizedParts(reversed, 20)
                    setResearches(divided)
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }
        fetchResearches()
    }, [user])

    /**
     * 
     */

    const launchResearch = async (research) => {
        await setDatas(prevState => ({
            ...prevState,
            query: research.query,
            category: research.category,
            location: research.location,
            aroundLocation: 0,
            date: research.date,
            state: research.state,
        }))
        search()
    }

    /**
     * 
     */

    const [searchParams] = useSearchParams()
    let currentPage = Number(searchParams.get('p')) || 1

    useEffect(() => {
        if (currentPage > researches.length + 1) {
            window.location.href = `${window.location.origin}/researches`
        }
    }, [currentPage, researches])

    /**
     * 
     */

    return (
        <div className='researches-page container py-8'>
            {!isLoading ? (
                researches.length > 0 ? (
                    <>
                        <div className="researches-top">
                            Vous avez effectué <span>{user.research.length}</span> recherches {`(page ${currentPage}/${researches.length})`}
                        </div>
                        {researches[currentPage - 1].map((research, key) => {
                            return (
                                <div className='research' key={key} onClick={() => launchResearch(research)}>
                                    <div className='w-full'>
                                        {research.query ? (
                                            <>
                                                <h4>{research.query}</h4>
                                                {research.category &&
                                                    <h5>{research.category}</h5>
                                                }
                                            </>
                                        ) : (
                                            research.category ? (
                                                <h4>{research.category}</h4>
                                            ) : (
                                                <h4>Toutes catégories</h4>
                                            )
                                        )}
                                        {research.location &&
                                            research.location.map((location, key) => {
                                                if (location.type === 'city') {
                                                    return <p key={key}>{location.location} ({location.department_code})</p>
                                                } else if (location.type === 'department') {
                                                    return <p key={key}>{location.department} ({location.department_code})</p>
                                                } else if (location.type === 'region') {
                                                    return <p key={key}>{location.region}</p>
                                                }
                                            })
                                        }
                                        {research.date &&
                                            <p>{research.date}</p>
                                        }
                                        {research.state &&
                                            <p>{research.state}</p>
                                        }
                                    </div>
                                    <div className='pl-3 flex flex-col items-end'>
                                        <p>{numericDateParser(research.createdAt)}</p>
                                        <p>{getHourOnly(new Date(research.createdAt))}</p>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='pagination-container'>
                            <div className="pagination">
                                {currentPage - 1 > 0 &&
                                    <>
                                        <Link to={`/researches`} className='arrow'>
                                            <Icon name="DoubleArrowLeft" />
                                        </Link>
                                        <Link to={`/researches/?p=${currentPage - 1}`} className='arrow'>
                                            <Icon name="CaretLeft" />
                                        </Link>
                                    </>
                                }
                                {[...new Array(researches.length)].map((_, key) => {
                                    return (
                                        <Link to={`/researches/?p=${key + 1}`}
                                            key={key}
                                            className={`${addClass(currentPage > (key + 3) || currentPage < (key - 1), 'hidden')} ${addClass(currentPage === (key + 1), 'active')}`}
                                        >
                                            {key + 1}
                                        </Link>
                                    )
                                })}
                                {currentPage + 1 <= researches.length &&
                                    <>
                                        <Link to={`/researches/?p=${currentPage + 1}`} className='arrow'>
                                            <Icon name="CaretRight" />
                                        </Link>
                                        <Link to={`/researches/?p=${researches.length}`} className='arrow'>
                                            <Icon name="DoubleArrowRight" />
                                        </Link>
                                    </>
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="no_content !my-[80px]">
                        <div className="svg_container">
                            <Icon name="Search" />
                        </div>
                        <p>Vous n'avez pas encore effectué de recherches</p>
                        <span>Vos recherches s'afficherons ici lorsque vous en aurez effectué.</span>
                        <Button>
                            <Link to='/'>
                                <Icon name="Search" className="mr-2" />
                                Effectuer une recherche
                            </Link>
                        </Button>
                    </div>
                )
            ) : (
                <div className='!my-[140px]'>
                    <Oval />
                </div>
            )}
        </div>
    )
}

export default Researches