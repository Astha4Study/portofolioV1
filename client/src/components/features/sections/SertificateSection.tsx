import Sertifications from "../../Sertifications";

export default function SertificateSection() {
  return (
    <section className="w-full flex flex-col items-center gap-4">
      {/* Badge */}
      <span className="font-medium px-4 py-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-full text-sm text-white dark:text-neutral-900 transition-colors duration-200">
        Sertificates
      </span>

      {/* Heading */}
      <div className="text-center max-w-2xl space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight transition-colors duration-200">
          Check out my achivements
        </h2>

        <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed transition-colors duration-200">
          A collection of sertificates I've got, showcasing my expertise in
          frontend development, UI/UX design, and scalable web applications.
          Each sertificate reflects my focus on performance, usability, and
          clean, maintainable code.
        </p>
      </div>
      <Sertifications />
    </section>
  );
}
