import React from 'react';
import { coverPicture } from '../tools/functions/useAvatar';

const TagsSwiper = () => {

    const tags = [
        { name: "Art", url: `${process.env.REACT_APP_API_URL}files/tags/art.jpg` },
        { name: "Artisanat", url: `${process.env.REACT_APP_API_URL}files/tags/artisanat.jpg` },
        { name: "Cuisine", url: `${process.env.REACT_APP_API_URL}files/tags/cuisine.jpg` },
        { name: "Bien-être", url: `${process.env.REACT_APP_API_URL}files/tags/bien-etre.jpg` },
        { name: "Edition", url: `${process.env.REACT_APP_API_URL}files/tags/edition-et-journal.jpg` },
        { name: "Education", url: `${process.env.REACT_APP_API_URL}files/tags/education.jpg` },
        { name: "Film et vidéo", url: `${process.env.REACT_APP_API_URL}files/tags/film-et-video.jpg` },
        { name: "Jeux", url: `${process.env.REACT_APP_API_URL}files/tags/jeux.jpg` },
        { name: "Mode et design", url: `${process.env.REACT_APP_API_URL}files/tags/mode-et-design.jpg` },
        { name: "Musique", url: `${process.env.REACT_APP_API_URL}files/tags/musique.jpg` },
        { name: "Spectacle", url: `${process.env.REACT_APP_API_URL}files/tags/spectacle.jpg` },
        { name: "Patrimoine", url: `${process.env.REACT_APP_API_URL}files/tags/patrimoine.jpg` },
        { name: "Sport", url: `${process.env.REACT_APP_API_URL}files/tags/sport.jpg` },
        { name: "Technologie", url: `${process.env.REACT_APP_API_URL}files/tags/technologie.jpg` }
    ]

    return (
        <div className="home-tags">
            <h2>Les tags les plus populaires</h2>
            <div className="tags-container">
                {tags.slice(0, 5).map((element, key) => {
                    return (
                        <div className="tags-card" style={coverPicture(element.url)} key={key}>
                            <p>#{element.name}</p>
                        </div>
                    )
                })}
            </div>
            <div className="small-tags-container">
                {tags.slice(6, 12).map((element, key) => {
                    return (
                        <div className="small-tags-card" key={key}>
                            <div className="tags-img" style={coverPicture(element.url)}></div>
                            <div className="tags">#{element.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TagsSwiper