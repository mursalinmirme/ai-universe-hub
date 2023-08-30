// show all items
const showAllAiTools = async () => {
    const apiUrl = 'https://openapi.programming-hero.com/api/ai/tools';
    const response = await fetch(apiUrl);
    const data = await response.json();
    let allAi = data.data.tools;
    // if api image has not working
    let jasparChat = data.data.tools[5];
    jasparChat.image = 'jaspar-chat.jpg';
    // console.log(allAi);
    const itemContainer = document.getElementById('itemContainer');
    allAi = allAi.slice(0, 6)
    console.log(jasparChat)
    for(const item of allAi){
        const div = document.createElement('div');
        div.classList = `card card-compact bg-base-100 p-4 border`;
        div.innerHTML = `
        <figure><img src="${item.image}" alt="Shoes" /></figure>
                    <div class="">
                      <h2 class="card-title mt-5">Features</h2>
                      <ol class="text-sm list-none mt-2 mb-4">
                        <li class="my-1">1. ${item?.features[0]}</li>
                        <li class="my-1">2. ${item?.features[1]}</li>
                        <li class="my-1">3. ${item?.features[2]}</li>
                      </ol>
                      <hr class="border-t-2">
                      <div class="flex items-center justify-between mt-4">
                      <div>
                        <h2 class="text-lg font-semibold">${item.name}</h2>
                        <div class="flex gap-2 mt-2 text-gray-500 font-medium text-sm items-center">
                            <i class="fa-regular fa-calendar"></i>
                            <p>${item?.published_in}</p>
                        </div>
                      </div>
                      <div>
                        <button>
                        <i class="fa-solid fa-arrow-right text-orange-400 bg-orange-50 px-4 py-3.5 rounded-full"></i>
                        </button>
                      </div>
                    </div>
                    </div>
        `
        itemContainer.appendChild(div);
    }
    
}

showAllAiTools();



