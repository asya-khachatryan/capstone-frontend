import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createBrowserHistory } from 'history'
import { combineReducers } from 'redux'
import { createReduxHistoryContext } from 'redux-first-history'

import specializationReducer from './redux/specializationSlice'
import talentReducer from '@redux/talentSlice'

import { docsApi } from './services/docs'
import authReducer from './redux/authSlice'

// Setup redux-first-history
const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() })
export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([docsApi.middleware, routerMiddleware]),
  reducer: combineReducers({
    auth: authReducer,
    specialization: specializationReducer,
    talent: talentReducer,
    router: routerReducer,
    [docsApi.reducerPath]: docsApi.reducer,
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
export const history = createReduxHistory(store)
