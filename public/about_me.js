var addAllProfiles = function()
{
  var xhr = new XMLHttpRequest();
  xhr.open("GET","http://localhost:3000/profiles");
  xhr.addEventListener("load", function()
  {
    var profiles = JSON.parse(xhr.responseText);
    profiles.forEach(function(profile)
    {
      addProfile(profile);
    });
  });
  xhr.send();
};

addAllProfiles();

//deletes a pet using the API

var deletePet = function()
{
  var li = this.parentNode;
  var id = li.id.substring(3); // pet1
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', 'http://localhost:3000/pet/'+id);
  xhr.addEventListener('load', function()
  {
    if(JSON.parse(xhr.responseText)['deleted']===true)
      {
        li.remove();
      }
  });
  xhr.send();
};

var addProfile = function(profile)
{
  var li= document.createElement('li');
  setLiToProfile(li,profile);
  var ul = document.getElementById('aboutMeList');
  ul.appendChild(li);
};

var setLiToProfile = function(li,profile)
{
  li.setAttribute('id', 'profile' + profile.id);
  li.innerText = "";

  var profileText = profile.newName + " is from " + profile.newHometown + "."+ " He is "+ profile.newAge;
  var profileTextNode = document.createTextNode(profileText);
  li.appendChild(profileTextNode);

  var edit = document.createElement('button');
  edit.innerText = "Edit";
  edit.addEventListener('click', function()
  {
    editProfile(li,profile.newName, profile.newHometown, profile.newAge);
  });
  li.appendChild(edit);

  var deleteButton = document.createElement('button');
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener('click', deletePet);
  li.appendChild(deleteButton);
};

//toggle editing for pet
var editProfile = function(li,name,hometown,age)
{
  li.innerText='';
  var id = li.id.substring(7);//profile5

  //profile name input text field
  var nameField = document.createElement('input');
  nameField.setAttribute('type','text'); //<input type = "text"></input>
  nameField.value = name;
  li.appendChild(nameField);

  var isFrom = document.createTextNode(' is from');
  li.appendChild(isFrom);

  //pet type input text field
  var homeField = document.createElement('input');
  homeField.setAttribute('type', 'text');
  homeField.value=hometown;
  li.appendChild(homeField);

  var ageField = document.createElement('input');
  ageField.setAttribute('type', 'text');
  ageField.value=age;
  li.appendChild(ageField);

  var updateButton = document.createElement('button');
  updateButton.innerText='Update';
  updateButton.addEventListener('click', function()
  {
    var newName = nameField.value;
    var newHometown = homeField.value;
    var newAge = ageField.value
    updateProfile(li, newName, newHometown, newAge);
  });
  li.appendChild(updateButton);
};

// update a pet using the API

var updateProfile = function(li, newName, newHometown, newAge)
{
  var id = li.id.substring(7); //profile7
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', "http://localhost:3000/profile/" + id);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.addEventListener('load', function()
  {
    var returnedProfile = JSON.parse(xhr.responseText);
    console.log(returnedProfile);
    setLiToProfile(li, returnedProfile);
  });

  var updatedProfile = {name: newName, hometown: newHometown, age: newAge};
  xhr.send(JSON.stringify(updatedProfile))
};

var addNewProfileButton= document.getElementById('addNewProfile');
addNewProfileButton.addEventListener('click', function()
{
  var newName= document.getElementById('newName');
  var newHometown= document.getElementById('newHometown');
  var newAge= document.getElementById('newAge');

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/profile');
  xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
  xhr.addEventListener('load',function()
  {
    var returnedProfile = JSON.parse(xhr.responseText);
    addProfile(returnedProfile);
    // newName.value='';
    // newHometown.value='';
    // newAge.value='';
    var h3 = document.querySelector("h3");
    newName.style.display='none';
    newHometown.style.display='none';
    newAge.style.display='none';
    addNewProfileButton.style.display='none';
    h3.style.display='none';
  });

  var newProfile = {name: newName.value, hometown: newHometown.value, age: newAge.value};
  xhr.send(JSON.stringify(newProfile));

});
