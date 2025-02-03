const addBudjet = document.getElementById("addBudjet");
const budjetContainer = document.querySelector('.budjetContainer')
document.addEventListener("DOMContentLoaded", showPieChart);
 

function initialLoad() {
    if (!localStorage.getItem('categories')) { return }
    categoryList = JSON.parse(localStorage.getItem('categories')).categoryList
    updateUI()
}
initialLoad()

function updateUI() {
    let newInnerHTML = ''

    categoryList.forEach((categoryElement, categoryIndex) => {
        newInnerHTML += `
        <div class="category">
        <p>${categoryElement}</p>
        <div class="btnContainer">
            <button class="iconBtn" onclick="editCategory(${categoryIndex})">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="iconBtn" onclick="deleteCategory(${categoryIndex})">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    </div>
        `
    })


    budjetContainer.innerHTML = newInnerHTML

    // to save to localstorage
    localStorage.setItem('categories', JSON.stringify({ categoryList }))

    updatePieChart();
}

function addCategory() {
    const category = addBudjet.value
    if (!category) {return}

    console.log('added category: ', category)
    categoryList.push(category)
    addBudjet.value = ''
    updateUI()

}

function editCategory(index) {
    addBudjet.value = categoryList[index]
    categoryList = categoryList.filter((element, elementIndex) => {
        if (index === elementIndex) { return false }
        return true
    })
    updateUI()
}

function deleteCategory(index) {
    categoryList = categoryList.filter((element, elementIndex) => {
        if (index === elementIndex) { return false }
        return true
    })
    updateUI()
}

function showPieChart() {
    //check if all is working
    console.log("pie-chart on load");
    //making an array for the slices
    const values = []
    const colors = []
    const names = []
    let sliceA={size:250,color:'blue'};//making an object with a size and value
    let sliceB={size:750,color:'green'};//each is a slice of its own
    values.push(sliceA.size, sliceB.size);//adding both slice's sizes to an array
    //Making a total size value that uses the reduce funtion to pass through each element of the array
    //And sums all of the sizes up.
    const total = values.reduce((acc,val)=> acc+val,0);
    //making a staring angle so the pie chart lines up correctely.
    let startAngle = 0;

    // Values of the pie chart in %'s
    const canvas = document.getElementById("pie-chart"); //getting the canvas
    const ctx = canvas.getContext("2d"); // creating an  element to draw on canvas i think?? (getContext allows you to draw on a canvas)
    
    // Calculate Angles
    values.forEach((value,index) => {

        const angle = (value/total) * Math.PI * 2; // making the angle workout IG :3
        
        //Draw a slice
        ctx.beginPath(); //starts drawing a new path
        ctx.moveTo(canvas.width / 2, canvas.height / 2); //Middle of piechart
        ctx.arc(  //arc over entire circle, dont know how this works tho
            canvas.width / 2, 
            canvas.height / 2,
            canvas.width / 2,
            startAngle,
            startAngle + angle 
        );
        ctx.closePath(); // stops drawing a path
        //if index is 0 use the first slices color, if not use the second
        
        ctx.fillStyle = index === 0 ? sliceA.color : sliceB.color;
        //ctx.fillStyle = values[index].color;
        ctx.fill(); //fill in that color

        // Draw the border for each slice
        ctx.lineWidth = 4;  // Thickness of the border
        ctx.strokeStyle = 'white';  // Border color (black)
        ctx.stroke();

        startAngle += angle;

    });

    // Show Legend
    const legend = document.getElementById("pie-chart-legend");
    // Add labels below by changing the html of the ul tag
    legend.innerHTML=`
    
    <div class="legend-item">

    <div class="legend-color" style="background-color:${sliceA.color}"></div>
    <div class="legend-lebel">Total amount: $${sliceA.size}</div>

    <div class="legend-color" style="background-color:${sliceB.color}"></div>
    <div class="legend-lebel">Total amount: $${sliceB.size}</div>

    </div>
    
    `

    budjetContainer.innerHTML = newInnerHTML
}

function updatePieChart() {
    const colorList = []
    colorList.push("Red","Green", "Blue", "Yellow", "Orange", "Light Blue", "Violet");
    min = Math.ceil(0);
    max = Math.floor(6);
    oneInSeven = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    categoryList.forEach(categoryElement => {
        if (!categoryList) {return};
        values.push($,{categoryElement}, colorList[oneInSeven]);
    });
    
    showPieChart();
    legend.innerHTML+=`
    
    <div class="legend-item">

    <div class="legend-color" style="background-color:${values[values.length].color}"></div>
    <div class="legend-lebel">Total amount: $${values[values.length].size}</div>

    </div>
    
    `

    budjetContainer.innerHTML = newInnerHTML
     console.log(".pie-chart updated");
}

addBtn.addEventListener('click', addCategory)
