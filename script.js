document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Dummy credentials
    if (username === "Abhirup Nandi" && password === "1234") {
      window.location.href = "home.html"; // Redirect to home page
    }
    else if (username === "Aryan Roy" && password === "1234") {
    window.location.href = "home.html"; // Redirect to home page
    } 
    else if (username === "Bhaskar Prasad" && password === "1234") {
    window.location.href = "home.html"; // Redirect to home page
    } 
    else if (username === "Anurag Jha" && password === "1234") {
    window.location.href = "home.html"; // Redirect to home page
    }
    if (username === "Angshu Jha" && password === "1234") {
    window.location.href = "home.html"; // Redirect to home page
    }   
    else {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerText = "Invalid username or password";
    }
  });
  