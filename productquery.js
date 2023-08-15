// Design database for Zen class programme
// users
// codekata
// attendance
// topics
// tasks
// company_drives
// mentors



// users
db.users.insertMany([
    {
      id: 1,
      username: "Vinni",
      img: "https://images.exels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "Vinni@gmail.com",
      age: 26,
    },
    {
      id: 2,
      username: "Reethu",
      img: "https://images.pexels.com/photos/120770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "Reethu@gmail.com",
      status: "passive",
      age: 22,
    },
    {
      id: 3,
      username: "vishal",
      img: "https",
      email: "vishal@gmail.com",
      status: "pending",
      age: 20,
    },
    {
      id: 4,
      username: "Yati",
      img: "https",
      email: "Yati@gmail.com",
      status: "active",
      age: 26,
    },
    {
      id: 5,
      username: "Soumya",
      img: "https",
      email: "Soumya@gmail.com",
      status: "passive",
      age: 27,
    },
  ]);

// topics - date,contents,pre_read,activities
db.topics.insertMany([
    {
        date: "01-oct-2020,02-oct-2020",
        contents: "Database-MongoDB",
        pre_read: "https://docs.mongodb.com/manual/",
        activities: "https://github.com/rvsp/database/blob/master/mongodb/day-2/database-design-zen-class.txt",
      }, 
      {
        date: "08-oct-2020,09-oct-2020",
        contents: "MongoDB",
        pre_read: "https://docs.mongodb.com/manual/",
        activities: "https://github.com/rvsp/database/tree/master/mongodb",
      },
      {
        date: "15-oct-2020,16-oct-2020",
        contents: "Nodejs-Day-1",
        pre_read: "https://nodejs.org/",
        activities: "https://github.com/rvsp/database/tree/master/mongodb",
      },
      {
        date: "22-oct-2020,23-oct-2020",
        contents: "Nodejs-Day-2",
        pre_read: "https://nodejs.org/",
        activities: "Nodejs hall booking api task https://docs.google.com/document/d/1rwPQ2LbHtMZajA_GIZfR-Ko2MFueoT82AmfHTK9V-hM/edit",
      },
      {
        date: "29-oct-2020,30-oct-2020",
        contents: "Nodejs-Day-3",
        pre_read: "https://nodejs.org/",
        activities: "https://github.com/rvsp/database/tree/master/mongodb",
      },
      ])
 
      
// tasks
db.tasks.insertMany([
    {
        date: "01-oct-2020,02-oct-2020",
        activities: "https://github.com/rvsp/database/blob/master/mongodb/day-2/database-design-zen-class.txt",
      }, 
      {
        date: "08-oct-2020,09-oct-2020",
        activities: "https://github.com/rvsp/database/tree/master/mongodb",
      },
      {
        date: "15-oct-2020,16-oct-2020",
        activities: "https://github.com/rvsp/database/tree/master/mongodb",
      },
      {
        date: "22-oct-2020,23-oct-2020",
        activities: "Nodejs hall booking api task https://docs.google.com/document/d/1rwPQ2LbHtMZajA_GIZfR-Ko2MFueoT82AmfHTK9V-hM/edit",
      },
      {
        date: "29-oct-2020,30-oct-2020",
        activities: "https://github.com/rvsp/database/tree/master/mongodb",
      },
])



// Find all the topics and tasks which are thought in the month of October

db.tasks.aggregate([
    { $lookup:
        {
           from: "topics",
           localField: "activities",
           foreignField: "activities",
           as: "topics"
        }
    }
]).pretty();

// Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.company_drives.insertMany([
    {
      user_id: 1,
      companyname: "Amazon",
      date_c:"15 oct-2020",
    },
    {
      user_id: 2,
      companyname: "Google",
      date_c:"12 oct-2020",
    },
    {
      user_id: 3,
      companyname: "TCS",
      date_c:"17 oct-2020",
    },
    {
      user_id: 4,
      companyname: "Microsoft",
      date_c:"10 oct-2020",
    },
    {
      user_id: 5,
      companyname: "DELL",
      date_c:"30 oct-2020",
    },
  ]);

  db.company_drives.find({date_c: {$gte:"15 oct-2020",$lt: "31-oct-2020"}})


// Find all the company drives and students who are appeared for the placement.
db.company_drives.aggregate([
  { $lookup:
      {
         from: "users",
         localField: "id",
         foreignField: "user_id",
         as: "active"
      }
  }
]).pretty();

// Find the number of problems solved by the user in codekata
db.codekata.insertMany([
  {
    id: 1,
    username: "Vinni",
    email: "Vinni@gmail.com",
    problems:8,
  },
  {
    id: 2,
    username: "Reethu",
    email: "Reethu@gmail.com",
    problems:6,
  },
  {
    id: 3,
    username: "vishal",
    email: "vishal@gmail.com",
    problems:8,
  },
  {
    id: 4,
    username: "Yati",
    email: "Yati@gmail.com",
    problems:5,
  },
  {
    id: 5,
    username: "Soumya",
    email: "Soumya@gmail.com",
    problems:4,
  },
]);

db.codekata.find({}, { _id: 0, username: 1, email: 1, problems:1}).sort({ username: 1 }).pretty();
  
// Find all the mentors with who has the mentee's count more than 15
db.mentors.insertMany([
  {
    mentor_Id: 101,
    name: "Sangeetha",
    students:17,
  },
  {
    mentor_Id: 102,
    name: "Divya",
    students:20,
  },
  {
    mentor_Id: 103,
    name: "Gopal",
    students:13,
  },
  {
    mentor_Id: 104,
    name: "Krishna",
    students:12,
  },
]);

db.mentors.find({ students: { $gte: 15 } }).pretty();

// Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

db.tasks.find({"date": {$gte: ('15-oct-2020'), $lt: ('31-oct-2020')}}).pretty();

