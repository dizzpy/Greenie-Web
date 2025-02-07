import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Product Details for ID: {id}</h1>
    </div>
  );
};

export default ProductDetails;
