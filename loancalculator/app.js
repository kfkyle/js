// listend for Submit
document.getElementById('loan-form').addEventListener('submit', calculateResults)

// Define calculate results
function calculateResults(e){
    console.log('Calculating...');
    e.preventDefault();

    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) *12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    // isFinite method determmines is a Finite number
    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        // toFixed method gives us to 2 decimal places
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    } else {
        showError('Please check your numbers');
    }

    e.preventDefault();
    
}

// Define showError
function showError(error){
    // Create a div
    const errorDiv = document.createElement('div');

    // Get Elemnets
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger';

    // Create text node an append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// Define ClearError
function clearError(){
    document.querySelector('.alert').remove();
}