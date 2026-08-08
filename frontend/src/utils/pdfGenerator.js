import jsPDF from "jspdf";

export const generatePDF = (data) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("AI Resume Screening Report", 20, y);

  y += 15;

  doc.setFontSize(12);

  doc.text(`Name: ${data.name}`, 20, y);
  y += 8;

  doc.text(`Email: ${data.email}`, 20, y);
  y += 8;

  doc.text(`Phone: ${data.phone}`, 20, y);
  y += 8;

  doc.text(`ATS Score: ${data.ats_score}/100`, 20, y);

  y += 12;

  doc.setFont(undefined, "bold");
  doc.text("Skills", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  doc.text(data.skills.join(", "), 20, y, {
    maxWidth: 170,
  });

  y += 18;

  doc.setFont(undefined, "bold");
  doc.text("Education", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  doc.text(data.education, 20, y, {
    maxWidth: 170,
  });

  y += 18;

  doc.setFont(undefined, "bold");
  doc.text("Experience", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  doc.text(data.experience, 20, y, {
    maxWidth: 170,
  });

  y += 25;

  doc.setFont(undefined, "bold");
  doc.text("Projects", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  doc.text(data.projects, 20, y, {
    maxWidth: 170,
  });

  y += 25;

  doc.setFont(undefined, "bold");
  doc.text("Professional Summary", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  doc.text(data.summary, 20, y, {
    maxWidth: 170,
  });

  y += 25;

  doc.setFont(undefined, "bold");
  doc.text("Strengths", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  data.strengths.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 7;
  });

  y += 5;

  doc.setFont(undefined, "bold");
  doc.text("Weaknesses", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  data.weaknesses.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 7;
  });

  y += 5;

  doc.setFont(undefined, "bold");
  doc.text("Suggestions", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  data.suggestions.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 7;
  });

  doc.save(`${data.name}_Resume_Report.pdf`);
};