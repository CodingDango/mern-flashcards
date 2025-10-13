import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlusCircle } from "react-icons/fa";

const GenericForm = ({ schema, onSubmit, fields, submitText, onFormClose }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onBlur" }); // Added onBlur mode for better UX

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
    if (onFormClose) onFormClose();
  };

  return (
    <form className="flex flex-col gap-my-md" onSubmit={handleSubmit(handleFormSubmit)}>
      
      {fields.map((fieldConfig) => {
        const { name, label, component: FieldComponent, ...restOfProps } = fieldConfig;
        const error = errors[name];

        return (
          <div key={name} className="flex flex-col gap-my-xs">
            {label && (
              <label htmlFor={name} className="font-medium">
                {label}
              </label>
            )}

            <FieldComponent
              id={name}
              {...register(name)}
              {...restOfProps} 
            />

            {error && (
              <p className="text-red-400 text-sm">{error.message}</p>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="w-full button button--white items-center gap-my-xs mt-my-sm"
      >
        <FaPlusCircle />
        {submitText}
      </button>
    </form>
  );
};

export default GenericForm;