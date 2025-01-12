import Header from './Header'
import Footer from './Footer'
import { UserDetailContext } from '@/context/UserDetailContext';
import  {useState} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Layaut({ children }) {
  const [userDetail, setUserDetail] = useState()
  // body
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE}>
      <UserDetailContext.Provider value={{userDetail, setUserDetail}} >
    <div className="min-h-screen bg-black  flex flex-col ">
      {/* Encabezado con el logo y el título */}
      <Header />

      {/* Dynamic content passed as children */}
      <div className="mt-8">{children}</div>
      {/* Pie de página */}
      <Footer />
    </div>
    </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
}
