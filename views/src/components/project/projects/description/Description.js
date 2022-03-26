import React from 'react'
import Title from './Title'
import Category from './Category'
import Location from './Location'
import End from './End'
import State from './State'
import Work from './Work'
import Content from './Content'

const Description = ({ project }) => {
    return (
        <div className="bg-white dark:bg-background_primary_light text-gray-500 dark:text-slate-300 px-5 rounded-xl">
            <Title project={project} />
            <Category project={project} />
            <Location project={project} />
            <End project={project} />
            <State project={project} />
            <Work project={project} />
            <Content project={project} />
        </div>
    )
}

export default Description