// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {collection,query,where,getDocs} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCk1R4D15PPncA2eU5JzJEnrcBOb9oXgac",
  authDomain: "tagfut-admin.firebaseapp.com",
  projectId: "tagfut-admin",
  storageBucket: "tagfut-admin.appspot.com",
  messagingSenderId: "499029551472",
  appId: "1:499029551472:web:9156161a81d6603b5b47b5",
  measurementId: "G-E6FYHZDC0Q"
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db,"subscriptions"))

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
function getData(){
  let data = [0,0,0];
  querySnapshot.forEach(
    (doc)=>{
      console.log(doc)
      for(let i=0;i<3;i++){
        if(doc.data().method == i)
          data[i]+=1
      }
    }
  )
  return data;
}
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Google", "Referencement", "Réseaux Sociaux"],
    datasets: [{
      data: getData(),
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
