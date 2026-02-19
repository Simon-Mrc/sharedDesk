import './style.css'
// Function to toggle sidebar expansion
const toggleSideBarButton = document.getElementById("toggleSideBar");
toggleSideBarButton.addEventListener("click",()=>{
  toggleSideBar();
})
function toggleSideBar() {
    const sideBar = document.getElementById('sideBar');
    sideBar.classList.toggle('expanded');
}

// Example: You can call this function on a button click
// Create a button in your HTML and add: onclick="toggleSideBar()"