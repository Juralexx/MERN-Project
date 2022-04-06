import React from "react";
import { DatePicker } from "../../../tools/components/Inputs";

const End = ({ end, setEnd }) => {
    return (
        <div className="content-form">
            <p className="title full">Date de fin potentielle <span>Champ requis</span></p>
            <DatePicker className="mt-2 full" placeholder="JJ/MM/AAAA" value={end} selected={end} onSelect={setEnd} />
        </div>
    )
}

export default End