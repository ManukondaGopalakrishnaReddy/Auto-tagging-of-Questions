
function addOption(selectBoxId) {
    // Get the select box element
    var selectBox = document.getElementById(selectBoxId);
    
    // Display a dialog box for entering a new option
    var newOption = prompt("Enter a new option:");
    
    // Create a new option element if a value is entered
    if (newOption) {
      // Create a new option element
      var option = document.createElement("option");
      
      // Set the text of the new option
      option.text = newOption;
      
      // Add the new option to the select box
      selectBox.add(option);
      var storedOptions = localStorage.getItem(selectBoxId);
          if (storedOptions) {
              storedOptions = JSON.parse(storedOptions);
              storedOptions.push(newOption);
          } else {
              storedOptions = [newOption];
          }
          localStorage.setItem(selectBoxId, JSON.stringify(storedOptions));
    }
  }
  function loadStoredOptions(selectBoxId) {
      var storedOptions = localStorage.getItem(selectBoxId);
      if (storedOptions) {
          storedOptions = JSON.parse(storedOptions);
          var selectBox = document.getElementById(selectBoxId);
          for (var i = 0; i < storedOptions.length; i++) {
              var option = document.createElement("option");
              /*if(storedOptions[i]!="hello")
              {
                  option.text = storedOptions[i];
                  selectBox.add(option); 
              }*/
             if(storedOptions[i]=="hello")
             {
                  option.text = storedOptions[i];
                  selectBox.remove(option); 
              }
              else
              {
                  option.text=storedOptions[i];
                  selectBox.add(option);
              }
              
          }
      }
  }

  // Load stored options for each select box when the page loads
  window.onload = function() {
      loadStoredOptions('Taxonomy');
      loadStoredOptions('Difficulty');
      loadStoredOptions('Category');
      loadStoredOptions('SubCategory');
  };
  function displayValues() {
      // Get the question
      var question = document.getElementById("question").innerText;
  
      // Get the selected box values
      var taxonomy = document.getElementById("Taxonomy").value;
      var difficulty = document.getElementById("Difficulty").value;
      var category = document.getElementById("Category").value;
      var subcategory = document.getElementById("SubCategory").value;
  
      // Construct the new content using input elements
      var result = "<h2>" + question + "</h2>" + "<br>" +
          "<b>Taxonomy:</b> " +
          "<input type='text' value='" + taxonomy + "' readonly>" + "<br><br>" +
          "<b>Difficulty:</b> " +
          "<input type='text' value='" + difficulty + "' readonly>" + "<br><br>" +
          "<b>Category: </b>" +
          "<input type='text' value='" + category + "' readonly>" + "<br><br>" +
          "<b>Subcategory:</b> " +
          "<input type='text' value='" + subcategory + "' readonly>" + "<br><br><br>" +
          "<button id='mainpage' style='background-color:#006400; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 20px; border-radius: 4px; cursor: pointer;'>Go to Main Page</button>";
  
      // Replace the current page with the new content
    document.getElementById("result").innerHTML = result;
    // Get the mainButton element
     var mainButton = document.getElementById("mainpage");

    // Add an event listener to the "mainButton"
    if (mainButton) {
    mainButton.addEventListener("click", function () {
        // Change the location to the desired URL (index.html)
        window.location.href = "./index"; 
    });
}

    }
function removeOption(selectBoxId) {
// Get the select box element
var selectBox = document.getElementById(selectBoxId);

// Get the selected index and value
var selectedIndex = selectBox.selectedIndex;
var selectedValue = selectBox.value;

// Remove the selected option from the select element
selectBox.remove(selectedIndex);

// Retrieve the stored options from local storage
var storedOptions = JSON.parse(localStorage.getItem("options"));

// Filter the array to exclude the selected option
storedOptions = storedOptions.filter(function(option) {
return option !== selectedValue;
});

// Update the stored options in local storage
localStorage.setItem("options", JSON.stringify(storedOptions));
}

