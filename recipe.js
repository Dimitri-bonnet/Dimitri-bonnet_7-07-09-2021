class Recipe {
    constructor(id, name, servings, ingredients, time, description, appliance, ustensils) {
            this.id = id,
            this.name = name,
            this.servings = servings,
            this.ingredients = ingredients,
            this.time = time,
            this.description = description,
            this.appliance = appliance,
            this.ustensils = ustensils
    }
    templateRecipe() {
        const recipeContainer = document.createElement("div");
        recipeContainer.classList.add("recipe");
        const imgRecipe = document.createElement("div");
        imgRecipe.classList.add("recipe__img");
        const recipeContent = document.createElement("div");
        recipeContent.classList.add("recipe__content");
        const titleContent = document.createElement("div");
        titleContent.classList.add("title");
        const title = document.createElement("p");
        title.append(this.name);
        const timeRecipe = document.createElement("p");
        const iconTime = document.createElement("i");
        iconTime.classList.add("far", "fa-clock")
        timeRecipe.append(iconTime, this.time, " min");
        const infoRecipe = document.createElement("div");
        infoRecipe.classList.add("info");
        const ingredientContent = document.createElement("div");
        ingredientContent.classList.add('ingredients')
        const ingredientList = document.createElement("ul");
        this.ingredients.forEach((i) => {
            const li = document.createElement("li");
            const ingredient = document.createElement("p")
            const mesure = document.createElement("p")
            if (i.unit != undefined) {
                mesure.append(i.quantity, i.unit)
                ingredient.append(i.ingredient, " : ")
            } else if (i.quantity != undefined) {
                mesure.append(i.quantity)
                ingredient.append(i.ingredient, " : ")
            } else {
                ingredient.append(i.ingredient)
            }
            li.append(ingredient, mesure)
            ingredientList.append(li)
        })
        const descriptionContent = document.createElement("div")
        descriptionContent.classList.add("desc")
        const desc = document.createElement("p")
        desc.append(this.description)
        descriptionContent.append(desc)
        ingredientContent.append(ingredientList)
        titleContent.append(title, timeRecipe)
        infoRecipe.append(ingredientContent, descriptionContent)
        recipeContent.append(titleContent, infoRecipe)
        recipeContainer.append(imgRecipe, recipeContent)
        return recipeContainer
    }
}