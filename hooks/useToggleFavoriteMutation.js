import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleFavoriteMutation = (
  // We pass in the specifics as arguments
  queryKey,       // e.g., ['decks'] or ['cards']
  mutationFn,     // e.g., toggleDeckFavorite or toggleCardFavorite
  dataKey         // The name of the array in our data structure, e.g., 'decks' or 'cards'
) => {
  const queryClient = useQueryClient();

  // The hook returns the result of useMutation, configured with our generic logic
  return useMutation({
    mutationFn: mutationFn, // Use the specific API function we passed in

    // The onMutate is now generic!
    onMutate: async ({ itemId }) => { // We'll call it `itemId` to be generic
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      debugger

      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData || !oldData.data || !oldData.data[dataKey]) {
          return oldData;
        }

        const previousItems = oldData.data[dataKey];
        const updatedItems = previousItems.map((item) => {
          if (String(item.id) === String(itemId)) {
            return { ...item, isFavorite: !item.isFavorite };
          }
          return item;
        });
        
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