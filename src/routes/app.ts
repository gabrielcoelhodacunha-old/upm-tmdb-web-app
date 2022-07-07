import App from '../App'
import DefaultRoute from './default'
import IRoute from './IRoute'
import ListsRoute from './lists'
import LoginRoute from './login'
import SearchRoute from './search'

const isLogged = true

const AppRoute : IRoute = {
  path: '/',
  element: App(),
  children: [
    isLogged ? DefaultRoute("search") : DefaultRoute("login"),
    LoginRoute,
    SearchRoute,
    ListsRoute
  ]
}

export default AppRoute