// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// Restore dark mode on load
window.onload = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById("darkToggle").checked = true;
  }
};

// Step navigation logic
function nextStep(step) {
  document.querySelectorAll(".form-step")[step - 1].classList.remove("active");
  document.querySelectorAll(".form-step")[step].classList.add("active");
  document.querySelectorAll(".progressbar .step")[step].classList.add("active");
}

function prevStep(step) {
  document.querySelectorAll(".form-step")[step].classList.remove("active");
  document.querySelectorAll(".form-step")[step - 1].classList.add("active");
}

// Generate live preview
function generatePreview() {
  document.getElementById("previewName").textContent = document.getElementById("name").value;
  document.getElementById("previewTitle").textContent = document.getElementById("title").value;
  document.getElementById("previewContact").innerHTML = `📧 ${document.getElementById("email").value}<br>📞 ${document.getElementById("phone").value}`;

  const skills = document.getElementById("skills").value.split(",");
  const skillList = document.getElementById("previewSkills");
  skillList.innerHTML = "";
  skills.forEach(skill => {
    if (skill.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = skill.trim();
      skillList.appendChild(li);
    }
  });

  document.getElementById("previewEducation").textContent = document.getElementById("education").value;
  document.getElementById("previewExperience").textContent = document.getElementById("experience").value;

  // Profile Photo
  const photo = document.getElementById("photo").files[0];
  if (photo) {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("previewPhoto").src = reader.result;
    };
    reader.readAsDataURL(photo);
  }

  // Social Links
  const linkedin = document.getElementById("linkedin").value;
  const github = document.getElementById("github").value;
  const portfolio = document.getElementById("portfolio").value;

  let linksHTML = "";
  if (linkedin) linksHTML += `<a href="${linkedin}" target="_blank">🔗 LinkedIn</a><br>`;
  if (github) linksHTML += `<a href="${github}" target="_blank">💻 GitHub</a><br>`;
  if (portfolio) linksHTML += `<a href="${portfolio}" target="_blank">🌐 Portfolio</a>`;
  document.getElementById("previewLinks").innerHTML = linksHTML;
}

// Export resume to PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(document.getElementById("previewName").textContent, 10, 15);
  doc.setFontSize(14);
  doc.text(document.getElementById("previewTitle").textContent, 10, 25);
  doc.setFontSize(12);

  doc.text(document.getElementById("previewContact").textContent.replace(/<br>/g, "\n"), 10, 35);

  doc.text("Education:", 10, 55);
  doc.text(document.getElementById("previewEducation").textContent, 10, 63);

  doc.text("Experience:", 10, 83);
  doc.text(document.getElementById("previewExperience").textContent, 10, 91);

  doc.text("Skills:", 10, 111);
  let y = 119;
  document.querySelectorAll("#previewSkills li").forEach(li => {
    doc.text("- " + li.textContent, 12, y);
    y += 8;
  });

  doc.save("My_Resume.pdf");
}
