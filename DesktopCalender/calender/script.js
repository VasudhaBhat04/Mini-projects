function updateCalendar() {
    const now = new Date();
    const day = now.getDate();
    const monthNames = ["january", "february", "march", "april", "may",
        "june", "july", "august", "september", "october", "november", "december"];
    
    const month = monthNames[now.getMonth()];

    document.getElementById('day').textContent = day;
    document.getElementById('month').textContent = month;

}

updateCalendar();