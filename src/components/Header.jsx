import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-black text-white shadow-lg w-full border-b border-lime-400 border-opacity-60">
      <div className="container mx-auto  flex items-center justify-between md:flex-col sm:flex-col ss:flex-col md:justify-center">
        {/* Título */}
        <div className="flex items-center relative z-10">
          <img
            src={logo}
            alt="EthLand Logo"
            className="w-24 h-24 mr-4 
              transition-all duration-300 
              hover:rotate-6 
              hover:scale-110 
              filter hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.7)]"
          />
          <h1
            className="text-3xl font-bold text-lime-600
            bg-clip-text 
            text-transparent 
            bg-gradient-to-r 
            from-lime-400 
            to-lime-600 
            drop-shadow-[0_2px_4px_rgba(245,158,11,0.3)] sss:hidden"
          >
            Body-Form
          </h1>
        </div>

        {/* Navegación */}
        <nav>
          <ul className="flex space-x-4 flex-row ss:flex-col ss:space-4 ss:text-center">
            
            <Button className="bg-black text-white">
              <Link href="/login">Sing In</Link>
            </Button>
            <Button className="bg-lime-600 text-white">
              <Link href="/login">Get Started</Link>
            </Button>
          </ul>
        </nav>
      </div>
    </header>
  );
}
