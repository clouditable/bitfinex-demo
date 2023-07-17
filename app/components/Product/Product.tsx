'use client'

/* Core */
import {ChangeEvent, useCallback, useEffect, useState} from 'react'

/* Instruments */
import {
  useSelector,
  useDispatch,
  products,
  fetchProductData,
} from '@/lib/redux'
import styles from './product.module.css'
import {getFormInputs, getGenerateUrlDefaultState} from "@/app/helpers/Product.helpers";
import {BASE_URL, ObjectType, URL_INPUTS} from "@/app/constants/Product.constants";

export const Product = () => {
  const [generateUrlState, setGenerateUrlState] = useState<ObjectType>(getGenerateUrlDefaultState())
  const [generatedUrl, setGeneratedUrl]  = useState("")
  const dispatch = useDispatch()
  const data = useSelector(products)

  const FORM_INPUTS = getFormInputs()
  const getProducts = useCallback(() => {
    dispatch(fetchProductData())
  }, [])

  useEffect(()=>{
    getProducts()
  },[])

  const handleChangeInput = (formInput: string )=> (event : ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value
    setGenerateUrlState({...generateUrlState, [formInput]:value})
  }

  const handleGenerateUrl = () => {
    let searchParams = ""

    Object.keys(generateUrlState).forEach((urlKey ) => {
      const inputValue= generateUrlState[urlKey as keyof ObjectType]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const inputKey = URL_INPUTS[urlKey as keyof ObjectType]

      if(inputValue) {
        searchParams += `${searchParams ? "&" : ""}${inputKey}=${inputValue}`
      }
    });

    const url = `${BASE_URL}?${searchParams}`
    setGeneratedUrl(url)
  }

    return (
      <div>
        <div className={styles.row}>
          <span className={styles.value}>{`Products Count: ${data.length}`}</span>
        </div>

        {FORM_INPUTS.map(formInput => (
          <div key={formInput}>
            <input  className={styles.input} placeholder={formInput} onChange={handleChangeInput(formInput)}/>
          </div>
        ))}

        <div>
          <button className={styles.button} onClick={handleGenerateUrl}>Generate URL</button>
        </div>

        {generatedUrl ?
          <div>
            <a href={generatedUrl} target={"_blank"}>
              <span className={styles.value}>{generatedUrl}</span>
            </a>
          </div>
        : null}

      </div>
    )
}
