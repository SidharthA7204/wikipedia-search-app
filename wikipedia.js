// Step 1: Get references to HTML elements using their IDs
let userInputEl = document.getElementById('searchInput'); // The input box where user types
let searchResultsEl = document.getElementById('searchResults'); // The container where results will be displayed

// Step 2: Define options for the fetch request
let options = {
    method: "GET" // We want to GET (retrieve) data from the API
}

// Step 3: Function to create and display each search result item
function createAndApendEchList(each_result) {
    // Extract title, link, and description from the result object
    let {title, link, description} = each_result;
    
    // Create a div container for this result item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item"); // Add CSS class for styling
    searchResultsEl.appendChild(resultItemEl); // Add this div to the search results container
   
    // Create a clickable title link
    let titleEl = document.createElement("a"); // Create anchor (link) element
    titleEl.href = link; // Set where the link goes
    titleEl.textContent = title; // Set the text to display
    titleEl.target = "_blank"; // Open link in new tab
    titleEl.classList.add("result-title"); // Add CSS class for styling
    resultItemEl.appendChild(titleEl); // Add title to result item
   
    // Create a line break for spacing
    let breakel = document.createElement("br");
    resultItemEl.appendChild(breakel); // Add line break to result item
   
    // Create the URL link (displays the actual web address)
    let urlEl = document.createElement("a");
    urlEl.href = link; // Set where the link goes
    urlEl.textContent = link; // Show the URL as text
    urlEl.classList.add("result-url"); // Add CSS class for styling
    resultItemEl.appendChild(urlEl); // Add URL to result item
   
    // Create a paragraph for the description
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description; // Set description text
    descriptionEl.classList.add("link-description"); // Add CSS class for styling
    resultItemEl.appendChild(descriptionEl); // Add description to result item
}

// Step 4: Function to loop through all search results and display them
function displayitems(search_results) {
    // Loop through each result in the array
    for (let each_result of search_results) {
        createAndApendEchList(each_result); // Create and display each result
    }
}

// Step 5: Main function that runs when user presses Enter
function wikipediasearch(event) {
    // Create the API URL with the user's search query
    let url = "https://apis.ccbp.in/wiki-search?search=" + userInputEl.value;
    
    // Check if the user pressed the Enter key
    if (event.key === "Enter") {
        // Clear previous search results before showing new ones
        searchResultsEl.textContent = "";
        
        
        // Make a request to the Wikipedia search API
        fetch(url, options)
            .then(function(response) {
                // Convert the response to JSON format
                return response.json();
            })
            .then(function(json) {
                // Extract the search_results array from the JSON
                let {search_results} = json;
                console.log(search_results); // Show results in browser console (for debugging)
                displayitems(search_results); // Display all the results on the page
                
            });
    }
}

// Step 6: Listen for when user presses a key in the search input
userInputEl.addEventListener("keydown", wikipediasearch);