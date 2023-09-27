function getAllUser(){
    const imgDiv = document.getElementsByClassName("person-photos");
const nameDiv = document.getElementsByClassName("href-name-style");
const depDiv = document.getElementsByClassName("a-text-style")
console.log(nameDiv)
getAllUserServices().then(res => {
    res.json().then(async json => {
        const users = json.users;
        const usersArray = Array.from(users);
        const shuffledArray = usersArray.sort(() => 0.5 - Math.random());
        const n = 3 ;
        const randomUsers = shuffledArray.slice(0,n);

        randomUsers.forEach(async (user, index) => {
          const userId = user._id;
          const userFirstName = user.firstName;
          const userLastName = user.lastName;
          const userFullName = userFirstName.charAt(0).toUpperCase()+ userFirstName.slice(1) + '\xa0' + userLastName.charAt(0).toUpperCase()+userLastName.slice(1);
          const userDepartment = user.department;
          const userProfilePhoto = user.profilePhoto;
          Array.from(nameDiv)[index].innerHTML = userFullName;
          // default olarak db de fotoğraf olması lazım ekle !
          if (!userProfilePhoto) {
            Array.from(imgDiv)[index].src = 'assets/nonprofilephoto.png'
          } else {
                Array.from(imgDiv)[index].src = await getFile(userProfilePhoto);       
          }
          if(userDepartment) Array.from(depDiv)[index].innerHTML = userDepartment;
          else  Array.from(depDiv)[index].innerHTML = ""
        });
   
    })
});

}