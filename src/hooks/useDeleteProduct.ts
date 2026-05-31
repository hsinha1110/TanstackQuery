import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteProduct = async (id: number) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }

  return response.json();
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,

    onSuccess: data => {
      console.log('DELETED => ', data);

      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },

    onError: error => {
      console.log('ERROR => ', error);
    },
  });
};
