// CRUD - Create, Read, Update, Delete

// Read - when the browser loads
let baseUrl = "http://localhost:3000";

// Read - when the browser loads
$(document).ready(function () {
  let route = "bucket";
  let endpoint = `${baseUrl}/${route}`;
  // 1) use an endpoint
  // 2) get a response
  //    a) if good - parse response
  //    B) if bad, throw an error
  // 3) do something with parsed data
  // 4) handle any errors
  fetch(endpoint) //A talks to /bucket at B.
    .then(function (response) { //D
      if (!response.ok) {
        throw Error("Issues getting data from server");
      } //D L21: returns data from bucketArray at C in JSON format
      return response.json();
    })  //E
    .then(function (dataArray) {
      $("ul").empty();
      dataArray.forEach(function (bucketItem) {
        let bucketCompleted = bucketItem.isComplete ? "completed": ""
        $("ul").append(
          `<li data-id=${bucketItem.id} class=${bucketItem.isComplete ? "completed": ""}>
          ${bucketItem.description}
          <span><i class="fa fa-trash-alt"></i></span></li>`
        );
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});

// Update
$("ul").on("click", "li", function () {
  let itemId = $(this).data("id")
  let route = `bucket/${itemId}`
  let endpoint = `${baseUrl}/${route}`
  let that = this
  fetch(endpoint, {
    method: "DELETE"
  })
  .then(function(response){
    if(!response.ok){
      throw Error("Issues updating data in the server")
    }
    return response.json()
  })
  .then(function(){
    $(that).toggleClass("completed");
  })
  .catch(function(err){
    console.error(err)
  })
});

// Delete
$("ul").on("click", "span", function (event) {
event.stopPropagation()
let itemId = $(this).parent().data("id")
// console.log(itemId)
let route = `bucket/${itemId}`
let endpoint = `${baseUrl}/${route}`
let that = this
fetch(endpoint, {
  method: "DELETE"
})
.then(function(response){
  if(!response.ok){
    throw Error("Issues deleting data from the server")
  }
  return response.json()
})
.then(function(){
  $(that).parent().remove();
})
.catch(function(err){
  console.error(err)
})




  // $(this).parent().remove();
});


















// Create
$("input").keypress(function (event) {
  if (event.which === 13 && $(this).val().trim()) {
    let route = "bucket";
    let endpoint = `${baseUrl}/${route}`;
    let listItem = {
      description: $(this).val(),
    };
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listItem),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error("Issues posting data to the server");
        }
        return response.json();
      })
      .then(function (data) {
        $("ul").append(
          `<li data-id=${data.id}>${data.description}<span><i class="fa fa-trash-alt"></i></span></li>`
        );
        $(this).val("");
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});



fetch().then().then().catch()