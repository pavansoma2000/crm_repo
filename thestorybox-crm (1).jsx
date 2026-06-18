import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// BRAND CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────
const BRANDS = {
  tsb: {
    id: "tsb",
    name: "The Story Box",
    short: "TSB",
    tagline: "Weddings, remembered as the stories they actually are.",
    color: "#A8773A",
    colorLight: "rgba(168,119,58,0.12)",
    colorBorder: "rgba(168,119,58,0.3)",
    accent: "var(--brass)",
    emoji: "💍",
    events: ["Wedding","Engagement","Pre-Wedding Shoot","Mehendi","Sangeet","Reception","Haldi","Couple Shoot"],
    packages: ["Essence","Heritage","Legacy"],
    defaultAssignee: "Karan",
  },
  tsbp: {
    id: "tsbp",
    name: "The Story Box Productions",
    short: "TSBP",
    tagline: "Cinematic storytelling for every milestone.",
    color: "#2D5FA0",
    colorLight: "rgba(45,95,160,0.12)",
    colorBorder: "rgba(45,95,160,0.3)",
    accent: "var(--blue)",
    emoji: "🎬",
    events: ["Corporate Event","Conference","Workshop","Portrait Session","Brand Shoot","Product Shoot","Fashion Shoot","Ad Film","Documentary","Music Video","Interview","Reel Production"],
    packages: ["Standard Production","Premium Production","Full Production"],
    defaultAssignee: "Karan",
  },
  oye: {
    id: "oye",
    name: "Oye Baby by The Story Box",
    short: "OYE",
    tagline: "Every tiny milestone, beautifully remembered.",
    color: "#C07830",
    colorLight: "rgba(192,120,48,0.12)",
    colorBorder: "rgba(192,120,48,0.3)",
    accent: "var(--amber)",
    emoji: "🍼",
    events: ["Birthday","Kids Portrait","Mini Session","Cake Smash","Family Portrait","Newborn Shoot","Baby Shower","Maternity Shoot","Cradle Ceremony","Naming Ceremony","First Steps","Milestone Monthly"],
    packages: ["Mini Session","Standard Session","Premium Session"],
    defaultAssignee: "Ravi",
  },
};

const BRAND_LIST = Object.values(BRANDS);

// Brand badge component
const BrandPill = ({brandId, size="sm"}) => {
  const b = BRANDS[brandId]||BRANDS.tsb;
  const fs = size==="sm"?11:13;
  return (
    <span style={{fontSize:fs,padding:size==="sm"?"2px 8px":"3px 10px",borderRadius:12,background:`${b.color}18`,color:b.color,border:`1px solid ${b.color}33`,fontWeight:700,whiteSpace:"nowrap",letterSpacing:"0.02em"}}>
      {b.emoji} {b.short}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────────────────────────────────────
const SEED_LEADS = [
  { id:1, brand:"tsb",  name:"Priya & Arjun Reddy", phone:"+91 98765 43210", email:"priya.arjun@gmail.com", source:"Instagram", enquiryDate:"2026-06-14", eventDate:"2026-12-18", budget:180000, status:"Hot", stage:"Proposal Sent", event:"Wedding", location:"Hyderabad", assignedTo:"Karan", notes:"NRI couple from Dubai. Very interested in cinematic package.", converted:false },
  { id:2, brand:"tsb",  name:"Kavya & Srinivas Nair", phone:"+91 87654 32109", email:"kavya.srinivas@gmail.com", source:"Referral", enquiryDate:"2026-07-02", eventDate:"2027-01-15", budget:250000, status:"Hot", stage:"Negotiation", event:"Wedding", location:"Vijayawada", assignedTo:"Karan", notes:"Referred by Sharma family. Premium package.", converted:false },
  { id:3, brand:"tsb",  name:"Ananya & Rohit Kumar", phone:"+91 76543 21098", email:"ananya.rohit@outlook.com", source:"Google", enquiryDate:"2026-05-20", eventDate:"2026-11-10", budget:120000, status:"Warm", stage:"First Contact", event:"Wedding", location:"Hyderabad", assignedTo:"Ravi", notes:"Looking for full-day coverage.", converted:false },
  { id:4, brand:"tsb",  name:"Deepika Sharma", phone:"+91 65432 10987", email:"deepika.s@gmail.com", source:"Instagram", enquiryDate:"2026-08-10", eventDate:"2026-10-05", budget:80000, status:"Warm", stage:"Follow-up", event:"Engagement", location:"Visakhapatnam", assignedTo:"Ravi", notes:"Engagement shoot + possible wedding booking.", converted:false },
  { id:5, brand:"tsb",  name:"Meghana & Vikram Rao", phone:"+91 54321 09876", email:"meghana.vikram@gmail.com", source:"Planner Referral", enquiryDate:"2026-04-10", eventDate:"2026-09-18", budget:350000, status:"Hot", stage:"Booking Confirmed", event:"Wedding", location:"Hyderabad", assignedTo:"Karan", notes:"Destination wedding — Udaipur. Premium tier.", converted:true },
  { id:6, brand:"tsb",  name:"Lalitha & Suresh Babu", phone:"+91 43210 98765", email:"lalitha.suresh@yahoo.com", source:"Facebook", enquiryDate:"2026-05-05", eventDate:"2026-12-02", budget:60000, status:"Cold", stage:"No Response", event:"Wedding", location:"Hyderabad", assignedTo:"Ravi", notes:"Went quiet after pricing.", converted:false },
  { id:7, brand:"tsbp", name:"Sunrise Pharma", phone:"+91 99887 76655", email:"marketing@sunrisepharma.com", source:"Referral", enquiryDate:"2026-06-01", eventDate:"2026-08-15", budget:450000, status:"Hot", stage:"Proposal Sent", event:"Corporate Film", location:"Hyderabad", assignedTo:"Karan", notes:"Annual brand film. 2-day shoot.", converted:false },
  { id:8, brand:"tsbp", name:"Zara Fashion India", phone:"+91 88776 65544", email:"brand@zarafashion.in", source:"Instagram", enquiryDate:"2026-07-10", eventDate:"2026-09-05", budget:280000, status:"Warm", stage:"Meeting Scheduled", event:"Fashion Shoot", location:"Mumbai", assignedTo:"Karan", notes:"Seasonal lookbook shoot.", converted:false },
  { id:9, brand:"oye",  name:"Preethi & Sai Kiran", phone:"+91 77665 54433", email:"preethi.sai@gmail.com", source:"Instagram", enquiryDate:"2026-06-08", eventDate:"2026-07-20", budget:25000, status:"Hot", stage:"Booking Confirmed", event:"Newborn Shoot", location:"Hyderabad", assignedTo:"Ravi", notes:"First baby. Very excited parents.", converted:true },
  { id:10, brand:"oye", name:"Ramya & Kartik", phone:"+91 66554 43322", email:"ramya.kartik@gmail.com", source:"Referral", enquiryDate:"2026-06-15", eventDate:"2026-08-01", budget:18000, status:"Warm", stage:"Follow-up", event:"Baby Shower", location:"Hyderabad", assignedTo:"Ravi", notes:"Baby shower + maternity combo.", converted:false },
];

const SEED_CLIENTS = [
  { id:1, brand:"tsb",  name:"Meghana & Vikram Rao", phone:"+91 54321 09876", email:"meghana.vikram@gmail.com", location:"Hyderabad", projectId:1, totalAmount:350000, paid:175000, notes:"Destination wedding Udaipur. Very detail-oriented.", requirements:"Aerial shots, Separate getting-ready coverage, Same-day edit reel", proposalSent:true, extraServices:["Drone Coverage ₹15,000","Boudoir Shoot ₹20,000"], rawPhotosLink:"", photosLink:"https://drive.google.com/", videosLink:"https://vimeo.com/", reelLink:"", driveLink:"", tags:["Premium","NRI"], documents:[] },
  { id:2, brand:"tsb",  name:"Kavya & Srinivas Nair", phone:"+91 87654 32109", email:"kavya.srinivas@gmail.com", location:"Vijayawada", projectId:2, totalAmount:250000, paid:200000, notes:"Referred by Sharma family. Album design approved.", requirements:"Candid photography focus, Telugu rituals documentation", proposalSent:true, extraServices:["Extended Hours ₹10,000"], rawPhotosLink:"", photosLink:"https://drive.google.com/", videosLink:"https://vimeo.com/", reelLink:"https://instagram.com/", driveLink:"https://drive.google.com/drive/folders/", tags:["Premium","Referral"], documents:[] },
  { id:3, brand:"tsb",  name:"Priya & Arjun Reddy", phone:"+91 98765 43210", email:"priya.arjun@gmail.com", location:"Hyderabad", projectId:3, totalAmount:180000, paid:150000, notes:"Album design done. Pending final balance.", requirements:"Traditional + candid mix, Both families coverage", proposalSent:true, extraServices:[], rawPhotosLink:"", photosLink:"https://drive.google.com/", videosLink:"", reelLink:"", driveLink:"", tags:["Standard"], documents:[] },
  { id:4, brand:"tsb",  name:"Rohit & Sneha Prasad", phone:"+91 99001 12233", email:"rohit.sneha@gmail.com", location:"Hyderabad", projectId:4, totalAmount:140000, paid:110000, notes:"Good clients. Need follow-up for album balance.", requirements:"Full day coverage, Drone shots", proposalSent:true, extraServices:["Drone ₹8,000"], rawPhotosLink:"", photosLink:"https://drive.google.com/", videosLink:"https://vimeo.com/", reelLink:"", driveLink:"", tags:["Standard"], documents:[] },
  { id:5, brand:"tsb",  name:"Ananya & Ravi Kumar", phone:"+91 55443 32211", email:"ananya.ravi@gmail.com", location:"Visakhapatnam", projectId:5, totalAmount:220000, paid:220000, notes:"Fully paid. Delivered completely.", requirements:"Outdoor coverage priority", proposalSent:true, extraServices:[], rawPhotosLink:"", photosLink:"https://drive.google.com/", videosLink:"https://vimeo.com/", reelLink:"https://instagram.com/", driveLink:"https://drive.google.com/drive/folders/", tags:["Premium","Completed"], documents:[] },
  { id:6, brand:"tsbp", name:"Sunrise Pharma", phone:"+91 99887 76655", email:"marketing@sunrisepharma.com", location:"Hyderabad", projectId:null, totalAmount:450000, paid:225000, notes:"Annual brand film production.", requirements:"2-day shoot, CEO interview, product shots", proposalSent:true, extraServices:[], rawPhotosLink:"", photosLink:"", videosLink:"", reelLink:"", driveLink:"", tags:["Corporate"], documents:[] },
  { id:7, brand:"oye",  name:"Preethi & Sai Kiran", phone:"+91 77665 54433", email:"preethi.sai@gmail.com", location:"Hyderabad", projectId:null, totalAmount:25000, paid:25000, notes:"Newborn shoot. Delivered completely.", requirements:"Soft natural lighting, minimal props", proposalSent:true, extraServices:[], rawPhotosLink:"", photosLink:"https://drive.google.com/", videosLink:"", reelLink:"", driveLink:"", tags:["Newborn","Completed"], documents:[] },
];

const SEED_PROJECTS = [
  { id:1, brand:"tsb",  clientId:1, client:"Meghana & Vikram Rao", events:[{name:"Mehendi",date:"2026-09-16"},{name:"Sangeet",date:"2026-09-17"},{name:"Wedding",date:"2026-09-18"}], location:"Udaipur", status:"Pre-Production", package:"Legacy", amount:350000, paid:175000, team:["Karan","Ravi","Suresh"], deliverables:{photos:{status:"Pending",dueDate:"2026-10-10"},album:{status:"Pending",dueDate:"2026-11-01"},film:{status:"Pending",dueDate:"2026-10-25"},reel:{status:"Pending",dueDate:"2026-10-20"}}, albumBacklog:false, albumBacklogAmount:0, preProduction:{moodboard:"Pending",callDone:false,shotlist:"Pending"}, notes:"" },
  { id:2, brand:"tsb",  clientId:2, client:"Kavya & Srinivas Nair", events:[{name:"Wedding",date:"2026-03-12"}], location:"Vijayawada", status:"Post-Production", package:"Heritage", amount:250000, paid:200000, team:["Ravi","Anil"], deliverables:{photos:{status:"Delivered",dueDate:"2026-04-01"},album:{status:"Design Complete",dueDate:"2026-05-15"},film:{status:"Delivered",dueDate:"2026-04-10"},reel:{status:"Delivered",dueDate:"2026-04-05"}}, albumBacklog:true, albumBacklogAmount:50000, preProduction:{moodboard:"Done",callDone:true,shotlist:"Done"}, notes:"" },
  { id:3, brand:"tsb",  clientId:3, client:"Priya & Arjun Reddy", events:[{name:"Engagement",date:"2025-12-06"},{name:"Wedding",date:"2025-12-08"}], location:"Hyderabad", status:"Album Pending", package:"Essence", amount:180000, paid:150000, team:["Ravi","Suresh"], deliverables:{photos:{status:"Delivered",dueDate:"2025-12-30"},album:{status:"Design Complete",dueDate:"2026-02-15"},film:{status:"Delivered",dueDate:"2026-01-05"},reel:{status:"Delivered",dueDate:"2026-01-02"}}, albumBacklog:true, albumBacklogAmount:30000, preProduction:{moodboard:"Done",callDone:true,shotlist:"Done"}, notes:"" },
  { id:4, brand:"tsb",  clientId:4, client:"Rohit & Sneha Prasad", events:[{name:"Wedding",date:"2025-11-22"}], location:"Hyderabad", status:"Album Pending", package:"Essence", amount:140000, paid:110000, team:["Anil","Mahesh"], deliverables:{photos:{status:"Delivered",dueDate:"2025-12-15"},album:{status:"Design Complete",dueDate:"2026-01-30"},film:{status:"Delivered",dueDate:"2025-12-20"},reel:{status:"Delivered",dueDate:"2025-12-18"}}, albumBacklog:true, albumBacklogAmount:30000, preProduction:{moodboard:"Done",callDone:true,shotlist:"Done"}, notes:"" },
  { id:5, brand:"tsb",  clientId:5, client:"Ananya & Ravi Kumar", events:[{name:"Wedding",date:"2025-10-15"}], location:"Visakhapatnam", status:"Completed", package:"Heritage", amount:220000, paid:220000, team:["Karan","Anil"], deliverables:{photos:{status:"Delivered",dueDate:"2025-11-01"},album:{status:"Delivered",dueDate:"2025-12-10"},film:{status:"Delivered",dueDate:"2025-11-08"},reel:{status:"Delivered",dueDate:"2025-11-05"}}, albumBacklog:false, albumBacklogAmount:0, preProduction:{moodboard:"Done",callDone:true,shotlist:"Done"}, notes:"Completed smoothly." },
  { id:6, brand:"tsb",  clientId:null, client:"Lakshmi & Suresh Rao", events:[{name:"Wedding",date:"2025-09-30"}], location:"Hyderabad", status:"Album Pending", package:"Essence", amount:160000, paid:120000, team:["Ravi","Mahesh"], deliverables:{photos:{status:"Delivered",dueDate:"2025-10-20"},album:{status:"Design Complete",dueDate:"2025-11-30"},film:{status:"Delivered",dueDate:"2025-10-25"},reel:{status:"Delivered",dueDate:"2025-10-22"}}, albumBacklog:true, albumBacklogAmount:40000, preProduction:{moodboard:"Done",callDone:true,shotlist:"Done"}, notes:"" },
  { id:7, brand:"tsb",  clientId:null, client:"Sindhu & Aakash Verma", events:[{name:"Wedding",date:"2026-10-22"}], location:"Vijayawada", status:"Booking Confirmed", package:"Legacy", amount:200000, paid:50000, team:["Karan"], deliverables:{photos:{status:"Pending",dueDate:"2026-11-15"},album:{status:"Pending",dueDate:"2026-12-30"},film:{status:"Pending",dueDate:"2026-11-25"},reel:{status:"Pending",dueDate:"2026-11-20"}}, albumBacklog:false, albumBacklogAmount:0, preProduction:{moodboard:"Pending",callDone:false,shotlist:"Pending"}, notes:"" },
  { id:8, brand:"tsbp", clientId:6, client:"Sunrise Pharma", events:[{name:"Corporate Film",date:"2026-08-15"},{name:"Product Shoot",date:"2026-08-16"}], location:"Hyderabad", status:"Pre-Production", package:"Premium Production", amount:450000, paid:225000, team:["Karan","Anil"], deliverables:{photos:{status:"Pending",dueDate:"2026-09-01"},album:{status:"Pending",dueDate:""},film:{status:"Pending",dueDate:"2026-09-10"},reel:{status:"Pending",dueDate:"2026-09-05"}}, albumBacklog:false, albumBacklogAmount:0, preProduction:{moodboard:"Pending",callDone:false,shotlist:"Pending"}, notes:"" },
  { id:9, brand:"oye",  clientId:7, client:"Preethi & Sai Kiran", events:[{name:"Newborn Shoot",date:"2026-07-20"}], location:"Hyderabad", status:"Completed", package:"Premium Session", amount:25000, paid:25000, team:["Ravi"], deliverables:{photos:{status:"Delivered",dueDate:"2026-07-28"},album:{status:"Delivered",dueDate:"2026-08-10"},film:{status:"Pending",dueDate:""},reel:{status:"Delivered",dueDate:"2026-07-30"}}, albumBacklog:false, albumBacklogAmount:0, preProduction:{moodboard:"Done",callDone:true,shotlist:"Done"}, notes:"Beautiful session." },
];

const SEED_TEAM = [
  { id:1, name:"Karan Soma", role:"Founder & Lead Photographer", tier:"Premium", phone:"+91 98000 00001", email:"karan@thestorybox.in", skills:["Photography","Direction","Client Relations"], availability:"Selective", eventsThisMonth:2, salary:0, type:"Owner", dob:"1988-04-10", joined:"2012-01-01", address:"Banjara Hills, Hyderabad", aadhar:"XXXX-XXXX-0001", pan:"ABCDE0001F", insurance:"LIC Policy #001 — ₹50L", travelHistory:[{event:"Meghana & Vikram Wedding",destination:"Udaipur",date:"2026-09-18",expense:28000}], payrollHistory:[] },
  { id:2, name:"Ravi Shankar", role:"Senior Photographer", tier:"Standard+", phone:"+91 98000 00002", email:"ravi@thestorybox.in", skills:["Photography","Candids","Portraits"], availability:"Available", eventsThisMonth:5, salary:45000, type:"Full-time", dob:"1993-07-22", joined:"2018-03-01", address:"Kondapur, Hyderabad", aadhar:"XXXX-XXXX-0002", pan:"ABCDE0002F", insurance:"Star Health — ₹5L", travelHistory:[{event:"Priya Wedding",destination:"Hyderabad",date:"2025-12-08",expense:0}], payrollHistory:[{month:"May 2026",amount:45000,paid:true,paycheckFile:""},{month:"Apr 2026",amount:45000,paid:true,paycheckFile:""}] },
  { id:3, name:"Anil Varma", role:"Cinematographer", tier:"Standard+", phone:"+91 98000 00003", email:"anil@thestorybox.in", skills:["Cinematography","Drone","Color Grading"], availability:"Available", eventsThisMonth:4, salary:50000, type:"Full-time", dob:"1991-11-05", joined:"2019-06-01", address:"Gachibowli, Hyderabad", aadhar:"XXXX-XXXX-0003", pan:"ABCDE0003F", insurance:"Star Health — ₹5L", travelHistory:[], payrollHistory:[{month:"May 2026",amount:50000,paid:true,paycheckFile:""},{month:"Apr 2026",amount:50000,paid:true,paycheckFile:""}] },
  { id:4, name:"Suresh Babu", role:"Photographer / 2nd Camera", tier:"Standard", phone:"+91 98000 00004", email:"suresh@thestorybox.in", skills:["Photography","BTS"], availability:"Busy", eventsThisMonth:6, salary:35000, type:"Full-time", dob:"1995-03-18", joined:"2021-01-01", address:"Kukatpally, Hyderabad", aadhar:"XXXX-XXXX-0004", pan:"ABCDE0004F", insurance:"None", travelHistory:[], payrollHistory:[{month:"May 2026",amount:35000,paid:true,paycheckFile:""}] },
  { id:5, name:"Mahesh Kumar", role:"Video Editor", tier:"-", phone:"+91 98000 00005", email:"mahesh@thestorybox.in", skills:["Premiere Pro","After Effects","Color Grade"], availability:"Available", eventsThisMonth:0, salary:30000, type:"Full-time", dob:"1996-09-30", joined:"2022-04-01", address:"Ameerpet, Hyderabad", aadhar:"XXXX-XXXX-0005", pan:"ABCDE0005F", insurance:"None", travelHistory:[], payrollHistory:[{month:"May 2026",amount:30000,paid:true,paycheckFile:""}] },
  { id:6, name:"Divya Rao", role:"Photo Editor / Retoucher", tier:"-", phone:"+91 98000 00006", email:"divya@thestorybox.in", skills:["Lightroom","Photoshop","Album Design"], availability:"Available", eventsThisMonth:0, salary:28000, type:"Full-time", dob:"1997-02-14", joined:"2022-07-01", address:"Madhapur, Hyderabad", aadhar:"XXXX-XXXX-0006", pan:"ABCDE0006F", insurance:"None", travelHistory:[], payrollHistory:[{month:"May 2026",amount:28000,paid:true,paycheckFile:""}] },
  { id:7, name:"Pooja Sharma", role:"Sales & Client Coordinator", tier:"-", phone:"+91 98000 00007", email:"pooja@thestorybox.in", skills:["Sales","Client Communication","CRM"], availability:"Available", eventsThisMonth:0, salary:22000, type:"Full-time", dob:"1998-06-08", joined:"2023-02-01", address:"Himayatnagar, Hyderabad", aadhar:"XXXX-XXXX-0007", pan:"ABCDE0007F", insurance:"None", travelHistory:[], payrollHistory:[{month:"May 2026",amount:22000,paid:true,paycheckFile:""}] },
  { id:8, name:"Sai Krishna", role:"Social Media Manager", tier:"-", phone:"+91 98000 00008", email:"sai@thestorybox.in", skills:["Instagram","Reels","Content"], availability:"Available", eventsThisMonth:0, salary:20000, type:"Full-time", dob:"1999-12-01", joined:"2024-01-01", address:"SR Nagar, Hyderabad", aadhar:"XXXX-XXXX-0008", pan:"ABCDE0008F", insurance:"None", travelHistory:[], payrollHistory:[{month:"May 2026",amount:20000,paid:true,paycheckFile:""}] },
];

const SEED_EXPENSES = [
  { id:1, category:"Travel", description:"Udaipur flight – Karan & Ravi", amount:28000, date:"2026-09-14", paidTo:"IndiGo", addedBy:"Karan" },
  { id:2, category:"Office", description:"Office rent – June", amount:35000, date:"2026-06-01", paidTo:"Landlord", addedBy:"Pooja" },
  { id:3, category:"Marketing", description:"Instagram Ads – May", amount:15000, date:"2026-05-31", paidTo:"Meta", addedBy:"Sai" },
  { id:4, category:"Equipment", description:"DJI Drone Rental", amount:8000, date:"2026-05-15", paidTo:"Drone Rentals HYD", addedBy:"Anil" },
  { id:5, category:"Software", description:"Adobe Creative Suite", amount:6500, date:"2026-06-01", paidTo:"Adobe", addedBy:"Mahesh" },
  { id:6, category:"Travel", description:"Vijayawada train – Suresh", amount:1200, date:"2026-03-12", paidTo:"IRCTC", addedBy:"Suresh" },
  { id:7, category:"Misc", description:"Client meeting – coffee", amount:2400, date:"2026-06-08", paidTo:"Misc", addedBy:"Karan" },
];

const SEED_FREELANCERS = [
  { id:1, name:"Praveen Reddy", role:"Second Photographer", phone:"+91 90000 11111", email:"praveen.r@gmail.com", ratePerEvent:8000, eventsWorked:[{project:"Meghana & Vikram",date:"2026-09-18",amount:8000,paid:false}], totalPaid:0, pending:8000, pan:"FRLNC001P" },
  { id:2, name:"Swetha Naidu", role:"Makeup Coordinator", phone:"+91 90000 22222", email:"swetha.n@gmail.com", ratePerEvent:5000, eventsWorked:[{project:"Priya & Arjun",date:"2025-12-08",amount:5000,paid:true}], totalPaid:5000, pending:0, pan:"FRLNC002P" },
  { id:3, name:"Krish Iyer", role:"Album Design", phone:"+91 90000 33333", email:"krish.i@gmail.com", ratePerEvent:6000, eventsWorked:[{project:"Kavya & Srinivas",date:"2026-03-20",amount:6000,paid:true},{project:"Lakshmi & Suresh",date:"2025-10-05",amount:6000,paid:false}], totalPaid:6000, pending:6000, pan:"FRLNC003P" },
];

const SEED_INVENTORY = {
  cameras:[
    { id:1, name:"Sony A7 IV", serial:"SN-A7IV-001", purchaseDate:"2023-01-15", purchasePrice:230000, condition:"Excellent", assignedTo:"Karan", warranty:"2026-01-15", repairs:[], invoiceUploaded:true },
    { id:2, name:"Sony A7 III", serial:"SN-A7III-002", purchaseDate:"2021-06-10", purchasePrice:180000, condition:"Good", assignedTo:"Ravi", warranty:"2024-06-10", repairs:[{date:"2025-03-01",issue:"Sensor cleaning",cost:2500}], invoiceUploaded:true },
    { id:3, name:"Canon EOS R6", serial:"CN-R6-003", purchaseDate:"2022-09-20", purchasePrice:155000, condition:"Good", assignedTo:"Suresh", warranty:"2025-09-20", repairs:[], invoiceUploaded:false },
    { id:4, name:"Sony A6600 BTS", serial:"SN-A6600-004", purchaseDate:"2022-01-05", purchasePrice:85000, condition:"Fair", assignedTo:"Anil", warranty:"2025-01-05", repairs:[{date:"2024-11-10",issue:"Battery door fix",cost:800}], invoiceUploaded:true },
  ],
  lenses:[
    { id:1, name:"Sony 85mm f/1.4 GM", serial:"LN-85-001", purchaseDate:"2023-01-15", purchasePrice:130000, condition:"Excellent", assignedTo:"Karan", repairs:[] },
    { id:2, name:"Sony 35mm f/1.8", serial:"LN-35-002", purchaseDate:"2021-06-10", purchasePrice:45000, condition:"Good", assignedTo:"Ravi", repairs:[] },
    { id:3, name:"Canon 50mm f/1.2L", serial:"LN-50-003", purchaseDate:"2022-09-20", purchasePrice:90000, condition:"Good", assignedTo:"Suresh", repairs:[] },
    { id:4, name:"Sony 24-70mm f/2.8 GM", serial:"LN-2470-004", purchaseDate:"2023-03-10", purchasePrice:175000, condition:"Excellent", assignedTo:"Karan", repairs:[] },
  ],
  accessories:[
    { id:1, name:"DJI Ronin RS3 Pro", serial:"DJI-RS3-001", purchaseDate:"2023-05-01", purchasePrice:52000, condition:"Good", assignedTo:"Anil", repairs:[] },
    { id:2, name:"DJI Mini 3 Pro Drone", serial:"DJI-M3P-001", purchaseDate:"2023-08-15", purchasePrice:75000, condition:"Good", assignedTo:"Anil", repairs:[] },
    { id:3, name:"Godox AD600 Pro Flash x2", serial:"GDX-AD600-01", purchaseDate:"2022-02-10", purchasePrice:48000, condition:"Good", assignedTo:"Ravi", repairs:[] },
    { id:4, name:"Manfrotto Tripod Set x3", serial:"MNF-TRIP-01", purchaseDate:"2021-01-01", purchasePrice:18000, condition:"Fair", assignedTo:"Team", repairs:[] },
  ],
  technology:[
    { id:1, name:"MacBook Pro 16\" M3", serial:"AAPL-MBP-001", purchaseDate:"2024-01-10", purchasePrice:280000, assignedTo:"Mahesh", type:"Hardware", warranty:"2027-01-10", condition:"Excellent", repairs:[] },
    { id:2, name:"MacBook Pro 14\" M2", serial:"AAPL-MBP-002", purchaseDate:"2023-06-01", purchasePrice:220000, assignedTo:"Divya", type:"Hardware", warranty:"2026-06-01", condition:"Good", repairs:[] },
    { id:3, name:"Adobe Creative Suite", serial:"LIC-ADO-001", purchaseDate:"2026-01-01", purchasePrice:6500, assignedTo:"Team", type:"Subscription", warranty:"2027-01-01", condition:"—", repairs:[] },
    { id:4, name:"Backblaze B2 Storage", serial:"LIC-BB-001", purchaseDate:"2026-01-01", purchasePrice:3200, assignedTo:"Team", type:"Subscription", warranty:"2027-01-01", condition:"—", repairs:[] },
    { id:5, name:"Frame.io Review", serial:"LIC-FIO-001", purchaseDate:"2026-01-01", purchasePrice:4800, assignedTo:"Team", type:"Subscription", warranty:"2027-01-01", condition:"—", repairs:[] },
    { id:6, name:"Fundy Album Designer", serial:"LIC-FND-001", purchaseDate:"2025-06-01", purchasePrice:18000, assignedTo:"Divya", type:"License", warranty:"2027-06-01", condition:"—", repairs:[] },
  ],
  machines:[
    { id:1, name:"Mac Studio Workstation", serial:"AAPL-MS-001", purchaseDate:"2024-03-01", purchasePrice:180000, assignedTo:"Mahesh", warranty:"2027-03-01", condition:"Excellent", repairs:[] },
    { id:2, name:"Synology NAS DS923+", serial:"SYN-DS923-001", purchaseDate:"2023-09-10", purchasePrice:75000, assignedTo:"Server Room", warranty:"2026-09-10", condition:"Good", repairs:[] },
    { id:3, name:"BenQ Color Display", serial:"BNQ-SW270-001", purchaseDate:"2022-11-01", purchasePrice:55000, assignedTo:"Mahesh", warranty:"2025-11-01", condition:"Good", repairs:[] },
  ],
};

const REVENUE_DATA = [
  {month:"Oct",booked:380000,collected:310000},{month:"Nov",booked:420000,collected:380000},
  {month:"Dec",booked:650000,collected:520000},{month:"Jan",booked:280000,collected:240000},
  {month:"Feb",booked:310000,collected:290000},{month:"Mar",booked:480000,collected:400000},
  {month:"Apr",booked:350000,collected:310000},{month:"May",booked:420000,collected:180000},
];

const SCHEDULES = [
  {id:1,client:"Sindhu & Aakash Verma",event:"Wedding Mehendi",date:"2026-10-20",location:"Vijayawada",team:["Karan","Ravi"]},
  {id:2,client:"Sindhu & Aakash Verma",event:"Wedding Main",date:"2026-10-22",location:"Vijayawada",team:["Karan","Ravi","Suresh","Anil"]},
  {id:3,client:"Meghana & Vikram Rao",event:"Mehendi",date:"2026-09-16",location:"Udaipur",team:["Ravi","Suresh"]},
  {id:4,client:"Meghana & Vikram Rao",event:"Sangeet",date:"2026-09-17",location:"Udaipur",team:["Karan","Ravi","Anil"]},
  {id:5,client:"Meghana & Vikram Rao",event:"Wedding",date:"2026-09-18",location:"Udaipur",team:["Karan","Ravi","Suresh","Anil"]},
  {id:6,client:"Deepika Sharma",event:"Engagement Shoot",date:"2026-08-10",location:"Visakhapatnam",team:["Ravi"]},
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const fmt = n => "₹" + Number(n||0).toLocaleString("en-IN");
const pct = (a,b) => b===0 ? 0 : Math.round((a/b)*100);
const uid = () => Date.now() + Math.random();

const SC = {
  Hot:"#C0392B", Warm:"#C07830", Cold:"#7A6A5A",
  "Booking Confirmed":"#2E7D52", "Proposal Sent":"#5B3FA0",
  Negotiation:"#C07830", "First Contact":"#7A6A5A",
  "Follow-up":"#2D5FA0", "Meeting Scheduled":"#7B3FA0", "No Response":"#9A8878",
  "Pre-Production":"#5B3FA0", "Post-Production":"#C07830",
  "Album Pending":"#C0392B", Completed:"#2E7D52",
  "Design Complete":"#C07830", Delivered:"#2E7D52", Pending:"#9A8878",
  Available:"#2E7D52", Busy:"#C0392B", Selective:"#C07830",
  Excellent:"#2E7D52", Good:"#C07830", Fair:"#C0392B",
  Hardware:"#5B3FA0", Subscription:"#7B3FA0", License:"#2D5FA0",
  Paid:"#2E7D52", Overdue:"#C0392B", Upcoming:"#5B3FA0",
};

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const Badge = ({label,color}) => {
  const c = color||SC[label]||"var(--ink4)";
  return <span style={{background:c+"22",color:c,border:`1px solid ${c}55`,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:"0.03em",whiteSpace:"nowrap"}}>{label}</span>;
};

const Card = ({children,style={}}) => (
  <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:"18px 22px",...style}}>{children}</div>
);

const StatCard = ({icon,label,value,sub,accent="var(--green)"}) => (
  <Card style={{display:"flex",flexDirection:"column",gap:6}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <span style={{fontSize:20}}>{icon}</span>
      {sub&&<span style={{fontSize:11,color:accent,fontWeight:700}}>{sub}</span>}
    </div>
    <div style={{fontSize:24,fontWeight:800,color:"var(--ink)",fontFamily:"'Playfair Display',serif",letterSpacing:"-0.02em"}}>{value}</div>
    <div style={{fontSize:11,color:"var(--ink4)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</div>
  </Card>
);

const Bar = ({value,max,color="var(--brass)",height=6}) => (
  <div style={{background:"var(--bg3)",borderRadius:4,height,overflow:"hidden"}}>
    <div style={{width:`${pct(value,max)}%`,height:"100%",background:color,borderRadius:4}}/>
  </div>
);

const SectionTitle = ({children}) => (
  <div style={{fontSize:11,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:12,paddingBottom:8,borderBottom:"1px solid var(--border)"}}>{children}</div>
);

const Modal = ({title,onClose,children,width=640}) => (
  <div style={{position:"fixed",inset:0,background:"rgba(44,30,15,0.55)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
    <div style={{background:"var(--surface)",border:"1px solid var(--border2)",borderRadius:18,maxWidth:width,width:"100%",maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 60px rgba(44,30,15,0.25)"}} onClick={e=>e.stopPropagation()}>
      <div style={{padding:"16px 20px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"var(--surface)",zIndex:1}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:"var(--ink)"}}>{title}</div>
        <button onClick={onClose} style={{background:"none",border:"none",color:"var(--ink3)",fontSize:20,cursor:"pointer",lineHeight:1}}>✕</button>
      </div>
      <div style={{padding:"18px 20px"}}>{children}</div>
    </div>
  </div>
);

const InfoGrid = ({items}) => (
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
    {items.map(([k,v])=>(
      <div key={k} style={{background:"var(--bg)",borderRadius:10,padding:"9px 13px",border:"1px solid var(--border)"}}>
        <div style={{fontSize:10,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:3}}>{k}</div>
        <div style={{fontSize:13,color:"var(--ink)",fontWeight:600,wordBreak:"break-word"}}>{v||"—"}</div>
      </div>
    ))}
  </div>
);

const Avatar = ({name,size=38}) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:"var(--bg3)",border:"1px solid var(--border2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.35,fontWeight:800,color:"var(--brass-d)",flexShrink:0}}>
    {name.split(" ").map(w=>w[0]).join("").slice(0,2)}
  </div>
);

const IS = {background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:8,padding:"8px 12px",color:"var(--ink)",fontSize:13,width:"100%",outline:"none",fontFamily:"inherit"};
const Inp = (props) => <input {...props} style={{...IS,...(props.style||{})}}/>;
const Sel = ({children,...props}) => <select {...props} style={{...IS,...(props.style||{})}}>{children}</select>;
const TextA = (props) => <textarea {...props} style={{...IS,resize:"vertical",minHeight:68,...(props.style||{})}}/>;
const FL = ({children}) => <div style={{fontSize:11,color:"var(--ink3)",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>{children}</div>;

const Btn = ({children,onClick,variant="gold",style={}}) => {
  const S = {
    gold:{background:"var(--brass)",color:"#fff",border:"none"},
    ghost:{background:"var(--bg2)",color:"var(--ink3)",border:"1px solid var(--border2)"},
    danger:{background:"rgba(192,57,43,0.08)",color:"var(--red)",border:"1px solid rgba(192,57,43,0.3)"},
    green:{background:"rgba(46,125,82,0.08)",color:"var(--green)",border:"1px solid rgba(46,125,82,0.3)"},
  };
  return <button onClick={onClick} style={{padding:"9px 18px",borderRadius:9,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit",...S[variant],...style}}>{children}</button>;
};

const ActBtn = ({onClick,children}) => (
  <button onClick={onClick} style={{padding:"5px 10px",borderRadius:7,border:"1px solid var(--border2)",background:"var(--bg2)",color:"var(--ink3)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{children}</button>
);
const DelBtn = ({onClick}) => (
  <button onClick={onClick} style={{padding:"5px 10px",borderRadius:7,border:"1px solid rgba(192,57,43,0.3)",background:"rgba(192,57,43,0.06)",color:"var(--red)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>🗑</button>
);

const Row = ({children,style={}}) => <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",...style}}>{children}</div>;

const BarChart = ({data,height=120}) => {
  const max = Math.max(...data.map(d=>Math.max(d.booked,d.collected)),1);
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:5,height}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,height:"100%"}}>
          <div style={{display:"flex",alignItems:"flex-end",gap:2,flex:1,width:"100%"}}>
            <div title={`Booked: ${fmt(d.booked)}`} style={{flex:1,height:`${pct(d.booked,max)}%`,background:"var(--bg3)",borderRadius:"3px 3px 0 0",minHeight:2,border:"1px solid var(--border2)"}}/>
            <div title={`Collected: ${fmt(d.collected)}`} style={{flex:1,height:`${pct(d.collected,max)}%`,background:"var(--brass)",borderRadius:"3px 3px 0 0",minHeight:2}}/>
          </div>
          <div style={{fontSize:9,color:"var(--ink4)",fontWeight:600}}>{d.month}</div>
        </div>
      ))}
    </div>
  );
};

const FunnelBar = ({label,count,total}) => (
  <div style={{display:"flex",alignItems:"center",gap:10}}>
    <div style={{width:95,fontSize:11,color:"var(--ink3)",textAlign:"right",flexShrink:0}}>{label}</div>
    <div style={{flex:1,background:"var(--bg3)",borderRadius:4,height:22,overflow:"hidden"}}>
      <div style={{width:`${pct(count,total)}%`,height:"100%",background:"var(--brass)",borderRadius:4,display:"flex",alignItems:"center",paddingLeft:8,fontSize:11,fontWeight:700,color:"#fff",minWidth:count>0?28:0}}>{count>0?count:""}</div>
    </div>
    <div style={{width:36,fontSize:11,color:"var(--brass-d)",textAlign:"right",fontWeight:700}}>{pct(count,total)}%</div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 1 — DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
const Dashboard = ({leads,projects,activeBrand}) => {
  const fl = activeBrand==="all"?leads:leads.filter(l=>l.brand===activeBrand);
  const fp = activeBrand==="all"?projects:projects.filter(p=>p.brand===activeBrand);
  const totalRev = fp.reduce((s,p)=>s+p.amount,0);
  const collected = fp.reduce((s,p)=>s+p.paid,0);
  const backlogAmt = fp.filter(p=>p.albumBacklog).reduce((s,p)=>s+(p.albumBacklogAmount||0),0);
  const hotLeads = fl.filter(l=>l.status==="Hot").length;
  const activeProj = fp.filter(p=>p.status!=="Completed").length;
  const pendingAlbums = fp.filter(p=>p.albumBacklog).length;
  const srcData = fl.reduce((a,l)=>{a[l.source]=(a[l.source]||0)+1;return a},{});
  const today = new Date();
  const upcoming = SCHEDULES.filter(s=>new Date(s.date)>=today).sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,5);
  const activeBrandObj = activeBrand!=="all"?BRANDS[activeBrand]:null;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:22}}>
      {/* Brand context banner */}
      {activeBrandObj&&(
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"11px 16px",background:`${activeBrandObj.color}10`,border:`1px solid ${activeBrandObj.color}33`,borderRadius:11}}>
          <span style={{fontSize:22}}>{activeBrandObj.emoji}</span>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:activeBrandObj.color}}>{activeBrandObj.name}</div>
            <div style={{fontSize:11,color:"var(--ink4)",marginTop:1,fontStyle:"italic"}}>"{activeBrandObj.tagline}"</div>
          </div>
        </div>
      )}
      {/* All-brand summary strip */}
      {activeBrand==="all"&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {BRAND_LIST.map(b=>{
            const bl=leads.filter(l=>l.brand===b.id); const bp=projects.filter(p=>p.brand===b.id);
            return (
              <div key={b.id} style={{padding:"12px 14px",background:"var(--surface)",border:`1px solid ${b.color}33`,borderRadius:12,borderLeft:`3px solid ${b.color}`}}>
                <div style={{fontSize:13,color:b.color,fontWeight:800,marginBottom:6}}>{b.emoji} {b.id==="tsb"?"The Story Box":b.id==="tsbp"?"TSB Productions":"Oye Baby by TSB"}</div>
                <div style={{display:"flex",gap:14}}>
                  <div><div style={{fontSize:17,fontWeight:800,color:"var(--ink)",fontFamily:"'Playfair Display',serif"}}>{bl.length}</div><div style={{fontSize:9,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.07em"}}>Leads</div></div>
                  <div><div style={{fontSize:17,fontWeight:800,color:"var(--ink)",fontFamily:"'Playfair Display',serif"}}>{bp.filter(p=>p.status!=="Completed").length}</div><div style={{fontSize:9,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.07em"}}>Active</div></div>
                  <div><div style={{fontSize:17,fontWeight:800,color:b.color,fontFamily:"'Playfair Display',serif"}}>{fmt(bp.reduce((s,p)=>s+p.amount,0))}</div><div style={{fontSize:9,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.07em"}}>Revenue</div></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {backlogAmt>0&&(
        <div style={{background:"rgba(192,57,43,0.08)",border:"1px solid rgba(192,57,43,0.3)",borderRadius:11,padding:"12px 18px",display:"flex",gap:12,alignItems:"center"}}>
          <span style={{fontSize:18}}>⚠️</span>
          <div>
            <div style={{color:"var(--red)",fontWeight:700,fontSize:13}}>Album Backlog — {fmt(backlogAmt)} recoverable immediately</div>
            <div style={{color:"var(--ink3)",fontSize:12,marginTop:1}}>{pendingAlbums} albums with design complete, pending billing and dispatch</div>
          </div>
        </div>
      )}
      <div className="stat-grid-4">
        <StatCard icon="💰" label="Total Revenue FY" value={fmt(totalRev)} sub={`${pct(collected,totalRev)}% collected`}/>
        <StatCard icon="🔥" label="Hot Leads" value={hotLeads} sub={`${fl.length} total`} accent="var(--red)"/>
        <StatCard icon="📁" label="Active Projects" value={activeProj} sub={`${fp.length} total`} accent="var(--blue)"/>
        <StatCard icon="📦" label="Album Backlog" value={fmt(backlogAmt)} sub={`${pendingAlbums} albums`} accent="var(--amber)"/>
      </div>
      <div className="chart-grid">
        <Card>
          <Row style={{marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:700,color:"var(--ink)"}}>Revenue — Booked vs Collected</div>
            <div style={{display:"flex",gap:10,fontSize:10,color:"var(--ink4)"}}><span>◻ Booked</span><span style={{color:"var(--brass)"}}>◼ Collected</span></div>
          </Row>
          <BarChart data={REVENUE_DATA} height={120}/>
        </Card>
        <Card>
          <div style={{fontSize:14,fontWeight:700,color:"var(--ink)",marginBottom:14}}>Lead Conversion Funnel</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            <FunnelBar label="All Inquiries" count={fl.length} total={fl.length}/>
            <FunnelBar label="Contacted" count={fl.filter(l=>l.stage!=="No Response").length} total={fl.length}/>
            <FunnelBar label="Proposal Sent" count={fl.filter(l=>["Proposal Sent","Negotiation","Booking Confirmed"].includes(l.stage)).length} total={fl.length}/>
            <FunnelBar label="Booked" count={fl.filter(l=>l.stage==="Booking Confirmed").length} total={fl.length}/>
          </div>
        </Card>
      </div>
      <div className="chart-grid">
        <Card>
          <div style={{fontSize:14,fontWeight:700,color:"var(--ink)",marginBottom:14}}>Lead Sources</div>
          {Object.entries(srcData).sort((a,b)=>b[1]-a[1]).map(([src,cnt])=>(
            <div key={src} style={{marginBottom:9}}>
              <Row style={{marginBottom:3}}><span style={{fontSize:12,color:"var(--ink3)"}}>{src}</span><span style={{fontSize:12,color:"var(--brass)",fontWeight:700}}>{cnt}</span></Row>
              <Bar value={cnt} max={fl.length||1}/>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{fontSize:14,fontWeight:700,color:"var(--ink)",marginBottom:14}}>Project Status</div>
          {["Booking Confirmed","Pre-Production","Post-Production","Album Pending","Completed"].map(s=>(
            <div key={s} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:8,height:8,borderRadius:"50%",background:SC[s]||"var(--ink4)"}}/><span style={{fontSize:12,color:"var(--ink3)"}}>{s}</span></div>
              <span style={{fontSize:12,color:"var(--ink)",fontWeight:700}}>{fp.filter(p=>p.status===s).length}</span>
            </div>
          ))}
          <div style={{marginTop:14,paddingTop:14,borderTop:"1px solid var(--border)"}}>
            <div style={{fontSize:11,color:"var(--ink4)",marginBottom:4}}>Collection Rate</div>
            <Bar value={collected} max={totalRev||1} color="var(--green)"/>
            <div style={{fontSize:11,color:"var(--green)",marginTop:4}}>{pct(collected,totalRev||1)}% — {fmt(collected)} of {fmt(totalRev)}</div>
          </div>
        </Card>
      </div>
      <Card>
        <div style={{fontSize:14,fontWeight:700,color:"var(--ink)",marginBottom:14}}>Upcoming Shoots & Schedules</div>
        {upcoming.length===0&&<div style={{color:"var(--ink4)",fontSize:13}}>No upcoming shoots.</div>}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {upcoming.map(s=>(
            <div key={s.id} style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 0.8fr 1fr",gap:12,padding:"11px 14px",background:"var(--bg)",border:"1px solid var(--border)",borderRadius:10,alignItems:"center"}}>
              <div><div style={{fontSize:13,color:"var(--ink)",fontWeight:700}}>{s.client}</div><div style={{fontSize:11,color:"var(--ink4)"}}>{s.event}</div></div>
              <div style={{fontSize:12,color:"var(--brass)",fontWeight:600}}>{s.date}</div>
              <div style={{fontSize:12,color:"var(--ink3)"}}>{s.location}</div>
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{s.team.map(t=><span key={t} style={{fontSize:10,padding:"2px 7px",background:"rgba(91,63,160,0.1)",color:"var(--purple)",borderRadius:8,border:"1px solid rgba(91,63,160,0.2)"}}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 2 — LEADS
// ─────────────────────────────────────────────────────────────────────────────
const Leads = ({leads,setLeads,activeBrand}) => {
  const [tab,setTab] = useState("pipeline");
  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("All");
  const [selected,setSelected] = useState(null);
  const [showAdd,setShowAdd] = useState(false);
  const defaultBrand = activeBrand==="all"?"tsb":activeBrand;
  const blank = {brand:defaultBrand,name:"",phone:"",email:"",source:"Instagram",enquiryDate:"",eventDate:"",budget:"",status:"Warm",stage:"First Contact",event:"",location:"Hyderabad",assignedTo:BRANDS[defaultBrand]?.defaultAssignee||"Ravi",notes:""};
  const [form,setForm] = useState(blank);

  const stages = ["First Contact","Follow-up","Meeting Scheduled","Proposal Sent","Negotiation","Booking Confirmed","No Response"];
  const fl = activeBrand==="all"?leads:leads.filter(l=>l.brand===activeBrand);
  const filtered = fl.filter(l=>(filter==="All"||l.status===filter)&&(l.name.toLowerCase().includes(search.toLowerCase())||l.location.toLowerCase().includes(search.toLowerCase())));
  const srcMap = fl.reduce((a,l)=>{a[l.source]=(a[l.source]||0)+1;return a},{});
  const stageMap = stages.reduce((a,s)=>{a[s]=fl.filter(l=>l.stage===s).length;return a},{});
  const activeBrandEvents = BRANDS[form.brand]?.events||BRANDS.tsb.events;

  const addLead = () => { setLeads([...leads,{...form,id:uid(),budget:Number(form.budget),converted:false}]); setShowAdd(false); setForm({...blank,brand:defaultBrand}); };
  const markBooked = (id) => setLeads(leads.map(l=>l.id===id?{...l,stage:"Booking Confirmed",status:"Hot",converted:true}:l));

  const TabBtn = ({id,label}) => <button onClick={()=>setTab(id)} style={{padding:"7px 16px",borderRadius:9,border:"1px solid",borderColor:tab===id?"var(--brass)":"var(--border)",background:tab===id?"rgba(168,119,58,0.12)":"var(--surface)",color:tab===id?"var(--brass)":"var(--ink3)",fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>{label}</button>;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <Row>
        <div>
          <div style={{fontSize:22,fontFamily:"'Playfair Display',serif",color:"var(--ink)"}}>Leads</div>
          <div style={{fontSize:12,color:"var(--ink4)",marginTop:2}}>{fl.length} total · {fl.filter(l=>l.status==="Hot").length} hot · {fl.filter(l=>l.converted).length} converted</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <TabBtn id="pipeline" label="Pipeline"/><TabBtn id="conversions" label="Conversions"/>
          <Btn onClick={()=>setShowAdd(true)}>+ Add Lead</Btn>
        </div>
      </Row>

      {tab==="pipeline"&&(
        <>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Inp value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or city…" style={{width:200,flex:"none"}}/>
            {["All","Hot","Warm","Cold"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{padding:"6px 14px",borderRadius:20,border:"1px solid",borderColor:filter===f?"var(--brass)":"var(--border)",background:filter===f?"rgba(168,119,58,0.12)":"var(--surface)",color:filter===f?"var(--brass)":"var(--ink3)",fontSize:12,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>{f}</button>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"80px 2fr 1fr 0.8fr 1fr 1.2fr 0.8fr",gap:12,padding:"6px 14px",fontSize:10,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"}}>
            <span>Brand</span><span>Client</span><span>Budget</span><span>Status</span><span>Event</span><span>Stage</span><span>Date</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {filtered.map(l=>(
              <div key={l.id} onClick={()=>setSelected(l)} style={{display:"grid",gridTemplateColumns:"80px 2fr 1fr 0.8fr 1fr 1.2fr 0.8fr",gap:12,padding:"13px 14px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:11,alignItems:"center",cursor:"pointer",transition:"border-color .15s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="var(--brass-l)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
                <BrandPill brandId={l.brand}/>
                <div><div style={{fontSize:13,fontWeight:700,color:"var(--ink)"}}>{l.name}</div><div style={{fontSize:11,color:"var(--ink3)"}}>{l.location}</div></div>
                <div style={{fontSize:13,color:"var(--brass)",fontWeight:700}}>{fmt(l.budget)}</div>
                <Badge label={l.status}/>
                <div style={{fontSize:11,color:"var(--ink3)"}}>{l.event}</div>
                <div style={{fontSize:11,color:"var(--ink3)"}}>{l.stage}</div>
                <div style={{fontSize:11,color:"var(--ink4)"}}>{l.enquiryDate}</div>
              </div>
            ))}
            {filtered.length===0&&<div style={{textAlign:"center",padding:"30px",color:"var(--ink4)",fontSize:13}}>No leads found.</div>}
          </div>
        </>
      )}

      {tab==="conversions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div className="stat-grid-4">
            <StatCard icon="📈" label="Conversion Rate" value={pct(fl.filter(l=>l.converted).length,fl.length||1)+"%"} sub={`${fl.filter(l=>l.converted).length} booked`}/>
            <StatCard icon="🔥" label="Hot Leads" value={fl.filter(l=>l.status==="Hot").length} accent="var(--red)"/>
            <StatCard icon="💰" label="Pipeline Value" value={fmt(fl.reduce((s,l)=>s+l.budget,0))} accent="var(--brass)"/>
            <StatCard icon="📊" label="Avg Budget" value={fmt(Math.round(fl.reduce((s,l)=>s+l.budget,0)/(fl.length||1)))} accent="var(--purple)"/>
          </div>
          <div className="chart-grid">
            <Card>
              <div style={{fontSize:14,fontWeight:700,color:"var(--ink)",marginBottom:14}}>By Stage</div>
              {stages.map(s=>(
                <div key={s} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{width:110,fontSize:11,color:"var(--ink4)",flexShrink:0}}>{s}</div>
                  <div style={{flex:1,background:"var(--bg3)",borderRadius:4,height:20,overflow:"hidden"}}>
                    <div style={{width:`${pct(stageMap[s],fl.length||1)}%`,height:"100%",background:"var(--brass)",borderRadius:4,display:"flex",alignItems:"center",paddingLeft:6,fontSize:10,fontWeight:700,color:"#fff"}}>{stageMap[s]||""}</div>
                  </div>
                </div>
              ))}
            </Card>
            <Card>
              <div style={{fontSize:14,fontWeight:700,color:"var(--ink)",marginBottom:14}}>By Source</div>
              {Object.entries(srcMap).sort((a,b)=>b[1]-a[1]).map(([src,cnt])=>(
                <div key={src} style={{marginBottom:9}}>
                  <Row style={{marginBottom:3}}><span style={{fontSize:12,color:"var(--ink3)"}}>{src}</span><span style={{fontSize:12,color:"var(--brass)",fontWeight:700}}>{cnt} ({pct(cnt,fl.length||1)}%)</span></Row>
                  <Bar value={cnt} max={fl.length||1}/>
                </div>
              ))}
            </Card>
          </div>
          {/* Brand breakdown */}
          {activeBrand==="all"&&(
            <Card>
              <div style={{fontSize:14,fontWeight:700,color:"var(--ink)",marginBottom:14}}>Leads by Brand</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {BRAND_LIST.map(b=>{
                  const bl=leads.filter(l=>l.brand===b.id);
                  return (
                    <div key={b.id} style={{padding:"12px 14px",background:"var(--bg)",border:`1px solid ${b.color}33`,borderRadius:11,borderLeft:`3px solid ${b.color}`}}>
                      <div style={{fontSize:13,color:b.color,fontWeight:700,marginBottom:8}}>{b.emoji} {b.id==="tsb"?"The Story Box":b.id==="tsbp"?"TSB Productions":"Oye Baby by TSB"}</div>
                      <div style={{display:"flex",gap:10}}>
                        <div><span style={{fontSize:16,fontWeight:800,color:"var(--ink)",fontFamily:"'Playfair Display',serif"}}>{bl.length}</span><div style={{fontSize:9,color:"var(--ink4)",textTransform:"uppercase"}}>Total</div></div>
                        <div><span style={{fontSize:16,fontWeight:800,color:b.color,fontFamily:"'Playfair Display',serif"}}>{bl.filter(l=>l.status==="Hot").length}</span><div style={{fontSize:9,color:"var(--ink4)",textTransform:"uppercase"}}>Hot</div></div>
                        <div><span style={{fontSize:16,fontWeight:800,color:"var(--green)",fontFamily:"'Playfair Display',serif"}}>{bl.filter(l=>l.converted).length}</span><div style={{fontSize:9,color:"var(--ink4)",textTransform:"uppercase"}}>Booked</div></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      )}

      {selected&&(
        <Modal title={selected.name} onClose={()=>setSelected(null)}>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><BrandPill brandId={selected.brand} size="md"/><Badge label={selected.status}/><Badge label={selected.stage}/><Badge label={selected.event}/></div>
            <InfoGrid items={[["Phone",selected.phone],["Email",selected.email],["Budget",fmt(selected.budget)],["Source",selected.source],["Event Date",selected.eventDate],["Location",selected.location],["Enquiry Date",selected.enquiryDate],["Assigned To",selected.assignedTo]]}/>
            {selected.notes&&<div style={{background:"var(--bg)",borderRadius:10,padding:"11px 14px",border:"1px solid var(--border)"}}><div style={{fontSize:10,color:"var(--ink4)",marginBottom:5,textTransform:"uppercase"}}>Notes</div><div style={{fontSize:13,color:"var(--ink3)",lineHeight:1.6}}>{selected.notes}</div></div>}
            <div style={{display:"flex",gap:8}}>
              <a href={`tel:${selected.phone}`} style={{flex:1,padding:"9px 0",textAlign:"center",background:"rgba(46,125,82,0.08)",border:"1px solid rgba(46,125,82,0.3)",borderRadius:9,color:"var(--green)",textDecoration:"none",fontSize:13,fontWeight:700}}>📞 Call</a>
              <a href={`mailto:${selected.email}`} style={{flex:1,padding:"9px 0",textAlign:"center",background:"rgba(45,95,160,0.08)",border:"1px solid rgba(45,95,160,0.3)",borderRadius:9,color:"var(--blue)",textDecoration:"none",fontSize:13,fontWeight:700}}>✉️ Email</a>
              <Btn onClick={()=>{markBooked(selected.id);setSelected(null);}}>✓ Mark Booked</Btn>
            </div>
          </div>
        </Modal>
      )}

      {showAdd&&(
        <Modal title="Add New Lead" onClose={()=>setShowAdd(false)}>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {/* Brand selector */}
            <div>
              <FL>Brand</FL>
              <div style={{display:"flex",gap:8}}>
                {BRAND_LIST.map(b=>(
                  <button key={b.id} onClick={()=>setForm(f=>({...f,brand:b.id,event:"",assignedTo:b.defaultAssignee}))} style={{flex:1,padding:"14px 8px",borderRadius:11,border:`2px solid ${form.brand===b.id?b.color:"var(--border)"}`,background:form.brand===b.id?`${b.color}12`:"var(--surface)",color:form.brand===b.id?b.color:"var(--ink4)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textAlign:"center",transition:"all .12s"}}>
                    <div style={{fontSize:24,marginBottom:6}}>{b.emoji}</div>
                    <div>{b.id==="tsb"?"The Story Box":b.id==="tsbp"?"TSB Productions":"Oye Baby by TSB"}</div>
                  </button>
                ))}
              </div>
            </div>
            {[["Client Name","name","text"],["Phone","phone","text"],["Email","email","email"],["Budget (₹)","budget","number"],["Location","location","text"],["Enquiry Date","enquiryDate","date"],["Event Date","eventDate","date"]].map(([l,k,t])=>(
              <div key={k}><FL>{l}</FL><Inp type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/></div>
            ))}
            <div><FL>Event Type</FL>
              <Sel value={form.event} onChange={e=>setForm({...form,event:e.target.value})}>
                <option value="">— Select event —</option>
                {activeBrandEvents.map(o=><option key={o}>{o}</option>)}
              </Sel>
            </div>
            {[["Source",["Instagram","Referral","Google","Facebook","Planner Referral","Direct"],"source"],["Status",["Hot","Warm","Cold"],"status"],["Stage",stages,"stage"],["Assigned To",ALL_TEAM_NAMES,"assignedTo"]].map(([l,opts,k])=>(
              <div key={k}><FL>{l}</FL><Sel value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}>{opts.map(o=><option key={o}>{o}</option>)}</Sel></div>
            ))}
            <div><FL>Notes</FL><TextA value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></div>
            <Btn onClick={addLead} style={{marginTop:4}}>Add Lead</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 3 — PROJECTS
// ─────────────────────────────────────────────────────────────────────────────
const ALL_TEAM_NAMES = ["Karan","Ravi","Anil","Suresh","Mahesh","Divya","Pooja","Sai"];

// Enrich seed project data with new fields on first use
const enrichProject = p => ({
  ...p,
  eventSchedules: p.eventSchedules || p.events.map(e=>({
    eventName: e.name, date: e.date, location: p.location,
    team:[], hours:0, extended:false, extendedHours:0, dayType:"Full Day",
    notes:"", additionalCost:0, shootLog:[]
  })),
  dataBackups: p.dataBackups || [],
  preProductionItems: p.preProductionItems || [],
  postProductionItems: p.postProductionItems || [],
  physicalDeliverables: p.physicalDeliverables || {
    pendrive:{delivered:false,qty:"",deliveredDate:"",notes:""},
    harddisk:{delivered:false,qty:"",deliveredDate:"",notes:""},
    frames:{delivered:false,qty:"",deliveredDate:"",notes:""},
    album:{delivered:false,qty:"",deliveredDate:"",notes:""},
    printedPhotos:{delivered:false,qty:"",deliveredDate:"",notes:""},
  },
});

const Projects = ({projects,setProjects,activeBrand}) => {
  const [filter,setFilter] = useState("All");
  const [selected,setSelected] = useState(null);
  const [projTab,setProjTab] = useState("overview");
  const [showCreate,setShowCreate] = useState(false);
  const [pform,setPform] = useState({brand:activeBrand==="all"?"tsb":activeBrand,client:"",location:"",package:"Essence",amount:"",notes:""});
  const statuses = ["All","Booking Confirmed","Pre-Production","Post-Production","Album Pending","Completed"];
  const delNext = {Pending:"In Progress","In Progress":"Delivered","Design Complete":"Delivered",Delivered:"Delivered"};
  const brandProjects = activeBrand==="all"?projects:projects.filter(p=>p.brand===activeBrand);
  const filtered = brandProjects.filter(p=>filter==="All"||p.status===filter);
  const activePkg = BRANDS[pform.brand]?.packages||BRANDS.tsb.packages;

  const openProject = p => { setSelected(enrichProject(p)); setProjTab("overview"); };

  const saveProject = updated => {
    setProjects(projects.map(p=>p.id===updated.id?updated:p));
    setSelected(updated);
  };

  const updateDel = (pid,key,val) => {
    const upd = projects.map(p=>p.id===pid?{...p,deliverables:{...p.deliverables,[key]:{...p.deliverables[key],status:val}}}:p);
    setProjects(upd);
    if(selected?.id===pid) setSelected(enrichProject(upd.find(p=>p.id===pid)));
  };

  const createProject = () => {
    const base = {id:uid(),brand:pform.brand||"tsb",clientId:null,client:pform.client,events:[{name:BRANDS[pform.brand]?.events[0]||"Wedding",date:""}],location:pform.location,status:"Booking Confirmed",package:pform.package,amount:Number(pform.amount),paid:0,team:[],deliverables:{photos:{status:"Pending",dueDate:""},album:{status:"Pending",dueDate:""},film:{status:"Pending",dueDate:""},reel:{status:"Pending",dueDate:""}},albumBacklog:false,albumBacklogAmount:0,preProduction:{moodboard:"Pending",callDone:false,shotlist:"Pending"},notes:pform.notes};
    setProjects([...projects,enrichProject(base)]);
    setShowCreate(false); setPform({brand:activeBrand==="all"?"tsb":activeBrand,client:"",location:"",package:"Essence",amount:"",notes:""});
  };

  // ── PRE-PRODUCTION TAB ───────────────────────────────────────────────────
  const PreProductionTab = ({p}) => {
    const [items,setItems] = useState(p.preProductionItems||[]);
    const [showAdd,setShowAdd] = useState(false);
    const [form,setForm] = useState({task:"",assignedTo:"Karan",dueDate:"",status:"Pending",notes:""});
    const tasks = ["Client Discovery Call","Moodboard Creation","Shot List","Location Recce","Equipment Checklist","Team Briefing","Costume Notes","Family Tree","Timeline Draft","Vendor Coordination","Advance Collected","Contract Signed"];

    const save = () => {
      const updated = [...items,{...form,id:uid()}];
      setItems(updated);
      saveProject({...p,preProductionItems:updated,preProduction:{...p.preProduction,callDone:updated.some(i=>i.task==="Client Discovery Call"&&i.status==="Done"),moodboard:updated.some(i=>i.task==="Moodboard Creation"&&i.status==="Done")?"Done":"Pending",shotlist:updated.some(i=>i.task==="Shot List"&&i.status==="Done")?"Done":"Pending"}});
      setShowAdd(false); setForm({task:"",assignedTo:"Karan",dueDate:"",status:"Pending",notes:""});
    };
    const toggle = (id) => {
      const updated = items.map(i=>i.id===id?{...i,status:i.status==="Done"?"Pending":"Done"}:i);
      setItems(updated);
      saveProject({...p,preProductionItems:updated});
    };
    const remove = (id) => { const updated=items.filter(i=>i.id!==id); setItems(updated); saveProject({...p,preProductionItems:updated}); };

    const done = items.filter(i=>i.status==="Done").length;

    return (
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:"var(--ink)"}}>Pre-Production Checklist</div>
            <div style={{fontSize:11,color:"var(--ink4)",marginTop:2}}>{done}/{items.length} tasks complete</div>
          </div>
          <button onClick={()=>setShowAdd(v=>!v)} style={{padding:"7px 14px",borderRadius:8,background:"var(--brass)",border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Add Task</button>
        </div>

        {items.length>0&&<Bar value={done} max={items.length||1} color="var(--green)" height={6}/>}

        {showAdd&&(
          <div style={{background:"var(--bg2)",borderRadius:12,padding:14,border:"1px solid var(--border2)",display:"flex",flexDirection:"column",gap:10}}>
            <div><FL>Task</FL>
              <Sel value={form.task} onChange={e=>setForm(f=>({...f,task:e.target.value}))}>
                <option value="">— Select task —</option>
                {tasks.map(t=><option key={t}>{t}</option>)}
                <option value="__custom">Custom…</option>
              </Sel>
              {form.task==="__custom"&&<Inp value={form.customTask||""} onChange={e=>setForm(f=>({...f,customTask:e.target.value}))} placeholder="Enter custom task…" style={{marginTop:6}}/>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div><FL>Assigned To</FL><Sel value={form.assignedTo} onChange={e=>setForm(f=>({...f,assignedTo:e.target.value}))}>{ALL_TEAM_NAMES.map(n=><option key={n}>{n}</option>)}</Sel></div>
              <div><FL>Due Date</FL><Inp type="date" value={form.dueDate} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))}/></div>
            </div>
            <div><FL>Status</FL><Sel value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["Pending","In Progress","Done"].map(s=><option key={s}>{s}</option>)}</Sel></div>
            <div><FL>Notes</FL><TextA value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} style={{minHeight:52}}/></div>
            <div style={{display:"flex",gap:8}}><Btn onClick={save} style={{flex:1}}>Save Task</Btn><Btn onClick={()=>setShowAdd(false)} variant="ghost" style={{flex:1}}>Cancel</Btn></div>
          </div>
        )}

        {items.length===0&&!showAdd&&<div style={{textAlign:"center",padding:"24px",color:"var(--ink4)",fontSize:13,background:"var(--bg2)",borderRadius:10,border:"1px dashed var(--border2)"}}>No pre-production tasks yet. Add your first one.</div>}

        {items.map(item=>(
          <div key={item.id} style={{display:"flex",gap:12,padding:"12px 14px",background:item.status==="Done"?"rgba(46,125,82,0.04)":"var(--surface)",border:`1px solid ${item.status==="Done"?"rgba(46,125,82,0.2)":"var(--border)"}`,borderRadius:11,alignItems:"flex-start"}}>
            <button onClick={()=>toggle(item.id)} style={{width:22,height:22,borderRadius:6,border:`2px solid ${item.status==="Done"?"var(--green)":"var(--border2)"}`,background:item.status==="Done"?"var(--green)":"transparent",color:"#fff",fontSize:12,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",marginTop:1}}>
              {item.status==="Done"?"✓":""}
            </button>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:item.status==="Done"?"var(--ink3)":"var(--ink)",textDecoration:item.status==="Done"?"line-through":"none"}}>{item.task==="__custom"?item.customTask:item.task}</div>
              <div style={{display:"flex",gap:10,marginTop:3,flexWrap:"wrap"}}>
                <span style={{fontSize:11,color:"var(--ink4)"}}>👤 {item.assignedTo}</span>
                {item.dueDate&&<span style={{fontSize:11,color:"var(--ink4)"}}>📅 {item.dueDate}</span>}
                {item.notes&&<span style={{fontSize:11,color:"var(--ink3)",fontStyle:"italic"}}>{item.notes}</span>}
              </div>
            </div>
            <Badge label={item.status} color={item.status==="Done"?"var(--green)":item.status==="In Progress"?"var(--amber)":"var(--ink4)"}/>
            <DelBtn onClick={()=>remove(item.id)}/>
          </div>
        ))}
      </div>
    );
  };

  // ── EVENT SCHEDULES & TEAM ASSIGNMENT TAB ───────────────────────────────
  const ScheduleTab = ({p}) => {
    const [schedules,setSchedules] = useState(p.eventSchedules||[]);
    const [expanded,setExpanded] = useState(null);
    const [showLogForm,setShowLogForm] = useState(null); // eventIdx
    const logBlank = {shooter:"Karan",role:"Lead Photographer",arrivalTime:"",departureTime:"",hoursWorked:"",notes:""};
    const [logForm,setLogForm] = useState(logBlank);

    const updateSchedule = (idx,field,val) => {
      const updated = schedules.map((s,i)=>i===idx?{...s,[field]:val}:s);
      setSchedules(updated);
      saveProject({...p,eventSchedules:updated});
    };
    const toggleTeamMember = (idx,name) => {
      const s = schedules[idx];
      const team = s.team.includes(name)?s.team.filter(t=>t!==name):[...s.team,name];
      updateSchedule(idx,"team",team);
    };
    const addShootLog = (idx) => {
      const updated = schedules.map((s,i)=>i===idx?{...s,shootLog:[...(s.shootLog||[]),{...logForm,id:uid(),date:s.date}]}:s);
      setSchedules(updated);
      saveProject({...p,eventSchedules:updated});
      setShowLogForm(null); setLogForm(logBlank);
    };
    const removeLog = (evtIdx,logId) => {
      const updated = schedules.map((s,i)=>i===evtIdx?{...s,shootLog:s.shootLog.filter(l=>l.id!==logId)}:s);
      setSchedules(updated); saveProject({...p,eventSchedules:updated});
    };

    return (
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div style={{fontSize:13,fontWeight:700,color:"var(--ink)",marginBottom:2}}>Event Schedules & Team Assignment</div>
        {schedules.map((s,idx)=>(
          <div key={idx} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:13,overflow:"hidden"}}>
            {/* Event header */}
            <div onClick={()=>setExpanded(expanded===idx?null:idx)} style={{padding:"14px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:expanded===idx?"rgba(168,119,58,0.05)":"transparent"}}>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"var(--ink)"}}>{s.eventName}</div>
                <div style={{fontSize:11,color:"var(--ink4)",marginTop:2}}>📅 {s.date} &nbsp;·&nbsp; 📍 {s.location} &nbsp;·&nbsp; 👥 {s.team.length} assigned</div>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                {s.team.length>0&&<div style={{display:"flex",gap:4}}>{s.team.slice(0,3).map(t=><span key={t} style={{fontSize:10,padding:"2px 7px",background:"rgba(91,63,160,0.1)",color:"var(--purple)",borderRadius:8,border:"1px solid rgba(91,63,160,0.2)"}}>{t}</span>)}{s.team.length>3&&<span style={{fontSize:10,color:"var(--ink4)"}}>+{s.team.length-3}</span>}</div>}
                <span style={{color:"var(--ink4)",fontSize:12}}>{expanded===idx?"▲":"▼"}</span>
              </div>
            </div>

            {expanded===idx&&(
              <div style={{padding:"0 16px 16px",borderTop:"1px solid var(--border)",paddingTop:14,display:"flex",flexDirection:"column",gap:14}}>

                {/* Team assignment */}
                <div>
                  <div style={{fontSize:11,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Assign Team</div>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                    {ALL_TEAM_NAMES.map(name=>(
                      <button key={name} onClick={()=>toggleTeamMember(idx,name)} style={{padding:"6px 13px",borderRadius:20,border:"1px solid",borderColor:s.team.includes(name)?"var(--brass)":"var(--border2)",background:s.team.includes(name)?"rgba(168,119,58,0.15)":"var(--bg2)",color:s.team.includes(name)?"var(--brass-d)":"var(--ink3)",fontSize:12,fontWeight:s.team.includes(name)?700:500,cursor:"pointer",fontFamily:"inherit",transition:"all .12s"}}>
                        {s.team.includes(name)?"✓ ":""}{name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Event details */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                  <div>
                    <FL>Day Type</FL>
                    <Sel value={s.dayType||"Full Day"} onChange={e=>updateSchedule(idx,"dayType",e.target.value)}>{["Full Day","Half Day","Evening","Multi-Day"].map(o=><option key={o}>{o}</option>)}</Sel>
                  </div>
                  <div>
                    <FL>Hours Covered</FL>
                    <Inp type="number" value={s.hours||""} onChange={e=>updateSchedule(idx,"hours",e.target.value)} placeholder="e.g. 8"/>
                  </div>
                  <div>
                    <FL>Additional Cost (₹)</FL>
                    <Inp type="number" value={s.additionalCost||""} onChange={e=>updateSchedule(idx,"additionalCost",e.target.value)} placeholder="0"/>
                  </div>
                </div>

                {/* Extended hours */}
                <div style={{display:"flex",gap:10,alignItems:"center",padding:"10px 14px",background:"var(--bg2)",borderRadius:9,border:"1px solid var(--border)"}}>
                  <input type="checkbox" id={`ext-${idx}`} checked={s.extended||false} onChange={e=>updateSchedule(idx,"extended",e.target.checked)} style={{width:16,height:16,cursor:"pointer"}}/>
                  <label htmlFor={`ext-${idx}`} style={{fontSize:12,color:"var(--ink)",cursor:"pointer",fontFamily:"inherit"}}>Extended hours</label>
                  {s.extended&&(
                    <div style={{display:"flex",gap:8,alignItems:"center",marginLeft:8}}>
                      <Inp type="number" value={s.extendedHours||""} onChange={e=>updateSchedule(idx,"extendedHours",e.target.value)} placeholder="Extra hours" style={{width:100}}/>
                      <span style={{fontSize:11,color:"var(--ink4)"}}>extra hrs</span>
                    </div>
                  )}
                </div>

                {/* Event notes */}
                <div>
                  <FL>Event Notes</FL>
                  <TextA value={s.notes||""} onChange={e=>updateSchedule(idx,"notes",e.target.value)} placeholder="Venue details, special instructions, timings…" style={{minHeight:56}}/>
                </div>

                {/* SHOOT LOG — who covered, hours, roles */}
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{fontSize:11,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"}}>Shoot Log</div>
                    <button onClick={()=>setShowLogForm(showLogForm===idx?null:idx)} style={{padding:"5px 12px",borderRadius:7,background:"var(--bg2)",border:"1px solid var(--border2)",color:"var(--ink3)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Add Entry</button>
                  </div>

                  {showLogForm===idx&&(
                    <div style={{background:"var(--bg2)",borderRadius:10,padding:12,border:"1px solid var(--border2)",display:"flex",flexDirection:"column",gap:9,marginBottom:10}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                        <div><FL>Shooter / Editor</FL><Sel value={logForm.shooter} onChange={e=>setLogForm(f=>({...f,shooter:e.target.value}))}>{ALL_TEAM_NAMES.map(n=><option key={n}>{n}</option>)}</Sel></div>
                        <div><FL>Role</FL><Sel value={logForm.role} onChange={e=>setLogForm(f=>({...f,role:e.target.value}))}>{["Lead Photographer","2nd Photographer","Cinematographer","BTS","Drone","Assistant","Editor"].map(r=><option key={r}>{r}</option>)}</Sel></div>
                        <div><FL>Arrival Time</FL><Inp type="time" value={logForm.arrivalTime} onChange={e=>setLogForm(f=>({...f,arrivalTime:e.target.value}))}/></div>
                        <div><FL>Departure Time</FL><Inp type="time" value={logForm.departureTime} onChange={e=>setLogForm(f=>({...f,departureTime:e.target.value}))}/></div>
                      </div>
                      <div><FL>Hours Worked</FL><Inp type="number" value={logForm.hoursWorked} onChange={e=>setLogForm(f=>({...f,hoursWorked:e.target.value}))} placeholder="Total hours on site"/></div>
                      <div><FL>Notes</FL><TextA value={logForm.notes} onChange={e=>setLogForm(f=>({...f,notes:e.target.value}))} style={{minHeight:44}}/></div>
                      <div style={{display:"flex",gap:8}}><Btn onClick={()=>addShootLog(idx)} style={{flex:1}}>Add to Log</Btn><Btn onClick={()=>setShowLogForm(null)} variant="ghost" style={{flex:1}}>Cancel</Btn></div>
                    </div>
                  )}

                  {(s.shootLog||[]).length===0&&!showLogForm&&<div style={{fontSize:11,color:"var(--ink4)",padding:"8px 0"}}>No shoot log entries yet.</div>}
                  {(s.shootLog||[]).map(log=>(
                    <div key={log.id} style={{display:"grid",gridTemplateColumns:"1fr 1fr 0.7fr 0.7fr 1fr 0.4fr",gap:9,padding:"9px 12px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:9,alignItems:"center",marginBottom:5}}>
                      <div style={{fontSize:12,fontWeight:700,color:"var(--ink)"}}>{log.shooter}</div>
                      <div style={{fontSize:11,color:"var(--ink3)"}}>{log.role}</div>
                      <div style={{fontSize:11,color:"var(--ink4)"}}>{log.arrivalTime||"—"}</div>
                      <div style={{fontSize:11,color:"var(--ink4)"}}>{log.departureTime||"—"}</div>
                      <div style={{fontSize:11,color:"var(--ink3)"}}>{log.hoursWorked?`${log.hoursWorked}h`:""} {log.notes}</div>
                      <DelBtn onClick={()=>removeLog(idx,log.id)}/>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // ── DATA BACKUP TAB ──────────────────────────────────────────────────────
  const DataBackupTab = ({p}) => {
    const [backups,setBackups] = useState(p.dataBackups||[]);
    const [showAdd,setShowAdd] = useState(false);
    const blank = {eventName:"",copiedBy:"Karan",harddisk:"",copiedDate:"",fileCount:"",totalSize:"",verified:false,notes:""};
    const [form,setForm] = useState(blank);

    const save = () => {
      const updated = [...backups,{...form,id:uid()}];
      setBackups(updated); saveProject({...p,dataBackups:updated});
      setShowAdd(false); setForm(blank);
    };
    const remove = id => { const updated=backups.filter(b=>b.id!==id); setBackups(updated); saveProject({...p,dataBackups:updated}); };
    const toggleVerify = id => { const updated=backups.map(b=>b.id===id?{...b,verified:!b.verified}:b); setBackups(updated); saveProject({...p,dataBackups:updated}); };

    return (
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:"var(--ink)"}}>Data Backup Log</div>
            <div style={{fontSize:11,color:"var(--ink4)",marginTop:2}}>Track which hard disk contains the footage and who copied it</div>
          </div>
          <button onClick={()=>setShowAdd(v=>!v)} style={{padding:"7px 14px",borderRadius:8,background:"var(--brass)",border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Add Backup Entry</button>
        </div>

        {showAdd&&(
          <div style={{background:"var(--bg2)",borderRadius:12,padding:14,border:"1px solid var(--border2)",display:"flex",flexDirection:"column",gap:10}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div><FL>Event Name</FL>
                <Sel value={form.eventName} onChange={e=>setForm(f=>({...f,eventName:e.target.value}))}>
                  <option value="">— Select event —</option>
                  {p.events.map(e=><option key={e.name}>{e.name}</option>)}
                </Sel>
              </div>
              <div><FL>Copied By</FL><Sel value={form.copiedBy} onChange={e=>setForm(f=>({...f,copiedBy:e.target.value}))}>{ALL_TEAM_NAMES.map(n=><option key={n}>{n}</option>)}</Sel></div>
              <div><FL>Hard Disk ID / Label</FL><Inp value={form.harddisk} onChange={e=>setForm(f=>({...f,harddisk:e.target.value}))} placeholder="e.g. WD-4TB-01, Seagate-2TB"/></div>
              <div><FL>Copied Date & Time</FL><Inp type="datetime-local" value={form.copiedDate} onChange={e=>setForm(f=>({...f,copiedDate:e.target.value}))}/></div>
              <div><FL>File Count</FL><Inp type="number" value={form.fileCount} onChange={e=>setForm(f=>({...f,fileCount:e.target.value}))} placeholder="e.g. 1842"/></div>
              <div><FL>Total Size</FL><Inp value={form.totalSize} onChange={e=>setForm(f=>({...f,totalSize:e.target.value}))} placeholder="e.g. 128 GB"/></div>
            </div>
            <div><FL>Notes</FL><TextA value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} style={{minHeight:44}} placeholder="Any notes about the backup…"/></div>
            <div style={{display:"flex",gap:8}}><Btn onClick={save} style={{flex:1}}>Save Backup Entry</Btn><Btn onClick={()=>setShowAdd(false)} variant="ghost" style={{flex:1}}>Cancel</Btn></div>
          </div>
        )}

        {backups.length===0&&!showAdd&&<div style={{textAlign:"center",padding:"24px",color:"var(--ink4)",fontSize:13,background:"var(--bg2)",borderRadius:10,border:"1px dashed var(--border2)"}}>No backup entries. Add one after each shoot day.</div>}

        {backups.map(b=>(
          <div key={b.id} style={{padding:"13px 14px",background:b.verified?"rgba(46,125,82,0.04)":"var(--surface)",border:`1px solid ${b.verified?"rgba(46,125,82,0.2)":"var(--border)"}`,borderRadius:11}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"var(--ink)"}}>{b.eventName} — {b.harddisk}</div>
                <div style={{fontSize:11,color:"var(--ink4)",marginTop:2}}>Copied by <strong>{b.copiedBy}</strong> · {b.copiedDate}</div>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <button onClick={()=>toggleVerify(b.id)} style={{padding:"4px 11px",borderRadius:8,background:b.verified?"rgba(46,125,82,0.1)":"var(--bg2)",border:`1px solid ${b.verified?"rgba(46,125,82,0.3)":"var(--border2)"}`,color:b.verified?"var(--green)":"var(--ink3)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{b.verified?"✓ Verified":"Verify"}</button>
                <DelBtn onClick={()=>remove(b.id)}/>
              </div>
            </div>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              {b.fileCount&&<span style={{fontSize:11,color:"var(--ink3)"}}>📁 {b.fileCount} files</span>}
              {b.totalSize&&<span style={{fontSize:11,color:"var(--ink3)"}}>💾 {b.totalSize}</span>}
              {b.notes&&<span style={{fontSize:11,color:"var(--ink3)",fontStyle:"italic"}}>{b.notes}</span>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ── DELIVERABLES TAB ─────────────────────────────────────────────────────
  const DeliverablesTab = ({p}) => {
    const [pd,setPd] = useState(p.physicalDeliverables||{});
    const items = [
      {key:"photos",   label:"Photos", icon:"🖼️"},
      {key:"album",    label:"Album",  icon:"📘"},
      {key:"film",     label:"Film",   icon:"🎬"},
      {key:"reel",     label:"Reel",   icon:"🎞️"},
    ];
    const physical = [
      {key:"pendrive",      label:"Pendrive",       icon:"💾"},
      {key:"harddisk",      label:"Hard Disk",      icon:"🖤"},
      {key:"frames",        label:"Frames",         icon:"🖼"},
      {key:"album",         label:"Printed Album",  icon:"📘"},
      {key:"printedPhotos", label:"Printed Photos", icon:"🖨️"},
    ];

    const togglePhysical = (key,field,val) => {
      const updated = {...pd,[key]:{...pd[key],[field]:val}};
      setPd(updated); saveProject({...p,physicalDeliverables:updated});
    };

    return (
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {/* Digital deliverables */}
        <div>
          <SectionTitle>Digital Deliverables</SectionTitle>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {items.map(({key,label,icon})=>{
              const d = p.deliverables[key]||{status:"Pending",dueDate:""};
              return (
                <div key={key} style={{padding:"11px 13px",background:"var(--bg)",borderRadius:10,border:"1px solid var(--border)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{fontSize:12,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.06em"}}>{icon} {label}</div>
                    {d.status!=="Delivered"&&<button onClick={()=>updateDel(p.id,key,delNext[d.status]||"Delivered")} style={{fontSize:10,background:"rgba(168,119,58,0.1)",border:"1px solid rgba(168,119,58,0.2)",borderRadius:6,padding:"3px 8px",color:"var(--brass)",cursor:"pointer",fontFamily:"inherit"}}>→ {delNext[d.status]||"Delivered"}</button>}
                  </div>
                  <Badge label={d.status}/>
                  {d.dueDate&&<div style={{fontSize:10,color:"var(--ink4)",marginTop:4}}>Due: {d.dueDate}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Physical deliverables */}
        <div>
          <SectionTitle>Physical Deliverables</SectionTitle>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {physical.map(({key,label,icon})=>{
              const item = pd[key]||{delivered:false,qty:"",deliveredDate:"",notes:""};
              return (
                <div key={key} style={{padding:"12px 14px",background:item.delivered?"rgba(46,125,82,0.04)":"var(--surface)",border:`1px solid ${item.delivered?"rgba(46,125,82,0.2)":"var(--border)"}`,borderRadius:11}}>
                  <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,minWidth:140}}>
                      <input type="checkbox" id={`phys-${key}`} checked={item.delivered||false} onChange={e=>togglePhysical(key,"delivered",e.target.checked)} style={{width:16,height:16,cursor:"pointer"}}/>
                      <label htmlFor={`phys-${key}`} style={{fontSize:13,fontWeight:600,color:"var(--ink)",cursor:"pointer",fontFamily:"inherit"}}>{icon} {label}</label>
                    </div>
                    {item.delivered&&(
                      <>
                        <div style={{display:"flex",gap:8,flex:1,flexWrap:"wrap"}}>
                          <div style={{display:"flex",alignItems:"center",gap:5}}>
                            <span style={{fontSize:11,color:"var(--ink4)"}}>Qty:</span>
                            <input value={item.qty||""} onChange={e=>togglePhysical(key,"qty",e.target.value)} placeholder="e.g. 2" style={{width:60,...IS,padding:"4px 8px",fontSize:12}}/>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:5}}>
                            <span style={{fontSize:11,color:"var(--ink4)"}}>Date:</span>
                            <input type="date" value={item.deliveredDate||""} onChange={e=>togglePhysical(key,"deliveredDate",e.target.value)} style={{...IS,padding:"4px 8px",fontSize:12,width:140}}/>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:5,flex:1}}>
                            <span style={{fontSize:11,color:"var(--ink4)"}}>Note:</span>
                            <input value={item.notes||""} onChange={e=>togglePhysical(key,"notes",e.target.value)} placeholder="Courier / hand-delivered…" style={{...IS,padding:"4px 8px",fontSize:12,flex:1}}/>
                          </div>
                        </div>
                        <Badge label="Delivered ✓" color="var(--green)"/>
                      </>
                    )}
                    {!item.delivered&&<span style={{fontSize:11,color:"var(--ink4)",fontStyle:"italic"}}>Not delivered yet</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ── POST-PRODUCTION TAB ─────────────────────────────────────────────────
  const PostProductionTab = ({p}) => {
    const [items,setItems] = useState(p.postProductionItems||[]);
    const [showAdd,setShowAdd] = useState(false);
    const [form,setForm] = useState({category:"Editing",task:"",assignedTo:"Mahesh",dueDate:"",status:"Pending",priority:"Normal",notes:""});

    const CATEGORIES = {
      Editing:    {icon:"🎬", tasks:["Photo Culling","Photo Editing","Colour Grading Photos","Film Edit (Rough Cut)","Film Edit (Final Cut)","SDE Edit","Reel Edit","Highlight Cut","Audio Sync","Title Cards"]},
      Albums:     {icon:"📘", tasks:["Photo Selection for Album","Album Layout Design","Album Design Review","Album Revision","Album Final Approval","Send to Print","Album Received from Print","Quality Check"]},
      Retouching: {icon:"✨", tasks:["Basic Retouching","Advanced Retouching","Skin Smoothing","Background Clean-up","Composite Shots"]},
      Export:     {icon:"📦", tasks:["Export Web Gallery (Low Res)","Export Full Res Photos","Export Film (1080p)","Export Film (4K)","Export Reel","Compress & Package","Upload to Drive","Upload to Gallery"]},
      Review:     {icon:"👁", tasks:["Internal Review","Client Preview Sent","Client Feedback Received","Revisions Applied","Final Approval Received"]},
      Dispatch:   {icon:"🚀", tasks:["Pendrive Prepared","Hard Disk Prepared","Frame Ordered","Packaged for Courier","Dispatched to Client","Delivered — Confirmed"]},
    };

    const save = () => {
      const taskLabel = form.task==="__custom"?(form.customTask||"Custom Task"):form.task;
      const updated = [...items,{...form,task:taskLabel,id:uid()}];
      setItems(updated);
      saveProject({...p,postProductionItems:updated});
      setShowAdd(false);
      setForm({category:"Editing",task:"",assignedTo:"Mahesh",dueDate:"",status:"Pending",priority:"Normal",notes:""});
    };
    const toggle = id => {
      const updated = items.map(i=>i.id===id?{...i,status:i.status==="Done"?"Pending":"Done"}:i);
      setItems(updated); saveProject({...p,postProductionItems:updated});
    };
    const setStatus = (id,status) => {
      const updated = items.map(i=>i.id===id?{...i,status}:i);
      setItems(updated); saveProject({...p,postProductionItems:updated});
    };
    const remove = id => {
      const updated = items.filter(i=>i.id!==id);
      setItems(updated); saveProject({...p,postProductionItems:updated});
    };

    const byCategory = Object.keys(CATEGORIES).reduce((acc,cat)=>{
      const catItems = items.filter(i=>i.category===cat);
      if(catItems.length>0) acc[cat]=catItems;
      return acc;
    },{});

    const done = items.filter(i=>i.status==="Done").length;
    const inProgress = items.filter(i=>i.status==="In Progress").length;
    const priorityColor = {High:"var(--red)",Normal:"var(--amber)",Low:"var(--ink4)"};

    return (
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {/* Header + progress */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:"var(--ink)"}}>Production & Post-Production Tasks</div>
            <div style={{fontSize:11,color:"var(--ink4)",marginTop:2}}>{done} done · {inProgress} in progress · {items.length-done-inProgress} pending</div>
          </div>
          <button onClick={()=>setShowAdd(v=>!v)} style={{padding:"7px 14px",borderRadius:8,background:"var(--brass)",border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Add Task</button>
        </div>

        {items.length>0&&(
          <div>
            <Bar value={done} max={items.length||1} color="var(--green)" height={6}/>
            <div style={{display:"flex",gap:14,marginTop:5}}>
              <span style={{fontSize:10,color:"var(--green)",fontWeight:700}}>{done} Done</span>
              <span style={{fontSize:10,color:"var(--amber)",fontWeight:700}}>{inProgress} In Progress</span>
              <span style={{fontSize:10,color:"var(--ink4)"}}>{items.length-done-inProgress} Pending</span>
            </div>
          </div>
        )}

        {/* Add task form */}
        {showAdd&&(
          <div style={{background:"var(--bg2)",borderRadius:12,padding:14,border:"1px solid var(--border2)",display:"flex",flexDirection:"column",gap:10}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div>
                <FL>Category</FL>
                <Sel value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value,task:""}))}>
                  {Object.entries(CATEGORIES).map(([c,v])=><option key={c} value={c}>{v.icon} {c}</option>)}
                </Sel>
              </div>
              <div>
                <FL>Task</FL>
                <Sel value={form.task} onChange={e=>setForm(f=>({...f,task:e.target.value}))}>
                  <option value="">— Select task —</option>
                  {(CATEGORIES[form.category]?.tasks||[]).map(t=><option key={t}>{t}</option>)}
                  <option value="__custom">Custom…</option>
                </Sel>
                {form.task==="__custom"&&<Inp value={form.customTask||""} onChange={e=>setForm(f=>({...f,customTask:e.target.value}))} placeholder="Describe the task…" style={{marginTop:6}}/>}
              </div>
              <div>
                <FL>Assigned To</FL>
                <Sel value={form.assignedTo} onChange={e=>setForm(f=>({...f,assignedTo:e.target.value}))}>
                  {ALL_TEAM_NAMES.map(n=><option key={n}>{n}</option>)}
                </Sel>
              </div>
              <div><FL>Due Date</FL><Inp type="date" value={form.dueDate} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))}/></div>
              <div>
                <FL>Status</FL>
                <Sel value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
                  {["Pending","In Progress","Done","On Hold","Revisions Needed"].map(s=><option key={s}>{s}</option>)}
                </Sel>
              </div>
              <div>
                <FL>Priority</FL>
                <Sel value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}>
                  {["High","Normal","Low"].map(s=><option key={s}>{s}</option>)}
                </Sel>
              </div>
            </div>
            <div><FL>Notes</FL><TextA value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} style={{minHeight:48}} placeholder="Instructions, file locations, client feedback…"/></div>
            <div style={{display:"flex",gap:8}}><Btn onClick={save} style={{flex:1}}>Save Task</Btn><Btn onClick={()=>setShowAdd(false)} variant="ghost" style={{flex:1}}>Cancel</Btn></div>
          </div>
        )}

        {items.length===0&&!showAdd&&(
          <div style={{textAlign:"center",padding:"24px",color:"var(--ink4)",fontSize:13,background:"var(--bg2)",borderRadius:10,border:"1px dashed var(--border2)"}}>
            No post-production tasks yet. Add editing, album, export and dispatch tasks here.
          </div>
        )}

        {/* Tasks grouped by category */}
        {Object.entries(CATEGORIES).map(([cat,{icon}])=>{
          const catItems = items.filter(i=>i.category===cat);
          if(catItems.length===0) return null;
          const catDone = catItems.filter(i=>i.status==="Done").length;
          return (
            <div key={cat}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,paddingBottom:6,borderBottom:"1px solid var(--border)"}}>
                <div style={{fontSize:12,fontWeight:700,color:"var(--ink3)",textTransform:"uppercase",letterSpacing:"0.07em"}}>{icon} {cat}</div>
                <div style={{fontSize:10,color:catDone===catItems.length?"var(--green)":"var(--ink4)",fontWeight:600}}>{catDone}/{catItems.length}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {catItems.map(item=>(
                  <div key={item.id} style={{display:"flex",gap:10,padding:"11px 13px",background:item.status==="Done"?"rgba(46,125,82,0.04)":item.status==="In Progress"?"rgba(192,135,58,0.04)":item.status==="Revisions Needed"?"rgba(192,57,43,0.04)":"var(--surface)",border:`1px solid ${item.status==="Done"?"rgba(46,125,82,0.2)":item.status==="In Progress"?"rgba(192,135,58,0.2)":item.status==="Revisions Needed"?"rgba(192,57,43,0.2)":"var(--border)"}`,borderRadius:10,alignItems:"flex-start"}}>
                    {/* Checkbox */}
                    <button onClick={()=>toggle(item.id)} style={{width:20,height:20,borderRadius:5,border:`2px solid ${item.status==="Done"?"var(--green)":"var(--border2)"}`,background:item.status==="Done"?"var(--green)":"transparent",color:"#fff",fontSize:11,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",marginTop:2}}>{item.status==="Done"?"✓":""}</button>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                        <div style={{fontSize:12,fontWeight:600,color:item.status==="Done"?"var(--ink3)":"var(--ink)",textDecoration:item.status==="Done"?"line-through":"none"}}>{item.task}</div>
                        {item.priority!=="Normal"&&<div style={{width:6,height:6,borderRadius:"50%",background:priorityColor[item.priority],flexShrink:0}} title={`${item.priority} priority`}/>}
                      </div>
                      <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
                        <span style={{fontSize:10,color:"var(--ink4)"}}>👤 {item.assignedTo}</span>
                        {item.dueDate&&<span style={{fontSize:10,color:"var(--ink4)"}}>📅 {item.dueDate}</span>}
                        {item.notes&&<span style={{fontSize:10,color:"var(--ink3)",fontStyle:"italic",maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.notes}</span>}
                      </div>
                    </div>
                    {/* Status quick-change */}
                    <div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}>
                      <Sel value={item.status} onChange={e=>setStatus(item.id,e.target.value)} style={{fontSize:11,padding:"3px 7px",width:"auto"}}>
                        {["Pending","In Progress","Done","On Hold","Revisions Needed"].map(s=><option key={s}>{s}</option>)}
                      </Sel>
                      <DelBtn onClick={()=>remove(item.id)}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── PROJECT DETAIL MODAL ─────────────────────────────────────────────────
  const ProjectModal = ({p}) => {
    const tabs = ["overview","pre-production","post-production","schedules","data-backup","deliverables"];
    const tabLabels = {overview:"Overview","pre-production":"Pre-Production","post-production":"Post-Production",schedules:"Schedules","data-backup":"Data Backup",deliverables:"Deliverables"};
    return (
      <Modal title={p.client} onClose={()=>setSelected(null)} width={760}>
        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
          <Badge label={p.status}/><Badge label={p.package} color="var(--brass)"/>
        </div>
        <div style={{display:"flex",gap:5,marginBottom:16,flexWrap:"wrap"}}>
          {tabs.map(t=>(
            <button key={t} onClick={()=>setProjTab(t)} style={{padding:"6px 12px",borderRadius:8,border:"1px solid",borderColor:projTab===t?"var(--brass)":"var(--border)",background:projTab===t?"rgba(168,119,58,0.12)":"var(--surface)",color:projTab===t?"var(--brass)":"var(--ink3)",fontSize:12,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>{tabLabels[t]}</button>
          ))}
        </div>

        {projTab==="overview"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <InfoGrid items={[["Location",p.location],["Team",p.team.join(", ")||"TBA"],["Total",fmt(p.amount)],["Collected",fmt(p.paid)],["Balance",fmt(p.amount-p.paid)],["Events",p.events.map(e=>`${e.name} (${e.date})`).join(", ")]]}/>
            {p.notes&&<div style={{background:"var(--bg)",borderRadius:10,padding:"10px 14px",border:"1px solid var(--border)"}}><div style={{fontSize:10,color:"var(--ink4)",marginBottom:4,textTransform:"uppercase"}}>Notes</div><div style={{fontSize:13,color:"var(--ink3)",lineHeight:1.6}}>{p.notes}</div></div>}
            {p.albumBacklog&&(
              <div style={{background:"rgba(192,57,43,0.07)",border:"1px solid rgba(192,57,43,0.25)",borderRadius:11,padding:13}}>
                <div style={{fontSize:13,color:"var(--red)",fontWeight:700}}>Album Billing Pending: {fmt(p.albumBacklogAmount)}</div>
                <div style={{fontSize:11,color:"var(--ink3)",marginTop:3}}>Design complete — collect balance and dispatch</div>
              </div>
            )}
          </div>
        )}
        {projTab==="pre-production"&&<PreProductionTab p={p}/>}
        {projTab==="post-production"&&<PostProductionTab p={p}/>}
        {projTab==="schedules"&&<ScheduleTab p={p}/>}
        {projTab==="data-backup"&&<DataBackupTab p={p}/>}
        {projTab==="deliverables"&&<DeliverablesTab p={p}/>}
      </Modal>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <Row>
        <div>
          <div style={{fontSize:22,fontFamily:"'Playfair Display',serif",color:"var(--ink)"}}>Projects</div>
          <div style={{fontSize:12,color:"var(--ink4)",marginTop:2}}>{brandProjects.length} total · {brandProjects.filter(p=>p.albumBacklog).length} album backlog</div>
        </div>
        <Btn onClick={()=>setShowCreate(true)}>+ Create Project</Btn>
      </Row>

      {projects.some(p=>p.albumBacklog)&&(
        <Card style={{borderColor:"rgba(192,57,43,0.25)",background:"rgba(192,57,43,0.04)"}}>
          <div style={{fontSize:13,fontWeight:700,color:"var(--red)",marginBottom:10}}>🚨 Album Backlog</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {projects.filter(p=>p.albumBacklog).map(p=>(
              <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 13px",background:"rgba(192,57,43,0.05)",borderRadius:9,border:"1px solid rgba(192,57,43,0.15)"}}>
                <div><div style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>{p.client}</div><div style={{fontSize:11,color:"var(--ink4)"}}>Album design complete — pending billing</div></div>
                <div style={{fontSize:14,color:"var(--red)",fontWeight:800}}>{fmt(p.albumBacklogAmount)}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {statuses.map(s=><button key={s} onClick={()=>setFilter(s)} style={{padding:"6px 14px",borderRadius:20,border:"1px solid",borderColor:filter===s?"var(--brass)":"var(--border)",background:filter===s?"rgba(168,119,58,0.12)":"var(--surface)",color:filter===s?"var(--brass)":"var(--ink3)",fontSize:12,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>{s}</button>)}
      </div>

      <div className="project-grid">
        {filtered.map(p=>(
          <div key={p.id} onClick={()=>openProject(p)} style={{padding:18,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:13,cursor:"pointer",transition:"border-color .15s",borderLeft:`3px solid ${SC[p.status]||"var(--ink4)"}`}}
            onMouseEnter={e=>e.currentTarget.style.borderColor="var(--brass-l)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
              <div><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}><BrandPill brandId={p.brand}/></div><div style={{fontSize:14,fontWeight:700,color:"var(--ink)"}}>{p.client}</div><div style={{fontSize:11,color:"var(--ink3)"}}>{p.events.map(e=>e.name).join(" · ")} · {p.location}</div></div>
              <Badge label={p.status}/>
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
              {Object.entries(p.deliverables).map(([k,d])=><span key={k} style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:`${SC[d.status]||"var(--ink4)"}22`,color:SC[d.status]||"var(--ink4)",border:`1px solid ${SC[d.status]||"var(--ink4)"}33`}}>{k}: {d.status}</span>)}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{flex:1,marginRight:12}}>
                <div style={{fontSize:12,color:"var(--brass)",fontWeight:700,marginBottom:3}}>{fmt(p.paid)} <span style={{color:"var(--ink4)",fontWeight:400}}>/ {fmt(p.amount)}</span></div>
                <Bar value={p.paid} max={p.amount}/>
              </div>
              {p.albumBacklog&&<span style={{fontSize:10,color:"var(--red)",fontWeight:700,background:"rgba(192,57,43,0.1)",padding:"3px 8px",borderRadius:9,whiteSpace:"nowrap"}}>ALBUM PENDING</span>}
            </div>
          </div>
        ))}
      </div>

      {selected&&<ProjectModal p={selected}/>}

      {showCreate&&(
        <Modal title="Create New Project" onClose={()=>setShowCreate(false)}>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            <div>
              <FL>Brand</FL>
              <div style={{display:"flex",gap:8}}>
                {BRAND_LIST.map(b=>(
                  <button key={b.id} onClick={()=>setPform(f=>({...f,brand:b.id,package:b.packages[0]}))} style={{flex:1,padding:"14px 8px",borderRadius:11,border:`2px solid ${pform.brand===b.id?b.color:"var(--border)"}`,background:pform.brand===b.id?`${b.color}12`:"var(--surface)",color:pform.brand===b.id?b.color:"var(--ink4)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textAlign:"center"}}>
                    <div style={{fontSize:24,marginBottom:6}}>{b.emoji}</div>
                    <div>{b.id==="tsb"?"The Story Box":b.id==="tsbp"?"TSB Productions":"Oye Baby by TSB"}</div>
                  </button>
                ))}
              </div>
            </div>
            {[["Client Name","client","text"],["Location","location","text"],["Package Amount (₹)","amount","number"]].map(([l,k,t])=>(
              <div key={k}><FL>{l}</FL><Inp type={t} value={pform[k]} onChange={e=>setPform({...pform,[k]:e.target.value})}/></div>
            ))}
            <div><FL>Package</FL><Sel value={pform.package} onChange={e=>setPform({...pform,package:e.target.value})}>{activePkg.map(o=><option key={o}>{o}</option>)}</Sel></div>
            <div><FL>Notes</FL><TextA value={pform.notes} onChange={e=>setPform({...pform,notes:e.target.value})}/></div>
            <Btn onClick={createProject} style={{marginTop:4}}>Create Project</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


// ─────────────────────────────────────────────────────────────────────────────
// MODULE 4 — CLIENTS (with Invoice/Doc tab)
// ─────────────────────────────────────────────────────────────────────────────
const LINK_DEFS = [
  {key:"rawPhotosLink",  label:"Photos — Raw Link",    icon:"📷",  color:"var(--ink2)",   placeholder:"https://drive.google.com/… (RAW files)"},
  {key:"photosLink",     label:"Photos — Edited Link", icon:"🖼️",  color:"var(--blue)",   placeholder:"https://drive.google.com/… (edited)"},
  {key:"videosLink",     label:"Film / Video Link",    icon:"🎬",  color:"var(--red)",    placeholder:"https://vimeo.com/…"},
  {key:"reelLink",       label:"Reel Link",            icon:"🎞️",  color:"var(--amber)",  placeholder:"https://instagram.com/…"},
  {key:"driveLink",      label:"Google Drive Folder",  icon:"📁",  color:"var(--green)",  placeholder:"https://drive.google.com/drive/folders/…"},
];

const DeliverableTab = ({c,proj,clients,setClients}) => {
  const [editing,setEditing] = useState({});
  const [draft,setDraft] = useState({});
  const startEdit = k => { setDraft(d=>({...d,[k]:c[k]||""})); setEditing(e=>({...e,[k]:true})); };
  const saveLink = k => {
    const updated = clients.map(cl=>cl.id===c.id?{...cl,[k]:draft[k]}:cl);
    setClients(updated);
    c[k]=draft[k];
    setEditing(e=>({...e,[k]:false}));
  };
  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {proj?(
        <div>
          <div style={{fontSize:11,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:9}}>Deliverable Status</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {Object.entries(proj.deliverables).map(([k,d])=>(
              <div key={k} style={{padding:"11px 13px",background:"var(--bg)",borderRadius:10,border:"1px solid var(--border)"}}>
                <div style={{fontSize:10,color:"var(--ink4)",textTransform:"uppercase",marginBottom:5}}>{k}</div>
                <Badge label={d.status}/>
                {d.dueDate&&<div style={{fontSize:10,color:"var(--ink4)",marginTop:4}}>Due: {d.dueDate}</div>}
              </div>
            ))}
          </div>
        </div>
      ):(
        <div style={{padding:"12px 14px",background:"var(--bg2)",borderRadius:10,border:"1px dashed var(--border2)"}}><div style={{fontSize:12,color:"var(--ink3)",textAlign:"center"}}>No linked project yet — add delivery links below.</div></div>
      )}
      <div>
        <div style={{fontSize:11,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Delivery Links</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {LINK_DEFS.map(({key,label,icon,color,placeholder})=>{
            const val = c[key]||"";
            const isEditing = editing[key];
            return (
              <div key={key} style={{padding:"12px 14px",background:"var(--bg)",border:"1px solid var(--border)",borderRadius:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:isEditing?10:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:16}}>{icon}</span>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:"var(--ink)"}}>{label}</div>
                      {!isEditing&&val&&<div style={{fontSize:11,color:"var(--ink3)",marginTop:1,maxWidth:260,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{val}</div>}
                      {!isEditing&&!val&&<div style={{fontSize:11,color:"var(--ink4)",marginTop:1,fontStyle:"italic"}}>No link added yet</div>}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    {val&&!isEditing&&<a href={val} target="_blank" rel="noopener noreferrer" style={{padding:"5px 11px",background:`${color}18`,border:`1px solid ${color}44`,borderRadius:7,color,textDecoration:"none",fontSize:11,fontWeight:700}}>View ↗</a>}
                    {!isEditing&&<button onClick={()=>startEdit(key)} style={{padding:"5px 11px",background:"rgba(168,119,58,0.1)",border:"1px solid rgba(168,119,58,0.25)",borderRadius:7,color:"var(--brass)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{val?"Edit":"+ Add"}</button>}
                  </div>
                </div>
                {isEditing&&(
                  <div>
                    <input type="url" value={draft[key]||""} onChange={e=>setDraft(d=>({...d,[key]:e.target.value}))} placeholder={placeholder} autoFocus style={{...IS,border:`1px solid ${color}55`,marginBottom:8}}/>
                    <div style={{display:"flex",gap:7}}>
                      <button onClick={()=>saveLink(key)} style={{padding:"6px 14px",background:`${color}22`,border:`1px solid ${color}44`,borderRadius:8,color,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Save</button>
                      <button onClick={()=>setEditing(e=>({...e,[key]:false}))} style={{padding:"6px 14px",background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:8,color:"var(--ink4)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DocumentTab = ({c,clients,setClients}) => {
  const [docs,setDocs] = useState(c.documents||[]);
  const [showForm,setShowForm] = useState(false);
  const [editDoc,setEditDoc] = useState(null);
  const blank = {type:"Invoice",title:"",amount:"",date:"",status:"Sent",fileName:"",notes:""};
  const [form,setForm] = useState(blank);

  const saveDoc = () => {
    const doc = {...form,id:editDoc?editDoc.id:uid(),amount:Number(form.amount)};
    const updated = editDoc?docs.map(d=>d.id===editDoc.id?doc:d):[...docs,doc];
    setDocs(updated);
    setClients(prev=>prev.map(cl=>cl.id===c.id?{...cl,documents:updated}:cl));
    c.documents=updated;
    setShowForm(false); setEditDoc(null); setForm(blank);
  };
  const deleteDoc = id => {
    const updated = docs.filter(d=>d.id!==id);
    setDocs(updated);
    setClients(prev=>prev.map(cl=>cl.id===c.id?{...cl,documents:updated}:cl));
    c.documents=updated;
  };
  const openEdit = doc => { setForm({...doc}); setEditDoc(doc); setShowForm(true); };
  const docColor = {Invoice:"var(--blue)",Proposal:"var(--purple)",Receipt:"var(--green)",Contract:"var(--amber)",Quotation:"var(--brass)"};

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <Row>
        <div style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>Invoices & Proposals</div>
        <button onClick={()=>{setForm(blank);setEditDoc(null);setShowForm(true);}} style={{padding:"7px 14px",borderRadius:8,background:"var(--brass)",border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Add Document</button>
      </Row>
      {docs.length===0&&!showForm&&(
        <div style={{padding:"28px",textAlign:"center",background:"var(--bg2)",borderRadius:12,border:"1px dashed var(--border2)"}}>
          <div style={{fontSize:26,marginBottom:6}}>📄</div>
          <div style={{fontSize:13,color:"var(--ink3)",marginBottom:3}}>No documents yet</div>
          <div style={{fontSize:11,color:"var(--ink4)"}}>Add invoices, proposals, quotations, or contracts.</div>
        </div>
      )}
      {docs.map(doc=>(
        <div key={doc.id} style={{padding:"13px 16px",background:"var(--bg)",border:"1px solid var(--border)",borderRadius:12,display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
          <div style={{display:"flex",gap:12,alignItems:"center",flex:1,minWidth:0}}>
            <div style={{width:36,height:36,borderRadius:9,background:`${docColor[doc.type]||"var(--brass)"}18`,border:`1px solid ${docColor[doc.type]||"var(--brass)"}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
              {doc.type==="Invoice"?"🧾":doc.type==="Proposal"?"📋":doc.type==="Receipt"?"✅":doc.type==="Contract"?"📝":"💰"}
            </div>
            <div style={{minWidth:0}}>
              <div style={{fontSize:13,color:"var(--ink)",fontWeight:700}}>{doc.title}</div>
              <div style={{display:"flex",gap:6,marginTop:3,flexWrap:"wrap",alignItems:"center"}}>
                <Badge label={doc.type} color={docColor[doc.type]}/>
                <Badge label={doc.status} color={doc.status==="Paid"?"var(--green)":doc.status==="Sent"?"var(--blue)":doc.status==="Draft"?"var(--ink3)":"var(--amber)"}/>
                {doc.amount>0&&<span style={{fontSize:11,color:"var(--brass)",fontWeight:700}}>{fmt(doc.amount)}</span>}
                {doc.date&&<span style={{fontSize:11,color:"var(--ink4)"}}>{doc.date}</span>}
              </div>
              {doc.fileName&&<div style={{fontSize:11,color:"var(--blue)",marginTop:2}}>📎 {doc.fileName}</div>}
            </div>
          </div>
          <div style={{display:"flex",gap:5,flexShrink:0}}>
            <ActBtn onClick={()=>openEdit(doc)}>✏️</ActBtn>
            <DelBtn onClick={()=>deleteDoc(doc.id)}/>
          </div>
        </div>
      ))}
      {showForm&&(
        <div style={{background:"var(--bg2)",borderRadius:12,padding:16,border:"1px solid var(--border2)",display:"flex",flexDirection:"column",gap:11}}>
          <div style={{fontSize:13,fontWeight:700,color:"var(--ink)",marginBottom:2}}>{editDoc?"Edit Document":"New Document"}</div>
          <div><FL>Type</FL><Sel value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>{["Invoice","Proposal","Receipt","Contract","Quotation"].map(o=><option key={o}>{o}</option>)}</Sel></div>
          {[["Title / Description","title","text"],["Amount (₹, optional)","amount","number"],["Date","date","date"]].map(([l,k,t])=>(
            <div key={k}><FL>{l}</FL><Inp type={t} value={form[k]||""} onChange={e=>setForm({...form,[k]:e.target.value})}/></div>
          ))}
          <div><FL>Status</FL><Sel value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>{["Draft","Sent","Viewed","Approved","Paid","Rejected"].map(o=><option key={o}>{o}</option>)}</Sel></div>
          <div><FL>Notes</FL><TextA value={form.notes||""} onChange={e=>setForm({...form,notes:e.target.value})} style={{minHeight:52}}/></div>
          <div>
            <FL>Attach File (PDF / Image)</FL>
            <div style={{background:"var(--surface)",border:"1px dashed var(--border2)",borderRadius:8,padding:"12px",textAlign:"center"}}>
              <input type="file" accept=".pdf,.jpg,.png,.docx" id={`doc-${c.id}`} style={{display:"none"}} onChange={e=>setForm({...form,fileName:e.target.files[0]?.name||""})}/>
              <label htmlFor={`doc-${c.id}`} style={{cursor:"pointer",fontSize:12,color:"var(--ink3)"}}>{form.fileName?`📄 ${form.fileName}`:"📎 Click to attach file"}</label>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <Btn onClick={saveDoc} style={{flex:1}}>{editDoc?"Save Changes":"Add Document"}</Btn>
            <Btn onClick={()=>{setShowForm(false);setEditDoc(null);}} variant="ghost" style={{flex:1}}>Cancel</Btn>
          </div>
        </div>
      )}
    </div>
  );
};

const Clients = ({clients,setClients,projects,activeBrand}) => {
  const brandClients = activeBrand==="all"?clients:clients.filter(c=>c.brand===activeBrand);
  const [selected,setSelected] = useState(null);
  const [clientTab,setClientTab] = useState("overview");
  const [showAdd,setShowAdd] = useState(false);
  const blank = {name:"",phone:"",email:"",location:"",totalAmount:"",paid:"",requirements:"",notes:"",tags:""};
  const [form,setForm] = useState(blank);

  const addClient = () => {
    setClients([...clients,{id:uid(),brand:form.brand||'tsb',...form,totalAmount:Number(form.totalAmount),paid:Number(form.paid),projectId:null,extraServices:[],rawPhotosLink:"",photosLink:"",videosLink:"",reelLink:"",driveLink:"",proposalSent:false,documents:[],tags:form.tags.split(",").map(t=>t.trim()).filter(Boolean)}]);
    setShowAdd(false); setForm(blank);
  };

  const pendingClients = brandClients.filter(c=>c.totalAmount-c.paid>0);
  const totalPending = pendingClients.reduce((s,c)=>s+(c.totalAmount-c.paid),0);
  const tabs = ["overview","financials","deliverables","documents","notes"];

  const ClientModal = ({c}) => {
    const proj = projects.find(p=>p.id===c.projectId);
    return (
      <Modal title={c.name} onClose={()=>setSelected(null)} width={720}>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
          {(c.tags||[]).map(t=><Badge key={t} label={t} color="var(--brass)"/>)}
          {c.proposalSent&&<Badge label="Proposal Sent" color="var(--green)"/>}
        </div>
        <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
          {tabs.map(t=><button key={t} onClick={()=>setClientTab(t)} style={{padding:"6px 13px",borderRadius:8,border:"1px solid",borderColor:clientTab===t?"var(--brass)":"var(--border)",background:clientTab===t?"rgba(168,119,58,0.12)":"var(--surface)",color:clientTab===t?"var(--brass)":"var(--ink3)",fontSize:12,cursor:"pointer",fontWeight:600,textTransform:"capitalize",fontFamily:"inherit"}}>{t}</button>)}
        </div>

        {clientTab==="overview"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <InfoGrid items={[["Phone",c.phone],["Email",c.email],["Location",c.location],["Total Package",fmt(c.totalAmount)],["Collected",fmt(c.paid)],["Balance Due",fmt(c.totalAmount-c.paid)]]}/>
            {c.requirements&&<div style={{background:"var(--bg)",borderRadius:10,padding:"11px 14px",border:"1px solid var(--border)"}}><div style={{fontSize:10,color:"var(--ink4)",marginBottom:5,textTransform:"uppercase"}}>Requirements</div><div style={{fontSize:13,color:"var(--ink3)",lineHeight:1.6}}>{c.requirements}</div></div>}
            {(c.extraServices||[]).length>0&&<div><SectionTitle>Extra Services</SectionTitle><div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{c.extraServices.map(s=><Badge key={s} label={s} color="var(--purple)"/>)}</div></div>}
            {proj&&<div><SectionTitle>Linked Project</SectionTitle><div style={{padding:"10px 14px",background:"var(--bg)",borderRadius:10,border:"1px solid var(--border)"}}><div style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>{proj.client}</div><div style={{display:"flex",gap:6,marginTop:5,flexWrap:"wrap"}}>{proj.events.map(e=><Badge key={e.name} label={`${e.name} — ${e.date}`} color="var(--blue)"/>)}</div></div></div>}
            <div style={{display:"flex",gap:8}}>
              <a href={`tel:${c.phone}`} style={{flex:1,padding:"9px 0",textAlign:"center",background:"rgba(46,125,82,0.08)",border:"1px solid rgba(46,125,82,0.3)",borderRadius:9,color:"var(--green)",textDecoration:"none",fontSize:13,fontWeight:700}}>📞 Call</a>
              <a href={`mailto:${c.email}`} style={{flex:1,padding:"9px 0",textAlign:"center",background:"rgba(45,95,160,0.08)",border:"1px solid rgba(45,95,160,0.3)",borderRadius:9,color:"var(--blue)",textDecoration:"none",fontSize:13,fontWeight:700}}>✉️ Email</a>
              <a href={`https://wa.me/${c.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer" style={{flex:1,padding:"9px 0",textAlign:"center",background:"rgba(46,125,82,0.08)",border:"1px solid rgba(46,125,82,0.3)",borderRadius:9,color:"var(--green)",textDecoration:"none",fontSize:13,fontWeight:700}}>💬 WhatsApp</a>
            </div>
          </div>
        )}

        {clientTab==="financials"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
              {[["Total Package",fmt(c.totalAmount),"var(--brass)"],["Collected",fmt(c.paid),"var(--green)"],["Balance Due",fmt(c.totalAmount-c.paid),c.totalAmount-c.paid>0?"var(--red)":"var(--green)"]].map(([l,v,col])=>(
                <div key={l} style={{background:"var(--bg)",borderRadius:10,padding:"12px 14px",textAlign:"center",border:"1px solid var(--border)"}}>
                  <div style={{fontSize:11,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6}}>{l}</div>
                  <div style={{fontSize:20,color:col,fontWeight:800,fontFamily:"'Playfair Display',serif"}}>{v}</div>
                </div>
              ))}
            </div>
            <div><div style={{fontSize:12,color:"var(--ink4)",marginBottom:5}}>Payment Progress</div><Bar value={c.paid} max={c.totalAmount} color="var(--green)" height={8}/><div style={{fontSize:11,color:"var(--green)",marginTop:4}}>{pct(c.paid,c.totalAmount)}% collected</div></div>
            {c.totalAmount-c.paid>0&&(
              <div style={{background:"rgba(192,57,43,0.06)",border:"1px solid rgba(192,57,43,0.2)",borderRadius:10,padding:"11px 14px"}}>
                <div style={{fontSize:13,color:"var(--red)",fontWeight:700}}>Payment Reminder Due</div>
                <div style={{fontSize:11,color:"var(--ink3)",marginTop:3}}>Balance of {fmt(c.totalAmount-c.paid)} is outstanding.</div>
                <a href={`https://wa.me/${c.phone.replace(/\D/g,"")}?text=Hi, gentle reminder — a balance of ${fmt(c.totalAmount-c.paid)} is pending for your photography package with The Story Box. Let us know when you'd like to process this. Thank you!`} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:9,padding:"7px 14px",background:"rgba(46,125,82,0.08)",border:"1px solid rgba(46,125,82,0.3)",borderRadius:8,color:"var(--green)",textDecoration:"none",fontSize:12,fontWeight:700}}>Send Reminder on WhatsApp</a>
              </div>
            )}
          </div>
        )}

        {clientTab==="deliverables"&&<DeliverableTab c={c} proj={proj} clients={clients} setClients={setClients}/>}
        {clientTab==="documents"&&<DocumentTab c={c} clients={clients} setClients={setClients}/>}

        {clientTab==="notes"&&(
          <div style={{background:"var(--bg)",borderRadius:10,padding:"13px 14px",minHeight:120,border:"1px solid var(--border)"}}>
            <div style={{fontSize:10,color:"var(--ink4)",marginBottom:6,textTransform:"uppercase"}}>Client Notes</div>
            <div style={{fontSize:13,color:"var(--ink3)",lineHeight:1.7}}>{c.notes||"No notes added."}</div>
          </div>
        )}
      </Modal>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <Row>
        <div>
          <div style={{fontSize:22,fontFamily:"'Playfair Display',serif",color:"var(--ink)"}}>Clients</div>
          <div style={{fontSize:12,color:"var(--ink4)",marginTop:2}}>{brandClients.length} total · {fmt(totalPending)} pending</div>
        </div>
        <Btn onClick={()=>setShowAdd(true)}>+ Add Client</Btn>
      </Row>
      <div className="stat-grid-3">
        <StatCard icon="👥" label="Total Clients" value={clients.length}/>
        <StatCard icon="💳" label="Pending Payments" value={fmt(totalPending)} sub={`${pendingClients.length} clients`} accent="var(--red)"/>
        <StatCard icon="✅" label="Fully Paid" value={brandClients.filter(c=>c.paid>=c.totalAmount).length} sub="clients" accent="var(--green)"/>
      </div>
      {pendingClients.length>0&&(
        <Card style={{borderColor:"rgba(192,57,43,0.2)",background:"rgba(192,57,43,0.04)"}}>
          <div style={{fontSize:13,fontWeight:700,color:"var(--red)",marginBottom:10}}>Outstanding Payments</div>
          {pendingClients.map(c=>(
            <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 13px",background:"var(--surface)",borderRadius:9,border:"1px solid var(--border)",marginBottom:6}}>
              <div><div style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>{c.name}</div><div style={{fontSize:11,color:"var(--ink4)"}}>{c.location}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:14,color:"var(--red)",fontWeight:800}}>{fmt(c.totalAmount-c.paid)}</div><div style={{fontSize:10,color:"var(--ink4)"}}>of {fmt(c.totalAmount)}</div></div>
            </div>
          ))}
        </Card>
      )}
      <div style={{display:"grid",gridTemplateColumns:"80px 2fr 1fr 1fr 1fr 1fr",gap:12,padding:"6px 14px",fontSize:10,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"}}>
        <span>Brand</span><span>Client</span><span>Location</span><span>Total</span><span>Collected</span><span>Balance</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {brandClients.map(c=>{
          const bal=c.totalAmount-c.paid;
          return (
            <div key={c.id} onClick={()=>{setSelected(c);setClientTab("overview");}} style={{display:"grid",gridTemplateColumns:"80px 2fr 1fr 1fr 1fr 1fr",gap:12,padding:"13px 14px",background:bal>0?"rgba(192,57,43,0.04)":"var(--surface)",border:`1px solid ${bal>0?"rgba(192,57,43,0.18)":"var(--border)"}`,borderRadius:11,alignItems:"center",cursor:"pointer",transition:"border-color .15s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor="var(--brass-l)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor=bal>0?"rgba(192,57,43,0.18)":"var(--border)"}>
              <BrandPill brandId={c.brand}/>
              <div><div style={{fontSize:13,fontWeight:700,color:"var(--ink)"}}>{c.name}</div><div style={{display:"flex",gap:4,marginTop:3,flexWrap:"wrap"}}>{(c.tags||[]).map(t=><Badge key={t} label={t} color="var(--brass)"/>)}</div></div>
              <div style={{fontSize:12,color:"var(--ink3)"}}>{c.location}</div>
              <div style={{fontSize:13,color:"var(--brass)",fontWeight:700}}>{fmt(c.totalAmount)}</div>
              <div style={{fontSize:13,color:"var(--green)",fontWeight:600}}>{fmt(c.paid)}</div>
              <div style={{fontSize:13,color:bal>0?"var(--red)":"var(--green)",fontWeight:700}}>{bal>0?fmt(bal):"Paid ✓"}</div>
            </div>
          );
        })}
      </div>
      {selected&&<ClientModal c={selected}/>}
      {showAdd&&(
        <Modal title="Add Client" onClose={()=>setShowAdd(false)}>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            <div>
              <FL>Brand</FL>
              <div style={{display:"flex",gap:8}}>
                {BRAND_LIST.map(b=>(
                  <button key={b.id} onClick={()=>setForm(f=>({...f,brand:b.id}))} style={{flex:1,padding:"14px 8px",borderRadius:11,border:`2px solid ${form.brand===b.id?b.color:"var(--border)"}`,background:form.brand===b.id?`${b.color}12`:"var(--surface)",color:form.brand===b.id?b.color:"var(--ink4)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textAlign:"center"}}>
                    <div style={{fontSize:24,marginBottom:6}}>{b.emoji}</div>
                    <div>{b.id==="tsb"?"The Story Box":b.id==="tsbp"?"TSB Productions":"Oye Baby by TSB"}</div>
                  </button>
                ))}
              </div>
            </div>
            {[["Name","name","text"],["Phone","phone","text"],["Email","email","email"],["Location","location","text"],["Total Package (₹)","totalAmount","number"],["Collected (₹)","paid","number"],["Requirements","requirements","text"]].map(([l,k,t])=>(
              <div key={k}><FL>{l}</FL><Inp type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/></div>
            ))}
            <div><FL>Notes</FL><TextA value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></div>
            <div><FL>Tags (comma-separated)</FL><Inp value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} placeholder="Premium, NRI, Referral"/></div>
            <Btn onClick={addClient} style={{marginTop:4}}>Add Client</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 5 — TEAM  (no useState inside loops)
// ─────────────────────────────────────────────────────────────────────────────
const TeamMemberModal = ({m,onClose}) => {
  const [tab,setTab] = useState("profile");
  const [history,setHistory] = useState(m.payrollHistory||[]);
  const [travel,setTravel] = useState(m.travelHistory||[]);
  const [showPayForm,setShowPayForm] = useState(false);
  const [showTripForm,setShowTripForm] = useState(false);
  const pBlank = {month:"",amount:m.salary,paid:false,paycheckFile:""};
  const tBlank = {event:"",destination:"",date:"",expense:""};
  const [pform,setPform] = useState(pBlank);
  const [tform,setTform] = useState(tBlank);

  const addPayEntry = () => { setHistory([...history,{...pform,amount:Number(pform.amount)}]); setShowPayForm(false); setPform(pBlank); };
  const addTrip = () => { setTravel([...travel,{...tform,expense:Number(tform.expense)}]); setShowTripForm(false); setTform(tBlank); };

  const tabs = ["profile","payroll","kyc","travel"];
  return (
    <Modal title={m.name} onClose={onClose} width={680}>
      <div style={{display:"flex",gap:10,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
        <Avatar name={m.name} size={48}/>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:700,color:"var(--ink)",fontFamily:"'Playfair Display',serif"}}>{m.role}</div>
          <div style={{display:"flex",gap:6,marginTop:5,flexWrap:"wrap"}}><Badge label={m.availability}/><Badge label={m.type} color="var(--blue)"/>{m.tier!=="-"&&<Badge label={m.tier} color="var(--brass)"/>}</div>
        </div>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
        {tabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:"6px 13px",borderRadius:8,border:"1px solid",borderColor:tab===t?"var(--brass)":"var(--border)",background:tab===t?"rgba(168,119,58,0.12)":"var(--surface)",color:tab===t?"var(--brass)":"var(--ink3)",fontSize:12,cursor:"pointer",fontWeight:600,textTransform:"capitalize",fontFamily:"inherit"}}>{t}</button>)}
      </div>

      {tab==="profile"&&(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <InfoGrid items={[["Phone",m.phone],["Email",m.email],["Date of Birth",m.dob],["Joined",m.joined],["Address",m.address],["Employment",m.type]]}/>
          <div><SectionTitle>Skills</SectionTitle><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{m.skills.map(s=><span key={s} style={{fontSize:12,padding:"4px 11px",borderRadius:11,background:"rgba(45,95,160,0.08)",color:"var(--blue)",border:"1px solid rgba(45,95,160,0.2)"}}>{s}</span>)}</div></div>
          <div style={{display:"flex",gap:8}}>
            <a href={`tel:${m.phone}`} style={{flex:1,padding:"9px 0",textAlign:"center",background:"rgba(46,125,82,0.08)",border:"1px solid rgba(46,125,82,0.3)",borderRadius:9,color:"var(--green)",textDecoration:"none",fontSize:13,fontWeight:700}}>📞 Call</a>
            <a href={`https://wa.me/${m.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer" style={{flex:1,padding:"9px 0",textAlign:"center",background:"rgba(46,125,82,0.08)",border:"1px solid rgba(46,125,82,0.3)",borderRadius:9,color:"var(--green)",textDecoration:"none",fontSize:13,fontWeight:700}}>💬 WhatsApp</a>
          </div>
        </div>
      )}

      {tab==="payroll"&&(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{background:"var(--bg)",borderRadius:10,padding:"12px 14px",textAlign:"center",border:"1px solid var(--border)"}}>
              <div style={{fontSize:10,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>Monthly CTC</div>
              <div style={{fontSize:22,color:"var(--brass)",fontWeight:800,fontFamily:"'Playfair Display',serif"}}>{m.salary>0?fmt(m.salary):"Founder"}</div>
            </div>
            <div style={{background:"var(--bg)",borderRadius:10,padding:"12px 14px",textAlign:"center",border:"1px solid var(--border)"}}>
              <div style={{fontSize:10,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>Insurance</div>
              <div style={{fontSize:12,color:"var(--ink)",fontWeight:600}}>{m.insurance}</div>
            </div>
          </div>
          <Row>
            <SectionTitle>Payroll History</SectionTitle>
            <button onClick={()=>setShowPayForm(!showPayForm)} style={{padding:"5px 12px",borderRadius:7,border:"1px solid var(--border2)",background:"var(--bg2)",color:"var(--ink3)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:12}}>+ Add Entry</button>
          </Row>
          {showPayForm&&(
            <div style={{background:"var(--bg2)",borderRadius:12,padding:14,border:"1px solid var(--border2)",display:"flex",flexDirection:"column",gap:10,marginBottom:10}}>
              {[["Month (e.g. June 2026)","month","text"],["Amount Paid (₹)","amount","number"]].map(([l,k,t])=>(
                <div key={k}><FL>{l}</FL><Inp type={t} value={pform[k]||""} onChange={e=>setPform({...pform,[k]:e.target.value})}/></div>
              ))}
              <div><FL>Status</FL><Sel value={pform.paid?"paid":"pending"} onChange={e=>setPform({...pform,paid:e.target.value==="paid"})}><option value="paid">Paid</option><option value="pending">Pending</option></Sel></div>
              <div>
                <FL>Upload Payslip</FL>
                <div style={{background:"var(--surface)",border:"1px dashed var(--border2)",borderRadius:8,padding:"11px",textAlign:"center"}}>
                  <input type="file" accept=".pdf,.jpg,.png" id={`pay-${m.id}`} style={{display:"none"}} onChange={e=>setPform({...pform,paycheckFile:e.target.files[0]?.name||""})}/>
                  <label htmlFor={`pay-${m.id}`} style={{cursor:"pointer",fontSize:12,color:"var(--ink3)"}}>{pform.paycheckFile?`📄 ${pform.paycheckFile}`:"📎 Attach payslip"}</label>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}><Btn onClick={addPayEntry} style={{flex:1}}>Save Entry</Btn><Btn onClick={()=>setShowPayForm(false)} variant="ghost" style={{flex:1}}>Cancel</Btn></div>
            </div>
          )}
          {history.length===0?<div style={{color:"var(--ink3)",fontSize:13}}>No payroll history recorded.</div>:(
            history.map((p,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 13px",background:"var(--surface)",borderRadius:9,border:"1px solid var(--border)",marginBottom:5}}>
                <span style={{fontSize:13,color:"var(--ink)"}}>{p.month}</span>
                <span style={{fontSize:13,color:"var(--brass)",fontWeight:700}}>{fmt(p.amount)}</span>
                <Badge label={p.paid?"Paid":"Pending"}/>
                {p.paycheckFile&&<span style={{fontSize:11,color:"var(--blue)"}}>📄 {p.paycheckFile}</span>}
              </div>
            ))
          )}
        </div>
      )}

      {tab==="kyc"&&<InfoGrid items={[["Aadhar",m.aadhar],["PAN",m.pan],["Insurance",m.insurance],["Employment",m.type],["Date of Joining",m.joined],["Date of Birth",m.dob]]}/>}

      {tab==="travel"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <Row>
            <div style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>Travel History</div>
            <button onClick={()=>setShowTripForm(!showTripForm)} style={{padding:"5px 12px",borderRadius:7,border:"1px solid var(--border2)",background:"var(--bg2)",color:"var(--ink3)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Add Trip</button>
          </Row>
          {showTripForm&&(
            <div style={{background:"var(--bg2)",borderRadius:12,padding:14,border:"1px solid var(--border2)",display:"flex",flexDirection:"column",gap:10}}>
              {[["Event / Project","event","text"],["Destination","destination","text"],["Date","date","date"],["Expense (₹)","expense","number"]].map(([l,k,t])=>(
                <div key={k}><FL>{l}</FL><Inp type={t} value={tform[k]||""} onChange={e=>setTform({...tform,[k]:e.target.value})}/></div>
              ))}
              <div style={{display:"flex",gap:8}}><Btn onClick={addTrip} style={{flex:1}}>Save Trip</Btn><Btn onClick={()=>setShowTripForm(false)} variant="ghost" style={{flex:1}}>Cancel</Btn></div>
            </div>
          )}
          {travel.length===0?<div style={{color:"var(--ink3)",fontSize:13,padding:"18px 0",textAlign:"center"}}>No travel history recorded.</div>:(
            travel.map((t,i)=>(
              <div key={i} style={{padding:"11px 14px",background:"var(--bg)",borderRadius:10,border:"1px solid var(--border)"}}>
                <div style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>{t.event}</div>
                <div style={{display:"flex",gap:16,marginTop:4,flexWrap:"wrap"}}>
                  <span style={{fontSize:11,color:"var(--ink4)"}}>📍 {t.destination}</span>
                  <span style={{fontSize:11,color:"var(--ink4)"}}>📅 {t.date}</span>
                  <span style={{fontSize:11,color:"var(--brass)",fontWeight:700}}>{fmt(t.expense)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Modal>
  );
};

const Team = () => {
  const [selected,setSelected] = useState(null);
  const groups = [
    {label:"📸 Creatives",roles:["Founder & Lead Photographer","Senior Photographer","Cinematographer","Photographer / 2nd Camera"]},
    {label:"🎬 Post Production",roles:["Video Editor","Photo Editor / Retoucher"]},
    {label:"⚙️ Operations",roles:["Sales & Client Coordinator","Social Media Manager"]},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:22}}>
      <div>
        <div style={{fontSize:22,fontFamily:"'Playfair Display',serif",color:"var(--ink)"}}>Team</div>
        <div style={{fontSize:12,color:"var(--ink4)",marginTop:2}}>{SEED_TEAM.length} members · {SEED_TEAM.filter(m=>m.availability==="Available").length} available · {fmt(SEED_TEAM.filter(m=>m.type==="Full-time").reduce((s,m)=>s+m.salary,0))}/mo payroll</div>
      </div>
      {groups.map(g=>(
        <div key={g.label}>
          <SectionTitle>{g.label}</SectionTitle>
          <div className="team-grid">
            {SEED_TEAM.filter(m=>g.roles.includes(m.role)).map(m=>(
              <div key={m.id} onClick={()=>setSelected(m)} style={{padding:16,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:13,cursor:"pointer",transition:"border-color .15s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="var(--brass-l)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
                <div style={{display:"flex",gap:11,alignItems:"center",marginBottom:11}}>
                  <Avatar name={m.name} size={40}/>
                  <div><div style={{fontSize:13,fontWeight:700,color:"var(--ink)"}}>{m.name}</div><div style={{fontSize:11,color:"var(--ink4)"}}>{m.role}</div></div>
                  <div style={{marginLeft:"auto"}}><Badge label={m.availability}/></div>
                </div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:9}}>
                  {m.skills.slice(0,3).map(s=><span key={s} style={{fontSize:10,padding:"2px 7px",borderRadius:9,background:"rgba(45,95,160,0.08)",color:"var(--blue)",border:"1px solid rgba(45,95,160,0.2)"}}>{s}</span>)}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11}}>
                  <span style={{color:"var(--ink4)"}}>Events/mo: <span style={{color:"var(--ink)",fontWeight:700}}>{m.eventsThisMonth}</span></span>
                  {m.salary>0?<span style={{color:"var(--brass)",fontWeight:700}}>{fmt(m.salary)}/mo</span>:<span style={{color:"var(--brass)",fontWeight:700}}>Founder</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {selected&&<TeamMemberModal m={selected} onClose={()=>setSelected(null)}/>}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 6 — FINANCE  (no useState inside loops)
// ─────────────────────────────────────────────────────────────────────────────
const PayrollRow = ({emp,onEdit,onSalaryChange}) => {
  const [editing,setEditing] = useState(false);
  const [draft,setDraft] = useState(String(emp.salary));
  const save = () => { onSalaryChange(emp.id,Number(draft)); setEditing(false); };
  return (
    <div style={{display:"grid",gridTemplateColumns:"2fr 1.2fr 1.2fr 1fr 1fr",gap:12,padding:"13px 14px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:11,alignItems:"center",marginBottom:6}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><Avatar name={emp.name} size={30}/><span style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>{emp.name}</span></div>
      <div style={{fontSize:11,color:"var(--ink3)"}}>{emp.role.split("/")[0].trim()}</div>
      <div>
        {editing?(
          <div style={{display:"flex",gap:5,alignItems:"center"}}>
            <input value={draft} onChange={e=>setDraft(e.target.value)} style={{width:85,...IS,padding:"4px 8px",fontSize:12}}/>
            <button onClick={save} style={{padding:"3px 8px",borderRadius:6,border:"1px solid var(--border2)",background:"var(--bg2)",cursor:"pointer",fontSize:11,fontFamily:"inherit",color:"var(--green)"}}>✓</button>
            <button onClick={()=>setEditing(false)} style={{padding:"3px 8px",borderRadius:6,border:"1px solid var(--border2)",background:"var(--bg2)",cursor:"pointer",fontSize:11,fontFamily:"inherit",color:"var(--ink3)"}}>✕</button>
          </div>
        ):(
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:14,color:"var(--brass)",fontWeight:800}}>{fmt(emp.salary)}</span>
            <button onClick={()=>{setDraft(String(emp.salary));setEditing(true);}} style={{padding:"2px 7px",borderRadius:6,border:"1px solid var(--border2)",background:"var(--bg2)",cursor:"pointer",fontSize:10,fontFamily:"inherit",color:"var(--ink3)"}}>✏️</button>
          </div>
        )}
      </div>
      <Badge label={emp.paid?"Paid":"Pending"}/>
      <ActBtn onClick={()=>onEdit(emp)}>+ Entry</ActBtn>
    </div>
  );
};

const Finance = ({clients,projects,activeBrand}) => {
  const brandClients = activeBrand==="all"?clients:clients.filter(c=>c.brand===activeBrand);
  const brandProjects = activeBrand==="all"?projects:projects.filter(p=>p.brand===activeBrand);
  const [tab,setTab] = useState("backlog");
  const [expenses,setExpenses] = useState(SEED_EXPENSES);
  const [freelancers,setFreelancers] = useState(SEED_FREELANCERS);
  const [payroll,setPayroll] = useState(SEED_TEAM.filter(m=>m.type==="Full-time").map(m=>({id:m.id,name:m.name,role:m.role,salary:m.salary,paid:true})));

  const [showExpForm,setShowExpForm] = useState(false);
  const [editExp,setEditExp] = useState(null);
  const [showFrForm,setShowFrForm] = useState(false);
  const [editFr,setEditFr] = useState(null);
  const [showPayEntry,setShowPayEntry] = useState(false);
  const [payEntryTarget,setPayEntryTarget] = useState(null);

  const eBlank = {category:"Travel",description:"",amount:"",date:"",paidTo:"",addedBy:""};
  const fBlank = {name:"",role:"",phone:"",email:"",ratePerEvent:"",pan:""};
  const pBlank = {month:"",amount:"",paid:false,paycheckFile:""};
  const [eform,setEform] = useState(eBlank);
  const [fform,setFform] = useState(fBlank);
  const [pform,setPform] = useState(pBlank);

  const albumItems = brandProjects.filter(p=>p.albumBacklog).map(p=>({client:p.client,amount:p.albumBacklogAmount}));
  const totalBacklog = albumItems.reduce((s,b)=>s+(b.amount||0),0);
  const totalPayroll = payroll.reduce((s,p)=>s+p.salary,0);
  const totalExp = expenses.reduce((s,e)=>s+Number(e.amount),0);
  const clientRev = brandClients.reduce((s,c)=>s+c.paid,0);
  const clientPend = clients.reduce((s,c)=>s+(c.totalAmount-c.paid),0);
  const frPending = freelancers.reduce((s,f)=>s+f.pending,0);
  const expCats = expenses.reduce((a,e)=>{a[e.category]=(a[e.category]||0)+Number(e.amount);return a},{});

  const saveExp = () => {
    const item = {...eform,id:editExp?editExp.id:uid(),amount:Number(eform.amount)};
    setExpenses(editExp?expenses.map(e=>e.id===editExp.id?item:e):[...expenses,item]);
    setShowExpForm(false); setEditExp(null); setEform(eBlank);
  };
  const saveFr = () => {
    const item = {...fform,id:editFr?editFr.id:uid(),ratePerEvent:Number(fform.ratePerEvent),eventsWorked:[],totalPaid:0,pending:0};
    setFreelancers(editFr?freelancers.map(f=>f.id===editFr.id?{...f,...fform,ratePerEvent:Number(fform.ratePerEvent)}:f):[...freelancers,item]);
    setShowFrForm(false); setEditFr(null); setFform(fBlank);
  };
  const savePayEntry = () => {
    // just stores against the payroll row locally
    setShowPayEntry(false); setPayEntryTarget(null); setPform(pBlank);
  };
  const changeSalary = (id,val) => setPayroll(payroll.map(p=>p.id===id?{...p,salary:val}:p));

  const finTabs = [
    {id:"backlog",label:"Album Backlog",badge:fmt(totalBacklog)},
    {id:"payroll",label:"Payroll",badge:fmt(totalPayroll)},
    {id:"expenses",label:"Expenses",badge:fmt(totalExp)},
    {id:"freelancers",label:"Freelancers",badge:frPending>0?fmt(frPending)+" due":"Clear"},
    {id:"revenue",label:"Client Revenue",badge:fmt(clientRev)},
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <div>
        <div style={{fontSize:22,fontFamily:"'Playfair Display',serif",color:"var(--ink)"}}>Finance</div>
        <div style={{fontSize:12,color:"var(--ink4)",marginTop:2}}>Synced with clients and projects</div>
      </div>
      <div className="stat-grid-4">
        <StatCard icon="💰" label="Client Revenue" value={fmt(clientRev)} sub="collected"/>
        <StatCard icon="⏳" label="Client Pending" value={fmt(clientPend)} accent="var(--red)"/>
        <StatCard icon="📦" label="Album Backlog" value={fmt(totalBacklog)} accent="var(--amber)"/>
        <StatCard icon="💸" label="Total Expenses" value={fmt(totalExp)} accent="var(--blue)"/>
      </div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        {finTabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 14px",borderRadius:9,border:"1px solid",borderColor:tab===t.id?"var(--brass)":"var(--border)",background:tab===t.id?"rgba(168,119,58,0.12)":"var(--surface)",color:tab===t.id?"var(--brass)":"var(--ink3)",fontSize:12,cursor:"pointer",fontWeight:600,fontFamily:"inherit",display:"flex",gap:7,alignItems:"center"}}>
            {t.label}<span style={{fontSize:10,background:"var(--bg3)",padding:"2px 6px",borderRadius:5,color:"var(--ink3)"}}>{t.badge}</span>
          </button>
        ))}
      </div>

      {tab==="backlog"&&(
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          <Card style={{borderColor:"rgba(192,57,43,0.2)",background:"rgba(192,57,43,0.04)"}}>
            <div style={{fontSize:13,color:"var(--red)",fontWeight:700,marginBottom:4}}>Revenue Recovery Priority</div>
            <div style={{fontSize:12,color:"var(--ink3)"}}>{albumItems.length} albums with design complete — {fmt(totalBacklog)} sitting outside your books. Call and collect.</div>
          </Card>
          {albumItems.map((b,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr",gap:12,padding:"13px 14px",background:"rgba(192,57,43,0.04)",border:"1px solid rgba(192,57,43,0.2)",borderRadius:11,alignItems:"center"}}>
              <div style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>{b.client}</div>
              <div style={{fontSize:14,color:"var(--red)",fontWeight:800}}>{fmt(b.amount)}</div>
              <Badge label="Design Complete" color="var(--green)"/>
              <Btn variant="gold" style={{padding:"6px 12px",fontSize:11}}>📞 Call Now</Btn>
            </div>
          ))}
          {albumItems.length===0&&<div style={{color:"var(--ink4)",fontSize:13,padding:"20px",textAlign:"center"}}>No album backlog. All clear! ✓</div>}
        </div>
      )}

      {tab==="payroll"&&(
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1.2fr 1.2fr 1fr 1fr",gap:12,padding:"6px 14px",fontSize:10,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>
            <span>Employee</span><span>Role</span><span>Monthly CTC</span><span>Status</span><span>Actions</span>
          </div>
          {payroll.map(emp=><PayrollRow key={emp.id} emp={emp} onEdit={e=>{setPayEntryTarget(e);setPform(pBlank);setShowPayEntry(true);}} onSalaryChange={changeSalary}/>)}
          <div style={{padding:"13px 14px",background:"rgba(168,119,58,0.06)",border:"1px solid rgba(168,119,58,0.2)",borderRadius:11,display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
            <span style={{fontSize:13,color:"var(--brass)",fontWeight:700}}>Total Monthly Payroll</span>
            <span style={{fontSize:20,color:"var(--brass)",fontWeight:800,fontFamily:"'Playfair Display',serif"}}>{fmt(totalPayroll)}</span>
          </div>
        </div>
      )}

      {tab==="expenses"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <Row style={{flexWrap:"wrap",gap:8}}>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{Object.entries(expCats).map(([cat,amt])=><span key={cat} style={{fontSize:11,padding:"4px 10px",background:"var(--bg2)",borderRadius:8,color:"var(--ink3)",border:"1px solid var(--border)"}}>{cat}: <span style={{color:"var(--brass)",fontWeight:700}}>{fmt(amt)}</span></span>)}</div>
            <Btn onClick={()=>{setEform(eBlank);setEditExp(null);setShowExpForm(true);}}>+ Add Expense</Btn>
          </Row>
          <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 0.8fr 0.7fr 0.7fr",gap:12,padding:"6px 14px",fontSize:10,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"}}>
            <span>Description</span><span>Category</span><span>Amount</span><span>Date</span><span>By</span><span>Actions</span>
          </div>
          {expenses.map(e=>(
            <div key={e.id} style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 0.8fr 0.7fr 0.7fr",gap:12,padding:"13px 14px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:11,alignItems:"center",marginBottom:4}}>
              <div><div style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>{e.description}</div><div style={{fontSize:11,color:"var(--ink3)"}}>{e.paidTo}</div></div>
              <span style={{fontSize:11,padding:"3px 8px",borderRadius:7,background:"rgba(45,95,160,0.08)",color:"var(--blue)",border:"1px solid rgba(45,95,160,0.2)",height:"fit-content"}}>{e.category}</span>
              <div style={{fontSize:13,color:"var(--ink)",fontWeight:700}}>{fmt(e.amount)}</div>
              <div style={{fontSize:11,color:"var(--ink4)"}}>{e.date}</div>
              <div style={{fontSize:12,color:"var(--ink3)"}}>{e.addedBy}</div>
              <div style={{display:"flex",gap:4}}><ActBtn onClick={()=>{setEform({...e});setEditExp(e);setShowExpForm(true);}}>✏️</ActBtn><DelBtn onClick={()=>setExpenses(expenses.filter(x=>x.id!==e.id))}/></div>
            </div>
          ))}
          <div style={{padding:"13px 14px",background:"var(--bg)",borderRadius:11,display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border)"}}>
            <span style={{fontSize:13,color:"var(--ink3)"}}>Total Expenses</span><span style={{fontSize:18,color:"var(--ink)",fontWeight:800}}>{fmt(totalExp)}</span>
          </div>
        </div>
      )}

      {tab==="freelancers"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"flex",justifyContent:"flex-end"}}><Btn onClick={()=>{setFform(fBlank);setEditFr(null);setShowFrForm(true);}}>+ Add Freelancer</Btn></div>
          <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr 1fr 0.7fr",gap:12,padding:"6px 14px",fontSize:10,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"}}>
            <span>Name</span><span>Role</span><span>Rate/Event</span><span>Total Paid</span><span>Pending</span><span>Actions</span>
          </div>
          {freelancers.map(f=>(
            <div key={f.id} style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr 1fr 0.7fr",gap:12,padding:"13px 14px",background:f.pending>0?"rgba(192,57,43,0.04)":"var(--surface)",border:`1px solid ${f.pending>0?"rgba(192,57,43,0.18)":"var(--border)"}`,borderRadius:11,alignItems:"center",marginBottom:4}}>
              <div><div style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>{f.name}</div><div style={{fontSize:11,color:"var(--ink3)"}}>{f.phone}</div></div>
              <div style={{fontSize:11,color:"var(--ink3)"}}>{f.role}</div>
              <div style={{fontSize:13,color:"var(--brass)",fontWeight:700}}>{fmt(f.ratePerEvent)}</div>
              <div style={{fontSize:13,color:"var(--green)",fontWeight:600}}>{fmt(f.totalPaid)}</div>
              <div style={{fontSize:13,color:f.pending>0?"var(--red)":"var(--green)",fontWeight:700}}>{f.pending>0?fmt(f.pending):"—"}</div>
              <div style={{display:"flex",gap:4}}>
                <ActBtn onClick={()=>{setFform({name:f.name,role:f.role,phone:f.phone,email:f.email,ratePerEvent:f.ratePerEvent,pan:f.pan});setEditFr(f);setShowFrForm(true);}}>✏️</ActBtn>
                <DelBtn onClick={()=>setFreelancers(freelancers.filter(x=>x.id!==f.id))}/>
              </div>
            </div>
          ))}
          <div style={{padding:"13px 14px",background:"rgba(192,57,43,0.05)",border:"1px solid rgba(192,57,43,0.15)",borderRadius:11,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:13,color:"var(--red)",fontWeight:600}}>Total Pending (Freelancers)</span>
            <span style={{fontSize:18,color:"var(--red)",fontWeight:800}}>{fmt(frPending)}</span>
          </div>
        </div>
      )}

      {tab==="revenue"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:12,padding:"6px 14px",fontSize:10,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"}}>
            <span>Client</span><span>Total</span><span>Collected</span><span>Balance</span>
          </div>
          {brandClients.map(c=>{const b=c.totalAmount-c.paid;return(
            <div key={c.id} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:12,padding:"13px 14px",background:b>0?"rgba(192,57,43,0.04)":"var(--surface)",border:`1px solid ${b>0?"rgba(192,57,43,0.18)":"var(--border)"}`,borderRadius:11,alignItems:"center",marginBottom:4}}>
              <div style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>{c.name}</div>
              <div style={{fontSize:13,color:"var(--brass)",fontWeight:700}}>{fmt(c.totalAmount)}</div>
              <div style={{fontSize:13,color:"var(--green)",fontWeight:600}}>{fmt(c.paid)}</div>
              <div style={{fontSize:13,color:b>0?"var(--red)":"var(--green)",fontWeight:700}}>{b>0?fmt(b):"Paid ✓"}</div>
            </div>
          );})}
          <div style={{padding:"13px 14px",background:"rgba(168,119,58,0.06)",border:"1px solid rgba(168,119,58,0.18)",borderRadius:11}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:13,color:"var(--brass)",fontWeight:600}}>Total Collected</span><span style={{fontSize:16,color:"var(--green)",fontWeight:800}}>{fmt(clientRev)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13,color:"var(--ink3)",fontWeight:600}}>Total Pending</span><span style={{fontSize:16,color:"var(--red)",fontWeight:800}}>{fmt(clientPend)}</span></div>
          </div>
        </div>
      )}

      {showExpForm&&(
        <Modal title={editExp?"Edit Expense":"Add Expense"} onClose={()=>{setShowExpForm(false);setEditExp(null);}}>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            <div><FL>Category</FL><Sel value={eform.category} onChange={e=>setEform({...eform,category:e.target.value})}>{["Travel","Office","Marketing","Equipment","Software","Storage","Misc"].map(o=><option key={o}>{o}</option>)}</Sel></div>
            {[["Description","description","text"],["Amount (₹)","amount","number"],["Date","date","date"],["Paid To","paidTo","text"],["Added By","addedBy","text"]].map(([l,k,t])=>(
              <div key={k}><FL>{l}</FL><Inp type={t} value={eform[k]||""} onChange={e=>setEform({...eform,[k]:e.target.value})}/></div>
            ))}
            <Btn onClick={saveExp} style={{marginTop:4}}>{editExp?"Save Changes":"Add Expense"}</Btn>
          </div>
        </Modal>
      )}
      {showFrForm&&(
        <Modal title={editFr?"Edit Freelancer":"Add Freelancer"} onClose={()=>{setShowFrForm(false);setEditFr(null);}}>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {[["Name","name","text"],["Role","role","text"],["Phone","phone","text"],["Email","email","email"],["Rate per Event (₹)","ratePerEvent","number"],["PAN","pan","text"]].map(([l,k,t])=>(
              <div key={k}><FL>{l}</FL><Inp type={t} value={fform[k]||""} onChange={e=>setFform({...fform,[k]:e.target.value})}/></div>
            ))}
            <Btn onClick={saveFr} style={{marginTop:4}}>{editFr?"Save Changes":"Add Freelancer"}</Btn>
          </div>
        </Modal>
      )}
      {showPayEntry&&payEntryTarget&&(
        <Modal title={`Payroll Entry — ${payEntryTarget.name}`} onClose={()=>{setShowPayEntry(false);setPayEntryTarget(null);}}>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            <div style={{background:"var(--bg)",borderRadius:10,padding:"10px 14px",border:"1px solid var(--border)"}}><div style={{fontSize:11,color:"var(--ink4)",marginBottom:3}}>Monthly CTC</div><div style={{fontSize:18,color:"var(--brass)",fontWeight:800}}>{fmt(payEntryTarget.salary)}</div></div>
            {[["Month (e.g. June 2026)","month","text"],["Amount Paid (₹)","amount","number"]].map(([l,k,t])=>(
              <div key={k}><FL>{l}</FL><Inp type={t} value={pform[k]||""} onChange={e=>setPform({...pform,[k]:e.target.value})}/></div>
            ))}
            <div><FL>Status</FL><Sel value={pform.paid?"paid":"pending"} onChange={e=>setPform({...pform,paid:e.target.value==="paid"})}><option value="paid">Paid</option><option value="pending">Pending</option></Sel></div>
            <div>
              <FL>Upload Payslip</FL>
              <div style={{background:"var(--bg2)",border:"1px dashed var(--border2)",borderRadius:8,padding:"12px",textAlign:"center"}}>
                <input type="file" accept=".pdf,.jpg,.png" id="fin-pay-upload" style={{display:"none"}} onChange={e=>setPform({...pform,paycheckFile:e.target.files[0]?.name||""})}/>
                <label htmlFor="fin-pay-upload" style={{cursor:"pointer",fontSize:12,color:"var(--ink3)"}}>{pform.paycheckFile?`📄 ${pform.paycheckFile}`:"📎 Attach payslip"}</label>
              </div>
            </div>
            <Btn onClick={savePayEntry} style={{marginTop:4}}>Save Entry</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 7 — INVENTORY  (no useState inside loops)
// ─────────────────────────────────────────────────────────────────────────────
const Inventory = () => {
  const [tab,setTab] = useState("cameras");
  const [inv,setInv] = useState({cameras:[...SEED_INVENTORY.cameras],lenses:[...SEED_INVENTORY.lenses],accessories:[...SEED_INVENTORY.accessories],technology:[...SEED_INVENTORY.technology],machines:[...SEED_INVENTORY.machines]});
  const [selected,setSelected] = useState(null);
  const [showForm,setShowForm] = useState(false);
  const [editItem,setEditItem] = useState(null);
  const [showRepair,setShowRepair] = useState(false);
  const [repairTarget,setRepairTarget] = useState(null);

  const iBlank = {name:"",serial:"",purchaseDate:"",purchasePrice:"",condition:"Good",assignedTo:"",warranty:"",type:"Hardware",invoiceUploaded:false};
  const rBlank = {date:"",issue:"",cost:""};
  const [iform,setIform] = useState(iBlank);
  const [rform,setRform] = useState(rBlank);

  const tabs = [{id:"cameras",label:"Cameras",icon:"📷"},{id:"lenses",label:"Lenses",icon:"🔭"},{id:"accessories",label:"Accessories",icon:"🎚️"},{id:"technology",label:"Technology",icon:"💻"},{id:"machines",label:"Machines",icon:"🖥️"}];
  const totalValue = Object.values(inv).flat().reduce((s,i)=>s+(Number(i.purchasePrice)||0),0);
  const current = inv[tab]||[];
  const condColor = {Excellent:"var(--green)",Good:"var(--amber)",Fair:"var(--red)"};

  const saveItem = () => {
    const item = {...iform,id:editItem?editItem.id:uid(),purchasePrice:Number(iform.purchasePrice),repairs:editItem?.repairs||[]};
    const updated = editItem?inv[tab].map(i=>i.id===editItem.id?item:i):[...inv[tab],item];
    setInv({...inv,[tab]:updated});
    if(selected?.id===editItem?.id) setSelected(item);
    setShowForm(false); setEditItem(null); setIform(iBlank);
  };
  const deleteItem = id => {
    setInv({...inv,[tab]:inv[tab].filter(i=>i.id!==id)});
    if(selected?.id===id) setSelected(null);
  };
  const openEdit = item => { setIform({name:item.name,serial:item.serial||"",purchaseDate:item.purchaseDate||"",purchasePrice:item.purchasePrice||"",condition:item.condition||"Good",assignedTo:item.assignedTo||"",warranty:item.warranty||item.renewalDate||"",type:item.type||"Hardware",invoiceUploaded:item.invoiceUploaded||false}); setEditItem(item); setShowForm(true); };
  const addRepair = () => {
    const updated = inv[tab].map(i=>i.id===repairTarget.id?{...i,repairs:[...(i.repairs||[]),{...rform,cost:Number(rform.cost)}]}:i);
    setInv({...inv,[tab]:updated});
    const upd = updated.find(i=>i.id===repairTarget.id);
    if(selected?.id===repairTarget.id) setSelected(upd);
    setShowRepair(false); setRepairTarget(null); setRform(rBlank);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <Row>
        <div>
          <div style={{fontSize:22,fontFamily:"'Playfair Display',serif",color:"var(--ink)"}}>Inventory</div>
          <div style={{fontSize:12,color:"var(--ink4)",marginTop:2}}>Total asset value: {fmt(totalValue)}</div>
        </div>
        <Btn onClick={()=>{setIform(iBlank);setEditItem(null);setShowForm(true);}}>+ Add Item</Btn>
      </Row>
      <div className="inv-tab-grid">
        {tabs.map(t=>(
          <div key={t.id} onClick={()=>setTab(t.id)} style={{cursor:"pointer",borderRadius:14,padding:"14px 16px",textAlign:"center",background:tab===t.id?"rgba(168,119,58,0.09)":"var(--surface)",border:`1px solid ${tab===t.id?"var(--brass)":"var(--border)"}`,transition:"border-color .15s,background .15s"}}
            onMouseEnter={e=>{if(tab!==t.id){e.currentTarget.style.borderColor="var(--brass-l)";e.currentTarget.style.background="rgba(168,119,58,0.04)";}}}
            onMouseLeave={e=>{if(tab!==t.id){e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--surface)";}}}
          >
            <div style={{fontSize:20,marginBottom:6}}>{t.icon}</div>
            <div style={{fontSize:20,fontWeight:800,color:tab===t.id?"var(--brass)":"var(--ink)",fontFamily:"'Playfair Display',serif",marginBottom:4}}>{(inv[t.id]||[]).length}</div>
            <div style={{fontSize:11,color:tab===t.id?"var(--brass-d)":"var(--ink4)",fontWeight:600}}>{t.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"20px 2fr 1.2fr 1fr 1fr 1fr 0.8fr",gap:12,padding:"6px 14px",fontSize:10,color:"var(--ink3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"}}>
        <span/><span>Item</span><span>Serial</span><span>Assigned</span><span>Value</span><span>{tab==="technology"?"Type":"Condition"}</span><span>Actions</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {current.length===0&&<div style={{padding:"24px",textAlign:"center",color:"var(--ink4)",fontSize:13,background:"var(--bg)",borderRadius:11,border:"1px dashed var(--border2)"}}>No items yet. Click "+ Add Item" to get started.</div>}
        {current.map(item=>(
          <div key={item.id} style={{display:"grid",gridTemplateColumns:"20px 2fr 1.2fr 1fr 1fr 1fr 0.8fr",gap:12,padding:"13px 14px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:11,alignItems:"center",transition:"border-color .15s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor="var(--brass-l)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
            <div onClick={()=>setSelected(item)} style={{width:8,height:8,borderRadius:"50%",background:condColor[item.condition]||SC[item.type]||"var(--blue)",cursor:"pointer"}}/>
            <div onClick={()=>setSelected(item)} style={{cursor:"pointer"}}>
              <div style={{fontSize:13,fontWeight:700,color:"var(--ink)"}}>{item.name}</div>
              {item.purchaseDate&&<div style={{fontSize:11,color:"var(--ink3)"}}>Purchased {item.purchaseDate}</div>}
            </div>
            <div style={{fontSize:11,color:"var(--ink4)",fontFamily:"monospace"}}>{item.serial||"—"}</div>
            <div style={{fontSize:12,color:"var(--ink3)"}}>{item.assignedTo}</div>
            <div style={{fontSize:13,color:"var(--brass)",fontWeight:700}}>{fmt(item.purchasePrice||0)}</div>
            <div>{item.condition&&item.condition!=="—"?<Badge label={item.condition} color={condColor[item.condition]}/>:item.type?<Badge label={item.type}/>:<span/>}</div>
            <div style={{display:"flex",gap:3}}><ActBtn onClick={()=>openEdit(item)}>✏️</ActBtn><DelBtn onClick={()=>deleteItem(item.id)}/></div>
          </div>
        ))}
      </div>
      <div style={{padding:"12px 14px",background:"var(--bg)",borderRadius:11,display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border)"}}>
        <span style={{fontSize:13,color:"var(--ink3)"}}>{tabs.find(t=>t.id===tab)?.label} — Total Value</span>
        <span style={{fontSize:16,color:"var(--brass)",fontWeight:800}}>{fmt(current.reduce((s,i)=>s+(Number(i.purchasePrice)||0),0))}</span>
      </div>

      {selected&&(
        <Modal title={selected.name} onClose={()=>setSelected(null)} width={660}>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {selected.condition&&selected.condition!=="—"&&<Badge label={selected.condition} color={condColor[selected.condition]}/>}
              {selected.type&&<Badge label={selected.type}/>}
              {selected.invoiceUploaded===true&&<Badge label="Invoice ✓" color="var(--green)"/>}
              {selected.invoiceUploaded===false&&<Badge label="No Invoice" color="var(--amber)"/>}
            </div>
            <InfoGrid items={[["Serial Number",selected.serial],["Purchase Date",selected.purchaseDate],["Purchase Price",fmt(selected.purchasePrice||0)],["Assigned To",selected.assignedTo],["Warranty / Renewal",selected.warranty||"—"],["Type",selected.type||"Hardware"]]}/>
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <SectionTitle>Repair History</SectionTitle>
                <button onClick={()=>{setRepairTarget(selected);setRform(rBlank);setShowRepair(true);}} style={{padding:"5px 12px",borderRadius:7,border:"1px solid var(--border2)",background:"var(--bg2)",color:"var(--ink3)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:12}}>+ Add Repair</button>
              </div>
              {(!selected.repairs||selected.repairs.length===0)&&<div style={{color:"var(--ink4)",fontSize:13}}>No repairs recorded.</div>}
              {(selected.repairs||[]).map((r,i)=>(
                <div key={i} style={{padding:"9px 13px",background:"var(--bg)",borderRadius:9,border:"1px solid var(--border)",marginBottom:6}}>
                  <div style={{fontSize:13,color:"var(--ink)",fontWeight:600}}>{r.issue}</div>
                  <div style={{display:"flex",gap:14,marginTop:4}}><span style={{fontSize:11,color:"var(--ink4)"}}>📅 {r.date}</span><span style={{fontSize:11,color:"var(--red)",fontWeight:700}}>{fmt(r.cost)}</span></div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:8,paddingTop:4,borderTop:"1px solid var(--border)"}}>
              <Btn onClick={()=>{openEdit(selected);setSelected(null);}} variant="ghost" style={{flex:1}}>✏️ Edit Item</Btn>
              <Btn onClick={()=>deleteItem(selected.id)} variant="danger" style={{flex:1}}>🗑 Delete</Btn>
            </div>
          </div>
        </Modal>
      )}
      {showForm&&(
        <Modal title={editItem?"Edit Item":"Add New Item"} onClose={()=>{setShowForm(false);setEditItem(null);}}>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {[["Item Name","name","text"],["Serial Number","serial","text"],["Purchase Date","purchaseDate","date"],["Purchase Price (₹)","purchasePrice","number"],["Assigned To","assignedTo","text"],["Warranty / Renewal Date","warranty","date"]].map(([l,k,t])=>(
              <div key={k}><FL>{l}</FL><Inp type={t} value={iform[k]||""} onChange={e=>setIform({...iform,[k]:e.target.value})}/></div>
            ))}
            {tab!=="technology"&&<div><FL>Condition</FL><Sel value={iform.condition} onChange={e=>setIform({...iform,condition:e.target.value})}>{["Excellent","Good","Fair"].map(o=><option key={o}>{o}</option>)}</Sel></div>}
            {tab==="technology"&&<div><FL>Type</FL><Sel value={iform.type} onChange={e=>setIform({...iform,type:e.target.value})}>{["Hardware","Subscription","License"].map(o=><option key={o}>{o}</option>)}</Sel></div>}
            <div><FL>Invoice Uploaded</FL><Sel value={iform.invoiceUploaded?"yes":"no"} onChange={e=>setIform({...iform,invoiceUploaded:e.target.value==="yes"})}><option value="yes">Yes</option><option value="no">No</option></Sel></div>
            <div>
              <FL>Attach Invoice File</FL>
              <div style={{background:"var(--bg2)",border:"1px dashed var(--border2)",borderRadius:8,padding:"12px",textAlign:"center"}}>
                <input type="file" accept=".pdf,.jpg,.png" id="inv-file" style={{display:"none"}} onChange={e=>{if(e.target.files[0])setIform({...iform,invoiceUploaded:true});}}/>
                <label htmlFor="inv-file" style={{cursor:"pointer",fontSize:12,color:"var(--ink3)"}}>📎 Attach invoice file</label>
              </div>
            </div>
            <Btn onClick={saveItem} style={{marginTop:4}}>{editItem?"Save Changes":"Add Item"}</Btn>
          </div>
        </Modal>
      )}
      {showRepair&&repairTarget&&(
        <Modal title={`Add Repair — ${repairTarget.name}`} onClose={()=>{setShowRepair(false);setRepairTarget(null);}}>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {[["Issue Description","issue","text"],["Date","date","date"],["Repair Cost (₹)","cost","number"]].map(([l,k,t])=>(
              <div key={k}><FL>{l}</FL><Inp type={t} value={rform[k]||""} onChange={e=>setRform({...rform,[k]:e.target.value})}/></div>
            ))}
            <Btn onClick={addRepair} style={{marginTop:4}}>Add Repair Entry</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTH SYSTEM
// ─────────────────────────────────────────────────────────────────────────────
const USERS = [
  { id:"karan",  name:"Karan Soma",   role:"founder",  pin:"1234", avatar:"KS", color:"var(--brass-d)" },
  { id:"sai",    name:"Sai Krishna",  role:"manager",  pin:"2345", avatar:"SK", color:"var(--blue)" },
  { id:"anuoshka",name:"Anuoshka",    role:"sales",    pin:"3456", avatar:"AN", color:"var(--purple)" },
  { id:"ravi",   name:"Ravi Shankar", role:"team",     pin:"4567", avatar:"RS", color:"var(--green)" },
  { id:"anil",   name:"Anil Varma",   role:"team",     pin:"5678", avatar:"AV", color:"var(--green)" },
  { id:"suresh", name:"Suresh Babu",  role:"team",     pin:"6789", avatar:"SB", color:"var(--green)" },
  { id:"mahesh", name:"Mahesh Kumar", role:"team",     pin:"7890", avatar:"MK", color:"var(--green)" },
  { id:"divya",  name:"Divya Rao",    role:"team",     pin:"8901", avatar:"DR", color:"var(--green)" },
  { id:"pooja",  name:"Pooja Sharma", role:"team",     pin:"9012", avatar:"PS", color:"var(--green)" },
];

// Access map per role
const ACCESS = {
  founder:  ["dashboard","leads","projects","clients","team","finance","inventory","gallery"],
  manager:  ["dashboard","leads","projects","clients","team","finance","inventory","gallery"],
  sales:    ["leads","clients","projects","gallery"],
  team:     ["projects","gallery"],
};

const canWrite = role => role==="founder"||role==="manager";
const canDelete = role => role==="founder";

const LoginScreen = ({onLogin}) => {
  const [step,setStep] = useState("select"); // select | pin
  const [selected,setSelected] = useState(null);
  const [pin,setPin] = useState("");
  const [error,setError] = useState("");

  const attemptLogin = (digit) => {
    const next = pin+digit;
    setPin(next);
    if(next.length===4){
      if(next===selected.pin){ onLogin(selected); }
      else { setError("Wrong PIN. Try again."); setTimeout(()=>{setPin("");setError("");},1000); }
    }
  };

  if(step==="select") return (
    <div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{marginBottom:32,textAlign:"center"}}>
        <div style={{fontSize:11,color:"var(--brass)",fontWeight:800,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:8}}>The Story Box</div>
        <div style={{fontSize:28,fontFamily:"'Playfair Display',serif",color:"var(--ink)",fontWeight:700}}>Who's signing in?</div>
        <div style={{fontSize:13,color:"var(--ink4)",marginTop:6}}>Select your profile to continue</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:480,width:"100%"}}>
        {USERS.map(u=>(
          <button key={u.id} onClick={()=>{setSelected(u);setStep("pin");setPin("");setError("");}} style={{padding:"18px 12px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:10,transition:"border-color .15s",fontFamily:"'DM Sans',sans-serif"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor="var(--brass)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
            <div style={{width:46,height:46,borderRadius:"50%",background:"var(--bg3)",border:`2px solid ${u.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:u.color}}>{u.avatar}</div>
            <div style={{fontSize:12,fontWeight:700,color:"var(--ink)",textAlign:"center",lineHeight:1.3}}>{u.name}</div>
            <div style={{fontSize:10,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.06em"}}>{u.role==="founder"?"Founder":u.role==="manager"?"Manager":u.role==="sales"?"Sales":"Team"}</div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:"var(--surface)",border:"1px solid var(--border2)",borderRadius:20,padding:"36px 32px",maxWidth:340,width:"100%",boxShadow:"0 8px 32px rgba(44,30,15,0.12)"}}>
        <button onClick={()=>{setStep("select");setPin("");setError("");}} style={{background:"none",border:"none",color:"var(--ink4)",fontSize:12,cursor:"pointer",marginBottom:20,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6}}>← Back</button>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:"var(--bg3)",border:`2px solid ${selected.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,color:selected.color,margin:"0 auto 12px"}}>{selected.avatar}</div>
          <div style={{fontSize:16,fontWeight:700,color:"var(--ink)",fontFamily:"'Playfair Display',serif"}}>{selected.name}</div>
          <div style={{fontSize:12,color:"var(--ink4)",marginTop:4}}>Enter 4-digit PIN</div>
        </div>
        {/* PIN dots */}
        <div style={{display:"flex",justifyContent:"center",gap:14,marginBottom:24}}>
          {[0,1,2,3].map(i=>(
            <div key={i} style={{width:14,height:14,borderRadius:"50%",background:pin.length>i?selected.color:"var(--bg3)",border:`1.5px solid ${pin.length>i?selected.color:"var(--border2)"}`,transition:"background .15s"}}/>
          ))}
        </div>
        {error&&<div style={{textAlign:"center",color:"var(--red)",fontSize:12,marginBottom:12,fontWeight:600}}>{error}</div>}
        {/* Numpad */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((d,i)=>(
            <button key={i} onClick={()=>d===""?null:d==="⌫"?setPin(p=>p.slice(0,-1)):attemptLogin(String(d))} style={{padding:"16px 0",borderRadius:10,border:"1px solid var(--border)",background:d===""?"transparent":"var(--bg2)",color:"var(--ink)",fontSize:18,fontWeight:700,cursor:d===""?"default":"pointer",fontFamily:"'DM Sans',sans-serif",opacity:d===""?0:1}}>
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


// ─────────────────────────────────────────────────────────────────────────────
// GALLERY MODULE
// ─────────────────────────────────────────────────────────────────────────────

const COVER_GRADIENTS = [
  "linear-gradient(145deg,#7A5520 0%,#C9A96E 55%,#F2DFB8 100%)",
  "linear-gradient(145deg,#4A2D7A 0%,#9B7FD4 55%,#D9CCEE 100%)",
  "linear-gradient(145deg,#1A5C3A 0%,#4DAA7A 55%,#B2DEC8 100%)",
  "linear-gradient(145deg,#8C2010 0%,#D46858 55%,#F2C4BC 100%)",
  "linear-gradient(145deg,#1A3D6C 0%,#4A80C0 55%,#B8D2EE 100%)",
  "linear-gradient(145deg,#5A3A10 0%,#A87640 55%,#E8C898 100%)",
];

const DEMO_COVERS = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80",
];

const SEED_GALLERIES = [
  { id:1, clientId:1, clientName:"Meghana & Vikram Rao", eventDate:"2026-09-18", location:"Udaipur", coverGradient:0, coverUrl:DEMO_COVERS[0], photos:[{id:1,name:"DSC_0012.jpg",tag:"Bridal",size:"8.2 MB",uploadedBy:"Karan",date:"2026-09-20",aiTags:["bride","portrait","natural-light"]},{id:2,name:"DSC_0034.jpg",tag:"Couple",size:"7.8 MB",uploadedBy:"Ravi",date:"2026-09-20",aiTags:["couple","outdoor","golden-hour"]},{id:3,name:"DSC_0089.jpg",tag:"Ceremony",size:"9.1 MB",uploadedBy:"Karan",date:"2026-09-21",aiTags:["ceremony","mandap","family"]}], videos:[{id:1,title:"Wedding Highlight Film",type:"Film",url:"https://vimeo.com/",duration:"4:32",uploadedBy:"Anil",date:"2026-10-10"},{id:2,title:"Same-Day Edit Reel",type:"Reel",url:"https://vimeo.com/",duration:"1:05",uploadedBy:"Mahesh",date:"2026-09-18"}], sharedLink:"tsb-gallery-mvc-2026", accessCode:"VIKRAM26", totalSize:"2.3 GB" },
  { id:2, clientId:2, clientName:"Kavya & Srinivas Nair", eventDate:"2026-03-12", location:"Vijayawada", coverGradient:1, coverUrl:DEMO_COVERS[1], photos:[{id:1,name:"KS_0001.jpg",tag:"Candid",size:"7.4 MB",uploadedBy:"Ravi",date:"2026-03-15",aiTags:["candid","laugh","joy"]},{id:2,name:"KS_0002.jpg",tag:"Ceremony",size:"8.6 MB",uploadedBy:"Ravi",date:"2026-03-15",aiTags:["ceremony","rituals","traditional"]}], videos:[{id:1,title:"Wedding Film",type:"Film",url:"https://vimeo.com/",duration:"5:10",uploadedBy:"Anil",date:"2026-04-05"}], sharedLink:"tsb-gallery-ksn-2026", accessCode:"KAVYA26", totalSize:"1.1 GB" },
  { id:3, clientId:3, clientName:"Priya & Arjun Reddy", eventDate:"2025-12-08", location:"Hyderabad", coverGradient:2, coverUrl:DEMO_COVERS[2], photos:[{id:1,name:"PA_0001.jpg",tag:"Bridal",size:"9.2 MB",uploadedBy:"Ravi",date:"2025-12-12",aiTags:["bride","jewellery","close-up"]}], videos:[{id:1,title:"Wedding Reel",type:"Reel",url:"https://vimeo.com/",duration:"0:58",uploadedBy:"Mahesh",date:"2025-12-20"}], sharedLink:"tsb-gallery-par-2025", accessCode:"PRIYA25", totalSize:"780 MB" },
];

// ── CLIENT-FACING VIEW (what couples see at their shareable link) ──────────────
const ClientGalleryView = ({g, onClose}) => {
  const [tab, setTab] = useState("photos");
  const gradient = COVER_GRADIENTS[g.coverGradient % COVER_GRADIENTS.length];
  const typeColor = t => t==="Reel"?"rgba(245,158,11,0.9)":t==="SDE"?"rgba(192,57,43,0.9)":"rgba(45,95,160,0.9)";

  return (
    <div style={{position:"fixed",inset:0,zIndex:2000,overflowY:"auto",background:"#0A0806",fontFamily:"'DM Sans',sans-serif"}}>

      {/* HERO */}
      <div style={{position:"relative",height:380,overflow:"hidden"}}>
        {g.coverUrl
          ? <img src={g.coverUrl} alt={g.clientName} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.5)"}} onError={e=>e.target.style.display="none"}/>
          : <div style={{width:"100%",height:"100%",background:gradient}}/>
        }
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(10,8,6,0.25) 0%,rgba(10,8,6,0.05) 35%,rgba(10,8,6,0.88) 100%)"}}/>
        {/* Back */}
        <button onClick={onClose} style={{position:"absolute",top:18,left:18,width:36,height:36,borderRadius:"50%",background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)"}}>←</button>
        {/* Brand */}
        <div style={{position:"absolute",top:20,left:"50%",transform:"translateX(-50%)",textAlign:"center",pointerEvents:"none"}}>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.55)",fontWeight:800,letterSpacing:"0.35em",textTransform:"uppercase"}}>The Story Box</div>
        </div>
        {/* Hero text */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 28px 32px",textAlign:"center"}}>
          <div style={{fontSize:10,color:"rgba(201,169,110,0.8)",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:10,fontWeight:600}}>✦ &nbsp; Your Gallery is Ready &nbsp; ✦</div>
          <div style={{fontSize:36,fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:700,lineHeight:1.1,marginBottom:10,textShadow:"0 4px 24px rgba(0,0,0,0.5)"}}>{g.clientName}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.55)",letterSpacing:"0.04em"}}>📍 {g.location}&ensp;·&ensp;{g.eventDate}</div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        {[[`${g.photos.length}`,"Photographs"],[`${g.videos.length}`,"Films & Reels"],[g.totalSize,"Gallery Size"]].map(([v,l])=>(
          <div key={l} style={{padding:"20px 12px",textAlign:"center",borderRight:"1px solid rgba(255,255,255,0.05)"}}>
            <div style={{fontSize:24,fontFamily:"'Playfair Display',serif",color:"#C9A96E",fontWeight:700,marginBottom:3}}>{v}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:"0.1em"}}>{l}</div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div style={{maxWidth:760,margin:"0 auto",padding:"0 20px"}}>
        <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,0.07)",paddingTop:28,marginBottom:28}}>
          {[["photos",`📷  Photos  (${g.photos.length})`],["videos",`🎬  Films & Reels  (${g.videos.length})`]].map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"10px 22px",background:"none",border:"none",borderBottom:tab===t?"2px solid #C9A96E":"2px solid transparent",color:tab===t?"#C9A96E":"rgba(255,255,255,0.35)",fontSize:13,fontWeight:tab===t?700:400,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.03em",marginBottom:-1,transition:"color .15s"}}>{l}</button>
          ))}
        </div>

        {tab==="photos"&&(
          <>
            {g.photos.length===0
              ? <div style={{textAlign:"center",padding:"56px 20px",color:"rgba(255,255,255,0.25)",fontSize:14}}>Photos will appear here once uploaded.</div>
              : <>
                  {/* Masonry-style thumbnail grid */}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4,borderRadius:14,overflow:"hidden",marginBottom:20}}>
                    {g.photos.map((photo,i)=>(
                      <div key={photo.id} style={{aspectRatio:"1",background:COVER_GRADIENTS[i%COVER_GRADIENTS.length],position:"relative",overflow:"hidden",cursor:"pointer",transition:"filter .2s"}}
                        onMouseEnter={e=>e.currentTarget.style.filter="brightness(0.8)"}
                        onMouseLeave={e=>e.currentTarget.style.filter="brightness(1)"}>
                        <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,opacity:0.5}}>🖼️</div>
                        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"8px 10px",background:"linear-gradient(transparent,rgba(0,0,0,0.6))"}}>
                          <span style={{fontSize:9,color:"rgba(255,255,255,0.75)",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"}}>{photo.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{textAlign:"center",padding:"16px 20px",background:"rgba(201,169,110,0.06)",border:"1px solid rgba(201,169,110,0.15)",borderRadius:12,marginBottom:32}}>
                    <div style={{fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.7}}>All {g.photos.length} full-resolution photographs are available for download.<br/>Please contact us to receive your complete package.</div>
                  </div>
                </>
            }
          </>
        )}

        {tab==="videos"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10,paddingBottom:32}}>
            {g.videos.length===0
              ? <div style={{textAlign:"center",padding:"56px 20px",color:"rgba(255,255,255,0.25)",fontSize:14}}>Your films will appear here once ready.</div>
              : g.videos.map(v=>(
                  <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer" style={{display:"flex",gap:16,padding:"18px 20px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,textDecoration:"none",alignItems:"center",transition:"background .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(201,169,110,0.07)"}
                    onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.03)"}>
                    <div style={{width:54,height:54,borderRadius:12,background:"rgba(192,57,43,0.18)",border:"1px solid rgba(192,57,43,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>▶</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:600,marginBottom:6}}>{v.title}</div>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <span style={{fontSize:10,padding:"2px 9px",borderRadius:10,background:typeColor(v.type),color:"#fff",fontWeight:700}}>{v.type}</span>
                        <span style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>⏱ {v.duration}</span>
                      </div>
                    </div>
                    <div style={{fontSize:12,color:"rgba(201,169,110,0.7)",fontWeight:700,flexShrink:0}}>Watch&nbsp;↗</div>
                  </a>
                ))
            }
          </div>
        )}

        {/* FOOTER */}
        <div style={{paddingTop:32,paddingBottom:48,borderTop:"1px solid rgba(255,255,255,0.05)",textAlign:"center"}}>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.2)",letterSpacing:"0.3em",textTransform:"uppercase",marginBottom:8}}>Crafted with love by</div>
          <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",color:"rgba(201,169,110,0.6)",fontWeight:700,letterSpacing:"0.04em",marginBottom:4}}>The Story Box</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.18)",letterSpacing:"0.1em"}}>Banjara Hills, Hyderabad &nbsp;·&nbsp; thestorybox.in</div>
        </div>
      </div>
    </div>
  );
};

// ── GALLERY MODULE (internal studio view) ─────────────────────────────────────
const Gallery = ({clients, user, activeBrand}) => {
  const brandGalleriesFilter = g => activeBrand==="all"||!g.brand||g.brand===activeBrand;
  const [galleries, setGalleries] = useState(SEED_GALLERIES);
  const [selected, setSelected] = useState(null);
  const [galleryTab, setGalleryTab] = useState("photos");
  const [clientView, setClientView] = useState(null);
  const [search, setSearch] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResults, setAiResults] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({name:"",tag:"Bridal",size:"",uploadedBy:user?.name||"Karan"});
  const [showVideoAdd, setShowVideoAdd] = useState(false);
  const [videoForm, setVideoForm] = useState({title:"",type:"Film",url:"",duration:"",uploadedBy:user?.name||"Karan"});
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [newGalForm, setNewGalForm] = useState({clientName:"",eventDate:"",location:"",clientId:""});
  const [coverEditId, setCoverEditId] = useState(null);
  const [coverUrlDraft, setCoverUrlDraft] = useState("");

  const isWriter = canWrite(user?.role);
  const filtered = galleries.filter(g => g.clientName.toLowerCase().includes(search.toLowerCase()) || g.location.toLowerCase().includes(search.toLowerCase()));
  const totalPhotos = galleries.reduce((s,g)=>s+g.photos.length,0);
  const totalVideos = galleries.reduce((s,g)=>s+g.videos.length,0);
  const tagColors = {Bridal:"var(--purple)",Couple:"var(--blue)",Ceremony:"var(--amber)",Candid:"var(--green)",Detail:"var(--brass)",Family:"var(--blue)",BTS:"var(--ink3)"};

  const runAiSearch = async () => {
    if(!aiQuery.trim()||!selected) return;
    setAiLoading(true); setAiResults([]);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`You are an AI photo recognition assistant for The Story Box wedding photography studio. Given a search query, identify which photos match. Return ONLY a valid JSON array (no markdown). Gallery: ${JSON.stringify(selected.photos)}. Query: "${aiQuery}". Format: [{"id":1,"reason":"..."}]`}]})});
      const d = await r.json();
      setAiResults(JSON.parse((d.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim()));
    } catch(e){ setAiResults([]); }
    setAiLoading(false);
  };

  const updateGalleries = (updated, selId) => {
    setGalleries(updated);
    if(selId) setSelected(updated.find(g=>g.id===selId)||null);
  };

  const addPhoto = () => {
    if(!selected) return;
    const photo = {...uploadForm,id:uid(),date:new Date().toISOString().split("T")[0],aiTags:[]};
    const upd = galleries.map(g=>g.id===selected.id?{...g,photos:[...g.photos,photo]}:g);
    updateGalleries(upd,selected.id);
    setShowUpload(false); setUploadForm({name:"",tag:"Bridal",size:"",uploadedBy:user?.name||"Karan"});
  };
  const deletePhoto = id => { const upd=galleries.map(g=>g.id===selected.id?{...g,photos:g.photos.filter(p=>p.id!==id)}:g); updateGalleries(upd,selected.id); };
  const addVideo = () => {
    if(!selected) return;
    const video = {...videoForm,id:uid(),date:new Date().toISOString().split("T")[0]};
    const upd = galleries.map(g=>g.id===selected.id?{...g,videos:[...g.videos,video]}:g);
    updateGalleries(upd,selected.id);
    setShowVideoAdd(false); setVideoForm({title:"",type:"Film",url:"",duration:"",uploadedBy:user?.name||"Karan"});
  };
  const deleteVideo = id => { const upd=galleries.map(g=>g.id===selected.id?{...g,videos:g.videos.filter(v=>v.id!==id)}:g); updateGalleries(upd,selected.id); };
  const setCover = (galId, url) => {
    const upd = galleries.map(g=>g.id===galId?{...g,coverUrl:url}:g);
    updateGalleries(upd, selected?.id===galId?galId:null);
    if(selected?.id===galId) setSelected(prev=>({...prev,coverUrl:url}));
    setCoverEditId(null); setCoverUrlDraft("");
  };
  const addGallery = () => {
    const idx = galleries.length % COVER_GRADIENTS.length;
    setGalleries([...galleries,{...newGalForm,id:uid(),coverGradient:idx,coverUrl:"",photos:[],videos:[],sharedLink:`tsb-gallery-${Date.now()}`,accessCode:`TSB${Math.floor(1000+Math.random()*9000)}`,totalSize:"0 MB"}]);
    setShowAddGallery(false); setNewGalForm({clientName:"",eventDate:"",location:"",clientId:""});
  };

  // ── DETAIL MODAL ────────────────────────────────────────────────────────────
  const DetailModal = ({g}) => {
    const grad = COVER_GRADIENTS[g.coverGradient%COVER_GRADIENTS.length];
    return (
      <Modal title="" onClose={()=>{setSelected(null);setAiResults([]);setAiQuery("");}} width={800}>
        {/* Banner */}
        <div style={{margin:"-18px -20px 18px",height:190,borderRadius:"16px 16px 0 0",overflow:"hidden",position:"relative"}}>
          {g.coverUrl
            ? <img src={g.coverUrl} alt={g.clientName} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.6)"}} onError={e=>e.target.style.display="none"}/>
            : <div style={{width:"100%",height:"100%",background:grad}}/>
          }
          <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 20%,rgba(44,30,15,0.75) 100%)"}}/>
          <div style={{position:"absolute",bottom:14,left:18,right:18,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
            <div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.55)",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:3}}>The Story Box Gallery</div>
              <div style={{fontSize:20,fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:700}}>{g.clientName}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.55)",marginTop:2}}>📍 {g.location} &nbsp;·&nbsp; {g.eventDate}</div>
            </div>
            {isWriter&&<button onClick={()=>{setCoverEditId(g.id);setCoverUrlDraft(g.coverUrl||"");}} style={{padding:"6px 12px",background:"rgba(0,0,0,0.45)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",backdropFilter:"blur(6px)"}}>🖼 Cover</button>}
          </div>
        </div>

        {/* Cover URL input */}
        {coverEditId===g.id&&(
          <div style={{display:"flex",gap:8,marginBottom:14,padding:"10px 12px",background:"var(--bg2)",borderRadius:10,border:"1px solid var(--border2)"}}>
            <Inp value={coverUrlDraft} onChange={e=>setCoverUrlDraft(e.target.value)} placeholder="Paste image URL (Unsplash, Google Drive, etc.)…" onKeyDown={e=>e.key==="Enter"&&setCover(g.id,coverUrlDraft)}/>
            <Btn onClick={()=>setCover(g.id,coverUrlDraft)} style={{flexShrink:0}}>Set Cover</Btn>
            <Btn onClick={()=>setCoverEditId(null)} variant="ghost" style={{flexShrink:0}}>✕</Btn>
          </div>
        )}

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
          {[["📸",`${g.photos.length} photos`],["🎬",`${g.videos.length} videos`],["💾",g.totalSize]].map(([ic,v])=>(
            <div key={v} style={{background:"var(--bg)",borderRadius:10,padding:"10px 12px",border:"1px solid var(--border)",textAlign:"center"}}>
              <div style={{fontSize:17,marginBottom:4}}>{ic}</div>
              <div style={{fontSize:14,fontWeight:800,color:"var(--ink)",fontFamily:"'Playfair Display',serif"}}>{v}</div>
            </div>
          ))}
        </div>

        {/* Share strip */}
        <div style={{background:"linear-gradient(135deg,rgba(168,119,58,0.1),rgba(168,119,58,0.03))",border:"1px solid rgba(168,119,58,0.25)",borderRadius:12,padding:"12px 16px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:10,color:"var(--brass-d)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>Client Shareable Link</div>
            <div style={{fontSize:11,color:"var(--ink3)",fontFamily:"monospace",marginBottom:2}}>thestorybox.in/gallery/{g.sharedLink}</div>
            <div style={{fontSize:11,color:"var(--ink4)"}}>Access code: <span style={{fontWeight:700,color:"var(--brass)"}}>{g.accessCode}</span></div>
          </div>
          <div style={{display:"flex",gap:7,flexShrink:0}}>
            <button onClick={()=>navigator.clipboard?.writeText(`https://thestorybox.in/gallery/${g.sharedLink}`)} style={{padding:"7px 12px",borderRadius:8,background:"var(--bg2)",border:"1px solid var(--border2)",color:"var(--ink3)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>📋 Copy</button>
            <a href={`https://wa.me/?text=Hi! Your gallery from The Story Box is ready 🎉%0aView: https://thestorybox.in/gallery/${g.sharedLink}%0aCode: ${g.accessCode}`} target="_blank" rel="noopener noreferrer" style={{padding:"7px 12px",borderRadius:8,background:"rgba(46,125,82,0.1)",border:"1px solid rgba(46,125,82,0.3)",color:"var(--green)",textDecoration:"none",fontSize:11,fontWeight:700}}>💬 WhatsApp</a>
            <button onClick={()=>setClientView(g)} style={{padding:"7px 12px",borderRadius:8,background:"rgba(168,119,58,0.1)",border:"1px solid rgba(168,119,58,0.25)",color:"var(--brass-d)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>👁 Preview</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          {[["photos","📷 Photos"],["videos","🎬 Videos"],["ai-search","🤖 AI Search"]].map(([t,l])=>(
            <button key={t} onClick={()=>setGalleryTab(t)} style={{padding:"6px 14px",borderRadius:8,border:"1px solid",borderColor:galleryTab===t?"var(--brass)":"var(--border)",background:galleryTab===t?"rgba(168,119,58,0.12)":"var(--surface)",color:galleryTab===t?"var(--brass)":"var(--ink3)",fontSize:12,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>{l}</button>
          ))}
        </div>

        {/* PHOTOS */}
        {galleryTab==="photos"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {isWriter&&<div style={{display:"flex",justifyContent:"flex-end"}}><button onClick={()=>setShowUpload(v=>!v)} style={{padding:"8px 16px",borderRadius:9,background:"var(--brass)",border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Upload Photos</button></div>}
            {showUpload&&(
              <div style={{background:"var(--bg2)",borderRadius:12,padding:14,border:"1px solid var(--border2)",display:"flex",flexDirection:"column",gap:10}}>
                <div style={{background:"var(--surface)",border:"2px dashed var(--border2)",borderRadius:10,padding:"20px",textAlign:"center",cursor:"pointer"}} onClick={()=>document.getElementById("ph-upload").click()}>
                  <input type="file" id="ph-upload" multiple accept="image/*,.cr2,.nef,.arw" style={{display:"none"}} onChange={e=>{const f=Array.from(e.target.files);if(f.length)setUploadForm(u=>({...u,name:f.map(x=>x.name).join(", "),size:Math.round(f.reduce((s,x)=>s+x.size,0)/1024/1024*10)/10+" MB"}));}}/>
                  <div style={{fontSize:22,marginBottom:6}}>🖼️</div>
                  <div style={{fontSize:12,color:"var(--ink3)",marginBottom:2}}>{uploadForm.name||"Click to select — JPG, PNG, RAW"}</div>
                  <div style={{fontSize:10,color:"var(--ink4)"}}>Multiple files supported</div>
                </div>
                <div><FL>Tag</FL><Sel value={uploadForm.tag} onChange={e=>setUploadForm(u=>({...u,tag:e.target.value}))}>{Object.keys(tagColors).map(t=><option key={t}>{t}</option>)}</Sel></div>
                <div><FL>Uploaded By</FL><Inp value={uploadForm.uploadedBy} onChange={e=>setUploadForm(u=>({...u,uploadedBy:e.target.value}))}/></div>
                <div style={{display:"flex",gap:8}}><Btn onClick={addPhoto} style={{flex:1}}>Add to Gallery</Btn><Btn onClick={()=>setShowUpload(false)} variant="ghost" style={{flex:1}}>Cancel</Btn></div>
              </div>
            )}
            {g.photos.length===0&&<div style={{textAlign:"center",padding:"28px",color:"var(--ink4)",fontSize:13,background:"var(--bg2)",borderRadius:12,border:"1px dashed var(--border2)"}}>No photos yet. Upload to get started.</div>}
            {g.photos.length>0&&(
              <>
                {/* Thumbnail mosaic */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,borderRadius:12,overflow:"hidden",marginBottom:4}}>
                  {g.photos.map((ph,i)=>(
                    <div key={ph.id} style={{aspectRatio:"1",background:COVER_GRADIENTS[i%COVER_GRADIENTS.length],position:"relative",overflow:"hidden",cursor:"pointer",borderRadius:4}}
                      onMouseEnter={e=>{const ov=e.currentTarget.querySelector(".ov"); if(ov)ov.style.opacity="1";}}
                      onMouseLeave={e=>{const ov=e.currentTarget.querySelector(".ov"); if(ov)ov.style.opacity="0";}}>
                      <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,opacity:0.6}}>🖼️</div>
                      <div className="ov" style={{position:"absolute",inset:0,background:"rgba(44,30,15,0.65)",opacity:0,transition:"opacity .18s",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5}}>
                        <span style={{fontSize:10,padding:"2px 8px",background:"rgba(255,255,255,0.15)",borderRadius:10,color:"#fff",fontWeight:700}}>{ph.tag}</span>
                        {isWriter&&<button onClick={e=>{e.stopPropagation();deletePhoto(ph.id);}} style={{fontSize:10,color:"rgba(255,255,255,0.8)",background:"rgba(192,57,43,0.5)",border:"none",borderRadius:8,padding:"2px 8px",cursor:"pointer",fontFamily:"inherit"}}>Remove</button>}
                      </div>
                    </div>
                  ))}
                </div>
                {/* List view */}
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {g.photos.map(ph=>{
                    const match = aiResults.find(r=>r.id===ph.id);
                    return (
                      <div key={ph.id} style={{display:"grid",gridTemplateColumns:"34px 2fr 1fr 1fr 1fr",gap:10,padding:"10px 12px",background:match?"rgba(168,119,58,0.07)":"var(--surface)",border:`1px solid ${match?"var(--brass)":"var(--border)"}`,borderRadius:9,alignItems:"center"}}>
                        <div style={{width:30,height:30,borderRadius:6,background:COVER_GRADIENTS[0],display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🖼️</div>
                        <div>
                          <div style={{fontSize:12,color:"var(--ink)",fontWeight:600}}>{ph.name}</div>
                          {match&&<div style={{fontSize:10,color:"var(--brass)",marginTop:1}}>🤖 {match.reason}</div>}
                          <div style={{display:"flex",gap:4,marginTop:2,flexWrap:"wrap"}}>{ph.aiTags.map(t=><span key={t} style={{fontSize:9,padding:"1px 5px",background:"var(--bg3)",borderRadius:8,color:"var(--ink3)"}}>{t}</span>)}</div>
                        </div>
                        <Badge label={ph.tag} color={tagColors[ph.tag]||"var(--ink3)"}/>
                        <div style={{fontSize:11,color:"var(--ink4)"}}>{ph.size}</div>
                        <div style={{fontSize:11,color:"var(--ink3)"}}>{ph.uploadedBy} · {ph.date}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* VIDEOS */}
        {galleryTab==="videos"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {isWriter&&<div style={{display:"flex",justifyContent:"flex-end"}}><button onClick={()=>setShowVideoAdd(v=>!v)} style={{padding:"8px 16px",borderRadius:9,background:"var(--brass)",border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Add Video</button></div>}
            {showVideoAdd&&(
              <div style={{background:"var(--bg2)",borderRadius:12,padding:14,border:"1px solid var(--border2)",display:"flex",flexDirection:"column",gap:10}}>
                {[["Title","title","text"],["URL (Vimeo / Drive)","url","url"],["Duration (e.g. 4:32)","duration","text"]].map(([l,k,t])=>(<div key={k}><FL>{l}</FL><Inp type={t} value={videoForm[k]||""} onChange={e=>setVideoForm(v=>({...v,[k]:e.target.value}))}/></div>))}
                <div><FL>Type</FL><Sel value={videoForm.type} onChange={e=>setVideoForm(v=>({...v,type:e.target.value}))}>{["Film","Reel","SDE","Teaser","Highlight"].map(o=><option key={o}>{o}</option>)}</Sel></div>
                <div><FL>Uploaded By</FL><Inp value={videoForm.uploadedBy} onChange={e=>setVideoForm(v=>({...v,uploadedBy:e.target.value}))}/></div>
                <div style={{display:"flex",gap:8}}><Btn onClick={addVideo} style={{flex:1}}>Add Video</Btn><Btn onClick={()=>setShowVideoAdd(false)} variant="ghost" style={{flex:1}}>Cancel</Btn></div>
              </div>
            )}
            {g.videos.length===0&&<div style={{textAlign:"center",padding:"28px",color:"var(--ink4)",fontSize:13,background:"var(--bg2)",borderRadius:12,border:"1px dashed var(--border2)"}}>No videos yet.</div>}
            {g.videos.map(v=>(
              <div key={v.id} style={{display:"grid",gridTemplateColumns:"48px 2fr 0.8fr 1fr 1fr 0.6fr",gap:10,padding:"13px 14px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:11,alignItems:"center"}}>
                <div style={{width:44,height:44,borderRadius:10,background:"rgba(192,57,43,0.08)",border:"1px solid rgba(192,57,43,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>▶</div>
                <div><div style={{fontSize:13,color:"var(--ink)",fontWeight:700}}>{v.title}</div><div style={{fontSize:11,color:"var(--ink4)",marginTop:1}}>{v.date}</div></div>
                <Badge label={v.type} color={v.type==="Reel"?"var(--amber)":v.type==="SDE"?"var(--red)":"var(--blue)"}/>
                <div style={{fontSize:12,color:"var(--ink3)"}}>⏱ {v.duration}</div>
                <div style={{fontSize:11,color:"var(--ink3)"}}>{v.uploadedBy}</div>
                <div style={{display:"flex",gap:4}}>
                  {v.url&&<a href={v.url} target="_blank" rel="noopener noreferrer" style={{padding:"5px 9px",borderRadius:7,background:"rgba(45,95,160,0.1)",border:"1px solid rgba(45,95,160,0.25)",color:"var(--blue)",textDecoration:"none",fontSize:10,fontWeight:700}}>↗</a>}
                  {isWriter&&<DelBtn onClick={()=>deleteVideo(v.id)}/>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI SEARCH */}
        {galleryTab==="ai-search"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:"rgba(168,119,58,0.06)",border:"1px solid rgba(168,119,58,0.2)",borderRadius:12,padding:"13px 16px"}}>
              <div style={{fontSize:13,fontWeight:700,color:"var(--brass-d)",marginBottom:4}}>🤖 AI Selfie & Scene Recognition</div>
              <div style={{fontSize:12,color:"var(--ink3)",lineHeight:1.6}}>Describe who or what you're looking for — AI will identify matching photos from metadata and tags.</div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <Inp value={aiQuery} onChange={e=>setAiQuery(e.target.value)} placeholder="e.g. bride getting ready, couple sunset, family mandap…" onKeyDown={e=>e.key==="Enter"&&runAiSearch()}/>
              <Btn onClick={runAiSearch} style={{flexShrink:0,minWidth:100}}>{aiLoading?"Scanning…":"🔍 Search"}</Btn>
            </div>
            {aiLoading&&<div style={{textAlign:"center",padding:"16px",color:"var(--ink3)",fontSize:13}}>Analysing with AI…</div>}
            {aiResults.length>0&&(
              <div>
                <div style={{fontSize:12,color:"var(--green)",fontWeight:700,marginBottom:10}}>✓ {aiResults.length} match{aiResults.length>1?"es":""} found</div>
                {aiResults.map(r=>{
                  const ph=g.photos.find(p=>p.id===r.id); if(!ph) return null;
                  return (
                    <div key={r.id} style={{display:"flex",gap:12,padding:"11px 13px",background:"rgba(168,119,58,0.06)",border:"1px solid rgba(168,119,58,0.25)",borderRadius:10,marginBottom:7,alignItems:"center"}}>
                      <div style={{width:36,height:36,borderRadius:8,background:COVER_GRADIENTS[0],display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🖼️</div>
                      <div style={{flex:1}}><div style={{fontSize:12,color:"var(--ink)",fontWeight:700}}>{ph.name}</div><div style={{fontSize:11,color:"var(--brass)",marginTop:2}}>{r.reason}</div></div>
                      <Badge label={ph.tag} color={tagColors[ph.tag]||"var(--ink3)"}/>
                    </div>
                  );
                })}
              </div>
            )}
            {!aiLoading&&aiResults.length===0&&aiQuery&&<div style={{textAlign:"center",padding:"14px",color:"var(--ink4)",fontSize:13}}>No matches. Try a different description.</div>}
            <div style={{background:"var(--bg2)",borderRadius:10,padding:"11px 13px",border:"1px solid var(--border)"}}>
              <div style={{fontSize:10,color:"var(--ink3)",fontWeight:700,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em"}}>Quick searches</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {["bride laughing","couple golden hour","family group shot","ceremony rituals","candid moments","groom getting ready"].map(s=>(
                  <button key={s} onClick={()=>setAiQuery(s)} style={{padding:"4px 10px",borderRadius:20,border:"1px solid var(--border2)",background:"var(--surface)",color:"var(--ink3)",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  // Show client-facing full-screen view
  if(clientView) return <ClientGalleryView g={clientView} onClose={()=>setClientView(null)}/>;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      {/* HEADER */}
      <div style={{paddingBottom:18,borderBottom:"1px solid var(--border)"}}>
        <div style={{fontSize:10,color:"var(--brass-d)",fontWeight:800,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:6}}>The Story Box</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:28,fontFamily:"'Playfair Display',serif",color:"var(--ink)",fontWeight:700,lineHeight:1}}>Gallery</div>
            <div style={{fontSize:12,color:"var(--ink4)",marginTop:5}}>{galleries.length} client galleries &nbsp;·&nbsp; {totalPhotos} photos &nbsp;·&nbsp; {totalVideos} videos</div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <Inp value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search client or location…" style={{width:200,flex:"none"}}/>
            {isWriter&&<Btn onClick={()=>setShowAddGallery(true)}>+ New Gallery</Btn>}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stat-grid-3">
        <StatCard icon="🖼️" label="Total Photographs" value={totalPhotos} sub={`across ${galleries.length} clients`}/>
        <StatCard icon="🎬" label="Films & Reels" value={totalVideos} sub="delivered" accent="var(--red)"/>
        <StatCard icon="🔗" label="Live Galleries" value={galleries.length} sub="shareable links active" accent="var(--green)"/>
      </div>

      {/* GALLERY CARD GRID */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {filtered.map((g,idx)=>{
          const grad = COVER_GRADIENTS[g.coverGradient%COVER_GRADIENTS.length];
          return (
            <div key={g.id} style={{borderRadius:18,overflow:"hidden",background:"var(--surface)",border:"1px solid var(--border)",boxShadow:"0 2px 12px rgba(44,30,15,0.06)",transition:"transform .18s,box-shadow .18s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(44,30,15,0.15)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 12px rgba(44,30,15,0.06)";}}>

              {/* COVER THUMBNAIL */}
              <div onClick={()=>{setSelected(g);setGalleryTab("photos");setAiResults([]);setAiQuery("");}} style={{position:"relative",height:200,cursor:"pointer",overflow:"hidden"}}>
                {g.coverUrl
                  ? <img src={g.coverUrl} alt={g.clientName} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .3s"}} onMouseEnter={e=>e.target.style.transform="scale(1.04)"} onMouseLeave={e=>e.target.style.transform="scale(1)"} onError={e=>{e.target.style.display="none";}}/>
                  : null
                }
                {/* Gradient fallback or overlay */}
                <div style={{position:"absolute",inset:0,background:g.coverUrl?"linear-gradient(180deg,transparent 35%,rgba(44,30,15,0.82) 100%)":grad,display:"flex",alignItems:"flex-end"}}/>
                {!g.coverUrl&&(
                  <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,opacity:0.6}}>
                    <div style={{fontSize:36}}>📷</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.7)",letterSpacing:"0.12em",textTransform:"uppercase"}}>Add Cover Photo</div>
                  </div>
                )}
                {/* Name overlay */}
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 16px"}}>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.5)",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:2}}>The Story Box</div>
                  <div style={{fontSize:15,fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:700,lineHeight:1.2,textShadow:"0 1px 8px rgba(0,0,0,0.5)"}}>{g.clientName}</div>
                </div>
                {/* Live pill */}
                <div style={{position:"absolute",top:10,right:10,fontSize:9,padding:"3px 9px",background:"rgba(46,125,82,0.88)",borderRadius:20,color:"#fff",fontWeight:700,backdropFilter:"blur(4px)"}}>● Live</div>
                {/* Change cover button on hover */}
                {isWriter&&(
                  <button onClick={e=>{e.stopPropagation();setSelected(g);setGalleryTab("photos");setCoverEditId(g.id);setCoverUrlDraft(g.coverUrl||"");}} style={{position:"absolute",top:10,left:10,padding:"4px 10px",background:"rgba(0,0,0,0.45)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,color:"#fff",fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:"inherit",backdropFilter:"blur(6px)",opacity:0,transition:"opacity .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                    onMouseLeave={e=>e.currentTarget.style.opacity="0"}>🖼 Cover</button>
                )}
              </div>

              {/* CARD BODY */}
              <div style={{padding:"14px 16px 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12,fontSize:11,color:"var(--ink4)"}}>
                  <span>📍 {g.location}</span>
                  <span style={{opacity:0.4}}>·</span>
                  <span>{g.eventDate}</span>
                </div>
                {/* Counts */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:14}}>
                  {[[g.photos.length,"Photos"],[g.videos.length,"Videos"],[g.totalSize,"Size"]].map(([v,l])=>(
                    <div key={l} style={{padding:"7px 8px",background:"var(--bg)",borderRadius:8,border:"1px solid var(--border)",textAlign:"center"}}>
                      <div style={{fontSize:14,fontWeight:800,color:"var(--ink)",fontFamily:"'Playfair Display',serif",lineHeight:1}}>{v}</div>
                      <div style={{fontSize:9,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.07em",marginTop:2}}>{l}</div>
                    </div>
                  ))}
                </div>
                {/* Actions */}
                <div style={{display:"flex",gap:7}}>
                  <button onClick={()=>{setSelected(g);setGalleryTab("photos");setAiResults([]);setAiQuery("");}} style={{flex:1,padding:"9px 0",borderRadius:10,background:"var(--brass)",border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.02em"}}>Open Gallery</button>
                  <button title="Preview client view" onClick={()=>setClientView(g)} style={{width:38,padding:"9px 0",borderRadius:10,background:"var(--bg2)",border:"1px solid var(--border2)",color:"var(--ink3)",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>👁</button>
                  <button title="Copy shareable link" onClick={()=>navigator.clipboard?.writeText(`https://thestorybox.in/gallery/${g.sharedLink}`)} style={{width:38,padding:"9px 0",borderRadius:10,background:"var(--bg2)",border:"1px solid var(--border2)",color:"var(--ink3)",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>🔗</button>
                </div>
              </div>
            </div>
          );
        })}

        {/* ADD CARD */}
        {isWriter&&(
          <div onClick={()=>setShowAddGallery(true)} style={{borderRadius:18,overflow:"hidden",background:"var(--surface)",border:"2px dashed var(--border2)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,minHeight:340,padding:28,transition:"all .18s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--brass-l)";e.currentTarget.style.background="rgba(168,119,58,0.04)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border2)";e.currentTarget.style.background="var(--surface)";}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(168,119,58,0.1)",border:"1.5px solid rgba(168,119,58,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:"var(--brass)"}}>+</div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:14,fontWeight:700,color:"var(--ink3)",marginBottom:4}}>New Gallery</div>
              <div style={{fontSize:11,color:"var(--ink4)"}}>Create a gallery for a new client</div>
            </div>
          </div>
        )}
      </div>

      {filtered.length===0&&search&&(
        <div style={{textAlign:"center",padding:"40px",color:"var(--ink4)",fontSize:13,background:"var(--bg2)",borderRadius:14,border:"1px dashed var(--border2)"}}>No galleries match "{search}".</div>
      )}

      {selected&&<DetailModal g={selected}/>}

      {showAddGallery&&(
        <Modal title="Create New Gallery" onClose={()=>setShowAddGallery(false)}>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {[["Client Name","clientName","text"],["Event Date","eventDate","date"],["Location","location","text"]].map(([l,k,t])=>(<div key={k}><FL>{l}</FL><Inp type={t} value={newGalForm[k]||""} onChange={e=>setNewGalForm(f=>({...f,[k]:e.target.value}))}/></div>))}
            <div><FL>Linked Client (optional)</FL><Sel value={newGalForm.clientId||""} onChange={e=>setNewGalForm(f=>({...f,clientId:e.target.value}))}><option value="">— None —</option>{clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</Sel></div>
            <Btn onClick={addGallery} style={{marginTop:4}}>Create Gallery</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentUser,setCurrentUser] = useState({id:"karan",name:"Karan Soma",role:"founder",avatar:"KS",color:"var(--brass-d)"});
  const [active,setActive] = useState("dashboard");
  const [activeBrand,setActiveBrand] = useState("all"); // "all" | "tsb" | "tsbp" | "oye"
  const [leads,setLeads] = useState(SEED_LEADS);
  const [projects,setProjects] = useState(SEED_PROJECTS);
  const [clients,setClients] = useState(SEED_CLIENTS);
  const [menuOpen,setMenuOpen] = useState(false);

  const allowedModules = ACCESS[currentUser.role]||[];

  const allNav = [
    {id:"dashboard",icon:"◈",label:"Dashboard",mi:"⌂"},
    {id:"leads",icon:"◎",label:"Leads",mi:"◎"},
    {id:"projects",icon:"◐",label:"Projects",mi:"◐"},
    {id:"clients",icon:"◑",label:"Clients",mi:"◑"},
    {id:"team",icon:"◒",label:"Team",mi:"◒"},
    {id:"finance",icon:"◓",label:"Finance",mi:"◓"},
    {id:"inventory",icon:"◔",label:"Inventory",mi:"◔"},
    {id:"gallery",icon:"◕",label:"Gallery",mi:"🖼"},
  ];

  const nav = allNav.filter(n=>allowedModules.includes(n.id));
  const badges = {leads:leads.filter(l=>l.status==="Hot").length,clients:clients.filter(c=>c.totalAmount-c.paid>0).length,projects:projects.filter(p=>p.albumBacklog).length,finance:projects.filter(p=>p.albumBacklog).length};
  const mobileBar = nav.slice(0,4);
  const mobileMore = nav.slice(4);
  const pageTitle = nav.find(n=>n.id===active)?.label||"";
  const roleLabel = {founder:"Founder",manager:"Manager",sales:"Sales",team:"Team Member"}[currentUser.role]||"";
  const roleColor = {founder:"var(--brass)",manager:"var(--blue)",sales:"var(--purple)",team:"var(--green)"}[currentUser.role]||"var(--ink3)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        :root{
          --bg:#F5EFE4;--bg2:#EDE5D6;--bg3:#E4D9C6;
          --surface:#FDFAF5;--border:rgba(139,110,60,0.18);--border2:rgba(139,110,60,0.28);
          --brass:#A8773A;--brass-l:#C9963E;--brass-d:#7A5520;
          --ink:#2C1E0F;--ink2:#5A3E24;--ink3:#8B6840;--ink4:#B09070;
          --red:#C0392B;--green:#2E7D52;--amber:#C07830;--blue:#2D5FA0;--purple:#6B3FA0;
        }
        *{box-sizing:border-box;margin:0;padding:0;}
        html{-webkit-text-size-adjust:100%;}
        body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--ink);-webkit-font-smoothing:antialiased;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(168,119,58,0.35);border-radius:2px;}
        select option{background:#fdf8f0;color:var(--ink);}
        input[type=date]::-webkit-calendar-picker-indicator{opacity:0.5;}
        input::placeholder,textarea::placeholder{color:var(--ink4);}
        .layout{display:flex;height:100vh;overflow:hidden;}
        .sidebar{width:216px;flex-shrink:0;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;padding:20px 0;overflow-y:auto;}
        .main-wrap{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;}
        .main-scroll{flex:1;overflow-y:auto;padding:28px 32px;}
        .mobile-hdr{display:none;}
        .bot-nav{display:none;}
        .more-drawer{display:none;}
        .stat-grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .stat-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
        .chart-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .project-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px;}
        .team-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
        .inv-tab-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;}
        @media(max-width:768px){
          .sidebar{display:none;}
          .main-scroll{padding:14px 14px 92px;}
          .mobile-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px;background:var(--surface);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:50;}
          .bot-nav{display:flex;position:fixed;bottom:0;left:0;right:0;z-index:100;background:var(--surface);border-top:1px solid var(--border);padding:6px 0 max(6px,env(safe-area-inset-bottom));box-shadow:0 -2px 16px rgba(44,30,15,0.08);}
          .more-drawer{position:fixed;bottom:0;left:0;right:0;z-index:200;background:var(--surface);border-top:1px solid var(--border2);border-radius:20px 20px 0 0;padding:12px 0 max(16px,env(safe-area-inset-bottom));box-shadow:0 -8px 40px rgba(44,30,15,0.18);transform:translateY(100%);transition:transform .28s cubic-bezier(.4,0,.2,1);}
          .more-drawer.open{transform:translateY(0);}
          .stat-grid-4,.stat-grid-3{grid-template-columns:repeat(2,1fr);gap:10px;}
          .chart-grid,.project-grid{grid-template-columns:1fr;gap:12px;}
          .team-grid{grid-template-columns:1fr;gap:10px;}
          .inv-tab-grid{grid-template-columns:repeat(3,1fr);gap:8px;}
          button,a{min-height:36px;}
        }
        .desk-hdr{margin-bottom:24px;}
        @media(max-width:768px){.desk-hdr{display:none;}}
      `}</style>

      <div className="layout">
        {/* DESKTOP SIDEBAR */}
        <aside className="sidebar">
          <div style={{padding:"0 18px 20px",borderBottom:"1px solid var(--border)"}}>
            <div style={{fontSize:10,color:"var(--brass)",fontWeight:800,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:3}}>The Story Box</div>
            <div style={{fontSize:9,color:"var(--ink4)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Studio CRM · Est. 2012</div>
            <div style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",background:"var(--bg2)",borderRadius:10,border:"1px solid var(--border)"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"var(--bg3)",border:`1.5px solid ${roleColor}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:roleColor,flexShrink:0}}>{currentUser.avatar}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:11,fontWeight:700,color:"var(--ink)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{currentUser.name}</div>
                <div style={{fontSize:9,color:roleColor,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>{roleLabel}</div>
              </div>
              <button onClick={()=>{}} title="Sign out" style={{background:"none",border:"none",color:"var(--ink4)",fontSize:13,cursor:"pointer",padding:2,lineHeight:1}}>⏏</button>
            </div>
          </div>
          <nav style={{flex:1,padding:"12px 10px",display:"flex",flexDirection:"column",gap:2}}>
            {/* BRAND SWITCHER */}
            <div style={{marginBottom:8,paddingBottom:8,borderBottom:"1px solid var(--border)"}}>
              <div style={{fontSize:9,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6,padding:"0 2px"}}>Brand</div>
              <div style={{display:"flex",flexDirection:"column",gap:3}}>
                {[{id:"all",label:"All Brands",emoji:"◈",color:"var(--ink3)"},...BRAND_LIST.map(b=>({id:b.id,label:b.name,emoji:b.emoji,color:b.color}))].map(b=>(
                  <button key={b.id} onClick={()=>setActiveBrand(b.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,border:"none",cursor:"pointer",background:activeBrand===b.id?`${b.color}18`:"transparent",borderLeft:activeBrand===b.id?`2.5px solid ${b.color}`:"2.5px solid transparent",color:activeBrand===b.id?b.color:"var(--ink4)",fontSize:12,fontWeight:activeBrand===b.id?700:500,textAlign:"left",transition:"all .12s",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                    <span style={{fontSize:13,flexShrink:0}}>{b.emoji}</span>
                    <span style={{overflow:"hidden",textOverflow:"ellipsis"}}>{b.id==="all"?"All Brands":b.id==="tsb"?"The Story Box":b.id==="tsbp"?"TSB Productions":"Oye Baby by TSB"}</span>
                  </button>
                ))}
              </div>
            </div>
            {nav.map(n=>(
              <button key={n.id} onClick={()=>setActive(n.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 11px",borderRadius:9,border:"none",cursor:"pointer",background:active===n.id?"rgba(168,119,58,0.12)":"transparent",borderLeft:active===n.id?"2.5px solid var(--brass)":"2.5px solid transparent",color:active===n.id?"var(--brass-d)":"var(--ink3)",fontSize:13,fontWeight:active===n.id?700:500,textAlign:"left",transition:"all .15s",fontFamily:"'DM Sans',sans-serif"}}>
                <span style={{fontSize:14}}>{n.icon}</span>{n.label}
                {badges[n.id]>0&&<span style={{marginLeft:"auto",minWidth:18,height:18,borderRadius:9,background:"var(--red)",color:"#fff",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>{badges[n.id]}</span>}
              </button>
            ))}
          </nav>
          <div style={{padding:"14px 16px 0",borderTop:"1px solid var(--border)"}}>
            <div style={{fontSize:9,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:9}}>Quick Glance</div>
            {[["Hot Leads",leads.filter(l=>l.status==="Hot").length,"var(--red)"],["Albums Due",projects.filter(p=>p.albumBacklog).length,"var(--amber)"],["Team",SEED_TEAM.length,"var(--blue)"],["Active Jobs",projects.filter(p=>p.status!=="Completed").length,"var(--green)"]].map(([l,v,c])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:6}}>
                <span style={{color:"var(--ink3)"}}>{l}</span><span style={{color:c,fontWeight:700}}>{v}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="main-wrap">
          {/* MOBILE HEADER */}
          <header className="mobile-hdr">
            <div>
              <div style={{fontSize:9,color:"var(--brass)",fontWeight:800,letterSpacing:"0.2em",textTransform:"uppercase"}}>The Story Box</div>
              <div style={{fontSize:15,fontWeight:700,color:"var(--ink)",fontFamily:"'Playfair Display',serif",lineHeight:1.2}}>{pageTitle}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              {Object.values(badges).some(b=>b>0)&&<div style={{width:8,height:8,borderRadius:"50%",background:"var(--red)"}}/>}
              <div style={{fontSize:10,color:roleColor,fontWeight:700}}>{currentUser.avatar}</div>
              <button onClick={()=>{}} style={{background:"none",border:"none",color:"var(--ink4)",fontSize:13,cursor:"pointer",padding:2}}>⏏</button>
            </div>
          </header>

          {/* MAIN CONTENT */}
          <div className="main-scroll">
            <div className="desk-hdr">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{fontSize:10,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:"0.14em"}}>{nav.find(n=>n.id===active)?.icon} {pageTitle}</div>
                <div style={{fontSize:10,color:"var(--ink4)"}}>June 2026 · Wedding Season</div>
              </div>
              <div style={{height:1,background:"linear-gradient(90deg,var(--brass-l),transparent)",marginTop:8,opacity:0.4}}/>
            </div>

            {active==="dashboard"&&<Dashboard leads={leads} projects={projects} activeBrand={activeBrand}/>}
            {active==="leads"&&<Leads leads={leads} setLeads={setLeads} activeBrand={activeBrand}/>}
            {active==="projects"&&<Projects projects={projects} setProjects={setProjects} activeBrand={activeBrand}/>}
            {active==="clients"&&<Clients clients={clients} setClients={setClients} projects={projects} activeBrand={activeBrand}/>}
            {active==="team"&&<Team/>}
            {active==="finance"&&<Finance clients={clients} projects={projects} activeBrand={activeBrand}/>}
            {active==="inventory"&&<Inventory/>}
            {active==="gallery"&&<Gallery clients={clients} user={currentUser} activeBrand={activeBrand}/>}
            {!allowedModules.includes(active)&&(
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"60vh",gap:12}}>
                <div style={{fontSize:40}}>🔒</div>
                <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",color:"var(--ink)"}}>Access Restricted</div>
                <div style={{fontSize:13,color:"var(--ink4)"}}>Your role ({roleLabel}) doesn't have access to this section.</div>
              </div>
            )}
          </div>

          {/* MOBILE BOTTOM NAV */}
          <nav className="bot-nav">
            {mobileBar.map(n=>(
              <button key={n.id} onClick={()=>{setActive(n.id);setMenuOpen(false);}} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,border:"none",background:"transparent",cursor:"pointer",color:active===n.id?"var(--brass-d)":"var(--ink4)",padding:"4px 0",position:"relative",fontFamily:"'DM Sans',sans-serif"}}>
                {active===n.id&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:24,height:2,background:"var(--brass)",borderRadius:2}}/>}
                <span style={{fontSize:18,lineHeight:1}}>{n.mi}</span>
                <span style={{fontSize:10,fontWeight:active===n.id?700:500}}>{n.label}</span>
                {badges[n.id]>0&&<div style={{position:"absolute",top:4,right:"calc(50% - 18px)",width:7,height:7,borderRadius:"50%",background:"var(--red)"}}/>}
              </button>
            ))}
            <button onClick={()=>setMenuOpen(o=>!o)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,border:"none",background:"transparent",cursor:"pointer",color:menuOpen?"var(--brass-d)":"var(--ink4)",padding:"4px 0",fontFamily:"'DM Sans',sans-serif"}}>
              <span style={{fontSize:18,lineHeight:1}}>⋯</span>
              <span style={{fontSize:10,fontWeight:menuOpen?700:500}}>More</span>
            </button>
          </nav>

          {/* MOBILE MORE DRAWER */}
          {menuOpen&&<div style={{position:"fixed",inset:0,zIndex:199,background:"rgba(44,30,15,0.35)"}} onClick={()=>setMenuOpen(false)}/>}
          <div className={`more-drawer${menuOpen?" open":""}`}>
            <div style={{padding:"0 8px 4px",display:"flex",justifyContent:"center"}}><div style={{width:36,height:3,borderRadius:2,background:"var(--border2)",marginBottom:10}}/></div>
            <div style={{padding:"4px 8px"}}>
              {mobileMore.map(n=>(
                <button key={n.id} onClick={()=>{setActive(n.id);setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:14,width:"100%",padding:"13px 16px",border:"none",background:active===n.id?"rgba(168,119,58,0.1)":"transparent",borderRadius:11,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",color:active===n.id?"var(--brass-d)":"var(--ink)",fontSize:15,fontWeight:active===n.id?700:500,textAlign:"left",marginBottom:2}}>
                  <span style={{fontSize:18,width:24,textAlign:"center"}}>{n.mi}</span>{n.label}
                  {badges[n.id]>0&&<span style={{marginLeft:"auto",minWidth:20,height:20,borderRadius:10,background:"var(--red)",color:"#fff",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 5px"}}>{badges[n.id]}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
