import React, { useRef, useState } from 'react';
import { useClickOutside } from '../tools/functions/useClickOutside';

const Categories = ({ open, setOpen, setCategory }, props) => {
    const wrapperRef = useRef()
    const [active, setActive] = useState(0)
    useClickOutside(wrapperRef, setOpen, false)

    const classes = {
        main_li: "py-2 pl-5 pr-7 cursor-pointer border-r-2 border-transparent hover:border-primary hover:bg-background_light dark:hover:bg-background_primary_light focus:border-primary",
        active: "py-2 pl-5 pr-7 cursor-pointer border-r-2 border-transparent border-primary bg-background_light dark:hover:bg-background_primary_light focus:border-primary"
    }

    const categories = [
        { value: "Category One" },
        { value: "Category Two" },
        { value: "Category Three" },
        { value: "Category Four" },
        { value: "Category Five" },
        { value: "Category Six" },
        { value: "Category Seven" },
    ]

    const handleCategory = (e) => {
        setCategory(e.target.dataset.category)
        setOpen(false)
    }

    return (  
        open &&
        <div className={`absolute top-[70px] w-full flex bg-white dark:bg-background_primary h-auto z-[1500] rounded-lg shadow-custom dark:shadow-lg py-5 text-gray-500 dark:text-slate-300 ${props.className ? props.className : ''}`} ref={wrapperRef}>
            <ul className="p-0 flex flex-col w-[250px] border-r-[0.01rem] border-slate-300 dark:border-slate-700" aria-label="vertical-tab-picker">
                {categories.map((category, key) => {
                    return (
                        <li key={key} className={active === key ? classes.active : classes.main_li} onClick={e => setActive(key)}>{category.value}</li>
                    )
                })}
            </ul>

            <div className="p-0 flex flex-col w-full border-r-1 border-slate-700">
                {active === 0 && (
                    <>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel one">SubCategoryPanel one</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel two">SubCategoryPanel two</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel three">SubCategoryPanel three</div>
                    </>
                )}
                {active === 1 && (
                    <>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel one">SubCategoryPanel one</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel two">SubCategoryPanel two</div>
                    </>
                )}
                {active === 2 && (
                    <>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel one">SubCategoryPanel one</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel two">SubCategoryPanel two</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel three">SubCategoryPanel three</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel two">SubCategoryPanel two</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel three">SubCategoryPanel three</div>
                    </>
                )}
                {active === 3 && (
                    <>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel one">SubCategoryPanel one</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel two">SubCategoryPanel two</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel three">SubCategoryPanel three</div>
                    </>
                )}
                {active === 4 && (
                    <>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel two">SubCategoryPanel two</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel three">SubCategoryPanel three</div>
                    </>
                )}
                {active === 5 && (
                    <>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel one">SubCategoryPanel one</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel two">SubCategoryPanel two</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel three">SubCategoryPanel three</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel four">SubCategoryPanel three</div>
                    </>
                )}
                {active === 6 && (
                    <>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel one">SubCategoryPanel one</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel two">SubCategoryPanel two</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel three">SubCategoryPanel three</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel two">SubCategoryPanel two</div>
                        <div className={classes.main_li} onClick={(e) => handleCategory(e)} data-category="SubCategoryPanel three">SubCategoryPanel three</div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Categories