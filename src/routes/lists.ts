import { ListsContainer } from '../containers/index'
import IRoute from './IRoute'

const ListsRoute : IRoute = {
  path: 'lists',
  element: ListsContainer()
}

export default ListsRoute