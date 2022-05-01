import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './Theme';

export default function ThemeContextWrapper(props) {
    const [theme, setTheme] = useState();

    function changeTheme(theme) {
        setTheme(theme);
    }

    useEffect(() => {
        switch (theme) {
            case themes.light:
                document.body.classList.remove('dark');
                localStorage.setItem('theme', 'light')
                break;
            case themes.dark:
                document.body.classList.add('dark');
                localStorage.setItem('theme', 'dark')
                break;
            default :
                break
        }
    }, [theme]);

    function checkTheme() {
        const localStorageTheme = localStorage.getItem("theme")

        if (localStorageTheme !== null && localStorageTheme === "light") {
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('light');
        }
    }

    window.load = checkTheme()

    return (
        <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}