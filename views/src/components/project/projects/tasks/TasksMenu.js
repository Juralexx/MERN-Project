import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import SmallMenu from '../../../tools/components/SmallMenu'

const TasksMenu = ({ isAdmin, isManager, open, setOpen, tasksMenuRef, setCreateTask }) => {
    return (
        <div ref={tasksMenuRef}>
            <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => setOpen(!open)} />
            {open && (
                <SmallMenu>
                    <div className="py-2 cursor-pointer" onClick={() => setCreateTask(true)}>Créer une nouvelle tâche</div>
                </SmallMenu>
            )}
        </div>
    )
}

export default TasksMenu