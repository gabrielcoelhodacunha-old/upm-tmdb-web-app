import { NavigationContainer } from '../containers';
import ListsRoute from './lists';
import SearchRoute from './search';
import TRoute from './TRoute';

const NavigationRoute: TRoute = {
	element: <NavigationContainer />,
	children: [SearchRoute, ListsRoute],
};

export default NavigationRoute;
