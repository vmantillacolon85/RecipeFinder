{
  this.state.recipes.map((recipe) => {
    return (
      <li key={recipe._id}>
        <button value={recipe._id} onClick={this.deleteRecipe}>
          DELETE
        </button>
        <details>
          <summary>Edit this Recipe</summary>
          <form id={recipe._id} onSubmit={this.updateRecipe}>
            <label htmlFor="name">Name</label>
            <br />
            <input type="text" id="name" onChange={this.handleChange} />
            <br />
            <label htmlFor="image">Image</label>
            <br />
            <input type="text" id="image" onChange={this.handleChange} />
            <br />
            <label htmlFor="ingredients">Ingredients</label>
            <br />
            <input type="text" id="ingredients" onChange={this.handleChange} />
            <label htmlFor="image">Instructions</label>
            <br />
            <input type="text" id="instructions" onChange={this.handleChange} />
            <br />
            <input type="submit" value="Update Recipe" />
          </form>
        </details>
      </li>
    );
  });
}
