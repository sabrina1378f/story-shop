import {  createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import {apiCallBegan} from './api'

const slice=createSlice({
name:'books',
initialState:{
  modalThings:{
    image:'',description:'',title:'',price:0,stock:0
  },
  login:false,
    list:[],
    item:[],
    loading:false,
    lastFetch: null
},
reducers:{
  booksRequested: (books, action) => {books.loading = true},
  booksReceived: (books, action) => {books.list = action.payload; books.loading = false ; books.lastFetch = Date.now();},
  booksRequestFailed: (books, action) => { books.loading = false},  
  bookReceived: (state, action) => {state.item = action.payload; state.loading = false ; state.lastFetch = Date.now();},
  bookAdded:(state,action)=>{ state.list.push(action.payload)},
  bookUpdated:(state,action)=>{
            const index = state.list.findIndex(book => book.id === action.payload.id);
            state.list[index] = action.payload;
    },
  bookStockUpdated:(state,action)=>{
  const index = state.list.findIndex(book => book.id === action.payload.id);
            state.list[index] = action.payload;
},
  bookRemoved:(state,action)=>{
      const newList= state.list.filter(item => item.id !== action.payload.id)
      state.list=newList
    },

imageRecieved:(state, action) => {state.modalThings.image=action.payload.image },
titleRecieved:(state, action) => {state.modalThings.title=action.payload.title },
descriptionRecieved:(state, action) => {state.modalThings.description=action.payload.description },
stockRecieved:(state, action) => {state.modalThings.stock=action.payload.stock },
priceRecieved:(state, action) => {state.modalThings.price=action.payload.price }  ,

loginSuccessfully:(state,action)=>{state.login=true},


}
})

export const {booksRequested,bookAdded,booksReceived,booksRequestFailed,bookUpdated,
  bookGet,bookRemoved,bookReceived,bookStockUpdated,
  priceRecieved,stockRecieved,descriptionRecieved,titleRecieved,imageRecieved,loginSuccessfully
}=slice.actions
export default slice.reducer


// .....................................Action API Calls..................................
const url = "/products";

export const loadBooks = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.books;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
    url,
    onStart: booksRequested.type,
    onSuccess: booksReceived.type,
    onFailed:booksRequestFailed.type
  }))
}

export const getBookById = (id) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
    url:url+'/'+id,
    onStart: booksRequested.type,
    onSuccess: bookReceived.type,
    onFailed:booksRequestFailed.type
  }))
}

export const addBook = book =>
    apiCallBegan({
      url,
      method: "post",
      data: book,
      onSuccess: bookAdded.type
    });

export const updateBook=(id,book)=>  apiCallBegan({
      url:url+'/'+id ,
      method: "put",
      data:book,
      onSuccess: bookUpdated.type
    });

export const updateBookStock=(id,stock) =>
 apiCallBegan({
  url:url+'/'+id ,
  method: "put",
  data:stock,
  onSuccess: bookStockUpdated.type
})

    export const getChoosenBook = state => state.entities.books.item