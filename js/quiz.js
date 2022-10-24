// ==========================
// Quiz main
// ==========================
var score = 0;
var current_question_id = 1;
var current_question = questions[current_question_id];
var num_of_questions = Object.keys(questions).length;


var start_quiz = function()
{
    $('.content-modal').fadeOut();

    setTimeout(function()
    {
        write_question_screen();
        $('.content-modal').show();
    }, 1000);
}


var restart_quiz = function()
{
    $('.content-modal').fadeOut();

    score = 0;
    current_question_id = 1;
    current_question = questions[current_question_id];

    setTimeout(function()
    {
        write_question_screen();
        $('.content-modal').show();
    }, 1000);
}


var get_next_question = function()
{
    setTimeout(function()
    {
        if(current_question_id < num_of_questions)
        {
            current_question_id += 1;
            current_question = questions[current_question_id];
            write_question_screen();
            $('.content-modal').show();
        }else
        {
            //end of quiz
            write_score_screen();
            $('.content-modal').show();
        }     
    }, 1000);
}


var check_answer = function(answer)
{
    var ans = $(answer).val();

    $('.content-modal').fadeOut();

    if(ans == current_question.correct_answer)
    {
        score += 1;
        document.getElementById('success').play();
    }else
    {
        document.getElementById('fail').play();
    }

    get_next_question();
}; 


var get_final_message = function()
{
    if(((score/num_of_questions)*100) <= configs["classification"]["level1"])
    {
        level = "level1";
    }else if (((score/num_of_questions)*100) > configs["classification"]["level1"] && ((score/num_of_questions)*100) <= configs["classification"]["level2"])
    {
        level = "level2";
    }else
    {
        level = "level3";
    }

    return configs["final_message"][level];
}


var write_question_screen = function()
{
    if(current_question.image_url)
    {
        modal = "<div class='modal-header'><div class='text-justify quiz-question'><h3 class='modal-title'>" + current_question.question + "</h3><div class='question-img'><img class='img-fluid img-size' src=" + current_question.image_url + "></div></div></div>";
    }else
    {
        modal = "<div class='modal-header'><div class='text-justify quiz-question'><h3 class='modal-title'>" + current_question.question + "</h3><div class='question-img'></div></div></div>";
    }

    modal += "<div class='modal-body'><div class='quiz' id='quiz' data-toggle='buttons'>";

    if(current_question.type == "multi")
    {
        modal += "<button class='element-animation1 btn btn-lg btn-light btn-block text-dark' value='a1' onclick='check_answer(this)'>" + current_question.answers.a1 + "</button>";
        modal += "<button class='element-animation2 btn btn-lg btn-light btn-block text-dark' value='a2' onclick='check_answer(this)'>" + current_question.answers.a2 + "</button>";
        modal += "<button class='element-animation3 btn btn-lg btn-light btn-block text-dark' value='a3' onclick='check_answer(this)'>" + current_question.answers.a3 + "</button>";
    }else if(current_question.type == "vf")
    {
        modal += "<button class='element-animation1 btn btn-lg btn-light btn-block text-dark' value='a1' onclick='check_answer(this)'>" + current_question.answers.a1 + "</button>";
        modal += "<button class='element-animation2 btn btn-lg btn-light btn-block text-dark' value='a2' onclick='check_answer(this)'>" + current_question.answers.a2 + "</button>";
    }
    
    modal += "</div></div><div class='modal-footer' style='justify-content: space-between;'><div class='quiz-bold-white-content link-footer' onclick='restart_quiz()'>Recomeçar</div><span class='quiz-bold-white-content'>Pontuação: " + score + "</span></div>";

    $(".content-modal").html("");
    $(".content-modal").html(modal);
};


var write_score_screen = function()
{
    modal = "<div class='modal-header'><h2 class='col-12 modal-title text-center'><span class='label label-warning' id='qid'></span>Pontuação</h2></div>";
    modal += "<div class='modal-body'><div class='final-score quiz-bold-white-content'>" + score + "/" + num_of_questions + "</div></br><div class='final-message quiz-bold-white-content'>" + get_final_message() + "</div></br><button class='element-animation1 btn btn-lg btn-light text-dark btn-score' onclick='restart_quiz()'>Reiniciar</button></div>";
    modal += "<div class='modal-body'> <button class='element-animation1 btn btn-lg btn-light text-dark btn-score' onclick='write_final_screen()'>Finalizar</button></div>";
    modal += "<div class='modal-footer' style='justify-content: space-between'></div>";
    
    
    $(".content-modal").html("");
    $(".content-modal").html(modal);
}; 


var write_final_screen = function()
{
    modal = "<div class='modal-header'><h3 class='col-12 modal-title text-center'></h3></div>";
    modal += "<div class='modal-body'> <div class='capa text-center'><img class='img-fluid log-fim' src='images/NR35Min.png' alt=''></div></br><div class='thank-message quiz-bold-white-content'> Obrigada pela sua participação! </div></div>";
    modal += "<div class='modal-footer' style='justify-content: space-between'></div>";
    
    
    $(".content-modal").html("");
    $(".content-modal").html(modal);
}; 


