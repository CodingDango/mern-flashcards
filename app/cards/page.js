import AppLayout from "@/components/AppLayout";
import FlashcardsMain from "@/components/FlashcardsMain";
import Sidebar from "@/components/Sidebar";

const FlashcardsPage = () => (
  <AppLayout>
    <Sidebar activeRoute="cards"/>
    <FlashcardsMain/>
  </AppLayout>
);

export default FlashcardsPage;