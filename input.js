const inputsItem = document.querySelectorAll('.inputItem')
const iconInputItem = document.querySelectorAll(".input i")
inputsItem.forEach((input) => {
    input.addEventListener("click", (e) => {
        if (input.children[1].classList.contains("listIsActive")) {
            input.children[1].classList.remove("listIsActive")
        }
        else {
            input.children[1].classList.add("listIsActive")
            const listsItem = document.querySelectorAll(".list")
            listsItem.forEach((list) => {
                list.classList.remove("listIsActive")
            })
            input.children[0].children[1].classList.replace("fa-chevron-down", "fa-chevron-up");
            input.children[1].classList.add("listIsActive")
        }
        inputsItem.forEach((input) => {
            if (!input.children[1].classList.contains("listIsActive")) {
                input.style.borderRadius = "4px"
                input.style.width = "20vw"
                input.children[0].children[0].value = ""
                input.children[0].children[1].classList.replace("fa-chevron-up", "fa-chevron-down");
                
            } else {
                input.style.borderRadius = "0px"
                input.style.borderTopRightRadius = "4px"
                input.style.borderTopLeftRadius = "4px"
                input.style.width = "28vw"
            }
        })
    })
})