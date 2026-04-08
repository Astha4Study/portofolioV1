import SertificationsCard from "./SertificationsCard";
import englishSertification from "@/assets/images/english-sertification.png";
import trainingDOTSertification from "@/assets/images/trainingDOT-sertification.png";
import learningBaseAiSertification from "@/assets/images/learningBaseAi-sertification.png";

const sertifications = [
  {
    imageUrl: englishSertification,
    title: "English Proficiency Certificate",
    date: "23 February 2025",
    grade: "Good",
    partner: "Amikom Purwokerto University",
  },
  {
    imageUrl: trainingDOTSertification,
    title: "Desktop Office Training Certificate",
    date: "19 February 2025",
    grade: "83.33",
    partner: "Trust Training Partners",
  },
  {
    imageUrl: learningBaseAiSertification,
    title: "Learning Base AI Certificate",
    date: "2024",
    grade: "Certified",
    partner: "Dicoding Indonesia",
  },
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
          />
        ))}
      </div>
    </div>
  );
}
