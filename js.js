$(".slider").each(function () {
  // For every slider
  var $this = $(this); // Current slider
  var $group = $this.find(".slide-group"); // Get the slide-group (container)
  var $slides = $this.find(".slide"); // Create jQuery object to hold all slides
  var buttonArray = []; // Create array to hold navigation buttons
  var currentIndex = 0; // Hold index number of the current slide
  var timeout; // Sets gap between auto-sliding

  function move(newIndex) {
    // Creates the slide from old to new one
    var animateLeft, slideLeft; // Declare variables

    advance(); // When slide moves, call advance() again

    // If it is the current slide / animating do nothing
    if ($group.is(":animated") || currentIndex === newIndex) {
      return;
    }

    buttonArray[currentIndex].removeClass("active"); // Remove class from item
    buttonArray[newIndex].addClass("active"); // Add class to new item

    if (newIndex > currentIndex) {
      // If new item > current
      slideLeft = "100%"; // Sit the new slide to the right
      animateLeft = "-100%"; // Animate the current group to the left
    } else {
      // Otherwise
      slideLeft = "-100%"; // Sit the new slide to the left
      animateLeft = "100%"; // Animate the current group to the right
    }
    // Position new slide to left (if less) or right (if more) of current
    $slides.eq(newIndex).css({ left: slideLeft, display: "block" });

    $group.animate({ left: animateLeft }, function () {
      // Animate slides and
      $slides.eq(currentIndex).css({ display: "none" }); // Hide previous slide
      $slides.eq(newIndex).css({ left: 0 }); // Set position of the new item
      $group.css({ left: 0 }); // Set position of group of slides
      currentIndex = newIndex; // Set currentIndex to the new image
    });
  }

  function advance() {
    // Used to set
    clearTimeout(timeout); // Clear previous timeout
    timeout = setTimeout(function () {
      // Set new timer
      if (currentIndex < $slides.length - 1) {
        // If slide < total slides
        move(currentIndex + 1); // Move to next slide
      } else {
        // Otherwise
        move(0); // Move to the first slide
      }
    }, 4000); // Milliseconds timer will wait
  }

  $.each($slides, function (index) {
    // Create a button element for the button
    var $button = $('<button type="button" class="slide-btn">&bull;</button>');
    if (index === currentIndex) {
      // If index is the current item
      $button.addClass("active"); // Add the active class
    }
    $button
      .on("click", function () {
        // Create event handler for the button
        move(index); // It calls the move() function
      })
      .appendTo(".slide-buttons"); // Add to the buttons holder
    buttonArray.push($button); // Add it to the button array
  });

  advance(); // Script is set up, advance() to move it
});

$(".tab-list").each(function () {
  // Find lists of tabs
  var $this = $(this); // Store this list
  var $tab = $this.find("li.active"); // Get the active list item
  var $link = $tab.find("a"); // Get link from active tab
  var $panel = $($link.attr("href")); // Get active panel

  $this.on("click", ".tab-control", function (e) {
    // When click on a tab
    e.preventDefault(); // Prevent link behavior
    var $link = $(this), // Store the current link
      id = this.hash; // Get href of clicked tab

    if (id && !$link.is(".active")) {
      // If not currently active
      $panel.removeClass("active"); // Make panel inactive
      $tab.removeClass("active"); // Make tab inactive

      $panel = $(id).addClass("active"); // Make new panel active
      $tab = $link.parent().addClass("active"); // Make new tab active
    }
  });
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Send Mail JS


function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  const serviceID = "service_r40yiu8";
  const templateID = "template_i1vu2zb";

  emailjs.send(serviceID, templateID, params)
    .then((res) => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    console.log(res);
    alert("your nessage sent successfully");
  })
  .catch((err) => console.log(err));
}


