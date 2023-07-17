import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import { fetchProducts } from './fetchProduct'

export const fetchProductData = createAppAsyncThunk(
  'products/fetchProducts',
  async () => {

    const response = await fetchProducts()

    return response
  }
)


