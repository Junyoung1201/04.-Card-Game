import { useSelector } from "react-redux"
import { RootState, store } from "store/store"
import { GameState } from "types/game";
import CardList from "components/CardList"
import GameManager from "components/GameManager";
import { GAME_OVER_SUBTITLE, GAME_OVER_TITLE, LIFE_CHAR, LIFE_LABEL, VICTORY_SUBTITLE, VICTORY_TITLE } from "./strings";
import { gameSlice } from "store/game";
import './App.css';

export default function App() {

    const {state:gameState,life} = useSelector((state: RootState) => state.game);

    function RetryButton() {
        return (
            <button onClick={() => store.dispatch(gameSlice.actions.start())}>다시하기</button>
        )
    }

    return (
        <div className="app" data-state={gameState}>
            <GameManager />

            {
                gameState === GameState.GAME_OVER &&
                <div className="end">
                    <div>{GAME_OVER_TITLE}</div>
                    <div>{GAME_OVER_SUBTITLE}</div>
                    <RetryButton />
                </div>
            }
            {
                gameState === GameState.VICTORY &&
                <div className="end">
                    <div>{VICTORY_TITLE}</div>
                    <div>{VICTORY_SUBTITLE}</div>
                    <RetryButton />
                </div>
            }
            {
                gameState === GameState.IN_GAME &&
                <>
                    <CardList />
                    <div className="life-parent">
                        <span className="label">{LIFE_LABEL}</span>
                        <span className="life">{LIFE_CHAR.repeat(life)}</span>
                    </div>
                </>
            }
        </div>
    )
}