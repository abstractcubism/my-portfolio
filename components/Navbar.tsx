import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.7)] z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-2xl text-indigo-400 font-sans">Leah</span>
        <ul className="flex space-x-6 items-center font-medium text-white font-sans text-lg">
          <li><a href="#about" className="hover:text-gray-300 transition">About</a></li>
          <li><a href="#history" className="hover:text-gray-300 transition">Timeline</a></li>
          <li><a href="#projects" className="hover:text-gray-300 transition">Projects</a></li>
          <li><a href="#contact" className="hover:text-gray-300 transition">Contact</a></li>
          <li><ThemeToggle /></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
