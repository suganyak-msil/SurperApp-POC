const GET_SYMBOLS = 'GET_SYMBOLS';
const STORE_WATCHLIST = 'STORE_WATCHLIST';


export function getsymbols(data) {
    console.log("inside action ", data);
    return {
        type: GET_SYMBOLS,
        payload: data
    }
}
export function storewatchlist(data) {
    return {
        type: STORE_WATCHLIST,
        payload: data
    }
}
