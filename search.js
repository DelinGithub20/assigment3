// const element = document.getElementById("myBtn");
// element.addEventListener("click", function () {
//   search();
// });

// function search() {
//   const selectElement = document.getElementById("search");
//   const selectCountry = selectElement.ariaValue;
//   const url = "https://covid-193.p.rapidapi.com/statistics?country=" + selectCountry;
//   const headers = {
//     "X-RapidAPI-Key": "fd95897d1fmsh16cd082ff4db73ep145e8fjsn5adfe90752d1",
//     "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
//   };

//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url, true);

//   for (const key in headers) {
//     xhr.setRequestHeader(key, headers[key]);
//   }

//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       const data = JSON.parse(xhr.responseText);
//       if (data.response.length > 0) {
//         const responseData = data.response[0];
//         document.getElementById("case-active").innerHTML = responseData.cases.active;
//         document.getElementById("case-recovered").innerHTML = responseData.cases.recovered;
//         document.getElementById("case-new").innerHTML = responseData.cases.new;
//         document.getElementById("case-total").innerHTML = responseData.cases.total;
//         document.getElementById("case-total-deaths").innerHTML = responseData.deaths.total;
//         document.getElementById("case-total-tests").innerHTML = responseData.tests.total;
//       } else {
//         console.error("No data found for the selected country.");
//       }
//     } else {
//       console.error("Error:", xhr.statusText);
//     }
//   };

//   xhr.onerror = function () {
//     console.error("Network Error");
//   };

//   xhr.send();
// }

const searchBtn = document.getElementById("myBtn");
searchBtn.addEventListener("click", function () {
  search();
});

function search() {
  const selectElement = document.getElementById("search");
  const selectedCountry = selectElement.value;
  if (selectedCountry === "") {
    console.error("Please select a country.");
    return;
  }
  const url = "https://covid-193.p.rapidapi.com/statistics?country=" + selectedCountry.toLowerCase();
  console.log("URL:", url);
  const headers = {
    "X-RapidAPI-Key": "fd95897d1fmsh16cd082ff4db73ep145e8fjsn5adfe90752d1",
    "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
  };

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  for (const key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log("API Response:", data);
      if (data.response.length > 0) {
        const responseData = data.response[0];
        if (responseData.cases) {
          document.getElementById("case-active").innerHTML = responseData.cases.active || 0;
          document.getElementById("case-recovered").innerHTML = responseData.cases.recovered || 0;
          document.getElementById("case-new").innerHTML = responseData.cases.new || 0;
          document.getElementById("case-total").innerHTML = responseData.cases.total || 0;
        } else {
          console.error("No case data found for the selected country.");
        }
        if (responseData.deaths) {
          document.getElementById("case-total-deaths").innerHTML = responseData.deaths.total || 0;
        } else {
          console.error("No death data found for the selected country.");
        }
        if (responseData.tests) {
          document.getElementById("case-total-tests").innerHTML = responseData.tests.total || 0;
        } else {
          console.error("No test data found for the selected country.");
        }
      } else {
        console.error("No data found for the selected country.");
      }
    } else {
      console.error("Error:", xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Network Error");
  };

  xhr.send();
}
