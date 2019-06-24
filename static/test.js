var login_btn = document.querySelector('.login_btn')
var search_btn = document.querySelector('.search')

login_btn.addEventListener('click',function(){
  var xhr = new XMLHttpRequest()
  var username = 'username' + '=' + document.querySelector('.username').value
  var password = 'password' + '=' + document.querySelector('.password').value
  xhr.open('POST','/login')
  data = username + '&' + password
  xhr.send(data)
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      document.querySelector('.login').innerText = xhr.responseText
    }
  };
})

search_btn.addEventListener('click',function(){
  var xhr = new XMLHttpRequest()
  var data = 'team' + '=' + document.querySelector('.team').value
  var url = '/search' + '?' + data
  xhr.open('GET',url)
  xhr.send()
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      document.querySelector('.record').innerText = xhr.responseText
    }
  };
})