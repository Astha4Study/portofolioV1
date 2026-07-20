import AchivementsCard from "./AchivementsCard";

import proxocorisSertivicationWinner from "@/assets/images/proxocoris-sertification-winner-3rd.png";
import ProxocorisSertivication from "@/assets/images/proxocoris-sertification.png";
import hackathonSertification from "@/assets/images/hackathon-itfair-sertification.png";
import uinicSertification from "@/assets/images/uinic-sertification.png";
import secompSertification from "@/assets/images/secomp=sertifocation.png";
import indonerisSertification from "@/assets/images/indoneris-sertification.png";
import ikimfikSertification from "@/assets/images/ikimfik-sertification.png";

import proxocorisPdf2026 from "@/assets/pdf/proxocoris-international-2026-kategori-web-development-3rd-winner-individu.pdf";
import proxocorisPdf2025 from "@/assets/pdf/proxocoris-international-2025-kategori-web-development-finalist.pdf";
import hackathonPdf from "@/assets/pdf/hackathon-competition-IT-FAIR-XIV-V.2-UIN-sunan-gunung-djati-bandung.pdf";
import uinicPdf from "@/assets/pdf/UINIC-7.0-2025-accelerating-the-innovation-for-sustainable-goals.pdf";
import secompPdf from "@/assets/pdf/software-engineering-competition-SECOMP-2025.pdf";
import indonerisPdf from "@/assets/pdf/indoneris-national-it-competition-dan-pekan-seni-nasional-CORIS-tahun-2025.pdf";
import ikimfikPdf from "@/assets/pdf/lomba-karya-inovatif-mahasiswa-ilmu-komputer-2024.pdf";

export default function Achivements() {
  const Achivements = [
    {
      imageUrl: proxocorisSertivicationWinner,
      title: "3rd Place - Proxocoris International Web Development",
      year: "2026",
      description:
        "Awarded 3rd Place in an international web development competition for delivering an innovative, user-focused solution with strong technical execution and modern development practices.",
      websiteUrl: "https://proxo-2026.vercel.app/",
      pdfUrl: proxocorisPdf2026,
    },
    {
      imageUrl: ProxocorisSertivication,
      title: "Top 10 Finalist - Proxocoris International Web Development",
      year: "2025",
      description:
        "Awarded for ranking in the Top 10 of an international web development competition, showcasing strong problem-solving and modern web engineering skills.",
      websiteUrl: "https://proxo-2026.vercel.app/",
      pdfUrl: proxocorisPdf2025,
    },
    {
      imageUrl: hackathonSertification,
      title: "1st Place — IT FAIR XIV V2 Hackathon Competition",
      year: "2026",
      description:
        "Awarded 1st Place in the IT FAIR XIV V2 Hackathon Competition organized by the Association of Informatics Engineering Students, UIN Sunan Gunung Djati Bandung, for developing an innovative AI-powered credential verification platform.",
      websiteUrl: "https://www.instagram.com/p/DNnwIVNJgUO/?img_index=1",
      pdfUrl: hackathonPdf,
    },
    {
      imageUrl: uinicSertification,
      title: "2nd Place - UINIC National Web Development Competition",
      year: "2025",
      description:
        "Secured 2nd place in a national web development competition, demonstrating excellence in building scalable and user-focused applications.",
      websiteUrl: "https://www.infolombait.com/2025/10/uinic-70-2025.html",
      pdfUrl: uinicPdf,
    },
    {
      imageUrl: secompSertification,
      title: "2nd Place - SECOMP National Software Engineering Competition",
      year: "2025",
      description:
        "Achieved 2nd place in a national software engineering competition, highlighting strong system design and development capabilities.",
      websiteUrl: "https://www.instagram.com/p/DNnwIVNJgUO/?img_index=1",
      pdfUrl: secompPdf,
    },
    {
      imageUrl: indonerisSertification,
      title: "3rd Place - Indoneris National Internet of Things Competition",
      year: "2025",
      description:
        "Ranked 3rd in a national IoT competition, demonstrating the ability to integrate hardware and software into practical solutions.",
      websiteUrl:
        "https://indoneris.amikompurwokerto.ac.id/competition/winner?y=2025",
      pdfUrl: indonerisPdf,
    },
    {
      imageUrl: ikimfikSertification,
      title: "1st Place - IKIMFIK Innovation Competition",
      year: "2024",
      description:
        "Won 1st place in a university innovation competition, delivering a high-impact mobile and web-based solution.",
      websiteUrl: "https://www.instagram.com/p/DD8vKZppcWI/",
      pdfUrl: ikimfikPdf,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Achivements.map((achivement, index) => (
          <AchivementsCard
            key={index}
            imageUrl={achivement.imageUrl}
            title={achivement.title}
            year={achivement.year}
            description={achivement.description}
            websiteUrl={achivement.websiteUrl}
            pdfUrl={achivement.pdfUrl}
          />
        ))}
      </div>
    </div>
  );
}
