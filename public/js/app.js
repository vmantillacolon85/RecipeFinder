// console.log("recipes");

class App extends React.Component {
    state = {
      name: "",
      image: "",
      ingredients: "",
      instructions: "",
      recipes: [],
  }
    handleChange = event => {
      this.setState({ [event.target.id]: event.target.value })
  }
    handleSubmit = event => {
      event.preventDefault()
      // console.log(this.state)
      axios
        .post("/recipes", this.state)
        .then((response) =>
          // console.log(response));
          this.setState({ recipes: response.data, name: "", image: "", ingredients: "", instructions: "" })
      )
  }

  deleteRecipe = (event) => {
      axios.delete("/recipes/" +
      event.target.value).then((response) => {
          this.setState({
              recipes: response.data,
          })
      })
  }

  updateRecipe = (event) => {
      event.preventDefault()
      const id = event.target.id
      axios.put("/recipes/" + id, this.state).then(response => {
          this.setState({
              recipes: response.data,
              name: "",
              image: "",
              ingredients: "",
              instructions: "",
          })
      })
  }

  componentDidMount = () => {
      axios.get("/recipes").then(response => {
        this.setState({
          recipes: response.data
        })
      })
  }

  render = () => {
    return (
      <div>
        <h2>Create A New Recipe</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" id="name" onChange={this.handleChange} value={this.state.name} />
          <br />
          <label htmlFor="image">Image</label>
          <br />
          <input type="text" id="image" onChange={this.handleChange} value={this.state.image} />
          <br />
          <label htmlFor="name">Ingredients</label>
          <br />
          <input type="text" id="ingredients" onChange={this.handleChange} value={this.state.ingredients} />
          <br />
          <label htmlFor="image">instructions</label>
          <br />
          <input type="text" id="instructions" onChange={this.handleChange} value={this.state.instructions} />
          <br />
          <input type="submit" value="Create New Recipe" />
        </form>
        <h2>List of MaMa's Recipes</h2>
        <ul>
          {this.state.recipes.map((recipe) => {
            return (
              <li key={recipe._id}>
                {recipe.name}
                <img src={recipe.image} alt={recipe.name} />
                <button value={recipe._id} onClick={this.deleteRecipe}>
                  DELETE
                </button>
                <details>
                  <summary>Edit this Recipe</summary>
                  <form id={recipe._id} onSubmit={this.updateRecipe}>
                    <label htmlFor="name">Name</label>
                    <br />
                    <input
                      type="text" id="name"
                      onChange={this.handleChange} />
                    <label htmlFor="image">Image</label>
                    <br />
                    <input
                      type="text"
                      id="image"
                      onChange={this.handleChange}/>
                    <br />
                    <label htmlFor="name">Ingredients</label>
                    <br />
                    <input
                      type="text" id="ingredients"
                      onChange={this.handleChange} />
                    <label htmlFor="image">Instructions</label>
                    <br />
                    <input
                      type="text"
                      id="instructions"
                      onChange={this.handleChange}/>
                    <br />
                    <input type="submit" value="Update Recipe" />
                  </form>
                </details>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App></App>, document.querySelector('main'))
