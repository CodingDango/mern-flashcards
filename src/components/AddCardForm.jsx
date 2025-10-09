const AddCardForm = () => {
  return (
    <form className="flex flex-col gap-my-md">
      <label className="flex flex-col gap-my-xs">
        <span>Topic:</span>
        <input  placeholder="Enter the topic..." type="text" className="px-3 py-2 bg-neutral-950 rounded-md"/>
      </label>
      <label className="flex flex-col gap-my-xs">
        <span>Question Text:</span>
        <textarea placeholder="Enter the question..." rows={3} className="rounded-md bg-neutral-950 resize-none px-3 py-2"></textarea>
      </label>
      <label className="flex flex-col gap-my-xs">
        <span>Answer:</span>
        <input placeholder="Enter the answer..." type="text" className="px-3 py-2 bg-neutral-950 rounded-md"/>
      </label>
      <button type="submit" className="w-full button button--primary">Add Card</button>
    </form>
  )
}

export default AddCardForm;