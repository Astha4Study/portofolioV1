import AchivementsCard from "./AchivementsCard";

import ProxocorisSertivication from "@/assets/images/proxocoris-sertification.png";
import uinicSertification from "@/assets/images/uinic-sertification.png";
import secompSertification from "@/assets/images/secomp=sertifocation.png";
import indonerisSertification from "@/assets/images/indoneris-sertification.png";
import ikimfikSertification from "@/assets/images/ikimfik-sertification.png";

export default function Achivements() {
  const Achivements = [
    {
      imageUrl: ProxocorisSertivication,
      title: "Top 10 Finalist - Proxocoris International Web Development",
      year: "2025",
      description:
        "Awarded for ranking in the Top 10 of an international web development competition, showcasing strong problem-solving and modern web engineering skills.",
      websiteUrl: "https://proxo-2026.vercel.app/",
    },
    {
      imageUrl: uinicSertification,
      title: "2nd Place - UINIC National Web Development Competition",
      year: "2025",
      description:
        "Secured 2nd place in a national web development competition, demonstrating excellence in building scalable and user-focused applications.",
      websiteUrl: "https://www.infolombait.com/2025/10/uinic-70-2025.html",
    },
    {
      imageUrl: secompSertification,
      title: "2nd Place - SECOMP National Software Engineering Competition",
      year: "2025",
      description:
        "Achieved 2nd place in a national software engineering competition, highlighting strong system design and development capabilities.",
      websiteUrl: "https://www.instagram.com/p/DNnwIVNJgUO/?img_index=1",
    },
    {
      imageUrl: indonerisSertification,
      title: "3rd Place - Indoneris National Internet of Things Competition",
      year: "2025",
      description:
        "Ranked 3rd in a national IoT competition, demonstrating the ability to integrate hardware and software into practical solutions.",
      websiteUrl: "https://indoneris.amikompurwokerto.ac.id/competition/winner?y=2025",
    },
    {
      imageUrl: ikimfikSertification,
      title: "1st Place - IKIMFIK Innovation Competition",
      year: "2024",
      description:
        "Won 1st place in a university innovation competition, delivering a high-impact mobile and web-based solution.",
      websiteUrl: "https://www.instagram.com/p/DD8vKZppcWI/",
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
          />
        ))}
      </div>
    </div>
  );
}
