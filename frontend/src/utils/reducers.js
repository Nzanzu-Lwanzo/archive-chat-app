
export const imageViewerReducer = ({state,action}) => {

    switch(action) {
        case "TOGGLE":
            return {...state, show : !state.show}
            
    }

}