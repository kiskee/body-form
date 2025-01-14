import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import { useState, useContext } from "react";
import SingInDialog from "./SingIngDialog";
import { UserDetailContext } from "@/context/UserDetailContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { googleLogout } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const navigate = useNavigate();

  const onSubmit = () => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
  };

  const onLogOut = () => {
    googleLogout(); // Cierra sesión de Google
    setUserDetail(null); // Limpia el contexto
    navigate("/", { replace: true }); // Redirige al inicio
  };
  return (
    <header className="bg-black text-white shadow-lg w-full border-b border-lime-400 border-opacity-60 ss:pb-4">
      <div className="container mx-auto  flex items-center justify-between md:flex-col sm:flex-col ss:flex-col md:justify-center md:mb-4">
        {/* Título */}
        <div className="flex items-center relative z-10 ss:flex-col">
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
        {!userDetail ? (
          <nav>
            <ul className="flex space-x-4 flex-row ss:flex-col ss:space-4 ss:text-center">
              <Button
                className="bg-black text-white"
                onClick={() => setOpenDialog(true)}
              >
                Sing In
              </Button>
              <Button
                className="bg-lime-600 text-white"
                onClick={() => setOpenDialog(true)}
              >
                Get Started
              </Button>
            </ul>
          </nav>
        ) : (
          <div className="flex flex-row">
           
            <DropdownMenu >
              <DropdownMenuTrigger asChild className="m-6">
                <Button className="bg-lime-600 text-white">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-24 bg-black flex items-center flex-col">
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                <DropdownMenuItem className="bg-white m-2 hover:bg-lime-500">
                    <Link to="/" >Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="bg-white m-2 hover:bg-lime-500">
                    <Link to="/page1">Full List</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="m-4">
                  <AvatarImage src={userDetail.picture} />
                  <AvatarFallback>{userDetail.given_name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white">
                <DropdownMenuLabel>{userDetail.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogOut}
                  className="bg-lime-400 rounded"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <SingInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </header>
  );
}
