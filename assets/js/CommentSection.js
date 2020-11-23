
function upload(){
    //get current time
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    //get your image
    var image=document.getElementById('image').files[0];
    //get your blog text
    var postedComment=document.getElementById('comentSectionId').value;
    //get your email
    var emailforComment = document.getElementById('emailForCommentSection').value;
    //get your userName
    var userNameinComment= document.getElementById('usernameForComment').value;
    //get image name
    var imageName=image.name;
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef=firebase.storage().ref('comment_Section/'+imageName);
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask=storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed',function(snapshot){
        //get task progress by following code
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("upload is "+progress+" done");
    },function(error){
        //handle error here
        console.log(error.message);
    },function(){
        //handle successfull upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            //get your image download url here and upload it to databse
            //our path where data is stored ...push is used so that every post have unique id
            firebase.database().ref('comment_Section/').push().set({
                userName : userNameinComment,
                email: emailforComment,
                text :postedComment,
                commentTime : dateTime,
                imageURL:downloadURL
            },function(error){
                if(error){
                    alert("Error while uploading");
                }else{
                    alert("Successfully uploaded");
                    //now reset your form
                    document.getElementById('comment-Form').reset();
                    getdata();
                }
            });
        });
    });

}

window.onload=function(){
    this.getdata();
}


function getdata(){
    firebase.database().ref('comment_Section/').once('value').then(function(snapshot){
        //get your posts div
        var posts_div = document.getElementById('firebaseComment');
        //remove all remaining data in that div
        firebaseComment.innerHTML="";
        //get data from firebase
        var data=snapshot.val();
        console.log(data);
        //now pass this data to our posts div
        //we have to pass our data to for loop to get one by one
        //we are passing the key of that post to delete it from database

        for(let[key,value] of Object.entries(data)){
            posts_div.innerHTML=
                "<div class='comment-box section-padding-top p-relative'>"+
            "<div id='comment-box'>"+
            "<ul class='comments'>"+
            "<li class='comment'>"+
            "<article>"+
            "<div class='comment-avatar'>"+
            "<img src='https://via.placeholder.com/50' class='rounded-circle' alt='comment'>"+
                "</div>"+
                "<div class='comment-content'>"+
            "<div class='comment-meta'>"+
            "<div class='comment-meta-header'>"+
            "<h5 class='text-custom-black fw-600 author mb-3'>"+value.userName+"</h5>"+
            "<div class='post-date'>"+
            "<a href='comment.html' class='date text-custom-white'>"+value.commentTime+"</a>"+
            "</div></div><div class='comment-meta-reply'>"+
            "<a href='#' class='comment-reply-link btn-first btn-submit text-light-blue'><i class='fas fa-reply'></i></a></div></div>"+
            "<div class='comment'>"+
            "<p class='text-light-white'>"+value.text+"</p></div></div></article></li></ul></div></div>"
            +posts_div.innerHTML;
        }

    });
}