// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
   //itirate through the todos array
   var searchArr = todos.filter(function(todo){
     //filter records that match he task and description in req.params
     return (todo.task===req.params.task && todo.description===req.params.desciprtion);
   });
   console.log(searchArr);
  //send the requested todo records
  res.send(searchArr);
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */

  res.send({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   //find maximum id in the todos array
   var maxID=0;
   todos.forEach(function(todo){
     if(todo._id>maxID){
       maxID=todo._id;
     }
   });
   //push the new record into the array. task and description are sent in the body of the HTTP request
   todos.push({_id:maxID+1, task: req.body.task, description: req.body.description});

   todos.forEach(function(todo){
     //look for the new record (maxID+1)
     if(todo._id===maxID+1){
       //send the new todo
       res.send(todo);
     }
   });

});

var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   //convert id string into number
   var idNum = parseInt(req.params.id);
   //loop through the array of todos
   todos.forEach(function(todo){
     //check for the idNum
     if(todo._id===idNum){
       //send the requested todo
       res.send(todo);
     }
   });

});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   //convert id string into number
   var idNum = parseInt(req.params.id);
   //loop through the array of todos
   todos.forEach(function(todo, ind){
     //check for the idNum
     if(todo._id===idNum){
       //once the requested todo record has been found--> update the task and description from req.body
        todo.task=req.body.task;
        todo.description=req.body.description;
       //send the updated todo
       res.send(todo);
     }
   });


});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   //convert id string into number
   var idNum=parseInt(req.params.id);
   //loop through the array of todos
   todos.forEach(function(todo, ind){
     //check for the idNum
     if(todo._id===idNum){
       //remove this todo byusing the split method with the index of the requested record
       todos.splice(ind,1);
     }
   });
   res.send(todos);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
