/// ---------
/// Variables

var index = 0;

/**
 * onLoad: Executed when the page loads.
 * parameters: function, the callback to invoke
 * return: n/a
 */

$(window).on('load', function(){

    if(document.getElementById('home_html')){ $('#home_nav').css('border-style', 'solid')};

    const workshopImage = new Image();
    const icpcImage     = new Image();

    workshopImage.src = 'img/conference.PNG' ;
    icpcImage.src     = 'img/busImg.PNG'     ;

    $('#topic_2_picture') .css('background-image', 'url(img/conference.PNG)' );
    $('#topic_3_picture') .css('background-image', 'url(img/busImg.PNG)'     );

    $('.section').css('height', ($(window).innerHeight() -
                                $('.header').outerHeight()).toString() + "px");

    // Fit the topics
    fitTopicBlurbs();

    // Show the slides
    showSlides();

});

/**
 * onScroll: Executed when the page is scrolling
 * parametrs: function, the callback to invoke
 * return: n/a
 */

$(window).on('scroll', function(){

    // Get the calculate values
    var scrollTop           = $(this).scrollTop();
    var headerWrapperHeight = $('.header').outerHeight();
    var offset              = headerWrapperHeight/2;
    var calc                = scrollTop - offset;

    // Check the calculation
    if(calc < 0){

        // Keep it invisible
        $('.header').css('background-color', '#b1020200');
        $('.header').css('box-shadow', 'none');

    }else if(calc >= 0){

        // Make it appear
        $('.header').css('background-color', '#b10202ff');
        $('.header').css('box-shadow', '2px 1px 4px  #000000');

    }

});

/**
 * onResize: Invoked when the window has been resized
 * parameters: function, the callback to invoke
 * return: n/a
 */

$(window).on('resize', function(){

    // Keep the section height proportional to the window
    $('.section').css('height', ($(window).innerHeight() -
                                $('.header').outerHeight()).toString() + "px");
    // Fit the topics
    fitTopicBlurbs();

});

// -----------------------------------------
// This Event listener disables the context
// Menu under 'normal' operating conditions.
// Looking at you developer.

/*$(window).on('contextmenu', function(){

    return false;

});*/

/**
 * showSlides: Rotates through the available slides indefinitely
 * parameters: n/a
 * output: n/a
 */

function showSlides() {

    const slides = ['img/img1.jpg', 'img/img2.jpg', 
                    'img/img3.jpg', 'img/img4.jpg'];

    $('.banner').css('background-image', 'url("' + slides[index] + '")');

    index++; index %= 4;

    setTimeout(showSlides, 5000);

}

/**
 * fitTopicBlurbs: Sets the height of each topic blurb within
 * each topic as an even division of the amount of blurbs within a topic
 * parameters: n/a
 * output: n/a
 */

function fitTopicBlurbs() {

    // Iterate through each section
    $('.section').each(function(index, section) {

        // We want to get the amount (in pixels) of the siblings that occupy
        // the section that are not of type 'section_content'
        var occupied = 0;

        // Iterate through each child
        $.each(section.children, function(index, child) {

            // Check to see if they're not of type section_content
            if($(child).attr('class') != 'section_content') {

                // Get the margin from the top and bottom
                // The .css method returns a string with 'px' at the end
                const marginTop    = $(child).css('marginTop');
                const marginBottom = $(child).css('marginBottom');

                // Convert to integers
                const marginTopValue    = parseInt(marginTop    .substring(0, marginTop.length    - 2));
                const marginBottomValue = parseInt(marginBottom .substring(0, marginBottom.length - 2));

                // aggregate it to the occupied
                occupied += ($(child).outerHeight() + marginTopValue + marginBottomValue);

            }

        });

        // Get each section_content under the section
        $(section).find('.section_content').css('height', ($(section).height() - occupied).toString() + 'px');

        // Iterate through each section's content in case there's multiple
        // in each section
        $(section).find('.section_content').each(function(index, sectionContent) {

            // Calculate the height of each of the topics
            const topicHeight = (1 / sectionContent.children.length)*($(sectionContent).height());

            // Iterate through each section content's children
            $.each(sectionContent.children, function(index, child) {

                // If the child is a topic, then set the height
                if($(child).attr('class') == 'topic')
                    $(child).css('height', topicHeight.toString() + 'px');

            });

        });

    });

}

/**
 * link click event: invoked when a link is clicked by the user
 * adapted from some website I forgot to save the link for
 * parameters: n/a
 * return n/a
 */
$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {

    // Check for on-page clicks
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
      location.hostname == this.hostname) {

      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      // Does a scroll target exist?
      if (target.length) {

        $('html, body').animate({

          // We want to scroll to the top with the offset of the header since
          // it persists
          scrollTop: target.offset().top - $('.header').outerHeight()
        
        }, 400, function() { /* No Callback */ });

      }

    }

});
