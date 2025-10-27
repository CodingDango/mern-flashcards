import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlusCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const GenericForm = ({
  schema,
  onSubmit,
  fields,
  submitText,
  isPending,
  pendingText,
  error,
  defaultValues = {}
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ 
    resolver: zodResolver(schema), 
    mode: "onBlur",
    defaultValues
  });

  return (
    <form
      className={`flex flex-col gap-my-md ${
        isPending ? "pointer-events-none" : " "
      }`}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      {fields.map((fieldConfig) => {
        const {
          name,
          label,
          component: FieldComponent,
          ...restOfProps
        } = fieldConfig;
        const error = errors[name];

        return (
          <fieldset
            disabled={isPending}
            key={name}
            className="flex flex-col gap-my-xs"
          >
            {label && (
              <label htmlFor={name} className="font-medium">
                {label}
              </label>
            )}

            <FieldComponent id={name} {...register(name)} {...restOfProps} />

            {error && <p className="text-red-400 text-sm">{error.message}</p>}
          </fieldset>
        );
      })}

      <button
        disabled={isPending}
        type="submit"
        className={`w-full button button--white items-center gap-my-xs mt-my-sm ${
          isPending ? "brightness-75 hover:brightness-75" : ""
        }`}
      >
        {isPending ? (
          <ClipLoader color={"#000000"} size={16} />
        ) : (
          <FaPlusCircle />
        )}
        {isPending ? pendingText : submitText}
      </button>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
};

export default GenericForm;
