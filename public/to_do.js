var addAllChores = function()
{
  var xhr = new XMLHttpRequest();
  xhr.open("GET","http://localhost:3000/chores");
  xhr.addEventListener("load", function()
  {
    var chores = JSON.parse(xhr.responseText);
    chores.forEach(function(chore)
    {
      addChore(chore);
    });
  });
  xhr.send();
};

addAllChores();

//deletes a profile using the API

var deleteChore = function()
{
  var li = this.parentNode;
  var id = li.id.substring(5); // chore3
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', 'http://localhost:3000/chore/'+id);
  xhr.addEventListener('load', function()
  {
    if(JSON.parse(xhr.responseText)['deleted']===true)
      {
        li.remove();
      }
  });
  xhr.send();
};

var deleteChoresAll = function()
{
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE','http://localhost:3000/delete');
  xhr.addEventListener('load',function()
  {
    if(JSON.parse(xhr.responseText)['deleted']===true)
      {
        var li = document.querySelectorAll('.item');
        for(i=0;i<li.length;i++)
          {
            var li2 = document.querySelector("li");
            li2.remove();
          }
      };
  });
  xhr.send();
};

var addChore = function(chore)
{
  var li= document.createElement('li');
  setLiToChore(li,chore);
  var ul = document.getElementById('ChoreList');
  ul.appendChild(li);
};

var setLiToChore = function(li,chore)
{
  li.setAttribute('id', 'chore' + chore.id);
  li.setAttribute('class','item');
  li.innerText = "";

  var choreText = chore.person + " : " + chore.chore + ".";
  var choreTextNode = document.createTextNode(choreText);
  li.appendChild(choreTextNode);

  // var edit = document.createElement('button');
  // edit.innerText = "Edit";
  // edit.addEventListener('click', function()
  // {
  //   editProfile(li,profile.newName, profile.newHometown, profile.newAge);
  // });
  // li.appendChild(edit);

  var checkbox = document.createElement('input');
  checkbox.setAttribute('type','checkbox');
  checkbox.addEventListener('change',function()
  {
    if(checkbox.checked)
      {
        li.style.textDecoration="line-through";
      }
    else
      {
        li.style.textDecoration="none";
      }
  });
  li.appendChild(checkbox);



  var deleteButton = document.createElement('button');
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener('click', deleteChore);
  li.appendChild(deleteButton);

};

var deleteAllButton = document.createElement('button');
deleteAllButton.innerText = "Delete ALL Chores";
deleteAllButton.addEventListener('click',deleteChoresAll);
var h3 = document.querySelector('h3');
h3.appendChild(deleteAllButton);



//toggle editing for Profile
// var editProfile = function(li,name,hometown,age)
// {
//   li.innerText='';
//   var id = li.id.substring(7);//profile5
//
//   //profile name input text field
//   var nameField = document.createElement('input');
//   nameField.setAttribute('type','text'); //<input type = "text"></input>
//   nameField.value = name;
//   li.appendChild(nameField);
//
//   var isFrom = document.createTextNode(' is from');
//   li.appendChild(isFrom);
//
//   //pet type input text field
//   var homeField = document.createElement('input');
//   homeField.setAttribute('type', 'text');
//   homeField.value=hometown;
//   li.appendChild(homeField);
//
//   var ageField = document.createElement('input');
//   ageField.setAttribute('type', 'text');
//   ageField.value=age;
//   li.appendChild(ageField);
//
//   var updateButton = document.createElement('button');
//   updateButton.innerText='Update';
//   updateButton.addEventListener('click', function()
//   {
//     var newName = nameField.value;
//     var newHometown = homeField.value;
//     var newAge = ageField.value
//     updateProfile(li, newName, newHometown, newAge);
//   });
//   li.appendChild(updateButton);
// };

// update a pet using the API

// var updateProfile = function(li, newName, newHometown, newAge)
// {
//   var id = li.id.substring(7); //profile7
//   var xhr = new XMLHttpRequest();
//   xhr.open('PUT', "http://localhost:3000/profile/" + id);
//   xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//   xhr.addEventListener('load', function()
//   {
//     var returnedProfile = JSON.parse(xhr.responseText);
//     console.log(returnedProfile);
//     setLiToProfile(li, returnedProfile);
//   });
//
//   var updatedProfile = {name: newName, hometown: newHometown, age: newAge};
//   xhr.send(JSON.stringify(updatedProfile))
// };

var addNewChoreButton= document.getElementById('addNewChore');
addNewChoreButton.addEventListener('click', function()
{
  var newPerson= document.getElementById('person');
  var newChore= document.getElementById('chore');

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/chore');
  xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
  xhr.addEventListener('load',function()
  {
    var returnedChore = JSON.parse(xhr.responseText);
    addChore(returnedChore);
    newPerson.value='';
    newChore.value='';
    // var h3 = document.querySelector("h3");
    // newName.style.display='none';
    // newHometown.style.display='none';
    // newAge.style.display='none';
    // addNewProfileButton.style.display='none';
    // h3.style.display='none';
  });

  var newChores = {person: newPerson.value, chore: newChore.value};
  xhr.send(JSON.stringify(newChores));

});
