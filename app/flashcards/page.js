import AppLayout from "@/components/AppLayout";
import Sidebar from "@/components/Sidebar";
import FlashcardsProvider from "@/context/FlashcardsProvider";
import DeckPageMain from "@/components/DeckPageMain";

const DeckPage = () => (
  <AppLayout>
      <Sidebar/>
      <FlashcardsProvider>
        <DeckPageMain/>
      </FlashcardsProvider>
  </AppLayout>
);

export default DeckPage;