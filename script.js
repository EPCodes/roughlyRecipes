function toggleMenu() {
    var x = document.getElementById("nav-menu");
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  } 

  fetch('recipeCollection.json')
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(recipe => {
    const titleEl = document.getElementById("recipe-title");
    const descEl = document.getElementById("recipe-description");
    const ingredientsList = document.getElementById("ingredients-list");
    const instructionsList = document.getElementById("instructions-list");

    if (titleEl && descEl && ingredientsList && instructionsList) {
      titleEl.textContent = recipe.title;
      descEl.textContent = recipe.description;

      recipe.ingredients.forEach(item => {
        const li = document.createElement("li");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.setAttribute("aria-label", item); // accessibility

        label.appendChild(checkbox);
        label.append(" " + item);
        li.appendChild(label);
        ingredientsList.appendChild(li);
      });

      recipe.instructions.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        instructionsList.appendChild(li);
      });
    }
  })
  .catch(error => {
    console.error("Error loading recipe:", error);
  });
