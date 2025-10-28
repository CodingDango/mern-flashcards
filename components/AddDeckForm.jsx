"use client";

import { deckThemeColors, deckIcons } from "@/libs/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDeck } from "@/libs/actions";
import { z } from "zod";
import { useState } from "react";

import GenericForm from "./GenericForm";
import ColorPalletePicker from "./ColorPalletePicker";
import IconSet from "./IconSet";

const getEnumFromIndices = (arr) => arr.map((val, idx) => idx.toString());

const deckSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Deck title is too short." })
    .max(20),
  colorIdx: z.enum(getEnumFromIndices(deckThemeColors), {
    message: "Please select a color.",
  }),
  iconIdx: z.enum(getEnumFromIndices(deckIcons), {
    message: "Please select an icon.",
  }),
});

const deckFields = [
  {
    name: "title",
    label: "Deck Title",
    component: "input",
    type: "text",
    placeholder: "Enter a title...",
    className: "text-input border border-black-md",
  },
  {
    name: "colorIdx",
    label: "Deck Color",
    component: ColorPalletePicker,
    colors: deckThemeColors,
  },
  {
    name: "iconIdx",
    label: "Deck Icon",
    component: IconSet,
    icons: deckIcons,
  },
];

const AddDeckForm = ({ closeModal }) => {
  const queryClient = useQueryClient();

  const formMethods = useForm({
    resolver: zodResolver(deckSchema),
    mode: "onBlur",
  });

  const { setError, trigger } = formMethods;

  const createDeckMutation = useMutation({
    mutationFn: createDeck,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },

    onSuccess: () => {
      closeModal();
    },
  });

  const handleAddDeck = (formData) => {
    createDeckMutation.mutate(formData, {
      
      onSuccess: () => {
        closeModal();
      },
      
      onError: (err, variables, context) => {
        debugger

        setError('title', {
          type: 'server',
          message: 'This deck title is already taken. Please choose another.'
        });
      },
    });
  };

  return (
    <>
      <GenericForm
        schema={deckSchema}
        fields={deckFields}
        onSubmit={handleAddDeck}
        submitText="Add New Deck"
        onFormClose={closeModal}
        isPending={createDeckMutation.isPending}
        pendingText={"Adding..."}
        formMethods={formMethods}
      />
    </>
  );
};

export default AddDeckForm;
