document.getElementById('subscription').onclick=function () {
    //to get what time subscribed
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    //to get email
    var subscrirEmail = document.getElementById('subscriberEmail').value;

    firebase.database().ref('subscribers/'+subscrirEmail).set({
        subsriber_Email : subscrirEmail,
        subscriptionTime : dateTime
    });
    // ,function(error){
    //     if(error){
    //         alert("Subscription incomplete");
    //     }else{
    //         alert("Successfully Subscribed,We will notify you soon");
    //         //now reset your form
    //         // document.getElementById('subscriberEmail').reset();
    //     }
    // });
}