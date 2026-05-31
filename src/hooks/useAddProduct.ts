import { useMutation, useQueryClient } from '@tanstack/react-query';

const addProduct = async (product: {
  title: string;
  price: number;
  description?: string;
  category?: string;
}) => {
  const response = await fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to add product');
  }

  return response.json();
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,

    onSuccess: data => {
      console.log('SUCCESS => ', data);

      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },

    onError: error => {
      console.log('ERROR => ', error);
    },
  });
};
