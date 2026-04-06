import Stack from "@/components/Stack";

const images = [
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
];

export default function HeaderSection() {
  return (
    <section className="w-full flex justify-between items-center">
      {/* LEFT CONTENT */}
      <div className="flex flex-1 flex-col gap-3">
        <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-neutral-950">
          Hi, I'm Yann 👋
        </h1>

        <p className="md:text-xl font-normal max-w-md leading-normal text-neutral-700">
          Frontend Developer who enjoys designing and building clean, responsive
          interfaces powered by coffee and driven by thoughtful{" "}
          <span className="relative">
            desig
            <span className="inline-block rotate-45 absolute -right-5 top-1">
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
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ))}
          autoplay={false}
          pauseOnHover={false}
        />
      </div>
    </section>
  );
}
