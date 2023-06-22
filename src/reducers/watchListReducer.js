const intialState = {
    watchListSymbolsGroup: [],
    watchListItems: []
}
export default function WatchListReducer(state = intialState, action) {
    switch (action.type) {
        case 'GET_SYMBOLS':
            return { ...state, watchListSymbolsGroup: action.payload };
        case 'STORE_WATCHLIST':
            return { ...state, watchListItems: action.payload }
        default:
            return state;
    }

}