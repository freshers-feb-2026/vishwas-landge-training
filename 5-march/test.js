let users = [
    { firstNAme: "test", marks: 20 },
    { firstNAme: "matt", marks: 20 },
    { firstNAme: "john", marks: 20 },
  ];


let newUsers=users.map((user)=>{
    const newUser={...user}
    newUser.birthDate=new Date().toLocaleDateString();
    return newUser;
});


console.log(newUsers)