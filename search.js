const element = document.getElementById("myBtn");
element.addEventListener("click", function() {
  search()
});

function search() {
    const input = document.getElementById("search").value;
    const url = 'https://covid-193.p.rapidapi.com/statistics?country='+input;
    const headers = {
      "X-RapidAPI-Key": "fd95897d1fmsh16cd082ff4db73ep145e8fjsn5adfe90752d1",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    };

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }

    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        document.getElementById("case-active").innerHTML = data.response["0"].cases.active;
        document.getElementById("case-recovered").innerHTML = data.response["0"].cases.recovered;
        document.getElementById("case-new").innerHTML = data.response["0"].cases.new;
        document.getElementById("case-total").innerHTML = data.response["0"].cases.total;
        document.getElementById("case-total-deaths").innerHTML = data.response["0"].deaths.total;
        document.getElementById("case-total-tests").innerHTML = data.response["0"].tests.total;
      } else {
        console.error('Error:', xhr.statusText);
      }
    };

    xhr.onerror = function() {
      console.error('Network Error');
    };

    xhr.send();
}
