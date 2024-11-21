// components/Header.js
const Header = () => {
    return (
      <header className="bg-yellow-400 p-4 flex justify-between items-center">
        <img src="/path/to/logo.png" alt="Logo" className="h-10" />
        <div className="text-sm font-medium">
          <a href="/login" className="text-gray-800 hover:text-gray-600">Login</a>
        </div>
      </header>
    );
  };
  
  export default Header;
  