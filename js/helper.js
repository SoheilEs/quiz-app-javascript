export const formatData = (questions) => {   
    console.log(questions);
    const result = questions.map(item => {
        const questionObject = {
            question: item.question,
        }
        const answers = [...item.incorrect_answers]
        const randomIndex = Math.floor(Math.random() * 4)
        answers.splice(randomIndex,0,item.correct_answer)
        questionObject.answers =answers
        questionObject.correctAnswerIndex = randomIndex
        return questionObject
    })
    return result
}