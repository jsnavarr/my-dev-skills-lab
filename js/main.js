var lastKey = -1; //this is the key to store each skill entry in localStorage
var myStorage = window.localStorage;

//this function will read each entry in localStorage to display it in the screen
function getSkills(){
    var count = 0;
    if(myStorage.length){
        for(var i =0; i < myStorage.length; i++){
            var $v = $(`
                <div class = "skill-line">
                    <div class = "delete-skill">X</div>
                    <div class = "skill">${myStorage[(myStorage.key(i))]}</div>
                </div>`);
            $('.all-skills').append($v);
        }
        lastKey=parseInt(myStorage.key(myStorage.length -1));
    } else {
        lastKey++; //will be equal to 0
    }
}

//event listener to the 'X' to delete skills
$('.all-skills').on('click', '.delete-skill', function deleteSkill(){
    //get the parent of the element clicked
    var $node = $(this).parent(); //the parent of 'delete-skill' which is 'skill-line'

    //remove the entry from storage too
    myStorage.removeItem(myStorage.key($node.index()));

    $(this).closest('.skill-line').fadeOut(1000, function() {
        $(this).remove();
	});
});

//event listener when clicking "add skill"
$('#add-skill').on('click', function(){
    //get the text entered to the input element
    var input = $('input')[0].value;
    //delete the text entered to the input element
    $('input')[0].value="";
    if(input){ //if there is text
        var $v = $(`
            <div class = "skill-line">
                <div class = "delete-skill">X</div>
                <div class = "skill">${input}</div>
            </div>`);
        $('.all-skills').append($v);
        lastKey+=1; //key used will be +1 from the last key
        myStorage.setItem(lastKey.toString(), input);
    }
});

//get the skills from localstorage
getSkills();