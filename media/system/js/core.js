iitpConnect = window.iitpConnect || {};

document.addEventListener("DOMContentLoaded", () => {

  const location = window.location.href;
  const loader = document.getElementById('loader');
  const snackbar = document.getElementById('snackbar');

  iitpConnect.renderMessage = (data, response, time = 3000, url='') => {

    snackbar.innerHTML = data;
    snackbar.setAttribute("class", 'show ' + response);

    if(time != 0) {
      setTimeout(function() {
          snackbar.removeAttribute('class', 'show');
        }, time);
      }

    };

    snackbar.addEventListener("click", () => {
      snackbar.removeAttribute('class', 'show');
    });

    const baseUrl = location;

    if(document.getElementById('logoutuser'))
    {
      const logout = document.getElementById('logoutuser');
      logout.addEventListener("click", () => {
        logoutUser();
      });
    }

    const logoutUser = () => {

      const xhttp = new XMLHttpRequest();
      const url = baseUrl + '/index.php';
      const params = 'submit=' + '&task=LoginController.UserLogout';
      const method = 'POST';

      xhttp.open(method, url, true);

      //Send the proper header information along with the request
        xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhttp.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            const responseData = JSON.parse(xhttp.responseText);

            if(responseData.response == 'error')
            {
              console.log(responseData);
            }
            else if(responseData.response == 'success') {
              window.location.href = baseUrl;
            }
          }
          if(this.status == 400) {
            console.log('Server Error');
          }
        };
      xhttp.send(params);
    };

    iitpConnect.startLoader = () => {
      loader.style.display = '';
    };

    iitpConnect.stopLoader = () => {
      loader.style.display = 'none';
    };
});