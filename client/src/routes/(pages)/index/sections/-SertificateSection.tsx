export default function SertificateSection() {
  return (
    <section className="w-full flex flex-col items-center gap-4">
      {/* Badge */}
      <span className="font-medium px-4 py-1.5 bg-neutral-900 rounded-full text-sm text-white">
        Sertificates
      </span>

      {/* Heading */}
      <div className="text-center max-w-2xl space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
          Check out my achivements
        </h2>

        <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
          A collection of sertificates I've got, showcasing my expertise in
          frontend development, UI/UX design, and scalable web applications.
          Each sertificate reflects my focus on performance, usability, and
          clean, maintainable code.
        </p>
      </div>
    </section>
  );
}
