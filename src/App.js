import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import PortfolioPage from "@/pages/PortfolioPage";
import MachineryPage from "@/pages/MachineryPage";
import SustainabilityPage from "@/pages/SustainabilityPage";
import ContactPage from "@/pages/ContactPage";
import RequestQuotePage from "@/pages/RequestQuotePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/machinery" element={<MachineryPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/request-quote" element={<RequestQuotePage />} />
          </Routes>
        </Layout>
        <Toaster
          position="bottom-center"
          theme="dark"
          toastOptions={{
            style: {
              background: "#1c1814",
              border: "1px solid rgba(197, 160, 90,0.3)",
              color: "#e8e8e8",
            },
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
