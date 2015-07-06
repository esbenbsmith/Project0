$ (function () {


  // constructor functions
  function Posts(topic, expression) {
    this.topic = topic;
    this.expression = expression;
  }

   // `Posts.all` contains our seed data
  Posts.all = [
    new Posts( 'Bad diet choices','I drank 4 gallons of coca-cola last night'),
    new Posts( 'lifehacks','I intentionally talk weird to avoid people'),
    new Posts( 'Fucked up life!','I have 2 families')
  ];

    Posts.prototype.save = function() {
    
    // store our new post
    Posts.all.push(this);
    console.log(Posts.all);
  };

  Posts.prototype.render = function() {
    
    // append our new open to the page
    var $open = $(opentemplate(this));
    this.index = Posts.all.indexOf(this);
    $open.attr('data-index', this.index);
    $openlist.append($open);
  };
    // form to create new open
  var $newOpen = $('#new-open');

  // element to hold our list of opens
  var $openlist = $('#post-list');

   // open template
  var opentemplate = _.template($('#open-template').html());

    // append existing todos (from seed data) to `$toDoList`
  // `_.each` is an "iterator" function provided by Underscore.js
  _.each(Posts.all, function (open, index) {
    open.render();
  });

   // submit form to create new todo
  $newopen.on('submit', function(event) {
    event.preventDefault();

     // create new toDo object from form data
    var opentopic = $('#topic').val();
    var openexpression = $('#expression').val();
    var Posts = new Posts(opentopic, openexpression);

        // save toDo
    Posts.save();

    // render toDo
    Posts.render();

       // reset the form
    $newopen[0].reset();
    $('#topic').focus();
  });

      // add class to todo on click to mark it as done
  $openlist.on('click', '.openinput', function() {
    $(this).toggleClass('done');
  });

  // remove todo from model and view
  $openlist.on("click", ".delete", function () {
    var $open = $(this).closest(".open");
    var $index = $open.attr('data-index');

    // remove todo from the `ToDo.all` array (model)
    Posts.all.splice(index, 1);
    console.log(Posts.all);

    // remove todo from the DOM (view)
    $open.remove();

    // reset indexes in DOM to match `ToDo.all` array
    // $.each loops through DOM elements
    $('.open').each(function(index) {
      $(this).attr('data-index', index);
    });
  });
  
});
