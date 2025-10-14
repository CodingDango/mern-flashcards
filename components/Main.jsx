export default function Main({ children }) {
  console.log(children);

  return (
  <main className="flex flex-col gap-my-lg py-my-lg px-8">
    {children}
  </main>
  );
}