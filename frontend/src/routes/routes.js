import HomePage from './HomePage';
import ContestPage from './ContestPage';
import InsightsPage from './InsightsPage';
import '../App.css';


const routes = [
  { path: '/', component: HomePage },
  { path: '/contest', component: ContestPage },
  { path: '/insights', component: InsightsPage },
];

export default routes;
