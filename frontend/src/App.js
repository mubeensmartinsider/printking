import "@/App.css";
import "@/styles/responsive.css";
import "@/styles/theme.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeContext";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const MachineryPage = lazy(() => import("@/pages/MachineryPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const RequestQuotePage = lazy(() => import("@/pages/RequestQuotePage"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));

function PageFallback() {
  return <div className="min-h-[50vh] bg-surface-base" aria-hidden="true" />;
}

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<PageFallback />}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              {/* No separate services page — the old URL redirects to Products */}
              <Route path="/services" element={<Navigate to="/products" replace />} />
              <Route path="/machinery" element={<MachineryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/request-quote" element={<RequestQuotePage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/case-studies" element={<Navigate to="/blog" replace />} />
              <Route path="/blog" element={<BlogPage />} />
              </Routes>
            </Suspense>
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
    </ThemeProvider>
  );
}

export default App;