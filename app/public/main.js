$(function(){
    // start the friend popup with show value of false
    $('#myModal').modal({ show: false});
    // make the radio buttons fancy
    $( ".radio-item input" ).on( "click", function() {
        $(this).parent(".radio-item").siblings().removeClass("radio-selected");
        $(this).parent(".radio-item").addClass("radio-selected");
    });
    $(`#photo`).on(`change`, function(){
        console.log(`the photo input changed`);
        var link = $(this).val();
        $(`#photoExample`).attr(`src`, link);
    });
});
function radioQuestionsToNumbers(friend){
    $(`.form-group`).each(function(){
        var selected = $(this).find(`:checked`).val();
        if(!selected) return;
        friend.scores.push(parseInt(selected));
    });
}
function radioQuestionsDeselect(){
    $(`.form-group`).each(function(){
        var selected = $(this).find(`:checked`)[0];
        if(!selected) return;
        selected.checked = false;
    });
}
$("#add-btn").on("click", function(event) {
    event.preventDefault();
    var newFriend = {
        name: $("#name").val().trim(),
        photo: $("#photo").val().trim(),
        scores: []
    };
    radioQuestionsToNumbers(newFriend);

    if (newFriend.scores.length !== 10) {
        console.log(`ERROR: Please answer all questions.`);
        newFriend = false;
    }

  if (newFriend) {
        $.ajax({
        type: "POST",
        url: "/api/new",
        data: JSON.stringify(newFriend),
        success: function(data) {
            console.log(`success!!!`);
            console.log(`data: `, data);
            // display match
            $('#myModal').modal('show');
            $('#myModal').find(".modal-title").text(data.name);
            $('#myModal').find("img").attr("src", data.photo);
            // clear input fields after info submitted
            $("#name").val("");
            $("#photo").val("");
            radioQuestionsDeselect();
        },
        contentType: "application/json",
        dataType: 'json'
        });
    }
});
