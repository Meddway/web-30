const baseUrl ='http://146.185.154.90:8000/blog/john.connor@test.com';

const userNameH3 = document.getElementById('userName')!;
const editProfileBtn = document.getElementById('editProfile')!;
const profileModal = new bootstrap.Modal('#profileModal');
const firstNameInput  = <HTMLInputElement> document.getElementById('firstName')!;
const lastNameInput = <HTMLInputElement> document.getElementById('lastName')!;
const profileForm = <HTMLFormElement>document.getElementById('profileForm');

interface GetProfileResponse {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}

const run = async () => {
  const response = await fetch(baseUrl + '/profile');
  const user: GetProfileResponse = await response.json();

  userNameH3.innerText = user.firstName + ' ' + user.lastName;

  editProfileBtn.addEventListener('click', () =>{
  profileModal.show();
  firstNameInput.value = user.firstName;
  lastNameInput.value = user.lastName;
  });
  profileForm.addEventListener('submit', async event=>{
    event.preventDefault()
    const firsName = firstNameInput.value;
    const lastName = lastNameInput.value;

    const body = new URLSearchParams();
    body.append('firstName', firsName);
    body.append('lastName', lastName);

    try{
      await fetch(baseUrl + '/profile', {method: 'POST', body});
      profileModal.hide();
      userNameH3.innerText = firsName + ' ' + lastName;
      user.firstName = firsName;
      user.lastName = lastName;
    } catch (e) {
      alert ('Something went wrong!');
    }
  })
};

run().catch(console.error);
