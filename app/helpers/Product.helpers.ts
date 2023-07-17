import { URL_INPUTS} from "@/app/constants/Product.constants";

export const getFormInputs = () : string[]=> {
    const formInputs = Object.keys(URL_INPUTS)

    return formInputs
}


export const getGenerateUrlDefaultState = () => {
    const formInputs = getFormInputs()

    const defaultState = formInputs.reduce((first,next)=> ({...first, [next]: ""}),{})

    return defaultState
}
