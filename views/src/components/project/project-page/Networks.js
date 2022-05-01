import React from 'react'
import { returnNetworkSVG, returnNetworkText } from '../../tools/functions/networks'

const Networks = ({ project }) => {
    return (
        <div className="networks-card">
            <h2>Suivez-nous sur nos réseaux !</h2>
            <div className="networks-card-body">
                {project.networks.map((element, key) => {
                    return (
                        <div className="networks-card-item" key={key}>
                            {returnNetworkSVG(element.type)}
                            <a href={element.url} rel="noreferrer" target="_blank">{returnNetworkText(element.type)}</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Networks