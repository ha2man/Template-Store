import axios from "axios";
import { setCategories, setLoading, setError } from '../slices/category';
const API_URL = 'http://localhost:3000/api';

const getCategories = (dispatch, {}) => {
  dispatch(setError(""));
  dispatch(setLoading(true));
  axios.get(API_URL+'/category/list')
  .then(res => {
    dispatch(setLoading(false));
    dispatch(setCategories(res.data.categories));
    return res;
  })
  .catch(error => {
    dispatch(setLoading(false));
    dispatch(setError(error.response));
    return error.response;
  });
}

const CategoryService = {
    getCategories,
}

export default CategoryService;