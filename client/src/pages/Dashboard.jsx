import '../styles/Dashboard.css';
import SalesStatDistChart from './SalesStatDistChart';
import CollectionDueChart from './CollectionDueChart';
import TopFiveSupChart from './TopFiveSupChart';
import TopFiveFastMovingItemsChart from './TopFiveFastMovingItemsChart';

function Dashboard() {
  return (
    <>
      <div className="dash-layout-12">
        <SalesStatDistChart />
        <TopFiveFastMovingItemsChart />
      </div>
      <div className="dash-layout-21">
        <TopFiveSupChart />
        <CollectionDueChart />
      </div>
    </>
    
  );
}

export default Dashboard;
