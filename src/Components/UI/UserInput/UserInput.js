import React from 'react';

const userInput = (props) => {
    return (
        <div>
            <form onSubmit={props.submit}>
                <input value={props.input} type="text" placeholder="e.g #20" onChange={props.change} />
                <input type="submit" value="Search" />
            </form>
        </div>

    )
}

export default userInput;