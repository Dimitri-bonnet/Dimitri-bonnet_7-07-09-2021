class HomePage {
    constructor(service) {
        this.service = service;
        this.recipes = [];
        this.filteredRecipes = [];
        this.filteredRecipesByTags = []
        this.ingredientsRecipes = []
        this.applianceRecipes = []
        this.ustensilesRecipes = []
        this.tagsIngredient = []
        this.tagsAppliance = []
        this.tagsUstensile = []
        this.containerRecipes = document.querySelector('.recipes');
        this.listIngredientsRecipe = document.querySelector('.listIngredients ul')
        this.listAppareilRecipe = document.querySelector('.listAppareils ul')
        this.listUstensilesRecipe = document.querySelector(".listUstensiles ul")
        this.mainInputSearch = document.querySelector('#search');
        this.secondaryInputs = document.querySelectorAll(".inputItem input");
    }
    init() {
        this.getRecipes()
        this.displayManagement(this.recipes)
        this.eventMainInput()
        this.eventSecondaryInput()
    }
    getRecipes() {
        this.recipes = this.service.getRecipes()
    }
    getIngredients(arr) {
        arr.forEach((i) => {
            i.ingredients.forEach((i) => {
                this.ingredientsRecipes.push(i.ingredient)
            })
        })
        this.ingredientsRecipes = [...new Set(this.ingredientsRecipes)]
        this.templateItemList(this.ingredientsRecipes, this.listIngredientsRecipe)
    }
    getAppareils(arr) {
        arr.forEach((a) => {
            this.applianceRecipes.push(a.appliance)
        })
        this.applianceRecipes = [...new Set(this.applianceRecipes)]
        this.templateItemList(this.applianceRecipes, this.listAppareilRecipe)
    }
    getUstensils(arr) {
        arr.forEach((u) => {
            u.ustensils.forEach((u) => {
                this.ustensilesRecipes.push(u)
            })
        })
        this.ustensilesRecipes = [...new Set(this.ustensilesRecipes)]
        this.templateItemList(this.ustensilesRecipes, this.listUstensilesRecipe)
    }
    displayRecipes(recipes) {
        const noRecipes = document.querySelector('.noRecipes')
        if (recipes.length) {
            noRecipes.style.display = "none"
            recipes.forEach((recipe) => {
                this.containerRecipes.append(recipe.templateRecipe())
            })
        } else {
            noRecipes.style.display = "block"
        }
    }
    displayManagement(recipes) {
        const recipesItem = document.querySelectorAll(".recipe")
        const listsItem = document.querySelectorAll(".list ul li")
        this.removeItems(listsItem)
        this.removeItems(recipesItem)
        /*  */
        this.displayRecipes(recipes)
        this.ingredientsRecipes = []
        this.getIngredients(recipes)
        this.applianceRecipes = []
        this.getAppareils(recipes)
        this.ustensilesRecipes = []
        this.getUstensils(recipes)

    }
    /* MAIN INPUT  */
    eventMainInput() {
        this.mainInputSearch.addEventListener("input", (e) => {
            if (this.mainInputSearch.value.length < 3) {
                this.filteredRecipes = []
                this.displayManagement(this.recipes)
            } else {
                this.filteredRecipes = this.filterByMainInput(this.recipes, this.mainInputSearch.value)
                this.displayManagement(this.filteredRecipes)
                console.log(this.filteredRecipes);
            }
        })
    }
    filterByMainInput(arr, value) {
        const filtered = arr.filter(el => el.name.toLowerCase().includes(value.toLowerCase()) || el.description.toLowerCase().includes(value.toLowerCase()))
        arr.forEach((r) => {
            r.ingredients.forEach((i) => {
                if (i.ingredient.toLowerCase().includes(value.toLowerCase())) {
                    filtered.push(r)
                }
            })
        })
        const uniqueFiltered = [...new Set(filtered)]
        return uniqueFiltered
    }
    /* SECONDARY INPUT */
    eventSecondaryInput() {
        this.secondaryInputs.forEach((input) => {
            input.addEventListener("input", (e) => {
                if (e.target.classList.contains("inputIngredients")) {
                    const listIngredient = document.querySelector(".listIngredients ul")
                    const itemsListIngredient = document.querySelectorAll(".listIngredients ul li")
                    this.removeItems(itemsListIngredient)
                    const r = this.filterBySecondaryInput(this.ingredientsRecipes, input.value)
                    this.templateItemList(r, listIngredient)
                } else if (e.target.classList.contains("inputAppareil")) {
                    const listAppareil = document.querySelector(".listAppareils ul")
                    const itemsListAppareil = document.querySelectorAll(".listAppareils ul li");
                    this.removeItems(itemsListAppareil)
                    const r = this.filterBySecondaryInput(this.applianceRecipes, input.value)
                    this.templateItemList(r, listAppareil)
                } else if (e.target.classList.contains("inputUstensiles")) {
                    const listUstensiles = document.querySelector(".listUstensiles ul")
                    const itemsListUstensiles = document.querySelectorAll(".listUstensiles ul li ")
                    this.removeItems(itemsListUstensiles)
                    const r = this.filterBySecondaryInput(this.ustensilesRecipes, input.value)
                    this.templateItemList(r, listUstensiles)
                }
            })
        }
        )
    }
    filterBySecondaryInput(arr, value) {
        const filtered = arr.filter(el => el.toLowerCase().includes(value.toLowerCase()))
        return filtered
    }
    filterByTags(tagsIngredient, tagsAppliance, tagsUstensile, arrRecipes) {
        console.log('filter by tags');
        console.log(tagsIngredient);
        console.log(arrRecipes);
        if (this.tagsIngredient.length >= 1 || this.tagsAppliance.length >= 1 || this.tagsUstensile.length >= 1) {
            if (this.tagsIngredient.length >= 1) {
                tagsIngredient.forEach((tag) => {
                    arrRecipes.forEach((recipe) => {
                        recipe.ingredients.forEach((i) => {
                            if (i.ingredient.toLowerCase() === tag.toLowerCase()) {
                                this.pushUniqueFilteredRecipesByTags(recipe)
                                this.displayManagement(this.filteredRecipesByTags)
                            }
                        })
                    })
                })
            }
          /*   if (this.tagsAppliance.length >= 1) {
                tagsAppliance.forEach((tag) => {
                    arrRecipes.forEach((recipe) => {
                        if (recipe.appliance.toLowerCase().includes(tag.toLowerCase())) {
                            this.pushUniqueFilteredRecipesByTags(recipe)
                            this.displayManagement(this.filteredRecipesByTags)
                        }
                    })
                })
            }
            if (this.tagsUstensile.length >= 1) {
                tagsUstensile.forEach((tag) => {
                    arrRecipes.forEach((recipe) => {
                        recipe.ustensils.forEach((u) => {
                            if (u.toLowerCase().includes(tag.toLowerCase())) {
                                this.pushUniqueFilteredRecipesByTags(recipe)
                                this.displayManagement(this.filteredRecipesByTags)
                            }
                        })
                    })
                })
            } */
        } else {
            this.displayManagement(this.recipes)
        }
/*         this.filteredRecipesByTags = [] */
    }
    pushUniqueFilteredRecipesByTags(recipe) {
        this.filteredRecipesByTags.push(recipe)
        this.filteredRecipesByTags = [...new Set(this.filteredRecipesByTags)]
    }


    /* TEMPLATES */
    templateItemList(arr, list) {
        arr.forEach((i) => {
            const li = document.createElement('li')
            li.textContent = i
            li.addEventListener("click", (e) => {
                if (e.path[3].classList[1] === "inputIngredients" && !this.tagsIngredient.includes(e.target.textContent)) {
                    this.tagsIngredient.push(e.target.textContent)
                    this.templatebtnFilterTag(e.target.textContent, e.path[3].classList[1])
                } else if (e.path[3].classList[1] === "inputAppareil" && !this.tagsAppliance.includes(e.target.textContent)) {
                    this.tagsAppliance.push(e.target.textContent)
                    this.templatebtnFilterTag(e.target.textContent, e.path[3].classList[1])
                } else if (e.path[3].classList[1] === "inputUstensiles" && !this.tagsUstensile.includes(e.target.textContent)) {
                    this.tagsUstensile.push(e.target.textContent)
                    this.templatebtnFilterTag(e.target.textContent, e.path[3].classList[1])
                }
                if (this.filteredRecipes.length >= 1) {
                    if (this.filteredRecipesByTags.length >= 1) {
                        console.log('recette filtrée par l input et par un tag !');
                   /*      
                        this.filterByTags(this.tagsIngredient, this.tagsAppliance, this.tagsUstensile, this.filteredRecipesByTags)
                          this.filteredRecipesByTags = [] */
                    } else {
                        console.log('recette filtrée par l input');
                        this.filterByTags(this.tagsIngredient, this.tagsAppliance, this.tagsUstensile, this.filteredRecipes)
                    }
                } else {
                    if(this.filteredRecipesByTags.length >= 1) {
                        console.log('pas de recette filtrée par l input MAIS par TAG OUI');      
                        this.filterByTags(this.tagsIngredient, this.tagsAppliance, this.tagsUstensile, this.filteredRecipesByTags)
                    }else {
                        console.log('pas de recette filtrée par l input');
                        this.filterByTags(this.tagsIngredient, this.tagsAppliance, this.tagsUstensile, this.recipes)
                        console.log(this.filteredRecipesByTags);
                    }
                
                }

            })
            list.append(li)
        })
    }
    templatebtnFilterTag(value, classColor) {
        const tagsIngredient = document.querySelector(".tagsIngredient")
        const tagBtn = document.createElement('button')
        tagBtn.classList.add("tagBtn")
        tagBtn.classList.add(classColor)
        tagBtn.setAttribute("value", value)
        const iconDelete = document.createElement('i')
        iconDelete.classList.add("far", "fa-times-circle")
        iconDelete.addEventListener('click', (e) => {
            this.removeBtnTag(tagBtn, e)
            if (this.filteredRecipes.length >= 1) {
                this.displayManagement(this.filteredRecipes)
            }
            else {
                this.displayManagement(this.recipes)
            }
        })
        tagBtn.append(value, iconDelete)
        tagsIngredient.append(tagBtn);
        return tagsIngredient
    }
    removeBtnTag(btn, e) {
        btn.remove()
        const matchValue = (element) => element === btn.value
        if (e.path[1].classList[1] === "inputIngredients") {
            const index = this.tagsIngredient.findIndex(matchValue)
            this.tagsIngredient.splice(index, 1)
        } else if (e.path[1].classList[1] === "inputAppareil") {
            const index = this.tagsAppliance.findIndex(matchValue)
            this.tagsAppliance.splice(index, 1)
        } else if (e.path[1].classList[1] === "inputUstensiles") {
            const index = this.tagsUstensile.findIndex(matchValue)
            this.tagsUstensile.splice(index, 1)
        }
    }
    removeItems(arr) {
        arr.forEach((i) => {
            i.remove()
        })
    }
}

/* const homePage = new HomePage(new Service())
homePage.init() */
