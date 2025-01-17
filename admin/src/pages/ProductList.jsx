import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../App";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import Heading from "../components/Heading";

const ProductList = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get(`${API_URL}/api/food/list`);
    console.log(res.data);
    if (res.data.success) {
      setList(res.data.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const removeFood = async (foodId) => {
    const res = await axios.post(`${API_URL}/api/food/remove`, { id: foodId });
    await fetchList();

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <Heading heading="All Products"/>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-28">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {list.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <img
                    className="max-w-20 w-full h-auto object-cover rounded-md"
                    src={`${API_URL}/images/` + item.image}
                    alt={item.name}
                    loading="lazy"
                  />
                </TableCell>
                <TableCell className="font-bold text-textColor-heading">
                  {item.name}
                </TableCell>
                <TableCell className="text-center">{item.category}</TableCell>
                <TableCell className="text-center">
                  &#8377; {item.price}
                </TableCell>
                <TableCell className="">
                  <X
                    onClick={() => removeFood(item._id)}
                    className="w-4 h-4 mx-auto cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;
