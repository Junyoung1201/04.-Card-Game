import { useSelector } from "react-redux";
import { RootState, store } from "store/store";
import { useEffect } from "react";
import { gameSlice } from "store/game";
import { GameState } from "types/game";

export default function GameManager() {
    const {state,life,cardList} = useSelector((state: RootState) => state.game);

    useEffect(() => {

        // 게임오버
        if(life <= 0) {
            store.dispatch(gameSlice.actions.end(GameState.GAME_OVER));
        }
    },[life])

    useEffect(() => {

        if(state === GameState.IN_GAME) {

            // 게임이 끝났는지 검사
            if(cardList.length > 0 && cardList.every(({isComplete}) => isComplete)) {
                store.dispatch(gameSlice.actions.end(GameState.VICTORY));
            }

            // 카드가 배치되지 않은 경우, 게임 시작으로 간주
            else if(cardList.length === 0 || !cardList) {
                store.dispatch(gameSlice.actions.start());
            }
            
        }

    },[state,cardList])

    return null;
}