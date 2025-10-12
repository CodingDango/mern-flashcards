// GenericForm.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlusCircle } from "react-icons/fa";
import FormField from "./FormField";

// This component is completely reusable!
const GenericForm = ({ schema, onSubmit, fields, submitText, onFormClose }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const handleFormSubmit = (data) => {
    onSubmit(data); 
    reset();
    if (onFormClose) onFormClose();
  };

  return (
    <form className="flex flex-col gap-my-md" onSubmit={handleSubmit(handleFormSubmit)}>
      
      {fields.map((field) => (
        <FormField
          key={field.name}
          labelText={field.labelText}
          errorMsg={errors[field.name]?.message}
          input={field.inputComponent} 
          inputAttributes={{
            ...register(field.name),
            placeholder: field.placeholder,
            className: field.className,
            ...field.inputAttributes, 
          }}
        />
      ))}

      <button
        type="submit"
        className="w-full button button--white items-center gap-my-xs"
      >
        <FaPlusCircle />
        {submitText}
      </button>
    </form>
  );
};

export default GenericForm;