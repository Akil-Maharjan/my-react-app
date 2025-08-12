import { Button } from "@material-tailwind/react";
import { useRemoveProductMutation } from "./productApi.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function RemoveProduct({ id }) {
  const [removeProduct, { isLoading }] = useRemoveProductMutation();

  const { user } = useSelector((state) => state.userSlice);

  const handleRemove = async () => {
    try {
      await removeProduct({
        token: user.token,
        id: id
      }).unwrap();
      toast.success('Product removed successfully');
    } catch (err) {
      toast.error(err.data.message);
    }
  }

  return (
    <Button onClick={handleRemove} loading={isLoading} className="px-3" size="sm" color="pink">
      <i className="fas fa-trash" />
    </Button>
  )
}
