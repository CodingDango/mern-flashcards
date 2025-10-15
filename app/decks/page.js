import AppLayout from "@/components/AppLayout";
import Sidebar from "@/components/Sidebar";
import DeckPageMain from "@/components/DeckPageMain";

const DeckPage = () => (
  <AppLayout>
    <Sidebar activeRoute="decks"/>
    <DeckPageMain/>
  </AppLayout>
);

export default DeckPage;