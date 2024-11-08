import { useSelector } from "react-redux"
import { RootState } from "store/store";
import Card from "./Card";
import './CardList.css';

export default function CardList() {
    const {cardList} = useSelector((state: RootState) => state.game);

    function getCardAmountPerLine() {

        // 최소공약수 얻기
        for(let i = 2; i < 10; i++) {
            if(cardList.length % i === 0) {
                return i;
            }
        }

        throw `한 줄 당 카드 갯수를 구할 수 없습니다.`
    }

    function getCardListInlineStyle() {
        let amount = getCardAmountPerLine();

        amount = Math.max(amount, 3);

        return {
            gridTemplateColumns: `repeat(${amount}, 1fr)`
        }
    }

    return (
        <div className="card-list" style={getCardListInlineStyle()}>
            {
                cardList.map(({content,uuid,isOpen,isComplete,closeDelaySec}) => (
                    <Card 
                        content={content} 
                        uuid={uuid}
                        key={uuid}
                        isOpen={isOpen} 
                        isComplete={isComplete}
                        closeDelaySec={closeDelaySec}
                    />
                ))
            }
        </div>
    )
}