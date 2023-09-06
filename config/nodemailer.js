const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

console.log('nodemailer running');

let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'sdevesh227@gmail.com',
        pass:'mekkybjjnmqtjuyg'
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        //template is an whole html code.
        function(err,template){
            if(err){
                console.log('error in rendering template',err);
                return;
            }
        //    console.log('*****tempelate:',template);
            mailHTML=template
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}