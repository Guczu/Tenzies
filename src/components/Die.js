import React from 'react'

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#f0f6fc"
    }

    return (
        <div
            style={styles}
            className="die--container"
            onClick={() => {
                props.holdDice(props.id)
            }}
        >
            {props.value}
        </div>
    )
}