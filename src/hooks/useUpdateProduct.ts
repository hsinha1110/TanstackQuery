import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateProduct = async ({
  id,
  product,
}: {
  id: number;
  product: {
    title: string;
    price: number;
  };
}) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return response.json();
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: data => {
      console.log('UPDATED => ', data);
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};
