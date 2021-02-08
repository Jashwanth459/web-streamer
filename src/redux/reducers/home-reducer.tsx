import { IStore } from '../../helpers/types';

import { GET_DATA, LOADING, MODE_TOGGLE, ADD_TO_CART, ADD_TO_LIKED_LIST } from '../constants';

const INITIAL_STATE: IStore = {
    likedList: [],
    cartList: [],
    loading: false,
    cartSum: 0,
    likedSum: 0,
    isLightTheme: true
}

export const ACTION_HANDLERS: any = {

    [LOADING]: (state: IStore, action: any) => {
      return { 
          ...state,
          loading: true
      }
    },

    [MODE_TOGGLE]: (state: IStore, action: any) => {
        return { 
            ...state,
            isLightTheme: !state.isLightTheme
        }
    },

    [ADD_TO_CART]: (state: IStore, action: any) => {
        return { 
            ...state,
            cartSum: state.cartSum + 1,
            cartList: [...state.cartList, action.payload]
        }
    },

    [ADD_TO_LIKED_LIST]: (state: IStore, action: any) => {
        return { 
            ...state,
            likedSum: state.likedSum + 1,
            likedList: [...state.likedList, action.payload]
        }
    },


    [GET_DATA]: (state: IStore, action: any) => {
        const { filter, data } = action
        let updatedData = [ ...data ]
        if (filter) {
            updatedData = updatedData.filter((item: any) => {
                const year = item.year && new Date(item.year) && new Date(item.year).getFullYear()
                return year >= filter[0] && year <= filter[1]
            })
        }
        return {
            ...state,
            rawData: data,
            data: updatedData,
            filter,
            loading: false
        }
    }

}

export default function AppReducer(state: IStore = INITIAL_STATE, action: any) : IStore {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
