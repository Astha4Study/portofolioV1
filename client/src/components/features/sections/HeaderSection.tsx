import Stack from "@/components/Stack";

import profileImage1 from "@/assets/images/profile-image1.jpeg"
import profileImage2 from "@/assets/images/profile-image2.jpeg"
import profileImage3 from "@/assets/images/profile-image3.jpeg"
import profileImage4 from "@/assets/images/profile-image4.jpeg"
import profileImage5 from "@/assets/images/profile-image5.jpeg"

const images = [
  profileImage1,
  profileImage2,
  profileImage3,
  profileImage4,
  profileImage5
];

export default function HeaderSection() {
  return (
    <section className="w-full flex justify-between items-center">
      {/* LEFT CONTENT */}
      <div className="flex flex-1 flex-col gap-3">
        <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white transition-colors duration-200">
          Hi, I'm Yann 👋
        </h1>

        <p className="md:text-xl font-normal max-w-md leading-normal text-neutral-700 dark:text-neutral-300 transition-colors duration-200">
          Frontend Developer who enjoys designing and building clean, responsive
          interfaces powered by coffee and driven by thoughtful{" "}
          <span className="relative">
            desig
            <span className="inline-block rotate-45 absolute -right-5 top-3 dark:text-neutral-300">
              n.
            </span>
          </span>
        </p>
      </div>

      {/* RIGHT (IMAGE PLACEHOLDER) */}
      <div className="z-20 hidden lg:block" style={{ width: 190, height: 190 }}>
        <Stack
          randomRotation={true}
          sensitivity={200}
          cards={images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`card-${i + 1}`}
              draggable="false"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ))}
          autoplay={true}
          pauseOnHover={false}
        />
      </div>
    </section>
  );
}
