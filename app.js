const apiKey = 'duTM1WcUS7QLQrUquX9mICHxV1Vctdh9wwqOVeZE';
const dateInput = document.querySelector('#date');
const submitButtons = document.querySelectorAll('.submitButton');

// Call the NASA API
async function apiCall(date) {
  const options = {
    baseURL: 'https://api.nasa.gov/',
    url: '/planetary/apod',
    method: 'get',
    params: {
      api_key: apiKey,
      date: date,
    },
  };

  return await axios(options);
}

// Try/Catch API and call DOM rendering function if successful.
async function tryAPI(date) {
  try {
    const response = await apiCall(date);
    console.log(response);
    buildDOM(response);
  } catch (error) {
    handleError(error);
    console.log(error);
  }
}

// Build DOM with API Success Response
function buildDOM(response) {
  const image = document.querySelector('#img');
  const video = document.querySelector('#video');
  const videoDiv = document.querySelector('#video-div');
  const description = document.querySelector('#description');
  const title = document.querySelector('#title');

  if (response.data.media_type === 'image') {
    image.src = response.data.hdurl;
    videoDiv.classList.add('d-none');
    image.classList.remove('d-none');
  } else if (response.data.media_type === 'video') {
    video.src = response.data.url;
    videoDiv.classList.remove('d-none');
    image.classList.add('d-none');
  }

  description.innerText = response.data.explanation;
  title.innerText = response.data.title;
}

// Build DOM with API Failure Response
function handleError(error) {
  const description = document.querySelector('#description');

  description.innerText = "Sorry, we don't have an image for this request";
}

// Make a properly formatted date string out of a new Date() argument
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

function getTodaysDate() {
  const date = new Date();

  return formatDate(date);
}

// Call API function chain based on ID of form button clicked.
for (const button of submitButtons) {
  button.addEventListener('click', async (e) => {
    const id = e.target.id;

    if (id === 'submit') {
      await tryAPI(dateInput.value);
    } else if (id === 'jump-to-today') {
      const todaysDate = getTodaysDate();
      await tryAPI(todaysDate);
    }
  });
}

window.addEventListener('load', async () => {
  const todaysDate = getTodaysDate();

  await tryAPI(todaysDate);
});
