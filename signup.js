const form = document.getElementById('form')
const firstname = document.getElementById('firstname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const repeat = document.getElementById('repeat-password')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) =>{
    

    let errors = []

    if (firstname){
        // if we have a firstname input then we are in the signup
        errors = getSignupFormErrors(firstname.value, email.value, password.value, repeat.value)
    }
    else{
        // if we dpnt have a firstname input then we are in the login
        errors = getLoginFormErrors(email.value, password.value)
    }

    if(errors.length > 0){
        // if theres any errors prevent from loading
        e.preventDefault()
        error_message.innerText = errors.join(". ")
    }
})

// errors function
function getSignupFormErrors(firstnames, emails, passwords, repeats){
    let errors = []

    if (firstnames === '' || firstnames == null){
        errors.push('Firstname is required')
        firstname.parentElement.classList.add('Incorrect')
    }
    if (emails === '' || emails == null){
        errors.push('Email is required')
        email.parentElement.classList.add('Incorrect')
    }
    if (passwords === '' || passwords == null){
        errors.push('Password is required')
        password.parentElement.classList.add('Incorrect')
    }

    // if length of password is not long enough
    if(passwords.length < 8){
        errors.push('Password must have atleast 8 characters.')
        password.parentElement.classList.add('Incorrect')
    }

    // check if password is the same as repeated password
    if (passwords !== repeats){
        errors.push('Password does not match confirm password')
        password.parentElement.classList.add('Incorrect')
        repeat.parentElement.classList.add('Incorrect')
    }

    return errors;
}

// login error message
function getLoginFormErrors(emails, passwords){
    let errors = []

    if (emails === '' || emails == null){
        errors.push('Email is required')
        email.parentElement.classList.add('Incorrect')
    }
    if (passwords === '' || passwords == null){
        errors.push('Password is required')
        password.parentElement.classList.add('Incorrect')
    }

    if(passwords.length < 8){
        errors.push('Password must have atleast 8 characters.')
        password.parentElement.classList.add('Incorrect')
    }

    return errors
}

// to remove the error message when the user start typing

const all_inputs = [firstname, email, password, repeat].filter(input => input!= null )


all_inputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('Incorrect')){
            input.parentElement.classList.remove('Incorrect')
            error_message.innerText= ''
        }
    })
})