let jobs = [
  {id:1, company:"Mobile First Corp", position:"React Native Developer", location:"Remote", salary:"$130k - $175k", desc:"Build cross-platform mobile applications using React Native.", status:"not_applied"},
  {id:2, company:"WebFlow Agency", position:"Frontend Developer", location:"USA", salary:"$90k - $120k", desc:"Develop scalable web interfaces.", status:"not_applied"},
  {id:3, company:"Digital Solutions", position:"JavaScript Engineer", location:"UK", salary:"$100k - $140k", desc:"Work with APIs and frontend logic.", status:"not_applied"},
  {id:4, company:"CloudNine Inc", position:"UI Engineer", location:"Remote", salary:"$110k - $150k", desc:"Create modern UI systems.", status:"not_applied"},
  {id:5, company:"Innovate Labs", position:"React Developer", location:"Canada", salary:"$120k - $160k", desc:"Build interactive dashboards.", status:"not_applied"},
  {id:6, company:"SmartTech", position:"JS Developer", location:"Germany", salary:"$95k - $130k", desc:"Develop UI components.", status:"not_applied"},
  {id:7, company:"Tech Corp", position:"Frontend Engineer", location:"Remote", salary:"$105k - $145k", desc:"Build enterprise web apps.", status:"not_applied"},
  {id:8, company:"NextGen Ltd", position:"UI Developer", location:"India", salary:"$70k - $95k", desc:"Design clean UI layouts.", status:"not_applied"},
];

let activeTab = "all";
const container = document.getElementById("jobsContainer");

function render() {
  let filtered;

  if (activeTab === "all") filtered = jobs;
  else filtered = jobs.filter(j => j.status === activeTab);

  document.getElementById("jobCount").innerText = filtered.length + " jobs";

  if (!filtered.length) {
    container.innerHTML = `
      <div class="text-center py-12">
        <div class="text-5xl mb-3"><i class="fas fa-briefcase text-gray-300"></i></div>
        <h3 class="font-semibold">No jobs available</h3>
        <p class="text-gray-500 text-sm">You haven’t applied to any jobs yet.</p>
      </div>
    `;
    updateCounts();
    return;
  }

  container.innerHTML = filtered.map(job => `
    <div class="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow transition">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-semibold text-lg">${job.company}</h3>
          <p class="text-sm text-gray-600">${job.position}</p>
          <p class="text-xs text-gray-500">${job.location} • ${job.salary}</p>
        </div>

        <button onclick="deleteJob(${job.id})" title="Delete"
          class="text-gray-400 hover:text-red-500 text-xl">
            <i class="fas fa-trash"></i>
        </button>
      </div>

      <p class="text-sm mt-2 text-gray-700">${job.desc}</p>

      <div class="flex items-center justify-between mt-4">
        <span class="px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(job.status)}">
          ${getStatusText(job.status)}
        </span>

        <div class="flex gap-2">
          <button onclick="updateStatus(${job.id}, 'interview')"
            class="px-3 py-1 border border-green-500 text-green-600 rounded text-xs hover:bg-green-500 hover:text-white transition">
            Interview
          </button>

          <button onclick="updateStatus(${job.id}, 'rejected')"
            class="px-3 py-1 border border-red-500 text-red-600 rounded text-xs hover:bg-red-500 hover:text-white transition">
            Rejected
          </button>
        </div>
      </div>
    </div>
  `).join("");

  updateCounts();
}

function getStatusText(status) {
  if (status === "interview") return "Interview";
  if (status === "rejected") return "Rejected";
  return "Not Applied";
}

function getStatusClass(status) {
  if (status === "interview") return "bg-green-100 text-green-700";
  if (status === "rejected") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-600";
}

function updateStatus(id, status) {
  const job = jobs.find(j => j.id === id);
  job.status = status;
  render();
}

function deleteJob(id) {
  jobs = jobs.filter(j => j.id !== id);
  render();
}

function updateCounts() {
  document.getElementById("totalCount").innerText = jobs.length;
  document.getElementById("interviewCount").innerText =
    jobs.filter(j => j.status === "interview").length;
  document.getElementById("rejectedCount").innerText =
    jobs.filter(j => j.status === "rejected").length;
}

document.querySelectorAll(".tabBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    activeTab = btn.dataset.tab;
    setActiveTab(btn);
    render();
  });
});

function setActiveTab(activeBtn) {
  document.querySelectorAll(".tabBtn").forEach(btn => {
    btn.classList.remove("bg-blue-600", "text-white");
    btn.classList.add("bg-gray-200");
  });
  activeBtn.classList.add("bg-blue-600", "text-white");
  activeBtn.classList.remove("bg-gray-200");
}

render();