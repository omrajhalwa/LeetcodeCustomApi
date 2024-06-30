import express from "express";
import axios from "axios";
const app=express();

console.log("om");


app.get("/api/omrajhalwa/leetcode/upcomingContest",async(req,res)=>{

    try{
        const result=await axios.get(`https://leetcode.com/graphql/?query=query { upcomingContests {    title    titleSlug    startTime    duration    __typename  }  }`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    
    
    
        function convertUnixToITCdate(unixTimestamp) {
           
            var a = new Date(unixTimestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = a.getMonth()+1;
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + '/' + month + '/' + year ;
            return time;
        }

        function convertUnixToITCtime(unixTimestamp) {
           
            var a = new Date(unixTimestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = hour + ':' + min + ':' +sec ;
            return time;
        }
        





    //   console.log(result.data.data.upcomingContests);



       let upcoming_contest=[];
       for (let element of result.data.data.upcomingContests) {
               let object_container={};
               object_container.title=element.title;
               object_container.date=convertUnixToITCdate(element.startTime);
               object_container.time=convertUnixToITCtime(element.startTime);
               upcoming_contest.push(object_container);
       }

       console.log(upcoming_contest);
       
        return   res.status(200).json({
            message:"Succefully data fetched",
            data:upcoming_contest,
            success:true
           })
        
    }catch(err){
       console.log(err);
       res.status(500).json({
        message:err.message,
        success:false
       })
    }
   
    
})

app.listen(8080,()=>{
    console.log(`server listen at port 8080`);
})