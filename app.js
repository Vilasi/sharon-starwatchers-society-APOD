const apiKey = 'duTM1WcUS7QLQrUquX9mICHxV1Vctdh9wwqOVeZE';
const form = document.querySelector('form');
const dateInput = document.querySelector('#date');

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

  const response = await axios(options);
  return response;
}

function buildDOM(response) {
  const image = document.querySelector('#img');
  const description = document.querySelector('#description');
  const title = document.querySelector('#title');

  image.src = response.data.hdurl;
  description.innerText = response.data.explanation;
  title.innerText = response.data.title;
}

function handleError(error) {
  const description = document.querySelector('#description');
  description.innerText = "Sorry, we don't have an image for this request";
}

async function tryAPI(date) {
  try {
    const response = await apiCall(date);
    buildDOM(response);
  } catch (error) {
    handleError(error);
    console.log(error);
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await tryAPI(dateInput.value);
});

window.addEventListener('load', async () => {
  const date = new Date();
  const todaysDate = formatDate(date);

  await tryAPI(todaysDate);
});
