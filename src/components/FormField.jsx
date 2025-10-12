import _ from 'lodash';

const FormField = ({labelText, errorMsg, input, inputAttributes}) => {
  return (
    <label className="flex flex-col gap-my-xs">
      <span>{_.startCase(labelText)}:</span>

      {input === 'input' && (
        <input {...inputAttributes} />
      )}

      {input === 'textarea' && (
        <textarea {...inputAttributes}></textarea>
      )}

      {input === 'radio' && (
        <input/>
      )}

      {errorMsg && <span className="text-red-400">{errorMsg}</span>}
    </label>
  );
}

export default FormField;