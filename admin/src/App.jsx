import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import "./output.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./pages/PageNotFound";

export const API_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <>
      <SidebarProvider>
        <ToastContainer />
        <AppSidebar />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              The Kitchn. Admin
            </div>
          </header>

          <section className="p-4 pt-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/all-products" element={<ProductList />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="*" element={<PageNotFound/>}/>
            </Routes>
          </section>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;
