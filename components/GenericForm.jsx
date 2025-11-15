import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlusCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { ErrorMessage } from '@hookform/error-message';

const GenericForm = ({
  schema,
  onSubmit,
  fields,
  submitText,
  isPending,
  pendingText,
  formMethods,
  error = null,
  defaultValues = {}
}) => {

  const internalFormMethods = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues
  });

  const { register, handleSubmit, formState: { errors } } = internalFormMethods || formMethods;

  console.log('defaultValues', defaultValues);

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

            <FieldComponent id={name} {...register(name)} {...restOfProps} defaultValue={defaultValues[name]} />
            <span className="text-red-400 text-sm">
              <ErrorMessage errors={errors} name={name}/>
            </span>
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
