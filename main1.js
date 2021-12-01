class HomePagee {
    constructor(service) {
        this.service = service
        this.recipes
        this.saveInitialRecipes
        this.ingredientsRecipes = []
        this.appareilsRecipes = []
        this.ustensilsRecipes = []
        this.ingredientTags = []
        this.appareilTags = []
        this.ustensilTags = []
        this.mainInputValue
        /* HTML ELS */
        this.containerDisplayRecipes = document.querySelector('.recipes');
        /* INPUT */
        this.mainInputSearch = document.querySelector('#search');
        this.inputLstIngredientsRecipes = document.querySelector(".input .inputIngredients")
        this.inputLstAppareilsRecipes = document.querySelector(".input .inputAppareil")
        this.inputLstUstensilesRecipes = document.querySelector(".input .inputUstensiles")
        /* LIST  */
        this.listIngredientsRecipes = document.querySelector('.listIngredients ul')
        this.listAppareilsRecipes = document.querySelector(".listAppareils ul")
        this.listUstensilsRecipes = document.querySelector(".listUstensiles ul")
    }
    /* INIT */
    init() {
        this.getRecipes()
        this.saveInitialRecipes = this.recipes
        this.displayManagement(this.recipes)
        this.eventMainInput()
        this.eventIngredientInput()
        this.eventAppareilInput()
        this.eventUstensilsInput()
    }
    /* GET ELS */
    getRecipes() {
        this.recipes = this.service.getRecipes()
    }
    getIngredients(recipes) {
        recipes.forEach((i) => {
            i.ingredients.forEach((i) => {
                this.ingredientsRecipes.push(i.ingredient)
            })
        })
        this.ingredientsRecipes = [...new Set(this.ingredientsRecipes)]
    }
    getAppareils(recipes) {
        recipes.forEach((a) => {
            this.appareilsRecipes.push(a.appliance)
        })
        this.appareilsRecipes = [...new Set(this.appareilsRecipes)]
    }
    getUstensils(recipes) {
        recipes.forEach((u) => {
            u.ustensils.forEach((u) => {
                this.ustensilsRecipes.push(u)
            })
        })
        this.ustensilsRecipes = [...new Set(this.ustensilsRecipes)]
    }
    /* DISPLAY */
    displayManagement(arr) {
        const recipesItem = document.querySelectorAll(".recipe")
        const listsItem = document.querySelectorAll(".list ul li")
        this.removeElements(recipesItem)
        this.removeElements(listsItem)
        this.ingredientsRecipes = []
        this.getIngredients(arr)
        this.appareilsRecipes = []
        this.getAppareils(arr)
        this.ustensilsRecipes = []
        this.getUstensils(arr)
        this.displayRecipes(arr)
        this.displayIngredientsRecipes()
        this.displayAppareilsRecipes()
        this.displayUstensilsRecipes()

    }
    displayRecipes(recipes) {
        const noRecipes = document.querySelector('.noRecipes')
        if (recipes.length) {
            noRecipes.style.display = "none"
            recipes.forEach((recipe) => {
                this.containerDisplayRecipes.append(recipe.templateRecipe())
            })
        } else {
            noRecipes.style.display = "block"
        }

    }
    displayIngredientsRecipes() {
        this.ingredientsRecipes.forEach((i) => {
            this.listIngredientsRecipes.append(this.templateElList(i))
        })
    }
    displayAppareilsRecipes() {
        this.appareilsRecipes.forEach((i) => {
            this.listAppareilsRecipes.append(this.templateElList(i))
        })
    }
    displayUstensilsRecipes() {
        this.ustensilsRecipes.forEach((i) => {
            this.listUstensilsRecipes.append(this.templateElList(i))
        })
    }
    displayList(arr, list, e) {
        if (e.path[0].classList[0] === "inputIngredients") {
            const itemsListIngredient = document.querySelectorAll(".listIngredients ul li")
            this.removeElements(itemsListIngredient)
        } else if (e.path[0].classList[0] === "inputAppareil") {
            console.log('appareil');
            const itemsListAppareil = document.querySelectorAll(".listAppareils ul li")
            this.removeElements(itemsListAppareil)
        } else if (e.path[0].classList[0] === "inputUstensiles") {
            const itemsListUstensiles = document.querySelectorAll(".listUstensiles ul li")
            this.removeElements(itemsListUstensiles)
        }
        arr.forEach((el) => {
            list.append(this.templateElList(el))
        })
    }
    removeElements(arr) {
        arr.forEach((i) => {
            i.remove()
        })
    }
    /* EVENT LISTENER */
    eventMainInput() {
        this.mainInputSearch.addEventListener("input", (e) => {
            this.mainInputValue = this.mainInputSearch.value
            this.filterRecipes(this.recipes)
        })
    }
    eventIngredientInput() {
        this.inputLstIngredientsRecipes.addEventListener('input', (e) => {
            const resultat = this.filteredBySecondaryInputs(this.ingredientsRecipes, this.inputLstIngredientsRecipes.value)
            this.displayList(resultat, this.listIngredientsRecipes, e)
        })
    }
    eventAppareilInput() {
        this.inputLstAppareilsRecipes.addEventListener('input', (e) => {
            const resultat = this.filteredBySecondaryInputs(this.appareilsRecipes, this.inputLstAppareilsRecipes.value)
            this.displayList(resultat, this.listAppareilsRecipes, e)
        })
    }
    eventUstensilsInput() {
        this.inputLstUstensilesRecipes.addEventListener('input', (e) => {
            const resultat = this.filteredBySecondaryInputs(this.ustensilsRecipes, this.inputLstUstensilesRecipes.value)
            this.displayList(resultat, this.listUstensilsRecipes, e)
        })
    }
    eventAddTag(e, value) {
        if (e.path[3].classList[1] === "inputIngredients") {
            if (!this.ingredientTags.includes(value)) {
                this.ingredientTags.push(value)
                this.templateBtnTag(value, e.path[3].classList[1])
            }
        } else if (e.path[3].classList[1] === "inputAppareil") {
            if (!this.appareilTags.includes(value)) {
                this.appareilTags.push(value)
                this.templateBtnTag(value, e.path[3].classList[1])
            }
        } else if (e.path[3].classList[1] === "inputUstensiles") {
            if (!this.ustensilTags.includes(value)) {
                this.ustensilTags.push(value)
                this.templateBtnTag(value, e.path[3].classList[1])
            }
        }
        this.filterRecipes(this.recipes)
    }
    eventDeleteTag(btn, e) {
        btn.remove()
        const matchValue = (element) => element === btn.value
        if (e.path[1].classList[1] === "inputIngredients") {
            const index = this.ingredientTags.findIndex(matchValue)
            this.ingredientTags.splice(index, 1)
        } else if (e.path[1].classList[1] === "inputAppareil") {
            const index = this.appareilTags.findIndex(matchValue)
            this.appareilTags.splice(index, 1)
        } else if (e.path[1].classList[1] === "inputUstensiles") {
            const index = this.ustensilTags.findIndex(matchValue)
            this.ustensilTags.splice(index, 1)
        }
        this.filterRecipes(this.recipes)
    }
    /* FILTER  */
    filterRecipes(recipes) {
        if (this.mainInputValue == undefined || this.mainInputValue.length < 3) {
            if (this.appareilTags.length || this.ustensilTags.length || this.ingredientTags.length) {
                const u = this.filteredByTags2(this.recipes)
                this.displayManagement(u)
            } else {
                this.displayManagement(recipes)
            }
        } else {
            const i = this.filteredByMainInput(this.recipes, this.mainInputValue)
            this.displayManagement(i)
            if (this.appareilTags.length || this.ustensilTags.length || this.ingredientTags.length) {
                const u = this.filteredByTags2(i)
                this.displayManagement(u)
            }
        }
    }
    filteredByMainInput(arr, value) {
        const resultat = arr.filter(el => el.name.toLowerCase().includes(value.toLowerCase()) || el.description.toLowerCase().includes(value.toLowerCase()))
        arr.forEach((r) => {
            r.ingredients.forEach((i) => {
                if (i.ingredient.toLowerCase().includes(value.toLowerCase())) {
                    resultat.push(r)
                }
            })
        })
        const uniqueResultat = [...new Set(resultat)]
        return uniqueResultat
    }
    filteredBySecondaryInputs(arr, value) {
        return arr.filter(el => el.toLowerCase().includes(value.toLowerCase()))
    }
    filteredByTags2(recipes) {
        const resultat = []
        this.ingredientTags.forEach((tag) => {
            recipes.forEach((r) => {
                r.ingredients.forEach((i) => {
                    if (i.ingredient.toLowerCase() === tag.toLowerCase()) {
                        resultat.push(r)
                    }
                })
            })
        })
        this.appareilTags.forEach((tag) => {
            recipes.forEach((r) => {
                if (r.appliance.toLowerCase() === tag.toLowerCase()) {
                    resultat.push(r)
                }
            })
        })
        this.ustensilTags.forEach((tag) => {
            recipes.forEach((r) => {
                r.ustensils.forEach((u) => {
                    if (u.toLowerCase() === tag.toLowerCase()) {
                        resultat.push(r)
                    }
                })
            })
        })
        console.log(resultat);
        return [...new Set(resultat)]
    }
    /* TEMPLATE */
    templateElList(value) {
        const li = document.createElement('li');
        li.textContent = value
        li.addEventListener("click", (e) => {
            this.eventAddTag(e, value)
        })
        return li
    }
    templateBtnTag(value, color) {
        const tagsRecipes = document.querySelector(".tagsRecipes")
        const tagBtn = document.createElement('button')
        tagBtn.classList.add("tagBtn", color)
        tagBtn.setAttribute("value", value)
        const iconDelete = document.createElement('i')
        iconDelete.classList.add("far", "fa-times-circle")
        iconDelete.addEventListener('click', (e) => {
            this.eventDeleteTag(tagBtn, e)
        })
        tagBtn.append(value, iconDelete)
        tagsRecipes.append(tagBtn);
    }
}
const homePagee = new HomePagee(new Service())
homePagee.init()