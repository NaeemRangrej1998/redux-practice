import React from "react";

function columns ({title,className})  {
    return (
        <>
            <div className={className}>
                <p>{title}</p>
            </div>
        </>
    )
}

export default columns