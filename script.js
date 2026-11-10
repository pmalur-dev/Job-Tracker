const applicationForm = document.querySelector("#application-form");

let applications = [];

const savedApplications = localStorage.getItem("applications");

if(savedApplications){
  applications = JSON.parse(savedApplications);
}

let editingApplicationId = null;

let profileData = null;

const applicationList = document.querySelector("#application-list");

const totalApplications = document.querySelector("#total-applications");

const interviews = document.querySelector("#interviews");

const offers = document.querySelector("#offers");

const profileForm = document.querySelector("#profile-form");

applicationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const company = document.querySelector("#company").value;
    const position = document.querySelector("#position").value;
    const location = document.querySelector("#location").value;
    const status = document.querySelector("#status").value;
    const date = document.querySelector("#date").value;

  const application = {
    id: Date.now(),
    company: company,
    position: position,
    location: location,
    status: status,
    date: date
  };

    console.log(application); 
    console.log("Form sumbitted");

    if(editingApplicationId !== null){

      applications = applications.map(function(app){

        if(app.id === editingApplicationId){

          return application;

        }
        return app;

      });

      editingApplicationId = null;

    } else {

    applications.push(application);

    }

    renderApplications();
    console.log(applications);
    
    applicationForm.reset();
});                                                                                                                                                                      


function renderApplications() {

    applicationList.innerHTML = "";

applications.forEach(function(application){

    const li = document.createElement("li");
    
    li.textContent = `${application.company} -
     ${application.position} -
      ${application.status}`;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit"

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";  

    editButton.addEventListener("click", function(){
      editingApplicationId = application.id;
      document.querySelector("#company").value = application.company;
      document.querySelector("#position").value = application.position;
      document.querySelector("#location").value = application.location;
      document.querySelector("#status").value = application.status;
      document.querySelector("#date").value = application.date;

    })
    
    deleteButton.addEventListener("click", function(){

       applications = applications.filter(function(app){
            return app.id !== application.id;
               
       });                                  

      renderApplications();

    });

    li.append(editButton);
    li.append(deleteButton);
    applicationList.append(li);
    totalApplications.textContent = applications.length;

    interviews.textContent =
    applications.filter(function(app){
      return app.status === "interview";
    }).length;
    
    offers.textContent =
    applications.filter(function(app){
      return app.status === "offer";
    }).length;

   
   });

   localStorage.setItem("applications", JSON.stringify(applications));

}

const savedProfile = localStorage.getItem("profile");

  if(savedProfile){
    profileData = JSON.parse(savedProfile);
  }
  
  if(profileData){

    document.querySelector("#name").value = profileData.name;
    document.querySelector("#email").value = profileData.email;
    document.querySelector("#phone").value = profileData.phone;
    document.querySelector("#profile-location").value = profileData.location;
    document.querySelector("#target-role").value = profileData.targetRole;
    document.querySelector("#skills").value = profileData.skills;

  }


profileForm.addEventListener("submit", function(event){
  event.preventDefault();
  
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone =  document.querySelector("#phone").value;
  const location = document.querySelector("#profile-location").value;
  const targetRole = document.querySelector("#target-role").value;
  const skills = document.querySelector("#skills").value;

  const profile = {
    name: name,
    email: email,
    phone: phone,
    location: location,
    targetRole: targetRole,
    skills: skills
  };

  profileData = profile;

  localStorage.setItem("profile", JSON.stringify(profileData));

});

renderApplications();



