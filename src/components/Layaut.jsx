import Header from './Header'
import Footer from './Footer'

export default function Layaut({ children }) {
  // body
  return (
    <div className="min-h-screen bg-black  flex flex-col ">
      {/* Encabezado con el logo y el título */}
      <Header />

      {/* Dynamic content passed as children */}
      <div className="mt-8">{children}</div>
      {/* Pie de página */}
      <Footer />
    </div>
  );
}
