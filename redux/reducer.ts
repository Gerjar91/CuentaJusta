import { reducerFunctions } from "./reducerFunctions"

export interface DataState {
    dataUser: DataUser[],
    acounts?: Object
}
export interface DataUser {
    user: string,
    amount: string
}
export interface Action {
    type: string,
    payload: any
}
const initialstate: DataState = {
    dataUser: [],
    acounts: {}
}

const reducer = (state = initialstate, action: Action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                dataUser: [...state.dataUser, action.payload]
            };
        case 'REMOVE_USER':
            let dataFilter = state.dataUser.filter((person) => {
                return person.user !== action.payload
            })
            return {
                ...state,
                dataUser: dataFilter
            };
        case "CALCULATE_ACOUNTS":
            const totalAmount = state.dataUser
            let payments = reducerFunctions(totalAmount)

            return {
                ...state,
                acounts: payments
            }
            case "REMOVE_ALL_USERS":
                return{
                    ...state,
                    dataUser:[]
                }

        default:
            return {
                ...state,

            }

    }

}



export default reducer
