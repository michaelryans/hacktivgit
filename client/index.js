function getStarredRepo() {
    // $.ajax({
    //     url:
    // })
    // $('#below-search').add("div").addClass("repos-below-search")
    $.ajax({
        url:"http://localhost:3000/git/michaelryans/starred",
        method: "GET"
    })
    .done(function(response) {
        console.log(response)
        for(let i = 0 ; i < response.length; i++) {
            $('#below-search').append(`
            
            <div class="container-fluid" style="border-style:solid; margin:3px;">
                <br>${response[i].name}
            </div>
            `)
        }
        //console.log(response)
        
    })
    .fail(function(err) {
        console.log(err)
        console.log('erorrrrr')
    })
}

$(document).ready(function() {
    getStarredRepo()
})


function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    if (localStorage.getItem('token')) {
        console.log('token ketemu')
    }

    $.post('http://localhost:3000/git/login', {token:id_token})
      .done(function(data){
          //data = token dari server
        localStorage.setItem('token',data)
        console.log(localStorage.getItem('token'))
        
    })
      .fail(err => {
        console.log(err)
        console.log("login fail")
    })
}
  

  