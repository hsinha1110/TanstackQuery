import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
  const fetchProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return { isLoading, error, data };
};
