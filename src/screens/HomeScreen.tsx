import React from 'react';
import { View, Text, ActivityIndicator, FlatList, Button } from 'react-native';

import { useProducts } from '../hooks/useProducts';
import { useAddProduct } from '../hooks/useAddProduct';
import styles from './styles';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { useDeleteProduct } from '../hooks/useDeleteProduct';

const HomeScreen = () => {
  const { isLoading, error, data } = useProducts();
  const { mutate: addProduct, isPending } = useAddProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  if (isLoading) {
    return <ActivityIndicator size="large" color="black" />;
  }

  if (error instanceof Error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data ?? []}
      keyExtractor={(item: any) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View>
          <Button
            title={isPending ? 'Adding...' : 'Add Product'}
            onPress={() =>
              addProduct({
                title: 'iPhone 16',
                price: 999,
                description: 'Apple Smartphone',
                category: 'electronics',
              })
            }
          />
          <Button
            title="Update Product"
            onPress={() =>
              updateProduct({
                id: 1,
                product: {
                  title: 'Updated iPhone',
                  price: 2000,
                },
              })
            }
          />
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>

          <Text numberOfLines={2} style={styles.description}>
            {item.description}
          </Text>

          <Text style={styles.price}>₹ {item.price}</Text>

          <Button title="Delete" onPress={() => deleteProduct(item.id)} />
        </View>
      )}
    />
  );
};

export default HomeScreen;
