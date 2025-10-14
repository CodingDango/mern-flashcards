import AppLayout from "@/components/AppLayout";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";

const DashboardPage = () => (
  <AppLayout>
    <Sidebar activeRoute="dashboard"/>
    <Dashboard/>
  </AppLayout>
);

export default DashboardPage;