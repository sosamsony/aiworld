//  Additional shorting
 
const loaderActive = (isActive) => {
  const loader = document.getElementById("loading");

  isActive ? loader.classList.remove("hidden") : loader.classList.add("hidden");
};
  



  // Function to fetch all data from the API
async function fetchAllData() {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    
    // Activate loader
    loaderActive(true);
    
    try {
    // Fetch data from API
    const response = await fetch(url);
    const data = await response.json();
  
     // Display first 6 tools
  displayAllData(data.data.tools.slice(0, 6));
  
    } catch (error) {
      console.log(error);
    }
  };




  
  //  Displays all the data in the card container.
const displayAllData = (data) => {
  const cardContainer = document.getElementById("card__container");
  cardContainer.innerHTML = "";
  
  // Add event listener to the sort button
  const sortBtn = document.getElementById("sort");
  sortBtn.addEventListener("click", () => {
  objectSort(data);
  });
  
  // Loop through each item in the data array and create a card element
  data.forEach((item) => {
  const { image, features, name, published_in, id } = item;
    // Create the card element
const card = document.createElement("div");
card.classList.add("card", "bg-base-100", "shadow-xl", "border", "hover:-translate-y-3", "transition");
card.innerHTML = `
   <figure class="p-3">
     <img
       class="h-[16rem] w-full rounded-md"
       src=${image}
       alt="Shoes"
     />
   </figure>
   <div class="card-body">
     <h2 class="card-title">Features</h2>
     <ul>
       ${featureContentDisplay(features)}
       <hr class="my-5 h-[1px] bg-teal-300/30">
     </ul>

     <div class="flex justify-between items-center">
       <div class="space-y-3">
         <p class="card-title">${name}</p>
         <p class="flex items-center gap-2 text-[12px] font-semibold text-gray-600">
           <i class="ri-calendar-2-line text-lg"></i>
           ${published_in}
         </p>
       </div>

       <div class="cursor-pointer">
         <label for='my-modal'>
           <i onclick="fetchSingleData('${id}')"
             class="ri-arrow-right-line w-10 h-10 bg-rose-400/30 p-2 rounded-full text-rose-700 transition hover:bg-rose-400/40 text-lg"
           ></i>
         </label>
       </div>
     </div>
   </div>
 `;

// Append the card element to the card container
cardContainer.appendChild(card);

});



// Hide the loader
loaderActive(false);
};
  






  // Featuring Display Content

  function featureContentDisplay(items) {
    let num = 1;
    let liHtml = "";
    items.forEach((item) => {
      liHtml += `<li class="text-sm my-1 text-gray-700">
                    <span>${num++}</span>
                    <span>${item}</span>
                  </li>`;
    });
  
    return liHtml;
  }
  
  async function fetchSingleData(id) {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
      displaySingleData(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  function displaySingleData(data) {
    const modalBody = document.getElementById("modal__body");
  
  
    modalBody.innerHTML = `
          <div class="grid md:grid-cols-2 gap-3 ">
              <div class="border border-rose-600 rounded-md p-7 bg-rose-300/10">
              <h1 class="sm:text-2xl font-semibold">${data.description}</h1>
  
              <div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3 my-5">
                  <div class="bg-blue-600/10 p-2 rounded-md">
                      <p class="text-blue-600 font-semibold text-center">${
                        data.pricing ? data.pricing[0].price : "Free of cost"
                      } <br/>${
      data.pricing ? data.pricing[0].plan : "/Basic"
    }</p>
                  </div>
                  <div class="bg-teal-600/10 p-2 rounded-md"><p class="text-teal-600 font-semibold text-center">${
                    data.pricing ? data.pricing[1].price : "Free of cost"
                  } <br/> ${
      data.pricing ? data.pricing[1].plan : "/Pro"
    }</p></div>
                  <div class="bg-red-600/10 p-2 rounded-md"><p class="text-red-600 font-semibold text-center">${
                    data.pricing ? data.pricing[2].price : "Free of cost"
                  } <br/> ${
      data.pricing ? data.pricing[2].plan : "/Enterprise"
    }</p></div>
              </div>
  
              <div class="flex justify-between items-center text-2xl font-semibold my-3">
                  <p>Features</p>
                  <p>Integrations</p>
              </div>
  
             <div class="grid grid-cols-2 gap-3">
              <ul>
                  <li class="flex gap-1"> <i class="ri-check-line text-green-500 text-[13]"></i> ${
                    data.features["1"].feature_name
                      ? data.features["1"].feature_name
                      : "not available"
                  }</li>
                  <li class="flex gap-1"> <i class="ri-check-line text-green-500 text-[13]"></i> ${
                    data.features["2"].feature_name
                      ? data.features["2"].feature_name
                      : "not available"
                  }</li>
                  <li class="flex gap-1"> <i class="ri-check-line text-green-500 text-[13]"></i> ${
                    data.features["3"].feature_name
                      ? data.features["3"].feature_name
                      : "not available"
                  }</li>
              </ul>
  
              <ul>
                  ${displaySocialContact(
                    data.integrations ? data.integrations : ["No Data found"]
                  )}
              </ul>
             </div>
          </div>
  
          <div class="border border-teal-200 rounded-md p-5 bg-teal-300/10 relative">
              <img class="w-full h-[15rem] object-cover rounded-md" src=${
                data.image_link[0]
              } alt="">
  
              <div class="text-center my-4">
                  <h1 class="text-2xl font-semibold my-3">${
                    data.input_output_examples
                      ? data.input_output_examples[0].input
                      : "Can you give any example?"
                  }</h1>
                  <p>
                  ${
                    data.input_output_examples
                      ? data.input_output_examples[0].output
                      : "No! Not Yet! Take a break!!!"
                  }
                  </p>
              </div>
  
              <p class="absolute top-6 right-6 w-max bg-green-500 py-1 px-2 rounded-md text-black ${
                data.accuracy.score === null ? "hidden" : "block"
              } "> ${"Accuracy:"+" "+(data.accuracy.score * 100).toFixed(1) + "%"} </p>

          </div>
          </div>
      `;
  }
  


  
   // Function to display social contact information
function displaySocialContact(items) {
  // If there are no social contact items available, show a default message
  items = items ? items : "No Data Available";
  
  let liHtml = "";
  // Loop through each social contact item and generate the HTML
  items.forEach((item) => {
  liHtml += `
        <li> ${item ? item : "No Data found"}</li>
    ` ;
  });
  
  // Return the HTML
  return liHtml;
}
  
  // Load data
fetchAllData();
  
// Function to show all data on click
const fetchShowAllData = async () => {
const url = "https://openapi.programming-hero.com/api/ai/tools";

const showMoreBtn = document.getElementById("showMore");
showMoreBtn.classList.add("hidden");
loaderActive(true);

try {
const response = await fetch(url);
const data = await response.json();

displayAllData(data.data.tools);

} catch (error) {
  console.log(error);
  }
  };
  
  document.getElementById("showMore").addEventListener("click", fetchShowAllData);


// Function to sort items
const objectSort = (array) => {
  array.sort((a, b) => {
  const dateA = new Date(a.published_in);
  const dateB = new Date(b.published_in);

    return dateB - dateA;

  });

  displayAllData(array);
};
  