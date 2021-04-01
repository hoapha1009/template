# Các bước làm Redux với Typescript

src
|---components
|---hooks
|-----|---useActions.ts
|---state
|-----|---action-creators
|-----|----------|---index.ts
|-----|---action-types
|-----|----------|---index.ts
|-----|---actions
|-----|----------|---index.ts
|-----|---reducers
|-----|----------|---index.ts
|-----|----------|---repositoriesReducer.ts
|-----|---index.ts
|-----|---store.ts
|---index.tsx

1. yarn add @types/react-redux react-redux redux redux-thunk
2. Tạo file repositoriesReducer.ts trong thư mục reducers
    - Tạo interface cho state
    - Add type cho reducer
    - Tạo interface cho từng loại type action từ start, success đến error
    - Add type action vào thành 1 `type` chung
    - Tạo enum cho action type: A_B: 'a_b'
3. Chia action-types và actions ra các thư mục để import sử dụng
4. Tạo action-creator để xử lý dispatch các action type
    - Trong đó `import {Dispatch} from 'redux'` để add type cho hàn async dispatch
5. Tạo store.ts
6. Tạo index.ts trong state rồi export store, actionCreators
7. Set up Provider store ở index.tsx trong app
8. Sử dụng dispatch actionCreators.searchRepo trong component
    - Vì dispatch quá dài nên chúng ta có thể tạo custom hooks là useActions.ts sử dụng bindActionCreator để ngắn gọn
    - bindActionCreators(actionCreators, dispatch)
      --> Tạo ra object: {searchRepositories: dispatch(searchRepositories)} ngắn gọn
    - Sử dụng bằng cách gọi nó `const {searchRepo} = useActions(); searchRepo(term)`
9. Khi sử dụng `useSelector(state => state.xxx)` sẽ bị lỗi vì `useSelector` không xác định dc các giá trị trong `state.xxx` đó, nên:
    - `export type RootState = ReturnType<typeof reducers>` ở `index.ts` trong `reducers` và `export * from './reducers'` ở `index.ts`state
    - Tạo `useTypedSelector.ts` ở custom hooks
    - Dùng `useTypedSelector` thay thế `useSelector`
