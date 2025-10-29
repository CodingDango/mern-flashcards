import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlusCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const GenericFormAdd = ({
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

  const { register,  handleSubmit, formState: { errors }, control } = formMethods || internalFormMethods;

  return (
    <form
      className={`flex flex-col gap-my-md ${
        isPending ? "pointer-events-none" : " "
      }`}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      {fields.map((fieldConfig) => {
        const { name, label, component: FieldComponent, ...restOfProps } = fieldConfig;

        // Check if the component is one of our custom ones (not a string like 'input')
        const isCustomComponent = typeof FieldComponent !== 'string';

        return (
          <fieldset key={name} className="flex flex-col gap-my-xs">
            {label && <label>{label}</label>}

            {isCustomComponent ? (
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <FieldComponent {...restOfProps} {...field} />
                )}
              />
            ) : (
              <FieldComponent {...register(name)} {...restOfProps} />
            )}

            {/* Error Message */}
            {errors[name] && <span className="text-red-400 text-sm">{errors[name].message}</span>}
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

export default GenericFormAdd;
