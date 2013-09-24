$(document).ready(function() {

	/** globals */
  	start = new Date().getTime();
  	sign_up_time = null;
    visit_time = null;
    first_section_time = null; 
    second_section_time = null;
    third_section_time = null;
    scrollPercent = null;
    scrollAmount = null;
    lastFixPos = 0;
	  threshold = 200;
	  counter = 0;
	  start_three_hundreds = null;
    maxScrolled = 0;
    lastScrollAmount = 0;
    
    /** percent viewed */
    $(document).scroll(function(e){
      scrollAmount = $(window).scrollTop();
      var documentHeight = $(document).height();
      var winHeight = $(window).height();
      scrollPercent = (scrollAmount / (documentHeight - winHeight)) * 100;
      //console.log("Current scroll percent: " + scrollPercent);
    });

    /** total scrolled */
	  $(window).on('scroll', function(){
	    var diff = Math.abs($(window).scrollTop() - lastFixPos);
	    if(diff > threshold){
	      counter += diff;
	      lastFixPos = $(window).scrollTop();
	    } 
	   });

	/** conversion - time until user clicks sign-up */
   $(".sign_up").on('click', function(e) {
        sign_up_time = (e.timeStamp - start) / 1000;
        console.log("Seconds passed: " , sign_up_time)
    })
       
   /** exit - time until user exits the page */
   $(".exit").on('click', function(e) {
       visit_time += (e.timeStamp - start) / 1000;
        console.log("Time spent on page: " , visit_time)
    })

   	/** time user spends in 1st section of the page */
    $('.hundreds').mouseenter(function(e) {
       start_hundreds = e.timeStamp;
       // var formatted_time = Date(start);
    });
   $(".hundreds").mouseleave(function(e) {
        first_section_time += (e.timeStamp - start_hundreds) / 1000;
        console.log("Time spent in 1st section: " , first_section_time)
    })

    /** time user spends in 2nd section of the page */
    $('.two_hundreds').mouseenter(function(e) {
       start_two_hundreds = e.timeStamp;
       // var formatted_time = Date(start);
    });
   $(".two_hundreds").mouseleave(function(e) {
        second_section_time += (e.timeStamp - start_two_hundreds) / 1000;
        console.log("Time spent in 2nd section: " , second_section_time)
    })

    /** time user spends in third section of the page */
    $('.three_hundreds').mouseenter(function(e) {
       start_three_hundreds = e.timeStamp;
       // var formatted_time = Date(start);
    });
    $(".exit").on('click', function(e) {
      third_section_time += (e.timeStamp - start_three_hundreds) / 1000;
      console.log("Time spent in 3rd section: " , third_section_time)
    })

    /** append output to lightbox */
  	$('.metrics').click(function() {
  		$(".test").append(
  			"Time passed until sign-up: " + sign_up_time + '<br/>' +
  			"Time spent on page: " + visit_time + "<br/>" +
  			"Time spent in 1st section: " + first_section_time + '<br/>' +
  			"Time spent in 2nd section: " + second_section_time + '<br/>' +
  			"Time spent in 3rd section: " + third_section_time + '<br/>' +
  			"Percent of page viewed: " + scrollPercent + '%<br/>' +
  			"Number of pixels traversed: " + counter + '<br/>' +

        "<div id='vertgraph'>" +
          "<ul>" +
              "<li class='one' style='height:" + (first_section_time * 20) + "px;'>" + Math.round(first_section_time) + "</li>" +
              "<li class='two' style='height:" + (second_section_time * 20) + "px;'>" + Math.round(second_section_time) + "</li>" +
              "<li class='three' style='height:" + (third_section_time * 20) + "px;'>" + Math.round(third_section_time) + "</li>" +
          "</ul>" +
        "</div>"
  		)	
  	})

    /** clear lightbox */
  	$('.close').click(function() {
  		$(".test").empty()	
  	})
});

