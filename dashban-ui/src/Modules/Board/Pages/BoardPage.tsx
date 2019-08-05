import {isEmpty}  from 'lodash';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {IList, ICard, IBoard} from '../Models';
import {List} from '../Components/List';
import {IBoardActions, BoardActions} from '../Actions/Actions'
import {BoardService} from '../Services/Services';

/**
 * Properties of component.
 *
 * @prop {Function} t Function for translation.
 */
interface IOwnProps {
    t: Function;
}

interface IStateProps {
    board: IBoard;
}

interface IDispatchProps {
    actions: IBoardActions;
}

type TProps = IStateProps & IOwnProps & IDispatchProps;

/**
 * Component - board page which contains lists of cards - the main content of app.
 */
const BoardPage = (props: TProps): JSX.Element => {
    const {
        t,
        board,
        actions
    } = props;

    const addListButtonTitle: string = !isEmpty(board.lists) ? 'Add another list' : 'Add a list';
    const [updatedBoard, setUpdatedBoard] = useState<IBoard>(null); 
    
    useEffect(() => {
        actions.updateBoard(updatedBoard);

        // Указываем, как сбросить этот эффект:
        return () => actions.clearBoardData();
    }, [updatedBoard]);

    const handleAddCard = (listIndex: number, title: string) => {
        const {lists} = board;
        const updatedCards = !isEmpty(lists[listIndex].cards) ? [...lists[listIndex].cards] : [];

        updatedCards.push({title});
        setUpdatedBoard(updatedBoard);
    };

    const renderCards = (cards: ICard[]) => {
        return (
            <div>
                {cards.map((card) => <div> 1</div>)}
            </div>
        )
    };

    const renderLists = () => {
        return (
            <div>
                {board.lists.map((list: IList, index: number) => {
                    const {cards, title} = list;

                    return (
                        <List
                            cards={cards}
                            onAddCard={handleAddCard}
                            title={title}
                            key={index}
                            t={t}
                            onUpdateCards={() => console.log(1)}
                            listIndex={index}
                        />
                    )
                })}
            </div>
        )
    };

    return (
        <div className="board-page">
            {!isEmpty(board.lists) && renderLists()}
            <button>{addListButtonTitle}</button>
        </div>
    )
}

const mapStateToProps = (state: any): IStateProps => { // TODO: replace any
    return {
        board: state.BoardReducer.board // TODO: replace BoardReducer to Board
    }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        actions: new BoardActions(new BoardService, dispatch)
    }
}

export const BoardPageContainer = compose<React.SFC>(
    withTranslation('boardPage'),
    connect(mapStateToProps, mapDispatchToProps)
)(BoardPage);
