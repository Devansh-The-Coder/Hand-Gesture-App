 var prediction1 = null
 var prediction2 = null
Webcam.set({
    width: 300, height: 300, image_format:'jpg', jpg_quality: 90   
})
camera = document.getElementById("camera")
Webcam.attach("#camera")
function takeSnapshot() {
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src = "'+data_uri+'">'
}
)     
}
console.log("ml5 version:", ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/XPwHG1zqy/model.json",modelLoaded)
function modelLoaded(){
    console.log("Model is loaded!")
}
function speak(){
var Synth = window.speechSynthesis
var speakDataOne = "The first computer prediction is : " + prediction1
var SpeakDataTwo = "The second computer prediction is : "+prediction2
var Utter = new SpeechSynthesisUtterance(speakDataOne + SpeakDataTwo)
Synth.speak(Utter)
}
function checkImage() {
    img = document.getElementById("captured_image")
    classifier.classify(img,gotResult)
} 
function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log("Results")
        document.getElementById("result_emotion_name").innerHTML=results[0].label; document.getElementById("result_emotion_name_2").innerHTML=results[1].label
        prediction1 = results[0].label
        prediction2 = results[1].label
        speak()
        //prediction 1
        if (results[0].label == "Best") {
            document.getElementById("update_emoji").innerHTML="👍"
        }   
        if (results[0].label == "Victory") {
            document.getElementById("update_emoji").innerHTML="✌"
        }   
        if (results[0].label == "Amazing") {
            document.getElementById("update_emoji").innerHTML="👌"
        }   
        //prediction 2
        if (results[1].label == "Best") {
            document.getElementById("update_emoji_2").innerHTML="👍"
        }   
        if (results[1].label == "Victory") {
            document.getElementById("update_emoji_2").innerHTML="✌"
        }   
        if (results[1].label == "Amazing") {
            document.getElementById("update_emoji_2").innerHTML="👌"
        }   
    }
}

