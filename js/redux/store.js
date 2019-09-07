import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' //redux本身不支持异步，我们可以使用redux-thunk中间件实现异步
import { composeWithDevTools } from 'redux-devtools-extension';  //开发辅助工具
import reducer from './reducer'

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));