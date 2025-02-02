import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { assets } from "../assets/assets";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="page-not-found page-margin">
      <div className="container">
        <div className="w-full min-h-[70vh] flex flex-col items-center justify-center">
          <img width="240px" src={assets.page_not_found} alt="page not found" />
          <h2 className="font-fontMont font-bold text-textColor-heading capitalize">
            Page Not Found
          </h2>
          <p className="font-fontOpenSans mt-2 font-normal leading-normal text-center text-textColor-body">
            The page your looking for doesn&apos;t exists.
          </p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Go to HomePage
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
