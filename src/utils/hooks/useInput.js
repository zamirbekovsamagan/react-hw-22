import { useReducer } from "react";

function reducer(prevState,action){
    switch(action.type){
        case 'INPUT':
            return{
                ...prevState,
                enteredValue: action.enteredValue
            }
        case 'BLUR':
            return{
                ...prevState,
                isTouched: true
            }
        default:
            return prevState
    }
}

export const useInput = (validateState) => {
const [state, dispatch] = useReducer(reducer,{
    enteredValue: '',
    isTouched: false
})
 
  const valueIsValid = validateState(state.enteredValue) 
  const hasError = !valueIsValid && state.isTouched 

  const valueChangeHandler = (event) => {
      dispatch({type: 'INPUT', enteredValue: event.target.value})
  }

  const inputBlurHandler = () => {
      dispatch({type: 'BLUR'})
  }

  return {
      value: state.enteredValue,
      isValid: valueIsValid,
      hasError,
      valueChangeHandler,
      inputBlurHandler,
  }
};