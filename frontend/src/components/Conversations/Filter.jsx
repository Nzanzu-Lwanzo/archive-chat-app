import { useState } from "react";

export default function Filter () {

    const [section,setSection] = useState("all");

    return (
        <div className="filter">
            <button 
                type="button"
                className={`${section==="all" && "active"}`}
                onClick={()=>setSection("all")}>All</button>

            <button
                type="button"
                className={`${section==="unread" && "active"}`}
                onClick={()=>setSection("unread")}>Unread</button>

            <button
                type="button"
                className={`${section==="pending" && "active"}`}
                onClick={()=>setSection("pending")}>Pending</button>
        </div>
    )
}