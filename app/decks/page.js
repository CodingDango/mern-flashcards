import AppLayout from "@/components/AppLayout";
import DeckPageMain from "@/components/DeckPageMain";

const DeckPage = () => (
  <AppLayout activeRoute="decks">
    <DeckPageMain/>
  </AppLayout>
);

export default DeckPage;