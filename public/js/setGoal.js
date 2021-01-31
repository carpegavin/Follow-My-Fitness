// $(function() {
    $(".change-complete").on("click", function(event) {
      var id = $(this).data("id");
      var newComplete = $(this).data("newcomplete");
  
      var newCompleteState = {
        completed: newComplete
      };
  
      // Send the PUT request.
      $.ajax("/api/goal/" + id, {
        type: "PUT",
        data: newCompleteState
      }).then(
        function() {
          console.log("changed goal to", newComplete);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
//     $(".create-goal").on("submit", function(event) {
//       // Make sure to preventDefault on a submit event.
//       event.preventDefault();
  
//       var newGoal = {
//         goalSetByUser: $("#userGoal").val().trim()
//       };
  
//       // Send the POST request.
//       $.ajax("/api/goals", {
//         type: "POST",
//         data: newGoal
//       }).then(
//         function() {
//           console.log("created new goal");
//           // Reload the page to get the updated list
//           location.reload();
//         }
//       );
//     });
  

// })


