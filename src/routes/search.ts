import { SearchContainer } from '../containers/index'
import IRoute from './IRoute'

const SearchRoute : IRoute = {
  path: 'search',
  element: SearchContainer()
}

export default SearchRoute