import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, description, image, price }) => {
  const { cartItem, addToCart, removeFromCart, API_URL, loading } = useContext(StoreContext);

  if (loading) {
    // Render Skeleton components if loading
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-md">
              <Skeleton className="w-full h-[224px] bg-gray-200 mb-4" />
              <Skeleton className="w-2/3 h-6 bg-gray-200" />
              <Skeleton className="w-1/3 h-4 bg-gray-200 mt-2" />
            </div>
          ))}
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="p-0 relative">
        <img className="w-full h-[224px] object-cover" src={API_URL + '/images/' + image} alt={name} loading="lazy" />
        <div className="add-to-cart-btn">
          {!cartItem[id] ? (
            <Button onClick={() => addToCart(id)} variant="itemBtn" size="icon">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-white p-2 rounded-3xl">
              <Button
                variant="itemBtn"
                size="icon"
                onClick={() => removeFromCart(id)}
                className="bg-red-600/60 text-white"
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <p className="font-fontOpenSans font-bold text-base text-textColor-heading">
                {cartItem[id]}
              </p>
              <Button
                variant="itemBtn"
                size="icon"
                onClick={() => addToCart(id)}
                className="bg-green-600/60 text-white"
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-1 mb-2">
          <CardTitle className="heading3">{name}</CardTitle>
          <img
            className="w-[80px]"
            src={assets.rating_starts}
            alt="raing"
            loading="lazy"
          />
        </div>
        <CardDescription className="body-text mb-2">
          {description}
        </CardDescription>
        <p className="subheading2">&#8377; {price}</p>
      </CardContent>
    </Card>
  );
};

export default FoodItem;
