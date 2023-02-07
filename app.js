const apiKey = 'duTM1WcUS7QLQrUquX9mICHxV1Vctdh9wwqOVeZE';
const form = document.querySelector('form');
const dateInput = document.querySelector('#date');
// const description = document.querySelector('#description');
// const image = document.querySelector('#img');

//https://api.nasa.gov/planetary/apod?api_key=duTM1WcUS7QLQrUquX9mICHxV1Vctdh9wwqOVeZE
// {
//   // `data` is the response that was provided by the server
//   data: {},

//   // `status` is the HTTP status code from the server response
//   status: 200,

//   // `statusText` is the HTTP status message from the server response
//   statusText: 'OK',

//   // `headers` the HTTP headers that the server responded with
//   // All header names are lowercase and can be accessed using the bracket notation.
//   // Example: `response.headers['content-type']`
//   headers: {},

//   // `config` is the config that was provided to `axios` for the request
//   config: {},

//   // `request` is the request that generated this response
//   // It is the last ClientRequest instance in node.js (in redirects)
//   // and an XMLHttpRequest instance in the browser
//   request: {}
// }

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

  image.src = response.data.hdurl;
  description.innerText = response.data.explanation;
}

function handleError(error) {
  const description = document.querySelector('#description');
  description.innerText = "Sorry, we don't have an image for this request";
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const response = await apiCall(dateInput.value);
    buildDOM(response);
  } catch (error) {
    handleError(error);
    console.log(error);
  }
});
