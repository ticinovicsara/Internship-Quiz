export const AddCategoryPage = () => {
  return (
    <div>
      <h1>Add Category</h1>
      <form>
        <label>
          Category Name:
          <input type="text" name="categoryName" />
        </label>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};
