// random data
const random_data = [
    {
        random_val: 'relowf',
        correct_val:'flower'
    },
    {
        random_val:'owlyl',
        correct_val:'yellow'
    },
    {
        random_val: 'scesca',
        correct_val:'access'
    },
    {
        random_val: 'nragdo',
        correct_val:'dragon'
    },
    {
        random_val: 'mtacpi',
        correct_val:'impact'
    }

];

// get only one random object from list
const getRandomWordFromList = (random_data_list)=>{
    const randomIndex = Math.floor(Math.random() * random_data_list.length);
    return random_data_list[randomIndex];
}
var current_selected_val; 
// handel and add event listner after the Dom Content loaded 
document.addEventListener('DOMContentLoaded',()=>{
   let defualt_random_word = {
        random_val:'relowf',
        correct_val:'flower'
    }
     current_selected_val = defualt_random_word;
    handelInputFocus();
    document.getElementById('random').addEventListener('click',(e)=>{
        e.preventDefault();
        randomWordView();
        
    })
    
    document.getElementById('rest').addEventListener('click',(e)=>{
        e.preventDefault();
        handelRestAction();
    });
    
    document.querySelector('#inputs_group input[type="text"]:last-child')
    .addEventListener('keydown',(e)=>{
    //   e.preventDefault();
        if (e.key !== 'Backspace' && e.key !== 'Delete') {
            console.log(e.key )
            setTimeout(()=> handelCheckRandomWord(), 100);
        }
    });
    document.getElementById('test').focus()
});

// get the random word and update the UI with new random word.
const randomWordView = ()=>{
    let guess_words = document.getElementById('guess_words');
    guess_words.replaceChildren();
    let newWord = getRandomWordFromList(random_data);
    current_selected_val = newWord;
    [...newWord.random_val].forEach(character=>{
     let span = document.createElement('span')
     span.innerText = character;
     guess_words.appendChild(span);
    });
}

// handel rest for tries, mistakes, and inputs values to default.
const handelRestAction = ()=>{
    number_tries = 1;
    // rest all inputs values to empty.
    const inputs = document.querySelectorAll('#inputs_group input[type="text"]');
    inputs.forEach(input=>{
        input.value = '';
    });

    // rest the number of tries
    const tries_value = document.querySelector('#tries>p:first-child');
    tries_value.innerText = 'Tries(1/5)';

    //rest the dots for number of tries.
    const circle_tries = document.querySelectorAll('#tries>p:not(:first-child)');
    circle_tries.forEach(circle=>{
        circle.classList.remove('active');
    })

   //rest the list of mistakes character.
   const mistakes_value = document.querySelector('#mistakes span')
   mistakes_value.innerText = '';

   //let the frist child is focus
   document.querySelector('#inputs_group input[type="text"]:first-child').focus();
}

// to handel the focus for each input after write each character.
const handelInputFocus = ()=>{
  
    const inputs = document.querySelectorAll('#inputs_group input[type="text"]');
   inputs.forEach((input,index)=>{
    input.addEventListener('input',(e)=>{
        // Automatically focus on the next input field after input
        if(index<inputs.length-1 && e.target.value){
            inputs[index+1].focus();
        }
    });

    input.addEventListener('keydown', (e)=>{
        if (e.key === 'Backspace' || e.key === 'Delete') {
            // Move focus to the previous input field
            e.target.value = '';
            if (index > 0) {
                inputs[index - 1].focus();
            }
        }
        
    });

   });

}

const addCharacterToMistakesView = (character)=>{
    let mistake_character_view = document.querySelector('#mistakes span');
    console.log(mistake_character_view, mistake_character_view.innerText)
    mistake_character_value = mistake_character_view.innerText;
    if(mistake_character_value === ''){
        mistake_character_view.innerText = character;
    }else{
        mistake_character_view.innerText = mistake_character_value +', ' + character;
    }
    console.log(mistake_character_view.innerText.split(', '))
    if(  mistake_character_view.innerText.split(', ').length >= 6){
        console.log(mistake_character_view.innerText.length)
        handelRestAction();
    }
   
}
// hadel to check if the word is correct or not
const handelCheckRandomWord = ()=>{
    let mistakes_character = [];
    let correct_characters = [...current_selected_val.correct_val]
    const inputs = document.querySelectorAll('#inputs_group input[type="text"]');
    inputs.forEach((input,index)=>{
       if(input.value !== correct_characters[index]){
          mistakes_character = [...mistakes_character, input.value]
       }
    });
    if(mistakes_character.length ===0){
      alert('🎉 Success')
    }else{
        mistakes_character.forEach(character=>addCharacterToMistakesView(character));
        handelTriesView()
    }
    console.log('mistakes characters: ', mistakes_character)
}

var number_tries = 1;
const handelTriesView = ()=>{
    if(number_tries !==1 && number_tries !==6)
    {    number_tries ++;
        // rest the number of tries
        const tries_value = document.querySelector('#tries>p:first-child');
        tries_value.innerText = `Tries(${number_tries}/5)`;
    
        //rest the dots for number of tries.
        const circle_tries = document.querySelectorAll('#tries>p:not(:first-child)');
        
        circle_tries.forEach(circle=>{
            circle.classList.remove('active');
        })
        for (let index = 0; index < number_tries; index++) {
            circle_tries[index].classList.add('active');
            
        }
    }else if(number_tries === 6){
           handelRestAction()
    }else{
        number_tries ++;
    }
    console.log(number_tries);
}