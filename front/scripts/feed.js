function getAllUser() {
  const imgDiv = document.getElementsByClassName("person-photos");
  const nameDiv = document.getElementsByClassName("href-name-style");
  const depDiv = document.getElementsByClassName("a-text-style")
  getAllUserServices().then(res => {
    res.json().then(async json => {
      const users = json.users;
      const usersArray = Array.from(users);
      const filtredArray = usersArray.filter((user) => user._id !=loginUserId);
      const shuffledArray = filtredArray.sort(() => 0.5 - Math.random());
      const n = 3;
      const randomUsers = shuffledArray.slice(0, n);
      randomUsers.forEach(async (user, index) => {
        const userId = user._id;
        const accessKey = userId;
        Array.from(document.getElementsByClassName("rightFollowButton"))[index].accessKey = accessKey;
        const userFirstName = user.firstName;
        const userLastName = user.lastName;
        const userFullName = userFirstName.charAt(0).toUpperCase() + userFirstName.slice(1) + '\xa0' + userLastName.charAt(0).toUpperCase() + userLastName.slice(1);
        const userCompany = user.companyOrSchool;
        const userDepartment = user.department;
        const userInfo = userCompany + '<br>' +   userDepartment;
        const userProfilePhoto = user.profilePhoto;
        const userFollowers = user.followers;
        if(Array.from(userFollowers).includes(loginUserId)){
                     
        }
        Array.from(nameDiv)[index].innerHTML = userFullName;
        // default olarak db de fotoğraf olması lazım ekle !
        if (!userProfilePhoto) {
          Array.from(imgDiv)[index].src = 'assets/nonprofilephoto.png'
        } else {
          Array.from(imgDiv)[index].src = await getFile(userProfilePhoto);
        }
        if (userCompany) Array.from(depDiv)[index].innerHTML = userInfo;
        else Array.from(depDiv)[index].innerHTML = ""
      });

    })
  });
}

function follow(event){
  const loginUserId = localStorage.getItem("userId");
  const accessKey = event.target.accessKey;
  addFollowerServices(loginUserId,accessKey)
  .then((res) => res.text())
  .then(async (res) => {
      alert(res);
  })
}
