export default function Main({ children }) {
  return (
  <main className="flex flex-col gap-11 pt-8 px-10 pb-7 modal-overlay">
    {children}
  </main>
  );
}