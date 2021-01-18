class App extends React.Component {
  state = {
    name: "",
    image: "",
    ingredients: "",
    instructions: "",
    recipes: [],
    recipe: {},
  };

  handleChange = (event) => {
    console.log("anything");
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/recipes", this.state).then((response) =>
      // console.log(response));
      this.setState({
        recipes: response.data,
        name: "",
        image: "",
        ingredients: "",
        instructions: "",
      })
    );
    window.location.reload();
  };

  componentDidMount = () => {
    axios.get("/recipes").then((response) => {
      this.setState({
        recipes: response.data,
      });
    });
  };

  render = () => {
    return (
      <div className="container">
        <h2>Add A New Recipe</h2>
        <details>
          <summary>Information</summary>
          <form className="create" onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              id="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <br />
            <label htmlFor="image">Image</label>
            <br />
            <input
              type="text"
              id="image"
              onChange={this.handleChange}
              value={this.state.image}
            />
            <br />
            <label htmlFor="name">Ingredients</label>
            <br />
            <input
              type="text"
              id="ingredients"
              onChange={this.handleChange}
              value={this.state.ingredients}
            />
            <br />
            <label htmlFor="instructions">instructions</label>
            <br />
            <input
              type="text"
              id="instructions"
              onChange={this.handleChange}
              value={this.state.instructions}
            />
            <br />
            <input type="submit" id="submit" value="Create New Recipe" />
          </form>
        </details>
        <br />
        <h2>List of MaMa's Recipes</h2>
        {this.state.recipes.length > 0 ? (
          <Carousel
            appState={this.state}
            recipes={this.state.recipes}
            update={this.updateRecipe}
            delete={this.deleteRecipe}
            change={this.handleChange}
          />
        ) : null}
      </div>
    );
  };
}

class Carousel extends React.Component {
  state = {
    recipe: this.props.recipes[0],
    currentIndex: 0,
    recipes: this.props.recipes,
    // delete: this.props.delete,
    // update: this.props.update,
    change: this.props.change,
  };

  deleteRecipe = (event) => {
    axios.delete("/recipes/" + event.target.value).then((response) => {
      this.setState({
        recipes: response.data,
      });
    });
    window.location.reload();
  };

  updateRecipe = (event) => {
    // console.log(event);
    event.preventDefault();
    console.log("these", this.props.appState);
    const id = event.target.id;
    axios.put("/recipes/" + id, this.props.appState).then((response) => {
      this.setState({
        recipes: response.data,
        name: "",
        image: "",
        ingredients: "",
        instructions: "",
      });
    });
    window.location.reload();
  };

  nextIndex = () => {
    if (this.state.currentIndex === this.props.recipes.length - 1) {
      this.setState({
        recipe: this.props.recipes[0],
        currentIndex: 0,
      });
    } else {
      this.setState({
        recipe: this.props.recipes[this.state.currentIndex + 1],
        currentIndex: this.state.currentIndex + 1,
      });
    }
  };

  prevIndex = () => {
    if (this.state.currentIndex === 0) {
      this.setState({
        recipe: this.props.recipes[this.props.recipes.length - 1],
        currentIndex: this.props.recipes.length - 1,
      });
    } else {
      this.setState({
        recipe: this.props.recipes[this.state.currentIndex - 1],
        currentIndex: this.state.currentIndex - 1,
      });
    }
  };

  render = () => {
    return (
      <div className="carousel">
        <div className="btns">
          <button onClick={this.prevIndex} id="prevbtn">
            Prev
          </button>
          <button onClick={this.nextIndex} id="nextbtn">
            Next
          </button>
        </div>
        <div className="card">
          <img src={this.state.recipe.image} />
          <h2>{this.state.recipe.name}</h2>
          <details>
            <summary> More Info </summary>
            <li key={this.state.recipe._id}>
              <details>
                <summary>Instructions</summary>
                <textarea>{this.state.recipe.instructions}</textarea>
              </details>
              <details>
                <summary>Edit this Recipe</summary>
                <form id={this.state.recipe._id} onSubmit={this.updateRecipe}>
                  <label htmlFor="name">Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder={this.state.recipe.name}
                    id="name"
                    onChange={this.props.change}
                  />
                  <br />
                  <label htmlFor="image">Image</label>
                  <br />
                  <input
                    type="text"
                    placeholder={this.state.recipe.image}
                    id="image"
                    onChange={this.props.change}
                  />
                  <br />
                  <label htmlFor="ingredients">Ingredients</label>
                  <br />
                  <input
                    type="text"
                    placeholder={this.state.recipe.ingredients}
                    id="ingredients"
                    onChange={this.props.change}
                  />
                  <br />
                  <label htmlFor="image">Instructions</label>
                  <br />
                  <input
                    type="text"
                    placeholder={this.state.recipe.instructions}
                    id="instructions"
                    onChange={this.props.change}
                  />
                  <br />
                  <input type="submit" id="submit" value="Update Recipe" />
                </form>
                <button
                  value={this.state.recipe._id}
                  onClick={this.deleteRecipe}
                >
                  DELETE
                </button>
              </details>
            </li>
          </details>
        </div>
      </div>
    );
  };
}

ReactDOM.render(<App></App>, document.querySelector("main"));
