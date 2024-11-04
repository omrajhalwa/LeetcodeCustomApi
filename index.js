import express from "express";
import axios from "axios";
import cors from 'cors';
const app=express();

console.log("om");
app.use(cors()); // Allow all origins


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

        function dateAndTime(unixTimestamp) {
           
          var a = new Date(unixTimestamp * 1000);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = a.getMonth()+1;
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = {date,month ,year};
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
        





       console.log(result.data.data.upcomingContests);



       let upcoming_contest=[];
       for (let element of result.data.data.upcomingContests) {
               let object_container={};
               object_container.title=element.title;
               object_container.date=convertUnixToITCdate(element.startTime);
               object_container.time=convertUnixToITCtime(element.startTime);
               object_container.flag=dateAndTime(element.startTime);
               upcoming_contest.push(object_container);
       }

     

       if(upcoming_contest[0].flag.year>upcoming_contest[1].flag.year){
            let temp=upcoming_contest[0];
            upcoming_contest[0]=upcoming_contest[1];
            upcoming_contest[1]=temp;
       }else if(upcoming_contest[0].flag.year === upcoming_contest[1].flag.year){
                if(upcoming_contest[0].flag.month>upcoming_contest[1].flag.month){
                  let temp=upcoming_contest[0];
                  upcoming_contest[0]=upcoming_contest[1];
                  upcoming_contest[1]=temp;
                }else if(upcoming_contest[0].flag.month === upcoming_contest[1].flag.month){
                  if(upcoming_contest[0].flag.date>upcoming_contest[1].flag.date){
                    let temp=upcoming_contest[0];
                    upcoming_contest[0]=upcoming_contest[1];
                    upcoming_contest[1]=temp;
                  }
                }
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
   
    
});

// problem of the day api.......................................
app.get("/api/omrajhalwa/leetcode/problemoftheday",async(req,res)=>{
    try{
        const result=await axios.get(`https://leetcode.com/graphql/?query=query {  activeDailyCodingChallengeQuestion {    date    userStatus    link    question {      acRate      difficulty      freqBar      frontendQuestionId: questionFrontendId      isFavor      paidOnly: isPaidOnly      status      title      titleSlug      hasVideoSolution      hasSolution      topicTags {        name        id        slug      }    }  } }`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    

      console.log(result.data.data);



      
       
        return   res.status(200).json({
            message:"Succefully data fetched",
            content:result.data.data,
            success:true
           })
        
    }catch(err){
       console.log(err);
       res.status(500).json({
        message:err.message,
        success:false
       })
    }
   

});


app.get(`/api/omrajhalwa/leetcode/username/:userId`,async(req,res)=>{
    console.log(req.params);
    try{
        const result=await axios.get(`https://leetcode.com/graphql/?query=query {  allQuestionsCount {    difficulty    count  }  matchedUser(username: "${req.params.userId}") {    submitStats {      acSubmissionNum {        difficulty        count        submissions      }      totalSubmissionNum {        difficulty        count        submissions      }    }  }  }`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    

      console.log(result.data.data);



      
       
        return   res.status(200).json({
            message:"Succefully data fetched",
            content:result.data.data,
            success:true
           })
        
    }catch(err){
       console.log(err);
       res.status(500).json({
        message:err.message,
        success:false
       })
    }
   

});



app.get(`/api/omrajhalwa/leetcode/skillstat/:userId`,async(req,res)=>{
    console.log(req.params);
    try{
        const result=await axios.get(`https://leetcode.com/graphql/?query=query {  matchedUser(username: "${req.params.userId}") {    tagProblemCounts {      advanced {        tagName        tagSlug        problemsSolved      }      intermediate {        tagName        tagSlug        problemsSolved      }      fundamental {        tagName        tagSlug        problemsSolved      }    }  }    }`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    

      console.log(result.data.data);



      
       
        return   res.status(200).json({
            message:"Succefully data fetched",
            content:result.data.data,
            success:true
           })
        
    }catch(err){
       console.log(err);
       res.status(500).json({
        message:err.message,
        success:false
       })
    }
   

});


app.get(`/api/omrajhalwa/leetcode/languagestat/:userId`,async(req,res)=>{
    console.log(req.params);
    try{
        const result=await axios.get(`https://leetcode.com/graphql/?query=query { matchedUser(username: "${req.params.userId}") {    languageProblemCount {      languageName      problemsSolved    }  }  }`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    

      console.log(result.data.data);



      
       
        return   res.status(200).json({
            message:"Succefully data fetched",
            content:result.data.data,
            success:true
           })
        
    }catch(err){
       console.log(err);
       res.status(500).json({
        message:err.message,
        success:false
       })
    }
   

});


app.get(`/api/omrajhalwa/leetcode/conteststat/:userId`,async(req,res)=>{
    console.log(req.params);
    try{
        const result=await axios.get(`https://leetcode.com/graphql/?query=query { userContestRanking(username: "${req.params.userId}") {    attendedContestsCount    rating    globalRanking    totalParticipants    topPercentage    badge {      name    }  }  userContestRankingHistory(username:"${req.params.userId}") {    attended    trendDirection    problemsSolved    totalProblems    finishTimeInSeconds    rating    ranking    contest {      title      startTime    }  }  }`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    

      console.log(result.data.data);



      
       
        return   res.status(200).json({
            message:"Succefully data fetched",
            content:result.data.data,
            success:true
           })
        
    }catch(err){
       console.log(err);
       res.status(500).json({
        message:err.message,
        success:false
       })
    }
   

});


app.get(`/api/omrajhalwa/leetcode/badgestat/:userId`,async(req,res)=>{
    console.log(req.params);
    try{
        const result=await axios.get(`https://leetcode.com/graphql/?query=query {  matchedUser(username: "${req.params.userId}") {    badges {      id      name      shortName      displayName      icon      hoverText      medal {        slug        config {          iconGif          iconGifBackground        }      }      creationDate      category    }    upcomingBadges {      name      icon      progress    }  }  }`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    

      console.log(result.data.data);



      
       
        return   res.status(200).json({
            message:"Succefully data fetched",
            content:result.data.data,
            success:true
           })
        
    }catch(err){
       console.log(err);
       res.status(500).json({
        message:err.message,
        success:false
       })
    }
   

});

app.get(`/api/omrajhalwa/leetcode/recentac/:userId/:limit`,async(req,res)=>{
    console.log(req.params);
    try{
        const result=await axios.get(`https://leetcode.com/graphql/?query=query {   recentAcSubmissionList(username: "${req.params.userId}", limit:${req.params.limit}) {    id    title    titleSlug    timestamp  }          }`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    

      console.log(result.data.data);



      
       
        return   res.status(200).json({
            message:"Succefully data fetched",
            content:result.data.data,
            success:true
           })
        
    }catch(err){
       console.log(err);
       res.status(500).json({
        message:err.message,
        success:false
       })
    }
   

});

app.get(`/api/omrajhalwa/leetcode/usercalender/:userId/:year`,async(req,res)=>{
    console.log(req.params);
    try{
        const result=await axios.get(`https://leetcode.com/graphql/?query=query {    matchedUser(username: "${req.params.userId}") {    userCalendar(year: ${req.params.year}) {      activeYears      streak      totalActiveDays      dccBadges {        timestamp        badge {          name          icon        }      }      submissionCalendar    }  }   }`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    

      console.log(result.data.data);



      
       
        return   res.status(200).json({
            message:"Succefully data fetched",
            content:result.data.data,
            success:true
           })
        
    }catch(err){
       console.log(err);
       res.status(500).json({
        message:err.message,
        success:false
       })
    }
   

});

app.get(`/api/omrajhalwa/leetcode/userprofilelc/:userId`,async(req,res)=>{
    console.log(req.params);
    try{
        const result=await axios.get(`https://leetcode.com/graphql/?query=query {    matchedUser(username: "${req.params.userId}") {    contestBadge {      name      expired      hoverText      icon    }    username    githubUrl    twitterUrl    linkedinUrl    profile {      ranking      userAvatar      realName      aboutMe      school      websites      countryName      company      jobTitle      skillTags      postViewCount      postViewCountDiff      reputation      reputationDiff      solutionCount      solutionCountDiff      categoryDiscussCount      categoryDiscussCountDiff    }  } }`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    

      console.log(result.data.data);



      
       
        return   res.status(200).json({
            message:"Succefully data fetched",
            content:result.data.data,
            success:true
           })
        
    }catch(err){
       console.log(err);
       res.status(500).json({
        message:err.message,
        success:false
       })
    }
   

});

app.get(`/api/omrajhalwa/leetcode/question/:questionSlug`,async (req,res)=>{
  console.log(req.params.questionSlug);
       try {
         const result=await axios.get(`https://leetcode.com/graphql/?query=query {  question(titleSlug: "${req.params.questionSlug}") {    questionId    questionFrontendId    title    titleSlug    isPaidOnly    difficulty    likes    dislikes  } question(titleSlug: "${req.params.questionSlug}") {    topicTags {      name      slug    }  }  }`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        //  console.group(result);

        return  res.status(200).json({
          message:"Succefully data fetched",
          content:result.data.data,
          success:true
         })
       } catch (error) {
        res.status(401).json({
          message:error,
          success:false
         })
       }
})

app.listen(8080,()=>{
    console.log(`server listen at port 8080`);
})