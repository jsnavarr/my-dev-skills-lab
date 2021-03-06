var lastKey = -1; //this is the key to store each skill entry in localStorage
var myStorage = window.localStorage;

//function to render add the new skill to the const newSkill which is a template literal
function renderNewSkill(template, $data){
    // console.log('data ' + $data);
    return (template($data));
}

const newSkill = (skill) => `
                <div class = "skill-line">
                    <div class = "delete-skill">X</div>
                    <div class = "skill">${skill}</div>
                </div>`;

//this function will read each entry in localStorage to display it in the screen
function getSkills(){
    var count = 0;
    if(myStorage.length){
        for(var i =0; i < myStorage.length; i++){
            $('.all-skills').append($(renderNewSkill(newSkill, myStorage[(myStorage.key(i))])));
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
        $('.all-skills').append($($(renderNewSkill(newSkill, input))));
        lastKey+=1; //key used will be +1 from the last key
        myStorage.setItem(lastKey.toString(), input);
    }
});

//get the skills from localstorage
getSkills();