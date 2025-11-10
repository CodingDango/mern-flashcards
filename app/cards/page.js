import AppLayout from "@/components/AppLayout";
import FlashcardsMain from "@/components/FlashcardsMain";

const FlashcardsPage = () => (
  <AppLayout activeRoute="cards">
    <FlashcardsMain/>
  </AppLayout>
);

export default FlashcardsPage;