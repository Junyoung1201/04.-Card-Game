import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { I_Card } from "../types/card";
import { GameState } from "../types/game";
import { randInt } from "../util/rand";
import uuid from "../util/uuid";

interface init {
    state: GameState,
    cardList: I_Card[]
    cardTypeList: string[]
    life: number
}

const init: init = {
    state: GameState.IN_GAME,
    cardTypeList: ["♣","▲","●","■"],
    cardList: [],
    life: 3
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: init,
    reducers: {
        setCardTypeList(state, action: PayloadAction<typeof init.cardTypeList>) {
            state.cardTypeList = action.payload
        },

        setCardList(state, action: PayloadAction<typeof init.cardList>) {
            state.cardList = action.payload
        },

        addLife(state, action: PayloadAction<number>) {
            state.life += action.payload
        },

        setLife(state, action: PayloadAction<number>) {
            state.life = Math.min(action.payload,0);
        },

        end(state, action: PayloadAction<GameState>) {
            if(action.payload === GameState.IN_GAME) return;

            state.state = action.payload
            state.life = init.life
            state.cardList = []
        },
        
        closeCard(state, action: PayloadAction<string>) {
            let target = state.cardList.find(({uuid}) => uuid === action.payload)

            if(target) {
                target.isOpen = false;
                target.closeDelaySec = undefined;
            }
        },

        /** 게임을 시작하기 */
        start(state) {

            const createCardArray = () => {
                let arr: I_Card[] = [];
        
                for(let type of state.cardTypeList) {
                    for(let i = 0; i < 2; i++) {
                        arr.push({
                            uuid: uuid(),
                            content: type
                        });
                    }
                }
        
                // 배열 30번 섞기
                for(let i = 0; i < 30; i++) {
                    let from = randInt(0,arr.length-1);
                    let to = randInt(0,arr.length-1);
        
                    let tmp = {...arr[from]};
                    arr[from] = {...arr[to]};
                    arr[to] = tmp;
                }
        
                return arr;
            }

            state.life = init.life
            state.cardList = createCardArray();
            state.state = GameState.IN_GAME;
        },

        onClickCard(state, action: PayloadAction<string>) {

            // 게임 상태가 게임 중이 아님
            if(state.state !== GameState.IN_GAME) return;

            let target = state.cardList.find(({uuid}) => action.payload === uuid)
            
            // 해당 UUID를 가지고 있는 카드가 없음
            if(!target) return;

            // 카드가 이미 열려있는 상태임
            if(target.isOpen) return;

            // 카드를 이미 맞춘 상태임
            if(target.isComplete) return;

            // 현재 보여주는 중임
            if(state.cardList.find(c => c.closeDelaySec)) {
                return
            }

            // 현재 뒤집어진 카드
            let openedCardList = state.cardList.filter(c => c.isOpen);

            const complete = (c: I_Card) => {
                c.closeDelaySec = undefined;
                c.isOpen = false;
                c.isComplete = true;
            }

            // 카드가 2개 까짐
            if(openedCardList.length+1 >= 2) {
                target.isOpen = true;

                // 뒤집혀 있는 나머지 카드 한 개와 현재 카드의 content가 같은지 확인
                let waitCard = state.cardList.find(({uuid,isOpen}) => isOpen && uuid !== action.payload);
                
                // 맞춤
                if(waitCard?.content === target.content) {
                    
                    /*  카드 맞춤  */
                    state.life++;
                    complete(waitCard);
                    complete(target);

                    console.log("맞췄넹")
                } else {

                    state.life--;
                    console.log(`라이프 까짐 ㅅㄱ`)

                    // 2초 동안 보여주다가 다시 사라지기
                    waitCard!.closeDelaySec = 1;
                    target.closeDelaySec = 1;
                    waitCard!.isOpen = false;
                    target.isOpen = false;
                }
            }

            else {
                target.isOpen = true;
            }
        }
    }
})