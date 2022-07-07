import { LoginContainer } from '../containers/index'
import IRoute from './IRoute'

const LoginRoute : IRoute = {
  path: 'login',
  element: LoginContainer()
}

export default LoginRoute