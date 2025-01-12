import AnalyticsInfo from "../../components/Dashboard/AnalyticsInfo";
import EarningGrowth from "../../components/Dashboard/EarningGrowth";
import SubscriptionGrowth from "../../components/Dashboard/SubscriptionGrowth";
import UserGrowth from "../../components/Dashboard/UserGrowth";

function DashboardPage() {
  return (
    <div>
      <AnalyticsInfo />
      <div className="grid grid-cols-1 md:grid-cols-1 mmd:grid-cols-1 lg:grid-cols-2 gap-5">
        <UserGrowth />
        <SubscriptionGrowth />
      </div>
      <EarningGrowth />
    </div>
  );
}

export default DashboardPage;
