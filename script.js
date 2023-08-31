// show all items
const showAllAiTools = async (isShowAll) => {
    const apiUrl = 'https://openapi.programming-hero.com/api/ai/tools';
    const response = await fetch(apiUrl);
    const data = await response.json();
    let allAi = data.data.tools;
    // if api image has not working
    let jasparChat = data.data.tools[5];
    jasparChat.image = 'jaspar-chat.jpg';
    console.log(allAi);
    const itemContainer = document.getElementById('itemContainer');
    if(!isShowAll){
      allAi = allAi.slice(0, 6)
    }
    const showAllBtn = document.getElementById('show-all-btn');
    if(isShowAll){
      showAllBtn.classList.add('hidden');
    }else{
      showAllBtn.classList.remove('hidden');
    }
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
                        <button onclick="showItemModal('${item?.id}')">
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

// show signle item modal
const showItemModal = async (modalId) => {
    const modalUrl = `https://openapi.programming-hero.com/api/ai/tool/${modalId}`;
    const response = await fetch(modalUrl);
    const itemData = await response.json();
    const getData = itemData.data;
    // if 6 data image is undefined
    if(getData.id === '06'){
      getData.image_link[0] = 'jaspar-chat.jpg';
    }
    // console.log(getData)
    // catch the accuracy
    const accur = getData.accuracy.score ? getData.accuracy.score : '____';
    const accurString = typeof number ? accur.toString() : accur;
    const getAccur = accurString.length > 3 ? accurString.split(".") : accurString;
    const concurrency = getAccur.length > 3 ? getAccur[1] : getAccur;
    // console.log(accurString)
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = `
    <form method="dialog" class="">
          <!-- modal wrapper -->
          <div class="flex flex-col-reverse lg:flex-row gap-4 bg-white p-4 md:p-20 relative lg:rounded-xl">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white bg-red-500">✕</button>
            <!-- discription -->
            <div class="flex-1 shadow border border-red-500 bg-red-50 rounded-xl p-5">
              <h3 class="text-lg font-semibold">${getData?.description}</h3>
              <!-- subscription packege -->
              <div class="flex gap-4 mt-5">
                <div class="py-3 text-center flex flex-col items-center justify-center w-1/3 text-base font-semibold text-green-700 rounded-xl bg-white">
                 <span>${getData?.pricing ? getData?.pricing[0].price : 'free'}</span>
                 <span>${getData?.pricing ? getData?.pricing[0].plan : 'free'}</span>
                </div>
                <div class="py-3 text-center flex flex-col items-center justify-center w-1/3 text-base font-semibold text-orange-500 rounded-xl bg-white">
                <span>${getData?.pricing ? getData?.pricing[1]?.price : 'free'}</span>
                <span>${getData?.pricing ? getData?.pricing[1]?.plan : 'free'}</span>
                </div>
                <div class="py-3 text-center flex flex-col items-center justify-center w-1/3 text-sm font-semibold text-red-500 rounded-xl bg-white">
                <span>${getData?.pricing ? getData?.pricing[2]?.price : 'free'}</span>
                <span>${getData?.pricing ? getData?.pricing[2]?.plan : 'free'}</span>
                </div>
              </div>
              <!-- features and integrations container -->
              <div class="flex justify-between gap-4 mt-5">
                <!-- feature -->
                <div>
                  <h2 class="text-xl font-semibold">Features</h2>
                  <ul class="text-sm text-gray-600 list-disc pl-5 mt-3">
                    <li>${getData?.features ? getData?.features["1"]?.feature_name : ''}</li>
                    <li>${getData?.features ? getData?.features["2"]?.feature_name : ''}</li>
                    <li>${getData?.features ? getData?.features["3"]?.feature_name : ''}</li>
                  </ul>
                </div>
                <!-- integrations -->
                <div>
                  <h2 class="text-xl font-semibold">Integrations</h2>
                  <ul class="text-sm text-gray-600 list-disc pl-5 mt-3">
                    <li>${getData?.integrations ? getData?.integrations[0] : 'No result'}</li>
                    <li>${getData?.integrations ? getData?.integrations[1] : 'No result'}</li>
                    <li>${getData?.integrations ? getData?.integrations[2] : 'No result'}</li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- image and title -->
            <div class="flex-1 shadow rounded-xl p-5">
              <div class="relative">
                <img class="rounded-xl w-full h-60" src="${getData?.image_link[0]}" alt="">
                <span class="absolute top-2 right-2 bg-red-500 rounded-lg px-3 py-1 text-white text-sm font-medium">${concurrency}% accuracy</span>
              </div>
              <h2 class="text-center text-xl font-semibold py-4">${getData.input_output_examples ? getData.input_output_examples[0].input : 'No result'}</h2>
              <p class="text-center text-sm px-3">${getData.input_output_examples ? getData.input_output_examples[0].output : 'No result'}</p>
            </div>
          </div>
            </form>
    `
    // show modal
    showModal.showModal()
}


// handle show all btn
const showAllHandle = () =>{
  showAllAiTools(true);
}







