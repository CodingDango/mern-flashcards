import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveMutation = (
  queryKey,       // e.g., ['decks'] or ['cards']
  mutationFn,     // e.g., toggleDeckFavorite or toggleCardFavorite
  dataKey         // The name of the array in our data structure, e.g., 'decks' or 'cards'
) => {
  const queryClient = useQueryClient();

  // The hook returns the result of useMutation, configured with our generic logic
  return useMutation({
    mutationFn: mutationFn, // Use the specific API function we passed in
    
    onMutate: async ({ itemId }) => { // We'll call it `itemId` to be generic
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData || !oldData.data || !oldData.data[dataKey]) {
          return oldData;
        }

        const previousItems = oldData.data[dataKey];
        const updatedItems = previousItems.filter((item) => String(item.id) !== String(itemId));
        
        let newDataPayload;
        if (dataKey === 'cards') {
            newDataPayload = { cards: updatedItems, decks: oldData.data.decks };
        } else { // Assuming 'decks'
            newDataPayload = { decks: updatedItems };
        }

        return {
          ...oldData,
          data: newDataPayload,
        };
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};