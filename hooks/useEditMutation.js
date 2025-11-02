import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useEditMutation(
  queryKey, 
  mutationFn, 
  dataKey
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFn,
    // data is title, icon, and color
    onMutate: async ({ itemId, newItemData }) => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData || !oldData.data || !oldData.data[dataKey]) {
          return oldData;
        }

        const updatedItems = [...oldData.data[dataKey]];
        const itemIdx = updatedItems.findIndex((item) => item.id === itemId);

        if (itemIdx >= 0) {
          updatedItems[itemIdx] = { ...updatedItems[itemIdx], ...newItemData };
        }

        let newDataPayload;
        if (dataKey === "cards") {
          newDataPayload = { cards: updatedItems, decks: oldData.data.decks };
        } else {
          // Assuming 'decks'
          newDataPayload = { decks: updatedItems };
        }

        return {
          ...oldData,
          data: newDataPayload,
        };
      });

      return { previousData };
    },
    onError: (err, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
