import React, { useEffect } from "react";
import './Card.css';
import { I_Card } from "./types/card";
import { store } from "./store/store";
import { gameSlice } from "./store/game";

function Card(props: I_Card) {
    
    const {content,isOpen,isComplete,uuid,closeDelaySec} = props;

    if(closeDelaySec) {
        setTimeout(() => {
            store.dispatch(gameSlice.actions.closeCard(uuid))
        },closeDelaySec*1000);
    }

    const open = isOpen || isComplete || closeDelaySec !== undefined;

    function onClick() {
        store.dispatch(gameSlice.actions.onClickCard(uuid));
    }

    return (
        <span 
            className="card" 
            dangerouslySetInnerHTML={{__html: open ? content : "?"}}
            data-open={open}
            data-debug={JSON.stringify({...props, uuid: undefined})}
            onClick={onClick}
        />
    )
}

export default React.memo(Card);