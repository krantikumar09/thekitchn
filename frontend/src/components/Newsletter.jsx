import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  return (
    <section className="newsletter  py-20 bg-main-accent/60" id="contactUs">
      <div className="container">
        <div className="max-w-sm w-full mx-auto text-center">
          <h1 className="heading1 mb-2">Deliciousness to your inbox</h1>
          <p className="body-text">
            Enjoy weekly hand pciked recipes and recommendations
          </p>

          <form className="mt-6 mb-2 relative h-auto md:h-10 md:rounded-md bg-transparent md:bg-white">
            <Input
              type="email"
              placeholder="Enter email"
              className="mb-2 md:mb-0 h-10 md:h-full static md:absolute md:inset-0 w-full  outline-none ring-inset border-none shadow-none font-fontOpenSans font-normal text-sm md:text-base text-textColor-heading bg-white md:bg-transparent"
              required
            />
            <Button
              type="submit"
              className="w-full md:w-auto md:absolute md:top-1/2 md:-translate-y-1/2 md:right-0"
            >
              JOIN
            </Button>
          </form>
          <p className="body-text text-[10px]">
            By joining our newsletter you agree to our{" "}
            <span className="underline underline-offset-4">Terms and Condition</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
