import AppLayout from "@/components/AppLayout";
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => (
  <AppLayout activeRoute={'dashboard'}>
    <Dashboard/>
  </AppLayout>
);

export default DashboardPage;