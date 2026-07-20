import SertificationsCard from "./SertificationsCard";
import englishSertification from "@/assets/images/english-sertification.png";
import trainingDOTSertification from "@/assets/images/trainingDOT-sertification.png";
import learningBaseAiSertification from "@/assets/images/learningBaseAi-sertification.png";
import googleVibeCodingSertification from "@/assets/images/google-vibecoding-sertification.png";

import englishPdf from "@/assets/pdf/sertifikasi-bahasa-inggris-2026.pdf";
import trainingDOTPdf from "@/assets/pdf/sertifikasi-desktop-office-training-DOT-2026.pdf";
import learningBaseAiPdf from "@/assets/pdf/sertifikat-kompetensi-kelulusan-belajar-dasar-ai-dicoding-2026.pdf";
import googleVibeCodingPdf from "@/assets/pdf/certificate-of-completion-juara-vibe-coding-google-indonesia.pdf";

const sertifications = [
  {
    imageUrl: englishSertification,
    title: "English Proficiency Certificate",
    date: "23 February 2025",
    grade: "Good",
    partner: "Amikom Purwokerto University",
    pdfUrl: englishPdf,
  },
  {
    imageUrl: trainingDOTSertification,
    title: "Desktop Office Training Certificate",
    date: "19 February 2025",
    grade: "83.33",
    partner: "Trust Training Partners",
    pdfUrl: trainingDOTPdf,
  },
  {
    imageUrl: learningBaseAiSertification,
    title: "Learning Base AI Certificate",
    date: "2026",
    grade: "Certified",
    partner: "Dicoding Indonesia",
    pdfUrl: learningBaseAiPdf,
  },
  {
    imageUrl: googleVibeCodingSertification,
    title: "Google Vibe Coding Certificate",
    date: "2026",
    grade: "Good Job",
    partner: "Google Developer Groups",
    pdfUrl: googleVibeCodingPdf,
  }
];

export default function Sertifications() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-5">
        {sertifications.map((sertification) => (
          <SertificationsCard
            key={sertification.title}
            imageUrl={sertification.imageUrl}
            title={sertification.title}
            date={sertification.date}
            grade={sertification.grade}
            partner={sertification.partner}
            pdfUrl={sertification.pdfUrl}
          />
        ))}
      </div>
    </div>
  );
}
