export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-5 mt-10">
      <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400 text-sm select-none">
        © {new Date().getFullYear()} AI Meeting Notes
      </div>
    </footer>
  );
}
