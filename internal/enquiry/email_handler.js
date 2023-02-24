// Sends create email.
export function createAndSend(emailID){
    console.log("EmailID - " + emailID)
    var url = "https://maker.ifttt.com/trigger/email/with/key/ecn29mD7YV78bOkjimMPI9l5QIg4nqAZyqe3z20TUod?value1=" + (emailID);
    console.log(url)
    document.getElementById("internal_email").insertAdjacentHTML('afterbegin', '<iframe src="' + url + '" style="border:0px #ffffff none;" name="emailIFrame" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="0px" width="0px" allowfullscreen></iframe>');
}
// Sends delete email.
export function deletedEmail(emailID){
    console.log("EmailID - " + emailID)
    var url = "https://maker.ifttt.com/trigger/enquiry_deleted/with/key/ecn29mD7YV78bOkjimMPI9l5QIg4nqAZyqe3z20TUod?value1=" + (emailID);
    console.log(url)
    document.getElementById("internal_email").insertAdjacentHTML('afterbegin', '<iframe src="' + url + '" style="border:0px #ffffff none;" name="emailIFrame" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="0px" width="0px" allowfullscreen></iframe>');
}